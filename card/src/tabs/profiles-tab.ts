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
        padding: 4px 8px;
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
        right: var(--cb-gap-md);
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
        color: var(--cb-text-secondary, var(--secondary-text-color, #727272));
      }
      .confirm-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-sm);
      }
      .button {
        font: inherit;
        padding: 6px 12px;
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
    // Fall back to "home" if the backend hasn't been upgraded yet so the
    // UI degrades gracefully.
    const defaultProfile = typeof defaultAttr === 'string' && defaultAttr ? defaultAttr : 'home';
    const descAttr = state.attributes.descriptions;
    const descriptions: Record<string, string> = {};
    if (descAttr && typeof descAttr === 'object' && !Array.isArray(descAttr)) {
      for (const [k, v] of Object.entries(descAttr as Record<string, unknown>)) {
        if (typeof v === 'string') descriptions[k] = v;
      }
    }
    return { options, active, defaultProfile, descriptions };
  }

  private _onSelect(profile: string): void {
    if (!this.hass) return;
    void setProfile(this.hass, { profile });
  }

  private _toggleMenu(profile: string, e: Event): void {
    e.stopPropagation();
    this._openMenu = this._openMenu === profile ? null : profile;
  }

  private _onNew(): void {
    this._error = null;
    this._target = null;
    this._mode = 'create';
  }

  private _onClone(profile: string): void {
    this._error = null;
    this._openMenu = null;
    this._target = profile;
    this._mode = 'clone';
  }

  private _onRename(profile: string): void {
    this._error = null;
    this._openMenu = null;
    this._target = profile;
    this._mode = 'rename';
  }

  private _onDelete(profile: string): void {
    this._error = null;
    this._openMenu = null;
    this._target = profile;
    this._mode = 'confirm-delete';
  }

  private _onDialogCancel = (): void => {
    this._mode = 'list';
    this._target = null;
    this._error = null;
  };

  private _onDialogSave = async (e: DialogSaveEvent): Promise<void> => {
    if (!this.hass) return;
    const { name, description } = e.detail;
    const mode = this._mode;
    const target = this._target;
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
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to save profile.';
    }
  };

  private _onConfirmDelete = async (): Promise<void> => {
    if (!this.hass || !this._target) return;
    const target = this._target;
    try {
      await deleteProfile(this.hass, { name: target });
      this._mode = 'list';
      this._target = null;
      this._error = null;
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to delete profile.';
    }
  };

  protected override render() {
    if (!this.hass) return nothing;
    const state = this._readState();
    if (state === null) {
      return html`<div class="empty">Profile manager not registered yet.</div>`;
    }
    const { options, active, defaultProfile, descriptions } = state;

    if (this._mode === 'create' || this._mode === 'clone' || this._mode === 'rename') {
      return html`
        ${this._error ? html`<div class="error">${this._error}</div>` : null}
        <profile-edit-dialog
          .mode=${this._mode}
          .existingName=${this._target ?? ''}
          .existingNames=${options}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
        ></profile-edit-dialog>
      `;
    }

    if (this._mode === 'confirm-delete' && this._target) {
      const isActive = this._target === active;
      return html`
        <div class="confirm-delete">
          <h3>Delete profile?</h3>
          <p>
            Delete <strong>${this._target}</strong>?${' '}
            ${isActive
              ? html`This profile is active — deleting will switch to
                  <strong>${defaultProfile}</strong>.`
              : ''}
          </p>
          ${this._error ? html`<div class="error">${this._error}</div>` : null}
          <div class="confirm-actions">
            <button class="button secondary" @click=${this._onDialogCancel}>Cancel</button>
            <button class="button danger" @click=${this._onConfirmDelete}>Delete</button>
          </div>
        </div>
      `;
    }

    if (options.length === 0) {
      return html`<div class="empty">No profiles configured.</div>`;
    }

    return html`
      ${this._error ? html`<div class="error">${this._error}</div>` : null}
      <button class="new-profile" type="button" @click=${this._onNew}>+ New profile</button>
      <ul role="listbox" aria-label="Profiles">
        ${options.map((profile) => this._renderRow(profile, active, defaultProfile, descriptions))}
      </ul>
    `;
  }

  private _renderRow(
    profile: string,
    active: string,
    defaultProfile: string,
    descriptions: Record<string, string>,
  ) {
    const isActive = profile === active;
    const isDefault = profile === defaultProfile;
    const description = descriptions[profile] ?? '';
    return html`
      <li
        role="option"
        tabindex="0"
        class=${isActive ? 'active' : ''}
        aria-selected=${isActive}
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
        <button
          class="overflow"
          type="button"
          aria-label="More actions for ${profile}"
          aria-haspopup="menu"
          aria-expanded=${this._openMenu === profile}
          @click=${(e: Event) => this._toggleMenu(profile, e)}
        >
          ⋮
        </button>
        ${this._openMenu === profile
          ? html`
              <div class="menu" role="menu" @click=${(e: Event) => e.stopPropagation()}>
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
