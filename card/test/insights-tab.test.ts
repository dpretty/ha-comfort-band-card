import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/insights-tab.js';
import type { ComfortBandInsightsTab } from '../src/tabs/insights-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

function makeEntities(overrides: Partial<ZoneEntities> = {}): ZoneEntities {
  return {
    effectiveLow: null,
    effectiveHigh: null,
    roomTemperature: 'sensor.gym_room_temperature',
    overrideEnds: null,
    currentAction: null,
    overrideActive: null,
    manualLow: null,
    manualHigh: null,
    overrideHours: null,
    deadbandBelow: null,
    deadbandAbove: null,
    minCycleMinutes: null,
    cancelOverride: null,
    enabled: null,
    deviceId: 'dev-gym',
    deviceName: 'Gym',
    ...overrides,
  };
}

function makeHass(): HomeAssistant {
  return {
    states: {},
    devices: {},
    entities: {},
    callService: vi.fn(),
    callWS: vi.fn().mockResolvedValue({}),
  };
}

async function tab(props: Partial<ComfortBandInsightsTab>): Promise<ComfortBandInsightsTab> {
  return mount('comfort-band-insights-tab', props);
}

describe('comfort-band-insights-tab', () => {
  it('renders an empty message when no room temperature sensor is registered', async () => {
    const el = await tab({ hass: makeHass(), entities: makeEntities({ roomTemperature: null }) });
    expect(el.shadowRoot!.querySelector('.empty')!.textContent).toContain('No room temperature');
  });

  it('mounts a comfort-band-history-chart wired to the zone entities', async () => {
    const hass = makeHass();
    const entities = makeEntities({
      effectiveLow: 'sensor.gym_effective_low',
      effectiveHigh: 'sensor.gym_effective_high',
      currentAction: 'sensor.gym_current_action',
    });
    const el = await tab({ hass, entities });
    const chart = el.shadowRoot!.querySelector('comfort-band-history-chart') as HTMLElement & {
      hass?: HomeAssistant;
      roomEntity: string;
      lowEntity: string;
      highEntity: string;
      actionEntity: string;
    };
    expect(chart).not.toBeNull();
    expect(chart.hass).toBe(hass);
    expect(chart.roomEntity).toBe('sensor.gym_room_temperature');
    expect(chart.lowEntity).toBe('sensor.gym_effective_low');
    expect(chart.highEntity).toBe('sensor.gym_effective_high');
    expect(chart.actionEntity).toBe('sensor.gym_current_action');
  });

  it('passes empty strings for unset entity slots so the chart can choose to skip them', async () => {
    const hass = makeHass();
    const el = await tab({ hass, entities: makeEntities() });
    const chart = el.shadowRoot!.querySelector('comfort-band-history-chart') as HTMLElement & {
      lowEntity: string;
      highEntity: string;
      actionEntity: string;
    };
    expect(chart.lowEntity).toBe('');
    expect(chart.highEntity).toBe('');
    expect(chart.actionEntity).toBe('');
  });
});
