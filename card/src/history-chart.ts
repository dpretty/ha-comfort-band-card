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
 * Data comes from HA's `history/history_during_period` websocket command.
 * Fetched once on connect; `refresh()` is exposed for future auto-update.
 */

import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import uPlot from 'uplot';
import type { Options as UPlotOptions, AlignedData } from 'uplot';
import uplotCss from 'uplot/dist/uPlot.min.css?inline';
import { tokens } from './styles.js';
import type { HomeAssistant } from './types.js';

const HOURS_TO_SHOW = 24;

interface HistoryPoint {
  /** state */
  s: string;
  /** last_updated as unix seconds */
  lu: number;
}

type HistoryResponse = Record<string, HistoryPoint[]>;

interface ActionInterval {
  start: number; // unix seconds
  end: number;
  action: 'heating' | 'cooling';
}

@customElement('comfort-band-history-chart')
export class ComfortBandHistoryChart extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public roomEntity = '';
  @property({ type: String }) public lowEntity = '';
  @property({ type: String }) public highEntity = '';
  @property({ type: String }) public actionEntity = '';

  @state() private _loading = true;
  @state() private _error: string | null = null;
  @state() private _empty = false;

  @query('.chart-host') private _host?: HTMLElement;

  private _plot: uPlot | null = null;
  private _resizeObserver: ResizeObserver | null = null;
  private _hasFetched = false;
  /** Latest action intervals (kept on the instance so the uPlot draw
   *  hook can read them every frame without rebinding). */
  private _intervals: ActionInterval[] = [];

  public static override styles = [
    tokens,
    unsafeCSS(uplotCss),
    css`
      :host {
        display: block;
        width: 100%;
        color-scheme: light dark;
      }
      .chart-host {
        width: 100%;
        height: 260px;
      }
      .status {
        text-align: center;
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
      }
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: var(--cb-gap-md);
        justify-content: center;
        font-size: 12px;
        color: var(--cb-text-secondary);
        padding-top: var(--cb-gap-sm);
      }
      .legend .swatch {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 2px;
        vertical-align: middle;
        margin-right: 4px;
      }
      /* Theme uPlot grid + axes via its own CSS variables so they pick
         up HA's dark/light tokens automatically. */
      .u-wrap {
        --u-fg: var(--primary-text-color, #212121);
      }
      .u-axis,
      .u-legend {
        color: var(--secondary-text-color, #727272);
      }
      .u-grid line {
        stroke: var(--divider-color, #e0e0e0);
      }
    `,
  ];

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._destroyPlot();
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (!this._hasFetched) {
      this._hasFetched = true;
      void this._fetch();
      return;
    }
    // After the initial fetch, refetch only when the entity wiring
    // actually changes (avoids hammering the API on every `hass` tick).
    if (
      changed.has('roomEntity') ||
      changed.has('lowEntity') ||
      changed.has('highEntity') ||
      changed.has('actionEntity')
    ) {
      void this._fetch();
    }
  }

  private async _fetch(): Promise<void> {
    if (!this.hass || !this.roomEntity) return;
    this._loading = true;
    this._error = null;
    this._empty = false;

    const end = new Date();
    const start = new Date(end.getTime() - HOURS_TO_SHOW * 60 * 60 * 1000);
    const entityIds = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
      (e): e is string => Boolean(e),
    );

    try {
      const response = await this.hass.callWS<HistoryResponse>({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: entityIds,
        minimal_response: false,
        no_attributes: true,
      });
      this._renderPlot(response);
      this._loading = false;
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to load history.';
      this._loading = false;
      this._destroyPlot();
    }
  }

  /** Convert HA's `[{s, lu}, ...]` to a (sorted by time) numeric series.
   *  Skips entries whose state isn't a finite number. */
  private _numericSeries(points: HistoryPoint[] | undefined): Array<[number, number]> {
    if (!points) return [];
    const out: Array<[number, number]> = [];
    for (const p of points) {
      const n = parseFloat(p.s);
      if (Number.isFinite(n)) out.push([p.lu, n]);
    }
    out.sort((a, b) => a[0] - b[0]);
    return out;
  }

  /** Build aligned uPlot data: a single sorted x axis and forward-filled
   *  values for each numeric series. */
  private _alignSeries(series: Array<Array<[number, number]>>, nowSec: number): AlignedData {
    const xs = new Set<number>();
    for (const s of series) for (const [t] of s) xs.add(t);
    if (xs.size === 0) return [[nowSec], ...series.map(() => [null])] as unknown as AlignedData;
    const sortedX = [...xs].sort((a, b) => a - b);

    const values: Array<Array<number | null>> = series.map((s) => {
      let i = -1;
      let last: number | null = null;
      return sortedX.map((t) => {
        while (i + 1 < s.length && s[i + 1][0] <= t) {
          i++;
          last = s[i][1];
        }
        return last;
      });
    });

    return [sortedX, ...values] as AlignedData;
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
    const room = this._numericSeries(response[this.roomEntity]);
    const low = this._numericSeries(response[this.lowEntity]);
    const high = this._numericSeries(response[this.highEntity]);
    this._intervals = this._actionIntervals(response[this.actionEntity], nowSec);

    if (room.length === 0 && low.length === 0 && high.length === 0) {
      this._destroyPlot();
      this._empty = true;
      return;
    }
    this._empty = false;

    const data = this._alignSeries([room, low, high], nowSec);
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
      height: 260,
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

  private _observeResize(): void {
    if (!this._host || this._resizeObserver) return;
    this._resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (this._plot && width > 0) {
        this._plot.setSize({ width, height: 260 });
      }
    });
    this._resizeObserver.observe(this._host);
  }

  private _destroyPlot(): void {
    if (this._plot) {
      this._plot.destroy();
      this._plot = null;
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  protected override render() {
    if (!this.hass || !this.roomEntity) {
      return html`<div class="status">No room temperature sensor for this zone.</div>`;
    }
    return html`
      ${this._loading ? html`<div class="status">Loading 24 h history…</div>` : nothing}
      ${this._error ? html`<div class="status">${this._error}</div>` : nothing}
      ${this._empty
        ? html`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>`
        : nothing}
      <div class="chart-host"></div>
      <div class="legend">
        <span><span class="swatch" style="background:var(--primary-color)"></span>Room</span>
        <span
          ><span class="swatch" style="background:var(--cb-action-heating)"></span>Low band</span
        >
        <span
          ><span class="swatch" style="background:var(--cb-action-cooling)"></span>High band</span
        >
        <span
          ><span class="swatch" style="background:var(--cb-action-heating);opacity:0.18"></span>
          Heating</span
        >
        <span
          ><span class="swatch" style="background:var(--cb-action-cooling);opacity:0.18"></span>
          Cooling</span
        >
      </div>
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
