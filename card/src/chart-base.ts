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

import { LitElement, css, unsafeCSS } from 'lit';
import { query, state } from 'lit/decorators.js';
import type uPlot from 'uplot';
import uplotCss from 'uplot/dist/uPlot.min.css?inline';
import { tokens } from './styles.js';

/**
 * Shared styles for both Insights-tab charts. Lit's `static styles` is
 * inheritable: declaring this on the base class makes it available to
 * every subclass without each one having to re-import uPlot's CSS,
 * re-declare the `.status` / `.legend` / `.chart-host` rules, or repeat
 * the uPlot theme overrides. Subclasses add their own chart-specific
 * rules (e.g. the dashed legend swatch, the `.chart-host` height) on
 * top via `[...ComfortBandChartBase.styles, css\`...\`]`.
 */
const sharedChartStyles = [
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
    }
    /* Collapse the host while a status (loading/error/empty) is shown
       so the user doesn't see a blank gap above the message. */
    .chart-host.idle {
      height: 0;
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

export abstract class ComfortBandChartBase extends LitElement {
  public static override styles = sharedChartStyles;
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
    //
    // Note: this produces two render passes on reconnect — one from
    // this requestUpdate, then a second after `_fetch()` flips
    // `_loading = true`. Both are synchronous and pre-frame, so
    // there's no visible flicker; we accept the cost to keep the
    // base class lifecycle-only (calling `_fetch()` directly here
    // would require lifting `_fetch` onto the base, which would
    // re-couple subclass config back into the abstraction).
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
