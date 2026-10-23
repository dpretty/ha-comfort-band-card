/**
 * `<comfort-band-diagnostics-tab>` — the Advanced tab's Diagnostics section:
 *
 *   - who decides heating and cooling now and what it decided, then what
 *     Learning and Predictive control would each do, to compare before
 *     turning one on;
 *   - what learning has learned: how the room drifts on its own and how fast
 *     heating and cooling move it, each saying where it came from, with the
 *     raw numbers under "Details";
 *   - the last 10 "How does it feel?" taps, newest first.
 *
 * Its section renders it only while open, so the feedback is fetched each
 * time it opens (`comfort_band/get_feedback`, integration v0.11.0+).
 */

import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ZoneEntities } from '../helpers.js';
import type { HomeAssistant } from '../types.js';
import { tokens } from '../styles.js';
import { bandText, degrees } from '../now-status.js';
import {
  ACTION_WORDS,
  CONTROLLER_NAMES,
  formatWhen,
  readDeciding,
  readRates,
  type Action,
  type Deciding,
  type Rates,
} from '../diagnostics.js';

/** "Yesterday 17:30 · …": a line that starts with a word starts with a
 *  capital. */
function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** How many feedback taps show. */
export const FEEDBACK_SHOWN = 10;

/** A recorded "How does it feel?" tap, as `comfort_band/get_feedback`
 *  returns it. */
export interface FeedbackEntry {
  timestamp: string;
  label: string;
  room_temp: number | null;
  low: number;
  high: number;
  action?: string;
  room_source?: string;
  peak_state?: string;
}

/** The Now tab's words for each tap. */
const FEEDBACK_WORDS: Record<string, string> = {
  too_cold: 'Too cool',
  just_right: 'Just right',
  too_hot: 'Too warm',
};

const METHOD_WORDS: Record<string, string> = {
  wls: 'Fitted',
  cached: 'Earlier',
  previous: 'Run before',
  rejected: 'Set aside',
  none: '—',
};

type FeedbackState =
  | { kind: 'loading' }
  | { kind: 'ready'; entries: FeedbackEntry[] }
  | { kind: 'old' }
  | { kind: 'error' };

@customElement('comfort-band-diagnostics-tab')
export class ComfortBandDiagnosticsTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';
  @property({ attribute: false }) public entities?: ZoneEntities;

  @state() private _feedback: FeedbackState = { kind: 'loading' };
  /** The zone the feedback was fetched for. */
  private _fetchedFor: string | null = null;

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
      }
      h3 {
        margin: var(--cb-gap-md) 0 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      h3:first-child {
        margin-top: 0;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 4px var(--cb-gap-md);
        padding: var(--cb-gap-sm) 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .row-label {
        flex: 1 1 12em;
        min-width: 0;
      }
      .title {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .desc,
      .note {
        overflow-wrap: anywhere;
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.35;
        color: var(--cb-text-secondary);
      }
      .value {
        margin-left: auto;
        max-width: 100%;
        overflow-wrap: anywhere;
        font-size: 14px;
        color: var(--cb-text-primary);
        text-align: right;
      }
      details.more {
        margin-top: var(--cb-gap-sm);
      }
      details.more > summary {
        display: flex;
        align-items: center;
        min-height: 44px;
        list-style: none;
        cursor: pointer;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      details.more > summary::-webkit-details-marker {
        display: none;
      }
      details.more > summary::before {
        content: '';
        flex: none;
        width: 6px;
        height: 6px;
        margin: 0 8px 0 2px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details.more[open] > summary::before {
        transform: rotate(45deg);
      }
      details.more > summary:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      /* The raw numbers scroll sideways in their own box rather than
         widening the dialog. */
      .table-wrap {
        overflow-x: auto;
      }
      .table-wrap:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      table {
        border-collapse: collapse;
        font-size: 12px;
        font-variant-numeric: tabular-nums;
        color: var(--cb-text-primary);
      }
      th,
      td {
        padding: 4px 5px;
        text-align: right;
        white-space: nowrap;
      }
      th:first-child,
      td:first-child {
        padding-left: 0;
        text-align: left;
      }
      thead th {
        font-weight: 500;
        color: var(--cb-text-secondary);
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        padding: var(--cb-gap-sm) 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      li .said {
        font-weight: 500;
      }
      li .detail {
        margin-top: 2px;
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
    `,
  ];

  protected override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    if (this.hass && this.zone && this._fetchedFor !== this.zone) {
      this._fetchedFor = this.zone;
      this._feedback = { kind: 'loading' };
      void this._load(this.zone);
    }
  }

  private async _load(zone: string): Promise<void> {
    try {
      const result = await this.hass!.callWS<{ entries?: unknown }>({
        type: 'comfort_band/get_feedback',
        zone,
      });
      if (this._fetchedFor !== zone) return;
      const entries = Array.isArray(result?.entries) ? (result.entries as FeedbackEntry[]) : [];
      this._feedback = { kind: 'ready', entries };
    } catch (err) {
      if (this._fetchedFor !== zone) return;
      const code =
        typeof err === 'object' && err !== null ? (err as { code?: unknown }).code : undefined;
      this._feedback = { kind: code === 'unknown_command' ? 'old' : 'error' };
    }
  }

  protected override render() {
    if (!this.hass || !this.entities) return nothing;
    const deciding = readDeciding(this.hass, this.entities);
    const rates = readRates(this.hass, this.entities);
    return html`
      <h3>Heating and cooling</h3>
      ${this._renderDeciding(deciding)}
      <h3>What it has learned</h3>
      ${rates === 'unavailable'
        ? html`<div class="note">What it has learned can’t be read right now.</div>`
        : rates
          ? this._renderRates(rates)
          : html`<div class="note">
              What it has learned needs the <code>comfort_band</code> integration v0.6.0 or later,
              with its entities turned on.
            </div>`}
      <h3>Feedback</h3>
      <div role="status">${this._renderFeedback()}</div>
    `;
  }

  private _row(title: string, value: string, desc = '', id = '') {
    return html`<div class="row" data-diag=${id || nothing}>
      <div class="row-label">
        <div class="title">${title}</div>
        ${desc ? html`<div class="desc">${desc}</div>` : nothing}
      </div>
      <div class="value">${value}</div>
    </div>`;
  }

  private _renderDeciding(d: Deciding) {
    const e = this.entities!;
    const paused =
      d.paused === true
        ? this._row(
            'Paused',
            '',
            '“Control this room” is off, so nothing is sent to the unit. Below is what it would do.',
            'paused',
          )
        : d.paused === null
          ? this._row(
              'Control this room',
              'Can’t tell',
              'Whether it’s paused can’t be read.',
              'paused',
            )
          : nothing;
    if (d.noReading) {
      return html`${paused}
      ${this._row(
        'On hold',
        '',
        'There’s no room reading, so nothing is decided until there is.',
        'on-hold',
      )}`;
    }
    // Only why: how each controller works is for the settings to explain.
    const why: Record<NonNullable<Deciding['reason']>, string> = {
      'stand-in': 'While a stand-in sensor is in use.',
      peak: 'While a peak is on.',
      'learning-off': 'Learning is off.',
      'no-learning': 'This version of the integration has no learning.',
      'not-ready': 'Predictive control is on, but not ready to plan yet.',
    };
    const word = (a: Action | null) => (a ? ACTION_WORDS[a] : 'Can’t tell');
    return html`
      ${paused}
      ${this._row(
        'Deciding now',
        d.controller ? CONTROLLER_NAMES[d.controller] : 'Can’t tell',
        d.controller ? (d.reason ? why[d.reason] : '') : 'Some of what decides it can’t be read.',
        'controller',
      )}
      ${this._row('Its decision', word(d.decision), '', 'decision')}
      ${typeof e.predictedAction === 'string'
        ? this._row('Learning would', word(d.learning), '', 'learning')
        : nothing}
      ${typeof e.mpcAction === 'string' || typeof e.mpcReady === 'string'
        ? this._row(
            'Predictive control would',
            d.predictive === 'not-ready' ? 'Not ready yet' : word(d.predictive),
            '',
            'predictive',
          )
        : nothing}
    `;
  }

  private _renderRates(r: Rates) {
    const perHour = (v: number | null) =>
      v === null ? '—' : `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v).toFixed(2)}`;
    // The integration counts the readings of the latest run, which aren't
    // the ones behind a rate from earlier or from the run before.
    const own = (d: Rates['details'][number]) => d.method !== 'cached' && d.method !== 'previous';
    return html`
      ${this._row('On its own', r.idle.value, r.idle.source, 'idle')}
      ${this._row('Heating', r.heat.value, r.heat.source, 'heat')}
      ${this._row('Cooling', r.cool.value, r.cool.source, 'cool')}
      <details class="more">
        <summary>Details</summary>
        <div class="table-wrap" tabindex="0" role="region" aria-label="The rates in numbers">
          <table>
            <thead>
              <tr>
                <td></td>
                <th scope="col">°C an hour</th>
                <th scope="col">Readings</th>
                <th scope="col">Spread</th>
                <th scope="col">How</th>
              </tr>
            </thead>
            <tbody>
              ${r.details.map(
                (d) =>
                  html`<tr>
                    <th scope="row">${d.name}</th>
                    <td>${perHour(d.perHour)}</td>
                    <td>${own(d) && d.samples !== null ? d.samples : '—'}</td>
                    <td>${own(d) && d.spread !== null ? `${d.spread.toFixed(2)}°` : '—'}</td>
                    <td>${d.method ? (METHOD_WORDS[d.method] ?? d.method) : '—'}</td>
                  </tr>`,
              )}
            </tbody>
          </table>
        </div>
        <div class="note">
          ${r.windowMinutes !== null && r.sampleCount !== null
            ? `Learning keeps ${r.sampleCount} readings, spanning ${Math.round(r.windowMinutes)} minutes.`
            : ''}
          ${r.updated !== null
            ? `The newest is from ${formatWhen(r.updated, Date.now(), this.hass)}.`
            : ''}
        </div>
      </details>
    `;
  }

  private _renderFeedback() {
    const f = this._feedback;
    if (f.kind === 'loading') return html`<div class="note">Loading…</div>`;
    if (f.kind === 'old') {
      return html`<div class="note">
        Feedback needs the <code>comfort_band</code> integration v0.11.0 or later.
      </div>`;
    }
    if (f.kind === 'error') {
      return html`<div class="note">Feedback can’t be loaded right now.</div>`;
    }
    if (f.entries.length === 0) {
      return html`<div class="note">
        None yet. Taps on “How does it feel?” on the Now tab show here.
      </div>`;
    }
    const now = Date.now();
    const shown = f.entries.slice(-FEEDBACK_SHOWN).reverse();
    return html`
      <ul>
        ${shown.map((entry) => this._renderEntry(entry, now))}
      </ul>
      ${f.entries.length > FEEDBACK_SHOWN
        ? html`<div class="note">The last ${FEEDBACK_SHOWN} of ${f.entries.length}.</div>`
        : nothing}
    `;
  }

  private _renderEntry(entry: FeedbackEntry, now: number) {
    const at = Date.parse(entry.timestamp);
    const band = bandText({ low: entry.low, high: entry.high });
    const reading =
      typeof entry.room_temp === 'number'
        ? `${degrees(entry.room_temp)}°, range ${band}`
        : `no reading, range ${band}`;
    const notes = [
      entry.room_source === 'fallback_sensor' || entry.room_source === 'climate'
        ? 'stand-in reading'
        : '',
      entry.peak_state === 'active'
        ? 'during a peak'
        : entry.peak_state === 'preconditioning'
          ? 'ahead of a peak'
          : '',
    ].filter(Boolean);
    return html`<li>
      <span class="said">${FEEDBACK_WORDS[entry.label] ?? entry.label}</span>
      <div class="detail">
        ${capitalise(
          [Number.isFinite(at) ? formatWhen(at, now, this.hass) : '', reading, ...notes]
            .filter(Boolean)
            .join(' · '),
        )}
      </div>
    </li>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-diagnostics-tab': ComfortBandDiagnosticsTab;
  }
}
