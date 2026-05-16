/**
 * `<comfort-band-profiles-tab>` — Profiles tab content.
 *
 * Reads the profile list, active profile, default profile, and per-profile
 * descriptions from the singleton
 * `select.comfort_band_profiles_active_profile` entity (via
 * `findActiveProfileEntity`). The select entity surfaces:
 *   - `state`              — current active profile
 *   - `attributes.options` — full profile list (sorted)
 *   - `attributes.default_profile` — rename-aware fallback target (undeletable)
 *   - `attributes.descriptions`    — per-profile description map
 *
 * Affordances:
 *   - Tap a row → set active.
 *   - Header "+ New profile" → create dialog.
 *   - Per-row overflow `⋮` menu → Clone / Rename / Delete.
 *     Delete is disabled for the default profile.
 *   - Delete shows a confirm step (with a hint if the active is being deleted).
 *
 * Profile mutations (create/clone/rename/delete) call the matching
 * `comfort_band.*` service; the backend fires `SIGNAL_PROFILE_LIST_CHANGED`
 * which re-pushes the select entity's state, triggering this tab to re-render.
 *
 * Note: `data-profile` on each <li> is load-bearing — the Escape handler in
 * `_onMenuKeydown` walks the DOM by this attribute to restore focus to the
 * ⋮ button after the menu closes. Profile names can contain CSS-syntax
 * characters (`"`, `]`), so we deliberately avoid a `querySelector` selector
 * that would otherwise need `CSS.escape`-ing.
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../profile-edit-dialog.js';
import { findActiveProfileEntity } from '../helpers.js';
import {
  cloneProfile,
  createProfile,
  deleteProfile,
  renameProfile,
  setProfile,
} from '../services.js';
import type { HomeAssistant } from '../types.js';
import { tokens } from '../styles.js';

type DialogMode = 'create' | 'clone' | 'rename';
type Mode = 'list' | DialogMode | 'confirm-delete';

type DialogSaveEvent = CustomEvent<{ name: string; description: string }>;

@customElement('comfort-band-profiles-tab')
export class ComfortBandProfilesTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _mode: Mode = 'list';
  /** Profile being acted on (rename / clone / delete target). */
  @state() private _target: string | null = null;
  /** Which row's overflow menu is open. */
  @state() private _openMenu: string | null = null;
  @state() private _error: string | null = null;
  /** True while a service call is in flight. Disables action buttons to
   *  prevent double-submit. */
  @state() private _busy = false;
  /** Whether the most-recent menu open was keyboard-triggered. Only when
   *  this is true do we shift focus into the menu (per ARIA APG guidance:
   *  pointer-opened menus shouldn't hijack focus from the user's pointer). */
  private _menuOpenedByKeyboard = false;
  /** Profile name whose ⋮ button (or `+ New profile`) opened the dialog;
   *  used to restore focus to that trigger on dialog dismiss (WCAG 2.4.3). */
  private _dialogTrigger: string | null = null;

  private _onDocumentClick = (e: MouseEvent): void => {
    if (this._openMenu === null) return;
    // Click landed outside the menu — dismiss. `composedPath()` lets us
    // see through the shadow-root boundary so taps on our own menu button
    // and items don't get treated as outside-clicks.
    const path = e.composedPath();
    const hitMenu = path.some(
      (node) =>
        node instanceof HTMLElement &&
        (node.classList?.contains('menu') || node.classList?.contains('overflow')),
    );
    if (!hitMenu) {
      this._openMenu = null;
    }
  };

  public override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick, true);
  }

  public override disconnectedCallback(): void {
    document.removeEventListener('click', this._onDocumentClick, true);
    super.disconnectedCallback();
  }

  protected override updated(changed: Map<string | number | symbol, unknown>): void {
    // Move keyboard focus into the menu only when it was opened by the
    // keyboard. Pointer (mouse / touch) opens already have a sensible
    // focus target (the ⋮ button); stealing it would surprise the user.
    if (changed.has('_openMenu') && this._openMenu !== null && this._menuOpenedByKeyboard) {
      requestAnimationFrame(() => {
        // Re-check the flag at fire-time: if a Tab/Escape dismiss
        // happened between schedule and fire, we don't want a stale
        // keyboard-focus rAF to hijack a later pointer-open.
        if (!this._menuOpenedByKeyboard || this._openMenu === null) return;
        this.shadowRoot
          ?.querySelector<HTMLButtonElement>('.menu button[role="menuitem"]:not([disabled])')
          ?.focus();
      });
    }
  }

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      .empty {
        color: var(--cb-text-secondary);
        font-size: 13px;
        text-align: center;
        padding: var(--cb-gap-lg);
      }
      .upgrade-hint {
        margin: var(--cb-gap-md) 0 0;
        font-size: 12px;
        color: var(--cb-text-secondary);
        text-align: center;
      }
      .upgrade-hint code {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 11px;
      }
      .error {
        color: var(--error-color, #b71c1c);
        font-size: 12px;
        margin: 0 0 var(--cb-gap-sm);
      }
      .new-profile {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 100%;
        margin-bottom: var(--cb-gap-sm);
        padding: var(--cb-gap-sm) var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: transparent;
        border: 1px dashed var(--divider-color, #cccccc);
        color: var(--cb-text-primary);
        font: inherit;
        font-size: 13px;
        cursor: pointer;
      }
      .new-profile:hover {
        background: var(--cb-track-bg);
      }
      .new-profile:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--cb-gap-sm);
      }
      li {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--cb-gap-sm);
        padding: var(--cb-gap-sm) var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--cb-track-bg);
        cursor: pointer;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      li.active {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        color: #ffffff;
      }
      li:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .label {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
      }
      .name {
        font-weight: 500;
        text-transform: capitalize;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .description {
        font-size: 11px;
        opacity: 0.75;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .badge {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.85;
      }
      .overflow {
        font: inherit;
        background: transparent;
        border: none;
        cursor: pointer;
        /* WCAG 2.5.5: 44×44 minimum touch target. */
        min-width: 44px;
        min-height: 44px;
        padding: 0 8px;
        border-radius: var(--cb-radius-pill);
        color: inherit;
        opacity: 0.7;
        font-size: 18px;
        line-height: 1;
      }
      .overflow:hover {
        opacity: 1;
      }
      .overflow:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
        opacity: 1;
      }
      .menu {
        position: absolute;
        top: calc(100% - 4px);
        /* inset-inline-end (not "right") flips correctly under RTL layouts. */
        inset-inline-end: var(--cb-gap-md);
        z-index: 5;
        min-width: 140px;
        padding: 4px;
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--primary-text-color, #212121);
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: var(--cb-radius-card);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
      }
      .menu button {
        background: transparent;
        border: none;
        text-align: left;
        font: inherit;
        font-size: 13px;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        color: var(--primary-text-color, #212121);
      }
      .menu button:hover:not([disabled]) {
        background: var(--cb-track-bg);
      }
      .menu button:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        /* Inset so the ring doesn't clip the menu's border-radius. */
        outline-offset: -2px;
      }
      .menu button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .menu button.danger:not([disabled]) {
        color: var(--error-color, #b71c1c);
      }
      .confirm-delete {
        padding: var(--cb-gap-md);
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--primary-text-color, #212121);
        border-radius: var(--cb-radius-card);
      }
      .confirm-delete h3 {
        margin: 0 0 var(--cb-gap-sm);
        font-size: 14px;
      }
      .confirm-delete p {
        margin: 0 0 var(--cb-gap-md);
        font-size: 13px;
        color: var(--cb-text-secondary);
      }
      .confirm-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-sm);
      }
      .button {
        font: inherit;
        padding: 6px 12px;
        /* WCAG 2.5.5: 44×44 minimum touch target on action buttons. */
        min-height: 44px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid transparent;
        cursor: pointer;
        font-size: 13px;
      }
      .button.secondary {
        background: transparent;
        border-color: var(--divider-color, #cccccc);
        color: var(--primary-text-color, #212121);
      }
      .button.danger {
        background: transparent;
        color: var(--error-color, #b71c1c);
        border-color: var(--divider-color, #cccccc);
      }
    `,
  ];

  private _readState(): {
    options: string[];
    active: string;
    defaultProfile: string;
    descriptions: Record<string, string>;
    /** True when the backend has been upgraded to ≥ v0.3.0 (the version
     *  that exposes `default_profile` + per-profile descriptions). On
     *  older backends we hide the CRUD affordances so the user doesn't
     *  see buttons that always error. */
    crudAvailable: boolean;
  } | null {
    if (!this.hass) return null;
    const entityId = findActiveProfileEntity(this.hass);
    if (entityId === null) return null;
    const state = this.hass.states[entityId];
    if (!state) return null;
    const optionsAttr = state.attributes.options;
    const options = Array.isArray(optionsAttr)
      ? (optionsAttr as unknown[]).filter((v): v is string => typeof v === 'string')
      : [];
    const active = typeof state.state === 'string' ? state.state : '';
    const defaultAttr = state.attributes.default_profile;
    const crudAvailable = typeof defaultAttr === 'string' && !!defaultAttr;
    const defaultProfile = crudAvailable ? (defaultAttr as string) : 'home';
    const descAttr = state.attributes.descriptions;
    const descriptions: Record<string, string> = {};
    if (descAttr && typeof descAttr === 'object' && !Array.isArray(descAttr)) {
      for (const [k, v] of Object.entries(descAttr as Record<string, unknown>)) {
        if (typeof v === 'string') descriptions[k] = v;
      }
    }
    return { options, active, defaultProfile, descriptions, crudAvailable };
  }

  private _onSelect(profile: string): void {
    if (!this.hass) return;
    void setProfile(this.hass, { profile });
  }

  private _toggleMenu(profile: string, e: Event): void {
    e.stopPropagation();
    // `detail === 0` on a MouseEvent is the cross-browser heuristic for
    // "this click was synthesised by a keyboard activation" — real pointer
    // clicks always have a positive detail. Reset on close so a future
    // pointer-open doesn't inherit the previous keyboard flag.
    this._menuOpenedByKeyboard =
      this._openMenu !== profile && e instanceof MouseEvent && e.detail === 0;
    this._openMenu = this._openMenu === profile ? null : profile;
  }

  /** Keyboard navigation inside the open overflow menu — Escape closes,
   *  ArrowUp/ArrowDown moves focus, satisfying ARIA's `role="menu"` contract. */
  private _onMenuKeydown(e: KeyboardEvent, profile: string): void {
    // Tab closes the menu (per ARIA menu pattern) and lets default tab order
    // proceed. Escape closes and returns focus to the ⋮ button.
    if (e.key === 'Tab') {
      this._openMenu = null;
      // Match Escape: clear the keyboard-open flag so the next pointer
      // open doesn't inherit it and hijack focus.
      this._menuOpenedByKeyboard = false;
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      this._openMenu = null;
      // Defensive: clear the open-modality flag so a subsequent pointer
      // open without going through `_toggleMenu` doesn't inherit `true`.
      this._menuOpenedByKeyboard = false;
      // Return focus to the originating overflow button so keyboard
      // users don't lose their place in the list. Profile names are
      // user-supplied and may contain `"` / `]` / other CSS-syntax chars
      // (the backend only caps length, not character set), so we walk
      // the DOM by data-attribute match rather than building a selector.
      requestAnimationFrame(() => {
        const rows = this.shadowRoot?.querySelectorAll<HTMLLIElement>('li[data-profile]');
        const li = rows ? Array.from(rows).find((el) => el.dataset.profile === profile) : undefined;
        li?.querySelector<HTMLButtonElement>('.overflow')?.focus();
      });
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    e.stopPropagation();
    const items = Array.from(
      (e.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>(
        'button[role="menuitem"]:not([disabled])',
      ),
    );
    if (items.length === 0) return;
    const activeEl = this.shadowRoot?.activeElement as HTMLElement | null;
    const idx = activeEl ? items.indexOf(activeEl as HTMLButtonElement) : -1;
    const next =
      e.key === 'ArrowDown'
        ? items[(idx + 1) % items.length]
        : items[(idx - 1 + items.length) % items.length];
    next.focus();
  }

  private _onNew(): void {
    this._error = null;
    this._target = null;
    // Sentinel value for "the + New profile button" — distinguishes from
    // a per-row trigger when restoring focus on dismiss.
    this._dialogTrigger = '__new__';
    this._mode = 'create';
  }

  private _onClone(profile: string): void {
    this._error = null;
    this._openMenu = null;
    this._target = profile;
    this._dialogTrigger = profile;
    this._mode = 'clone';
  }

  private _onRename(profile: string): void {
    this._error = null;
    this._openMenu = null;
    this._target = profile;
    this._dialogTrigger = profile;
    this._mode = 'rename';
  }

  private _onDelete(profile: string): void {
    this._error = null;
    this._openMenu = null;
    this._target = profile;
    this._dialogTrigger = profile;
    this._mode = 'confirm-delete';
  }

  /** Restore focus to the element that opened the dialog. Called when
   *  the dialog dismisses (cancel or successful save). Best-effort —
   *  silently no-ops if the trigger element has been removed from the
   *  DOM (e.g. delete succeeded and the row is gone). */
  private _restoreFocusAfterDialog(): void {
    const trigger = this._dialogTrigger;
    this._dialogTrigger = null;
    if (trigger === null) return;
    requestAnimationFrame(() => {
      if (trigger === '__new__') {
        this.shadowRoot?.querySelector<HTMLButtonElement>('.new-profile')?.focus();
        return;
      }
      // Walk rows by data-profile (mirrors the Escape handler — avoids
      // querySelector injection for names containing CSS-special chars).
      const rows = this.shadowRoot?.querySelectorAll<HTMLLIElement>('li[data-profile]');
      const li = rows ? Array.from(rows).find((el) => el.dataset.profile === trigger) : undefined;
      li?.querySelector<HTMLButtonElement>('.overflow')?.focus();
    });
  }

  private _onDialogCancel = (): void => {
    // The Cancel button is disabled while `_busy` is true, but guard
    // programmatic firers (tests, parent-dispatched events) too.
    if (this._busy) return;
    this._mode = 'list';
    this._target = null;
    this._error = null;
    this._restoreFocusAfterDialog();
  };

  private _onDialogSave = async (e: DialogSaveEvent): Promise<void> => {
    if (!this.hass || this._busy) return;
    const { name, description } = e.detail;
    const mode = this._mode;
    const target = this._target;
    this._busy = true;
    try {
      if (mode === 'create') {
        await createProfile(this.hass, { name, description });
      } else if (mode === 'clone' && target) {
        await cloneProfile(this.hass, { source: target, target: name, description });
      } else if (mode === 'rename' && target) {
        // No-op rename: skip the service call (backend would no-op anyway).
        if (name !== target) {
          await renameProfile(this.hass, { old: target, new: name });
        }
      } else {
        return;
      }
      this._mode = 'list';
      this._target = null;
      this._error = null;
      this._restoreFocusAfterDialog();
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to save profile.';
    } finally {
      this._busy = false;
    }
  };

  private _onConfirmDelete = async (): Promise<void> => {
    if (!this.hass || !this._target || this._busy) return;
    const target = this._target;
    this._busy = true;
    try {
      await deleteProfile(this.hass, { name: target });
      this._mode = 'list';
      this._target = null;
      this._error = null;
      // After delete the row vanishes; trigger restore is best-effort —
      // falls through to no-op if the row's overflow button is gone.
      this._restoreFocusAfterDialog();
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to delete profile.';
    } finally {
      this._busy = false;
    }
  };

  protected override render() {
    if (!this.hass) return nothing;
    const state = this._readState();
    if (state === null) {
      return html`<div class="empty">Profile manager not registered yet.</div>`;
    }
    const { options, active, defaultProfile, descriptions, crudAvailable } = state;

    if (this._mode === 'create' || this._mode === 'clone' || this._mode === 'rename') {
      return html`
        ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : null}
        <profile-edit-dialog
          .mode=${this._mode}
          .existingName=${this._target ?? ''}
          .existingNames=${options}
          .busy=${this._busy}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
        ></profile-edit-dialog>
      `;
    }

    if (this._mode === 'confirm-delete' && this._target) {
      const isActive = this._target === active;
      return html`
        <div
          class="confirm-delete"
          @keydown=${(e: KeyboardEvent) => {
            // Escape = "no, don't delete" — the standard confirm-dialog
            // pattern. Skipped during a save-in-flight so the user can't
            // accidentally tear down state mid-await.
            if (e.key === 'Escape' && !this._busy) {
              e.preventDefault();
              this._onDialogCancel();
            }
          }}
          tabindex="-1"
        >
          <h3>Delete profile?</h3>
          <p>
            Delete <strong>${this._target}</strong>?${' '}
            ${isActive
              ? html`This profile is active — deleting will switch to
                  <strong>${defaultProfile}</strong>.`
              : ''}
          </p>
          ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : null}
          <div class="confirm-actions">
            <button class="button secondary" ?disabled=${this._busy} @click=${this._onDialogCancel}>
              Cancel
            </button>
            <button class="button danger" ?disabled=${this._busy} @click=${this._onConfirmDelete}>
              ${this._busy ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      `;
    }

    if (options.length === 0) {
      return html`<div class="empty">No profiles configured.</div>`;
    }

    return html`
      ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : null}
      ${crudAvailable
        ? html`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>`
        : nothing}
      <ul aria-label="Profiles">
        ${options.map((profile, index) =>
          this._renderRow(profile, index, active, defaultProfile, descriptions, crudAvailable),
        )}
      </ul>
      ${!crudAvailable
        ? html`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`
        : nothing}
    `;
  }

  private _renderRow(
    profile: string,
    index: number,
    active: string,
    defaultProfile: string,
    descriptions: Record<string, string>,
    crudAvailable: boolean,
  ) {
    const isActive = profile === active;
    const isDefault = profile === defaultProfile;
    const description = descriptions[profile] ?? '';
    // Stable `id` for aria-controls linkage. Profile names can contain
    // any character (only length is capped), so we anchor on the row
    // index instead of the name to avoid producing invalid id syntax.
    const menuId = `cb-profile-menu-${index}`;
    // We deliberately don't use `role="option"` / `role="listbox"` here.
    // ARIA's `option` content model is meant for text/inline content only,
    // and nesting a `role="menu"` widget inside it (our ⋮ menu) violates
    // the contract — screen readers report ambiguous structure. Plain
    // <li> with `aria-current` for the active row is well-supported and
    // keeps the menu nesting valid.
    return html`
      <li
        data-profile=${profile}
        tabindex="0"
        class=${isActive ? 'active' : ''}
        aria-current=${isActive ? 'true' : nothing}
        @click=${() => this._onSelect(profile)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._onSelect(profile);
          }
        }}
      >
        <span class="label">
          <span class="name">${profile}</span>
          ${description ? html`<span class="description">${description}</span>` : nothing}
        </span>
        ${isActive ? html`<span class="badge">Active</span>` : nothing}
        ${crudAvailable
          ? html`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${profile}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === profile ? menuId : nothing}
              aria-expanded=${this._openMenu === profile ? 'true' : 'false'}
              @click=${(e: Event) => this._toggleMenu(profile, e)}
            >
              ⋮
            </button>`
          : nothing}
        ${this._openMenu === profile
          ? html`
              <div
                id=${menuId}
                class="menu"
                role="menu"
                @click=${(e: Event) => e.stopPropagation()}
                @keydown=${(e: KeyboardEvent) => this._onMenuKeydown(e, profile)}
              >
                <button
                  role="menuitem"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this._onClone(profile);
                  }}
                >
                  Clone
                </button>
                <button
                  role="menuitem"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this._onRename(profile);
                  }}
                >
                  Rename
                </button>
                <button
                  role="menuitem"
                  class="danger"
                  ?disabled=${isDefault}
                  aria-disabled=${isDefault}
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    if (!isDefault) this._onDelete(profile);
                  }}
                  title=${isDefault ? 'Default profile cannot be deleted' : 'Delete'}
                >
                  Delete
                </button>
              </div>
            `
          : nothing}
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-profiles-tab': ComfortBandProfilesTab;
  }
}
