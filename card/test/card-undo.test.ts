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

// #25 review round 3: Undo through the whole card, as HA runs it. The card
// builds the zone's entities afresh at each update from HA, and hands every
// card a new `hass` whenever any entity in the house changes.

afterEach(() => {
  teardown();
  vi.useRealTimers();
});

// happy-dom has no `<dialog>.showModal()`; the modal opens with it.
const dialog = globalThis.HTMLDialogElement?.prototype as
  | (HTMLDialogElement & { showModal?: () => void })
  | undefined;
if (dialog && typeof dialog.showModal !== 'function') dialog.showModal = function () {};

const NOW = Date.parse('2026-10-22T10:00:00Z');
const HOUR = 3_600_000;

/** HA with one zone, its device and registry, integration v0.25.0's
 *  services, and an integration that changes the states it's asked to,
 *  held back until `deliver`. */
function setup() {
  const device: DeviceRegistryEntry = {
    id: 'dev-gym',
    identifiers: [['comfort_band', 'zone:gym']],
    name: 'Gym',
    name_by_user: null,
    area_id: null,
  };
  const keys: Record<string, string> = {
    effective_low: 'sensor.gym_effective_low',
    effective_high: 'sensor.gym_effective_high',
    room_temperature: 'sensor.gym_room_temperature',
    current_action: 'sensor.gym_current_action',
    override_active: 'binary_sensor.gym_override_active',
    override_ends: 'sensor.gym_override_ends',
    next_band_change: 'sensor.gym_next_band_change',
    manual_low: 'number.gym_manual_low',
    manual_high: 'number.gym_manual_high',
  };
  const registry: Record<string, EntityRegistryEntry> = Object.fromEntries(
    Object.entries(keys).map(([key, id]) => [
      id,
      {
        entity_id: id,
        platform: 'comfort_band',
        device_id: device.id,
        area_id: null,
        hidden: false,
        entity_category: null,
        translation_key: key,
        name: null,
      },
    ]),
  );
  const states: Record<string, HassEntity> = {};
  const put = (id: string, state: string, attributes: Record<string, unknown> = {}) => {
    states[id] = { entity_id: id, state, attributes, last_changed: '', last_updated: '' };
  };
  put('sensor.gym_effective_low', '19.5');
  put('sensor.gym_effective_high', '22.5');
  put('sensor.gym_room_temperature', '21.0');
  put('sensor.gym_current_action', 'idle');
  put('binary_sensor.gym_override_active', 'off');
  put('sensor.gym_override_ends', 'unknown');
  put('number.gym_manual_low', '19');
  put('number.gym_manual_high', '22');
  put('sensor.gym_next_band_change', new Date(NOW + 5 * HOUR).toISOString(), {
    scheduled: true,
    low: 18,
    high: 23,
  });
  put('sensor.kitchen_temperature', '20.0');
  const callService = vi.fn(async (_d: string, service: string, data: Record<string, unknown>) => {
    if (data.low !== undefined) put('number.gym_manual_low', String(data.low));
    if (data.high !== undefined) put('number.gym_manual_high', String(data.high));
    if (service === 'start_override') {
      put('binary_sensor.gym_override_active', 'on');
      put('sensor.gym_override_ends', new Date(Date.now() + 3 * HOUR).toISOString());
      put('sensor.gym_effective_low', String(data.low));
      put('sensor.gym_effective_high', String(data.high));
    }
  });
  const hass: HomeAssistant = {
    states: { ...states },
    devices: { [device.id]: device },
    entities: registry,
    connection: stubConnection(),
    callService: callService as unknown as HomeAssistant['callService'],
    callWS: vi.fn().mockResolvedValue(undefined),
    services: {
      comfort_band: {
        start_override: { fields: { zone: {}, low: {}, high: {}, hours: {}, until: {} } },
        cancel_override: { fields: { zone: {}, low: {}, high: {} } },
      },
    },
    locale: { language: 'en-GB', time_format: '24' },
  };
  /** A new `hass` with HA's latest states, as HA hands it to every card. */
  const deliver = async (card: ComfortBandCard): Promise<void> => {
    card.hass = { ...card.hass!, states: { ...states } };
    await flush(card);
  };
  return { hass, put, deliver, callService };
}

async function flush(card: ComfortBandCard): Promise<void> {
  for (let i = 0; i < 50; i++) await Promise.resolve();
  await card.updateComplete;
  const modal = card.shadowRoot!.querySelector('comfort-band-modal') as
    | (HTMLElement & { updateComplete: Promise<boolean> })
    | null;
  await modal?.updateComplete;
  const tab = nowTab(card) as (HTMLElement & { updateComplete: Promise<boolean> }) | null;
  await tab?.updateComplete;
}

function nowTab(card: ComfortBandCard): HTMLElement | null {
  const modal = card.shadowRoot!.querySelector('comfort-band-modal');
  return modal?.shadowRoot?.querySelector('comfort-band-now-tab') ?? null;
}

async function opened(hass: HomeAssistant): Promise<ComfortBandCard> {
  vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] });
  vi.setSystemTime(NOW);
  const card = await mount('comfort-band-card');
  card.setConfig({ type: 'custom:comfort-band-card', zone: 'gym' });
  card.hass = hass;
  await card.updateComplete;
  (card.shadowRoot!.querySelector('comfort-band-modal') as HTMLElement & { open(): void }).open();
  await flush(card);
  return card;
}

async function warmer(card: ComfortBandCard): Promise<void> {
  nowTab(card)!.shadowRoot!.querySelector<HTMLElement>('.steps .warmer')!.click();
  await flush(card);
  vi.advanceTimersByTime(1_500);
  await flush(card);
}

const undoButton = (card: ComfortBandCard) =>
  nowTab(card)?.shadowRoot?.querySelector('.undo') ?? null;

describe('comfort-band-card Undo, as HA runs it', () => {
  it('is offered once HA’s state shows the change after the answer', async () => {
    const { hass, deliver } = setup();
    const card = await opened(hass);
    await warmer(card);
    expect(undoButton(card)).toBeNull();
    await deliver(card);
    expect(undoButton(card)).not.toBeNull();
  });

  it('is offered where HA’s state comes before the answer', async () => {
    const { hass, deliver, callService } = setup();
    const card = await opened(hass);
    const real = callService.getMockImplementation()!;
    callService.mockImplementationOnce(async (...args: Parameters<typeof real>) => {
      await real(...args);
      await deliver(card);
    });
    await warmer(card);
    await flush(card);
    expect(undoButton(card)).not.toBeNull();
  });

  // Every card gets a new `hass` when anything in the house changes.
  it('stays at an update for another room’s entity', async () => {
    const { hass, put, deliver } = setup();
    const card = await opened(hass);
    await warmer(card);
    await deliver(card);
    put('sensor.kitchen_temperature', '20.1');
    await deliver(card);
    put('sensor.kitchen_temperature', '20.2');
    await deliver(card);
    expect(undoButton(card)).not.toBeNull();
  });

  it('goes at a change to this room’s adjustment from elsewhere', async () => {
    const { hass, put, deliver } = setup();
    const card = await opened(hass);
    await warmer(card);
    await deliver(card);
    put('number.gym_manual_low', '21');
    await deliver(card);
    expect(undoButton(card)).toBeNull();
  });
});
