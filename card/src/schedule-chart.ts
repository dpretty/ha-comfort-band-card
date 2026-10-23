/**
 * `<comfort-band-schedule-chart>` — read-only schedule visualization.
 *
 * Renders the active profile's baseline schedule as two stepped lines
 * (low + high band edges) with the area between filled lightly. Each
 * transition shows a small marker circle at the low + high points. The low
 * edge takes the heating colour and the high edge the cooling colour, each
 * labelled ("Low", "High") so colour isn't the only cue. With `now` set, a
 * marker shows the time of day (#33).
 *
 * **v0.9.0**: editing moved out of the chart. The chart is now a pure
 * data-in, SVG-out visualization with no pointer or keyboard handlers,
 * no drag, no long-press-to-delete (the latter caused the "circles
 * disappear when I try to drag them" bug in v0.8.x — see plan
 * pls-review-issues-in-deep-acorn.md). Editing happens in the
 * `<comfort-band-schedule-tab>`'s list view via explicit
 * Add / Edit / Delete buttons + the existing `transition-edit-dialog`.
 */

import { LitElement, css, html, svg, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from './styles.js';
import type { Transition } from './types.js';

const Y_AXIS_MIN = 14;
const Y_AXIS_MAX = 28;

const VIEW_W = 600;
const VIEW_H = 200;

const HOUR_TICKS = [0, 6, 12, 18, 24];
/** The left gutter, in px, that the temperature labels sit in. */
const GUTTER = 32;
const TEMP_TICKS = [14, 18, 22, 26];

/** Parse an `HH:MM` (or `H:MM`) string to minutes-since-midnight.
 *  Exported so other modules (e.g. `schedule-tab.ts`) sort the same way the
 *  chart renders, instead of re-implementing the same regex. */
export function parseTime(at: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(at);
  if (!m) return 0;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

@customElement('comfort-band-schedule-chart')
export class ComfortBandScheduleChart extends LitElement {
  @property({ type: Array }) public transitions: Transition[] = [];
  /** Minutes past midnight now, in HA's time zone, for the now marker; null
   *  for none. */
  @property({ attribute: false }) public now: number | null = null;

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        position: relative;
        margin: var(--cb-gap-md) 0;
      }
      .chart {
        position: relative;
        width: 100%;
        height: 200px;
        /* Reserve a left gutter so the Y-axis temperature labels sit
           inside the chart's bounding box. Without this they overflow
           the schedule-tab's 12 px padding and the modal clips their
           leading digit ("25°" rendered as "5°"). */
        padding-left: ${unsafeCSS(GUTTER)}px;
        box-sizing: border-box;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        overflow: visible;
      }
      .grid {
        stroke: var(--cb-track-bg);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
        fill: none;
      }
      .fill {
        fill: var(--cb-track-bg);
        opacity: 0.4;
      }
      .line {
        fill: none;
        stroke: var(--cb-accent, var(--primary-color, #03a9f4));
        stroke-width: 2;
        stroke-linejoin: round;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      .line.low,
      .marker.low {
        stroke: var(--cb-action-heating);
      }
      .line.high,
      .marker.high {
        stroke: var(--cb-action-cooling);
      }
      .marker {
        fill: var(--ha-card-background, #ffffff);
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      .now-line {
        stroke: var(--cb-text-secondary);
        stroke-width: 1.5;
        stroke-dasharray: 4 3;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      /* Text in HTML over the chart, as the axis labels are: the SVG
         stretches to the card's width. */
      .edge-label,
      .now-label {
        position: absolute;
        font-size: 11px;
        line-height: 1;
        color: var(--cb-text-secondary);
        pointer-events: none;
        white-space: nowrap;
      }
      /* A swatch of the line's colour: text in it would be too faint. */
      .edge-label {
        right: 2px;
        padding-left: 6px;
        border-left: 3px solid;
      }
      .edge-label.low {
        border-left-color: var(--cb-action-heating);
        transform: translateY(4px);
      }
      .edge-label.high {
        border-left-color: var(--cb-action-cooling);
        transform: translateY(calc(-100% - 4px));
      }
      .now-label {
        top: -14px;
        transform: translateX(-50%);
      }
      .axis-label {
        position: absolute;
        font-size: 10px;
        color: var(--cb-text-secondary);
        font-variant-numeric: tabular-nums;
        pointer-events: none;
      }
      .axis-label.x {
        bottom: -16px;
        transform: translateX(-50%);
      }
      .axis-label.x.start {
        transform: translateX(0);
      }
      .axis-label.x.end {
        transform: translateX(-100%);
      }
      .axis-label.y {
        left: 4px;
        transform: translateY(-50%);
        text-align: right;
        width: 24px;
      }
    `,
  ];

  private _timeToX(mins: number): number {
    return (mins / (24 * 60)) * VIEW_W;
  }

  private _tempToY(temp: number): number {
    const clamped = clamp(temp, Y_AXIS_MIN, Y_AXIS_MAX);
    return VIEW_H - ((clamped - Y_AXIS_MIN) / (Y_AXIS_MAX - Y_AXIS_MIN)) * VIEW_H;
  }

  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is sorted by `at` ascending — the caller sorts. */
  private _stepPoints(transitions: Transition[], pick: 'low' | 'high'): Array<[number, number]> {
    const wrap = transitions[transitions.length - 1][pick];
    const pts: Array<[number, number]> = [[0, this._tempToY(wrap)]];
    let current = wrap;
    for (const t of transitions) {
      const x = this._timeToX(parseTime(t.at));
      pts.push([x, this._tempToY(current)]);
      pts.push([x, this._tempToY(t[pick])]);
      current = t[pick];
    }
    pts.push([VIEW_W, this._tempToY(current)]);
    return pts;
  }

  private _pointsToPath(pts: Array<[number, number]>): string {
    return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  }

  private _fillFromPoints(
    highPts: Array<[number, number]>,
    lowPts: Array<[number, number]>,
  ): string {
    const forward = this._pointsToPath(highPts);
    const back = lowPts
      .slice()
      .reverse()
      .map(([x, y]) => `L ${x} ${y}`)
      .join(' ');
    return `${forward} ${back} Z`;
  }

  protected override render() {
    // Sort numerically so a non-zero-padded `at` from any future source still
    // builds the step paths in the correct order. Defensive — callers always
    // pre-sort, but the chart's data-in contract shouldn't trust them.
    const rendered = [...this.transitions].sort((a, b) => parseTime(a.at) - parseTime(b.at));
    const hasTransitions = rendered.length > 0;
    const lowPts = hasTransitions ? this._stepPoints(rendered, 'low') : [];
    const highPts = hasTransitions ? this._stepPoints(rendered, 'high') : [];
    const lowPath = hasTransitions ? this._pointsToPath(lowPts) : '';
    const highPath = hasTransitions ? this._pointsToPath(highPts) : '';
    const fillPath = hasTransitions ? this._fillFromPoints(highPts, lowPts) : '';
    // Each edge is labelled where it ends the day, at the right.
    const last = rendered[rendered.length - 1];
    const endPct = (pick: 'low' | 'high') => (this._tempToY(last[pick]) / VIEW_H) * 100;
    const nowX =
      this.now !== null && Number.isFinite(this.now)
        ? this._timeToX(clamp(this.now, 0, 24 * 60))
        : null;

    return html`
      <div class="chart">
        <svg
          viewBox="0 0 ${VIEW_W} ${VIEW_H}"
          preserveAspectRatio="none"
          role="img"
          aria-label="The comfortable range through the day"
        >
          <title>The comfortable range through the day</title>
          ${TEMP_TICKS.map(
            (t) =>
              svg`<line class="grid" x1="0" x2=${VIEW_W} y1=${this._tempToY(t)} y2=${this._tempToY(t)}></line>`,
          )}
          ${HOUR_TICKS.map(
            (h) =>
              svg`<line class="grid" y1="0" y2=${VIEW_H} x1=${(h / 24) * VIEW_W} x2=${(h / 24) * VIEW_W}></line>`,
          )}
          ${hasTransitions
            ? svg`
                <path class="fill" d=${fillPath}></path>
                <path class="line low" d=${lowPath}></path>
                <path class="line high" d=${highPath}></path>
              `
            : null}
          ${rendered.map((t) => {
            const x = this._timeToX(parseTime(t.at));
            return svg`
              <circle class="marker low" cx=${x} cy=${this._tempToY(t.low)} r="5"></circle>
              <circle class="marker high" cx=${x} cy=${this._tempToY(t.high)} r="5"></circle>
            `;
          })}
          ${nowX !== null
            ? svg`<line class="now-line" x1=${nowX} x2=${nowX} y1="0" y2=${VIEW_H}></line>`
            : null}
        </svg>
        ${hasTransitions
          ? html`<div class="edge-label high" style="top: ${endPct('high')}%">High</div>
              <div class="edge-label low" style="top: ${endPct('low')}%">Low</div>`
          : null}
        ${nowX !== null
          ? html`<div
              class="now-label"
              style="left: calc(${GUTTER}px + (100% - ${GUTTER}px) * ${nowX / VIEW_W})"
            >
              Now
            </div>`
          : null}
        ${TEMP_TICKS.map(
          (t) =>
            html`<div
              class="axis-label y"
              style="top: ${((Y_AXIS_MAX - t) / (Y_AXIS_MAX - Y_AXIS_MIN)) * 100}%"
            >
              ${t}°
            </div>`,
        )}
        ${HOUR_TICKS.map((h, i) => {
          const cls =
            i === 0
              ? 'axis-label x start'
              : i === HOUR_TICKS.length - 1
                ? 'axis-label x end'
                : 'axis-label x';
          return html`<div class=${cls} style="left: ${(h / 24) * 100}%">${h}h</div>`;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-schedule-chart': ComfortBandScheduleChart;
  }
}
