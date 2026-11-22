/**
 * `<comfort-band-modal>` — tabbed dialog opened by tile tap: full screen on
 * a phone, as HA's own dialogs are (#3); floating on anything larger.
 *
 * Uses the native `<dialog>` element (modal API): `showModal()` opens with
 * a backdrop, ESC and click-outside close it. No browser_mod dependency.
 *
 * Tabs: Now and Schedule for everyone; Advanced (settings, profiles and
 * history, #30) for whoever sets the house up.
 *
 * A change HA refuses is told by HA's own toast, which paints above the
 * dialog (HA 2026.9+) but is outside it, so while the dialog is open screen
 * readers don't hear it (#53). Where a tab leaves a refusal to that toast,
 * it hands the dialog plain words through `announce`, said to screen readers
 * from inside the dialog: nothing on screen changes. A tab's calls can be
 * answered after it has been swapped out, so the words are the dialog's.
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
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
  /** The last refusal said to screen readers, numbered so that the same
   *  words again are a new node, and so said again (#53). */
  @state() private _refusal: { words: string; n: number } | null = null;
  private _refusals = 0;

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
      /* WCAG 2.5.5: 44px each way (#3). The margins take the extra out of
         the header's padding, so the header is no taller and the ✕ sits
         where it did, at the line's end in either direction. */
      .close {
        font: inherit;
        font-size: 22px;
        line-height: 1;
        background: transparent;
        border: none;
        color: var(--cb-text-secondary);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 44px;
        min-height: 44px;
        margin-block: -7px;
        margin-inline-end: -7px;
        padding: 0;
      }
      nav {
        flex-shrink: 0;
        display: flex;
        gap: 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        overflow-x: auto;
      }
      /* WCAG 2.5.5: 44px tall (#3). */
      nav button {
        font: inherit;
        font-size: 13px;
        min-height: 44px;
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
      /* Heard, not seen: nothing on screen changes or moves (#53). */
      .refusal {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      .placeholder {
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
        text-align: center;
      }
      /* A phone (#3): full screen, where HA's own dialogs are (450 px wide
         or 500 px tall, or less). A floating dialog left 19 px of dashboard down
         each side of a 320 px phone. The padding keeps the header and the
         panel's end clear of a notch or the home indicator. */
      @media (max-width: 450px), (max-height: 500px) {
        dialog {
          box-sizing: border-box;
          width: 100%;
          max-width: none;
          height: 100%;
          max-height: none;
          margin: 0;
          border-radius: 0;
          box-shadow: none;
          padding: env(safe-area-inset-top, 0) env(safe-area-inset-right, 0)
            env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0);
        }
        .frame {
          height: 100%;
        }
      }
    `,
  ];

  /** Opens on Now, whichever tab it was left on: the family's tap shouldn't
   *  land on Advanced because someone set the house up last. */
  public open(): void {
    this._activeTab = 'now';
    this._isOpen = true;
    this.updateComplete.then(() => this._showModal());
  }

  /** Shows the dialog modal. One left open but not modal (below) is closed
   *  and shown again: `showModal()` refuses a dialog that's open. */
  private _showModal(): void {
    const dialog = this._dialog;
    if (!dialog?.isConnected) return;
    if (dialog.open) {
      if (isModal(dialog)) return;
      dialog.close();
    }
    dialog.showModal();
  }

  /**
   * A card moved in the page with its dialog open, as HA's masonry view does
   * when its columns change (a phone turned), leaves the dialog open but not
   * modal: out of the top layer, with no backdrop and no Esc, and placed in
   * what holds the card, where the next card or a floorplan's edge can
   * cover it (#75). Back on the page within MOVED_WITHIN_MS, it's shown
   * modal again, on the tab it was on.
   */
  public override connectedCallback(): void {
    super.connectedCallback();
    if (this._offPage === null) return;
    clearTimeout(this._offPage);
    this._offPage = null;
    this.updateComplete.then(() => {
      if (this._isOpen && this._dialog?.open) this._showModal();
    });
  }

  /** Set while the card is off the page with its dialog open: when it runs
   *  out, the card was hidden (a visibility condition, another view), not
   *  moved, and the dialog is closed for good, so it can't come back later
   *  over whatever is open then. */
  private _offPage: ReturnType<typeof setTimeout> | null = null;

  /** Off the page too long: closed. */
  private _closeAway = (): void => {
    this._offPage = null;
    this._dialog?.close();
    this._isOpen = false;
  };

  public close(): void {
    this._dialog?.close();
  }

  public selectTab(tab: TabId): void {
    this._activeTab = tab;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    // HA's toast is heard meanwhile: there's nothing to say on its return.
    this._refusal = null;
    if (!this._isOpen || !this._dialog?.open) return;
    if (this._offPage !== null) clearTimeout(this._offPage);
    this._offPage = setTimeout(this._closeAway, MOVED_WITHIN_MS);
  }

  /** Says a refused call to screen readers, while the dialog is open on the
   *  page. Closed, or with the card off the page, the dialog makes nothing
   *  inert, so HA's toast is heard, and nothing here is. A card moved in
   *  the page with the dialog open is shown modal again once back (#75).
   *  Of refusals answered at the same moment, only the last one's words
   *  are said. */
  private _announce = (words: string): void => {
    if (!this._isOpen || !this.isConnected) return;
    this._refusal = { words, n: ++this._refusals };
  };

  /** The next press puts the words away: they're about what was just
   *  tried. Clearing isn't said. */
  private _quiet = (): void => {
    this._refusal = null;
  };

  /** A press anywhere in the dialog: a pointer coming down, or a key. Heard
   *  in the capture phase, so before the control's own handler, and not at
   *  the click: the exact range sends its call as the pointer comes down
   *  or is let go, before the click of the same press. So a refusal of the
   *  call a press makes is kept, however soon HA answers. */
  private _quietOnPress = { handleEvent: this._quiet, capture: true };

  private _onClose = () => {
    // Shown modal again (#75): the close was the dialog's on its way back.
    if (this._dialog?.open) return;
    this._isOpen = false;
    this._refusal = null;
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
      <dialog
        @close=${this._onClose}
        @pointerdown=${this._quietOnPress}
        @keydown=${this._quietOnPress}
      >
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
        <div class="refusal" role="alert">
          ${this._refusal
            ? keyed(this._refusal.n, html`<span>${this._refusal.words}</span>`)
            : nothing}
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
          .announce=${this._announce}
        ></comfort-band-now-tab>`;
      case 'schedule':
        return html`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-schedule-tab>`;
      case 'advanced':
        return html`<comfort-band-advanced-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
          .announce=${this._announce}
        ></comfort-band-advanced-tab>`;
    }
  }
}

/** How long a card can be off the page with its dialog open and count as
 *  moved, not hidden (#75): HA's masonry view puts each card back as soon
 *  as it knows its size, well within this. */
const MOVED_WITHIN_MS = 1000;

/** Whether a dialog is shown modal; false where the engine can't tell. */
function isModal(dialog: HTMLDialogElement): boolean {
  try {
    return dialog.matches(':modal');
  } catch {
    return false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-modal': ComfortBandModal;
  }
}
