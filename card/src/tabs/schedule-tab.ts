/**
 * `<comfort-band-schedule-tab>` — Schedule tab content.
 *
 * Workflow:
 *   1. On mount, open a `comfort_band/subscribe_schedule` subscription for
 *      the active (zone, profile). The backend sends the current state
 *      immediately, then one event per future change — from any source.
 *   2. Render the timeline editor + the transitions.
 *   3. User taps empty timeline → add dialog (inline). User taps a
 *      transition → edit dialog. Long-press → delete event.
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
import { setSchedule, subscribeSchedule } from '../services.js';
import type { HomeAssistant, Transition, UnsubscribeFunc } from '../types.js';
import { tokens } from '../styles.js';

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
  @state() private _newLow: number | undefined;
  @state() private _newHigh: number | undefined;
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
        font-size: 12px;
        color: var(--cb-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .profile-value {
        font-size: 14px;
        font-weight: 500;
        text-transform: capitalize;
        color: var(--cb-text-primary);
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
      .list {
        list-style: none;
        padding: 0;
        margin: var(--cb-gap-md) 0 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .list li {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        padding: 6px 8px;
        border-radius: 6px;
      }
      .list li:hover {
        background: var(--cb-track-bg);
        cursor: pointer;
      }
      .list .at {
        font-variant-numeric: tabular-nums;
        font-weight: 500;
      }
    `,
  ];

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('hass') && this.hass && this._profile === '') {
      this._profile = readActiveProfile(this.hass) ?? 'home';
      void this._subscribe();
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
          this._transitions = schedule?.baseline ? [...schedule.baseline] : [];
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

  private _onAdd = (event: CustomEvent<{ at: string; low?: number; high?: number }>) => {
    this._newAt = event.detail.at;
    this._newLow = event.detail.low;
    this._newHigh = event.detail.high;
    this._editing = null;
    this._mode = 'add';
  };

  private _onEdit = (event: CustomEvent<{ transition: Transition }>) => {
    this._editing = event.detail.transition;
    this._mode = 'edit';
  };

  private _onDelete = async (event: CustomEvent<{ at: string }>) => {
    if (!this.hass) return;
    const next = this._transitions.filter((t) => t.at !== event.detail.at);
    await this._writeSchedule(next);
  };

  private _onUpdate = async (
    event: CustomEvent<{ oldAt: string; transition: Transition }>,
  ): Promise<void> => {
    if (!this.hass) return;
    const { oldAt, transition } = event.detail;
    // Drop the original entry by its old `at`, drop any collision at the new
    // `at`, then insert and sort. Same shape as `_onDialogSave`.
    const next = this._transitions
      .filter((t) => t.at !== oldAt && t.at !== transition.at)
      .concat(transition)
      .sort((a, b) => a.at.localeCompare(b.at));
    await this._writeSchedule(next);
  };

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
    next.sort((a, b) => a.at.localeCompare(b.at));
    await this._writeSchedule(next);
    this._mode = 'list';
    this._editing = null;
    this._newLow = undefined;
    this._newHigh = undefined;
  };

  private _onDialogDelete = async (event: CustomEvent<{ at: string }>): Promise<void> => {
    const next = this._transitions.filter((t) => t.at !== event.detail.at);
    await this._writeSchedule(next);
    this._mode = 'list';
    this._editing = null;
    this._newLow = undefined;
    this._newHigh = undefined;
  };

  private _onDialogCancel = () => {
    this._mode = 'list';
    this._editing = null;
    this._newLow = undefined;
    this._newHigh = undefined;
  };

  private async _writeSchedule(transitions: Transition[]): Promise<void> {
    if (!this.hass) return;
    try {
      await setSchedule(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions,
      });
      // Optimistic update; the subscription will echo the persisted (and
      // normalised) state right after.
      this._transitions = transitions;
    } catch (err) {
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
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || '—'}</span>
      </div>
      ${this._loading
        ? html`<div class="loading">Loading schedule…</div>`
        : this._error
          ? html`<div class="error">${this._error}</div>`
          : html`
              <comfort-band-schedule-chart
                .transitions=${this._transitions}
                @transition-add=${this._onAdd}
                @transition-edit=${this._onEdit}
                @transition-delete=${this._onDelete}
                @transition-update=${this._onUpdate}
              ></comfort-band-schedule-chart>
              ${this._renderList()}
            `}
    `;
  }

  private _renderList() {
    if (this._transitions.length === 0) return nothing;
    return html`
      <ul class="list">
        ${this._transitions.map(
          (t) => html`
            <li
              @click=${() =>
                this._onEdit(new CustomEvent('transition-edit', { detail: { transition: t } }))}
            >
              <span class="at">${t.at}</span>
              <span>${t.low.toFixed(1)}° – ${t.high.toFixed(1)}°</span>
            </li>
          `,
        )}
      </ul>
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
