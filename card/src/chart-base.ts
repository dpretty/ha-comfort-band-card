/**
 * Base class for the History section's uPlot chart
 * (`<comfort-band-history-chart>`). v0.8.2 collapsed the two-chart
 * design into one. The base now has a single concrete consumer but
 * stays in its own file so the non-trivial lifecycle plumbing
 * (`_observeResize`, `_destroyPlot`, the `_fetchGen` stale-fetch
 * guard, the `_unsubscribe` handle + `SUBSCRIBE_PENDING` sentinel,
 * the `_resolveColor` canvas-axis helper) reads independently from
 * the chart's visual config. Deliberately narrow: no abstract
 * template methods, no contracts beyond "you own a uPlot instance
 * pointed at a `.chart-host` element."
 */

import { LitElement, css, unsafeCSS } from 'lit';
import { query, state } from 'lit/decorators.js';
import type uPlot from 'uplot';
import uplotCss from 'uplot/dist/uPlot.min.css?inline';
import { tokens } from './styles.js';
import type { UnsubscribeFunc } from './types.js';

/**
 * Shared styles for the history chart. Lit's `static styles` is
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
      /* color-scheme: light dark inherited from tokens. */
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
       up HA's dark/light tokens automatically. v0.9.1: use the cb-*
       tokens (which carry light-dark fallbacks) instead of the raw
       HA variables, so a chart in a top-layer dialog still renders
       readable when HA's tokens do not propagate. */
    .u-wrap {
      --u-fg: var(--cb-text-primary);
    }
    .u-axis,
    .u-legend {
      color: var(--cb-text-secondary);
    }
    .u-grid line {
      stroke: var(--cb-track-bg);
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

  /**
   * Resolve a CSS custom property to a literal colour string for handing to
   * uPlot. uPlot draws axes via the canvas API, which (unlike SVG/DOM) does
   * NOT parse `var(--*)` references — passing `'var(--secondary-text-color)'`
   * straight to uPlot leaves canvas text/lines at uPlot's default (~black),
   * invisible on HA's dark theme. Resolving once per `_buildOpts()` call lets
   * a theme change propagate automatically on the next history-stream event;
   * `getComputedStyle` is microseconds and stream events are infrequent, so
   * memoising would add staleness without buying us anything.
   */
  protected _resolveColor(varName: string, fallback: string): string {
    return getComputedStyle(this).getPropertyValue(varName).trim() || fallback;
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
