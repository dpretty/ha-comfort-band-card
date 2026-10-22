/**
 * `<comfort-band-schedule-tab>` — Schedule tab content.
 *
 * **v0.9.0**: list-first editor. The chart (`<comfort-band-schedule-chart>`)
 * is now a read-only visualization. The list below it is the primary
 * editor: each row has explicit Edit + Delete buttons, plus an "Add a
 * change" button in the toolbar above the list. A row's Delete asks for
 * inline confirmation (no more long-press surprise from v0.8.x).
 *
 * Workflow:
 *   1. On mount, open a `comfort_band/subscribe_schedule` subscription for
 *      the active (zone, profile). The backend sends the current state
 *      immediately, then one event per future change — from any source.
 *   2. Render the read-only chart visualization + the editable list.
 *   3. User clicks Add → dialog (inline) seeded with sensible defaults.
 *      User clicks Edit or taps a row → dialog seeded with that row.
 *      User clicks Delete → inline confirm row replaces the normal row.
 *   4. All edits persist via `comfort_band.set_schedule` (full schedule
 *      replacement — atomic and simpler than per-transition mutations).
 *      The subscription delivers the echo, so two cards on different
 *      dashboards stay in sync without polling.
 */

import { LitElement, html, css, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../schedule-chart.js';
import '../transition-edit-dialog.js';
import { findActiveProfileEntity } from '../helpers.js';
import { parseTime } from '../schedule-chart.js';
import { setSchedule, subscribeSchedule } from '../services.js';
import { bandText, degrees, formatClock } from '../now-status.js';
import type { HomeAssistant, Transition, UnsubscribeFunc } from '../types.js';
import { tokens } from '../styles.js';

/** Compare transitions by `at` numerically (minutes-since-midnight) so a
 *  non-zero-padded `at` ever produced by an external integration sorts
 *  correctly — `"9:00"` would rank after `"10:00"` under localeCompare. */
function compareTransitions(a: Transition, b: Transition): number {
  return parseTime(a.at) - parseTime(b.at);
}

const SLOT_MINUTES = 15;
const DAY_MINUTES = 24 * 60;

/** Pick the first unoccupied 15-min slot after the latest existing transition,
 *  wrapping past midnight if needed; falls back to 06:00 for an empty schedule.
 *  Ensures the Add dialog never opens with a default `at` that collides with
 *  an existing transition (the save handler would otherwise reject it). */
function nextDefaultTime(transitions: Transition[]): string {
  if (transitions.length === 0) return '06:00';
  const taken = new Set(transitions.map((t) => parseTime(t.at)));
  const latest = Math.max(...taken);
  // Try slots starting one step after the latest, wrapping at midnight.
  // 96 slots in a day → bounded loop, guaranteed termination.
  for (let i = 1; i <= DAY_MINUTES / SLOT_MINUTES; i++) {
    const mins = (latest + i * SLOT_MINUTES) % DAY_MINUTES;
    if (!taken.has(mins)) return formatHHMM(mins);
  }
  // Schedule is full of every 15-min slot (96 entries). Vanishingly unlikely
  // but degrade gracefully — the dialog's validator will reject the duplicate.
  return formatHHMM((latest + SLOT_MINUTES) % DAY_MINUTES);
}

function formatHHMM(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

type Mode = 'list' | 'add' | 'edit';

@customElement('comfort-band-schedule-tab')
export class ComfortBandScheduleTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';

  @state() private _profile = '';
  @state() private _transitions: Transition[] = [];
  @state() private _loading = false;
  @state() private _error: string | null = null;
  @state() private _mode: Mode = 'list';
  @state() private _editing: Transition | null = null;
  @state() private _newAt = '06:00';
  /** `at` of the row currently showing the inline delete-confirm UI. Cleared
   *  by Cancel, by Confirm (after the write succeeds), or automatically in
   *  `willUpdate` when a remote write echoes back without the targeted row. */
  @state() private _confirmingDeleteAt: string | null = null;
  // Plain fields — `_mode` is the @state that drives re-renders; these are
  // read once when the dialog opens. Marking them @state would re-render on
  // every assignment. **Contract:** any handler that sets these MUST set
  // them BEFORE flipping `_mode = 'add'`, otherwise the dialog renders with
  // stale defaults.
  private _newLow: number | undefined;
  private _newHigh: number | undefined;
  /** Re-query-by-key trigger descriptor — restored on dismiss so keyboard
   *  users don't get yanked to body. Storing a *descriptor* (rather than a
   *  DOM reference) survives the row's DOM being recreated by the
   *  list re-render after a save / cancel — a DOM ref would be disconnected
   *  by then and `focus()` would silently no-op. */
  private _focusTrigger:
    | { kind: 'add' }
    | { kind: 'row'; at: string; button?: 'edit' | 'delete' }
    | null = null;
  private _unsub?: UnsubscribeFunc;
  // Incremented on every (re)subscribe and unsubscribe so stale callbacks
  // and slow `subscribeMessage` round-trips from a superseded attempt can
  // detect that they should bail out instead of leaking a subscription.
  private _subscribeGen = 0;

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: var(--cb-gap-sm);
      }
      .profile-label {
        font-size: 13px;
        color: var(--cb-text-secondary);
      }
      .loading,
      .error {
        text-align: center;
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
      }
      .error {
        color: var(--error-color, #b71c1c);
      }
      .list-toolbar {
        display: flex;
        justify-content: flex-end;
        margin: var(--cb-gap-md) 0 var(--cb-gap-sm);
      }
      .list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: var(--cb-gap-sm);
        font-size: 13px;
        padding: 8px 8px;
        border-radius: 6px;
        /* Explicit color — without this, .list li inherits the host's
           ambient color which in HA dark theme can resolve dark-on-dark.
           The v0.8.x bug. */
        color: var(--cb-text-primary);
        cursor: pointer;
      }
      .row:hover,
      .row:focus-visible {
        background: var(--cb-track-bg);
        outline: none;
      }
      .row:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
      }
      .row .at {
        font-variant-numeric: tabular-nums;
        font-weight: 500;
        color: var(--cb-text-primary);
        min-width: 48px;
      }
      .row .band {
        color: var(--cb-text-secondary);
        flex: 1;
      }
      .row .actions {
        display: flex;
        gap: 4px;
      }
      .row.confirm {
        background: var(--cb-track-bg);
        cursor: default;
      }
      .row.confirm .confirm-text {
        flex: 1;
        color: var(--cb-text-primary);
      }
      /* Buttons — copied from transition-edit-dialog.ts conventions so the
         list buttons match the dialog buttons visually. */
      .button {
        font: inherit;
        font-size: 13px;
        padding: 6px 12px;
        /* WCAG 2.5.5: 44×44 minimum touch target on action buttons. */
        min-height: 44px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid transparent;
        cursor: pointer;
      }
      .button:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
      }
      .button.primary {
        background: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #ffffff);
      }
      .button.secondary {
        background: transparent;
        border-color: var(--divider-color, #cccccc);
        color: var(--cb-text-primary);
      }
      .button.danger {
        background: transparent;
        color: var(--error-color, #b71c1c);
        border-color: var(--divider-color, #cccccc);
      }
      .empty {
        text-align: center;
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
      }
    `,
  ];

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('hass') && this.hass && this._profile === '') {
      this._profile = readActiveProfile(this.hass) ?? 'home';
      void this._subscribe();
    }
    // Auto-clear the inline delete-confirm if a remote write removed the
    // targeted row out from under us. Without this guard, Confirm would
    // attempt to write `next = _transitions.filter(...)` against a list that
    // already excluded the target → no-op write (mostly harmless) but the
    // confirm UI stays visible against a row that no longer exists.
    //
    // `changed.has(...)` is cast against `keyof this` because Lit's
    // PropertyValues<this> doesn't include private `_`-prefixed fields in
    // the public `keyof` set; the cast is the documented escape hatch.
    if (
      (changed as Map<PropertyKey, unknown>).has('_transitions') &&
      this._confirmingDeleteAt !== null &&
      !this._transitions.some((t) => t.at === this._confirmingDeleteAt)
    ) {
      this._confirmingDeleteAt = null;
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('hass') && this.hass) {
      const next = readActiveProfile(this.hass);
      if (next && next !== this._profile) {
        this._profile = next;
        void this._resubscribe();
      }
    }
    // When the inline confirm appears, focus the Cancel button (safe
    // default per WCAG / HIG conventions for destructive actions). Doing
    // this in `updated()` ensures the new DOM is attached before we focus.
    if (
      (changed as Map<PropertyKey, unknown>).has('_confirmingDeleteAt') &&
      this._confirmingDeleteAt !== null
    ) {
      const cancel = this.shadowRoot?.querySelector<HTMLButtonElement>(
        'li.row.confirm .button.secondary',
      );
      cancel?.focus();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    // Re-subscribe after a DOM detach/reattach (e.g. switching dashboard
    // tabs). `willUpdate`'s `_profile === ''` guard doesn't fire here
    // because `_profile` is already set from the prior mount. On the very
    // first mount this is a no-op: `_profile` is still the empty string
    // (falsy), so willUpdate owns the initial subscribe.
    if (this.hass && this.zone && this._profile && !this._unsub) {
      void this._subscribe();
    }
  }

  public override disconnectedCallback(): void {
    this._unsubscribe();
    super.disconnectedCallback();
  }

  private async _subscribe(): Promise<void> {
    if (!this.hass || !this.zone || !this._profile) {
      // Defensive: a misconfigured or torn-down element should never sit
      // in the "Loading…" state. Callers always check these conditions
      // before us, so this branch is unreachable in practice.
      this._loading = false;
      return;
    }
    const gen = ++this._subscribeGen;
    // Only show the loading state when we have nothing to display. On a
    // re-subscribe (profile flip, reconnect) keep the stale data visible
    // so the tab doesn't flash empty.
    if (this._transitions.length === 0) this._loading = true;
    this._error = null;
    try {
      const unsub = await subscribeSchedule(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (schedule) => {
          if (gen !== this._subscribeGen) return;
          // Sort defensively — the backend normalises and sorts on every
          // write, but the WS payload type is `Transition[]` with no order
          // guarantee, and the list view below renders straight from this
          // array.
          this._transitions = schedule?.baseline
            ? [...schedule.baseline].sort(compareTransitions)
            : [];
          this._loading = false;
        },
      );
      if (gen !== this._subscribeGen) {
        // Superseded while awaiting the round-trip — release the
        // dangling server-side subscription instead of leaking it.
        unsub();
        return;
      }
      this._unsub = unsub;
    } catch (err) {
      if (gen !== this._subscribeGen) return;
      this._error = err instanceof Error ? err.message : 'Failed to subscribe.';
      this._loading = false;
    }
  }

  private _unsubscribe(): void {
    // Bumping the gen here (in addition to `_subscribe()`'s bump) is
    // load-bearing: it invalidates an in-flight subscribe whose
    // `await subscribeSchedule(...)` may resolve after we've already
    // unsubscribed. Without it, the resolved handle would overwrite
    // `_unsub` for an element that already tore itself down.
    this._subscribeGen++;
    this._unsub?.();
    this._unsub = undefined;
  }

  private _resubscribe(): Promise<void> {
    this._unsubscribe();
    return this._subscribe();
  }

  // ----- list interaction handlers -----

  private _onAddClicked = () => {
    this._focusTrigger = { kind: 'add' };
    this._newAt = nextDefaultTime(this._transitions);
    this._newLow = defaultLow(this._transitions);
    this._newHigh = defaultHigh(this._transitions);
    this._editing = null;
    this._mode = 'add';
  };

  private _openEdit(transition: Transition, source: 'row' | 'edit'): void {
    this._focusTrigger = {
      kind: 'row',
      at: transition.at,
      button: source === 'edit' ? 'edit' : undefined,
    };
    this._editing = transition;
    this._mode = 'edit';
  }

  private _onRowClicked = (transition: Transition) => (_event: Event) => {
    // Buttons inside the row stop propagation themselves; this fires only
    // when the row body (the span columns) is clicked.
    this._openEdit(transition, 'row');
  };

  private _onRowKeydown = (transition: Transition) => (event: KeyboardEvent) => {
    // Only handle keydown events that originated on the row itself — not on
    // an in-row button. Without this guard, pressing Enter on the focused
    // Delete button would bubble to the row's keydown listener, fire
    // `preventDefault()` first, and suppress the button's synthetic click
    // (so Delete would open the Edit dialog instead of the confirm).
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._openEdit(transition, 'row');
      return;
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      this._focusTrigger = { kind: 'row', at: transition.at };
      this._confirmingDeleteAt = transition.at;
    }
  };

  private _onEditClicked = (transition: Transition) => (event: Event) => {
    event.stopPropagation();
    this._openEdit(transition, 'edit');
  };

  private _onDeleteClicked = (transition: Transition) => (event: Event) => {
    event.stopPropagation();
    this._focusTrigger = { kind: 'row', at: transition.at, button: 'delete' };
    this._confirmingDeleteAt = transition.at;
  };

  private _onCancelDelete = (event: Event) => {
    event.stopPropagation();
    this._confirmingDeleteAt = null;
    // Defer focus restore until the re-render replaces the confirm row
    // with the regular row (which carries the `data-at` attribute we
    // query in `_restoreFocus`).
    this.updateComplete.then(() => this._restoreFocus());
  };

  private _onConfirmDelete = async (event: Event): Promise<void> => {
    event.stopPropagation();
    const at = this._confirmingDeleteAt;
    if (!at || !this.hass) return;
    this._confirmingDeleteAt = null;
    const next = this._transitions.filter((t) => t.at !== at);
    await this._writeSchedule(next);
    this.updateComplete.then(() => this._restoreFocus());
  };

  private _onConfirmKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this._confirmingDeleteAt = null;
      this.updateComplete.then(() => this._restoreFocus());
    }
  };

  // ----- dialog handlers -----

  private _onDialogSave = async (event: CustomEvent<{ transition: Transition }>): Promise<void> => {
    const incoming = event.detail.transition;
    const next: Transition[] = [];
    if (this._mode === 'edit' && this._editing) {
      // Replace by old `at` (so a time edit moves the transition cleanly).
      const oldAt = this._editing.at;
      for (const t of this._transitions) {
        if (t.at === oldAt) continue;
        if (t.at === incoming.at) continue; // collision: drop the existing one at the new time
        next.push(t);
      }
      next.push(incoming);
    } else {
      // Add new — drop any existing transition at the same time.
      for (const t of this._transitions) {
        if (t.at !== incoming.at) next.push(t);
      }
      next.push(incoming);
    }
    next.sort(compareTransitions);
    await this._writeSchedule(next);
    this._exitDialogMode();
  };

  private _onDialogDelete = async (event: CustomEvent<{ at: string }>): Promise<void> => {
    const next = this._transitions.filter((t) => t.at !== event.detail.at);
    await this._writeSchedule(next);
    this._exitDialogMode();
  };

  private _onDialogCancel = () => {
    this._exitDialogMode();
  };

  private _exitDialogMode(): void {
    this._mode = 'list';
    this._editing = null;
    this._newLow = undefined;
    this._newHigh = undefined;
    // Defer focus restore so the dialog's DOM is gone before we try to focus
    // the trigger — focusing a not-yet-attached element silently no-ops.
    this.updateComplete.then(() => this._restoreFocus());
  }

  private _restoreFocus(): void {
    const trigger = this._focusTrigger;
    this._focusTrigger = null;
    if (!trigger) return;
    const root = this.shadowRoot;
    if (!root) return;
    let target: HTMLElement | null = null;
    if (trigger.kind === 'add') {
      target = root.querySelector<HTMLElement>('.list-toolbar button.primary');
    } else {
      // `:` inside a quoted attribute-selector value is a literal; no escape
      // needed. `HH:MM` strings contain only digits and `:`, both of which
      // are safe in this context.
      const row = root.querySelector<HTMLElement>(`li.row[data-at="${trigger.at}"]`);
      if (row && trigger.button === 'edit') {
        target = row.querySelector<HTMLElement>('button.secondary');
      } else if (row && trigger.button === 'delete') {
        target = row.querySelector<HTMLElement>('button.danger');
      } else {
        target = row;
      }
    }
    // Fall back to the Add button when the originating row was deleted —
    // keeps focus visible somewhere sensible rather than dropping to body.
    target = target ?? root.querySelector<HTMLElement>('.list-toolbar button.primary');
    target?.focus();
  }

  private async _writeSchedule(transitions: Transition[]): Promise<void> {
    if (!this.hass) return;
    // Apply the optimistic update BEFORE the await so a rapidly-fired
    // second call reads the post-write state rather than the stale
    // pre-write snapshot. The subscription will echo the persisted (and
    // normalised) state right after; on failure the catch restores via
    // `_error` and the next echo will overwrite `_transitions` back to
    // the server's authoritative copy.
    const previous = this._transitions;
    this._transitions = transitions;
    try {
      await setSchedule(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions,
      });
    } catch (err) {
      this._transitions = previous;
      this._error = err instanceof Error ? err.message : 'Failed to save schedule.';
    }
  }

  protected override render() {
    if (!this.hass) return nothing;

    if (this._mode === 'add' || this._mode === 'edit') {
      const seed: Transition | null =
        this._mode === 'edit'
          ? this._editing
          : {
              at: this._newAt,
              low: this._newLow ?? defaultLow(this._transitions),
              high: this._newHigh ?? defaultHigh(this._transitions),
            };
      return html`
        <transition-edit-dialog
          .transition=${seed}
          .isNew=${this._mode === 'add'}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }

    return html`
      ${this._renderHeader()}
      ${this._loading
        ? html`<div class="loading">Loading schedule…</div>`
        : this._error
          ? html`<div class="error" role="alert">${this._error}</div>`
          : html`
              <comfort-band-schedule-chart
                .transitions=${this._transitions}
              ></comfort-band-schedule-chart>
              <div class="list-toolbar">
                <button class="button primary" @click=${this._onAddClicked}>+ Add a change</button>
              </div>
              ${this._renderList()}
            `}
    `;
  }

  /**
   * Which profile's schedule this is, named as typed, where profiles are set
   * up. Not "the room follows it": with no schedule of its own in the active
   * profile, a room follows the default profile's.
   */
  private _renderHeader() {
    const profile = this.hass ? readActiveProfile(this.hass) : null;
    // While the select can't be read, it has no name to give.
    if (!profile || profile === 'unavailable' || profile === 'unknown') return nothing;
    return html`<div class="header">
      <span class="profile-label">Schedule: ${profile}</span>
    </div>`;
  }

  private _renderList() {
    if (this._transitions.length === 0) {
      return html`<div class="empty">No changes yet. Use “Add a change” to create one.</div>`;
    }
    return html`
      <ul class="list" role="list">
        ${this._transitions.map((t) =>
          this._confirmingDeleteAt === t.at ? this._renderConfirmRow(t) : this._renderRow(t),
        )}
      </ul>
    `;
  }

  private _renderRow(t: Transition) {
    const at = formatClock(t.at, this.hass);
    const ariaLabel = `Edit the ${at} change, ${degrees(t.low)} to ${degrees(t.high)} degrees`;
    return html`
      <li
        class="row"
        role="listitem"
        tabindex="0"
        data-at=${t.at}
        aria-label=${ariaLabel}
        @click=${this._onRowClicked(t)}
        @keydown=${this._onRowKeydown(t)}
      >
        <span class="at">${at}</span>
        <span class="band">${bandText(t)}</span>
        <span class="actions">
          <button
            class="button secondary"
            aria-label="Edit the ${at} change"
            @click=${this._onEditClicked(t)}
          >
            Edit
          </button>
          <button
            class="button danger"
            aria-label="Delete the ${at} change"
            @click=${this._onDeleteClicked(t)}
          >
            Delete
          </button>
        </span>
      </li>
    `;
  }

  private _renderConfirmRow(t: Transition) {
    const question = `Delete the ${formatClock(t.at, this.hass)} change?`;
    return html`
      <li
        class="row confirm"
        role="alertdialog"
        aria-label=${question}
        @keydown=${this._onConfirmKeydown}
      >
        <span class="confirm-text">${question}</span>
        <span class="actions">
          <button class="button secondary" @click=${this._onCancelDelete}>Cancel</button>
          <button class="button danger" @click=${this._onConfirmDelete}>Delete</button>
        </span>
      </li>
    `;
  }
}

function readActiveProfile(hass: HomeAssistant): string | null {
  const entity = findActiveProfileEntity(hass);
  if (!entity) return null;
  return hass.states[entity]?.state ?? null;
}

function defaultLow(transitions: Transition[]): number {
  if (transitions.length === 0) return 19;
  return transitions[transitions.length - 1].low;
}

function defaultHigh(transitions: Transition[]): number {
  if (transitions.length === 0) return 22;
  return transitions[transitions.length - 1].high;
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-schedule-tab': ComfortBandScheduleTab;
  }
}
