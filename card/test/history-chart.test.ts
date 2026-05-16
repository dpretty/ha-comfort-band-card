import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/history-chart.js';
import type { ComfortBandHistoryChart } from '../src/history-chart.js';
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

async function chart(props: Partial<ComfortBandHistoryChart>): Promise<ComfortBandHistoryChart> {
  return mount('comfort-band-history-chart', props);
}

describe('comfort-band-history-chart', () => {
  it('renders an empty message when roomEntity is missing', async () => {
    const callWS = vi.fn();
    const el = await chart({ hass: makeHass(callWS), roomEntity: '' });
    expect(el.shadowRoot!.querySelector('.status')!.textContent).toContain('No room temperature');
    expect(callWS).not.toHaveBeenCalled();
  });

  it('issues a history/history_during_period websocket call with the active entities', async () => {
    const callWS = vi.fn().mockResolvedValue({});
    await chart({
      hass: makeHass(callWS),
      roomEntity: 'sensor.gym_room_temperature',
      lowEntity: 'sensor.gym_effective_low',
      highEntity: 'sensor.gym_effective_high',
      actionEntity: 'sensor.gym_current_action',
    });
    // Wait one microtask so the connectedCallback fetch has a chance to run.
    await new Promise((r) => setTimeout(r, 0));
    expect(callWS).toHaveBeenCalledOnce();
    const msg = callWS.mock.calls[0][0] as Record<string, unknown>;
    expect(msg.type).toBe('history/history_during_period');
    expect(msg.entity_ids).toEqual([
      'sensor.gym_room_temperature',
      'sensor.gym_effective_low',
      'sensor.gym_effective_high',
      'sensor.gym_current_action',
    ]);
    expect(msg.no_attributes).toBe(true);
    expect(typeof msg.start_time).toBe('string');
    expect(typeof msg.end_time).toBe('string');
  });

  it('skips empty entity slots from the history query', async () => {
    const callWS = vi.fn().mockResolvedValue({});
    await chart({
      hass: makeHass(callWS),
      roomEntity: 'sensor.gym_room_temperature',
      lowEntity: '',
      highEntity: '',
      actionEntity: '',
    });
    await new Promise((r) => setTimeout(r, 0));
    const msg = callWS.mock.calls[0][0] as Record<string, unknown>;
    expect(msg.entity_ids).toEqual(['sensor.gym_room_temperature']);
  });

  it('shows the empty state when the response has no usable history', async () => {
    const callWS = vi.fn().mockResolvedValue({});
    const el = await chart({
      hass: makeHass(callWS),
      roomEntity: 'sensor.gym_room_temperature',
    });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('No history available');
  });

  it('shows an error status when the websocket call rejects', async () => {
    const callWS = vi.fn().mockRejectedValue(new Error('history-disabled'));
    const el = await chart({
      hass: makeHass(callWS),
      roomEntity: 'sensor.gym_room_temperature',
    });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('history-disabled');
  });
});
