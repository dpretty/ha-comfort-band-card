/**
 * Shared history-fetch + series-shaping utilities for the Insights tab
 * chart. Pure functions, framework-free — `history-chart.ts` consumes
 * these. Extracted as a standalone module so the WS plumbing and the
 * sparse-series forward-fill stay testable independent of any
 * particular chart's visual config, and so a future second uPlot chart
 * can reuse them without inheriting `chart-base.ts`'s lifecycle.
 */

import type { AlignedData } from 'uplot';
import type { HomeAssistant, UnsubscribeFunc } from './types.js';

/** Default window for both charts. Lives here so the two stay in sync. */
export const HOURS_TO_SHOW = 24;

export interface HistoryPoint {
  /** state */
  s: string;
  /** last_updated as unix seconds */
  lu: number;
}

export type HistoryResponse = Record<string, HistoryPoint[]>;

/**
 * Fetch HA's `history/history_during_period` for the given entities over
 * the last `hours` window. Caller is responsible for filtering empty
 * entity IDs out of the list before calling.
 *
 * Kept around as the deterministic one-shot variant for tests and any
 * future callsite that genuinely wants a snapshot rather than a live
 * stream. Chart code uses `subscribeHistory` instead (see below).
 */
export async function fetchHistory(
  hass: HomeAssistant,
  entityIds: string[],
  hours: number = HOURS_TO_SHOW,
): Promise<HistoryResponse> {
  const end = new Date();
  const start = new Date(end.getTime() - hours * 60 * 60 * 1000);
  return hass.callWS<HistoryResponse>({
    type: 'history/history_during_period',
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    entity_ids: entityIds,
    minimal_response: false,
    no_attributes: true,
  });
}

/**
 * Live equivalent of `fetchHistory`. Subscribes to HA's `history/stream`
 * WS command and invokes `callback` with the *merged* response on every
 * incremental update — the initial event ships the full `hours` window,
 * subsequent events ship only the state changes since the last event
 * (per HA Core's `homeassistant/components/history/websocket_api.py`).
 *
 * We merge deltas into a running snapshot per entity and pass that to
 * the callback, so the chart's render code doesn't need to know about
 * the stream protocol. HA's cursor guarantees zero overlap between the
 * historical dump and the live tail (no de-dup needed); we just append.
 * Old points are evicted on each merge so the window stays bounded.
 *
 * Returns the unsubscribe function the caller stores for teardown.
 */
export async function subscribeHistory(
  hass: HomeAssistant,
  entityIds: string[],
  hours: number,
  callback: (response: HistoryResponse) => void,
): Promise<UnsubscribeFunc> {
  // `start` is the fixed lower bound HA uses to construct the initial
  // historical dump — set once at subscription time, not refreshed as the
  // subscription runs. The eviction `cutoff` below is recomputed on every
  // event so the merged snapshot tracks a rolling window. HA won't
  // backfill events older than `start` even if `cutoff` moves; the
  // initial dump covers it and deltas extend the right edge.
  const start = new Date(Date.now() - hours * 60 * 60 * 1000);
  const merged: HistoryResponse = {};

  return hass.connection.subscribeMessage<HistoryStreamEvent>(
    (event) => {
      const states = event.states ?? {};
      if (Object.keys(states).length === 0) {
        // Empty batch — HA sends one when no tracked entity changed in
        // the coalescing window. Nothing to merge. We invoke the
        // callback only if we already have *some* accumulated data;
        // notifying with a still-empty `merged` (which only happens if
        // a coalescing heartbeat slips in before the initial historical
        // dump — protocol-unlikely but not impossible) would drive the
        // chart into its "No history available" empty state before the
        // real data arrives. Skipping the callback here leaves the
        // chart in its loading state until the first non-empty event.
        if (Object.keys(merged).length > 0) {
          callback(merged);
        }
        return;
      }
      const cutoff = (Date.now() - hours * 60 * 60 * 1000) / 1000;
      for (const [entityId, points] of Object.entries(states)) {
        const existing = merged[entityId] ?? [];
        // Append the delta. Filter by cutoff so the dataset stays
        // bounded as the subscription runs for hours.
        merged[entityId] = [...existing, ...points].filter((p) => p.lu >= cutoff);
      }
      callback(merged);
    },
    {
      type: 'history/stream',
      start_time: start.toISOString(),
      entity_ids: entityIds,
      minimal_response: false,
      no_attributes: true,
      // Default is `true`. We want every state change (action transitions,
      // each effective_low recalc) — the chart's whole purpose is showing
      // those events. The volume is manageable: a typical zone fires a
      // few state changes per minute.
      significant_changes_only: false,
    },
  );
}

/**
 * On-the-wire shape of a `history/stream` event. The initial event
 * additionally carries `start_time` / `end_time` (Unix epoch floats)
 * but the chart code only reads `states`, so they're optional here.
 */
interface HistoryStreamEvent {
  states?: HistoryResponse;
  start_time?: number;
  end_time?: number;
}

/**
 * Convert HA's `[{s, lu}, ...]` to a numeric series sorted by time.
 * Skips entries whose state isn't a finite number (e.g. `unavailable`,
 * `unknown`, blank).
 */
export function numericSeries(points: HistoryPoint[] | undefined): Array<[number, number]> {
  if (!points) return [];
  const out: Array<[number, number]> = [];
  for (const p of points) {
    const n = parseFloat(p.s);
    if (Number.isFinite(n)) out.push([p.lu, n]);
  }
  out.sort((a, b) => a[0] - b[0]);
  return out;
}

/**
 * Build aligned uPlot data from one or more numeric series. Produces a
 * single sorted x axis (union of all timestamps across series) with
 * forward-filled values per series — so sparse / staggered sensor
 * updates render as continuous step lines instead of disconnected dots.
 * Returns a singleton `[nowSec]` x-axis when every series is empty so
 * callers can still hand the result to uPlot without a branch.
 */
export function alignSeries(series: Array<Array<[number, number]>>, nowSec: number): AlignedData {
  const xs = new Set<number>();
  for (const s of series) for (const [t] of s) xs.add(t);
  if (xs.size === 0) {
    return [[nowSec], ...series.map(() => [null])] as unknown as AlignedData;
  }
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
