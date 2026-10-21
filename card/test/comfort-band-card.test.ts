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

  const state = (entityId: string, value: string): HassEntity => ({
    entity_id: entityId,
    state: value,
    attributes: {},
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

  it('rejects a name that is not a string', async () => {
    const el = await mount('comfort-band-card');
    expect(() =>
      el.setConfig({ type: 'custom:comfort-band-card', zone: 'gym', name: 7 } as never),
    ).toThrow(/name/);
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
    const tile = el.shadowRoot!.querySelector('comfort-band-tile') as HTMLElement & {
      zoneName: string;
      roomTemp: number;
      low: number;
      high: number;
      action: string;
    };
    expect(tile).not.toBeNull();
    expect(tile.zoneName).toBe('Gym');
    expect(tile.roomTemp).toBeCloseTo(21.3, 1);
    expect(tile.low).toBeCloseTo(19.5, 1);
    expect(tile.high).toBeCloseTo(22.5, 1);
    expect(tile.action).toBe('idle');
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

  it('forwards override state from binary_sensor + sensor pair', async () => {
    const hass = makeHass('gym');
    const future = new Date(Date.now() + 60 * 60_000).toISOString();
    hass.states['binary_sensor.gym_override_active'].state = 'on';
    hass.states['sensor.gym_override_ends'].state = future;

    const el = await card('gym', hass);
    const tile = el.shadowRoot!.querySelector('comfort-band-tile') as HTMLElement & {
      overrideActive: boolean;
      overrideEnds: string | null;
    };
    expect(tile.overrideActive).toBe(true);
    expect(tile.overrideEnds).toBe(future);
  });
});
