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
 *     slider's `change` event, fired on release, drives the service call).
 *   - Override-active state line + Cancel-override button.
 *   - Override-duration buttons (1h / 3h / 6h) that update the
 *     `number.{zone}_override_hours` entity for future overrides.
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
    this._pendingLow = event.detail.low;
    this._pendingHigh = event.detail.high;
  };

  private _onSliderChange = (event: CustomEvent<{ low: number; high: number }>) => {
    if (!this.hass || !this.zone) return;
    this._pendingLow = null;
    this._pendingHigh = null;
    void startOverride(this.hass, {
      zone: this.zone,
      low: event.detail.low,
      high: event.detail.high,
    });
  };

  private _onCancel = () => {
    if (!this.hass || !this.zone) return;
    void cancelOverride(this.hass, { zone: this.zone });
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
          .min=${range.min}
          .max=${range.max}
          .step=${SLIDER_STEP}
          .low=${sliderLow}
          .high=${sliderHigh}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
      </section>

      ${this._renderOverrideSection(overrideActive)} ${this._renderHoursSection(overrideHours)}
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
