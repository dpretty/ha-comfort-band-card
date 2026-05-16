/**
 * `<comfort-band-schedule-chart>` — 2D schedule editor.
 *
 * Replaces the v0.1 thin-ribbon timeline. Renders the active profile's
 * baseline schedule as two stepped lines (low + high band edges) with
 * the area between filled lightly. Each transition gets two interactive
 * handles — one at the low edge, one at the high edge — that the user
 * can drag in both axes.
 *
 * Events (all bubble, composed=true so they reach `<comfort-band-schedule-tab>`):
 *   - transition-add    { at, low, high } — tap on empty space
 *   - transition-edit   { transition }    — tap on a handle (no drag)
 *   - transition-delete { at }            — long-press or Delete key
 *   - transition-update { oldAt, transition } — drag release or arrow-key nudge
 */

import { LitElement, css, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens } from './styles.js';
import type { Transition } from './types.js';

const SNAP_MINUTES = 15;
const SNAP_TEMP_C = 0.5;
const Y_AXIS_MIN = 14;
const Y_AXIS_MAX = 28;
const DRAG_THRESHOLD_PX = 4;
const LONG_PRESS_MS = 500;

const VIEW_W = 600;
const VIEW_H = 200;
const MIN_MINUTES = 0;
const MAX_MINUTES = 24 * 60 - SNAP_MINUTES;

const HOUR_TICKS = [0, 6, 12, 18, 24];
const TEMP_TICKS = [14, 18, 22, 26];

type Handle = 'low' | 'high';

interface HandleDrag {
  kind: 'handle';
  handle: Handle;
  origin: Transition;
  startX: number;
  startY: number;
  moved: boolean;
  longPressTimer: number | null;
  longPressed: boolean;
}

interface EmptyDrag {
  kind: 'empty';
  startX: number;
  startY: number;
  moved: boolean;
}

type DragState = HandleDrag | EmptyDrag | null;

function parseTime(at: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(at);
  if (!m) return 0;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

function formatTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function snapMinutes(mins: number): number {
  return Math.round(mins / SNAP_MINUTES) * SNAP_MINUTES;
}

function snapTemp(t: number): number {
  return Math.round(t / SNAP_TEMP_C) * SNAP_TEMP_C;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

@customElement('comfort-band-schedule-chart')
export class ComfortBandScheduleChart extends LitElement {
  @property({ type: Array }) public transitions: Transition[] = [];

  @state() private _drag: DragState = null;
  // While dragging a handle, render the in-progress position from this preview
  // (keyed by the original `at`) instead of from the prop.
  @state() private _preview: { at: string; low: number; high: number } | null = null;
  @state() private _focusedAt: string | null = null;
  @state() private _focusedHandle: Handle | null = null;

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
        user-select: none;
        touch-action: none;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        overflow: visible;
        cursor: crosshair;
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
      .handle {
        fill: var(--ha-card-background, #ffffff);
        stroke: var(--cb-accent, var(--primary-color, #03a9f4));
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
        cursor: grab;
      }
      .handle:focus-visible,
      .handle.focused {
        outline: none;
        stroke-width: 3;
        filter: drop-shadow(0 0 2px var(--cb-accent, var(--primary-color, #03a9f4)));
      }
      .handle.dragging {
        cursor: grabbing;
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
        left: -28px;
        transform: translateY(-50%);
        text-align: right;
        width: 24px;
      }
      .empty-hint {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: var(--cb-text-secondary);
        pointer-events: none;
      }
    `,
  ];

  public override disconnectedCallback(): void {
    if (this._drag && this._drag.kind === 'handle' && this._drag.longPressTimer !== null) {
      window.clearTimeout(this._drag.longPressTimer);
    }
    super.disconnectedCallback();
  }

  private _timeToX(mins: number): number {
    return (mins / (24 * 60)) * VIEW_W;
  }

  private _tempToY(temp: number): number {
    const clamped = clamp(temp, Y_AXIS_MIN, Y_AXIS_MAX);
    return VIEW_H - ((clamped - Y_AXIS_MIN) / (Y_AXIS_MAX - Y_AXIS_MIN)) * VIEW_H;
  }

  private _clientToMinutes(clientX: number, rect: DOMRect): number {
    if (rect.width === 0) return 0;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    return snapMinutes(ratio * 24 * 60);
  }

  private _clientToTemp(clientY: number, rect: DOMRect): number {
    if (rect.height === 0) return Y_AXIS_MIN;
    const ratio = clamp((clientY - rect.top) / rect.height, 0, 1);
    const raw = Y_AXIS_MAX - ratio * (Y_AXIS_MAX - Y_AXIS_MIN);
    return snapTemp(raw);
  }

  private _svg(): SVGElement | null {
    return this.shadowRoot?.querySelector('svg') ?? null;
  }

  private _sortedAts(): number[] {
    return this.transitions.map((t) => parseTime(t.at)).sort((a, b) => a - b);
  }

  /** Allowed time range for a dragging transition: open interval between its neighbours. */
  private _timeRangeFor(originAt: string): { min: number; max: number } {
    const originMins = parseTime(originAt);
    const others = this._sortedAts().filter((m) => m !== originMins);
    let min = MIN_MINUTES;
    let max = MAX_MINUTES;
    for (const m of others) {
      if (m < originMins && m + SNAP_MINUTES > min) min = m + SNAP_MINUTES;
      if (m > originMins && m - SNAP_MINUTES < max) max = m - SNAP_MINUTES;
    }
    return { min, max };
  }

  private _fire(
    name: 'transition-add' | 'transition-edit' | 'transition-delete' | 'transition-update',
    detail: unknown,
  ): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  // ----- pointer handlers -----

  private _onHandlePointerDown = (event: PointerEvent, transition: Transition, handle: Handle) => {
    event.stopPropagation();
    event.preventDefault();
    const target = event.currentTarget as SVGElement;
    target.setPointerCapture(event.pointerId);

    const drag: HandleDrag = {
      kind: 'handle',
      handle,
      origin: { ...transition },
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      longPressTimer: null,
      longPressed: false,
    };
    drag.longPressTimer = window.setTimeout(() => {
      if (this._drag === drag && !drag.moved) {
        drag.longPressed = true;
        this._fire('transition-delete', { at: transition.at });
      }
    }, LONG_PRESS_MS);
    this._drag = drag;
  };

  private _onHandlePointerMove = (event: PointerEvent) => {
    const drag = this._drag;
    if (!drag || drag.kind !== 'handle') return;
    if (drag.longPressed) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;
    if (!drag.moved) {
      drag.moved = true;
      if (drag.longPressTimer !== null) {
        window.clearTimeout(drag.longPressTimer);
        drag.longPressTimer = null;
      }
    }

    const svgEl = this._svg();
    if (!svgEl) return;
    const rect = svgEl.getBoundingClientRect();

    const range = this._timeRangeFor(drag.origin.at);
    const newAtMins = clamp(this._clientToMinutes(event.clientX, rect), range.min, range.max);
    const newTemp = this._clientToTemp(event.clientY, rect);

    let low = drag.origin.low;
    let high = drag.origin.high;
    if (drag.handle === 'low') {
      low = clamp(newTemp, Y_AXIS_MIN, high - SNAP_TEMP_C);
    } else {
      high = clamp(newTemp, low + SNAP_TEMP_C, Y_AXIS_MAX);
    }

    this._preview = { at: formatTime(newAtMins), low, high };
  };

  private _onHandlePointerUp = (event: PointerEvent, transition: Transition) => {
    const drag = this._drag;
    if (!drag || drag.kind !== 'handle') return;
    const target = event.currentTarget as SVGElement;
    try {
      target.releasePointerCapture(event.pointerId);
    } catch {
      // jsdom may throw if capture was never set; safe to ignore.
    }
    if (drag.longPressTimer !== null) {
      window.clearTimeout(drag.longPressTimer);
      drag.longPressTimer = null;
    }
    const preview = this._preview;
    this._drag = null;
    this._preview = null;
    if (drag.longPressed) return;
    if (!drag.moved) {
      this._fire('transition-edit', { transition });
      return;
    }
    if (preview) {
      this._fire('transition-update', {
        oldAt: transition.at,
        transition: { at: preview.at, low: preview.low, high: preview.high },
      });
    }
  };

  /** pointercancel: tear down state silently. The browser fires this when
   *  the OS / scroll gesture takes over the touch — we must NOT interpret
   *  it as a tap (would open the edit dialog) or as a drag-release (would
   *  persist a partial-drag position). */
  private _onHandlePointerCancel = (event: PointerEvent) => {
    const drag = this._drag;
    if (!drag || drag.kind !== 'handle') return;
    const target = event.currentTarget as SVGElement;
    try {
      target.releasePointerCapture(event.pointerId);
    } catch {
      // jsdom may throw if capture was never set; safe to ignore.
    }
    if (drag.longPressTimer !== null) {
      window.clearTimeout(drag.longPressTimer);
      drag.longPressTimer = null;
    }
    this._drag = null;
    this._preview = null;
  };

  private _onBackgroundPointerDown = (event: PointerEvent) => {
    const svgEl = this._svg();
    if (!svgEl) return;
    svgEl.setPointerCapture(event.pointerId);
    const drag: EmptyDrag = {
      kind: 'empty',
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    this._drag = drag;
  };

  private _onBackgroundPointerMove = (event: PointerEvent) => {
    const drag = this._drag;
    if (!drag || drag.kind !== 'empty') return;
    if (drag.moved) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.hypot(dx, dy) >= DRAG_THRESHOLD_PX) drag.moved = true;
  };

  private _onBackgroundPointerUp = (event: PointerEvent) => {
    const drag = this._drag;
    if (!drag || drag.kind !== 'empty') {
      return;
    }
    const svgEl = this._svg();
    try {
      svgEl?.releasePointerCapture(event.pointerId);
    } catch {
      // jsdom may throw if capture was never set; safe to ignore.
    }
    const moved = drag.moved;
    const cancelled = event.type === 'pointercancel';
    this._drag = null;
    if (cancelled || moved || !svgEl) return;
    const rect = svgEl.getBoundingClientRect();
    const atMins = this._clientToMinutes(event.clientX, rect);
    // Don't fire if the tap lands on an existing transition's `at` snap-slot.
    for (const t of this.transitions) if (parseTime(t.at) === atMins) return;
    const tempCentre = this._clientToTemp(event.clientY, rect);
    const low = clamp(snapTemp(tempCentre - 1.5), Y_AXIS_MIN, Y_AXIS_MAX - SNAP_TEMP_C);
    const high = clamp(snapTemp(tempCentre + 1.5), low + SNAP_TEMP_C, Y_AXIS_MAX);
    this._fire('transition-add', { at: formatTime(atMins), low, high });
  };

  // ----- keyboard handlers -----

  private _onHandleKeyDown = (event: KeyboardEvent, transition: Transition, handle: Handle) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._fire('transition-edit', { transition });
      return;
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      this._fire('transition-delete', { at: transition.at });
      return;
    }
    let dAt = 0;
    let dTemp = 0;
    switch (event.key) {
      case 'ArrowLeft':
        dAt = -SNAP_MINUTES;
        break;
      case 'ArrowRight':
        dAt = SNAP_MINUTES;
        break;
      case 'ArrowUp':
        dTemp = SNAP_TEMP_C;
        break;
      case 'ArrowDown':
        dTemp = -SNAP_TEMP_C;
        break;
      default:
        return;
    }
    event.preventDefault();
    const range = this._timeRangeFor(transition.at);
    const newAtMins = clamp(parseTime(transition.at) + dAt, range.min, range.max);
    let low = transition.low;
    let high = transition.high;
    if (handle === 'low') {
      low = clamp(transition.low + dTemp, Y_AXIS_MIN, high - SNAP_TEMP_C);
    } else {
      high = clamp(transition.high + dTemp, low + SNAP_TEMP_C, Y_AXIS_MAX);
    }
    if (
      newAtMins === parseTime(transition.at) &&
      low === transition.low &&
      high === transition.high
    )
      return;
    this._fire('transition-update', {
      oldAt: transition.at,
      transition: { at: formatTime(newAtMins), low, high },
    });
  };

  private _onHandleFocus = (transition: Transition, handle: Handle) => {
    this._focusedAt = transition.at;
    this._focusedHandle = handle;
  };

  private _onHandleBlur = () => {
    this._focusedAt = null;
    this._focusedHandle = null;
  };

  // ----- render -----

  private _renderedTransitions(): Transition[] {
    // Sort numerically (parseTime) to match every other sort in the file, so a
    // mid-drag preview that swaps `at` values can't desync from the polyline
    // build order. (The render order would only diverge from lexicographic if
    // a transition's `at` wasn't zero-padded, but every caller in the card
    // produces zero-padded strings — defensive consistency.)
    const sorted = [...this.transitions].sort((a, b) => parseTime(a.at) - parseTime(b.at));
    if (!this._preview || !this._drag || this._drag.kind !== 'handle') return sorted;
    const drag = this._drag;
    return sorted.map((t) =>
      t.at === drag.origin.at
        ? { at: this._preview!.at, low: this._preview!.low, high: this._preview!.high }
        : t,
    );
  }

  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00. */
  private _stepPoints(transitions: Transition[], pick: 'low' | 'high'): Array<[number, number]> {
    const sorted = [...transitions].sort((a, b) => parseTime(a.at) - parseTime(b.at));
    const wrap = sorted[sorted.length - 1][pick];
    const pts: Array<[number, number]> = [[0, this._tempToY(wrap)]];
    let current = wrap;
    for (const t of sorted) {
      const x = this._timeToX(parseTime(t.at));
      pts.push([x, this._tempToY(current)]);
      pts.push([x, this._tempToY(t[pick])]);
      current = t[pick];
    }
    pts.push([VIEW_W, this._tempToY(current)]);
    return pts;
  }

  private _stepPath(transitions: Transition[], pick: 'low' | 'high'): string {
    if (transitions.length === 0) return '';
    const pts = this._stepPoints(transitions, pick);
    return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  }

  private _fillPath(transitions: Transition[]): string {
    if (transitions.length === 0) return '';
    const high = this._stepPoints(transitions, 'high');
    const low = this._stepPoints(transitions, 'low');
    const forward = high.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
    const back = low
      .slice()
      .reverse()
      .map(([x, y]) => `L ${x} ${y}`)
      .join(' ');
    return `${forward} ${back} Z`;
  }

  protected override render() {
    const rendered = this._renderedTransitions();
    const lowPath = this._stepPath(rendered, 'low');
    const highPath = this._stepPath(rendered, 'high');
    const fillPath = this._fillPath(rendered);

    return html`
      <div class="chart">
        <svg
          viewBox="0 0 ${VIEW_W} ${VIEW_H}"
          preserveAspectRatio="none"
          role="img"
          aria-label="Schedule chart: drag the circular handles to adjust each transition's time and band."
          @pointerdown=${this._onBackgroundPointerDown}
          @pointermove=${this._onBackgroundPointerMove}
          @pointerup=${this._onBackgroundPointerUp}
          @pointercancel=${this._onBackgroundPointerUp}
        >
          ${TEMP_TICKS.map(
            (t) =>
              svg`<line class="grid" x1="0" x2=${VIEW_W} y1=${this._tempToY(t)} y2=${this._tempToY(t)}></line>`,
          )}
          ${HOUR_TICKS.map(
            (h) =>
              svg`<line class="grid" y1="0" y2=${VIEW_H} x1=${(h / 24) * VIEW_W} x2=${(h / 24) * VIEW_W}></line>`,
          )}
          ${rendered.length > 0
            ? svg`
                <path class="fill" d=${fillPath}></path>
                <path class="line low" d=${lowPath}></path>
                <path class="line high" d=${highPath}></path>
              `
            : null}
          ${rendered.map((t) => {
            const x = this._timeToX(parseTime(t.at));
            const lowY = this._tempToY(t.low);
            const highY = this._tempToY(t.high);
            const focusedLow = this._focusedAt === t.at && this._focusedHandle === 'low';
            const focusedHigh = this._focusedAt === t.at && this._focusedHandle === 'high';
            const ariaLow = `Low handle at ${t.at}, ${t.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`;
            const ariaHigh = `High handle at ${t.at}, ${t.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`;
            return svg`
              <circle
                class=${`handle low${focusedLow ? ' focused' : ''}`}
                cx=${x}
                cy=${lowY}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${ariaLow}
                data-at=${t.at}
                data-handle="low"
                @pointerdown=${(e: PointerEvent) => this._onHandlePointerDown(e, t, 'low')}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${(e: PointerEvent) => this._onHandlePointerUp(e, t)}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(e: KeyboardEvent) => this._onHandleKeyDown(e, t, 'low')}
                @focus=${() => this._onHandleFocus(t, 'low')}
                @blur=${this._onHandleBlur}
              ></circle>
              <circle
                class=${`handle high${focusedHigh ? ' focused' : ''}`}
                cx=${x}
                cy=${highY}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${ariaHigh}
                data-at=${t.at}
                data-handle="high"
                @pointerdown=${(e: PointerEvent) => this._onHandlePointerDown(e, t, 'high')}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${(e: PointerEvent) => this._onHandlePointerUp(e, t)}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(e: KeyboardEvent) => this._onHandleKeyDown(e, t, 'high')}
                @focus=${() => this._onHandleFocus(t, 'high')}
                @blur=${this._onHandleBlur}
              ></circle>
            `;
          })}
        </svg>
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
        ${this.transitions.length === 0
          ? html`<div class="empty-hint">Tap the chart to add a transition.</div>`
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-schedule-chart': ComfortBandScheduleChart;
  }
}
