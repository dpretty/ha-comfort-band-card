/**
 * `<comfort-band-now-tab>` — the "Now" tab content of the modal.
 *
 * Reads live state for the zone (room, low, high, action, override) and
 * shows:
 *   - Big band gauge at the top.
 *   - "How does it feel?" comfort-feedback pills below the gauge — each
 *     calls `comfort_band.record_feedback` (v0.11.0+) and briefly
 *     highlights to confirm.
 *   - Current action chip (heating / cooling / idle).
 *   - Dual-handle slider, starting from the band actually in force. Any
 *     change starts an override via `comfort_band.start_override` (the
 *     slider's `change` event, fired on release, drives the service call),
 *     and is followed by an "Adjusted … · Undo" notice.
 *   - Override-active state line + Cancel-override button, also undoable.
 *     Undo takes back every change made while its notice is up, together.
 *   - Override-duration buttons (1h / 3h / 6h) that update the
 *     `number.{zone}_override_hours` entity for future overrides.
 */

import { LitElement, html, css, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../band-gauge.js';
import '../dual-handle-slider.js';
import type { DualHandleSlider } from '../dual-handle-slider.js';
import type { ZoneEntities } from '../helpers.js';
import type { HomeAssistant } from '../types.js';
import { cancelOverride, recordFeedback, startOverride } from '../services.js';
import type { FeedbackLabel } from '../services.js';
import { tokens, actionColorVar, asAction, actionLabel } from '../styles.js';

const HOUR_PRESETS = [1, 3, 6] as const;

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

/** How long the "Adjusted … · Undo" notice stays up. Long enough to notice a
 *  mistake and reach the button on a wall panel. */
const UNDO_WINDOW_MS = 10_000;
/** How long the short confirmations and error notices stay up. */
const NOTICE_MS = 4_000;
/** After a change, the slider keeps showing what was chosen until the new band
 *  arrives in `hass`, so it doesn't snap back for a moment and look as though
 *  the change didn't take. This bounds the wait if it never arrives. */
const SETTLE_MAX_MS = 5_000;

/** What Undo puts back: the zone's manual band, and when the override that
 *  was running would have ended (null when none was). */
interface UndoPoint {
  low: number;
  high: number;
  endsAt: number | null;
}

/** Changes made while an Undo notice is up form one run, and Undo takes the
 *  whole run back, to before its first change. Undoing only the last step
 *  would leave a band the user was passing through on the way, with a
 *  keyboard nudge or a second drag. */
interface Run {
  /** Undefined when the state before the run couldn't be read back. */
  point: UndoPoint | undefined;
  /** Whether any change in the run went through, so there is something to undo. */
  changed: boolean;
}

/** A notice under the slider: what just changed, and the run to take back. */
interface Notice {
  text: string;
  error?: boolean;
  run?: Run;
}

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

  @state() private _notice: Notice | null = null;
  private _noticeTimer: ReturnType<typeof setTimeout> | null = null;
  /** The run of changes in progress, or null when there is none. */
  private _run: Run | null = null;
  /** Bumped by every change, Undo, drag and detach. A call that finishes after
   *  something newer has started leaves the notice and the slider alone. */
  private _seq = 0;
  /** Calls are sent one at a time, in the order they were made: HA runs
   *  service calls concurrently, so two sent together could land in either
   *  order and leave the earlier one in force. */
  private _queue: Promise<unknown> = Promise.resolve();
  private _inFlight = 0;
  /** True between a successful change and the new band showing up in `hass`. */
  private _settling = false;
  private _settleTimer: ReturnType<typeof setTimeout> | null = null;
  /** Monotonic tap counter. Service calls are concurrent and may resolve
   *  out of order, so each tap captures its seq and only claims the
   *  highlight if it's still the latest — the last-tapped pill always wins,
   *  regardless of which round-trip finishes first. */
  private _feedbackSeq = 0;

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      .gauge-row {
        margin-bottom: var(--cb-gap-md);
      }
      .header-row {
        display: flex;
        align-items: baseline;
        gap: var(--cb-gap-sm);
        margin-bottom: var(--cb-gap-sm);
      }
      .room-temp {
        font-size: 36px;
        font-weight: 300;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
        line-height: 1;
      }
      .feels-like {
        margin-top: 4px;
        margin-bottom: var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
        display: flex;
        align-items: center;
        gap: var(--cb-gap-sm);
        /* Narrow Lovelace tiles (~180 px in a 2-column grid) overflow
           when "Feels like 23.5°" sits next to the "DRIVING DECISIONS"
           pill; wrap so the badge drops to its own line cleanly. */
        flex-wrap: wrap;
      }
      .feels-like .driving {
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        padding: 1px 6px;
        border-radius: var(--cb-radius-pill);
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        color: #ffffff;
      }
      .feels-like .muted-warn {
        font-style: italic;
      }
      .action-chip {
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        padding: 2px 8px;
        border-radius: var(--cb-radius-pill);
        color: var(--cb-text-on-action, #ffffff);
      }
      section {
        margin-top: var(--cb-gap-lg);
      }
      h3 {
        margin: 0 0 var(--cb-gap-sm);
        font-size: 13px;
        font-weight: 500;
        color: var(--cb-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .notice {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--cb-gap-sm);
        margin-top: var(--cb-gap-sm);
        padding: var(--cb-gap-sm) var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--cb-track-bg);
        font-size: 13px;
        color: var(--cb-text-primary);
      }
      .notice.error {
        color: var(--error-color, #db4437);
      }
      .undo {
        font: inherit;
        font-weight: 500;
        /* WCAG 2.5.5: a comfortable touch target on a wall panel. */
        min-height: 44px;
        min-width: 64px;
        padding: 0 12px;
        border: none;
        border-radius: var(--cb-radius-pill);
        background: transparent;
        color: var(--cb-accent, var(--primary-color, #03a9f4));
        cursor: pointer;
      }
      .undo:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .override-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--cb-gap-sm);
        padding: var(--cb-gap-sm) var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--cb-track-bg);
        font-size: 13px;
        color: var(--cb-text-primary);
      }
      .button {
        font: inherit;
        padding: 6px 12px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid transparent;
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        color: #ffffff;
        cursor: pointer;
      }
      .button.secondary {
        background: transparent;
        border-color: var(--divider-color, #cccccc);
        color: var(--cb-text-primary);
      }
      .preset-row {
        display: flex;
        gap: var(--cb-gap-sm);
      }
      .preset {
        font: inherit;
        padding: 4px 10px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        background: transparent;
        color: var(--cb-text-primary);
        cursor: pointer;
      }
      .preset.active {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        color: #ffffff;
        border-color: transparent;
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
      .feedback-pill:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
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
    // Calls already sent still finish, but leave this element alone.
    this._seq++;
    this._run = null;
    this._clearNotice();
    this._releasePending();
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    // Hold the chosen values only until the integration reports them back.
    if (changed.has('hass') && this._settling && this.entities) {
      const effLow = this._numericState(this.entities.effectiveLow);
      const effHigh = this._numericState(this.entities.effectiveHigh);
      if (
        this._pendingLow !== null &&
        this._pendingHigh !== null &&
        Math.abs(effLow - this._pendingLow) < 0.01 &&
        Math.abs(effHigh - this._pendingHigh) < 0.01
      ) {
        this._releasePending();
      }
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

  private _onSliderInput = (event: CustomEvent<{ low: number; high: number }>) => {
    // A new drag supersedes any change still in flight or settling.
    this._seq++;
    this._stopSettling();
    this._pendingLow = event.detail.low;
    this._pendingHigh = event.detail.high;
  };

  private _onSliderChange = (event: CustomEvent<{ low: number; high: number }>) => {
    const { low, high } = event.detail;
    this._pendingLow = low;
    this._pendingHigh = high;
    void this._change({
      call: (hass, zone) => startOverride(hass, { zone, low, high }),
      done: () => `Adjusted to ${fmtTemp(low)} – ${fmtTemp(high)}${this._until()}`,
      failed: "Couldn't adjust this room. Try again.",
      settle: true,
    });
  };

  private _onCancel = () => {
    this._releasePending();
    void this._change({
      call: (hass, zone) => cancelOverride(hass, { zone }),
      // Not "back to the schedule": a zone with no schedule keeps the band.
      done: () => 'Override cancelled',
      failed: "Couldn't cancel the override. Try again.",
    });
  };

  /** Makes one change, as part of the run in progress or as the first of a new one. */
  private async _change(opts: {
    call: (hass: HomeAssistant, zone: string) => Promise<unknown>;
    done: () => string;
    failed: string;
    settle?: boolean;
  }): Promise<void> {
    const hass = this.hass;
    const zone = this.zone;
    if (!hass || !zone) return;
    const seq = ++this._seq;
    // Read the state the run would go back to before this change is sent.
    const run = (this._run ??= { point: this._undoPoint(), changed: false });
    try {
      await this._send(() => opts.call(hass, zone));
    } catch {
      if (seq !== this._seq) return;
      if (opts.settle) this._releasePending();
      this._run = run;
      this._showNotice({ text: opts.failed, error: true, run });
      return;
    }
    run.changed = true;
    if (seq !== this._seq) return;
    if (opts.settle) this._startSettling();
    this._run = run;
    this._showNotice({ text: opts.done(), run });
  }

  private _onUndo = async () => {
    const run = this._notice?.run;
    const hass = this.hass;
    const zone = this.zone;
    if (!run?.point || !run.changed || !hass || !zone) return;
    const point = run.point;
    const seq = ++this._seq;
    this._run = null;
    this._clearNotice();
    this._releasePending();
    try {
      await this._send(() => restore(hass, zone, point));
    } catch {
      if (seq !== this._seq) return;
      // Still undoable: the button stays, to try again.
      this._run = run;
      this._showNotice({ text: "Couldn't undo that.", error: true, run });
      return;
    }
    if (seq !== this._seq) return;
    this._showNotice({ text: 'Undone' });
  };

  /**
   * Reads the state a run would go back to: the manual band, and whether an
   * override was running and when it ends. Returns undefined, so no Undo is
   * offered, when any of it can't be read, and while an earlier call is still
   * going through, since `hass` may not show its result yet.
   */
  private _undoPoint(): UndoPoint | undefined {
    const entities = this.entities;
    if (!entities || this._inFlight > 0) return undefined;
    const low = this._numericState(entities.manualLow);
    const high = this._numericState(entities.manualHigh);
    if (!Number.isFinite(low) || !Number.isFinite(high)) return undefined;
    const active = this._stateOf(entities.overrideActive)?.state;
    if (active === 'off') return { low, high, endsAt: null };
    if (active !== 'on') return undefined;
    const endsAt = Date.parse(this._stateOf(entities.overrideEnds)?.state ?? '');
    return Number.isNaN(endsAt) ? undefined : { low, high, endsAt };
  }

  private _send(call: () => Promise<unknown>): Promise<unknown> {
    this._inFlight++;
    const sent = this._queue.then(call).finally(() => this._inFlight--);
    this._queue = sent.catch(() => undefined);
    return sent;
  }

  /** " until 14:30", from the zone's override length, which the service uses
   *  when none is passed. */
  private _until(): string {
    const hours = this._numericState(this.entities?.overrideHours ?? null);
    return Number.isFinite(hours) ? ` until ${formatClock(Date.now() + hours * 3_600_000)}` : '';
  }

  private _showNotice(notice: Notice): void {
    this._clearNotice();
    this._notice = notice;
    this._noticeTimer = setTimeout(
      () => {
        this._clearNotice();
        // The run ends with its notice, unless a change in it is still going
        // through; that change puts the notice back up when it finishes.
        if (this._inFlight === 0) this._run = null;
      },
      undoable(notice) ? UNDO_WINDOW_MS : NOTICE_MS,
    );
  }

  private _clearNotice(): void {
    if (this._noticeTimer !== null) clearTimeout(this._noticeTimer);
    this._noticeTimer = null;
    this._notice = null;
  }

  private _startSettling(): void {
    this._stopSettling();
    this._settling = true;
    this._settleTimer = setTimeout(() => this._releasePending(), SETTLE_MAX_MS);
  }

  private _stopSettling(): void {
    if (this._settleTimer !== null) clearTimeout(this._settleTimer);
    this._settleTimer = null;
    this._settling = false;
  }

  private _releasePending(): void {
    this._stopSettling();
    this._pendingLow = null;
    this._pendingHigh = null;
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

  private _onPickHours = (hours: number) => {
    if (!this.hass || !this.entities?.overrideHours) return;
    void this.hass.callService('number', 'set_value', {
      entity_id: this.entities.overrideHours,
      value: hours,
    });
  };

  protected override render() {
    if (!this.hass || !this.entities) return nothing;

    const lowState = this._numericState(this.entities.manualLow);
    const highState = this._numericState(this.entities.manualHigh);
    const effLow = this._numericState(this.entities.effectiveLow);
    const effHigh = this._numericState(this.entities.effectiveHigh);
    const room = this._numericState(this.entities.roomTemperature);
    const apparent = this._numericState(this.entities.apparentTemperature);
    const overrideHours = this._numericState(this.entities.overrideHours);
    const action = this._stateOf(this.entities.currentAction)?.state ?? 'unknown';
    const overrideActive = this._stateOf(this.entities.overrideActive)?.state === 'on';
    const useApparentOn = this._stateOf(this.entities.useApparentTemperature)?.state === 'on';
    // Only show "Feels like" when apparent is meaningfully different from
    // the raw reading — otherwise it's noise. 0.1 °C tolerance because both
    // sensors round to 1 decimal.
    const showFeelsLike =
      Number.isFinite(room) && Number.isFinite(apparent) && Math.abs(apparent - room) >= 0.1;

    // Start from the band actually in force. The manual values are only the
    // last override's, which can be far from the schedule's current band.
    const start = sliderStart(effLow, effHigh, lowState, highState);
    const sliderLow = this._pendingLow ?? start.low;
    const sliderHigh = this._pendingHigh ?? start.high;
    // Widen the track to take in a band outside it. Clamped to the track, the
    // limit the user didn't move would be sent back changed. Includes the
    // band in force, so the track doesn't rescale under a drag.
    const sliderMin = Math.min(SLIDER_MIN, Math.floor(Math.min(start.low, sliderLow)));
    const sliderMax = Math.max(SLIDER_MAX, Math.ceil(Math.max(start.high, sliderHigh)));

    const actionTyped = asAction(action);
    const showChip = actionTyped !== 'idle' && actionTyped !== 'unknown';

    return html`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(room) ? `${room.toFixed(1)}°` : '—'}</div>
        ${showChip
          ? html`<span class="action-chip" style="background:${actionColorVar(actionTyped)}"
              >${actionLabel(actionTyped)}</span
            >`
          : nothing}
      </div>
      ${this._renderFeelsLikeRow({ apparent, showFeelsLike, useApparentOn })}
      <div class="gauge-row">
        <band-gauge .low=${effLow} .high=${effHigh} .room=${room} .action=${action}></band-gauge>
      </div>

      ${this._renderFeedbackSection()}

      <section>
        <h3>Manual band</h3>
        <dual-handle-slider
          .min=${sliderMin}
          .max=${sliderMax}
          .step=${SLIDER_STEP}
          .low=${sliderLow}
          .high=${sliderHigh}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
        ${this._renderNotice()}
      </section>

      ${this._renderOverrideSection(overrideActive)} ${this._renderHoursSection(overrideHours)}
    `;
  }

  private _renderNotice() {
    // The live region is always present so screen readers announce changes.
    const n = this._notice;
    return html`<div class="notice-region" role="status" aria-live="polite">
      ${n
        ? html`<div class="notice ${n.error ? 'error' : ''}">
            <span>${n.text}</span>
            ${undoable(n)
              ? html`<button class="undo" @click=${() => void this._onUndo()}>Undo</button>`
              : nothing}
          </div>`
        : nothing}
    </div>`;
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

  private _renderOverrideSection(overrideActive: boolean) {
    if (!overrideActive) return nothing;
    const ends = this._stateOf(this.entities!.overrideEnds)?.state;
    const remaining = formatRemaining(ends ?? null);
    return html`
      <section>
        <h3>Override</h3>
        <div class="override-row">
          <span>Active${remaining ? ` · ${remaining}` : ''}</span>
          <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        </div>
      </section>
    `;
  }

  private _renderFeelsLikeRow(opts: {
    apparent: number;
    showFeelsLike: boolean;
    useApparentOn: boolean;
  }) {
    const { apparent, showFeelsLike, useApparentOn } = opts;
    // The "Driving decisions" badge is decoupled from `showFeelsLike` so
    // it stays visible at mid-humidity bands where the 1-decimal rounding
    // on both sensors collapses the apparent/room delta below the 0.1 °C
    // threshold. Without this, the user would lose all card-side
    // feedback that apparent mode is the active decision input.
    const showBadge = useApparentOn && Number.isFinite(apparent);
    if (showFeelsLike) {
      return html`<div class="feels-like">
        <span>Feels like ${apparent.toFixed(1)}°</span>
        ${showBadge ? html`<span class="driving">Driving decisions</span>` : nothing}
      </div>`;
    }
    if (showBadge) {
      // Apparent mode is on but the value matches the room temp this
      // tick (within rounding). Suppress the redundant "Feels like X°"
      // text; the badge alone tells the user apparent is still in charge.
      return html`<div class="feels-like">
        <span class="driving">Driving decisions</span>
      </div>`;
    }
    if (useApparentOn) {
      return html`<div class="feels-like">
        <span class="muted-warn">
          Apparent temperature mode is on but no humidity reading is available — decisions are using
          the raw room temperature.
        </span>
      </div>`;
    }
    return nothing;
  }

  private _renderHoursSection(overrideHours: number) {
    if (!this.entities?.overrideHours) return nothing;
    return html`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${HOUR_PRESETS.map(
            (h) => html`
              <button
                class="preset ${overrideHours === h ? 'active' : ''}"
                @click=${() => this._onPickHours(h)}
              >
                ${h} h
              </button>
            `,
          )}
        </div>
      </section>
    `;
  }
}

/**
 * Where the slider starts: the effective band (what is in force now), falling
 * back to the manual values, then to a neutral default, when the band is
 * unavailable. Rounded to the 0.1° the labels show, so what is sent is what was
 * shown, but not snapped to the slider's steps or its range: nudging one
 * handle must send the other limit back as it is. Only a band narrower than
 * one step, which the slider can't hold, is widened.
 */
export function sliderStart(
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

function undoable(notice: Notice): boolean {
  return notice.run?.point !== undefined && notice.run.changed;
}

/**
 * Puts a zone back as it was before a run, in one call: its manual band, and
 * its override for the time that was left. With no override to go back to
 * (none was running, or it has run out since), hours is 0: `start_override`
 * stores the band, and the refresh it runs straight away finds the override
 * already over and clears it. The zone then follows its schedule, or, with no
 * schedule, that band. Cancelling instead would leave the run's band in the
 * manual values, and in force in a zone with no schedule.
 */
function restore(hass: HomeAssistant, zone: string, point: UndoPoint): Promise<unknown> {
  const left = point.endsAt === null ? 0 : (point.endsAt - Date.now()) / 3_600_000;
  return startOverride(hass, { zone, low: point.low, high: point.high, hours: Math.max(0, left) });
}

function fmtTemp(value: number): string {
  return `${value.toFixed(1)}°`;
}

function formatClock(ms: number): string {
  return new Date(ms).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function formatRemaining(iso: string | null): string {
  if (!iso) return '';
  const target = Date.parse(iso);
  if (Number.isNaN(target)) return '';
  const ms = target - Date.now();
  if (ms <= 0) return '';
  const totalMins = Math.round(ms / 60_000);
  if (totalMins < 60) return `${totalMins}m left`;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return mins ? `${hours}h ${mins}m left` : `${hours}h left`;
}

// Avoid unused-import lint complaints.
export type { DualHandleSlider };

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-now-tab': ComfortBandNowTab;
  }
}
