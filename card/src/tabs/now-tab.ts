/**
 * `<comfort-band-now-tab>` — the "Now" tab content of the modal.
 *
 * Top to bottom:
 *   - The temperature that drives control, large; the other underneath.
 *   - One status line: what the room is doing, the range in force, and when
 *     it next changes ("Comfortable · 17.5–23° until 9 pm").
 *   - "Adjust for" (1 h · 3 h), then Cooler / Warmer. Each tap moves the
 *     whole range by 0.5°; taps made close together are sent as one
 *     `comfort_band.start_override` once they stop, for the length picked.
 *     Picking a length while an adjustment runs re-times it. The lengths are
 *     relative, so the panel's clock doesn't come into it; the end shown is
 *     HA's.
 *   - "Back to schedule" while an adjustment runs.
 *   - While a call from this tab is going through, these controls ignore
 *     presses (marked aria-disabled, so they keep focus), so nothing is
 *     built on a state the tab has just changed.
 *   - "How does it feel?" feedback pills (`comfort_band.record_feedback`).
 *
 * When the room sensor is offline, a sentence under the status says what that
 * means for the room and what to do.
 *
 * Where the integration (v0.23.0+) says no schedule sets the zone's band, an
 * adjustment's band is the zone's band from then on, so there is no length to
 * choose, no "until" and no "Back to schedule".
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../band-gauge.js';
import type { ZoneEntities } from '../helpers.js';
import type { HomeAssistant } from '../types.js';
import { cancelOverride, recordFeedback, startOverride } from '../services.js';
import type { FeedbackLabel } from '../services.js';
import { tokens } from '../styles.js';
import {
  type Band,
  bandText,
  formatTime,
  headlineTemperature,
  shiftBand,
  statusLine,
} from '../now-status.js';
import { STATUS_ICONS, controlling, readRoom, readSchedule, sensorNotice } from '../room-status.js';

/** Feedback pills: service label → button text. Order = display order. */
const FEEDBACK_PILLS: ReadonlyArray<{ label: FeedbackLabel; text: string }> = [
  { label: 'too_cold', text: 'Too cool' },
  { label: 'just_right', text: 'Just right' },
  { label: 'too_hot', text: 'Too warm' },
];

/** How long the tapped pill stays highlighted after a successful record. */
const FEEDBACK_CONFIRM_MS = 1500;

/** Taps on Warmer / Cooler made within this long of each other are one change. */
export const ADJUST_DELAY_MS = 1500;
/** The length used until another is picked. */
const DEFAULT_HOURS = 3;

/** How long an adjustment lasts, in hours. */
type Length = 1 | 3;

/** Warmer / Cooler taps not yet sent: the range they started from, and how
 *  many steps from it (warmer positive). They're sent for the length picked. */
interface Burst {
  base: Band;
  steps: number;
  /** A length was picked during the burst: send it even if the taps cancel out. */
  picked: boolean;
}

@customElement('comfort-band-now-tab')
export class ComfortBandNowTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';
  @property({ attribute: false }) public entities?: ZoneEntities;

  /** The pill briefly highlighted after a successful `record_feedback`. */
  @state() private _feedbackConfirmed: FeedbackLabel | null = null;
  /** Timer that clears `_feedbackConfirmed`; cancelled on disconnect so it
   *  never fires `setState` on an unmounted element. */
  private _feedbackTimer: ReturnType<typeof setTimeout> | null = null;
  /** Monotonic tap counter. Service calls are concurrent and may resolve
   *  out of order, so each tap captures its seq and only claims the
   *  highlight if it's still the latest — the last-tapped pill always wins,
   *  regardless of which round-trip finishes first. */
  private _feedbackSeq = 0;

  /** The length picked under "Adjust for" in this tab, if any. */
  @state() private _length: Length | null = null;
  @state() private _burst: Burst | null = null;
  private _burstTimer: ReturnType<typeof setTimeout> | null = null;
  /** What a call from this tab is doing while it goes through, such as
   *  "Going back to the schedule"; the controls ignore presses meanwhile, so
   *  no other such call starts (the feedback buttons aside, which don't
   *  change the range). */
  @state() private _busy: string | null = null;

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      .temperature {
        display: flex;
        align-items: baseline;
        gap: var(--cb-gap-sm);
        flex-wrap: wrap;
      }
      .temperature .value {
        font-size: 40px;
        font-weight: 300;
        line-height: 1;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
      }
      .temperature .note,
      .warn {
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
      .warn {
        margin-top: 4px;
        font-style: italic;
      }
      .gauge-row {
        margin: var(--cb-gap-md) 0;
      }
      .status {
        display: flex;
        align-items: center;
        gap: var(--cb-gap-sm);
        font-size: 15px;
        color: var(--cb-text-primary);
        min-height: 24px;
      }
      .status ha-icon {
        --mdc-icon-size: 20px;
        /* Not a theme's --icon-primary-color: the colours below. */
        --icon-primary-color: currentColor;
        color: var(--cb-text-secondary);
      }
      .status.heating ha-icon {
        color: var(--cb-action-heating);
      }
      .status.cooling ha-icon {
        color: var(--cb-action-cooling);
      }
      .status.sensor ha-icon {
        color: var(--warning-color, #ffa600);
      }
      .notice {
        margin-top: 4px;
        font-size: 13px;
        color: var(--cb-text-secondary);
      }
      section {
        margin-top: var(--cb-gap-lg);
      }
      h3 {
        margin: 0 0 var(--cb-gap-sm);
        font-size: 13px;
        font-weight: 500;
        color: var(--cb-text-secondary);
      }
      .lengths,
      .steps {
        display: flex;
        gap: var(--cb-gap-sm);
      }
      .lengths button,
      .steps button,
      .back {
        flex: 1;
        font: inherit;
        /* WCAG 2.5.5: 44px touch targets on a wall panel. */
        min-height: 44px;
        padding: 6px 12px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        background: transparent;
        color: var(--cb-text-primary);
        cursor: pointer;
      }
      .steps {
        margin-top: var(--cb-gap-sm);
      }
      .steps button {
        font-size: 15px;
      }
      .lengths button[aria-pressed='true'] {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        /* A border as well as the fill, so the choice shows in forced colours. */
        border: 2px solid currentColor;
        color: #ffffff;
        font-weight: 500;
      }
      .lengths button[aria-disabled='true'],
      .steps button[aria-disabled='true'],
      .back[aria-disabled='true'] {
        opacity: 0.5;
        cursor: default;
      }
      .back {
        display: block;
        width: 100%;
        margin-top: var(--cb-gap-sm);
      }
      button:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
      }
      .feedback-row {
        display: flex;
        gap: var(--cb-gap-sm);
      }
      .feedback-pill {
        flex: 1;
        font: inherit;
        font-size: 13px;
        /* WCAG 2.5.5: 44px minimum touch target. */
        min-height: 44px;
        padding: 6px 12px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        background: transparent;
        color: var(--cb-text-primary);
        cursor: pointer;
      }
      .feedback-pill.confirmed {
        background: var(--success-color, #2e7d32);
        color: #ffffff;
        border-color: transparent;
      }
    `,
  ];

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    // Don't let a pending confirmation reset fire on an unmounted element,
    // and drop the confirmed state so a detach/reattach (DOM move, tab
    // switch) can't resurface a stale "Thanks!" with no timer to clear it.
    if (this._feedbackTimer !== null) {
      clearTimeout(this._feedbackTimer);
      this._feedbackTimer = null;
    }
    this._feedbackConfirmed = null;
    // Closing the dialog mid-burst still makes the change the taps asked for.
    this._commitBurst();
  }

  private get _stateOf() {
    const states = this.hass?.states ?? {};
    return (entityId: string | null) => (entityId !== null ? states[entityId] : undefined);
  }

  private _numericState(entityId: string | null): number {
    const s = this._stateOf(entityId);
    if (!s) return NaN;
    const n = parseFloat(s.state);
    return Number.isFinite(n) ? n : NaN;
  }

  /** The band in force, to the 0.1° shown, or null when it can't be read. */
  private _bandInForce(): Band | null {
    const low = this._numericState(this.entities?.effectiveLow ?? null);
    const high = this._numericState(this.entities?.effectiveHigh ?? null);
    if (!Number.isFinite(low) || !Number.isFinite(high)) return null;
    return { low: Math.round(low * 10) / 10, high: Math.round(high * 10) / 10 };
  }

  private _schedule(): { scheduled: boolean | null; nextChange: number | null } {
    if (!this.hass || !this.entities) return { scheduled: null, nextChange: null };
    return readSchedule(this.hass, this.entities);
  }

  /** The length in force: the one picked here, else three hours. */
  private _hours(): Length {
    return this._length ?? DEFAULT_HOURS;
  }

  /** Runs a call, saying what it's doing meanwhile. A failed call is
   *  reported by HA's own toast. */
  private async _run(doing: string, call: () => Promise<unknown>): Promise<void> {
    this._busy = doing;
    try {
      await call();
    } catch {
      // The status falls back to what is actually in force.
    } finally {
      this._busy = null;
    }
  }

  private _sendBand(band: Band, hours: number): void {
    if (!this.hass || !this.zone) return;
    const hass = this.hass;
    const zone = this.zone;
    void this._run(`Adjusting to ${bandText(band)}`, () =>
      startOverride(hass, { zone, low: band.low, high: band.high, hours }),
    );
  }

  private _onStep = (direction: 1 | -1) => {
    if (this._busy) return;
    let burst = this._burst;
    if (!burst) {
      const base = this._bandInForce();
      if (!base) return;
      burst = { base, steps: 0, picked: false };
    }
    // At a limit a further tap would change nothing; don't count it.
    const before = shiftBand(burst.base, burst.steps);
    const after = shiftBand(burst.base, burst.steps + direction);
    if (after.low === before.low && after.high === before.high) return;
    this._burst = { ...burst, steps: burst.steps + direction };
    if (this._burstTimer !== null) clearTimeout(this._burstTimer);
    this._burstTimer = setTimeout(() => this._commitBurst(), ADJUST_DELAY_MS);
  };

  /** Sends the taps so far as one change; nothing if they cancel out, unless
   *  a length was picked meanwhile. */
  private _commitBurst(): void {
    if (this._burstTimer !== null) clearTimeout(this._burstTimer);
    this._burstTimer = null;
    const burst = this._burst;
    this._burst = null;
    if (!burst) return;
    if (burst.steps !== 0) {
      this._sendBand(shiftBand(burst.base, burst.steps), this._hours());
    } else if (burst.picked) {
      this._retime(this._hours());
    }
  }

  private _dropBurst(): void {
    if (this._burstTimer !== null) clearTimeout(this._burstTimer);
    this._burstTimer = null;
    this._burst = null;
  }

  private _onPickLength = (length: Length) => {
    if (this._busy) return;
    this._length = length;
    // Taps still being made take the length when they're sent.
    if (this._burst) {
      this._burst = { ...this._burst, picked: true };
      return;
    }
    this._retime(length);
  };

  /** Gives a running adjustment a new length, keeping its band: the
   *  integration keeps an adjustment's band in the manual values. */
  private _retime(hours: Length): void {
    if (this._stateOf(this.entities?.overrideActive ?? null)?.state !== 'on') return;
    const low = this._numericState(this.entities?.manualLow ?? null);
    const high = this._numericState(this.entities?.manualHigh ?? null);
    if (!Number.isFinite(low) || !Number.isFinite(high)) return;
    this._sendBand({ low, high }, hours);
  }

  private _onBackToSchedule = () => {
    if (this._busy || !this.hass || !this.zone) return;
    const hass = this.hass;
    const zone = this.zone;
    this._dropBurst();
    const doing =
      this._schedule().scheduled === true ? 'Going back to the schedule' : 'Ending the adjustment';
    void this._run(doing, () => cancelOverride(hass, { zone }));
  };

  private _onFeedbackTap = async (label: FeedbackLabel): Promise<void> => {
    if (!this.hass || !this.zone) return;
    const seq = ++this._feedbackSeq;
    try {
      await recordFeedback(this.hass, { zone: this.zone, label });
    } catch {
      // Service rejected (e.g. integration older than v0.11.0). Skip the
      // confirmation rather than show success for a write that didn't land.
      return;
    }
    // A newer tap superseded this one while the service was in flight — let
    // it own the highlight so the green flash can't land on the wrong pill.
    if (seq !== this._feedbackSeq) return;
    this._feedbackConfirmed = label;
    if (this._feedbackTimer !== null) clearTimeout(this._feedbackTimer);
    this._feedbackTimer = setTimeout(() => {
      this._feedbackConfirmed = null;
      this._feedbackTimer = null;
    }, FEEDBACK_CONFIRM_MS);
  };

  protected override render() {
    if (!this.hass || !this.entities) return nothing;
    const now = Date.now();

    const reading = readRoom(this.hass, this.entities);
    const { room, apparent, useApparent, feelsLike, overrideActive, scheduled } = reading;
    const { low: effLow, high: effHigh } = reading.band;
    const headline = headlineTemperature({ room, apparent, useApparent });
    const notice = sensorNotice(reading);

    const burst = this._burst;
    const doing =
      burst && burst.steps !== 0
        ? `Adjusting to ${bandText(shiftBand(burst.base, burst.steps))}`
        : this._busy;
    const status = statusLine({
      ...reading,
      doing,
      now,
      formatTime: (ms) => formatTime(ms, this.hass),
    });

    return html`
      <div class="temperature">
        <span class="value"
          >${Number.isFinite(headline.value) ? `${headline.value.toFixed(1)}°` : '—'}</span
        >
        ${headline.note ? html`<span class="note">${headline.note}</span>` : nothing}
      </div>
      ${useApparent && !Number.isFinite(apparent) && Number.isFinite(room)
        ? html`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>`
        : nothing}
      <div class="gauge-row">
        <band-gauge
          .low=${effLow}
          .high=${effHigh}
          .room=${headline.value}
          .roomLabel=${feelsLike ? 'feels like' : 'room'}
          .action=${controlling(reading) ? reading.action : 'unknown'}
        ></band-gauge>
      </div>
      <div class="status ${status.kind}" role="status" aria-live="polite">
        <ha-icon icon=${STATUS_ICONS[status.kind]} aria-hidden="true"></ha-icon>
        <span>${status.text}</span>
      </div>
      ${notice ? html`<div class="notice">${notice}</div>` : nothing}
      ${this._renderAdjust(overrideActive, scheduled)} ${this._renderFeedbackSection()}
    `;
  }

  private _renderAdjust(overrideActive: boolean, scheduled: boolean | null) {
    // aria-disabled rather than disabled: a disabled button loses focus,
    // and a keyboard user would be thrown out of the dialog's flow.
    const busy = this._busy !== null ? 'true' : 'false';
    const hours = this._hours();
    const lengths: Length[] = [1, 3];
    return html`
      <section class="adjust">
        ${scheduled === false
          ? nothing
          : html`<h3 id="adjust-for">Adjust for</h3>
              <div class="lengths" role="group" aria-labelledby="adjust-for">
                ${lengths.map(
                  (h) =>
                    html`<button
                      aria-pressed=${hours === h ? 'true' : 'false'}
                      aria-disabled=${busy}
                      data-length=${h}
                      @click=${() => this._onPickLength(h)}
                    >
                      ${h} h
                    </button>`,
                )}
              </div>`}
        ${this._bandInForce() !== null
          ? html`<div class="steps">
              <button class="cooler" aria-disabled=${busy} @click=${() => this._onStep(-1)}>
                <ha-icon icon="mdi:minus" aria-hidden="true"></ha-icon> Cooler
              </button>
              <button class="warmer" aria-disabled=${busy} @click=${() => this._onStep(1)}>
                <ha-icon icon="mdi:plus" aria-hidden="true"></ha-icon> Warmer
              </button>
            </div>`
          : nothing}
        ${overrideActive && scheduled !== false
          ? html`<button class="back" aria-disabled=${busy} @click=${this._onBackToSchedule}>
              ${scheduled === true ? 'Back to schedule' : 'End adjustment'}
            </button>`
          : nothing}
      </section>
    `;
  }

  private _renderFeedbackSection() {
    return html`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${FEEDBACK_PILLS.map(
            (pill) => html`
              <button
                class="feedback-pill ${this._feedbackConfirmed === pill.label ? 'confirmed' : ''}"
                data-feedback=${pill.label}
                aria-label="Feedback: ${pill.text}"
                @click=${() => void this._onFeedbackTap(pill.label)}
              >
                ${this._feedbackConfirmed === pill.label ? 'Thanks!' : pill.text}
              </button>
            `,
          )}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-now-tab': ComfortBandNowTab;
  }
}
