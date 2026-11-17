/**
 * `<comfort-band-now-tab>` — the "Now" tab content of the modal.
 *
 * Top to bottom:
 *   - The temperature that drives control, large; the other underneath.
 *   - One status line: what the room is doing, the range in force, and when
 *     it next changes ("Comfortable · 17.5–23° until 9 pm").
 *   - "Adjust for" (1 h · 3 h, and with integration v0.25.0+ "Until 9 pm",
 *     the schedule's next change), then Cooler / Warmer. Each tap moves the
 *     whole range by 0.5°; taps made close together are sent as one
 *     `comfort_band.start_override` once they stop, for the length picked.
 *     Picking a length while an adjustment runs re-times it. The lengths are
 *     relative, or HA's own time of the next change (#26); the panel's clock
 *     decides only whether that change is still ahead. The end shown is HA's.
 *     A picked "Until" is for that change: once it's passed, or while HA
 *     names another, three hours.
 *     Taps still held when the card moves on to another room go at once
 *     to the room they were made in, as closing the tab sends them (#52);
 *     the tab doesn't wait for that change, or put a length back if it's
 *     refused.
 *   - "Back to schedule" while an adjustment runs.
 *   - While a call from this tab is going through, these controls ignore
 *     presses (marked aria-disabled, so they keep focus), so nothing is
 *     built on a state the tab has just changed.
 *   - "How does it feel?" feedback pills (`comfort_band.record_feedback`).
 *
 * When HA refuses a change (#27), HA's own toast says so, and a length
 * picked for it (to re-time an adjustment, or during its taps) goes back to
 * the one before; one picked before the taps began stays. Taps sent to
 * their room on a move to another (#52) put no length back. A refused feedback
 * tap shows "Not sent" on its pill, with HA's toast.
 *
 * When the room sensor is offline, a sentence under the status says what that
 * means for the room and what to do.
 *
 * The status line is two lines tall even when its words take one (#55): at
 * a tap it says what the tap will do, and its words' length mustn't move the
 * controls under a finger. For the same reason, once an adjustment ends,
 * "Back to schedule" leaves its place empty until the tab closes (#57):
 * going, it would shorten a panel scrolled to its end, and everything above
 * would move down.
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
import {
  cancelOverride,
  overrideUntilSupported,
  recordFeedback,
  startOverride,
} from '../services.js';
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

/** How long the tapped pill says "Thanks!" or "Not sent". */
const FEEDBACK_CONFIRM_MS = 1500;

/** Taps on Warmer / Cooler made within this long of each other are one change. */
export const ADJUST_DELAY_MS = 1500;
/** The length used until another is picked. */
const DEFAULT_HOURS = 3;

/** How long an adjustment lasts: hours, or until the schedule's next change. */
type Length = 1 | 3 | 'next';

/** The length picked, as it was before a pick: put back if the change
 *  the pick was sent with (its re-time, or the taps it was picked during)
 *  is refused (#27), unless it went to a room the tab had moved on from
 *  (#52). */
interface PickedLength {
  length: Length | null;
  pickedNext: number | null;
}

/** Warmer / Cooler taps not yet sent: the room they were made in, the range
 *  they started from, and how many steps from it (warmer positive). They're
 *  sent to that room, for the length picked. */
interface Burst {
  zone: string;
  entities: ZoneEntities;
  base: Band;
  steps: number;
  /** A length was picked during the burst: send it even if the taps cancel out. */
  picked: boolean;
  /** The length before the burst's first pick, if any. */
  before?: PickedLength;
}

@customElement('comfort-band-now-tab')
export class ComfortBandNowTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';
  @property({ attribute: false }) public entities?: ZoneEntities;

  /** The pill briefly highlighted after a successful `record_feedback`. */
  @state() private _feedbackConfirmed: FeedbackLabel | null = null;
  /** The pill briefly marked "Not sent" after a refused `record_feedback`. */
  @state() private _feedbackFailed: FeedbackLabel | null = null;
  /** Timer that clears `_feedbackConfirmed` and `_feedbackFailed`;
   *  cancelled on disconnect. (A feedback call that settles after then
   *  starts another, harmlessly, as on main.) */
  private _feedbackTimer: ReturnType<typeof setTimeout> | null = null;
  /** Monotonic tap counter. Service calls are concurrent and may resolve
   *  out of order, so each tap captures its seq and only claims the
   *  highlight if it's still the latest — the last-tapped pill always wins,
   *  regardless of which round-trip finishes first. */
  private _feedbackSeq = 0;

  /** The length picked under "Adjust for" in this tab, if any. */
  @state() private _length: Length | null = null;
  /** The change a picked "Until" was for (ms). */
  private _pickedNext: number | null = null;
  @state() private _burst: Burst | null = null;
  private _burstTimer: ReturnType<typeof setTimeout> | null = null;
  /** What a call from this tab is doing while it goes through, such as
   *  "Going back to the schedule"; the controls ignore presses meanwhile, so
   *  no other such call starts (the feedback buttons aside, which don't
   *  change the range). */
  @state() private _busy: string | null = null;
  /** Back to schedule's (or End adjustment's) words while it was last
   *  shown: once the adjustment ends, its place is kept, empty, until the
   *  tab closes (#57). */
  @state() private _backLabel: string | null = null;

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
        /* Two lines' height, whether its words take one or two, so going
           from the room's state to "Adjusting to …" at a tap, and back as
           HA answers, doesn't move the controls below it (#55). */
        min-height: 3.2em;
        min-height: 2lh;
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
      /* "Until 10:30 pm" takes more room than "1 h": the time on one line. */
      .lengths button[data-length='next'] {
        flex: 1.6;
      }
      .lengths .time {
        white-space: nowrap;
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
      /* Its place, kept once the adjustment has ended (#57). */
      .back.held {
        visibility: hidden;
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
      /* Two pixels of the error colour, inset, so the pill keeps its size. */
      .feedback-pill.failed {
        border-color: var(--error-color, #db4437);
        box-shadow: inset 0 0 0 1px var(--error-color, #db4437);
      }
    `,
  ];

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    // Don't let a pending confirmation reset fire on an unmounted element,
    // and drop the confirmed state so a detach/reattach (DOM move, tab
    // switch) can't resurface a stale "Thanks!" or "Not sent" with no timer
    // to clear it.
    if (this._feedbackTimer !== null) {
      clearTimeout(this._feedbackTimer);
      this._feedbackTimer = null;
    }
    this._feedbackConfirmed = null;
    this._feedbackFailed = null;
    this._backLabel = null;
    // Closing the dialog mid-burst still makes the change the taps asked for.
    this._commitBurst();
  }

  /** Sends taps held for another room to theirs (#52), and notes Back's
   *  words while it's shown, so its place can be kept. */
  protected override willUpdate(): void {
    if (this._burst && this._burst.zone !== this.zone) this._commitBurst();
    if (!this.hass || !this.entities) return;
    const { overrideActive, scheduled } = readRoom(this.hass, this.entities);
    if (overrideActive && scheduled !== false) {
      this._backLabel = scheduled === true ? 'Back to schedule' : 'End adjustment';
    }
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

  private _schedule(entities = this.entities): {
    scheduled: boolean | null;
    nextChange: number | null;
  } {
    if (!this.hass || !entities) return { scheduled: null, nextChange: null };
    return readSchedule(this.hass, entities);
  }

  /** The schedule's next change (ms) in the room of `entities`, where an
   *  adjustment can last until it: integration v0.25.0+, a schedule setting
   *  the range, and its next change ahead. Null otherwise. */
  private _nextChange(entities = this.entities, now = Date.now()): number | null {
    if (!this.hass || !overrideUntilSupported(this.hass)) return null;
    const { scheduled, nextChange } = this._schedule(entities);
    return scheduled === true && nextChange !== null && nextChange > now ? nextChange : null;
  }

  /** The length in force: the one picked here, else three hours. A picked
   *  "Until" is for the change it named: once that's passed, or while HA
   *  names another, three hours. */
  private _hours(entities = this.entities): Length {
    const length = this._length ?? DEFAULT_HOURS;
    if (length !== 'next') return length;
    const next = this._nextChange(entities);
    return next !== null && next === this._pickedNext ? 'next' : DEFAULT_HOURS;
  }

  /** Runs a call, saying what it's doing meanwhile. A failed call is
   *  reported by HA's own toast; the status falls back to what is actually
   *  in force, and a length picked for it goes back to `before` (#27). */
  private async _run(
    doing: string,
    call: () => Promise<unknown>,
    before?: PickedLength,
  ): Promise<void> {
    this._busy = doing;
    try {
      await call();
    } catch {
      // Even if the tab has gone meanwhile: a tab moved in the page comes
      // back with it, and a closed one is discarded.
      if (before) {
        this._length = before.length;
        this._pickedNext = before.pickedNext;
      }
    } finally {
      this._busy = null;
    }
  }

  /** Adjusts `zone`, by default the tab's room, to `band`. For another
   *  room (taps held when the tab moved on, #52) the tab doesn't wait for
   *  the call or put a length back: HA's toast tells of a refusal. */
  private _sendBand(
    band: Band,
    length: Length,
    before?: PickedLength,
    zone = this.zone,
    entities = this.entities,
  ): void {
    if (!this.hass || !zone) return;
    const hass = this.hass;
    const next = length === 'next' ? this._nextChange(entities) : null;
    const until = next !== null ? new Date(next).toISOString() : undefined;
    const hours = next !== null ? undefined : length === 'next' ? DEFAULT_HOURS : length;
    const call = () => startOverride(hass, { zone, low: band.low, high: band.high, hours, until });
    if (zone !== this.zone) {
      call().catch(() => undefined);
      return;
    }
    void this._run(`Adjusting to ${bandText(band)}`, call, before);
  }

  private _onStep = (direction: 1 | -1) => {
    if (this._busy) return;
    let burst = this._burst;
    if (!burst) {
      const base = this._bandInForce();
      if (!base || !this.entities) return;
      burst = { zone: this.zone, entities: this.entities, base, steps: 0, picked: false };
    }
    // At a limit a further tap would change nothing; don't count it.
    const before = shiftBand(burst.base, burst.steps);
    const after = shiftBand(burst.base, burst.steps + direction);
    if (after.low === before.low && after.high === before.high) return;
    this._burst = { ...burst, steps: burst.steps + direction };
    if (this._burstTimer !== null) clearTimeout(this._burstTimer);
    this._burstTimer = setTimeout(() => this._commitBurst(), ADJUST_DELAY_MS);
  };

  /** Sends the taps so far as one change, to the room they were made in;
   *  nothing if they cancel out, unless a length was picked meanwhile. */
  private _commitBurst(): void {
    if (this._burstTimer !== null) clearTimeout(this._burstTimer);
    this._burstTimer = null;
    const burst = this._burst;
    this._burst = null;
    if (!burst) return;
    const { zone, entities } = burst;
    const length = this._hours(entities);
    if (burst.steps !== 0) {
      this._sendBand(shiftBand(burst.base, burst.steps), length, burst.before, zone, entities);
    } else if (burst.picked) {
      this._retime(length, burst.before, zone, entities);
    }
  }

  private _dropBurst(): void {
    if (this._burstTimer !== null) clearTimeout(this._burstTimer);
    this._burstTimer = null;
    this._burst = null;
  }

  private _onPickLength = (length: Length) => {
    if (this._busy) return;
    const before: PickedLength = { length: this._length, pickedNext: this._pickedNext };
    this._length = length;
    this._pickedNext = length === 'next' ? this._nextChange() : null;
    // Taps still being made take the length when they're sent.
    if (this._burst) {
      this._burst = { ...this._burst, picked: true, before: this._burst.before ?? before };
      return;
    }
    this._retime(length, before);
  };

  /** Gives a running adjustment a new length, keeping its band: the
   *  integration keeps an adjustment's band in the manual values. */
  private _retime(
    length: Length,
    before?: PickedLength,
    zone = this.zone,
    entities = this.entities,
  ): void {
    if (this._stateOf(entities?.overrideActive ?? null)?.state !== 'on') return;
    const low = this._numericState(entities?.manualLow ?? null);
    const high = this._numericState(entities?.manualHigh ?? null);
    if (!Number.isFinite(low) || !Number.isFinite(high)) return;
    this._sendBand({ low, high }, length, before, zone, entities);
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
    let ok = true;
    try {
      await recordFeedback(this.hass, { zone: this.zone, label });
    } catch {
      // Service rejected (e.g. integration older than v0.11.0): HA's toast
      // says so, and the pill says "Not sent" rather than "Thanks!".
      ok = false;
    }
    // A newer tap superseded this one while the service was in flight — let
    // it own the pill so the flash can't land on the wrong one.
    if (seq !== this._feedbackSeq) return;
    this._feedbackConfirmed = ok ? label : null;
    this._feedbackFailed = ok ? null : label;
    if (this._feedbackTimer !== null) clearTimeout(this._feedbackTimer);
    this._feedbackTimer = setTimeout(() => {
      this._feedbackConfirmed = null;
      this._feedbackFailed = null;
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
    const next = this._nextChange();
    const lengths: Length[] = next !== null ? [1, 3, 'next'] : [1, 3];
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
                      ${h === 'next'
                        ? html`Until <span class="time">${formatTime(next!, this.hass)}</span>`
                        : `${h} h`}
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
          : this._backLabel !== null
            ? html`<button class="back held" aria-hidden="true" tabindex="-1" disabled>
                ${this._backLabel}
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
                class="feedback-pill ${this._feedbackConfirmed === pill.label
                  ? 'confirmed'
                  : this._feedbackFailed === pill.label
                    ? 'failed'
                    : ''}"
                data-feedback=${pill.label}
                aria-label="Feedback: ${pill.text}"
                @click=${() => void this._onFeedbackTap(pill.label)}
              >
                ${this._feedbackConfirmed === pill.label
                  ? 'Thanks!'
                  : this._feedbackFailed === pill.label
                    ? 'Not sent'
                    : pill.text}
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
