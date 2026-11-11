import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HassEntity, HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// #27: a change HA refuses is told in the tab, in plain words, as well as
// by HA's own toast.

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
  it('says a refused Warmer or Cooler change in plain words, under the controls', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    expect(text(failed(el))).toBe(ADJUST);
    expect(failed(el)!.getAttribute('role')).toBe('alert');
    expect(failed(el)!.previousElementSibling!.classList.contains('steps')).toBe(true);
    // The status is what's in force again.
    expect(status(el)).toBe('Comfortable · 19.5–22.5°');
  });

  // HA's toast is always on screen, where the line may be below the fold.
  it('keeps HA’s own toast for these calls, as on main', async () => {
    const { hass, callService } = setup({ adjusted: true });
    const el = await nowTab(hass);
    await tap(el, 'cooler');
    await back(el);
    expect(callService.mock.calls).toEqual([
      ['comfort_band', 'start_override', { zone: 'gym', low: 19, high: 22, hours: 3 }],
      ['comfort_band', 'cancel_override', { zone: 'gym' }],
    ]);
  });

  it('says nothing of taps sent as the tab closes, refused', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await el.updateComplete;
    el.remove();
    await flush(el);
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

  it('puts no length back for a change refused after the tab has closed', async () => {
    const { hass, hold } = setup({ adjusted: true });
    const el = await nowTab(hass);
    const held = hold();
    await pick(el, '1');
    el.remove();
    held.reject();
    await flush(el);
    document.body.appendChild(el);
    await flush(el);
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
  });

  // A picked "Until" is for the change it named: put back, it's that one
  // still, not the one HA names now.
  it('puts back “Until” for the change it was picked for', async () => {
    const at = Date.now() + 5 * 3_600_000;
    const { hass, refuse } = setup({ adjusted: true, next: at });
    const el = await nowTab(hass);
    await pick(el, 'next');
    // The schedule is edited: HA names another change.
    const later = new Date(at + 3_600_000).toISOString();
    const id = 'sensor.gym_next_band_change';
    el.hass = { ...hass, states: { ...hass.states, [id]: { ...hass.states[id], state: later } } };
    await flush(el);
    expect(lengths(el).map((l) => l.checked)).toEqual([false, true, false]);
    refuse();
    await pick(el, '1');
    expect(lengths(el).map((l) => l.checked)).toEqual([false, true, false]);
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

  // Below every control that changes the room, so its coming moves none of
  // them: a quick retry lands where it's aimed.
  it('says it below Back to schedule, above the feedback', async () => {
    const { hass, refuse } = setup({ adjusted: true, sensorOffline: true });
    const el = await nowTab(hass);
    refuse();
    await back(el);
    const line = failed(el)!;
    expect(line.previousElementSibling!.classList.contains('back')).toBe(true);
    expect(line.nextElementSibling).toBeNull();
    expect(line.parentElement!.classList.contains('adjust')).toBe(true);
    expect(line.parentElement!.nextElementSibling!.querySelector('.feedback-row')).not.toBeNull();
    // Nor above it, by the status: the sensor notice stays under the status.
    expect(
      root(el).querySelector('.status')!.nextElementSibling!.classList.contains('notice'),
    ).toBe(true);
  });

  it('keeps a length picked before later taps in a burst, to put back', async () => {
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await pick(el, '1');
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    refuse();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(text(failed(el))).toBe(ADJUST);
    expect(lengths(el)[1]).toEqual({ text: '3 h', checked: true });
  });

  it('keeps saying a refusal that comes while feedback is on its way', async () => {
    const { hass, hold } = setup();
    const el = await nowTab(hass);
    const change = hold();
    await tap(el, 'warmer');
    const feedback = hold();
    pill(el, 'just_right').click();
    await flush(el);
    change.reject();
    await flush(el);
    expect(failed(el)!.getAttribute('role')).toBe('alert');
    feedback.resolve();
    await flush(el);
    expect(failed(el)!.getAttribute('role')).toBe('alert');
    expect(text(failed(el))).toBe(ADJUST);
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

  // HA's own toast gives it.
  it('leaves the failure vibration to HA', async () => {
    const seen = haptics();
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'cooler');
    expect(text(failed(el))).toBe(ADJUST);
    expect(seen).toEqual([]);
  });

  it('keeps its icon out of what screen readers read', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'cooler');
    expect(failed(el)!.querySelector('ha-icon')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('leaves the length alone where a refused change had no pick in it', async () => {
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    await pick(el, '1');
    refuse();
    await tap(el, 'warmer');
    expect(text(failed(el))).toBe(ADJUST);
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
    refuse();
    await back(el);
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
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

  it('says the same refusal again afresh, as a new alert', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    const first = failed(el);
    refuse();
    await tap(el, 'warmer');
    expect(text(failed(el))).toBe(ADJUST);
    expect(failed(el)!.getAttribute('role')).toBe('alert');
    expect(failed(el)).not.toBe(first);
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
    // Hidden, not taken out: nothing else in the rule.
    expect(css).toMatch(/\.refusal\.held\s*\{\s*visibility:\s*hidden;?\s*\}/);
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

  it('keeps its place at a refused feedback tap too', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    refuse();
    pill(el, 'just_right').click();
    await flush(el);
    expect(failed(el)!.classList.contains('held')).toBe(true);
    expect(text(failed(el))).toBe(ADJUST);
  });

  // A later refusal in fewer lines would otherwise shorten the panel, and a
  // panel scrolled to its end would pull every control above down.
  it('never gets shorter until the tab closes', async () => {
    const real = Element.prototype.getBoundingClientRect;
    const spy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: Element,
    ) {
      if (!this.classList.contains('refusal')) return real.call(this);
      // Two lines for the re-time's words, one for the others.
      const height = (this.textContent ?? '').includes('how long') ? 30 : 18;
      return {
        x: 0,
        y: 0,
        width: 200,
        height,
        top: 0,
        left: 0,
        right: 200,
        bottom: height,
        toJSON() {},
      } as DOMRect;
    });
    afterEachCleanup.push(() => spy.mockRestore());
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    refuse();
    await pick(el, '1');
    expect(text(failed(el))).toBe(RETIME);
    expect(failed(el)!.style.minHeight).toBe('30px');
    refuse();
    await tap(el, 'warmer');
    expect(text(failed(el))).toBe(ADJUST);
    expect(failed(el)!.style.minHeight).toBe('30px');
    // Held, still.
    root(el).querySelector<HTMLElement>('.steps .cooler')!.click();
    await el.updateComplete;
    expect(failed(el)!.classList.contains('held')).toBe(true);
    expect(failed(el)!.style.minHeight).toBe('30px');
    // A new tab starts afresh.
    vi.advanceTimersByTime(1_500);
    await flush(el);
    el.remove();
    document.body.appendChild(el);
    await flush(el);
    refuse();
    await tap(el, 'warmer');
    expect(failed(el)!.style.minHeight).toBe('18px');
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
  // HA's own toast says it too, to the eye: screen readers don't hear a
  // toast outside the open dialog, here as on main.
  it('marks the pill “Not sent”, leaving HA’s toast to say it as well, then puts it back', async () => {
    const seen = haptics();
    const { hass, callService, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Not sent');
    expect(pill(el, 'too_cold').classList.contains('failed')).toBe(true);
    expect(callService.mock.calls).toEqual([
      ['comfort_band', 'record_feedback', { zone: 'gym', label: 'too_cold' }],
    ]);
    // HA's toast gives the vibration, not the tab.
    expect(seen).toEqual([]);
    // Not in the line: feedback isn't a change to the room.
    expect(failed(el)).toBeNull();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
    expect(pill(el, 'too_cold').classList.contains('failed')).toBe(false);
  });

  it('marks the same pill refused again “Not sent” for the full time again', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    vi.advanceTimersByTime(1_000);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    vi.advanceTimersByTime(1_000);
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Not sent');
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
    // Two pixels of the error colour: its border, and an inset shadow.
    expect(rule).toMatch(/border-color:\s*var\(--error-color/);
    expect(rule).toMatch(/box-shadow:\s*inset 0 0 0 1px var\(--error-color/);
    expect(rule).not.toMatch(/border(-width)?:\s*\d/);
    expect(rule).not.toMatch(/padding|width|height/);
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
