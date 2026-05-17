/**
 * Shared history-fetch + series-shaping utilities for the Insights tab
 * charts. Pure functions, framework-free — `history-chart.ts` and
 * `apparent-chart.ts` both consume these. Extracted so the two charts
 * can stay focused on their own visual configs instead of duplicating
 * ~70 lines of HA WebSocket plumbing and sparse-series forward-fill.
 */

import type { AlignedData } from 'uplot';
import type { HomeAssistant } from './types.js';

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
