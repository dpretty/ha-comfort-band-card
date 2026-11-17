import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HassEntity, HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// #52: Warmer / Cooler taps are held for 1.5 s and sent as one change. If the
// card moves on to another room meanwhile, they go at once to the room they
// were made in, as closing the tab sends them, and the new room starts with
// none.

afterEach(() => {
  teardown();
  vi.useRealTimers();
});

const NOW = Date.parse('2026-10-22T10:00:00Z');
const HOUR = 3_600_000;
/** Each room's schedule changes next at a different time. */
const NEXT = { gym: NOW + 5 * HOUR, study: NOW + 2 * HOUR };

function entitiesOf(zone: 'gym' | 'study'): ZoneEntities {
  return {
    effectiveLow: `sensor.${zone}_effective_low`,
    effectiveHigh: `sensor.${zone}_effective_high`,
    roomTemperature: `sensor.${zone}_room_temperature`,
    overrideEnds: `sensor.${zone}_override_ends`,
    nextBandChange: `sensor.${zone}_next_band_change`,
    currentAction: `sensor.${zone}_current_action`,
    overrideActive: `binary_sensor.${zone}_override_active`,
    manualLow: `number.${zone}_manual_low`,
    manualHigh: `number.${zone}_manual_high`,
  } as unknown as ZoneEntities;
}

/**
 * HA with two rooms, each set by its schedule: the gym at 19.5–22.5°, the
 * study at 16–18°, adjusted (to 19–22° and 16.5–17.5°) with `adjusted`.
 * Calls go through unless `hold` says otherwise for the next one.
 */
function setup({ adjusted = false } = {}) {
  type Raw = Record<string, [string, Record<string, unknown>?]>;
  const room = (zone: 'gym' | 'study', band: [string, string], manual: [string, string]): Raw => ({
    [`sensor.${zone}_effective_low`]: [band[0]],
    [`sensor.${zone}_effective_high`]: [band[1]],
    [`sensor.${zone}_room_temperature`]: ['18.0'],
    [`sensor.${zone}_current_action`]: ['idle'],
    [`sensor.${zone}_override_ends`]: ['unknown'],
    [`binary_sensor.${zone}_override_active`]: [adjusted ? 'on' : 'off'],
    [`number.${zone}_manual_low`]: [manual[0]],
    [`number.${zone}_manual_high`]: [manual[1]],
    [`sensor.${zone}_next_band_change`]: [
      new Date(NEXT[zone]).toISOString(),
      { scheduled: true, low: 18, high: 23 },
    ],
  });
  const raw: Raw = {
    ...room('gym', ['19.5', '22.5'], ['19', '22']),
    ...room('study', ['16', '18'], ['16.5', '17.5']),
  };
  const states: Record<string, HassEntity> = {};
  for (const [id, [state, attributes = {}]] of Object.entries(raw)) {
    states[id] = { entity_id: id, state, attributes, last_changed: '', last_updated: '' };
  }
  const callService = vi.fn().mockResolvedValue(undefined);
  const hass: HomeAssistant = {
    states,
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: callService as unknown as HomeAssistant['callService'],
    callWS: vi.fn().mockResolvedValue(undefined),
    locale: { language: 'en-GB', time_format: '24' },
    // v0.25.0's, for "Until".
    services: {
      comfort_band: {
        start_override: { fields: { zone: {}, low: {}, high: {}, hours: {}, until: {} } },
      },
    },
  };
  /** The next call waits until the returned handle settles it. */
  const hold = () => {
    const handle = { resolve: () => {}, reject: () => {} };
    callService.mockImplementationOnce(
      () =>
        new Promise<void>((res, rej) => {
          handle.resolve = () => res();
          handle.reject = () => rej(new Error('Entity not available'));
        }),
    );
    return handle;
  };
  return { hass, callService, hold };
}

async function flush(el: ComfortBandNowTab): Promise<void> {
  for (let i = 0; i < 50; i++) await Promise.resolve();
  await el.updateComplete;
}

async function gymTab(hass: HomeAssistant): Promise<ComfortBandNowTab> {
  vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] });
  vi.setSystemTime(NOW);
  return mount('comfort-band-now-tab', { hass, entities: entitiesOf('gym'), zone: 'gym' });
}

/** The card moves on to the study, as the modal passes it: both at once. */
async function moveToStudy(el: ComfortBandNowTab): Promise<void> {
  el.zone = 'study';
  el.entities = entitiesOf('study');
  await flush(el);
}

const root = (el: ComfortBandNowTab) => el.shadowRoot!;

async function tap(el: ComfortBandNowTab, which: 'warmer' | 'cooler', times = 1) {
  for (let i = 0; i < times; i++) {
    (root(el).querySelector(`.steps .${which}`) as HTMLElement).click();
  }
  await el.updateComplete;
}

async function pick(el: ComfortBandNowTab, length: '1' | '3' | 'next') {
  (root(el).querySelector(`.lengths button[data-length="${length}"]`) as HTMLElement).click();
  await flush(el);
}

const calls = (callService: ReturnType<typeof vi.fn>) =>
  callService.mock.calls.map((c) => [c[1], c[2]]);
const statusText = (el: ComfortBandNowTab) =>
  root(el).querySelector('.status span')!.textContent!.trim();
const pressed = (el: ComfortBandNowTab) =>
  Array.from(root(el).querySelectorAll('.lengths button[aria-pressed="true"]')).map((b) =>
    b.getAttribute('data-length'),
  );

describe('Now tab: taps held when the card moves to another room (#52)', () => {
  it('sends them at once to the room they were made in, from its range', async () => {
    const { hass, callService } = setup();
    const el = await gymTab(hass);
    await tap(el, 'warmer', 2);
    expect(callService).not.toHaveBeenCalled();

    await moveToStudy(el);

    expect(calls(callService)).toEqual([
      ['start_override', { zone: 'gym', low: 20.5, high: 23.5, hours: 3 }],
    ]);
  });

  it('sends nothing more, and nothing to the new room, when their 1.5 s are up', async () => {
    const { hass, callService } = setup();
    const el = await gymTab(hass);
    await tap(el, 'warmer', 2);
    await moveToStudy(el);

    await vi.advanceTimersByTimeAsync(3_000);
    await flush(el);

    expect(calls(callService)).toEqual([
      ['start_override', { zone: 'gym', low: 20.5, high: 23.5, hours: 3 }],
    ]);
  });

  it('leaves the new room with none held: its status, and its own taps from its range', async () => {
    const { hass, callService } = setup();
    const el = await gymTab(hass);
    await tap(el, 'warmer', 2);
    expect(statusText(el)).toContain('Adjusting to 20.5–23.5°');

    await moveToStudy(el);
    expect(statusText(el)).not.toContain('Adjusting');
    expect(statusText(el)).toContain('16–18°');

    await tap(el, 'warmer');
    expect(statusText(el)).toContain('Adjusting to 16.5–18.5°');
    await vi.advanceTimersByTimeAsync(1_500);
    await flush(el);

    expect(calls(callService)).toEqual([
      ['start_override', { zone: 'gym', low: 20.5, high: 23.5, hours: 3 }],
      ['start_override', { zone: 'study', low: 16.5, high: 18.5, hours: 3 }],
    ]);
  });

  it("doesn't hold up the new room's controls or status while it goes through", async () => {
    const { hass, callService, hold } = setup();
    const el = await gymTab(hass);
    await tap(el, 'warmer', 2);
    const gym = hold();

    await moveToStudy(el);
    expect(callService).toHaveBeenCalledTimes(1);

    const controls = Array.from(root(el).querySelectorAll('.lengths button, .steps button'));
    expect(controls.length).toBeGreaterThan(0);
    expect(controls.map((b) => b.getAttribute('aria-disabled'))).toEqual(
      controls.map(() => 'false'),
    );
    expect(statusText(el)).not.toContain('Adjusting');

    // The study's own taps go through meanwhile.
    await tap(el, 'cooler');
    await vi.advanceTimersByTimeAsync(1_500);
    await flush(el);
    expect(calls(callService)[1]).toEqual([
      'start_override',
      { zone: 'study', low: 15.5, high: 17.5, hours: 3 },
    ]);
    gym.resolve();
    await flush(el);
  });

  it("leaves a refusal to HA's toast, keeping the length the new room shows", async () => {
    const { hass, callService, hold } = setup();
    const el = await gymTab(hass);
    await tap(el, 'warmer');
    // Picked during the gym's taps, from none picked (three hours shown).
    await pick(el, '3');
    const gym = hold();
    await moveToStudy(el);
    // Picked for the study before the gym's answer comes.
    await pick(el, '1');
    expect(pressed(el)).toEqual(['1']);

    gym.reject();
    await flush(el);

    expect(pressed(el)).toEqual(['1']);
    // HA's own toast: the call isn't made quiet.
    expect(callService.mock.calls[0][4]).toBeUndefined();
    expect(calls(callService)).toEqual([
      ['start_override', { zone: 'gym', low: 20, high: 23, hours: 3 }],
    ]);
  });

  it('re-times the room they were made in when a length was picked and they cancel out', async () => {
    const { hass, callService } = setup({ adjusted: true });
    const el = await gymTab(hass);
    await tap(el, 'warmer');
    await tap(el, 'cooler');
    await pick(el, '1');
    expect(callService).not.toHaveBeenCalled();

    await moveToStudy(el);
    await vi.advanceTimersByTimeAsync(3_000);
    await flush(el);

    expect(calls(callService)).toEqual([
      ['start_override', { zone: 'gym', low: 19, high: 22, hours: 1 }],
    ]);
  });

  it("sends an Until picked during them for their room's next change", async () => {
    const { hass, callService } = setup();
    const el = await gymTab(hass);
    await tap(el, 'warmer');
    await pick(el, 'next');

    await moveToStudy(el);

    expect(calls(callService)).toEqual([
      [
        'start_override',
        { zone: 'gym', low: 20, high: 23, until: new Date(NEXT.gym).toISOString() },
      ],
    ]);
  });

  it('keeps holding them while the card stays on the same room', async () => {
    const { hass, callService } = setup();
    const el = await gymTab(hass);
    await tap(el, 'warmer', 2);

    // As the card passes them on each HA update: new objects, same room.
    el.hass = { ...hass, states: { ...hass.states } };
    el.entities = entitiesOf('gym');
    el.zone = 'gym';
    await flush(el);
    await vi.advanceTimersByTimeAsync(1_499);
    await flush(el);
    expect(callService).not.toHaveBeenCalled();
    expect(statusText(el)).toContain('Adjusting to 20.5–23.5°');

    await vi.advanceTimersByTimeAsync(1);
    await flush(el);
    expect(calls(callService)).toEqual([
      ['start_override', { zone: 'gym', low: 20.5, high: 23.5, hours: 3 }],
    ]);
  });
});
