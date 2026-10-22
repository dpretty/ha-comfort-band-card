/**
 * `<comfort-band-exact-range>` — the two-handled slider that sets a room's
 * range exactly, in the Advanced tab's Comfort section. Moved from the Now
 * tab, where Warmer and Cooler do the everyday job.
 *
 * Releasing a handle sends `comfort_band.start_override` with the range for
 * three hours, the Now tab's default length. With no schedule, the range
 * then stays until it's changed again. Calls go one after another, so they
 * land in the order made. A failed call is reported by HA's own toast.
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './dual-handle-slider.js';
import type { ZoneEntities } from './helpers.js';
import type { HomeAssistant } from './types.js';
import { startOverride } from './services.js';
import { readRoom } from './room-status.js';
import { tokens } from './styles.js';

/** The slider's usual range, widened to take in a band outside it, and its step. */
const SLIDER_MIN = 16;
const SLIDER_MAX = 26;
const SLIDER_STEP = 0.5;
/** How long a range set here lasts: the Now tab's default length. */
export const EXACT_RANGE_HOURS = 3;

@customElement('comfort-band-exact-range')
export class ComfortBandExactRange extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';
  @property({ attribute: false }) public entities?: ZoneEntities;

  @state() private _pendingLow: number | null = null;
  @state() private _pendingHigh: number | null = null;
  /** The track's range as last shown, kept from a drag's first move until its
   *  release, so the track doesn't rescale under the finger if the band in
   *  force changes meanwhile. */
  private _heldRange: { min: number; max: number } | null = null;
  /** Releases go one after another, as they did from the Now tab. */
  private _chain: Promise<unknown> = Promise.resolve();

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--cb-gap-sm) 0;
      }
      .title {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .desc {
        margin: 4px 0 var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
        line-height: 1.35;
      }
    `,
  ];

  private _onInput = (event: CustomEvent<{ low: number; high: number }>) => {
    this._pendingLow = event.detail.low;
    this._pendingHigh = event.detail.high;
  };

  private _onChange = (event: CustomEvent<{ low: number; high: number }>) => {
    this._pendingLow = null;
    this._pendingHigh = null;
    if (!this.hass || !this.zone) return;
    const hass = this.hass;
    const data = {
      zone: this.zone,
      low: event.detail.low,
      high: event.detail.high,
      hours: EXACT_RANGE_HOURS,
    };
    // HA's own toast says a call failed. The slider shows what it was moved
    // to until the range in force changes.
    this._chain = this._chain.then(() => startOverride(hass, data)).catch(() => undefined);
  };

  protected override render() {
    if (!this.hass || !this.entities) return nothing;
    const room = readRoom(this.hass, this.entities);
    const manualLow = numericState(this.hass, this.entities.manualLow);
    const manualHigh = numericState(this.hass, this.entities.manualHigh);
    // Start from the band actually in force. The manual values are only the
    // last override's, which can be far from the schedule's current band.
    const start = sliderStart(room.band.low, room.band.high, manualLow, manualHigh);
    const low = this._pendingLow ?? start.low;
    const high = this._pendingHigh ?? start.high;
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
    const lasts =
      room.scheduled === false
        ? 'Sets this room’s range until you change it.'
        : room.scheduled === true
          ? `Sets this room’s range for ${EXACT_RANGE_HOURS} hours, then the schedule takes over again.`
          : `Sets this room’s range for ${EXACT_RANGE_HOURS} hours.`;
    return html`
      <div role="group" aria-labelledby="exact-range-title" aria-describedby="exact-range-desc">
        <div class="title" id="exact-range-title">Set an exact range</div>
        <div class="desc" id="exact-range-desc">${lasts}</div>
        <dual-handle-slider
          .min=${range.min}
          .max=${range.max}
          .step=${SLIDER_STEP}
          .low=${low}
          .high=${high}
          @input=${this._onInput}
          @change=${this._onChange}
        ></dual-handle-slider>
      </div>
    `;
  }
}

function numericState(hass: HomeAssistant, entityId: string | null): number {
  const s = entityId !== null ? hass.states[entityId] : undefined;
  if (!s) return NaN;
  const n = parseFloat(s.state);
  return Number.isFinite(n) ? n : NaN;
}

/**
 * Where the slider starts: the effective band (what is in force now), falling
 * back to the manual values, then to a neutral default, when the band is
 * unavailable. Rounded to the 0.1° the readout shows, so what is sent is what was
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

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-exact-range': ComfortBandExactRange;
  }
}
