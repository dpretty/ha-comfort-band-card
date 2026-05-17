/**
 * `<comfort-band-apparent-chart>` — sibling of `<comfort-band-history-chart>`
 * for the Insights tab. Plots room temperature vs apparent ("feels like")
 * temperature on a left °C axis, with relative humidity overlaid on a
 * right % axis. Lets users see when apparent diverges from raw room and
 * correlate it with humidity swings.
 *
 * Rendered conditionally by the Insights tab: only when the zone has
 * a humidity sensor configured. Without one, apparent equals room by
 * definition and the chart is uninformative.
 *
 * Shares the data-fetch + series-alignment helpers with the band chart
 * via `./history-data.js`. Each chart owns its own uPlot config — the
 * dual y-axis here has nothing in common with the band chart's
 * action-shading + single-axis setup, so a `mode` discriminator on the
 * existing component would just fork every helper.
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
  fetchHistory,
  numericSeries,
  type HistoryResponse,
} from './history-data.js';
import { ComfortBandChartBase } from './chart-base.js';

/** Pixel height of the chart canvas. Single source of truth: read by
 *  the uPlot options, the ResizeObserver setSize call, AND the CSS
 *  `.chart-host` rule (interpolated via `unsafeCSS` below). */
const CHART_HEIGHT = 220;

@customElement('comfort-band-apparent-chart')
export class ComfortBandApparentChart extends ComfortBandChartBase {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public roomEntity = '';
  @property({ type: String }) public apparentEntity = '';
  @property({ type: String }) public humidityEntity = '';

  protected override get chartHeight(): number {
    return CHART_HEIGHT;
  }

  // Chart-specific rules only. Shared rules (status / legend / chart-host
  // base / uPlot theme overrides) come from `ComfortBandChartBase.styles`.
  public static override styles = [
    ...ComfortBandChartBase.styles,
    css`
      :host {
        /* Sit beneath the band chart with a visible gap. */
        margin-top: var(--cb-gap-lg);
      }
      .chart-host {
        height: ${unsafeCSS(CHART_HEIGHT)}px;
      }
      /* "Dashed" swatch to mirror the dashed apparent stroke in the chart. */
      .legend .swatch.dashed {
        background-image: repeating-linear-gradient(
          90deg,
          currentColor 0,
          currentColor 4px,
          transparent 4px,
          transparent 7px
        );
        background-color: transparent;
      }
    `,
  ];

  protected override updated(changed: PropertyValues<this>): void {
    if (!this._hasFetched) {
      this._hasFetched = true;
      void this._fetch();
      return;
    }
    if (
      changed.has('roomEntity') ||
      changed.has('apparentEntity') ||
      changed.has('humidityEntity')
    ) {
      void this._fetch();
    }
  }

  private async _fetch(): Promise<void> {
    // Strict guard: all three entities are required for the comparison
    // chart to make sense. Insights tab gates rendering on the same
    // condition (see `_renderApparentSection`), so an empty value here
    // means the parent disagreed with itself — fail closed rather than
    // issuing a partial WS query with empty strings.
    if (!this.hass || !this.roomEntity || !this.apparentEntity || !this.humidityEntity) return;
    const gen = ++this._fetchGen;
    this._loading = true;
    this._error = null;
    this._empty = false;

    const entityIds = [this.roomEntity, this.apparentEntity, this.humidityEntity];

    try {
      const response = await fetchHistory(this.hass, entityIds, HOURS_TO_SHOW);
      if (gen !== this._fetchGen) return;
      this._renderPlot(response);
      this._loading = false;
    } catch (err) {
      if (gen !== this._fetchGen) return;
      this._error = err instanceof Error ? err.message : 'Failed to load history.';
      this._loading = false;
      this._destroyPlot();
    }
  }

  private _renderPlot(response: HistoryResponse): void {
    if (!this._host) return;

    const nowSec = Math.floor(Date.now() / 1000);
    const room = numericSeries(response[this.roomEntity]);
    const apparent = numericSeries(response[this.apparentEntity]);
    const humidity = numericSeries(response[this.humidityEntity]);

    if (room.length === 0 && apparent.length === 0 && humidity.length === 0) {
      this._destroyPlot();
      this._empty = true;
      return;
    }
    this._empty = false;

    const data = alignSeries([room, apparent, humidity], nowSec);
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
    const roomColor = styles.getPropertyValue('--primary-color').trim() || '#03a9f4';
    const apparentColor = styles.getPropertyValue('--cb-action-heating').trim() || '#d9603f';
    const humidityColor = styles.getPropertyValue('--secondary-text-color').trim() || '#727272';

    return {
      width,
      height: CHART_HEIGHT,
      pxAlign: 1,
      cursor: { drag: { x: false, y: false }, points: { size: 6 } },
      legend: { show: false },
      scales: {
        x: { time: true },
        y: { auto: true },
        // Pin humidity to 0-100 so a 35-45 % working band doesn't
        // auto-zoom into looking like wild swings; users want the
        // absolute scale here.
        y2: { auto: false, range: [0, 100] },
      },
      axes: [
        {
          stroke: 'var(--secondary-text-color)',
          grid: { stroke: 'var(--divider-color)' },
        },
        {
          scale: 'y',
          side: 3,
          size: 38,
          stroke: 'var(--secondary-text-color)',
          grid: { stroke: 'var(--divider-color)' },
          values: (_u: uPlot, vs: number[]) => vs.map((v) => `${v.toFixed(1)}°`),
        },
        {
          scale: 'y2',
          side: 1,
          size: 38,
          stroke: 'var(--secondary-text-color)',
          // Hide the secondary grid to avoid two overlapping grid sets.
          grid: { show: false },
          values: (_u: uPlot, vs: number[]) => vs.map((v) => `${v.toFixed(0)}%`),
        },
      ],
      series: [
        {},
        {
          label: 'Room',
          scale: 'y',
          stroke: roomColor,
          width: 2,
          spanGaps: true,
        },
        {
          label: 'Apparent',
          scale: 'y',
          stroke: apparentColor,
          width: 2,
          dash: [4, 3],
          spanGaps: true,
        },
        {
          label: 'Humidity',
          scale: 'y2',
          stroke: humidityColor,
          width: 1.2,
          spanGaps: true,
        },
      ],
    };
  }

  protected override render() {
    if (!this.hass || !this.roomEntity || !this.apparentEntity || !this.humidityEntity) {
      return html`<div class="status">Apparent-temperature comparison unavailable.</div>`;
    }
    // Collapse the canvas host while a status message is showing so
    // the user sees the message at the top of the panel instead of a
    // blank 220 px gap above it.
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
        aria-label="Room vs apparent temperature with humidity overlay — last 24 hours"
      ></div>
      ${idle
        ? nothing
        : html`<div class="legend">
            <span
              ><span class="swatch" style="background:var(--primary-color)"></span>Room (°C)</span
            >
            <span
              ><span class="swatch dashed" style="color:var(--cb-action-heating)"></span>Apparent
              (°C)</span
            >
            <span
              ><span class="swatch" style="background:var(--secondary-text-color)"></span>Humidity
              (%, right axis)</span
            >
          </div>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-apparent-chart': ComfortBandApparentChart;
  }
}
