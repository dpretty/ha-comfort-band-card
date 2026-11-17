/**
 * `<band-gauge>` — horizontal `[low … room … high]` gauge for a Comfort Band zone.
 *
 * A fixed-range track (15–28 °C) with a coloured band between `low` and
 * `high`, a round marker at `room`, and the band's two limits written under
 * it (#22). The band and marker take the action's colour: heating, cooling,
 * or at idle a neutral grey (the theme's secondary text colour) that stands
 * out from the track. The colour is mixed 30% towards the theme's text
 * colour, darker on a light card and lighter on a dark one, so a light
 * theme colour (HA's orange heat, say) still meets 3:1 against the card.
 *
 * Laid out in HTML rather than a stretched SVG, so the marker stays round at
 * any width.
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, asAction } from './styles.js';

const RANGE_MIN = 15;
const RANGE_MAX = 28;
const RANGE = RANGE_MAX - RANGE_MIN;

function pct(temp: number): number {
  if (Number.isNaN(temp) || !Number.isFinite(temp)) return 0;
  const clamped = Math.max(RANGE_MIN, Math.min(RANGE_MAX, temp));
  return ((clamped - RANGE_MIN) / RANGE) * 100;
}

@customElement('band-gauge')
export class BandGauge extends LitElement {
  @property({ type: Number }) public low = NaN;
  @property({ type: Number }) public high = NaN;
  @property({ type: Number }) public room = NaN;
  /** What the marker's temperature is, for screen readers. */
  @property({ type: String }) public roomLabel = 'room';
  /** Hidden from screen readers, for a gauge inside something that says it in
   *  words (the tile's status sentence). On the gauge itself: Chromium
   *  reads a label inside this shadow root into the name of a button around
   *  it, even under an aria-hidden wrapper. */
  @property({ type: Boolean }) public decorative = false;
  @property({ type: String }) public action: string | null = 'unknown';

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        width: 100%;
      }
      .gauge {
        /* The action's colour, moved towards the text's: darker on a light
           card, lighter on a dark one, so it meets 3:1 against it (#22). */
        --cb-gauge-color: color-mix(in oklab, var(--cb-gauge-base) 70%, var(--cb-text-primary));
        --cb-gauge-base: var(--cb-action-unknown);
      }
      .gauge.heating {
        --cb-gauge-base: var(--cb-action-heating);
      }
      .gauge.cooling {
        --cb-gauge-base: var(--cb-action-cooling);
      }
      /* Idle is the commonest state: a neutral grey that stands out from the
         track, not the inactive grey, which didn't (#22). */
      .gauge.idle {
        --cb-gauge-base: var(--cb-text-secondary);
      }
      .bar {
        position: relative;
        height: 24px;
      }
      .track,
      .band {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .track {
        left: 0;
        right: 0;
        height: 4px;
        border-radius: 2px;
        background: var(--cb-track-bg);
      }
      .band {
        height: 6px;
        border-radius: 3px;
        background: var(--cb-gauge-color);
      }
      /* Round at any width: its own box, not a stretched circle. */
      .marker {
        position: absolute;
        top: 50%;
        width: 9px;
        height: 9px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2.5px solid var(--cb-gauge-color);
        background: var(--ha-card-background, var(--card-background-color, #ffffff));
        transform: translate(-50%, -50%);
      }
      /* The band's limits, under its ends: the low one ending at the band's
         start, the high one starting at its end, so they never overlap, and
         kept within the gauge (each is under 5ch). The row is there, empty,
         when the band can't be read, so the gauge's height doesn't change. */
      .limits {
        position: relative;
        height: 14px;
        font-size: 11px;
        line-height: 14px;
        color: var(--cb-text-secondary);
        font-family: var(--paper-font-body1_-_font-family, sans-serif);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .limits span {
        position: absolute;
        top: 0;
      }
      .limits .low {
        left: min(max(var(--lo), 5ch), 100% - 5ch);
        transform: translateX(-100%);
        padding-right: 2px;
      }
      .limits .high {
        left: max(min(var(--hi), 100% - 5ch), min(max(var(--lo), 5ch), 100% - 5ch));
        padding-left: 2px;
      }
    `,
  ];

  protected override render() {
    const action = asAction(this.action);

    const lowKnown = Number.isFinite(this.low);
    const highKnown = Number.isFinite(this.high);
    const roomKnown = Number.isFinite(this.room);

    const lowPct = lowKnown ? pct(this.low) : 0;
    const highPct = highKnown ? pct(this.high) : 100;
    const bandX = Math.min(lowPct, highPct);
    const bandWidth = Math.max(0, Math.abs(highPct - lowPct));
    const roomPct = roomKnown ? pct(this.room) : 50;

    const fmt = (t: number) => (Number.isFinite(t) ? `${t.toFixed(1)}°` : '—');

    const doing = action === 'heating' || action === 'cooling' ? `, ${action}` : '';
    const aria = `Comfortable range ${fmt(this.low)} to ${fmt(this.high)}, ${this.roomLabel} ${fmt(this.room)}${doing}`;
    const band = lowKnown && highKnown;

    return html`
      <div
        class="gauge ${action}"
        role=${this.decorative ? nothing : 'img'}
        aria-label=${this.decorative ? nothing : aria}
        aria-hidden=${this.decorative ? 'true' : nothing}
        style="--lo: ${bandX}%; --hi: ${bandX + bandWidth}%"
      >
        <div class="bar">
          <div class="track"></div>
          ${band
            ? html`<div class="band" style="left: ${bandX}%; width: ${bandWidth}%"></div>`
            : nothing}
          ${roomKnown ? html`<div class="marker" style="left: ${roomPct}%"></div>` : nothing}
        </div>
        <div class="limits">
          ${band
            ? html`<span class="low">${fmt(Math.min(this.low, this.high))}</span>
                <span class="high">${fmt(Math.max(this.low, this.high))}</span>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'band-gauge': BandGauge;
  }
}
