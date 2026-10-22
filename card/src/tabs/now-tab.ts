/**
 * `<comfort-band-now-tab>` — the "Now" tab content of the modal.
 *
 * Top to bottom:
 *   - The temperature that drives control, large; the other underneath.
 *   - One status line: what the room is doing, the range in force, and when
 *     it next changes ("Comfortable · 17.5–23° until 9 pm").
 *   - "Adjust for" (1 h · 3 h · until the next change), then Cooler / Warmer.
 *     Each tap moves the whole range by 0.5°; taps made close together are
 *     sent as one `comfort_band.start_override` once they stop. Picking a
 *     length while an adjustment runs re-times it.
 *   - "Back to schedule" while an adjustment runs.
 *   - "How does it feel?" feedback pills (`comfort_band.record_feedback`).
 *   - "Set an exact range": the two-handled slider, folded away.
 *
 * Where the integration (v0.23.0+) says no schedule sets the zone's band, an
 * adjustment's band is the zone's band from then on, so there is no length to
 * choose, no "until" and no "Back to schedule".
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../band-gauge.js';
import '../dual-handle-slider.js';
import type { DualHandleSlider } from '../dual-handle-slider.js';
import type { ZoneEntities } from '../helpers.js';
import type { HomeAssistant } from '../types.js';
import { cancelOverride, recordFeedback, startOverride } from '../services.js';
import type { FeedbackLabel } from '../services.js';
import { tokens } from '../styles.js';
import {
  type Band,
  type StatusKind,
  formatTime,
  headlineTemperature,
  shiftBand,
  statusLine,
} from '../now-status.js';

/** Feedback pills: service label → button text. Order = display order. */
const FEEDBACK_PILLS: ReadonlyArray<{ label: FeedbackLabel; text: string }> = [
  { label: 'too_cold', text: 'Too cool' },
  { label: 'just_right', text: 'Just right' },
  { label: 'too_hot', text: 'Too warm' },
];

/** How long the tapped pill stays highlighted after a successful record. */
const FEEDBACK_CONFIRM_MS = 1500;

/** The slider's usual range, widened to take in a band outside it, and its step. */
const SLIDER_MIN = 16;
const SLIDER_MAX = 26;
const SLIDER_STEP = 0.5;

/** Taps on Warmer / Cooler made within this long of each other are one change. */
export const ADJUST_DELAY_MS = 1500;
/** "Until 9 pm" is offered only when the change is at least this far off. */
const UNTIL_MIN_MS = 15 * 60_000;
/** The length used when none has been chosen and there's no next change. */
const DEFAULT_HOURS = 3;

type Length = 1 | 3 | 'next';

const STATUS_ICONS: Record<StatusKind, string> = {
  adjusting: 'mdi:timer-sand',
  paused: 'mdi:pause-circle-outline',
  heating: 'mdi:fire',
  cooling: 'mdi:snowflake',
  comfortable: 'mdi:check-circle-outline',
  idle: 'mdi:minus-circle-outline',
  none: 'mdi:thermometer',
};

@customElement('comfort-band-now-tab')
export class ComfortBandNowTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';
  @property({ attribute: false }) public entities?: ZoneEntities;

  @state() private _pendingLow: number | null = null;
  @state() private _pendingHigh: number | null = null;
  /** The pill briefly highlighted after a successful `record_feedback`. */
  @state() private _feedbackConfirmed: FeedbackLabel | null = null;
  /** Timer that clears `_feedbackConfirmed`; cancelled on disconnect so it
   *  never fires `setState` on an unmounted element. */
  private _feedbackTimer: ReturnType<typeof setTimeout> | null = null;
  /** The track's range as last shown, kept from a drag's first move until its
   *  release, so the track doesn't rescale under the finger if the band in
   *  force changes meanwhile. */
  private _heldRange: { min: number; max: number } | null = null;
  /** Monotonic tap counter. Service calls are concurrent and may resolve
   *  out of order, so each tap captures its seq and only claims the
   *  highlight if it's still the latest — the last-tapped pill always wins,
   *  regardless of which round-trip finishes first. */
  private _feedbackSeq = 0;

  /** The length picked under "Adjust for"; null until someone picks one. */
  @state() private _length: Length | null = null;
  /** Warmer / Cooler taps not yet sent: the range they started from, and
   *  how many steps from it (warmer positive). */
  @state() private _burst: { base: Band; steps: number } | null = null;
  private _burstTimer: ReturnType<typeof setTimeout> | null = null;
  /** The range of the last change sent from this tab, until its call settles. */
  @state() private _sending: Band | null = null;
  private _sendSeq = 0;
  /** Calls from this tab go one after another, so they land in the order made. */
  private _chain: Promise<unknown> = Promise.resolve();

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
        color: var(--cb-text-secondary);
      }
      .status.heating ha-icon {
        color: var(--cb-heat, var(--state-climate-heat-color, #ff8100));
      }
      .status.cooling ha-icon {
        color: var(--cb-cool, var(--state-climate-cool-color, #2b9af9));
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
      .lengths button[data-length='next'] {
        /* "Until 4:30 pm" is the longest label; on a phone it would wrap. */
        flex: 1.8;
        white-space: nowrap;
      }
      .lengths button[aria-checked='true'] {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        border-color: transparent;
        color: #ffffff;
      }
      .back {
        display: block;
        width: 100%;
        margin-top: var(--cb-gap-sm);
      }
      button:focus-visible,
      summary:focus-visible {
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
      details {
        margin-top: var(--cb-gap-lg);
      }
      summary {
        font-size: 13px;
        font-weight: 500;
        color: var(--cb-text-secondary);
        cursor: pointer;
        min-height: 24px;
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

  /** From `sensor.{zone}_next_band_change`: whether a schedule sets the
   *  zone's band (null on integrations that don't say), and when it next
   *  changes. */
  private _schedule(): { scheduled: boolean | null; nextChange: number | null } {
    const s = this._stateOf(this.entities?.nextBandChange ?? null);
    if (!s) return { scheduled: null, nextChange: null };
    const scheduled = s.attributes.scheduled;
    const next = Date.parse(s.state);
    return {
      scheduled: typeof scheduled === 'boolean' ? scheduled : null,
      nextChange: Number.isNaN(next) ? null : next,
    };
  }

  /** "Until 9 pm" is offered when a schedule sets the band and its next
   *  change is far enough off to be worth choosing. */
  private _untilOption(now: number): number | null {
    const { scheduled, nextChange } = this._schedule();
    if (scheduled !== true || nextChange === null || nextChange - now < UNTIL_MIN_MS) return null;
    return nextChange;
  }

  /** The length in force: the one picked, else until the next change when
   *  that's on offer, else three hours. */
  private _lengthInForce(now: number): Length {
    const until = this._untilOption(now);
    if (this._length === 'next') return until !== null ? 'next' : DEFAULT_HOURS;
    return this._length ?? (until !== null ? 'next' : DEFAULT_HOURS);
  }

  private _hours(now: number): number {
    const length = this._lengthInForce(now);
    if (length !== 'next') return length;
    return (this._untilOption(now)! - now) / 3_600_000;
  }

  /** Sends a call after the ones before it from this tab have settled. */
  private _send(call: () => Promise<unknown>): Promise<unknown> {
    const sent = this._chain.then(call);
    this._chain = sent.catch(() => undefined);
    return sent;
  }

  /** Shows `band` until its call settles; a later change takes over. */
  private async _sendBand(band: Band, hours: number): Promise<void> {
    if (!this.hass || !this.zone) return;
    const hass = this.hass;
    const zone = this.zone;
    const seq = ++this._sendSeq;
    this._sending = band;
    try {
      await this._send(() => startOverride(hass, { zone, low: band.low, high: band.high, hours }));
    } catch {
      // HA's own toast reports a failed call; the status falls back to the
      // band actually in force.
    } finally {
      if (seq === this._sendSeq) this._sending = null;
    }
  }

  private _onStep = (direction: 1 | -1) => {
    if (!this._burst) {
      const base = this._sending ?? this._bandInForce();
      if (!base) return;
      this._burst = { base, steps: 0 };
    }
    this._burst = { ...this._burst, steps: this._burst.steps + direction };
    if (this._burstTimer !== null) clearTimeout(this._burstTimer);
    this._burstTimer = setTimeout(() => this._commitBurst(), ADJUST_DELAY_MS);
  };

  /** Sends the taps so far as one change; nothing if they cancel out. */
  private _commitBurst(): void {
    if (this._burstTimer !== null) clearTimeout(this._burstTimer);
    this._burstTimer = null;
    const burst = this._burst;
    this._burst = null;
    if (!burst || burst.steps === 0) return;
    void this._sendBand(shiftBand(burst.base, burst.steps), this._hours(Date.now()));
  }

  private _dropBurst(): void {
    if (this._burstTimer !== null) clearTimeout(this._burstTimer);
    this._burstTimer = null;
    this._burst = null;
  }

  private _onPickLength = (length: Length) => {
    this._length = length;
    // A running adjustment takes the new length now; a burst still being
    // tapped takes it when it's sent.
    if (this._burst) return;
    const overrideActive = this._stateOf(this.entities?.overrideActive ?? null)?.state === 'on';
    if (!overrideActive) return;
    const band = this._sending ?? this._manualBand();
    if (band) void this._sendBand(band, this._hours(Date.now()));
  };

  /** An adjustment's band: the integration keeps it in the manual values. */
  private _manualBand(): Band | null {
    const low = this._numericState(this.entities?.manualLow ?? null);
    const high = this._numericState(this.entities?.manualHigh ?? null);
    return Number.isFinite(low) && Number.isFinite(high) ? { low, high } : null;
  }

  private _onBackToSchedule = () => {
    if (!this.hass || !this.zone) return;
    const hass = this.hass;
    const zone = this.zone;
    this._dropBurst();
    this._sendSeq++;
    this._sending = null;
    void this._send(() => cancelOverride(hass, { zone })).catch(() => undefined);
  };

  private _onSliderInput = (event: CustomEvent<{ low: number; high: number }>) => {
    this._pendingLow = event.detail.low;
    this._pendingHigh = event.detail.high;
  };

  private _onSliderChange = (event: CustomEvent<{ low: number; high: number }>) => {
    this._pendingLow = null;
    this._pendingHigh = null;
    this._dropBurst();
    void this._sendBand(
      { low: event.detail.low, high: event.detail.high },
      this._hours(Date.now()),
    );
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

    const room = this._numericState(this.entities.roomTemperature);
    const apparent = this._numericState(this.entities.apparentTemperature);
    const effLow = this._numericState(this.entities.effectiveLow);
    const effHigh = this._numericState(this.entities.effectiveHigh);
    const action = this._stateOf(this.entities.currentAction)?.state ?? 'unknown';
    const useApparent = this._stateOf(this.entities.useApparentTemperature)?.state === 'on';
    const overrideActive = this._stateOf(this.entities.overrideActive)?.state === 'on';
    const enabled = this._stateOf(this.entities.enabled)?.state !== 'off';
    const { scheduled, nextChange } = this._schedule();
    const ends = Date.parse(this._stateOf(this.entities.overrideEnds)?.state ?? '');
    const headline = headlineTemperature({ room, apparent, useApparent });

    const pending = this._burst ? shiftBand(this._burst.base, this._burst.steps) : this._sending;
    const status = statusLine({
      enabled,
      action,
      temperature: headline.value,
      band: { low: effLow, high: effHigh },
      overrideActive,
      overrideEnds: Number.isNaN(ends) ? null : ends,
      scheduled,
      nextChange,
      pending: this._burst && this._burst.steps === 0 ? null : pending,
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
      ${useApparent && !Number.isFinite(apparent)
        ? html`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>`
        : nothing}
      <div class="gauge-row">
        <band-gauge .low=${effLow} .high=${effHigh} .room=${room} .action=${action}></band-gauge>
      </div>
      <div class="status ${status.kind}" role="status" aria-live="polite">
        <ha-icon icon=${STATUS_ICONS[status.kind]} aria-hidden="true"></ha-icon>
        <span>${status.text}</span>
      </div>

      ${this._renderAdjust(now, overrideActive, scheduled)} ${this._renderFeedbackSection()}
      ${this._renderExactRange(effLow, effHigh)}
    `;
  }

  private _renderAdjust(now: number, overrideActive: boolean, scheduled: boolean | null) {
    const canStep = this._bandInForce() !== null || this._sending !== null;
    const until = this._untilOption(now);
    const length = this._lengthInForce(now);
    const lengths: Array<{ value: Length; text: string }> = [
      { value: 1, text: '1 h' },
      { value: 3, text: '3 h' },
    ];
    if (until !== null)
      lengths.push({ value: 'next', text: `Until ${formatTime(until, this.hass)}` });
    return html`
      <section class="adjust">
        ${scheduled === false
          ? nothing
          : html`<h3 id="adjust-for">Adjust for</h3>
              <div class="lengths" role="radiogroup" aria-labelledby="adjust-for">
                ${lengths.map(
                  (l) =>
                    html`<button
                      role="radio"
                      aria-checked=${length === l.value ? 'true' : 'false'}
                      data-length=${l.value}
                      @click=${() => this._onPickLength(l.value)}
                    >
                      ${l.text}
                    </button>`,
                )}
              </div>`}
        ${canStep
          ? html`<div class="steps">
              <button class="cooler" @click=${() => this._onStep(-1)}>
                <ha-icon icon="mdi:minus" aria-hidden="true"></ha-icon> Cooler
              </button>
              <button class="warmer" @click=${() => this._onStep(1)}>
                <ha-icon icon="mdi:plus" aria-hidden="true"></ha-icon> Warmer
              </button>
            </div>`
          : nothing}
        ${overrideActive && scheduled !== false
          ? html`<button class="back" @click=${this._onBackToSchedule}>
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

  private _renderExactRange(effLow: number, effHigh: number) {
    const lowState = this._numericState(this.entities!.manualLow);
    const highState = this._numericState(this.entities!.manualHigh);
    // Start from the band actually in force. The manual values are only the
    // last override's, which can be far from the schedule's current band.
    const start = sliderStart(effLow, effHigh, lowState, highState);
    const sliderLow = this._pendingLow ?? start.low;
    const sliderHigh = this._pendingHigh ?? start.high;
    // Widen the track to take in a band outside it, so both handles sit on it
    // and Home/End can't move a limit the wrong way (on a 16-26 track, End
    // on a high of 28 sent 26).
    const range =
      this._pendingLow !== null && this._heldRange
        ? this._heldRange
        : {
            min: Math.min(SLIDER_MIN, Math.floor(start.low)),
            max: Math.max(SLIDER_MAX, Math.ceil(start.high)),
          };
    this._heldRange = range;
    return html`
      <details class="exact-range">
        <summary>Set an exact range</summary>
        <dual-handle-slider
          .min=${range.min}
          .max=${range.max}
          .step=${SLIDER_STEP}
          .low=${sliderLow}
          .high=${sliderHigh}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
      </details>
    `;
  }
}

/**
 * Where the slider starts: the effective band (what is in force now), falling
 * back to the manual values, then to a neutral default, when the band is
 * unavailable. Rounded to the 0.1° the readout shows, so what is sent is what was
 * shown, but not snapped to the slider's steps or its range: nudging one
 * handle must send the other limit back as it is. Only a band narrower than
 * one step, which the slider can't hold, is widened.
 */
function sliderStart(
  effLow: number,
  effHigh: number,
  manualLow: number,
  manualHigh: number,
): { low: number; high: number } {
  let low = 19;
  let high = 22;
  if (Number.isFinite(effLow) && Number.isFinite(effHigh)) {
    low = effLow;
    high = effHigh;
  } else if (Number.isFinite(manualLow) && Number.isFinite(manualHigh)) {
    low = manualLow;
    high = manualHigh;
  }
  low = Math.round(low * 10) / 10;
  high = Math.round(high * 10) / 10;
  if (high - low < SLIDER_STEP) high = low + SLIDER_STEP;
  return { low, high };
}

// Avoid unused-import lint complaints.
export type { DualHandleSlider };

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-now-tab': ComfortBandNowTab;
  }
}
