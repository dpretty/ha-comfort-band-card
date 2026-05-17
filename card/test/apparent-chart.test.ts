import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import '../src/apparent-chart.js';
import type { ComfortBandApparentChart } from '../src/apparent-chart.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// jsdom doesn't implement HTMLCanvasElement.getContext — it returns null
// and logs a "not implemented" warning. uPlot then queues a microtask
// that tries to clearRect on the null context and throws AFTER the test
// has completed, polluting the suite output. Stub getContext to return a
// minimal Proxy of no-op functions so uPlot's draw path is silent. The
// stub doesn't need to render anything; tests assert on Lit component
// state, not on canvas pixels.
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = function (): unknown {
    return new Proxy(
      {},
      {
        get(_target, prop) {
          if (prop === 'canvas') return { width: 0, height: 0 };
          // Methods return undefined (no-op); property reads also
          // return undefined (uPlot does not read back assigned values).
          return () => undefined;
        },
        set() {
          return true;
        },
      },
    );
  } as HTMLCanvasElement['getContext'];
  // uPlot's draw path also uses Path2D, which jsdom doesn't implement.
  // No-op class is enough for our purposes — we don't assert on
  // canvas pixels.
  (globalThis as { Path2D?: typeof Path2D }).Path2D ??= class {
    addPath() {}
    arc() {}
    arcTo() {}
    bezierCurveTo() {}
    closePath() {}
    ellipse() {}
    lineTo() {}
    moveTo() {}
    quadraticCurveTo() {}
    rect() {}
    roundRect() {}
  } as unknown as typeof Path2D;
});

afterEach(teardown);

function makeHass(callWS: HomeAssistant['callWS']): HomeAssistant {
  return {
    states: {},
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: vi.fn(),
    callWS,
  };
}

async function chart(props: Partial<ComfortBandApparentChart>): Promise<ComfortBandApparentChart> {
  return mount('comfort-band-apparent-chart', props);
}

const FULL_PROPS = {
  roomEntity: 'sensor.gym_room_temperature',
  apparentEntity: 'sensor.gym_apparent_temperature',
  humidityEntity: 'sensor.gym_humidity',
};

describe('comfort-band-apparent-chart', () => {
  it('renders a status placeholder and skips the WS call when any entity is missing', async () => {
    const callWS = vi.fn();
    const el = await chart({
      hass: makeHass(callWS),
      roomEntity: 'sensor.gym_room_temperature',
      apparentEntity: '',
      humidityEntity: '',
    });
    expect(el.shadowRoot!.querySelector('.status')!.textContent).toContain(
      'comparison unavailable',
    );
    expect(callWS).not.toHaveBeenCalled();
  });

  it('issues a history/history_during_period websocket call with all three entities', async () => {
    const callWS = vi.fn().mockResolvedValue({});
    await chart({ hass: makeHass(callWS), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(callWS).toHaveBeenCalledOnce();
    const msg = callWS.mock.calls[0][0] as Record<string, unknown>;
    expect(msg.type).toBe('history/history_during_period');
    expect(msg.entity_ids).toEqual([
      'sensor.gym_room_temperature',
      'sensor.gym_apparent_temperature',
      'sensor.gym_humidity',
    ]);
    expect(msg.no_attributes).toBe(true);
    expect(typeof msg.start_time).toBe('string');
    expect(typeof msg.end_time).toBe('string');
  });

  it('refetches when the humidity entity changes after the first fetch', async () => {
    const callWS = vi.fn().mockResolvedValue({});
    const el = await chart({ hass: makeHass(callWS), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(callWS).toHaveBeenCalledOnce();
    el.humidityEntity = 'sensor.gym_humidity_alt';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(callWS).toHaveBeenCalledTimes(2);
    const second = callWS.mock.calls[1][0] as Record<string, unknown>;
    expect(second.entity_ids).toContain('sensor.gym_humidity_alt');
  });

  it('refetches when re-attached to the DOM after a disconnect', async () => {
    // Pins the base-class disconnectedCallback + connectedCallback
    // behaviour: detaching resets `_hasFetched` and reattaching
    // explicitly requestUpdate()s so `updated()` triggers a new fetch.
    // Without this, switching away from the Insights tab and back
    // would leave the chart blank.
    //
    // Two distinct mock responses so the assertion isn't just a call
    // count — the second call must take its OWN response path, not be
    // a no-op echo of the first. The first response is empty (empty
    // state); the second response carries valid sensor data (so the
    // status div disappears and only legend + chart-host remain).
    const now = Math.floor(Date.now() / 1000);
    const callWS = vi
      .fn()
      .mockResolvedValueOnce({
        'sensor.gym_room_temperature': [],
        'sensor.gym_apparent_temperature': [],
        'sensor.gym_humidity': [],
      })
      .mockResolvedValueOnce({
        'sensor.gym_room_temperature': [
          { s: '21.0', lu: now - 3600 },
          { s: '21.5', lu: now - 1800 },
        ],
        'sensor.gym_apparent_temperature': [
          { s: '21.2', lu: now - 3600 },
          { s: '22.0', lu: now - 1800 },
        ],
        'sensor.gym_humidity': [{ s: '55', lu: now - 1800 }],
      });
    const el = await chart({ hass: makeHass(callWS), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(callWS).toHaveBeenCalledOnce();
    // After the empty first response, the status div is showing.
    expect(el.shadowRoot!.querySelector('.status')!.textContent).toContain('No history available');

    el.remove();
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    // Second response with data — the new fetch must have landed AND
    // its result must replace the prior empty-state UI. happy-dom has
    // no canvas so we can't assert pixels; we can confirm the empty
    // status text is gone, which only happens via _renderPlot's
    // `_empty = false` branch.
    expect(callWS).toHaveBeenCalledTimes(2);
    expect(el.shadowRoot!.querySelector('.status')).toBeNull();
  });

  it('shows an error status when the websocket call rejects', async () => {
    const callWS = vi.fn().mockRejectedValue(new Error('history-disabled'));
    const el = await chart({ hass: makeHass(callWS), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('history-disabled');
  });

  it('renders the empty state when none of the series have usable history', async () => {
    // Explicit empty arrays per entity (vs a bare `{}`) so the test
    // pins the intended "valid response but no datapoints" path rather
    // than the "missing-key falls through to undefined" one.
    const callWS = vi.fn().mockResolvedValue({
      'sensor.gym_room_temperature': [],
      'sensor.gym_apparent_temperature': [],
      'sensor.gym_humidity': [],
    });
    const el = await chart({ hass: makeHass(callWS), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('No history available');
  });

  it('drops a stale in-flight response when entity props change mid-fetch', async () => {
    // Test design: make the stale (first) response carry NON-EMPTY room
    // and apparent series; make the fresh (second) response carry empty
    // arrays. Then resolve fresh first, stale last.
    //   With the _fetchGen guard: stale's _renderPlot is skipped → final
    //     state is "_empty = true" from the fresh response → status div
    //     shows "No history available".
    //   Without the guard: stale's _renderPlot runs with non-empty data,
    //     hits `new uPlot()` (which throws in happy-dom — no canvas),
    //     the catch block sets `_error`, and the status div shows the
    //     canvas error message.
    // Asserting the absence of `_error` is what proves the guard fires.
    const now = Math.floor(Date.now() / 1000);
    const deferred: Array<{ resolve: (r: unknown) => void }> = [];
    const callWS = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          deferred.push({ resolve });
        }),
    );
    const el = await chart({ hass: makeHass(callWS), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(callWS).toHaveBeenCalledOnce();
    el.humidityEntity = 'sensor.gym_humidity_alt';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(callWS).toHaveBeenCalledTimes(2);

    // Resolve the fresh fetch first — empty for every series.
    deferred[1].resolve({
      'sensor.gym_room_temperature': [],
      'sensor.gym_apparent_temperature': [],
      'sensor.gym_humidity_alt': [],
    });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('No history available');

    // Resolve the stale fetch — has DATA for the still-current room and
    // apparent entities. Without the guard, _renderPlot would run, try
    // to construct uPlot, and the catch path would surface an error.
    deferred[0].resolve({
      'sensor.gym_room_temperature': [
        { s: '21.0', lu: now - 3600 },
        { s: '21.5', lu: now - 1800 },
      ],
      'sensor.gym_apparent_temperature': [
        { s: '21.2', lu: now - 3600 },
        { s: '22.0', lu: now - 1800 },
      ],
      'sensor.gym_humidity': [{ s: '60', lu: now - 1800 }],
    });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    // Final assertion: status text is still the fresh fetch's empty
    // state, NOT an error message that the stale's render-attempt would
    // produce. This is what proves the guard caught the stale response.
    const statusText = el.shadowRoot!.querySelector('.status')!.textContent ?? '';
    expect(statusText).toContain('No history available');
    expect(statusText.toLowerCase()).not.toContain('error');
    expect(statusText.toLowerCase()).not.toContain('canvas');
  });

  // The "all-unavailable humidity but valid room+apparent" path lives in
  // the pure `numericSeries` filter in history-data.ts — see
  // history-data.test.ts for the unit test. We don't exercise it here
  // because reaching the uPlot render path requires a canvas, which
  // happy-dom doesn't implement.
});
