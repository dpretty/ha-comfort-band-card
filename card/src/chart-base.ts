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
import type { UnsubscribeFunc } from './types.js';

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

/**
 * Sentinel `_unsubscribe` value claimed synchronously by `_subscribe()`
 * before its first `await`. A re-entrant `updated()` triggered while
 * `_subscribe()` is awaiting (typically from the `_loading = true`
 * `@state` flip the subclass does before the await) sees the slot is
 * claimed and skips the re-entrant subscribe — preventing parallel
 * subscriptions and a Lit reactivity loop.
 *
 * Called as a no-op `unsubscribe` if disconnect happens during the await:
 * it satisfies the `UnsubscribeFunc` contract, the in-flight subscribe's
 * `_fetchGen` stale-guard drops its eventual resolution, and the real
 * unsub (created by HA) is held by the local `unsub` variable in
 * `_subscribe()` and called there if needed.
 */
export const SUBSCRIBE_PENDING: UnsubscribeFunc = () => {};

export abstract class ComfortBandChartBase extends LitElement {
  public static override styles = sharedChartStyles;
  @state() protected _loading = true;
  @state() protected _error: string | null = null;
  @state() protected _empty = false;

  @query('.chart-host') protected _host?: HTMLElement;

  protected _plot: uPlot | null = null;
  protected _resizeObserver: ResizeObserver | null = null;
  /** Active subscription handle from `subscribeHistory`. `null` when no
   *  subscription is open (initial state and after disconnect). Subclasses
   *  open the subscription in their `updated()` and store the handle here;
   *  the base class tears it down in `disconnectedCallback`. Replaces the
   *  v0.8.0 `_hasFetched` flag — "are we subscribed?" subsumes "have we
   *  fetched?" and removes one piece of state.
   *
   *  Set synchronously to `SUBSCRIBE_PENDING` before the `await` that
   *  opens the real subscription, so a re-entrant `updated()` (triggered
   *  by `_loading = true` flipping inside `_subscribe()`) sees the slot
   *  is claimed and doesn't fire another `_subscribe()` in parallel.
   *  Replaced with the real handle once the await resolves. */
  protected _unsubscribe: UnsubscribeFunc | null = null;
  /** Monotonic counter — every `_subscribe()` claims the next value, and
   *  drops events (initial + deltas) tagged with an older generation.
   *  Prevents a stale event from a torn-down subscription from overwriting
   *  fresh data from a newer one when entity props change mid-flight. */
  protected _fetchGen = 0;

  /** Pixel height of the chart canvas. Subclasses override. */
  protected abstract get chartHeight(): number;

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._destroyPlot();
    // Close the live history subscription so HA stops streaming events
    // to a detached element (memory leak + wasted bandwidth). The next
    // reconnect opens a fresh subscription via `connectedCallback` →
    // `updated()` → subclass `_subscribe()`.
    //
    // SUBSCRIBE_PENDING (sentinel) is a no-op when called; matching its
    // semantics — it claimed the slot but hasn't completed the WS round-
    // trip yet. Resetting to null lets the reconnect path fire a fresh
    // _subscribe(). Bumping `_fetchGen` here is what tears down the
    // leaked-otherwise in-flight subscribe: when it eventually resolves
    // with a real `unsub`, its closure-captured `gen` no longer matches
    // `_fetchGen`, so it hits the gen-mismatch branch and calls `unsub()`
    // itself. Without the bump, the resolution path stores `unsub` on
    // a dead element and HA keeps streaming forever.
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    this._fetchGen++;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    // Lit auto-schedules an update on the FIRST connect, but not on
    // subsequent reconnects (per Lit's lifecycle docs). Request one
    // explicitly so `updated()` runs — the cleared `_unsubscribe` field
    // triggers a fresh subscribe.
    //
    // Two render passes on reconnect — one from this requestUpdate,
    // one after `_subscribe()` flips `_loading = true`. Both are
    // synchronous and pre-frame, so there's no visible flicker. We
    // accept the cost to keep the base class lifecycle-only (calling
    // `_subscribe()` directly here would require lifting it onto the
    // base, which would re-couple subclass config back into the
    // abstraction).
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
