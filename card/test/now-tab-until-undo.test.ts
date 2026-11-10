import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HassEntity, HomeAssistant } from '../src/types.js';
import { formatTime } from '../src/now-status.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// #26: "Until 9 pm", the schedule's next change. #25: Undo after a change
// made here. Both need integration v0.25.0, told by its services' fields.

afterEach(() => {
  teardown();
  vi.useRealTimers();
});

const NOW = Date.parse('2026-10-22T10:00:00Z');
const HOUR = 3_600_000;
const NEXT = NOW + 5 * HOUR;

const ENTITIES = {
  effectiveLow: 'sensor.gym_effective_low',
  effectiveHigh: 'sensor.gym_effective_high',
  roomTemperature: 'sensor.gym_room_temperature',
  overrideEnds: 'sensor.gym_override_ends',
  nextBandChange: 'sensor.gym_next_band_change',
  currentAction: 'sensor.gym_current_action',
  overrideActive: 'binary_sensor.gym_override_active',
  manualLow: 'number.gym_manual_low',
  manualHigh: 'number.gym_manual_high',
} as unknown as ZoneEntities;

/** v0.25.0's services, as HA describes them. */
const SERVICES = {
  comfort_band: {
    start_override: { fields: { zone: {}, low: {}, high: {}, hours: {}, until: {} } },
    cancel_override: { fields: { zone: {}, low: {}, high: {} } },
  },
};

type States = Record<string, { state: string; attributes?: Record<string, unknown> }>;

/**
 * HA for a room whose schedule sets 19.5–22.5° now and next changes at
 * `next`, with the services of `services`. Its `start_override` and
 * `cancel_override` change its states as the integration does, held back
 * until `deliver` hands them to the card, as HA's frontend would.
 */
function setup(
  over: States = {},
  { services = SERVICES as HomeAssistant['services'], next = NEXT as number | null } = {},
) {
  const base: States = {
    'sensor.gym_effective_low': { state: '19.5' },
    'sensor.gym_effective_high': { state: '22.5' },
    'sensor.gym_room_temperature': { state: '21.0' },
    'sensor.gym_current_action': { state: 'idle' },
    'sensor.gym_override_ends': { state: 'unknown' },
    'binary_sensor.gym_override_active': { state: 'off' },
    'number.gym_manual_low': { state: '19' },
    'number.gym_manual_high': { state: '22' },
    'sensor.gym_next_band_change': {
      state: next === null ? 'unknown' : new Date(next).toISOString(),
      attributes: { scheduled: true, low: 18, high: 23 },
    },
    ...over,
  };
  const states: Record<string, HassEntity> = {};
  const put = (id: string, state: string, attributes: Record<string, unknown> = {}) => {
    states[id] = { entity_id: id, state, attributes, last_changed: '', last_updated: '' };
  };
  /** HA's latest states, as the frontend hands them to the card. */
  const deliver = async (el: ComfortBandNowTab): Promise<void> => {
    el.hass = { ...el.hass!, states: { ...states } };
    await flush(el);
  };
  for (const [id, s] of Object.entries(base)) put(id, s.state, s.attributes);
  // What the integration does, without delivering it yet.
  const callService = vi.fn(async (_d: string, service: string, data: Record<string, unknown>) => {
    if (data.low !== undefined) put('number.gym_manual_low', String(data.low));
    if (data.high !== undefined) put('number.gym_manual_high', String(data.high));
    if (service === 'start_override') {
      put('binary_sensor.gym_override_active', 'on');
      const ends =
        typeof data.until === 'string'
          ? Date.parse(data.until)
          : Date.now() + Number(data.hours ?? 3) * HOUR;
      put('sensor.gym_override_ends', new Date(ends).toISOString());
      put('sensor.gym_effective_low', String(data.low ?? states['number.gym_manual_low'].state));
      put('sensor.gym_effective_high', String(data.high ?? states['number.gym_manual_high'].state));
    } else if (service === 'cancel_override') {
      put('binary_sensor.gym_override_active', 'off');
      put('sensor.gym_override_ends', 'unknown');
      put('sensor.gym_effective_low', '19.5');
      put('sensor.gym_effective_high', '22.5');
    }
  });
  const hass: HomeAssistant = {
    states: { ...states },
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: callService as unknown as HomeAssistant['callService'],
    callWS: vi.fn().mockResolvedValue(undefined),
    services,
    locale: { language: 'en-GB', time_format: '24' },
  };
  return { hass, put, deliver };
}

async function flush(el: ComfortBandNowTab): Promise<void> {
  for (let i = 0; i < 50; i++) await Promise.resolve();
  await el.updateComplete;
}

async function nowTab(hass: HomeAssistant): Promise<ComfortBandNowTab> {
  vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] });
  vi.setSystemTime(NOW);
  return mount('comfort-band-now-tab', { hass, entities: ENTITIES, zone: 'gym' });
}

const root = (el: ComfortBandNowTab) => el.shadowRoot!;
const lengths = (el: ComfortBandNowTab) =>
  Array.from(root(el).querySelectorAll('.lengths button')).map((b) => ({
    text: b.textContent!.trim(),
    checked: b.getAttribute('aria-pressed') === 'true',
  }));
const undoButton = (el: ComfortBandNowTab) => root(el).querySelector<HTMLButtonElement>('.undo');
const calls = (hass: HomeAssistant) =>
  (hass.callService as unknown as ReturnType<typeof vi.fn>).mock.calls.map((c) => [c[1], c[2]]);
const status = (el: ComfortBandNowTab) =>
  root(el).querySelector('.status span')!.textContent!.trim();

async function pick(el: ComfortBandNowTab, length: '1' | '3' | 'next'): Promise<void> {
  root(el).querySelector<HTMLElement>(`.lengths button[data-length="${length}"]`)!.click();
  await flush(el);
}

/** Taps, then waits out the burst so the change is sent. */
async function tap(el: ComfortBandNowTab, which: 'warmer' | 'cooler', times = 1): Promise<void> {
  for (let i = 0; i < times; i++) root(el).querySelector<HTMLElement>(`.steps .${which}`)!.click();
  await el.updateComplete;
  vi.advanceTimersByTime(1_500);
  await flush(el);
}

async function back(el: ComfortBandNowTab): Promise<void> {
  root(el).querySelector<HTMLElement>('.back')!.click();
  await flush(el);
}

async function undo(el: ComfortBandNowTab): Promise<void> {
  undoButton(el)!.click();
  await flush(el);
}

describe('comfort-band-now-tab until the next change', () => {
  it('offers the schedule’s next change as a length, in HA’s clock', async () => {
    const { hass } = setup();
    const el = await nowTab(hass);
    expect(lengths(el)).toEqual([
      { text: '1 h', checked: false },
      { text: '3 h', checked: true },
      { text: `Until ${formatTime(NEXT, hass)}`, checked: false },
    ]);
  });

  it('isn’t offered by an integration before v0.25.0', async () => {
    const { hass } = setup(
      {},
      { services: { comfort_band: { start_override: { fields: { hours: {} } } } } },
    );
    const el = await nowTab(hass);
    expect(lengths(el).map((l) => l.text)).toEqual(['1 h', '3 h']);
    const none = await nowTab(setup({}, { services: {} }).hass);
    expect(lengths(none).map((l) => l.text)).toEqual(['1 h', '3 h']);
  });

  it('isn’t offered without a next change ahead', async () => {
    for (const next of [null, NOW - HOUR]) {
      const el = await nowTab(setup({}, { next }).hass);
      expect(lengths(el).map((l) => l.text)).toEqual(['1 h', '3 h']);
      el.remove();
    }
  });

  it('sends a change until the next change, as HA’s time of it', async () => {
    const { hass } = setup();
    const el = await nowTab(hass);
    await pick(el, 'next');
    expect(lengths(el).map((l) => l.checked)).toEqual([false, false, true]);
    await tap(el, 'warmer');
    expect(calls(hass)).toEqual([
      ['start_override', { zone: 'gym', low: 20, high: 23, until: new Date(NEXT).toISOString() }],
    ]);
  });

  it('re-times a running adjustment to the next change', async () => {
    const { hass } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(NOW + HOUR).toISOString() },
      'number.gym_manual_low': { state: '20' },
      'number.gym_manual_high': { state: '23.5' },
    });
    const el = await nowTab(hass);
    await pick(el, 'next');
    expect(calls(hass)).toEqual([
      ['start_override', { zone: 'gym', low: 20, high: 23.5, until: new Date(NEXT).toISOString() }],
    ]);
  });

  // Picked, then the change passes: three hours, as shown.
  it('goes back to three hours once the next change has passed', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await pick(el, 'next');
    vi.setSystemTime(NEXT + 1);
    await deliver(el);
    expect(lengths(el)).toEqual([
      { text: '1 h', checked: false },
      { text: '3 h', checked: true },
    ]);
    await tap(el, 'cooler');
    expect(calls(hass)).toEqual([['start_override', { zone: 'gym', low: 19, high: 22, hours: 3 }]]);
  });
});

describe('comfort-band-now-tab Undo', () => {
  it('puts back the schedule and the manual band after a change, once HA shows it', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    // HA's states may come after the call: Undo waits for them.
    expect(undoButton(el)).toBeNull();
    await deliver(el);
    const button = undoButton(el)!;
    expect(button.textContent!.trim()).toBe('Undo');
    expect(button.getAttribute('aria-label')).toBe('Undo: back to the schedule');
    await undo(el);
    expect(calls(hass)[1]).toEqual(['cancel_override', { zone: 'gym', low: 19, high: 22 }]);
    expect(undoButton(el)).toBeNull();
  });

  it('puts back an earlier adjustment with its own end', async () => {
    const ends = NOW + 2 * HOUR;
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(ends).toISOString() },
      'number.gym_manual_low': { state: '20.5' },
      'number.gym_manual_high': { state: '23' },
      'sensor.gym_effective_low': { state: '20.5' },
      'sensor.gym_effective_high': { state: '23' },
    });
    const el = await nowTab(hass);
    await tap(el, 'cooler', 2);
    await deliver(el);
    expect(undoButton(el)!.getAttribute('aria-label')).toBe(
      `Undo: back to 20.5–23° until ${formatTime(ends, hass)}`,
    );
    await undo(el);
    expect(calls(hass)[1]).toEqual([
      'start_override',
      { zone: 'gym', low: 20.5, high: 23, until: new Date(ends).toISOString() },
    ]);
  });

  // It would have ended by now: ending it is what putting it back means.
  it('ends an earlier adjustment whose end has passed meanwhile', async () => {
    const ends = NOW + 2 * HOUR;
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(ends).toISOString() },
      'number.gym_manual_low': { state: '20.5' },
      'number.gym_manual_high': { state: '23' },
    });
    const el = await nowTab(hass);
    await pick(el, '1');
    await deliver(el);
    vi.setSystemTime(ends - 1_000);
    await deliver(el);
    expect(undoButton(el)!.getAttribute('aria-label')).toBe('Undo: back to the schedule');
    await undo(el);
    expect(calls(hass)[1]).toEqual(['cancel_override', { zone: 'gym', low: 20.5, high: 23 }]);
  });

  it('ends the adjustment where putting back its end is refused', async () => {
    const ends = NOW + 2 * HOUR;
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(ends).toISOString() },
      'number.gym_manual_low': { state: '20.5' },
      'number.gym_manual_high': { state: '23' },
    });
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    const call = hass.callService as unknown as ReturnType<typeof vi.fn>;
    const real = call.getMockImplementation()!;
    call.mockImplementationOnce(async () => {
      throw new Error('`until` must be in the future');
    });
    await undo(el);
    expect(calls(hass).slice(1)).toEqual([
      ['start_override', { zone: 'gym', low: 20.5, high: 23, until: new Date(ends).toISOString() }],
      ['cancel_override', { zone: 'gym', low: 20.5, high: 23 }],
    ]);
    call.mockImplementation(real);
  });

  it('puts back an adjustment that Back to schedule ended', async () => {
    const ends = NOW + 2 * HOUR;
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(ends).toISOString() },
      'number.gym_manual_low': { state: '21' },
      'number.gym_manual_high': { state: '24' },
    });
    const el = await nowTab(hass);
    await back(el);
    await deliver(el);
    await undo(el);
    expect(calls(hass)[1]).toEqual([
      'start_override',
      { zone: 'gym', low: 21, high: 24, until: new Date(ends).toISOString() },
    ]);
  });

  // A new length keeps the band: Undo waits for the new end, and stays.
  it('undoes a new length once its end arrives', async () => {
    const ends = NOW + 2 * HOUR;
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(ends).toISOString() },
      'number.gym_manual_low': { state: '20' },
      'number.gym_manual_high': { state: '23' },
    });
    const el = await nowTab(hass);
    await pick(el, '1');
    // An update from HA without the new end yet: the old adjustment, its
    // band the same, isn't the change.
    el.hass = { ...el.hass!, states: { ...el.hass!.states } };
    await flush(el);
    expect(undoButton(el)).toBeNull();
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
    await undo(el);
    expect(calls(hass)[1]).toEqual([
      'start_override',
      { zone: 'gym', low: 20, high: 23, until: new Date(ends).toISOString() },
    ]);
  });

  it('goes when the adjustment changes from elsewhere, focus with it', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    undoButton(el)!.focus();
    put('sensor.gym_override_ends', new Date(NOW + 6 * HOUR).toISOString());
    await deliver(el);
    expect(undoButton(el)).toBeNull();
    expect(root(el).activeElement).toBe(root(el).querySelector('.steps button'));
  });

  it('goes when another change starts here', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    root(el).querySelector<HTMLElement>('.steps .cooler')!.click();
    await el.updateComplete;
    expect(undoButton(el)).toBeNull();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    await deliver(el);
    // The new change can be undone in its turn: back to the first.
    await undo(el);
    expect(calls(hass)[2][0]).toBe('start_override');
  });

  it('goes when a length is picked, or Back to schedule pressed', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    root(el).querySelector<HTMLElement>('.lengths button[data-length="1"]')!.click();
    await el.updateComplete;
    expect(undoButton(el)).toBeNull();
    await flush(el);
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
    root(el).querySelector<HTMLElement>('.back')!.click();
    await el.updateComplete;
    expect(undoButton(el)).toBeNull();
  });

  it('goes when the tab closes', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
    el.remove();
    document.body.appendChild(el);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('isn’t undone in its turn, and moves focus to the steps', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    undoButton(el)!.focus();
    await undo(el);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
    expect(root(el).activeElement).toBe(root(el).querySelector('.steps button'));
  });

  it('ignores presses while a call goes through, saying what it puts back', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    const call = hass.callService as unknown as ReturnType<typeof vi.fn>;
    const real = call.getMockImplementation()!;
    let finish: () => void = () => {};
    call.mockImplementationOnce(
      (...args: Parameters<typeof real>) =>
        new Promise<void>((r) => (finish = () => void real(...args).then(() => r()))),
    );
    undoButton(el)!.click();
    await el.updateComplete;
    expect(status(el)).toBe('Going back to the schedule');
    finish();
    await flush(el);
  });

  it('isn’t offered by an integration before v0.25.0', async () => {
    const { hass, deliver } = setup({}, { services: {} });
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('isn’t offered for a change HA refused', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    (hass.callService as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(async () => {
      throw new Error('refused');
    });
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });
});
