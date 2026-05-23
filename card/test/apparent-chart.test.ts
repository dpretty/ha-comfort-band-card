import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import '../src/apparent-chart.js';
import type { ComfortBandApparentChart } from '../src/apparent-chart.js';
import type { HomeAssistant, HassConnection } from '../src/types.js';
import { captureSubscription, mount, teardown } from './_fixture.js';

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
          return () => undefined;
        },
        set() {
          return true;
        },
      },
    );
  } as HTMLCanvasElement['getContext'];
  // uPlot's draw path also uses Path2D, which jsdom doesn't implement.
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

async function chart(props: Partial<ComfortBandApparentChart>): Promise<ComfortBandApparentChart> {
  return mount('comfort-band-apparent-chart', props);
}

const FULL_PROPS = {
  roomEntity: 'sensor.gym_room_temperature',
  apparentEntity: 'sensor.gym_apparent_temperature',
  humidityEntity: 'sensor.gym_humidity',
};

describe('comfort-band-apparent-chart', () => {
  it('renders a status placeholder and skips the subscription when any entity is missing', async () => {
    const sub = captureSubscription();
    const el = await chart({
      hass: makeHass(sub.connection),
      roomEntity: 'sensor.gym_room_temperature',
      apparentEntity: '',
      humidityEntity: '',
    });
    expect(el.shadowRoot!.querySelector('.status')!.textContent).toContain(
      'comparison unavailable',
    );
    expect(sub.callCount).toBe(0);
  });

  it('opens a history/stream subscription with all three entities', async () => {
    const sub = captureSubscription();
    await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);
    const msg = sub.subscriptions[0].message;
    expect(msg.type).toBe('history/stream');
    expect(msg.entity_ids).toEqual([
      'sensor.gym_room_temperature',
      'sensor.gym_apparent_temperature',
      'sensor.gym_humidity',
    ]);
    expect(msg.no_attributes).toBe(true);
    expect(msg.significant_changes_only).toBe(false);
    expect(typeof msg.start_time).toBe('string');
  });

  it('resubscribes when the humidity entity changes after the first subscribe', async () => {
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);

    el.humidityEntity = 'sensor.gym_humidity_alt';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);
    expect(sub.subscriptions[0].unsubscribe).toHaveBeenCalledOnce();
    expect(sub.subscriptions[1].message.entity_ids).toContain('sensor.gym_humidity_alt');
  });

  it('resubscribes when re-attached to the DOM after a disconnect', async () => {
    // Pins the base-class disconnect/reconnect path: detaching tears
    // down the subscription, reattaching opens a fresh one. Without
    // this, switching away from the Insights tab and back would leave
    // the chart blank.
    //
    // Two distinct stream emissions so the assertion isn't just a
    // subscribe count — the SECOND subscription must drive the chart
    // into a non-empty state. First emission is empty (empty state);
    // second carries data (status div disappears).
    const now = Math.floor(Date.now() / 1000);
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);
    sub.subscriptions[0].callback({
      states: {
        'sensor.gym_room_temperature': [],
        'sensor.gym_apparent_temperature': [],
        'sensor.gym_humidity': [],
      },
    });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.status')!.textContent).toContain('No history available');

    el.remove();
    expect(sub.subscriptions[0].unsubscribe).toHaveBeenCalledOnce();
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);

    sub.subscriptions[1].callback({
      states: {
        'sensor.gym_room_temperature': [
          { s: '21.0', lu: now - 3600 },
          { s: '21.5', lu: now - 1800 },
        ],
        'sensor.gym_apparent_temperature': [
          { s: '21.2', lu: now - 3600 },
          { s: '22.0', lu: now - 1800 },
        ],
        'sensor.gym_humidity': [{ s: '55', lu: now - 1800 }],
      },
    });
    await el.updateComplete;
    // Empty status text is gone — only happens via _renderPlot's
    // `_empty = false` branch with non-empty data.
    expect(el.shadowRoot!.querySelector('.status')).toBeNull();
  });

  it('shows an error status when subscribeMessage rejects', async () => {
    const failing: HassConnection = {
      subscribeMessage: vi.fn().mockRejectedValue(new Error('history-disabled')),
    };
    const el = await chart({ hass: makeHass(failing), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('history-disabled');
  });

  it('renders the empty state when none of the series have usable history', async () => {
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [],
        'sensor.gym_apparent_temperature': [],
        'sensor.gym_humidity': [],
      },
    });
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('No history available');
  });

  it('drops events from a prior subscription generation', async () => {
    // Sequence:
    //   1. First subscribe (gen=1).
    //   2. Change humidityEntity → second subscribe (gen=2).
    //   3. First sub's callback fires a LATE event with data.
    //   4. Chart must ignore that event (stale gen).
    // Asserting the chart is STILL in the loading state proves the
    // stale event didn't reach _renderPlot.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));

    el.humidityEntity = 'sensor.gym_humidity_alt';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);

    const now = Math.floor(Date.now() / 1000);
    sub.subscriptions[0].callback({
      states: {
        'sensor.gym_room_temperature': [{ s: '21.0', lu: now - 60 }],
        'sensor.gym_apparent_temperature': [{ s: '21.2', lu: now - 60 }],
        'sensor.gym_humidity': [{ s: '55', lu: now - 60 }],
      },
    });
    await el.updateComplete;
    // Stale event was dropped — still loading.
    expect(el.shadowRoot!.querySelector('.status')?.textContent).toContain('Loading');
  });

  // The "all-unavailable humidity but valid room+apparent" path lives in
  // the pure `numericSeries` filter in history-data.ts — see
  // history-data.test.ts for the unit test. We don't exercise it here
  // because reaching the uPlot render path requires a canvas, which
  // happy-dom doesn't implement.
});
