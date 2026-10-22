/**
 * `<comfort-band-modal>` — full-screen tabbed dialog opened by tile tap.
 *
 * Uses the native `<dialog>` element (modal API): `showModal()` opens with
 * a backdrop, ESC and click-outside close it. No browser_mod dependency.
 *
 * Tabs: Now and Schedule for everyone; Advanced (settings, profiles and
 * history, #30) for whoever sets the house up.
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import './tabs/now-tab.js';
import './tabs/schedule-tab.js';
import './tabs/advanced-tab.js';
import type { ZoneEntities } from './helpers.js';
import type { HomeAssistant } from './types.js';
import { tokens } from './styles.js';

type TabId = 'now' | 'schedule' | 'advanced';

const TABS: ReadonlyArray<{ id: TabId; label: string }> = [
  { id: 'now', label: 'Now' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'advanced', label: 'Advanced' },
];

@customElement('comfort-band-modal')
export class ComfortBandModal extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';
  @property({ type: String }) public zoneName = '';
  @property({ attribute: false }) public entities?: ZoneEntities;

  @state() private _activeTab: TabId = 'now';
  @state() private _isOpen = false;

  @query('dialog') private _dialog?: HTMLDialogElement;

  public static override styles = [
    tokens,
    css`
      :host {
        --cb-modal-max-width: 480px;
      }
      dialog {
        width: min(90vw, var(--cb-modal-max-width));
        max-height: min(90vh, 720px);
        /* Anchored to the top rather than centred. A modal <dialog> is centred
           on its own height by default, and every tab is a different height,
           so switching tabs moved the whole dialog -- tab bar included -- out
           from under the finger that had just tapped it. With the top fixed,
           only the bottom edge moves. */
        margin-block: max(16px, 5vh) auto;
        padding: 0;
        border: none;
        border-radius: var(--cb-radius-card);
        /* Use --card-background-color (general HA surface), NOT
           --ha-card-background, so the dialog stays readable when the
           parent card has a transparent-bg theme override (e.g. a
           picture-elements floorplan overlay). */
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--cb-text-primary);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
        overflow: hidden;
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.4);
      }
      .frame {
        display: flex;
        flex-direction: column;
        max-height: inherit;
      }
      header {
        /* Header and tab bar keep their height; only the panel scrolls. As
           flex items they would otherwise shrink when a tall panel hits the
           dialog's max-height, and the nav's overflow-x then clipped the tab
           labels in half. */
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--cb-gap-md);
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      header h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      .close {
        font: inherit;
        font-size: 22px;
        line-height: 1;
        background: transparent;
        border: none;
        color: var(--cb-text-secondary);
        cursor: pointer;
        padding: 4px 8px;
      }
      nav {
        flex-shrink: 0;
        display: flex;
        gap: 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        overflow-x: auto;
      }
      nav button {
        font: inherit;
        font-size: 13px;
        padding: 10px 14px;
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        color: var(--cb-text-secondary);
        cursor: pointer;
        white-space: nowrap;
      }
      nav button[aria-selected='true'] {
        color: var(--cb-accent, var(--primary-color, #03a9f4));
        border-bottom-color: var(--cb-accent, var(--primary-color, #03a9f4));
      }
      .panel {
        overflow-y: auto;
        flex: 1;
      }
      .placeholder {
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
        text-align: center;
      }
    `,
  ];

  public open(): void {
    this._isOpen = true;
    this.updateComplete.then(() => this._dialog?.showModal());
  }

  public close(): void {
    this._dialog?.close();
  }

  public selectTab(tab: TabId): void {
    this._activeTab = tab;
  }

  private _onClose = () => {
    this._isOpen = false;
    this.dispatchEvent(
      new CustomEvent('comfort-band-modal-close', { bubbles: true, composed: true }),
    );
  };

  private _onSelectTab = (tab: TabId) => {
    this._activeTab = tab;
  };

  /**
   * WAI-ARIA tab pattern keyboard handling (APG §3.26).
   *
   * - ArrowLeft / ArrowRight cycle through tabs with wrap.
   * - Home / End jump to first / last.
   * - Selection and focus move together (the "automatic activation"
   *   variant), which is the right call for this modal: panels are cheap
   *   to swap and there's no risk of expensive async work being triggered
   *   on every arrow press.
   */
  private _onTablistKeydown = (e: KeyboardEvent): void => {
    const idx = TABS.findIndex((t) => t.id === this._activeTab);
    if (idx < 0) return;
    let nextIdx: number;
    switch (e.key) {
      case 'ArrowLeft':
        nextIdx = (idx - 1 + TABS.length) % TABS.length;
        break;
      case 'ArrowRight':
        nextIdx = (idx + 1) % TABS.length;
        break;
      case 'Home':
        nextIdx = 0;
        break;
      case 'End':
        nextIdx = TABS.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const nextTab = TABS[nextIdx].id;
    this._activeTab = nextTab;
    // Roving-tabindex focus management: after Lit re-renders with the
    // new active tab (which flips tabindex on the buttons), grab the
    // newly-selected button and focus it so keyboard users stay in the
    // tablist instead of being kicked out by the previous tab going
    // tabindex=-1.
    void this.updateComplete.then(() => {
      const btn = this.renderRoot.querySelector<HTMLButtonElement>(`#cb-tab-${nextTab}`);
      btn?.focus();
    });
  };

  protected override render() {
    if (!this._isOpen) return nothing;
    const title = this.zoneName || this.zone || 'Comfort Band';
    return html`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${title}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${TABS.map(
              (t) => html`
                <button
                  id="cb-tab-${t.id}"
                  role="tab"
                  aria-selected=${this._activeTab === t.id}
                  aria-controls="cb-panel"
                  tabindex=${this._activeTab === t.id ? 0 : -1}
                  @click=${() => this._onSelectTab(t.id)}
                >
                  ${t.label}
                </button>
              `,
            )}
          </nav>
          <div
            id="cb-panel"
            class="panel"
            role="tabpanel"
            aria-labelledby="cb-tab-${this._activeTab}"
          >
            ${this._renderTab()}
          </div>
        </div>
      </dialog>
    `;
  }

  private _renderTab() {
    switch (this._activeTab) {
      case 'now':
        return html`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case 'schedule':
        return html`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case 'advanced':
        return html`<comfort-band-advanced-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-advanced-tab>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-modal': ComfortBandModal;
  }
}
