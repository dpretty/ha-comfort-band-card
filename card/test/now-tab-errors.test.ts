import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HassEntity, HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// #27: a change HA refuses is told in the tab, in plain words, in place of
// HA's own toast.

afterEach(() => {
  teardown();
  vi.useRealTimers();
});

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
  roomSensorUnavailable: 'binary_sensor.gym_room_sensor_unavailable',
} as unknown as ZoneEntities;

const ADJUST = 'Couldn’t adjust the room. Try again.';
const RETIME = 'Couldn’t change how long the adjustment lasts. Try again.';

/** Each call's answer: given, or settled later through its handle. */
interface Held {
  resolve: () => void;
  reject: () => void;
}

/**
 * HA for a room at 19.5–22.5°, set by a schedule (with `scheduled`), or
 * adjusted (with `adjusted`). Calls go through unless `refuse` or `hold`
 * says otherwise for the next one.
 */
function setup({
  adjusted = false,
  scheduled = true as boolean | null,
  next = null as number | null,
  sensorOffline = false,
  band = ['19.5', '22.5'],
} = {}) {
  const raw: Record<string, [string, Record<string, unknown>?]> = {
    'sensor.gym_effective_low': [band[0]],
    'sensor.gym_effective_high': [band[1]],
    'sensor.gym_room_temperature': ['21.0'],
    'sensor.gym_current_action': ['idle'],
    'sensor.gym_override_ends': ['unknown'],
    'binary_sensor.gym_override_active': [adjusted ? 'on' : 'off'],
    'number.gym_manual_low': ['19'],
    'number.gym_manual_high': ['22'],
    'binary_sensor.gym_room_sensor_unavailable': [sensorOffline ? 'on' : 'off'],
  };
  if (scheduled !== null) {
    raw['sensor.gym_next_band_change'] = [
      next === null ? 'unknown' : new Date(next).toISOString(),
      { scheduled, low: 18, high: 23 },
    ];
  }
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
  const refuse = () => callService.mockRejectedValueOnce(new Error('Entity not available'));
  const hold = (): Held => {
    const held: Held = { resolve: () => {}, reject: () => {} };
    callService.mockImplementationOnce(
      () =>
        new Promise<void>((res, rej) => {
          held.resolve = () => res();
          held.reject = () => rej(new Error('Entity not available'));
        }),
    );
    return held;
  };
  return { hass, callService, refuse, hold };
}

async function flush(el: ComfortBandNowTab): Promise<void> {
  for (let i = 0; i < 50; i++) await Promise.resolve();
  await el.updateComplete;
}

async function nowTab(hass: HomeAssistant): Promise<ComfortBandNowTab> {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  return mount('comfort-band-now-tab', { hass, entities: ENTITIES, zone: 'gym' });
}

const root = (el: ComfortBandNowTab) => el.shadowRoot!;
const text = (n: Element | null | undefined) => n?.textContent?.replace(/\s+/g, ' ').trim();
const failed = (el: ComfortBandNowTab) => root(el).querySelector<HTMLElement>('.refusal');
const status = (el: ComfortBandNowTab) => text(root(el).querySelector('.status span'));
const lengths = (el: ComfortBandNowTab) =>
  Array.from(root(el).querySelectorAll('.lengths button')).map((b) => ({
    text: text(b),
    checked: b.getAttribute('aria-pressed') === 'true',
  }));
const pill = (el: ComfortBandNowTab, label: string) =>
  root(el).querySelector<HTMLButtonElement>(`[data-feedback="${label}"]`)!;
const said = (el: ComfortBandNowTab) => text(root(el).querySelector('.sr-only[role="status"]'));
const css = () =>
  (
    customElements.get('comfort-band-now-tab') as unknown as {
      styles: Array<{ cssText: string }>;
    }
  ).styles
    .flat()
    .map((st) => st.cssText)
    .join('\n');

/** The haptic events the tab sends HA's frontend, by type. */
function haptics(): string[] {
  const seen: string[] = [];
  const on = (e: Event) => seen.push(String((e as CustomEvent).detail));
  window.addEventListener('haptic', on);
  afterEachCleanup.push(() => window.removeEventListener('haptic', on));
  return seen;
}
const afterEachCleanup: Array<() => void> = [];
afterEach(() => afterEachCleanup.splice(0).forEach((f) => f()));

/** Taps, then waits out the burst so the change is sent. */
async function tap(el: ComfortBandNowTab, which: 'warmer' | 'cooler', times = 1): Promise<void> {
  for (let i = 0; i < times; i++) root(el).querySelector<HTMLElement>(`.steps .${which}`)!.click();
  await el.updateComplete;
  vi.advanceTimersByTime(1_500);
  await flush(el);
}

async function pick(el: ComfortBandNowTab, length: '1' | '3' | 'next'): Promise<void> {
  root(el).querySelector<HTMLElement>(`.lengths button[data-length="${length}"]`)!.click();
  await flush(el);
}

async function back(el: ComfortBandNowTab): Promise<void> {
  root(el).querySelector<HTMLElement>('.back')!.click();
  await flush(el);
}

describe('comfort-band-now-tab when HA refuses a change', () => {
  it('says a refused Warmer or Cooler change in plain words, under the status', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    expect(text(failed(el))).toBe(ADJUST);
    expect(failed(el)!.getAttribute('role')).toBe('alert');
    expect(failed(el)!.previousElementSibling!.classList.contains('status')).toBe(true);
    // The status is what's in force again.
    expect(status(el)).toBe('Comfortable · 19.5–22.5°');
  });

  it('asks HA for no toast of its own', async () => {
    const { hass, callService } = setup({ adjusted: true });
    const el = await nowTab(hass);
    await tap(el, 'cooler');
    await back(el);
    expect(callService.mock.calls).toEqual([
      [
        'comfort_band',
        'start_override',
        { zone: 'gym', low: 19, high: 22, hours: 3 },
        undefined,
        false,
      ],
      ['comfort_band', 'cancel_override', { zone: 'gym' }, undefined, false],
    ]);
  });

  it('leaves taps sent as the tab closes to HA’s toast, and says nothing', async () => {
    const { hass, callService, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await el.updateComplete;
    el.remove();
    await flush(el);
    expect(callService.mock.calls).toEqual([
      ['comfort_band', 'start_override', { zone: 'gym', low: 20, high: 23, hours: 3 }],
    ]);
    document.body.appendChild(el);
    await flush(el);
    expect(failed(el)).toBeNull();
  });

  it('says nothing of a change refused after the tab has closed', async () => {
    const { hass, hold } = setup();
    const el = await nowTab(hass);
    const held = hold();
    await tap(el, 'warmer');
    el.remove();
    held.reject();
    await flush(el);
    document.body.appendChild(el);
    await flush(el);
    expect(failed(el)).toBeNull();
  });

  it('says a refused re-time, and shows the length picked before as picked again', async () => {
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    await pick(el, '1');
    expect(lengths(el)).toEqual([
      { text: '1 h', checked: true },
      { text: '3 h', checked: false },
    ]);
    await pick(el, '3');
    refuse();
    await pick(el, '1');
    expect(text(failed(el))).toBe(RETIME);
    expect(lengths(el)).toEqual([
      { text: '1 h', checked: false },
      { text: '3 h', checked: true },
    ]);
  });

  // What's put back is the length from before the burst's first pick.
  it('shows the length from before a burst again where the burst is refused', async () => {
    const { hass, refuse } = setup({ adjusted: true, next: Date.now() + 5 * 3_600_000 });
    const el = await nowTab(hass);
    await pick(el, '1');
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await pick(el, 'next');
    await pick(el, '3');
    refuse();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(text(failed(el))).toBe(ADJUST);
    expect(lengths(el).map((l) => l.checked)).toEqual([true, false, false]);
  });

  it('shows the length from before a re-time in a burst again where it’s refused', async () => {
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    root(el).querySelector<HTMLElement>('.steps .cooler')!.click();
    await pick(el, '1');
    refuse();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(text(failed(el))).toBe(RETIME);
    expect(lengths(el)[1]).toEqual({ text: '3 h', checked: true });
  });

  it('shows “Until” picked again where a re-time from it is refused', async () => {
    const { hass, refuse } = setup({ adjusted: true, next: Date.now() + 5 * 3_600_000 });
    const el = await nowTab(hass);
    await pick(el, 'next');
    refuse();
    await pick(el, '1');
    expect(text(failed(el))).toBe(RETIME);
    expect(lengths(el).map((l) => l.checked)).toEqual([false, false, true]);
  });

  it('keeps the length picked where the change goes through', async () => {
    const { hass } = setup({ adjusted: true });
    const el = await nowTab(hass);
    await pick(el, '1');
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
    expect(failed(el)).toBeNull();
  });

  it('keeps a length picked with nothing adjusted, which sends nothing', async () => {
    const { hass, callService } = setup();
    const el = await nowTab(hass);
    await pick(el, '1');
    expect(callService).not.toHaveBeenCalled();
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
  });

  it('says a refused Back to schedule', async () => {
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    refuse();
    await back(el);
    expect(text(failed(el))).toBe('Couldn’t go back to the schedule. Try again.');
  });

  it('says a refused End adjustment', async () => {
    const { hass, refuse } = setup({ adjusted: true, scheduled: null });
    const el = await nowTab(hass);
    expect(text(root(el).querySelector('.back'))).toBe('End adjustment');
    refuse();
    await back(el);
    expect(text(failed(el))).toBe('Couldn’t end the adjustment. Try again.');
  });

  it('says it under the status, above what the status needs explaining', async () => {
    const { hass, refuse } = setup({ sensorOffline: true });
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    expect(failed(el)!.previousElementSibling!.classList.contains('status')).toBe(true);
    expect(failed(el)!.nextElementSibling!.classList.contains('notice')).toBe(true);
  });

  it('keeps saying it through HA’s updates and the time passing', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    el.hass = { ...hass, states: { ...hass.states } };
    vi.advanceTimersByTime(10 * 60_000);
    await flush(el);
    expect(text(failed(el))).toBe(ADJUST);
    expect(failed(el)!.getAttribute('role')).toBe('alert');
  });

  it('puts it away at the next press, keeping its place after, so nothing moves again', async () => {
    const { hass, refuse, hold } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    root(el).querySelector<HTMLElement>('.steps .cooler')!.click();
    await el.updateComplete;
    // Its place is kept, empty and unread, while the taps go on.
    expect(failed(el)!.classList.contains('held')).toBe(true);
    expect(failed(el)!.getAttribute('aria-hidden')).toBe('true');
    expect(failed(el)!.hasAttribute('role')).toBe(false);
    expect(text(failed(el))).toBe(ADJUST);
    const held = hold();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    // And while the change goes through, and after.
    expect(failed(el)!.classList.contains('held')).toBe(true);
    held.resolve();
    await flush(el);
    expect(failed(el)!.classList.contains('held')).toBe(true);
    expect(text(failed(el))).toBe(ADJUST);
  });

  it('keeps its place at a tap past a limit, which sends nothing', async () => {
    const { hass, callService, refuse } = setup({ band: ['30', '35'] });
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'cooler');
    expect(text(failed(el))).toBe(ADJUST);
    await tap(el, 'warmer');
    expect(callService).toHaveBeenCalledTimes(1);
    expect(failed(el)!.classList.contains('held')).toBe(true);
  });

  it('shows its line laid out, the icon beside the words', () => {
    expect(css()).toMatch(/\.refusal\s*\{[^}]*display:\s*flex/);
    expect(css()).not.toMatch(/\.refusal\s*\{[^}]*display:\s*none/);
  });

  it('gives HA’s failure vibration for a refused change, and only then', async () => {
    const seen = haptics();
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    expect(seen).toEqual([]);
    refuse();
    await tap(el, 'cooler');
    expect(seen).toEqual(['failure']);
  });

  // In HA the tab is inside the card's and the modal's shadow roots.
  it('sends the vibration out of the shadow roots it’s in', async () => {
    const seen = haptics();
    const { hass, refuse } = setup();
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const host = document.createElement('div');
    document.body.appendChild(host);
    const el = document.createElement('comfort-band-now-tab');
    Object.assign(el, { hass, entities: ENTITIES, zone: 'gym' });
    host.attachShadow({ mode: 'open' }).appendChild(el);
    await el.updateComplete;
    refuse();
    await tap(el, 'warmer');
    expect(seen).toEqual(['failure']);
  });

  it('leaves the vibration to HA for taps sent as the tab closes', async () => {
    const seen = haptics();
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await el.updateComplete;
    el.remove();
    await flush(el);
    expect(seen).toEqual([]);
  });

  it('says a second refusal afresh, as a new alert', async () => {
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    const first = failed(el);
    refuse();
    await back(el);
    expect(text(failed(el))).toBe('Couldn’t go back to the schedule. Try again.');
    expect(failed(el)!.getAttribute('role')).toBe('alert');
    expect(failed(el)).not.toBe(first);
  });

  it('keeps its place where the taps after it cancel out, sending nothing', async () => {
    const { hass, callService, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await tap(el, 'cooler');
    expect(callService).toHaveBeenCalledTimes(1);
    expect(failed(el)!.classList.contains('held')).toBe(true);
  });

  it('is put away by a length picked with nothing adjusted, keeping its place', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    await pick(el, '1');
    expect(failed(el)!.classList.contains('held')).toBe(true);
  });

  it('keeps its place hidden, at the size it had', () => {
    const css = (
      customElements.get('comfort-band-now-tab') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((st) => st.cssText)
      .join('\n');
    expect(css).toMatch(/\.refusal\.held\s*\{[^}]*visibility:\s*hidden/);
  });

  it('is put away by a feedback tap too, keeping its place', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    pill(el, 'just_right').click();
    await flush(el);
    expect(failed(el)!.classList.contains('held')).toBe(true);
  });

  it('says nothing after a change goes through', async () => {
    const { hass } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    expect(failed(el)).toBeNull();
  });

  it('goes when the tab closes', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    expect(text(failed(el))).toBe(ADJUST);
    el.remove();
    document.body.appendChild(el);
    await flush(el);
    expect(failed(el)).toBeNull();
  });
});

describe('comfort-band-now-tab when HA refuses feedback', () => {
  it('marks the pill “Not sent”, says so to screen readers, then puts it back', async () => {
    const { hass, callService, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Not sent');
    expect(pill(el, 'too_cold').classList.contains('failed')).toBe(true);
    expect(said(el)).toBe('Your feedback wasn’t sent.');
    expect(callService).toHaveBeenCalledWith(
      'comfort_band',
      'record_feedback',
      { zone: 'gym', label: 'too_cold' },
      undefined,
      false,
    );
    // Not in the line under the status: feedback isn't a change to the room.
    expect(failed(el)).toBeNull();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
    expect(pill(el, 'too_cold').classList.contains('failed')).toBe(false);
    expect(said(el)).toBe('');
  });

  it('says each refusal to screen readers afresh, though the words are the same', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    const region = root(el).querySelector('.sr-only[role="status"]')!;
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    const first = region.firstElementChild;
    expect(text(first)).toBe('Your feedback wasn’t sent.');
    refuse();
    pill(el, 'too_hot').click();
    await flush(el);
    // The same region, its words new: a live region says what's added to it.
    expect(root(el).querySelector('.sr-only[role="status"]')).toBe(region);
    expect(region.firstElementChild).not.toBe(first);
    expect(said(el)).toBe('Your feedback wasn’t sent.');
  });

  it('gives HA’s failure vibration for a refused feedback tap', async () => {
    const seen = haptics();
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    pill(el, 'too_hot').click();
    await flush(el);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    expect(seen).toEqual(['failure']);
  });

  it('stops thanking another pill when a later tap is refused', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    pill(el, 'too_hot').click();
    await flush(el);
    expect(text(pill(el, 'too_hot'))).toBe('Thanks!');
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    expect(text(pill(el, 'too_hot'))).toBe('Too warm');
    expect(text(pill(el, 'too_cold'))).toBe('Not sent');
  });

  it('marks a refused pill without changing its size', () => {
    const rule = css().match(/\.feedback-pill\.failed\s*\{([^}]*)\}/)![1];
    expect(rule).toMatch(/box-shadow:\s*inset 0 0 0 1px/);
    expect(rule).not.toMatch(/border(-width)?:\s*\d/);
    expect(rule).not.toMatch(/padding|width|height/);
  });

  it('keeps its words for screen readers off the screen', () => {
    const rule = css().match(/\.sr-only\s*\{([^}]*)\}/)![1];
    expect(rule).toMatch(/position:\s*absolute/);
    expect(rule).toMatch(/clip-path:\s*inset\(50%\)/);
    expect(rule).toMatch(/width:\s*1px/);
    expect(rule).toMatch(/height:\s*1px/);
  });

  it('stops saying “Not sent” when the tab closes', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    el.remove();
    document.body.appendChild(el);
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
    expect(said(el)).toBe('');
  });

  it('thanks the next tap on its own pill, and stops saying “Not sent”', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    pill(el, 'too_hot').click();
    await flush(el);
    expect(text(pill(el, 'too_hot'))).toBe('Thanks!');
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
    expect(said(el)).toBe('');
  });

  it('marks only the last tap, where an earlier one is refused after it', async () => {
    const { hass, hold } = setup();
    const el = await nowTab(hass);
    const held = hold();
    pill(el, 'too_cold').click();
    pill(el, 'too_hot').click();
    await flush(el);
    held.reject();
    await flush(el);
    expect(text(pill(el, 'too_hot'))).toBe('Thanks!');
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
    expect(said(el)).toBe('');
  });

  it('says “Not sent” where the last tap is refused after an earlier one went through', async () => {
    const { hass, hold } = setup();
    const el = await nowTab(hass);
    pill(el, 'too_cold').click();
    const held = hold();
    pill(el, 'too_hot').click();
    await flush(el);
    held.reject();
    await flush(el);
    expect(text(pill(el, 'too_hot'))).toBe('Not sent');
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
  });
});
