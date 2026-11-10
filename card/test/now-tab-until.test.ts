import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HassEntity, HomeAssistant } from '../src/types.js';
import { formatTime } from '../src/now-status.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// #26: "Until 9 pm", the schedule's next change. It needs integration
// v0.25.0, told by `start_override`'s fields.

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
const calls = (hass: HomeAssistant) =>
  (hass.callService as unknown as ReturnType<typeof vi.fn>).mock.calls.map((c) => [c[1], c[2]]);

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

  // Real browsers check the fit (320 px, "Until 10:30 pm" on at most two lines).
  it('keeps the time on one line, in a wider button', async () => {
    const { hass } = setup();
    const el = await nowTab(hass);
    const time = root(el).querySelector('.lengths button[data-length="next"] .time');
    expect(time!.textContent).toBe(formatTime(NEXT, hass));
    const css = (
      customElements.get('comfort-band-now-tab') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((x) => x.cssText)
      .join('\n');
    expect(css).toMatch(/\.lengths \.time\s*\{[^}]*white-space:\s*nowrap/);
    expect(css).toMatch(/\.lengths button\[data-length='next'\]\s*\{[^}]*flex:\s*1\.6/);
  });

  // It needs `start_override`'s `until` alone.
  it('is offered without cancel_override’s band', async () => {
    const services = {
      comfort_band: { start_override: { fields: { until: {} } }, cancel_override: { fields: {} } },
    };
    const el = await nowTab(setup({}, { services }).hass);
    expect(lengths(el).map((l) => l.text)).toEqual([
      '1 h',
      '3 h',
      `Until ${formatTime(NEXT, el.hass!)}`,
    ]);
  });

  it('isn’t offered where it can’t be told a schedule sets the range', async () => {
    const el = await nowTab(
      setup({
        'sensor.gym_next_band_change': { state: new Date(NEXT).toISOString(), attributes: {} },
      }).hass,
    );
    expect(lengths(el).map((l) => l.text)).toEqual(['1 h', '3 h']);
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

  // The button was there, and the change passed before it was pressed.
  it('sends three hours for a next change that passed before the press', async () => {
    const { hass } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'number.gym_manual_low': { state: '20' },
      'number.gym_manual_high': { state: '23' },
    });
    const el = await nowTab(hass);
    vi.setSystemTime(NEXT + 1);
    root(el).querySelector<HTMLElement>('.lengths button[data-length="next"]')!.click();
    await flush(el);
    expect(calls(hass)).toEqual([['start_override', { zone: 'gym', low: 20, high: 23, hours: 3 }]]);
    // And three hours is the length shown.
    expect(lengths(el)).toEqual([
      { text: '1 h', checked: false },
      { text: '3 h', checked: true },
    ]);
  });

  // Picked, then the change passes: three hours, as shown.
  // HA names the following change once this one passes: a picked "Until"
  // was for this one, so it's three hours again, not the next night's.
  it('goes back to three hours once the change it named has passed', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await pick(el, 'next');
    const following = NEXT + 14 * HOUR;
    vi.setSystemTime(NEXT + 1_000);
    put('sensor.gym_next_band_change', new Date(following).toISOString(), {
      scheduled: true,
      low: 18,
      high: 23,
    });
    await deliver(el);
    expect(lengths(el)).toEqual([
      { text: '1 h', checked: false },
      { text: '3 h', checked: true },
      { text: `Until ${formatTime(following, hass)}`, checked: false },
    ]);
    await tap(el, 'cooler');
    expect(calls(hass)).toEqual([['start_override', { zone: 'gym', low: 19, high: 22, hours: 3 }]]);
  });

  // Taps that cancel out, with "Until" picked meanwhile, re-time for the
  // length then in force: three hours once its change has passed.
  it('re-times for three hours where the change passes within the taps', async () => {
    const { hass } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(NOW + HOUR).toISOString() },
      'number.gym_manual_low': { state: '20' },
      'number.gym_manual_high': { state: '23' },
    });
    vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] });
    vi.setSystemTime(NEXT - 1_000);
    const el = await mount('comfort-band-now-tab', { hass, entities: ENTITIES, zone: 'gym' });
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await el.updateComplete;
    root(el).querySelector<HTMLElement>('.lengths button[data-length="next"]')!.click();
    await el.updateComplete;
    root(el).querySelector<HTMLElement>('.steps .cooler')!.click();
    await el.updateComplete;
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(calls(hass)).toEqual([['start_override', { zone: 'gym', low: 20, high: 23, hours: 3 }]]);
  });

  // Taps that cancel out, with "Until" picked meanwhile, and HA naming
  // another change before they're sent (a schedule edit): three hours, not
  // the change HA names now (#25/#26 review round 4).
  it('re-times for three hours where HA names another change within the taps', async () => {
    const { hass, put, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(NOW + HOUR).toISOString() },
      'number.gym_manual_low': { state: '20' },
      'number.gym_manual_high': { state: '23' },
    });
    const el = await nowTab(hass);
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await el.updateComplete;
    root(el).querySelector<HTMLElement>('.lengths button[data-length="next"]')!.click();
    await el.updateComplete;
    root(el).querySelector<HTMLElement>('.steps .cooler')!.click();
    await el.updateComplete;
    put('sensor.gym_next_band_change', new Date(NEXT + 9 * HOUR).toISOString(), {
      scheduled: true,
      low: 18,
      high: 23,
    });
    await deliver(el);
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(calls(hass)).toEqual([['start_override', { zone: 'gym', low: 20, high: 23, hours: 3 }]]);
  });

  // Before HA names the following change, the passed one isn't offered.
  it('goes back to three hours while the change it named is past', async () => {
    const { hass } = setup();
    const el = await nowTab(hass);
    await pick(el, 'next');
    vi.setSystemTime(NEXT + 1);
    el.hass = { ...el.hass! };
    await flush(el);
    expect(lengths(el)).toEqual([
      { text: '1 h', checked: false },
      { text: '3 h', checked: true },
    ]);
  });
});
