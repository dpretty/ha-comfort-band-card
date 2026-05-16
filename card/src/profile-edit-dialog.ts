/**
 * `<profile-edit-dialog>` — inline form for creating, cloning, or renaming a
 * profile.
 *
 * Mirrors `transition-edit-dialog`: controlled form, lives inside the parent
 * modal, emits `dialog-save` / `dialog-cancel` events. The parent (profiles-tab)
 * owns the action and decides whether to call `create_profile`,
 * `clone_profile`, or `rename_profile`.
 *
 * Three modes:
 *   - `'create'` — empty name + description.
 *   - `'clone'`  — empty name + description; parent knows the source.
 *   - `'rename'` — pre-fills name with `existingName`; description hidden
 *     (we don't expose edit-description without rename in this release).
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { tokens } from './styles.js';

export type ProfileDialogMode = 'create' | 'clone' | 'rename';

@customElement('profile-edit-dialog')
export class ProfileEditDialog extends LitElement {
  @property({ type: String }) public mode: ProfileDialogMode = 'create';
  /** Pre-fill name (rename mode) or display source label (clone mode). */
  @property({ type: String }) public existingName = '';
  /** Existing profile names — used for collision validation. */
  @property({ type: Array }) public existingNames: string[] = [];
  /** True while the parent is awaiting a service call. Disables action buttons
   *  to prevent double-submit. */
  @property({ type: Boolean }) public busy = false;

  @state() private _name = '';
  @state() private _description = '';
  @state() private _error: string | null = null;

  @query('input[name="name"]') private _nameInput?: HTMLInputElement;

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--cb-gap-md);
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--primary-text-color, #212121);
        border-radius: var(--cb-radius-card);
        color-scheme: light dark;
      }
      h3 {
        margin: 0 0 var(--cb-gap-md);
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color, #212121);
      }
      .source {
        margin: 0 0 var(--cb-gap-md);
        font-size: 12px;
        color: var(--secondary-text-color, #727272);
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: var(--cb-gap-md);
        font-size: 12px;
        color: var(--primary-text-color, #212121);
      }
      input {
        font: inherit;
        font-size: 14px;
        padding: 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--primary-text-color, #212121);
        background-color: var(
          --mdc-text-field-fill-color,
          var(--secondary-background-color, var(--card-background-color, #ffffff))
        );
        appearance: none;
        -webkit-appearance: none;
      }
      input::placeholder {
        color: var(--secondary-text-color, #727272);
        opacity: 1;
      }
      input:focus-visible {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: 1px;
      }
      .error {
        color: var(--error-color, #b71c1c);
        font-size: 12px;
        margin-bottom: var(--cb-gap-sm);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-sm);
      }
      .button {
        font: inherit;
        padding: 6px 12px;
        /* WCAG 2.5.5: 44×44 minimum touch target for the action buttons. */
        min-height: 44px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid transparent;
        cursor: pointer;
        font-size: 13px;
      }
      .button.primary {
        background: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #ffffff);
      }
      .button.secondary {
        background: transparent;
        border-color: var(--divider-color, #cccccc);
        color: var(--primary-text-color, #212121);
      }
    `,
  ];

  protected override willUpdate(changed: Map<string | number | symbol, unknown>): void {
    if (changed.has('mode') || changed.has('existingName')) {
      // Re-seed defaults whenever the parent changes mode or target.
      this._name = this.mode === 'rename' ? this.existingName : '';
      this._description = '';
      this._error = null;
    }
  }

  protected override updated(changed: Map<string | number | symbol, unknown>): void {
    // Re-focus on every mode/target change so a Clone→Cancel→Rename
    // sequence (which reuses this element) puts the cursor back in the
    // name input. Skip when only `busy` toggles so we don't yank focus
    // away while the user is reading an error.
    if (changed.has('mode') || changed.has('existingName')) {
      queueMicrotask(() => {
        this._nameInput?.focus();
        this._nameInput?.select();
      });
    }
  }

  private _onSave = (): void => {
    if (this.busy) return;
    if (!this._validate()) return;
    this.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { name: this._name.trim(), description: this._description.trim() },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private _onCancel = (): void => {
    if (this.busy) return;
    this.dispatchEvent(new CustomEvent('dialog-cancel', { bubbles: true, composed: true }));
  };

  private _onKey = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._onSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._onCancel();
    }
  };

  private _validate(): boolean {
    const name = this._name.trim();
    if (!name) {
      this._error = 'Name cannot be empty.';
      return false;
    }
    // Allow no-op rename (same name) — parent will short-circuit. Otherwise
    // any other collision is rejected client-side; backend revalidates.
    const collidesWithOther = this.existingNames.some(
      (n) => n === name && !(this.mode === 'rename' && n === this.existingName),
    );
    if (collidesWithOther) {
      this._error = `Profile ${name} already exists.`;
      return false;
    }
    this._error = null;
    return true;
  }

  private _heading(): string {
    if (this.mode === 'create') return 'New profile';
    if (this.mode === 'clone') return 'Clone profile';
    return 'Rename profile';
  }

  protected override render() {
    return html`
      <h3>${this._heading()}</h3>
      ${this.mode === 'clone'
        ? html`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>`
        : null}
      <label>
        Name
        <input
          name="name"
          type="text"
          autocomplete="off"
          spellcheck="false"
          .value=${this._name}
          @input=${(e: Event) => (this._name = (e.target as HTMLInputElement).value)}
          @keydown=${this._onKey}
        />
      </label>
      ${this.mode !== 'rename'
        ? html`<label>
            Description (optional)
            <input
              name="description"
              type="text"
              autocomplete="off"
              .value=${this._description}
              @input=${(e: Event) => (this._description = (e.target as HTMLInputElement).value)}
              @keydown=${this._onKey}
            />
          </label>`
        : null}
      ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        <button class="button secondary" ?disabled=${this.busy} @click=${this._onCancel}>
          Cancel
        </button>
        <button class="button primary" ?disabled=${this.busy} @click=${this._onSave}>
          ${this.busy ? 'Saving…' : 'Save'}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'profile-edit-dialog': ProfileEditDialog;
  }
}
