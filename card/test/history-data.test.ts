import { describe, it, expect, vi } from 'vitest';
import {
  HOURS_TO_SHOW,
  alignSeries,
  fetchHistory,
  numericSeries,
  subscribeHistory,
} from '../src/history-data.js';
import type { HomeAssistant, HassConnection } from '../src/types.js';
import { captureSubscription, stubConnection } from './_fixture.js';

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

describe('history-data: subscribeHistory', () => {
  function makeHass(connection: HassConnection): HomeAssistant {
    return {
      states: {},
      devices: {},
      entities: {},
      connection,
      callService: vi.fn(),
      callWS: vi.fn(),
    };
  }

  it('issues a history/stream subscription with the requested entities + window', async () => {
    const sub = captureSubscription();
    await subscribeHistory(makeHass(sub.connection), ['sensor.a', 'sensor.b'], 12, () => {});
    expect(sub.callCount).toBe(1);
    const msg = sub.subscriptions[0].message;
    expect(msg.type).toBe('history/stream');
    expect(msg.entity_ids).toEqual(['sensor.a', 'sensor.b']);
    expect(msg.no_attributes).toBe(true);
    expect(msg.minimal_response).toBe(false);
    expect(msg.significant_changes_only).toBe(false);
    // start_time is an ISO string of (now - hours).
    const start = Date.parse(msg.start_time as string);
    expect(Date.now() - start).toBeGreaterThanOrEqual(12 * 60 * 60 * 1000 - 1000);
    expect(Date.now() - start).toBeLessThanOrEqual(12 * 60 * 60 * 1000 + 1000);
  });

  it('passes through the initial event to the callback as the merged snapshot', async () => {
    const sub = captureSubscription();
    const seen: Array<Record<string, Array<{ s: string; lu: number }>>> = [];
    await subscribeHistory(makeHass(sub.connection), ['sensor.a'], 24, (resp) => {
      seen.push(structuredClone(resp));
    });
    const now = Math.floor(Date.now() / 1000);
    sub.emit({
      states: {
        'sensor.a': [
          { s: '21.0', lu: now - 7200 },
          { s: '21.5', lu: now - 3600 },
        ],
      },
    });
    expect(seen).toHaveLength(1);
    expect(seen[0]['sensor.a']).toEqual([
      { s: '21.0', lu: now - 7200 },
      { s: '21.5', lu: now - 3600 },
    ]);
  });

  it('appends incremental deltas to the running snapshot', async () => {
    // HA's stream protocol: the first event ships the historical
    // window, subsequent events ship only the new state changes.
    // subscribeHistory merges deltas into a running response so the
    // callback sees a full snapshot every time.
    const sub = captureSubscription();
    const seen: Array<Record<string, Array<{ s: string; lu: number }>>> = [];
    await subscribeHistory(makeHass(sub.connection), ['sensor.a'], 24, (resp) => {
      seen.push(structuredClone(resp));
    });
    const now = Math.floor(Date.now() / 1000);
    sub.emit({ states: { 'sensor.a': [{ s: '21.0', lu: now - 3600 }] } });
    sub.emit({ states: { 'sensor.a': [{ s: '21.5', lu: now - 60 }] } });
    expect(seen).toHaveLength(2);
    expect(seen[1]['sensor.a']).toEqual([
      { s: '21.0', lu: now - 3600 },
      { s: '21.5', lu: now - 60 },
    ]);
  });

  it('evicts points older than the window cutoff on merge', async () => {
    // As the subscription runs for hours, points that fall out of the
    // configured window must be dropped — otherwise the merged
    // snapshot grows unboundedly. Setting hours=1, then injecting
    // points from 2h ago, asserts the cutoff fires.
    const sub = captureSubscription();
    const seen: Array<Record<string, Array<{ s: string; lu: number }>>> = [];
    await subscribeHistory(makeHass(sub.connection), ['sensor.a'], 1, (resp) => {
      seen.push(structuredClone(resp));
    });
    const now = Math.floor(Date.now() / 1000);
    sub.emit({
      states: {
        'sensor.a': [
          { s: '20.0', lu: now - 7200 }, // 2h ago — older than 1h cutoff
          { s: '21.0', lu: now - 1800 }, // 30min ago — kept
        ],
      },
    });
    expect(seen[0]['sensor.a']).toEqual([{ s: '21.0', lu: now - 1800 }]);
  });

  it('notifies the callback even when a delta carries no state changes', async () => {
    // HA sometimes emits an empty `states: {}` batch when the
    // coalescing window produced no significant changes. The callback
    // should still be invoked (with the running snapshot unchanged) so
    // it can clear a loading state if desired.
    const sub = captureSubscription();
    let calls = 0;
    await subscribeHistory(makeHass(sub.connection), ['sensor.a'], 24, () => {
      calls++;
    });
    const now = Math.floor(Date.now() / 1000);
    sub.emit({ states: { 'sensor.a': [{ s: '21.0', lu: now - 60 }] } });
    expect(calls).toBe(1);
    sub.emit({ states: {} });
    expect(calls).toBe(2);
  });

  it('returns the unsubscribe handle that closes the subscription', async () => {
    const sub = captureSubscription();
    const unsub = await subscribeHistory(makeHass(sub.connection), ['sensor.a'], 24, () => {});
    expect(sub.subscriptions[0].unsubscribe).not.toHaveBeenCalled();
    unsub();
    expect(sub.subscriptions[0].unsubscribe).toHaveBeenCalledOnce();
  });

  it('compiles against the stubConnection no-op helper', async () => {
    // Sanity check: existing tests that use stubConnection() can still
    // call subscribeHistory without setup-time errors.
    const unsub = await subscribeHistory(makeHass(stubConnection()), ['sensor.a'], 24, () => {});
    expect(typeof unsub).toBe('function');
  });
});
