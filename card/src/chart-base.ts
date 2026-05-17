/**
 * Base class for the Insights tab's two uPlot charts
 * (`<comfort-band-history-chart>`, `<comfort-band-apparent-chart>`).
 *
 * Holds the lifecycle state and the two byte-identical methods that
 * both charts need (`_observeResize`, `_destroyPlot`), plus the
 * stale-fetch guard counter and the disconnect cleanup. Visual config
 * (`_buildOpts`, `_renderPlot`, `_fetch`, `render`) stays on each
 * subclass because the band chart and the apparent chart have genuinely
 * different axes, series, hooks, and data-fetch entity sets.
 *
 * Deliberately narrow: no abstract template methods, no contracts on
 * the subclass beyond "you own a uPlot instance pointed at a
 * `.chart-host` element." This is closer to a "mixin holding shared
 * fields" than to a polymorphic base class.
 */

import { LitElement } from 'lit';
import { query, state } from 'lit/decorators.js';
import type uPlot from 'uplot';

export abstract class ComfortBandChartBase extends LitElement {
  @state() protected _loading = true;
  @state() protected _error: string | null = null;
  @state() protected _empty = false;

  @query('.chart-host') protected _host?: HTMLElement;

  protected _plot: uPlot | null = null;
  protected _resizeObserver: ResizeObserver | null = null;
  protected _hasFetched = false;
  /** Monotonic counter — every `_fetch()` claims the next value, and
   *  drops its response if a newer fetch has started in the meantime.
   *  Prevents a stale response from overwriting a more-recent one when
   *  entity props change mid-flight. */
  protected _fetchGen = 0;

  /** Pixel height of the chart canvas. Subclasses override. */
  protected abstract get chartHeight(): number;

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._destroyPlot();
    // Reset the fetch latch so the chart refetches when re-attached
    // (e.g. user switches away from Insights and back). Without this,
    // `updated()` skips the fetch on reconnect since none of the
    // entity props changed, and the host stays blank.
    this._hasFetched = false;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    // Lit auto-schedules an update on the FIRST connect, but not on
    // subsequent reconnects (per Lit's lifecycle docs). Request one
    // explicitly so `updated()` runs and the cleared `_hasFetched`
    // flag triggers a refetch.
    if (this.hasUpdated) {
      this.requestUpdate();
    }
  }

  protected _observeResize(): void {
    if (!this._host || this._resizeObserver) return;
    const height = this.chartHeight;
    this._resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (this._plot && width > 0) {
        this._plot.setSize({ width, height });
      }
    });
    this._resizeObserver.observe(this._host);
  }

  protected _destroyPlot(): void {
    if (this._plot) {
      this._plot.destroy();
      this._plot = null;
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }
}
