import { describe, it, expect, vi } from 'vitest';
import { HOURS_TO_SHOW, alignSeries, fetchHistory, numericSeries } from '../src/history-data.js';
import type { HomeAssistant } from '../src/types.js';
import { stubConnection } from './_fixture.js';

describe('history-data: numericSeries', () => {
  it('returns an empty array for undefined input', () => {
    expect(numericSeries(undefined)).toEqual([]);
  });

  it('skips non-numeric states (unavailable, unknown, blank)', () => {
    const points = [
      { s: 'unavailable', lu: 100 },
      { s: '21.5', lu: 200 },
      { s: 'unknown', lu: 300 },
      { s: '', lu: 400 },
      { s: '22.0', lu: 500 },
    ];
    expect(numericSeries(points)).toEqual([
      [200, 21.5],
      [500, 22.0],
    ]);
  });

  it('returns an empty array when every state is non-numeric', () => {
    // Drives the "all-unavailable humidity sensor" case used by the
    // apparent-temp chart — humidity becomes empty, alignSeries
    // still produces a plottable result for the other two series.
    const points = [
      { s: 'unavailable', lu: 100 },
      { s: 'unknown', lu: 200 },
    ];
    expect(numericSeries(points)).toEqual([]);
  });

  it('sorts the output by timestamp regardless of input order', () => {
    const points = [
      { s: '22.0', lu: 300 },
      { s: '21.5', lu: 100 },
      { s: '21.8', lu: 200 },
    ];
    expect(numericSeries(points)).toEqual([
      [100, 21.5],
      [200, 21.8],
      [300, 22.0],
    ]);
  });
});

describe('history-data: alignSeries', () => {
  it('produces a single-point axis when every series is empty', () => {
    const nowSec = 1_000_000;
    const aligned = alignSeries([[], [], []], nowSec);
    expect(aligned[0]).toEqual([nowSec]);
    // Each empty series becomes [null] so uPlot has a slot per series.
    expect(aligned[1]).toEqual([null]);
    expect(aligned[2]).toEqual([null]);
    expect(aligned[3]).toEqual([null]);
  });

  it('forward-fills sparse series across the union of timestamps', () => {
    // Series A samples at t=10, 30; series B samples at t=20 only.
    // Union axis [10, 20, 30] — B's value persists at 30 (forward-fill),
    // A's value at 10 persists into 20 until A's next sample lands at 30.
    const aligned = alignSeries(
      [
        [
          [10, 1],
          [30, 3],
        ],
        [[20, 2]],
      ],
      1000,
    );
    expect(aligned[0]).toEqual([10, 20, 30]);
    // Series A: 1 at t=10, still 1 at t=20 (last seen), 3 at t=30.
    expect(aligned[1]).toEqual([1, 1, 3]);
    // Series B: null at t=10 (no value seen yet), 2 at t=20, still 2 at t=30.
    expect(aligned[2]).toEqual([null, 2, 2]);
  });

  it('handles a single non-empty series alongside empty ones', () => {
    // Apparent-temp chart's "humidity all-unavailable" scenario:
    // room + apparent have data, humidity is empty.
    const aligned = alignSeries(
      [
        [
          [10, 21.0],
          [20, 21.5],
        ],
        [
          [10, 21.2],
          [20, 22.0],
        ],
        [],
      ],
      1000,
    );
    expect(aligned[0]).toEqual([10, 20]);
    expect(aligned[1]).toEqual([21.0, 21.5]);
    expect(aligned[2]).toEqual([21.2, 22.0]);
    // Empty series gets forward-filled with null at every timestamp.
    expect(aligned[3]).toEqual([null, null]);
  });
});

describe('history-data: fetchHistory', () => {
  it('issues a history/history_during_period WS call with start/end ISO times', async () => {
    const callWS = vi.fn().mockResolvedValue({});
    const hass: HomeAssistant = {
      states: {},
      devices: {},
      entities: {},
      connection: stubConnection(),
      callService: vi.fn(),
      callWS,
    };
    await fetchHistory(hass, ['sensor.a', 'sensor.b'], 12);
    expect(callWS).toHaveBeenCalledOnce();
    const msg = callWS.mock.calls[0][0] as Record<string, unknown>;
    expect(msg.type).toBe('history/history_during_period');
    expect(msg.entity_ids).toEqual(['sensor.a', 'sensor.b']);
    expect(msg.no_attributes).toBe(true);
    expect(msg.minimal_response).toBe(false);
    // Window is `hours` long, measured backwards from now.
    const start = Date.parse(msg.start_time as string);
    const end = Date.parse(msg.end_time as string);
    const deltaHours = (end - start) / (60 * 60 * 1000);
    expect(deltaHours).toBeCloseTo(12, 2);
  });

  it('exports a sensible HOURS_TO_SHOW default', () => {
    expect(HOURS_TO_SHOW).toBe(24);
  });
});
