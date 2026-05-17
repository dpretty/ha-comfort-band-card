import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/insights-tab.js';
import type { ComfortBandInsightsTab } from '../src/tabs/insights-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

afterEach(teardown);

function makeEntities(overrides: Partial<ZoneEntities> = {}): ZoneEntities {
  return {
    effectiveLow: null,
    effectiveHigh: null,
    roomTemperature: 'sensor.gym_room_temperature',
    apparentTemperature: null,
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
    learningEnabled: null,
    useApparentTemperature: null,
    deviceId: 'dev-gym',
    deviceName: 'Gym',
    ...overrides,
  };
}

function makeHass(
  states: Record<string, { state: string; attributes?: Record<string, unknown> }> = {},
): HomeAssistant {
  return {
    states: Object.fromEntries(
      Object.entries(states).map(([entityId, { state, attributes }]) => [
        entityId,
        {
          entity_id: entityId,
          state,
          attributes: attributes ?? {},
          last_changed: '',
          last_updated: '',
        },
      ]),
    ),
    devices: {},
    entities: {},
    connection: stubConnection(),
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

  // ----- v0.8: Room vs Apparent + Humidity chart gating -----

  it('mounts the apparent-chart when humidity_sensor attribute + apparent entity are present', async () => {
    const hass = makeHass({
      'sensor.gym_room_temperature': {
        state: '21.0',
        attributes: { humidity_sensor: 'sensor.gym_humidity' },
      },
    });
    const entities = makeEntities({
      apparentTemperature: 'sensor.gym_apparent_temperature',
    });
    const el = await tab({ hass, entities });
    const apparent = el.shadowRoot!.querySelector('comfort-band-apparent-chart') as HTMLElement & {
      hass?: HomeAssistant;
      roomEntity: string;
      apparentEntity: string;
      humidityEntity: string;
    };
    expect(apparent).not.toBeNull();
    expect(apparent.hass).toBe(hass);
    expect(apparent.roomEntity).toBe('sensor.gym_room_temperature');
    expect(apparent.apparentEntity).toBe('sensor.gym_apparent_temperature');
    expect(apparent.humidityEntity).toBe('sensor.gym_humidity');
    // No hint when the chart is rendered.
    expect(el.shadowRoot!.querySelector('.hint')).toBeNull();
  });

  it('renders the hint (not the apparent-chart) when no humidity sensor is configured', async () => {
    const hass = makeHass({
      'sensor.gym_room_temperature': {
        state: '21.0',
        attributes: { humidity_sensor: null },
      },
    });
    const entities = makeEntities({
      apparentTemperature: 'sensor.gym_apparent_temperature',
    });
    const el = await tab({ hass, entities });
    expect(el.shadowRoot!.querySelector('comfort-band-apparent-chart')).toBeNull();
    const hint = el.shadowRoot!.querySelector('.hint');
    expect(hint).not.toBeNull();
    expect(hint!.textContent).toContain('Settings tab');
  });

  it('renders the hint when the apparent entity is missing (pre-v0.4 backend)', async () => {
    const hass = makeHass({
      'sensor.gym_room_temperature': {
        state: '21.0',
        attributes: { humidity_sensor: 'sensor.gym_humidity' },
      },
    });
    // apparentTemperature is null on the entities object.
    const el = await tab({ hass, entities: makeEntities() });
    expect(el.shadowRoot!.querySelector('comfort-band-apparent-chart')).toBeNull();
    expect(el.shadowRoot!.querySelector('.hint')).not.toBeNull();
  });
});
