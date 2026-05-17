import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/apparent-chart.js';
import type { ComfortBandApparentChart } from '../src/apparent-chart.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

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

  it('shows an error status when the websocket call rejects', async () => {
    const callWS = vi.fn().mockRejectedValue(new Error('history-disabled'));
    const el = await chart({ hass: makeHass(callWS), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('history-disabled');
  });

  it('renders the empty state when none of the series have usable history', async () => {
    const callWS = vi.fn().mockResolvedValue({});
    const el = await chart({ hass: makeHass(callWS), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('No history available');
  });

  // The "all-unavailable humidity but valid room+apparent" path lives in
  // the pure `numericSeries` filter in history-data.ts — see
  // history-data.test.ts for the unit test. We don't exercise it here
  // because reaching the uPlot render path requires a canvas, which
  // happy-dom doesn't implement.
});
