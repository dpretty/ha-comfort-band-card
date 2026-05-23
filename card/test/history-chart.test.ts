import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/history-chart.js';
import type { ComfortBandHistoryChart } from '../src/history-chart.js';
import type { HomeAssistant, HassConnection } from '../src/types.js';
import { captureSubscription, mount, stubConnection, teardown } from './_fixture.js';

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

async function chart(props: Partial<ComfortBandHistoryChart>): Promise<ComfortBandHistoryChart> {
  return mount('comfort-band-history-chart', props);
}

const FULL_PROPS = {
  roomEntity: 'sensor.gym_room_temperature',
  lowEntity: 'sensor.gym_effective_low',
  highEntity: 'sensor.gym_effective_high',
  actionEntity: 'sensor.gym_current_action',
};

describe('comfort-band-history-chart', () => {
  it('renders an empty message when roomEntity is missing', async () => {
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), roomEntity: '' });
    expect(el.shadowRoot!.querySelector('.status')!.textContent).toContain('No room temperature');
    expect(sub.callCount).toBe(0);
  });

  it('opens a history/stream subscription with the active entities', async () => {
    const sub = captureSubscription();
    await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    // Wait one microtask so connectedCallback's update has a chance to run.
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);
    const msg = sub.subscriptions[0].message;
    expect(msg.type).toBe('history/stream');
    expect(msg.entity_ids).toEqual([
      'sensor.gym_room_temperature',
      'sensor.gym_effective_low',
      'sensor.gym_effective_high',
      'sensor.gym_current_action',
    ]);
    expect(msg.no_attributes).toBe(true);
    expect(msg.significant_changes_only).toBe(false);
    expect(typeof msg.start_time).toBe('string');
  });

  it('skips empty entity slots from the subscription request', async () => {
    const sub = captureSubscription();
    await chart({
      hass: makeHass(sub.connection),
      roomEntity: 'sensor.gym_room_temperature',
      lowEntity: '',
      highEntity: '',
      actionEntity: '',
    });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.subscriptions[0].message.entity_ids).toEqual(['sensor.gym_room_temperature']);
  });

  it('shows the empty state when the initial event has no usable history', async () => {
    const sub = captureSubscription();
    const el = await chart({
      hass: makeHass(sub.connection),
      roomEntity: 'sensor.gym_room_temperature',
    });
    await new Promise((r) => setTimeout(r, 0));
    // Emit an empty initial event — every entity has an empty array.
    sub.emit({ states: { 'sensor.gym_room_temperature': [] } });
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('No history available');
  });

  it('shows an error status when subscribeMessage rejects', async () => {
    // Custom connection that rejects on subscribe (e.g. recorder
    // component disabled). The chart's catch path sets `_error`.
    const failing: HassConnection = {
      subscribeMessage: vi.fn().mockRejectedValue(new Error('history-disabled')),
    };
    const el = await chart({
      hass: makeHass(failing),
      roomEntity: 'sensor.gym_room_temperature',
    });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('history-disabled');
  });

  it('unsubscribes when the element is disconnected', async () => {
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.subscriptions[0].unsubscribe).not.toHaveBeenCalled();

    el.remove();
    expect(sub.subscriptions[0].unsubscribe).toHaveBeenCalledOnce();
  });

  it('resubscribes when an entity prop changes', async () => {
    // Live-stream pattern: changing entities means the existing
    // subscription's entity list is stale. Tear it down and open a
    // fresh one. Tests the (a) unsubscribe of the old, (b) subscribe
    // of the new, all via the captured subscriptions[].
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);

    el.lowEntity = 'sensor.gym_alt_low';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);
    expect(sub.subscriptions[0].unsubscribe).toHaveBeenCalledOnce();
    expect(sub.subscriptions[1].message.entity_ids).toContain('sensor.gym_alt_low');
  });

  it('drops events from a prior subscription generation', async () => {
    // Sequence:
    //   1. First subscribe (gen=1).
    //   2. Change entity → triggers second subscribe (gen=2).
    //   3. First subscription's callback fires a LATE event with data.
    //   4. Chart must ignore that event (stale gen).
    // Validates the `_fetchGen` guard. Without it, the late event
    // would land on _renderPlot with the old entity_id's data, which
    // doesn't match the chart's current bindings.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));

    el.lowEntity = 'sensor.gym_alt_low';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);

    // Emit on the FIRST subscription (now stale). The chart should
    // ignore it because gen has advanced.
    const now = Math.floor(Date.now() / 1000);
    sub.subscriptions[0].callback({
      states: {
        'sensor.gym_room_temperature': [{ s: '21.0', lu: now - 60 }],
        'sensor.gym_effective_low': [{ s: '19.5', lu: now - 60 }],
        'sensor.gym_effective_high': [{ s: '22.5', lu: now - 60 }],
      },
    });
    await el.updateComplete;
    // Chart is still loading because the second subscription hasn't
    // emitted yet; the stale event was dropped without clearing
    // `_loading`. The .status div is showing the loading text.
    expect(el.shadowRoot!.querySelector('.status')?.textContent).toContain('Loading');
  });

  it('does not unsubscribe when hass ticks without an entity change', async () => {
    // The chart should hold the subscription across hass updates — the
    // subscription itself streams live data, so a fresh hass object
    // doesn't invalidate it. Without this, every state push in HA
    // would churn the subscription.
    const sub = captureSubscription();
    const conn = sub.connection;
    const el = await chart({ hass: makeHass(conn), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);

    el.hass = makeHass(conn);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);
    expect(sub.subscriptions[0].unsubscribe).not.toHaveBeenCalled();
  });

  // Smoke check: stubConnection still satisfies HomeAssistant type for
  // tests that don't exercise the subscription path.
  it('compiles against the stubConnection no-op helper', async () => {
    const el = await chart({ hass: makeHass(stubConnection()), roomEntity: '' });
    expect(el.shadowRoot!.textContent).toContain('No room temperature');
  });
});
