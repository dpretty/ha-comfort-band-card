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
 *     relative, or HA's own time of the next change (#26), so the panel's
 *     clock doesn't come into it; the end shown is HA's.
 *   - "Back to schedule" while an adjustment runs.
 *   - With integration v0.25.0+, "Undo" after a change made here, once HA
 *     shows it (#25): it puts back what the change replaced. It goes when
 *     another change is made here, the tab closes, or the room's adjustment
 *     changes from elsewhere, so it never undoes someone else's change.
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
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../band-gauge.js';
import type { ZoneEntities } from '../helpers.js';
import type { HomeAssistant } from '../types.js';
import {
  cancelOverride,
  overrideEndsSupported,
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

/** How long the tapped pill stays highlighted after a successful record. */
const FEEDBACK_CONFIRM_MS = 1500;

/** Taps on Warmer / Cooler made within this long of each other are one change. */
export const ADJUST_DELAY_MS = 1500;
/** The length used until another is picked. */
const DEFAULT_HOURS = 3;

/** How long an adjustment lasts: hours, or until the schedule's next change. */
type Length = 1 | 3 | 'next';

/** A room's adjustment as HA shows it: whether one runs, when it ends (ms),
 *  and the manual band, which is an adjustment's band (and, with no
 *  schedule, the room's). */
interface Adjustment {
  active: boolean;
  ends: number | null;
  low: number;
  high: number;
}

/** What a change made here replaced, and what it's to show once HA has it
 *  (#25). Undo is offered from then until HA shows anything else. */
interface Undo {
  before: Adjustment;
  expect: { active: boolean; low?: number; high?: number; ends?: number };
  shown: Adjustment | null;
}

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
  /** What Undo would put back, once HA shows the change it undoes (#25). */
  @state() private _undo: Undo | null = null;
  /** Focus goes to the steps once Undo's button has gone from under it. */
  private _focusSteps = false;

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
      .undo-row {
        display: flex;
        justify-content: flex-end;
        margin-top: var(--cb-gap-sm);
      }
      .undo {
        font: inherit;
        min-height: 44px;
        padding: 6px 16px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        background: transparent;
        color: var(--cb-text-primary);
        cursor: pointer;
      }
      .undo[aria-disabled='true'] {
        opacity: 0.5;
        cursor: default;
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
    // Closing it also ends what Undo would put back.
    this._undo = null;
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has('hass') || !this._undo) return;
    const undo = this._undo;
    const shown = this._adjustment();
    if (undo.shown === null) {
      if (shown && landed(undo, shown)) this._undo = { ...undo, shown };
    } else if (!shown || !sameAdjustment(undo.shown, shown)) {
      // Changed from elsewhere: Undo would undo someone else's change.
      if (this.shadowRoot?.activeElement?.classList.contains('undo')) this._focusSteps = true;
      this._undo = null;
    }
  }

  protected override updated(): void {
    if (!this._focusSteps || this._undo) return;
    this._focusSteps = false;
    this.shadowRoot?.querySelector<HTMLElement>('.steps button')?.focus();
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

  /** The schedule's next change (ms), where an adjustment can last until
   *  it: integration v0.25.0+, a schedule setting the range, and its next
   *  change ahead. Null otherwise. */
  private _nextChange(now = Date.now()): number | null {
    if (!this.hass || !overrideEndsSupported(this.hass)) return null;
    const { scheduled, nextChange } = this._schedule();
    return scheduled === true && nextChange !== null && nextChange > now ? nextChange : null;
  }

  /** The length in force: the one picked here, else three hours. "Until
   *  the next change" falls back to three hours while there's none. */
  private _hours(): Length {
    const length = this._length ?? DEFAULT_HOURS;
    return length === 'next' && this._nextChange() === null ? DEFAULT_HOURS : length;
  }

  /** The room's adjustment as HA shows it, or null where its manual band
   *  can't be read. */
  private _adjustment(): Adjustment | null {
    const low = this._numericState(this.entities?.manualLow ?? null);
    const high = this._numericState(this.entities?.manualHigh ?? null);
    if (!Number.isFinite(low) || !Number.isFinite(high)) return null;
    const active = this._stateOf(this.entities?.overrideActive ?? null)?.state === 'on';
    const ends = Date.parse(this._stateOf(this.entities?.overrideEnds ?? null)?.state ?? '');
    return { active, ends: active && Number.isFinite(ends) ? ends : null, low, high };
  }

  /** Runs a call, saying what it's doing meanwhile. A failed call is
   *  reported by HA's own toast. `undo`, where given, is what Undo will put
   *  back once HA shows the change, if the call went through. */
  private async _run(
    doing: string,
    call: () => Promise<unknown>,
    undo?: Omit<Undo, 'shown'>,
  ): Promise<void> {
    this._busy = doing;
    try {
      await call();
      if (undo && this.isConnected) {
        // HA may already show the change: its state can arrive first.
        const shown = this._adjustment();
        this._undo = { ...undo, shown: shown && landed(undo, shown) ? shown : null };
      }
    } catch {
      // The status falls back to what is actually in force.
    } finally {
      this._busy = null;
    }
  }

  /** What Undo would need to put back the adjustment in force, where the
   *  integration can (v0.25.0+). */
  private _undoFrom(): Adjustment | null {
    return this.hass && overrideEndsSupported(this.hass) ? this._adjustment() : null;
  }

  private _sendBand(band: Band, length: Length): void {
    if (!this.hass || !this.zone) return;
    const hass = this.hass;
    const zone = this.zone;
    const next = length === 'next' ? this._nextChange() : null;
    const until = next !== null ? new Date(next).toISOString() : undefined;
    const hours = next !== null ? undefined : length === 'next' ? DEFAULT_HOURS : length;
    const before = this._undoFrom();
    void this._run(
      `Adjusting to ${bandText(band)}`,
      () => startOverride(hass, { zone, low: band.low, high: band.high, hours, until }),
      before
        ? {
            before,
            expect: {
              active: true,
              low: band.low,
              high: band.high,
              ...(next !== null ? { ends: next } : {}),
            },
          }
        : undefined,
    );
  }

  private _onStep = (direction: 1 | -1) => {
    if (this._busy) return;
    let burst = this._burst;
    // A new change: Undo would put back what's now in force only before it.
    this._undo = null;
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
    this._undo = null;
    // Taps still being made take the length when they're sent.
    if (this._burst) {
      this._burst = { ...this._burst, picked: true };
      return;
    }
    this._retime(length);
  };

  /** Gives a running adjustment a new length, keeping its band: the
   *  integration keeps an adjustment's band in the manual values. */
  private _retime(length: Length): void {
    if (this._stateOf(this.entities?.overrideActive ?? null)?.state !== 'on') return;
    const low = this._numericState(this.entities?.manualLow ?? null);
    const high = this._numericState(this.entities?.manualHigh ?? null);
    if (!Number.isFinite(low) || !Number.isFinite(high)) return;
    this._sendBand({ low, high }, length);
  }

  private _onBackToSchedule = () => {
    if (this._busy || !this.hass || !this.zone) return;
    const hass = this.hass;
    const zone = this.zone;
    this._dropBurst();
    this._undo = null;
    const before = this._undoFrom();
    const doing =
      this._schedule().scheduled === true ? 'Going back to the schedule' : 'Ending the adjustment';
    void this._run(
      doing,
      () => cancelOverride(hass, { zone }),
      before ? { before, expect: { active: false } } : undefined,
    );
  };

  /** Puts back what the last change made here replaced: the adjustment
   *  then in force with its own end, or none, with the manual band it had
   *  (#25). An end that has passed meanwhile isn't put back. */
  private _onUndo = () => {
    const undo = this._undo;
    if (this._busy || !undo?.shown || !this.hass || !this.zone) return;
    const hass = this.hass;
    const zone = this.zone;
    const { before } = undo;
    this._undo = null;
    this._focusSteps = true;
    const ends = restoresEnd(before);
    void this._run(this._undoDoing(before), async () => {
      if (ends) {
        try {
          await startOverride(hass, {
            zone,
            low: before.low,
            high: before.high,
            until: new Date(before.ends!).toISOString(),
          });
          return;
        } catch {
          // Its end passed after all: end it, as it would have ended.
        }
      }
      await cancelOverride(hass, { zone, low: before.low, high: before.high });
    });
  };

  /** What Undo puts back, in words: "Going back to 19–22° until 5 pm". */
  private _undoDoing(before: Adjustment): string {
    if (restoresEnd(before)) {
      return `Going back to ${bandText(before)} until ${formatTime(before.ends!, this.hass)}`;
    }
    return this._schedule().scheduled === true
      ? 'Going back to the schedule'
      : `Going back to ${bandText(before)}`;
  }

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
      ${notice ? html`<div class="notice">${notice}</div>` : nothing} ${this._renderUndo()}
      ${this._renderAdjust(overrideActive, scheduled)} ${this._renderFeedbackSection()}
    `;
  }

  private _renderUndo() {
    const undo = this._undo;
    if (!undo?.shown) return nothing;
    const doing = this._undoDoing(undo.before);
    return html`<div class="undo-row">
      <button
        class="undo"
        aria-disabled=${this._busy !== null ? 'true' : 'false'}
        aria-label=${`Undo: ${doing.replace(/^Going back/, 'back')}`}
        @click=${this._onUndo}
      >
        Undo
      </button>
    </div>`;
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
                      ${h === 'next' ? `Until ${formatTime(next!, this.hass)}` : `${h} h`}
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

/** Undo puts an earlier adjustment back only with at least this long to run. */
const UNDO_MARGIN_MS = 5_000;

/** Whether HA shows what a change was to set: whether an adjustment runs,
 *  its band to the 0.1° shown, and its end to the second HA gives. */
function matches(expect: Undo['expect'], shown: Adjustment): boolean {
  if (expect.active !== shown.active) return false;
  if (expect.low !== undefined && Math.abs(expect.low - shown.low) > 0.05) return false;
  if (expect.high !== undefined && Math.abs(expect.high - shown.high) > 0.05) return false;
  if (
    expect.ends !== undefined &&
    (shown.ends === null || Math.abs(expect.ends - shown.ends) > 1000)
  )
    return false;
  return true;
}

function sameAdjustment(a: Adjustment, b: Adjustment): boolean {
  return a.active === b.active && a.ends === b.ends && a.low === b.low && a.high === b.high;
}

/** Whether HA shows the change: what it was to set, and something other
 *  than what was in force before it. A new length keeps the band, so until
 *  its end arrives the old adjustment would otherwise pass for it. */
function landed(undo: Omit<Undo, 'shown'>, shown: Adjustment): boolean {
  return matches(undo.expect, shown) && !sameAdjustment(undo.before, shown);
}

/** Whether Undo puts back an earlier adjustment's end: one that has at
 *  least a margin to run, so it isn't refused as past on its way. Else it
 *  ends the adjustment, as that one would have ended. */
function restoresEnd(before: Adjustment, now = Date.now()): boolean {
  return before.active && before.ends !== null && before.ends > now + UNDO_MARGIN_MS;
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-now-tab': ComfortBandNowTab;
  }
}
