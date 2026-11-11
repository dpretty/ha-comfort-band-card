import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HassEntity, HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// #27: a change HA refuses is told by HA's own toast; the tab puts back a
// length picked for it, and marks a refused feedback tap "Not sent".

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
} as unknown as ZoneEntities;

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
} = {}) {
  const raw: Record<string, [string, Record<string, unknown>?]> = {
    'sensor.gym_effective_low': ['19.5'],
    'sensor.gym_effective_high': ['22.5'],
    'sensor.gym_room_temperature': ['21.0'],
    'sensor.gym_current_action': ['idle'],
    'sensor.gym_override_ends': ['unknown'],
    'binary_sensor.gym_override_active': [adjusted ? 'on' : 'off'],
    'number.gym_manual_low': ['19'],
    'number.gym_manual_high': ['22'],
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

  it('shows the length picked before a refused re-time as picked again', async () => {
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
    expect(lengths(el)).toEqual([
      { text: '1 h', checked: false },
      { text: '3 h', checked: true },
    ]);
  });

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
    expect(lengths(el)[1]).toEqual({ text: '3 h', checked: true });
  });

  it('shows “Until” picked again where a re-time from it is refused', async () => {
    const { hass, refuse } = setup({ adjusted: true, next: Date.now() + 5 * 3_600_000 });
    const el = await nowTab(hass);
    await pick(el, 'next');
    refuse();
    await pick(el, '1');
    expect(lengths(el).map((l) => l.checked)).toEqual([false, false, true]);
  });

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
    // HA names the picked change again: "Until" is in force once more, as
    // if the refused pick had never been made.
    el.hass = { ...hass, states: { ...hass.states } };
    await flush(el);
    expect(lengths(el).map((l) => l.checked)).toEqual([false, false, true]);
  });

  it('keeps the burst’s first pick to put back through later taps', async () => {
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await pick(el, '1');
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    refuse();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(lengths(el)[1]).toEqual({ text: '3 h', checked: true });
  });

  it('keeps the length picked where the change goes through', async () => {
    const { hass } = setup({ adjusted: true });
    const el = await nowTab(hass);
    await pick(el, '1');
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
  });

  it('keeps a length picked with nothing adjusted, which sends nothing', async () => {
    const { hass, callService } = setup();
    const el = await nowTab(hass);
    await pick(el, '1');
    expect(callService).not.toHaveBeenCalled();
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
  });

  // Back drops the burst, pick and all: the refused call is Back's, which
  // carried no pick.
  it('leaves a pick made in a burst that Back dropped where Back is refused', async () => {
    const { hass, callService, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await pick(el, '1');
    refuse();
    await back(el);
    expect(callService.mock.calls.map((c) => c[1])).toEqual(['cancel_override']);
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
  });

  it('leaves the length alone where a refused change had no pick in it', async () => {
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    await pick(el, '1');
    refuse();
    await tap(el, 'warmer');
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
    refuse();
    await back(el);
    expect(lengths(el)[0]).toEqual({ text: '1 h', checked: true });
  });

  // Moved in the page while the call was out, the tab comes back with it.
  it('puts the length back for a change refused while the tab was away', async () => {
    const { hass, hold } = setup({ adjusted: true });
    const el = await nowTab(hass);
    const held = hold();
    await pick(el, '1');
    el.remove();
    held.reject();
    await flush(el);
    document.body.appendChild(el);
    await flush(el);
    expect(lengths(el)).toEqual([
      { text: '1 h', checked: false },
      { text: '3 h', checked: true },
    ]);
  });

  it('shows the length from before a refused re-time to “Until” as picked again', async () => {
    const { hass, callService, refuse } = setup({
      adjusted: true,
      next: Date.now() + 5 * 3_600_000,
    });
    const el = await nowTab(hass);
    refuse();
    await pick(el, 'next');
    expect(callService.mock.calls[0][2]).toHaveProperty('until');
    expect(lengths(el).map((l) => l.checked)).toEqual([false, true, false]);
  });

  it('shows the length from before a burst sent “Until” as picked again where it’s refused', async () => {
    const { hass, callService, refuse } = setup({
      adjusted: true,
      next: Date.now() + 5 * 3_600_000,
    });
    const el = await nowTab(hass);
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await pick(el, 'next');
    refuse();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(callService.mock.calls[0][2]).toHaveProperty('until');
    expect(lengths(el).map((l) => l.checked)).toEqual([false, true, false]);
  });

  it('shows the length from before a burst re-time “Until” as picked again where it’s refused', async () => {
    const { hass, callService, refuse } = setup({
      adjusted: true,
      next: Date.now() + 5 * 3_600_000,
    });
    const el = await nowTab(hass);
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    root(el).querySelector<HTMLElement>('.steps .cooler')!.click();
    await pick(el, 'next');
    refuse();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(callService.mock.calls[0][2]).toEqual(expect.objectContaining({ low: 19, high: 22 }));
    expect(callService.mock.calls[0][2]).toHaveProperty('until');
    expect(lengths(el).map((l) => l.checked)).toEqual([false, true, false]);
  });

  // A refused "Until" for the change HA names now goes back to what was
  // shown: three hours, the earlier "Until" being for another change.
  it('shows three hours again where “Until” for a newly named change is refused', async () => {
    const at = Date.now() + 5 * 3_600_000;
    const { hass, refuse } = setup({ adjusted: true, next: at });
    const el = await nowTab(hass);
    await pick(el, 'next');
    const later = new Date(at + 3_600_000).toISOString();
    const id = 'sensor.gym_next_band_change';
    el.hass = { ...hass, states: { ...hass.states, [id]: { ...hass.states[id], state: later } } };
    await flush(el);
    expect(lengths(el).map((l) => l.checked)).toEqual([false, true, false]);
    refuse();
    await pick(el, 'next');
    expect(lengths(el).map((l) => l.checked)).toEqual([false, true, false]);
  });

  // HA's toast is the message; the status goes back to what's in force.
  it('adds no message of its own', async () => {
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    refuse();
    await back(el);
    expect(root(el).querySelector('[role="alert"]')).toBeNull();
    expect(status(el)).toBe('Comfortable · adjusted to 19.5–22.5°');
  });

  it('leaves the failure vibration to HA, with its toast', async () => {
    const seen = haptics();
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'cooler');
    expect(seen).toEqual([]);
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
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
    expect(pill(el, 'too_cold').classList.contains('failed')).toBe(false);
  });

  it('says “Not sent” for as long as “Thanks!” is shown', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    vi.advanceTimersByTime(1_499);
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Not sent');
    vi.advanceTimersByTime(1);
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
  });

  it('keeps saying “Not sent” while a later tap is on its way', async () => {
    const { hass, refuse, hold } = setup();
    const el = await nowTab(hass);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    const held = hold();
    pill(el, 'too_hot').click();
    await flush(el);
    expect(text(pill(el, 'too_cold'))).toBe('Not sent');
    held.resolve();
    await flush(el);
    expect(text(pill(el, 'too_hot'))).toBe('Thanks!');
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
  });

  it('thanks a later tap for the full time after an earlier “Not sent”', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    pill(el, 'too_cold').click();
    await flush(el);
    vi.advanceTimersByTime(1_000);
    pill(el, 'too_hot').click();
    await flush(el);
    vi.advanceTimersByTime(1_499);
    await flush(el);
    expect(text(pill(el, 'too_hot'))).toBe('Thanks!');
    vi.advanceTimersByTime(1);
    await flush(el);
    expect(text(pill(el, 'too_hot'))).toBe('Too warm');
  });

  it('thanks only the last tap, where an earlier one goes through after it', async () => {
    const { hass, hold } = setup();
    const el = await nowTab(hass);
    const held = hold();
    pill(el, 'too_cold').click();
    pill(el, 'too_hot').click();
    await flush(el);
    held.resolve();
    await flush(el);
    expect(text(pill(el, 'too_hot'))).toBe('Thanks!');
    expect(text(pill(el, 'too_cold'))).toBe('Too cool');
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

  it('stops saying “Not sent” when the tab is taken off the page', async () => {
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
