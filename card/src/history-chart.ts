/**
 * `<comfort-band-history-chart>` — custom uPlot chart for the Insights tab.
 *
 * Replaces the v0.1 `history-graph` wrapper. Plots room temperature, the
 * effective low band, and the effective high band on shared axes; renders
 * `current_action` as translucent shaded bars BEHIND the lines (heating =
 * red, cooling = blue, idle = blank). That's the visual the v0.1 chart
 * couldn't deliver because HA's built-in history-graph auto-assigns
 * colours to enum sensors and doesn't expose state-level overrides.
 *
 * Data comes from HA's `history/stream` websocket subscription (v0.8.1).
 * The initial event carries the 24h window; subsequent events stream
 * incremental state changes as they arrive. `subscribeHistory` merges
 * deltas into a running snapshot and feeds the same shape `_renderPlot`
 * already accepted as a one-shot response — so the rendering path is
 * unchanged, only the data source differs.
 */

import { html, css, unsafeCSS, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uPlot from 'uplot';
import type { Options as UPlotOptions } from 'uplot';
import type { HomeAssistant } from './types.js';
import {
  HOURS_TO_SHOW,
  alignSeries,
  numericSeries,
  subscribeHistory,
  type HistoryPoint,
  type HistoryResponse,
} from './history-data.js';
import { ComfortBandChartBase, SUBSCRIBE_PENDING } from './chart-base.js';

interface ActionInterval {
  start: number; // unix seconds
  end: number;
  action: 'heating' | 'cooling';
}

/** Pixel height of the chart canvas. Single source of truth: read by
 *  the uPlot options, the ResizeObserver setSize call, AND the CSS
 *  `.chart-host` rule (interpolated via `unsafeCSS` below). */
const CHART_HEIGHT = 260;

@customElement('comfort-band-history-chart')
export class ComfortBandHistoryChart extends ComfortBandChartBase {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public roomEntity = '';
  @property({ type: String }) public lowEntity = '';
  @property({ type: String }) public highEntity = '';
  @property({ type: String }) public actionEntity = '';

  protected override get chartHeight(): number {
    return CHART_HEIGHT;
  }

  /** Latest action intervals (kept on the instance so the uPlot draw
   *  hook can read them every frame without rebinding). */
  private _intervals: ActionInterval[] = [];

  // Chart-specific rules only. Shared rules (status / legend / chart-host
  // base / uPlot theme overrides) come from `ComfortBandChartBase.styles`.
  public static override styles = [
    ...ComfortBandChartBase.styles,
    css`
      .chart-host {
        height: ${unsafeCSS(CHART_HEIGHT)}px;
      }
    `,
  ];

  protected override updated(changed: PropertyValues<this>): void {
    if (!this._unsubscribe) {
      void this._subscribe();
      return;
    }
    // After the initial subscribe, resubscribe only when the entity
    // wiring actually changes — every `hass` tick fires `updated()` but
    // the open subscription already streams live data, so re-subscribing
    // would just churn the stream.
    if (
      changed.has('roomEntity') ||
      changed.has('lowEntity') ||
      changed.has('highEntity') ||
      changed.has('actionEntity')
    ) {
      void this._subscribe();
    }
  }

  private async _subscribe(): Promise<void> {
    if (!this.hass || !this.roomEntity) return;

    // Tear down any existing subscription before opening a new one
    // (entity-wiring-change path). The base class handles teardown on
    // disconnect; this covers the resubscribe case.
    if (this._unsubscribe && this._unsubscribe !== SUBSCRIBE_PENDING) {
      this._unsubscribe();
    }
    // Claim the slot synchronously so a re-entrant `updated()` triggered
    // by the `_loading = true` state flip below doesn't see `null` and
    // fire another `_subscribe()` in parallel. Replaced with the real
    // unsub once the WS subscribe resolves.
    this._unsubscribe = SUBSCRIBE_PENDING;

    const gen = ++this._fetchGen;
    this._loading = true;
    this._error = null;
    this._empty = false;

    const entityIds = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
      (e): e is string => Boolean(e),
    );

    try {
      const unsub = await subscribeHistory(this.hass, entityIds, HOURS_TO_SHOW, (response) => {
        // Stale-generation guard: a later `_subscribe()` may have
        // started while events from this one are still arriving.
        if (gen !== this._fetchGen) return;
        this._renderPlot(response);
        this._loading = false;
      });
      // A newer subscribe may have started while this one was awaiting
      // the WS round-trip — drop this one's handle in favour of the
      // already-stored newer one.
      if (gen !== this._fetchGen) {
        unsub();
        return;
      }
      this._unsubscribe = unsub;
    } catch (err) {
      if (gen !== this._fetchGen) return;
      // Subscribe failed. KEEP `_unsubscribe = SUBSCRIBE_PENDING` so
      // `updated()`'s `!this._unsubscribe` early return doesn't re-fire
      // `_subscribe()` immediately on the next state-change tick (the
      // `_error = ...` flip below triggers exactly that). The user has
      // to change an entity prop (or reconnect the element) to trigger
      // a retry — both paths in `updated()` handle that without
      // depending on `_unsubscribe` being null.
      this._error = err instanceof Error ? err.message : 'Failed to load history.';
      this._loading = false;
      this._destroyPlot();
    }
  }

  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. */
  private _actionIntervals(points: HistoryPoint[] | undefined, nowSec: number): ActionInterval[] {
    if (!points) return [];
    const sorted = [...points].sort((a, b) => a.lu - b.lu);
    const out: ActionInterval[] = [];
    for (let i = 0; i < sorted.length; i++) {
      const start = sorted[i].lu;
      const end = sorted[i + 1]?.lu ?? nowSec;
      const action = sorted[i].s;
      if (action === 'heating' || action === 'cooling') {
        out.push({ start, end, action });
      }
    }
    return out;
  }

  private _renderPlot(response: HistoryResponse): void {
    if (!this._host) return;

    const nowSec = Math.floor(Date.now() / 1000);
    const room = numericSeries(response[this.roomEntity]);
    const low = numericSeries(response[this.lowEntity]);
    const high = numericSeries(response[this.highEntity]);
    this._intervals = this._actionIntervals(response[this.actionEntity], nowSec);

    if (room.length === 0 && low.length === 0 && high.length === 0) {
      this._destroyPlot();
      this._empty = true;
      return;
    }
    this._empty = false;

    const data = alignSeries([room, low, high], nowSec);
    const opts: UPlotOptions = this._buildOpts(this._host.clientWidth || 400);

    if (this._plot) {
      this._plot.setSize({ width: opts.width, height: opts.height });
      this._plot.setData(data);
      this._plot.redraw(false, true);
    } else {
      this._host.innerHTML = '';
      this._plot = new uPlot(opts, data, this._host);
      this._observeResize();
    }
  }

  private _buildOpts(width: number): UPlotOptions {
    const styles = getComputedStyle(this);
    const heatColor = styles.getPropertyValue('--cb-action-heating').trim() || '#d9603f';
    const coolColor = styles.getPropertyValue('--cb-action-cooling').trim() || '#2f7fcc';
    const roomColor = styles.getPropertyValue('--primary-color').trim() || '#03a9f4';

    return {
      width,
      height: CHART_HEIGHT,
      pxAlign: 1,
      cursor: { drag: { x: false, y: false }, points: { size: 6 } },
      legend: { show: false },
      scales: {
        x: { time: true },
      },
      axes: [
        {
          stroke: 'var(--secondary-text-color)',
          grid: { stroke: 'var(--divider-color)' },
        },
        {
          stroke: 'var(--secondary-text-color)',
          grid: { stroke: 'var(--divider-color)' },
          size: 38,
        },
      ],
      series: [
        {},
        {
          label: 'Room',
          stroke: roomColor,
          width: 2,
          spanGaps: true,
        },
        {
          label: 'Low',
          stroke: heatColor,
          width: 1.5,
          dash: [6, 3],
          spanGaps: true,
        },
        {
          label: 'High',
          stroke: coolColor,
          width: 1.5,
          dash: [6, 3],
          spanGaps: true,
        },
      ],
      hooks: {
        draw: [
          (u: uPlot): void => {
            const ctx = u.ctx;
            if (!ctx) return;
            const top = u.bbox.top;
            const height = u.bbox.height;
            ctx.save();
            for (const interval of this._intervals) {
              const x0 = u.valToPos(interval.start, 'x', true);
              const x1 = u.valToPos(interval.end, 'x', true);
              if (x1 <= x0) continue;
              ctx.fillStyle =
                interval.action === 'heating'
                  ? withAlpha(heatColor, 0.18)
                  : withAlpha(coolColor, 0.18);
              ctx.fillRect(x0, top, x1 - x0, height);
            }
            ctx.restore();
          },
        ],
      },
    };
  }

  protected override render() {
    if (!this.hass || !this.roomEntity) {
      return html`<div class="status">No room temperature sensor for this zone.</div>`;
    }
    // Collapse the canvas host while a status message is showing so the
    // user sees the message at the top of the panel instead of a blank
    // 260 px gap above it.
    const idle = this._loading || this._error !== null || this._empty;
    return html`
      ${this._loading ? html`<div class="status">Loading 24 h history…</div>` : nothing}
      ${this._error ? html`<div class="status">${this._error}</div>` : nothing}
      ${this._empty
        ? html`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>`
        : nothing}
      <div
        class="chart-host ${idle ? 'idle' : ''}"
        role="img"
        aria-label="Room temperature with effective band edges and heating/cooling shading — last 24 hours"
      ></div>
      ${idle
        ? nothing
        : html`<div class="legend">
            <span><span class="swatch" style="background:var(--primary-color)"></span>Room</span>
            <span
              ><span class="swatch" style="background:var(--cb-action-heating)"></span>Low
              band</span
            >
            <span
              ><span class="swatch" style="background:var(--cb-action-cooling)"></span>High
              band</span
            >
            <span
              ><span class="swatch" style="background:var(--cb-action-heating);opacity:0.18"></span>
              Heating</span
            >
            <span
              ><span class="swatch" style="background:var(--cb-action-cooling);opacity:0.18"></span>
              Cooling</span
            >
          </div>`}
    `;
  }
}

/** Convert any CSS colour (hex, rgb, var-resolved) to an `rgba(...)` with
 *  the given alpha. Falls back to the original colour if parsing fails. */
function withAlpha(color: string, alpha: number): string {
  const trimmed = color.trim();
  // Hex form
  const hexMatch = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(trimmed);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // rgb()/rgba()
  const rgbMatch = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(trimmed);
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`;
  }
  return trimmed;
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-history-chart': ComfortBandHistoryChart;
  }
}
