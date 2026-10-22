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
    nextBandChange: null,
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

  // ----- v0.8.2: Apparent + Humidity merged into the single history-chart -----

  it('wires apparent + humidity entities onto the history-chart when both are present', async () => {
    // v0.8.2 folded the standalone apparent-chart into the main chart;
    // the Insights tab now passes apparent + humidity entities as
    // optional props on `<comfort-band-history-chart>` instead of
    // mounting a separate component.
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
    const chart = el.shadowRoot!.querySelector('comfort-band-history-chart') as HTMLElement & {
      apparentEntity: string;
      humidityEntity: string;
    };
    expect(chart).not.toBeNull();
    expect(chart.apparentEntity).toBe('sensor.gym_apparent_temperature');
    expect(chart.humidityEntity).toBe('sensor.gym_humidity');
    // No hint when both overlays are wired.
    expect(el.shadowRoot!.querySelector('.hint')).toBeNull();
  });

  it('renders the configure-humidity hint and passes empty humidityEntity when no humidity sensor', async () => {
    // Chart still renders (room + bands + apparent overlay), but the
    // humidity overlay is skipped because `humidityEntity=''`. Hint
    // banner sits below, pointing at the Settings tab to configure one.
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
    const chart = el.shadowRoot!.querySelector('comfort-band-history-chart') as HTMLElement & {
      apparentEntity: string;
      humidityEntity: string;
    };
    expect(chart).not.toBeNull();
    expect(chart.apparentEntity).toBe('sensor.gym_apparent_temperature');
    expect(chart.humidityEntity).toBe('');
    const hint = el.shadowRoot!.querySelector('.hint');
    expect(hint).not.toBeNull();
    expect(hint!.textContent).toContain('Settings tab');
    // Not the pre-v0.4 upgrade copy (which would say "Upgrade...integration").
    expect(hint!.textContent).not.toContain('v0.4.0');
  });

  it('renders the upgrade hint and passes empty apparentEntity when apparent entity is missing', async () => {
    // Pre-v0.4 backend: pointing the user at Settings would just chain
    // them to another upgrade message. Direct upgrade copy instead. The
    // chart still renders the band/room/action triplet — the apparent
    // overlay is just absent.
    const hass = makeHass({
      'sensor.gym_room_temperature': {
        state: '21.0',
        attributes: { humidity_sensor: 'sensor.gym_humidity' },
      },
    });
    const el = await tab({ hass, entities: makeEntities() });
    const chart = el.shadowRoot!.querySelector('comfort-band-history-chart') as HTMLElement & {
      apparentEntity: string;
      humidityEntity: string;
    };
    expect(chart).not.toBeNull();
    expect(chart.apparentEntity).toBe('');
    // Humidity sensor IS configured but the tab gates `humidityEntity`
    // on apparent also being present — a bare humidity trace on a
    // 0-100 % y2 axis with no temperature context to correlate it
    // against would render alongside the "upgrade integration" hint
    // saying "overlay apparent temperature", which is contradictory.
    // Both overlays are wired only when both data sources exist.
    expect(chart.humidityEntity).toBe('');
    const hint = el.shadowRoot!.querySelector('.hint');
    expect(hint).not.toBeNull();
    expect(hint!.textContent).toContain('v0.4.0');
    expect(hint!.textContent).not.toContain('Settings tab');
  });
});
