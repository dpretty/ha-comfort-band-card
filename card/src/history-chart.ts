/**
 * `<comfort-band-history-chart>` — the History section's single chart.
 *
 * Always renders: room temperature, the effective low + high band edges
 * (as linear lines so v0.10.0's band-ramp smoothing displays as the
 * smooth curve it actually is — between transitions the values are
 * constant so linear and stepped render the same flat line; only at
 * a v0.9.x-style instant transition does linear show a tiny diagonal
 * over one sample interval instead of a vertical step, which is a fair
 * visual trade for accurate ramp rendering on v0.10.0 zones), and
 * `current_action` as a strip under the plot (heating, cooling; idle
 * blank).
 *
 * Conditionally renders (when the entity props are set):
 *   - apparent temperature (dashed, in the room colour — visual cue
 *     that it's a derived version of room rather than an independent
 *     reading)
 *   - relative humidity (thin solid on a right-side `y2` axis pinned
 *     to 0-100 %, so a working 35-45 % band doesn't auto-zoom into
 *     looking like wild swings)
 *
 * v0.8.2 merges the v0.8.0-era `<comfort-band-apparent-chart>` into
 * this one component — the side-by-side stacking made it hard to see
 * whether apparent crossed a band while raw stayed inside. One chart with all
 * lines overlaid is the only way to read that off the screen.
 *
 * Data comes from HA's `history/stream` websocket subscription (v0.8.1).
 * The initial event carries the window; subsequent events stream
 * incremental state changes as they arrive. `subscribeHistory` merges
 * deltas into a running snapshot; the renderer is unchanged across the
 * initial dump and the live tail.
 *
 * #34: the last 6 h, 24 h (the default) or 7 d, picked above the chart;
 * a readout line over the plot with the time and each value where the
 * pointer (or a tap) is, the latest otherwise; heating and cooling as a
 * strip under the plot, in their colours mixed towards the text so they
 * stand out in either theme, not faint shading across it; the time axis
 * in HA's 12/24-hour setting, and the value axes as wide as their labels.
 */

import { html, css, unsafeCSS, nothing } from 'lit';
import type { PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import uPlot from 'uplot';
import type { AlignedData, Options as UPlotOptions } from 'uplot';
import type { HomeAssistant } from './types.js';
import { bandText, degrees, formatTime } from './now-status.js';
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

/** The ranges offered (#34); 24 hours to start with. */
export const RANGES = [
  { hours: 6, label: '6 h', words: '6 hours' },
  { hours: 24, label: '24 h', words: '24 hours' },
  { hours: 168, label: '7 d', words: '7 days' },
] as const;

/** The heating/cooling strip under the plot (#34): its height, and the
 *  room above it (from the plot) and below it (to the time labels), in
 *  CSS pixels. */
const STRIP = 6;
const STRIP_GAP = 3;

/** Count of always-present series: room, low, high. Named so
 *  `expectedSeriesCount` reads intentionally; if a future series is
 *  promoted to always-present, the count update is one place. */
const BASE_SERIES_COUNT = 3;

@customElement('comfort-band-history-chart')
export class ComfortBandHistoryChart extends ComfortBandChartBase {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public roomEntity = '';
  @property({ type: String }) public lowEntity = '';
  @property({ type: String }) public highEntity = '';
  @property({ type: String }) public actionEntity = '';
  /** Optional. When set, an apparent-temperature series is overlaid on
   *  the room axis (dashed, room colour). Empty disables the overlay. */
  @property({ type: String }) public apparentEntity = '';
  /** Optional. When set, a humidity series is overlaid on a right-side
   *  y2 axis (0-100 %, grey). Empty disables the overlay AND skips the
   *  y2 axis entirely so the chart stays single-axis. */
  @property({ type: String }) public humidityEntity = '';

  protected override get chartHeight(): number {
    return CHART_HEIGHT;
  }

  /** Latest action intervals (kept on the instance so the uPlot draw
   *  hook can read them every frame without rebinding). */
  private _intervals: ActionInterval[] = [];
  /** The data last plotted, for the readout (#34). */
  private _data: AlignedData | null = null;
  /** The strip's colours, as last drawn, for the legend's swatches. */
  private _stripColors = { heating: '', cooling: '' };

  /** How many hours back the chart shows (#34). */
  @state() private _hours: number = HOURS_TO_SHOW;
  /** A range picked while a chart is drawn: it stays until the new
   *  range's history arrives, the readout saying it's loading. Not for a
   *  change of entities (another room): that shows the loading message,
   *  as on main. */
  @state() private _switching = false;
  /** The data point the pointer (or a tap) is on, from uPlot's cursor;
   *  null for none, when the readout gives the latest. */
  @state() private _cursorIdx: number | null = null;

  /** Overlay-presence getters used by `_renderPlot`, `_buildOpts`, and
   *  `render`. Single source of truth so the three branches can't
   *  silently diverge (e.g. if `apparentEntity` is renamed). */
  private get _hasApparent(): boolean {
    return Boolean(this.apparentEntity);
  }
  private get _hasHumidity(): boolean {
    return Boolean(this.humidityEntity);
  }

  /** Labels (e.g. "Room", "Apparent") the user has clicked to hide in
   *  the legend. v0.8.3 added per-series toggles so a busy chart can
   *  be focused on a subset of lines without losing the rest of the
   *  context (band edges + the action strip stay visible by default).
   *
   *  In-session only — re-mounting the chart (zone switch, dialog
   *  close-and-reopen, HA restart) returns all series to visible.
   *  Persistence is a v0.8.x+ follow-up if it proves useful.
   *
   *  Lit dirty-checks by reference, so toggling reassigns to a fresh
   *  Set rather than mutating in place. */
  @state() private _hiddenLabels = new Set<string>();

  // Chart-specific rules only. Shared rules (status / legend / chart-host
  // base / uPlot theme overrides) come from `ComfortBandChartBase.styles`.
  public static override styles = [
    ...ComfortBandChartBase.styles,
    css`
      .chart-host {
        height: ${unsafeCSS(CHART_HEIGHT)}px;
      }
      .ranges {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-xs);
      }
      .ranges button {
        font: inherit;
        font-size: 12px;
        min-height: 44px;
        padding: 0 12px;
        border-radius: 16px;
        border: 1px solid var(--cb-track-bg);
        background: transparent;
        color: var(--cb-text-secondary);
        cursor: pointer;
      }
      .ranges button[aria-pressed='true'] {
        background: var(--cb-track-bg);
        border-color: var(--cb-text-secondary);
        color: var(--cb-text-primary);
        font-weight: 500;
      }
      .ranges button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      /* Two lines' height whatever its words take, so the chart under it
         doesn't move as the pointer does (#34). */
      .readout {
        font-size: 12px;
        line-height: 1.35;
        min-height: 2.7em;
        padding: var(--cb-gap-xs) 0;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
      }
      /* "Dashed" swatch mirrors the dashed apparent stroke in the chart.
         Picks up the legend item's inline color (set to roomColor) via
         currentColor — no per-instance CSS variable plumbing needed. */
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
      /* v0.8.3: clickable legend toggles. Pointer cursor signals
         interactivity; no underline on hover (the legend isn't a
         link). Hidden state dims the whole item and strikes the
         label so it's obvious which series the user has muted. */
      .legend .toggle {
        cursor: pointer;
        user-select: none;
        transition: opacity 120ms ease;
      }
      .legend .toggle:hover {
        opacity: 0.85;
      }
      .legend .toggle.hidden {
        opacity: 0.4;
        text-decoration: line-through;
      }
      .legend .toggle:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        border-radius: 2px;
      }
    `,
  ];

  protected override updated(changed: PropertyValues<this>): void {
    if (!this._unsubscribe) {
      void this._subscribe();
      return;
    }
    // After the initial subscribe, resubscribe only when the entity
    // wiring or the range (#34) changes — every `hass` tick fires
    // `updated()` but the open subscription already streams live data, so
    // re-subscribing would just churn the stream.
    if (
      changed.has('roomEntity') ||
      changed.has('lowEntity') ||
      changed.has('highEntity') ||
      changed.has('actionEntity') ||
      changed.has('apparentEntity') ||
      changed.has('humidityEntity') ||
      (changed as Map<PropertyKey, unknown>).has('_hours')
    ) {
      // Only a range pick keeps the chart drawn while loading: a change of
      // entities after one, before it loaded, is another room's (#34 review).
      if (!(changed as Map<PropertyKey, unknown>).has('_hours')) this._switching = false;
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

    // If the plot was built for a different series count (e.g. the
    // parent toggled `apparentEntity` or `humidityEntity` while the
    // chart was mounted — happens on zone switch), the existing uPlot
    // instance can't accept the new data: `setData` requires the
    // data-array count to match the configured series count exactly,
    // or it silently mis-aligns / throws. Tear down so the next
    // `_renderPlot` takes the construction branch and rebuilds the
    // config from scratch. `+1` accounts for uPlot's mandatory x-axis
    // pseudo-series at index 0.
    const expectedSeriesCount =
      BASE_SERIES_COUNT + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
    if (this._plot && this._plot.series.length !== 1 + expectedSeriesCount) {
      this._destroyPlot();
    }

    const gen = ++this._fetchGen;
    // Another range picked with a chart drawn: it stays until the new
    // history arrives. With none to keep (the first load, an error, no
    // history, or back on the page), the loading message.
    if (!this._plot) this._switching = false;
    if (!this._switching) this._loading = true;
    this._error = null;
    this._empty = false;

    const entityIds = [
      this.roomEntity,
      this.lowEntity,
      this.highEntity,
      this.actionEntity,
      this.apparentEntity,
      this.humidityEntity,
    ].filter((e): e is string => Boolean(e));
    // The pointer's point belongs to the data being replaced.
    this._cursorIdx = null;

    try {
      const unsub = await subscribeHistory(this.hass, entityIds, this._hours, (response) => {
        // Stale-generation guard: a later `_subscribe()` may have
        // started while events from this one are still arriving.
        if (gen !== this._fetchGen) return;
        this._renderPlot(response);
        this._loading = false;
        this._switching = false;
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
      this._data = null;
      this._destroyPlot();
    }
  }

  /** Map a legend label to its uPlot series index. Returns -1 when the
   *  label isn't currently in the chart (e.g. "Apparent" with no
   *  apparent entity wired). Indices must agree with the series order
   *  in `_buildOpts` AND the data order in `_renderPlot`'s
   *  `seriesData` — a refactor adding a new series must update all
   *  three locations. uPlot's mandatory x-axis pseudo-series sits at
   *  index 0, hence the off-by-one for Room.
   */
  private _seriesIndexForLabel(label: string): number {
    switch (label) {
      case 'Room':
        return 1;
      case 'Low band':
        return 2;
      case 'High band':
        return 3;
      case 'Apparent':
        return this._hasApparent ? 4 : -1;
      case 'Humidity':
        if (!this._hasHumidity) return -1;
        return this._hasApparent ? 5 : 4;
      default:
        return -1;
    }
  }

  /** Click handler for legend toggles. Flips the label's hidden state,
   *  pokes uPlot directly via `setSeries` so the change is immediate
   *  (no waiting for the next refresh), and Lit re-renders the legend
   *  to reflect the new state.
   *
   *  The `setSeries` call is a no-op when the chart hasn't constructed
   *  uPlot yet (loading / empty state) — the next `_buildOpts` call
   *  will honour the hidden set via the `show:` field on each toggleable
   *  series, so the state stays consistent across plot re-creations.
   */
  private _toggleLabel(label: string): void {
    const idx = this._seriesIndexForLabel(label);
    if (idx < 0) return;
    const next = new Set(this._hiddenLabels);
    const wasHidden = next.has(label);
    if (wasHidden) {
      next.delete(label);
    } else {
      next.add(label);
    }
    this._hiddenLabels = next;
    if (this._plot) {
      // `show: wasHidden` is the post-toggle state: if it WAS hidden,
      // un-hide; if it was visible, hide. The variable name reads
      // backwards at a glance — keep the inversion in mind when
      // skimming this line.
      this._plot.setSeries(idx, { show: wasHidden });
    }
  }

  /** Keyboard equivalent of click — Enter or Space activates the toggle.
   *  Matches WAI-ARIA "button" pattern for keyboard accessibility. */
  private _onLabelKeyDown(event: KeyboardEvent, label: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._toggleLabel(label);
    }
  }

  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. A run of
   *  the same action reported again is one interval (#34: drawn as one).
   *  The one in force now runs on (its end Infinity): the readout's "Now"
   *  is in it, and the strip draws it to the plot's edge. */
  private _actionIntervals(points: HistoryPoint[] | undefined): ActionInterval[] {
    if (!points) return [];
    const sorted = [...points].sort((a, b) => a.lu - b.lu);
    const out: ActionInterval[] = [];
    for (let i = 0; i < sorted.length; i++) {
      const start = sorted[i].lu;
      const end = sorted[i + 1]?.lu ?? Infinity;
      const action = sorted[i].s;
      if (action === 'heating' || action === 'cooling') {
        const last = out[out.length - 1];
        if (last && last.action === action && last.end === start) last.end = end;
        else out.push({ start, end, action });
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
    // Apparent + humidity only when the parent passed the entity prop —
    // otherwise we return `[]` for the data and skip the series + axis
    // in `_buildOpts`, so the chart degrades to the v0.8.1 four-series
    // shape for zones without a humidity sensor.
    const apparent = this._hasApparent ? numericSeries(response[this.apparentEntity]) : [];
    const humidity = this._hasHumidity ? numericSeries(response[this.humidityEntity]) : [];
    this._intervals = this._actionIntervals(response[this.actionEntity]);

    // Empty-state: nothing to plot AND no action intervals to draw.
    // The action strip is informative on its own (heating/cooling events
    // are visible even if temperature history is missing), so a zone
    // with action data but empty series shouldn't drop into the empty
    // state. Pre-v0.8.2 the conjunction omitted action; the merge is
    // the natural moment to fix that.
    if (
      room.length === 0 &&
      low.length === 0 &&
      high.length === 0 &&
      apparent.length === 0 &&
      humidity.length === 0 &&
      this._intervals.length === 0
    ) {
      this._destroyPlot();
      this._data = null;
      this._empty = true;
      return;
    }
    this._empty = false;

    // Series order MUST match `_buildOpts` series array order: room, low,
    // high, apparent?, humidity?. Conditional pushes keep uPlot's series
    // count and data length in sync — passing 5 data slots when only 3
    // series are declared would mis-align labels and scales.
    const seriesData: Array<Array<[number, number]>> = [room, low, high];
    if (this._hasApparent) seriesData.push(apparent);
    if (this._hasHumidity) seriesData.push(humidity);
    // The time axis also takes in each heating/cooling change, so the
    // pointer can rest on one (a short cycle between two readings), and
    // now, so the chart runs to now and its last point is now's (#34
    // review). They're aligned as one more series, then dropped.
    const marks: Array<[number, number]> = [
      ...this._intervals.flatMap((i) => [i.start, i.end]).filter((t) => Number.isFinite(t)),
      nowSec,
    ].map((t) => [t, 0]);
    const aligned = alignSeries([...seriesData, marks], nowSec);
    const data = aligned.slice(0, -1) as unknown as AlignedData;
    this._data = data;
    // The readout reads `_data`: a live update must redraw it too.
    this.requestUpdate();
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
    const heatColor = this._resolveColor('--cb-action-heating', '#d9603f');
    const coolColor = this._resolveColor('--cb-action-cooling', '#2f7fcc');
    const roomColor = this._resolveColor('--primary-color', '#03a9f4');
    // Axes are canvas-drawn so the `var(--*)` strings can't be passed
    // through to uPlot directly — v0.8.1 did, and rendered axis text in
    // uPlot's default black (invisible on HA's dark theme). Resolve
    // once here and reuse for the axis stroke AND the humidity series
    // stroke (both intentionally share the secondary-text token).
    // `_resolveColor` uses `getComputedStyle().getPropertyValue()` which
    // returns the var's substituted string verbatim. Reading from the
    // cb-* tokens would produce the literal "light-dark(...)" text when
    // HA's tokens are unset — canvas can't parse that. Read from the
    // raw HA tokens (which resolve to plain color strings) and supply
    // a hex fallback for the unset case.
    const secondaryText = this._resolveColor('--secondary-text-color', '#727272');
    const gridStroke = this._resolveColor('--divider-color', '#e0e0e0');
    // The strip's colours: the action's, 30% of the way to the text's, as
    // the band gauge's (#22), so they stand out from the card in either
    // theme (#34). Kept for the legend's swatches.
    const primaryText = this._resolveColor('--primary-text-color', '#212121');
    this._stripColors = {
      heating: mixColor(heatColor, primaryText, 0.3),
      cooling: mixColor(coolColor, primaryText, 0.3),
    };

    // Build the series array conditionally so the slot count stays in
    // lockstep with `_renderPlot`'s data array. Apparent uses the room
    // colour (dashed) to signal "this is a derived version of room" —
    // the v0.8.0 apparent-chart used heat-red here, which clashed with
    // the low-band's heat-red dash once both lived in the same plot.
    // `show` reflects the legend toggles tracked in `_hiddenLabels`
    // (v0.8.3+). The runtime click handler also pokes uPlot via
    // setSeries for immediate effect; this initialisation matters when
    // the plot is (re-)created — e.g. zone switch, theme change forcing
    // a destroy + rebuild — so the new instance starts in the right
    // visibility state. The label strings here must agree with the
    // ones in `_seriesIndexForLabel` and `_renderLegend`.
    const series: UPlotOptions['series'] = [
      {},
      {
        label: 'Room',
        stroke: roomColor,
        width: 2,
        spanGaps: true,
        show: !this._hiddenLabels.has('Room'),
      },
      {
        label: 'Low band',
        stroke: heatColor,
        width: 1.5,
        dash: [6, 3],
        spanGaps: true,
        show: !this._hiddenLabels.has('Low band'),
      },
      {
        label: 'High band',
        stroke: coolColor,
        width: 1.5,
        dash: [6, 3],
        spanGaps: true,
        show: !this._hiddenLabels.has('High band'),
      },
    ];
    if (this._hasApparent) {
      series.push({
        label: 'Apparent',
        stroke: roomColor,
        width: 1.5,
        dash: [4, 3],
        spanGaps: true,
        show: !this._hiddenLabels.has('Apparent'),
      });
    }
    if (this._hasHumidity) {
      series.push({
        label: 'Humidity',
        scale: 'y2',
        stroke: secondaryText,
        width: 1.2,
        spanGaps: true,
        show: !this._hiddenLabels.has('Humidity'),
      });
    }

    // Axes mirror the series shape. The right-side humidity axis (y2)
    // only appears when humidity is wired — empty axes are visual
    // noise. `grid: { show: false }` on y2 avoids two overlapping grid
    // sets when both axes have a grid.
    // The time axis in HA's 12/24-hour setting, with room under the plot
    // for the heating/cooling strip (no tick marks there); the value axes
    // as wide as their labels (#34).
    const axes: NonNullable<UPlotOptions['axes']> = [
      {
        stroke: secondaryText,
        grid: { stroke: gridStroke },
        ticks: { show: false },
        gap: STRIP_GAP * 2 + STRIP + 2,
        size: 50 + STRIP_GAP * 2 + STRIP,
        values: (u: uPlot, splits: number[]) =>
          timeLabels(splits, (u.scales.x.max ?? 0) - (u.scales.x.min ?? 0), this.hass),
      },
      // The temperature axis's numbers as uPlot writes them, to whatever
      // step it takes (#34 review: a unit after them, rounded, got steps
      // like 0.025 wrong twice, so they're as on main).
      {
        stroke: secondaryText,
        grid: { stroke: gridStroke },
        size: fitAxis,
      },
    ];
    if (this._hasHumidity) {
      axes.push({
        scale: 'y2',
        side: 1,
        size: fitAxis,
        stroke: secondaryText,
        grid: { show: false },
        values: (_u: uPlot, vs: number[]) => vs.map((v) => `${v.toFixed(0)}%`),
      });
    }

    // Pin humidity to 0-100 so a 35-45 % working band doesn't auto-zoom
    // into looking like wild swings; users want the absolute scale here.
    const scales: NonNullable<UPlotOptions['scales']> = {
      x: { time: true },
    };
    if (this._hasHumidity) {
      scales.y2 = { auto: false, range: [0, 100] };
    }

    return {
      width,
      height: CHART_HEIGHT,
      pxAlign: 1,
      cursor: { drag: { x: false, y: false }, points: { size: 6 } },
      legend: { show: false },
      scales,
      axes,
      series,
      hooks: {
        // Heating and cooling as a strip under the plot, clear of the
        // lines (#34): short cycles read as ticks, not stripes across it.
        draw: [
          (u: uPlot): void => {
            const ctx = u.ctx;
            if (!ctx) return;
            const ratio = uPlot.pxRatio || 1;
            // Whole device pixels, so its edges stay sharp at any ratio.
            const top = Math.round(u.bbox.top + u.bbox.height + STRIP_GAP * ratio);
            const height = Math.round(STRIP * ratio);
            const rects = stripRects(
              this._intervals,
              (v) => u.valToPos(v, 'x', true),
              u.bbox.left,
              u.bbox.left + u.bbox.width,
            );
            ctx.save();
            for (const r of rects) {
              ctx.fillStyle = this._stripColors[r.action];
              ctx.fillRect(r.x, top, r.w, height);
            }
            ctx.restore();
          },
        ],
        // The readout follows the pointer, or a tap (#34).
        setCursor: [
          (u: uPlot): void => {
            this._cursorIdx = u.cursor.idx ?? null;
          },
        ],
      },
    };
  }

  protected override render() {
    if (!this.hass || !this.roomEntity) {
      return html`<div class="status">No room temperature sensor for this zone.</div>`;
    }
    // Collapse the canvas host while a status message is showing, so the
    // message sits under the range buttons and the readout's (empty) two
    // lines, not under a blank CHART_HEIGHT gap.
    const idle = this._loading || this._error !== null || this._empty;
    // Reflect what's actually plotted so screen-reader users get the
    // same disclosure sighted users get from the legend.
    const words = rangeWords(this._hours);
    const ariaLabel = [
      'Room temperature',
      this._hasApparent ? ', feels like' : '',
      ', effective band edges',
      this._hasHumidity ? ', humidity' : '',
      ` and heating/cooling — last ${words}`,
    ].join('');
    return html`
      <div class="ranges" role="group" aria-label="Show the last">
        ${RANGES.map(
          (r) =>
            html`<button
              type="button"
              aria-label=${r.words}
              aria-pressed=${this._hours === r.hours ? 'true' : 'false'}
              @click=${() => this._pickRange(r.hours)}
            >
              ${r.label}
            </button>`,
        )}
      </div>
      <div class="readout">${idle ? nothing : this._readout()}</div>
      ${this._loading ? html`<div class="status">Loading ${words} of history…</div>` : nothing}
      ${this._error ? html`<div class="status">${this._error}</div>` : nothing}
      ${this._empty
        ? html`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>`
        : nothing}
      <div class="chart-host ${idle ? 'idle' : ''}" role="img" aria-label=${ariaLabel}></div>
      ${idle ? nothing : this._renderLegend()}
    `;
  }

  /** Shows the last `hours` (#34): a new subscription for that window. */
  private _pickRange(hours: number): void {
    if (hours === this._hours) return;
    this._switching = true;
    this._hours = hours;
  }

  /** The readout line (#34): the time and each shown series' value at the
   *  pointer's point, or now's (the last point is now: "Now"), and heating
   *  or cooling then. */
  private _readout(): string {
    if (this._switching) return `Loading ${rangeWords(this._hours)} of history…`;
    const data = this._data;
    const xs = data?.[0];
    if (!data || !xs || xs.length === 0) return '';
    const idx =
      this._cursorIdx !== null && this._cursorIdx < xs.length - 1 ? this._cursorIdx : null;
    const at = xs[idx ?? xs.length - 1];
    const value = (label: string): number | null => {
      if (this._hiddenLabels.has(label)) return null;
      const i = this._seriesIndexForLabel(label);
      const v = i < 0 ? null : (data[i]?.[idx ?? xs.length - 1] ?? null);
      return typeof v === 'number' && Number.isFinite(v) ? v : null;
    };
    return readoutLine({
      when: idx === null ? 'Now' : readoutTime(at * 1000, Date.now(), this.hass),
      room: value('Room'),
      apparent: value('Apparent'),
      low: value('Low band'),
      high: value('High band'),
      humidity: value('Humidity'),
      action: actionAt(this._intervals, at),
    });
  }

  /** Custom legend with per-series toggles (v0.8.3+). Each line-series
   *  swatch is a button — click / Enter / Space flips that series'
   *  `_hiddenLabels` membership, uPlot's setSeries hides / shows the
   *  line immediately, and the toggle's visual reflects the new state.
   *  Heating / Cooling (the strip, #34) are non-interactive in v0.8.3
   *  because they live in a `draw` hook rather than as uPlot series;
   *  toggling them needs a different code path. Marked with
   *  `aria-pressed="false"` only on the toggleable items so screen
   *  readers don't announce the strip's swatches as buttons. */
  private _renderLegend() {
    return html`<div class="legend">
      ${this._toggleItem(
        'Room',
        html`<span class="swatch" style="background:var(--primary-color)"></span>`,
      )}
      ${this._hasApparent
        ? this._toggleItem(
            'Apparent',
            html`<span class="swatch dashed" style="color:var(--primary-color)"></span>`,
            'Feels like',
          )
        : nothing}
      ${this._toggleItem(
        'Low band',
        html`<span class="swatch" style="background:var(--cb-action-heating)"></span>`,
      )}
      ${this._toggleItem(
        'High band',
        html`<span class="swatch" style="background:var(--cb-action-cooling)"></span>`,
      )}
      ${this._hasHumidity
        ? this._toggleItem(
            'Humidity',
            html`<span class="swatch" style="background:var(--cb-text-secondary)"></span>`,
            'Humidity (%, right axis)',
          )
        : nothing}
      <span
        ><span
          class="swatch"
          style="background:${this._stripColors.heating || 'var(--cb-action-heating)'}"
        ></span>
        Heating</span
      >
      <span
        ><span
          class="swatch"
          style="background:${this._stripColors.cooling || 'var(--cb-action-cooling)'}"
        ></span>
        Cooling</span
      >
    </div>`;
  }

  /** Build a single clickable legend item. `label` is the canonical
   *  series label used both for display and for `_seriesIndexForLabel`
   *  / `_hiddenLabels` lookups; `displayText` lets callers override the
   *  visible string (Humidity's "(%, right axis)" suffix doesn't belong
   *  in the toggle key). */
  private _toggleItem(label: string, swatch: TemplateResult, displayText?: string) {
    const hidden = this._hiddenLabels.has(label);
    // `aria-pressed=${...}` is a string-attribute binding (no `.`
    // prefix), which is the correct ARIA shape — values are
    // literally "true" / "false" strings, not booleans. Don't refactor
    // to `.ariaPressed=${hidden}` even though the runtime would
    // happen to work; assistive tech sniffs the attribute, not the
    // property.
    return html`<span
      class="toggle ${hidden ? 'hidden' : ''}"
      role="button"
      tabindex="0"
      aria-pressed=${hidden ? 'true' : 'false'}
      @click=${() => this._toggleLabel(label)}
      @keydown=${(e: KeyboardEvent) => this._onLabelKeyDown(e, label)}
      >${swatch}${displayText ?? label}</span
    >`;
  }
}

/** "24 hours": a range in words. */
function rangeWords(hours: number): string {
  return RANGES.find((r) => r.hours === hours)?.words ?? `${hours} hours`;
}

/** The readout's words (#34): "22:30 · Room 21.3° · Feels like 21.9° ·
 *  Range 19.5–22.5° · Humidity 45% · Heating", leaving out what isn't
 *  there (a series not shown, or a value not read). */
export function readoutLine(r: {
  when: string;
  room: number | null;
  apparent: number | null;
  low: number | null;
  high: number | null;
  humidity: number | null;
  action: 'heating' | 'cooling' | null;
}): string {
  const parts = [r.when];
  if (r.room !== null) parts.push(`Room ${degrees(r.room)}°`);
  if (r.apparent !== null) parts.push(`Feels like ${degrees(r.apparent)}°`);
  if (r.low !== null && r.high !== null) {
    parts.push(`Range ${bandText({ low: r.low, high: r.high })}`);
  } else if (r.low !== null) {
    parts.push(`Low ${degrees(r.low)}°`);
  } else if (r.high !== null) {
    parts.push(`High ${degrees(r.high)}°`);
  }
  if (r.humidity !== null) parts.push(`Humidity ${Math.round(r.humidity)}%`);
  if (r.action) parts.push(r.action === 'heating' ? 'Heating' : 'Cooling');
  return parts.join(' · ');
}

/** The readout's time: "22:30" today, "Thu 22:30" another day this week,
 *  and "Fri 13 22:30" a week back, where the weekday is today's; in HA's
 *  12/24-hour setting. The weekday, being short (as the time axis's),
 *  keeps the readout shorter on a narrow phone. By calendar day. */
export function readoutTime(ms: number, now: number, hass?: Pick<HomeAssistant, 'locale'>): string {
  const time = formatTime(ms, hass);
  const d = new Date(ms);
  const midnight = (t: Date) => new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
  const days = Math.round((midnight(new Date(now)) - midnight(d)) / 86_400_000);
  if (days === 0) return time;
  const weekday = weekdayOf(hass).format(d);
  return days >= 7 ? `${weekday} ${d.getDate()} ${time}` : `${weekday} ${time}`;
}

/** An axis as wide as its widest label, so none is cut ("21.25", "100%";
 *  #34 review): uPlot's own autosize pattern, but measuring every label in
 *  the axis's font (uPlot measures the longest string, and digits' widths
 *  differ in some fonts), plus 2 px, which fall on the labels' outer side. */
export function fitAxis(
  u: uPlot,
  values: string[] | null,
  axisIdx: number,
  cycleNum: number,
): number {
  const axis = u.axes[axisIdx] as uPlot.Axis & { _size?: number; font?: [string, number] };
  if (cycleNum > 1 && axis._size !== undefined) return axis._size;
  let size = (axis.ticks?.size ?? 10) + (axis.gap ?? 5);
  if (values && values.length > 0 && u.ctx) {
    const ctx = u.ctx;
    if (axis.font) ctx.font = axis.font[0];
    const widest = Math.max(...values.map((v) => ctx.measureText(v).width));
    size += widest / (uPlot.pxRatio || 1);
  }
  return Math.ceil(size) + 2;
}

/** Short weekday names, in HA's language where it's an English one, as
 *  the card's other words are. */
function weekdayOf(hass?: Pick<HomeAssistant, 'locale'>): Intl.DateTimeFormat {
  const own = hass?.locale?.language;
  return new Intl.DateTimeFormat(own?.startsWith('en') ? own : 'en', { weekday: 'short' });
}

/** Heating or cooling at `at` (unix seconds), from the action's intervals. */
export function actionAt(
  intervals: ReadonlyArray<{ start: number; end: number; action: 'heating' | 'cooling' }>,
  at: number,
): 'heating' | 'cooling' | null {
  return intervals.find((i) => i.start <= at && at < i.end)?.action ?? null;
}

/** Where to draw each heating or cooling interval in the strip: its left
 *  edge and width in whole canvas pixels (no blurred edges), kept within
 *  the plot (`left`–`right`), at least a pixel wide so a short cycle
 *  still shows. */
export function stripRects(
  intervals: ReadonlyArray<{ start: number; end: number; action: 'heating' | 'cooling' }>,
  toX: (seconds: number) => number,
  left: number,
  right: number,
): Array<{ x: number; w: number; action: 'heating' | 'cooling' }> {
  const out: Array<{ x: number; w: number; action: 'heating' | 'cooling' }> = [];
  for (const i of intervals) {
    const x0 = Math.max(left, toX(i.start));
    const x1 = Math.min(right, toX(i.end));
    // Outside the plot (clamped past each other, or onto its edge).
    if (x1 < x0 || (x1 === x0 && (x0 <= left || x1 >= right))) continue;
    const x = Math.round(x0);
    out.push({ x, w: Math.max(1, Math.round(x1) - x), action: i.action });
  }
  return out;
}

/** The time axis's labels in HA's 12/24-hour setting (#34): times, with
 *  the day under midnight; over more than a day and a half, the day alone
 *  at midnight. */
export function timeLabels(
  splits: number[],
  spanSeconds: number,
  hass?: Pick<HomeAssistant, 'locale'>,
): string[] {
  // "Sat 21" in any English: Intl's own order for the two varies ("21 Sat").
  const weekday = weekdayOf(hass);
  const dayOf = { format: (d: Date) => `${weekday.format(d)} ${d.getDate()}` };
  const long = spanSeconds > 36 * 3600;
  return splits.map((s) => {
    const d = new Date(s * 1000);
    const time = formatTime(s * 1000, hass);
    if (d.getHours() !== 0 || d.getMinutes() !== 0) return time;
    const day = dayOf.format(d);
    return long ? day : `${time}\n${day}`;
  });
}

/** A colour `share` of the way to another (hex or rgb(), as resolved from
 *  the theme), as `rgb(…)`; the first as given where either can't be read. */
export function mixColor(color: string, toward: string, share: number): string {
  const a = parseColor(color);
  const b = parseColor(toward);
  if (!a || !b) return color.trim();
  const mix = a.map((v, i) => Math.round(v + (b[i] - v) * share));
  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
}

function parseColor(color: string): [number, number, number] | null {
  const trimmed = color.trim();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(trimmed);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.replace(/(.)/g, '$1$1');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const rgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(trimmed);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return null;
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-history-chart': ComfortBandHistoryChart;
  }
}
