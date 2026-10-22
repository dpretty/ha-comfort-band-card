import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/comfort-band-card.js';
import type { ComfortBandCard } from '../src/comfort-band-card.js';
import type {
  DeviceRegistryEntry,
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

afterEach(teardown);

function makeHass(zone: string): HomeAssistant {
  const device: DeviceRegistryEntry = {
    id: `dev-${zone}`,
    identifiers: [['comfort_band', `zone:${zone}`]],
    name: zone.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    name_by_user: null,
    area_id: null,
  };

  const entity = (key: string, entityId: string): EntityRegistryEntry => ({
    entity_id: entityId,
    platform: 'comfort_band',
    device_id: device.id,
    area_id: null,
    hidden: false,
    entity_category: null,
    translation_key: key,
    name: null,
  });

  const state = (
    entityId: string,
    value: string,
    attributes: Record<string, unknown> = {},
  ): HassEntity => ({
    entity_id: entityId,
    state: value,
    attributes,
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
  });

  const entities = [
    entity('effective_low', `sensor.${zone}_effective_low`),
    entity('effective_high', `sensor.${zone}_effective_high`),
    entity('room_temperature', `sensor.${zone}_room_temperature`),
    entity('current_action', `sensor.${zone}_current_action`),
    entity('override_active', `binary_sensor.${zone}_override_active`),
    entity('override_ends', `sensor.${zone}_override_ends`),
    entity('apparent_temperature', `sensor.${zone}_apparent_temperature`),
    entity('use_apparent_temperature', `switch.${zone}_use_apparent_temperature`),
    entity('enabled', `switch.${zone}_enabled`),
    entity('room_sensor_unavailable', `binary_sensor.${zone}_room_sensor_unavailable`),
    entity('next_band_change', `sensor.${zone}_next_band_change`),
  ];

  return {
    states: {
      [`sensor.${zone}_effective_low`]: state(`sensor.${zone}_effective_low`, '19.5'),
      [`sensor.${zone}_effective_high`]: state(`sensor.${zone}_effective_high`, '22.5'),
      [`sensor.${zone}_room_temperature`]: state(`sensor.${zone}_room_temperature`, '21.3'),
      [`sensor.${zone}_current_action`]: state(`sensor.${zone}_current_action`, 'idle'),
      [`binary_sensor.${zone}_override_active`]: state(
        `binary_sensor.${zone}_override_active`,
        'off',
      ),
      [`sensor.${zone}_override_ends`]: state(`sensor.${zone}_override_ends`, 'unknown'),
      [`sensor.${zone}_apparent_temperature`]: state(`sensor.${zone}_apparent_temperature`, '22.4'),
      [`switch.${zone}_use_apparent_temperature`]: state(
        `switch.${zone}_use_apparent_temperature`,
        'off',
      ),
      [`switch.${zone}_enabled`]: state(`switch.${zone}_enabled`, 'on'),
      [`binary_sensor.${zone}_room_sensor_unavailable`]: state(
        `binary_sensor.${zone}_room_sensor_unavailable`,
        'off',
      ),
    },
    devices: { [device.id]: device },
    entities: Object.fromEntries(entities.map((e) => [e.entity_id, e])),
    connection: stubConnection(),
    callService: vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn().mockResolvedValue(undefined),
  };
}

async function card(zone: string, hass: HomeAssistant): Promise<ComfortBandCard> {
  const el = await mount('comfort-band-card');
  el.setConfig({ type: 'custom:comfort-band-card', zone });
  el.hass = hass;
  await el.updateComplete;
  return el;
}

type TileProbe = HTMLElement & { zoneName: string };

type TileProps = HTMLElement & {
  zoneName: string;
  temperature: number;
  feelsLike: boolean;
  low: number;
  high: number;
  action: string;
  statusKind: string;
  statusText: string;
  badges: string[];
};

function tileOf(el: ComfortBandCard): TileProps {
  return el.shadowRoot!.querySelector('comfort-band-tile') as TileProps;
}

async function cardWith(
  config: { zone: string; name?: unknown },
  hass: HomeAssistant,
): Promise<ComfortBandCard> {
  const el = await mount('comfort-band-card');
  el.setConfig({ type: 'custom:comfort-band-card', ...config } as never);
  el.hass = hass;
  await el.updateComplete;
  return el;
}

/** Puts the zone's device in an area, as HA does when a device is assigned a room. */
function withArea(hass: HomeAssistant, zone: string, areaName: string): HomeAssistant {
  const device = hass.devices[`dev-${zone}`]!;
  return {
    ...hass,
    devices: { [device.id]: { ...device, area_id: 'area-1' } },
    areas: { 'area-1': { area_id: 'area-1', name: areaName } },
  };
}

function shownNames(el: ComfortBandCard): { tile: string; modal: string | null } {
  const tile = el.shadowRoot!.querySelector('comfort-band-tile') as TileProbe;
  const modal = el.shadowRoot!.querySelector('comfort-band-modal');
  return { tile: tile.zoneName, modal: modal?.getAttribute('zoneName') ?? null };
}

describe('comfort-band-card room name', () => {
  it("defaults to the area the zone's device is in, not the device's own name", async () => {
    const hass = withArea(makeHass('gym'), 'gym', 'Home Gym');
    const el = await cardWith({ zone: 'gym' }, hass);
    // The device is called "Gym" in this fixture; the area name must win.
    expect(shownNames(el)).toEqual({ tile: 'Home Gym', modal: 'Home Gym' });
  });

  it('uses a configured name over the area, trimmed', async () => {
    const hass = withArea(makeHass('gym'), 'gym', 'Home Gym');
    const el = await cardWith({ zone: 'gym', name: '  Weights room ' }, hass);
    expect(shownNames(el)).toEqual({ tile: 'Weights room', modal: 'Weights room' });
  });

  it('treats a blank name as unset', async () => {
    const hass = withArea(makeHass('gym'), 'gym', 'Home Gym');
    const el = await cardWith({ zone: 'gym', name: '   ' }, hass);
    expect(shownNames(el).tile).toBe('Home Gym');
  });

  it('falls back to the device name when the device has no area', async () => {
    const el = await cardWith({ zone: 'gym' }, makeHass('gym'));
    expect(shownNames(el).tile).toBe('Gym');
  });

  it('falls back to the device name when the area is not in the registry', async () => {
    const base = makeHass('gym');
    const device = base.devices['dev-gym']!;
    const hass = { ...base, devices: { [device.id]: { ...device, area_id: 'gone' } }, areas: {} };
    const el = await cardWith({ zone: 'gym' }, hass);
    expect(shownNames(el).tile).toBe('Gym');
  });

  it('falls back to the device name when the area registry is not loaded', async () => {
    const base = makeHass('gym');
    const device = base.devices['dev-gym']!;
    const hass = { ...base, devices: { [device.id]: { ...device, area_id: 'area-1' } } };
    delete hass.areas;
    const el = await cardWith({ zone: 'gym' }, hass);
    expect(shownNames(el).tile).toBe('Gym');
  });

  it('trims the area name', async () => {
    const hass = withArea(makeHass('gym'), 'gym', '  Home Gym ');
    const el = await cardWith({ zone: 'gym' }, hass);
    expect(shownNames(el).tile).toBe('Home Gym');
  });

  // The fixture's other tests have one device, which an implementation that
  // took the first device in the registry would also pass.
  it("uses this zone's own device's area when there are others", async () => {
    const gym = makeHass('gym');
    const office = makeHass('office');
    const hass: HomeAssistant = {
      ...gym,
      states: { ...office.states, ...gym.states },
      entities: { ...office.entities, ...gym.entities },
      devices: {
        'dev-office': { ...office.devices['dev-office']!, area_id: 'area-office' },
        'dev-gym': { ...gym.devices['dev-gym']!, area_id: 'area-gym' },
      },
      areas: {
        'area-office': { area_id: 'area-office', name: 'Study' },
        'area-gym': { area_id: 'area-gym', name: 'Home Gym' },
      },
    };
    const el = await cardWith({ zone: 'gym' }, hass);
    expect(shownNames(el).tile).toBe('Home Gym');
  });

  it('rejects a name that is not text', async () => {
    const el = await mount('comfort-band-card');
    expect(() =>
      el.setConfig({ type: 'custom:comfort-band-card', zone: 'gym', name: ['Gym'] } as never),
    ).toThrow(/name/);
  });

  // `name: 101` unquoted in YAML.
  it('takes a number as a name', async () => {
    const el = await cardWith({ zone: 'gym', name: 101 }, makeHass('gym'));
    expect(shownNames(el).tile).toBe('101');
  });

  // `name:` with nothing after it in YAML.
  it('treats an empty name in YAML as unset', async () => {
    const hass = withArea(makeHass('gym'), 'gym', 'Home Gym');
    const el = await cardWith({ zone: 'gym', name: null }, hass);
    expect(shownNames(el).tile).toBe('Home Gym');
  });
});

describe('comfort-band-card', () => {
  it('rejects setConfig without a zone', async () => {
    const el = await mount('comfort-band-card');
    expect(() => el.setConfig({ type: 'custom:comfort-band-card' } as never)).toThrow(/zone/);
  });

  it('reports a card size of 2 (used by HA grid layout)', async () => {
    const el = await mount('comfort-band-card');
    expect(el.getCardSize()).toBe(2);
  });

  it('renders a tile populated from live entity states', async () => {
    const hass = makeHass('gym');
    const el = await card('gym', hass);
    const t = tileOf(el);
    expect(t).not.toBeNull();
    expect(t.zoneName).toBe('Gym');
    expect(t.temperature).toBe(21.3);
    expect(t.feelsLike).toBe(false);
    expect(t.low).toBe(19.5);
    expect(t.high).toBe(22.5);
    expect(t.action).toBe('idle');
    expect(t.statusKind).toBe('comfortable');
    expect(t.statusText).toBe('Comfortable · 19.5–22.5°');
    expect(t.badges).toEqual([]);
  });

  // The tile shows what the Now tab shows large.
  it('gives the tile the temperature that drives control', async () => {
    const hass = makeHass('gym');
    hass.states['switch.gym_use_apparent_temperature'].state = 'on';
    const el = await card('gym', hass);
    expect(tileOf(el).temperature).toBe(22.4);
    expect(tileOf(el).feelsLike).toBe(true);
  });

  it("tells the tile when the schedule next changes the room's range", async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 9, 22, 10, 0));
    try {
      const hass = makeHass('gym');
      hass.locale = { language: 'en-GB', time_format: '24' };
      hass.states['sensor.gym_next_band_change'] = {
        entity_id: 'sensor.gym_next_band_change',
        state: new Date(2026, 9, 22, 17, 0).toISOString(),
        attributes: { scheduled: true },
        last_changed: '',
        last_updated: '',
      };
      const el = await card('gym', hass);
      expect(tileOf(el).statusText).toBe('Comfortable · 19.5–22.5° until 17:00');
    } finally {
      vi.useRealTimers();
    }
  });

  it('promises no end once the next change has passed', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 9, 22, 18, 0));
    try {
      const hass = makeHass('gym');
      hass.states['sensor.gym_next_band_change'] = {
        entity_id: 'sensor.gym_next_band_change',
        state: new Date(2026, 9, 22, 17, 0).toISOString(),
        attributes: { scheduled: true },
        last_changed: '',
        last_updated: '',
      };
      const el = await card('gym', hass);
      expect(tileOf(el).statusText).toBe('Comfortable · 19.5–22.5°');
    } finally {
      vi.useRealTimers();
    }
  });

  // A paused zone still works out what it would do, but doesn't do it.
  it("doesn't colour a paused room as heating", async () => {
    const hass = makeHass('gym');
    hass.states['switch.gym_enabled'].state = 'off';
    hass.states['sensor.gym_current_action'].state = 'heating';
    const el = await card('gym', hass);
    expect(tileOf(el).action).toBe('unknown');
    expect(tileOf(el).statusKind).toBe('paused');
    expect(tileOf(el).badges).toEqual(['paused']);
  });

  it('flags a room sensor that is offline while a stand-in drives control', async () => {
    const hass = makeHass('gym');
    hass.states['binary_sensor.gym_room_sensor_unavailable'].state = 'on';
    hass.states['sensor.gym_room_temperature'].attributes = { source: 'climate' };
    hass.states['sensor.gym_current_action'].state = 'heating';
    const el = await card('gym', hass);
    expect(tileOf(el).action).toBe('heating');
    expect(tileOf(el).statusKind).toBe('sensor');
    expect(tileOf(el).statusText).toBe('Room sensor offline · Heating · 19.5–22.5°');
    expect(tileOf(el).badges).toEqual(['sensor', 'heating']);
  });

  it('says control is on hold when the room sensor is offline with nothing standing in', async () => {
    const hass = makeHass('gym');
    hass.states['binary_sensor.gym_room_sensor_unavailable'].state = 'on';
    hass.states['sensor.gym_room_temperature'].state = 'unknown';
    hass.states['sensor.gym_current_action'].state = 'heating';
    const el = await card('gym', hass);
    expect(tileOf(el).temperature).toBeNaN();
    expect(tileOf(el).action).toBe('unknown');
    expect(tileOf(el).statusText).toBe('On hold: the room sensor is offline');
    expect(tileOf(el).badges).toEqual(['sensor']);
  });

  it('shows a placeholder when the zone device is not registered', async () => {
    const hass: HomeAssistant = {
      states: {},
      devices: {},
      entities: {},
      connection: stubConnection(),
      callService: vi.fn(),
      callWS: vi.fn(),
    };
    const el = await card('office', hass);
    expect(el.shadowRoot!.innerHTML).toContain('not found');
    expect(el.shadowRoot!.querySelector('comfort-band-tile')).toBeNull();
  });

  it('forwards variant: mini to the tile and reports a card size of 1', async () => {
    const hass = makeHass('gym');
    const el = await mount('comfort-band-card');
    el.setConfig({ type: 'custom:comfort-band-card', zone: 'gym', variant: 'mini' });
    el.hass = hass;
    await el.updateComplete;
    const tile = el.shadowRoot!.querySelector('comfort-band-tile') as HTMLElement & {
      variant: string;
    };
    expect(tile.variant).toBe('mini');
    expect(el.getCardSize()).toBe(1);
  });

  it('says a room is adjusted, and marks it on the chip', async () => {
    const hass = makeHass('gym');
    hass.states['binary_sensor.gym_override_active'].state = 'on';
    hass.states['sensor.gym_current_action'].state = 'cooling';
    const el = await card('gym', hass);
    expect(tileOf(el).statusText).toBe('Cooling · adjusted to 19.5–22.5°');
    expect(tileOf(el).badges).toEqual(['cooling', 'adjusted']);
  });
});
