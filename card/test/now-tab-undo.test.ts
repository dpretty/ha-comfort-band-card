import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HassEntity, HomeAssistant } from '../src/types.js';
import { formatTime } from '../src/now-status.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// #25: Undo after a change made here, under the Now tab's controls. It
// needs integration v0.25.0, told by its services' fields.

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
/** Undo, where it's offered: not greyed. */
const undoButton = (el: ComfortBandNowTab) =>
  root(el).querySelector<HTMLButtonElement>('.undo[aria-disabled="false"]');
/** Undo, greyed: nothing to undo. */
const greyedUndo = (el: ComfortBandNowTab) =>
  root(el).querySelector<HTMLButtonElement>('.undo[aria-disabled="true"]');
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

/** Has the next call do `meanwhile` once HA has taken it, before its
 *  answer. Gives a wait for that answer: a look for no Undo before it
 *  passes whatever the tab does. */
function answerAfter(
  hass: HomeAssistant,
  meanwhile: () => Promise<void>,
): (el: ComfortBandNowTab) => Promise<void> {
  const call = hass.callService as unknown as ReturnType<typeof vi.fn>;
  const real = call.getMockImplementation()!;
  let answered: Promise<void> | null = null;
  call.mockImplementationOnce((...args: Parameters<typeof real>) => {
    answered = (async () => {
      await real(...args);
      await meanwhile();
    })();
    return answered;
  });
  return async (el) => {
    expect(answered).not.toBeNull();
    await answered;
    await flush(el);
  };
}

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

  // HA's states can arrive before the call's answer: Undo needn't wait for
  // another update after it.
  it('is offered at once where HA shows the change before the call returns', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    const call = hass.callService as unknown as ReturnType<typeof vi.fn>;
    const real = call.getMockImplementation()!;
    call.mockImplementationOnce(async (...args: Parameters<typeof real>) => {
      await real(...args);
      await deliver(el);
    });
    await tap(el, 'warmer');
    // The call's own delivery takes a flush of its own.
    await flush(el);
    expect(undoButton(el)).not.toBeNull();
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

  // HA says why; nothing else is tried, since the call may have landed.
  it('leaves it to HA to say why putting back an end was refused', async () => {
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
    (hass.callService as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(async () => {
      throw new Error('`until` must be in the future');
    });
    await undo(el);
    expect(calls(hass).slice(1)).toEqual([
      ['start_override', { zone: 'gym', low: 20.5, high: 23, until: new Date(ends).toISOString() }],
    ]);
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

  // The same button, greyed: focus stays on it, and a key does nothing.
  it('greys out when the adjustment changes from elsewhere, focus kept on it', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    const button = undoButton(el)!;
    button.focus();
    put('sensor.gym_override_ends', new Date(NOW + 6 * HOUR).toISOString());
    await deliver(el);
    expect(undoButton(el)).toBeNull();
    expect(greyedUndo(el)).toBe(button);
    expect(button.hasAttribute('aria-label')).toBe(false);
    expect(root(el).activeElement).toBe(button);
    button.click();
    await flush(el);
    expect(calls(hass)).toHaveLength(1);
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
    expect(greyedUndo(el)).not.toBeNull();
  });

  it('isn’t undone in its turn: greyed after, focus kept on it', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    const button = undoButton(el)!;
    button.focus();
    await undo(el);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
    expect(greyedUndo(el)).toBe(button);
    expect(root(el).activeElement).toBe(button);
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

  // What HA shows isn't what was sent: someone else's change came first.
  it.each([
    ['band', { low: '21', high: '24' }],
    ['low', { low: '21', high: '23' }],
    ['high', { low: '20', high: '24' }],
  ])('isn’t offered where HA shows another %s than the one sent', async (_what, band) => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    put('number.gym_manual_low', band.low);
    put('number.gym_manual_high', band.high);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('isn’t offered where HA shows another end than the one sent', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await pick(el, 'next');
    await tap(el, 'warmer');
    put('sensor.gym_override_ends', new Date(NEXT + HOUR).toISOString());
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('isn’t offered where the adjustment Back to schedule ended still runs', async () => {
    const { hass, put, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(NOW + 2 * HOUR).toISOString() },
    });
    const el = await nowTab(hass);
    await back(el);
    // Re-timed from elsewhere instead.
    put('binary_sensor.gym_override_active', 'on');
    put('sensor.gym_override_ends', new Date(NOW + 3 * HOUR).toISOString());
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  // The call answered after the tab had gone: shown again, nothing to undo.
  it('isn’t offered for a change whose answer came after the tab closed', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    const call = hass.callService as unknown as ReturnType<typeof vi.fn>;
    const real = call.getMockImplementation()!;
    let answer: () => void = () => {};
    call.mockImplementationOnce(
      (...args: Parameters<typeof real>) =>
        new Promise<void>((r) => (answer = () => void real(...args).then(() => r()))),
    );
    await tap(el, 'warmer');
    el.remove();
    answer();
    await flush(el);
    document.body.appendChild(el);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  // #25 review round 1: coming as it could act, Undo pushed the feedback
  // buttons down under a tap meant for them. It's always there, greyed
  // while there's nothing to undo, and nothing comes or goes for it.
  describe('always there', () => {
    const rows = (el: ComfortBandNowTab) =>
      Array.from(root(el).querySelector('section.adjust')!.children).map((c) => c.className.trim());

    it('is there, greyed, under Back, from the start', async () => {
      const { hass } = setup();
      const el = await nowTab(hass);
      expect(rows(el).slice(-3)).toEqual(['steps', 'back', 'undo']);
      const button = greyedUndo(el)!;
      expect(button.textContent!.trim()).toBe('Undo');
      expect(button.hasAttribute('aria-label')).toBe(false);
      button.click();
      await flush(el);
      expect(calls(hass)).toEqual([]);
    });

    it('is the same button, greyed or offered, through a change and its undoing', async () => {
      const { hass, deliver } = setup();
      const el = await nowTab(hass);
      const before = rows(el);
      const button = greyedUndo(el)!;
      root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
      await el.updateComplete;
      expect(rows(el)).toEqual(before);
      vi.advanceTimersByTime(1_500);
      await flush(el);
      await deliver(el);
      expect(rows(el)).toEqual(before);
      expect(undoButton(el)).toBe(button);
      await undo(el);
      await deliver(el);
      expect(rows(el)).toEqual(before);
      expect(greyedUndo(el)).toBe(button);
    });

    it('is drawn as Back to schedule is', () => {
      const css = (
        customElements.get('comfort-band-now-tab') as unknown as {
          styles: Array<{ cssText: string }>;
        }
      ).styles
        .flat()
        .map((x) => x.cssText)
        .join('\n')
        .replace(/\/\*[\s\S]*?\*\//g, '');
      const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map((m) => ({
        selectors: m[1].split(',').map((x) => x.trim()),
      }));
      const forBack = rules.filter((r) => r.selectors.some((x) => /^\.back\b/.test(x)));
      expect(forBack.length).toBeGreaterThan(0);
      for (const rule of forBack) {
        for (const sel of rule.selectors.filter((x) => /^\.back\b/.test(x))) {
          expect(rule.selectors).toContain(sel.replace('.back', '.undo'));
        }
      }
    });

    it('isn’t there where it can’t be offered', async () => {
      const { hass, deliver } = setup({}, { services: {} });
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      await deliver(el);
      expect(root(el).querySelector('.undo')).toBeNull();
    });

    it('is there in a room with no schedule, under the steps', async () => {
      const { hass } = setup({
        'sensor.gym_next_band_change': { state: 'unknown', attributes: { scheduled: false } },
      });
      const el = await nowTab(hass);
      expect(rows(el).slice(-2)).toEqual(['steps', 'undo']);
    });
  });

  // Overtaken before HA showed it: not ours to undo, then or later.
  it('lapses at a state that’s neither the change nor what was before', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    // An automation ends it before the card sees it.
    put('binary_sensor.gym_override_active', 'off');
    put('sensor.gym_override_ends', 'unknown');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
    // Later someone else makes the same change.
    put('binary_sensor.gym_override_active', 'on');
    put('sensor.gym_override_ends', new Date(NOW + 3 * HOUR).toISOString());
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  // At the call's answer HA already shows another change: not ours, even if
  // the same change shows a moment later.
  it('isn’t offered where another change shows by the call’s answer', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    const answered = answerAfter(hass, async () => {
      put('number.gym_manual_low', '18');
      put('number.gym_manual_high', '21');
      await deliver(el);
    });
    await tap(el, 'warmer');
    await answered(el);
    put('number.gym_manual_low', '20');
    put('number.gym_manual_high', '23');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('lapses if HA doesn’t show the change soon', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    vi.advanceTimersByTime(10_000);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('waits a little for HA to show the change', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    vi.advanceTimersByTime(9_000);
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
  });

  // After Back to schedule, once the ended adjustment's end is too near to
  // put back, Undo would change nothing: it goes.
  it('goes once putting back would change nothing', async () => {
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
    expect(undoButton(el)).not.toBeNull();
    vi.advanceTimersByTime(ends - 5_000 - NOW + 1);
    await flush(el);
    expect(undoButton(el)).toBeNull();
  });

  // Its name says what it does at the time: once the earlier end is too
  // near, it ends the adjustment.
  it('says what it does as the earlier end nears', async () => {
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
    expect(undoButton(el)!.getAttribute('aria-label')).toBe(
      `Undo: back to 20.5–23° until ${formatTime(ends, hass)}`,
    );
    vi.advanceTimersByTime(ends - 5_000 - NOW + 1);
    await flush(el);
    expect(undoButton(el)!.getAttribute('aria-label')).toBe('Undo: back to the schedule');
  });

  it.each([
    [10_000, 'start_override'],
    [3_000, 'cancel_override'],
  ])('with %i ms left, puts an earlier end back or ends it', async (left, service) => {
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
    vi.setSystemTime(ends - left);
    await deliver(el);
    await undo(el);
    expect(calls(hass)[1][0]).toBe(service);
  });

  // It couldn't be put back.
  it('isn’t offered where the earlier adjustment’s end can’t be read', async () => {
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: 'unavailable' },
    });
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('says no end in a room with no schedule', async () => {
    const ends = NOW + 2 * HOUR;
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(ends).toISOString() },
      'number.gym_manual_low': { state: '20.5' },
      'number.gym_manual_high': { state: '23' },
      'sensor.gym_next_band_change': { state: 'unknown', attributes: { scheduled: false } },
    });
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)!.getAttribute('aria-label')).toBe('Undo: back to 20.5–23°');
  });

  it('says it ends the adjustment where it can’t be told a schedule sets the range', async () => {
    const { hass, deliver } = setup({
      'sensor.gym_next_band_change': { state: 'unknown', attributes: {} },
    });
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)!.getAttribute('aria-label')).toBe('Undo: end the adjustment');
  });

  // Nothing's sent, so nothing replaces what Undo would put back.
  it('stays for a length picked with no adjustment', async () => {
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(NOW + 2 * HOUR).toISOString() },
      'number.gym_manual_low': { state: '21' },
      'number.gym_manual_high': { state: '24' },
    });
    const el = await nowTab(hass);
    await back(el);
    await deliver(el);
    await pick(el, '1');
    expect(undoButton(el)).not.toBeNull();
    expect(calls(hass)).toHaveLength(1);
  });

  // The change takes the range to 35°: a further Warmer does nothing.
  it('stays for a tap at a limit', async () => {
    const { hass, deliver } = setup({
      'sensor.gym_effective_low': { state: '34' },
      'sensor.gym_effective_high': { state: '34.5' },
    });
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await el.updateComplete;
    expect(undoButton(el)).not.toBeNull();
  });

  // A one-step change from elsewhere isn't the one sent.
  it('isn’t offered where HA shows a half-degree different band', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    put('number.gym_manual_low', '20.5');
    put('number.gym_manual_high', '23.5');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('goes where the band can’t be read any more', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    put('number.gym_manual_low', 'unavailable');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('goes where only the low edge changes from elsewhere', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    put('number.gym_manual_low', '19.5');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  // Back to schedule in an adjustment's last seconds: putting it back
  // would change nothing already, whichever comes first.
  it.each([false, true])(
    'isn’t offered after Back to schedule with seconds left (state first: %s)',
    async (stateFirst) => {
      const ends = NOW + 3_000;
      const { hass, deliver } = setup({
        'binary_sensor.gym_override_active': { state: 'on' },
        'sensor.gym_override_ends': { state: new Date(ends).toISOString() },
        'number.gym_manual_low': { state: '21' },
        'number.gym_manual_high': { state: '24' },
      });
      const el = await nowTab(hass);
      const answered = stateFirst ? answerAfter(hass, () => deliver(el)) : flush;
      await back(el);
      await answered(el);
      await deliver(el);
      expect(undoButton(el)).toBeNull();
    },
  );

  // Another room's tab now: Undo would put this one's band there.
  it('goes when the tab is for another room', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
    el.zone = 'kitchen';
    await flush(el);
    expect(undoButton(el)).toBeNull();
  });

  // The card hands on a new entities object with each update from HA, the
  // same ids in it: Undo stays (#25 review round 3).
  it('stays when the room’s entities come again, the same ids in them', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    el.entities = { ...el.entities! };
    await flush(el);
    expect(undoButton(el)).not.toBeNull();
  });

  // Another entity, even one that shows the same: Undo was for this one.
  it.each(['manualLow', 'manualHigh', 'overrideActive', 'overrideEnds', 'nextBandChange'])(
    'goes when the room’s %s entity is another, showing the same',
    async (field) => {
      const { hass, deliver } = setup();
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      await deliver(el);
      const id = (el.entities as unknown as Record<string, string>)[field];
      const other = `${id}_other`;
      el.hass = {
        ...el.hass!,
        states: { ...el.hass!.states, [other]: { ...el.hass!.states[id], entity_id: other } },
      };
      el.entities = { ...el.entities!, [field]: other } as ZoneEntities;
      await flush(el);
      expect(undoButton(el)).toBeNull();
    },
  );

  // The tab became another room's while the call was on its way.
  it('isn’t offered where the tab is for another room by the call’s answer', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    const answered = answerAfter(hass, async () => {
      await deliver(el);
      el.zone = 'kitchen';
      await flush(el);
    });
    await tap(el, 'warmer');
    await answered(el);
    expect(undoButton(el)).toBeNull();
  });

  // Whether an adjustment runs can't be read: what's in force isn't known.
  it('isn’t offered where it can’t be read whether an adjustment runs', async () => {
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'unavailable' },
    });
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  // Back to schedule keeps the band: another panel's cancel with a band,
  // landing first, isn't it.
  it('isn’t offered where Back to schedule lands with another band', async () => {
    const { hass, put, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(NOW + 2 * HOUR).toISOString() },
      'number.gym_manual_low': { state: '21' },
      'number.gym_manual_high': { state: '24' },
    });
    const el = await nowTab(hass);
    await back(el);
    put('number.gym_manual_low', '18');
    put('number.gym_manual_high', '21');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('isn’t offered where HA shows the low edge half a degree off', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    put('number.gym_manual_low', '20.5');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('isn’t offered where HA shows the high edge half a degree off', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    put('number.gym_manual_high', '23.5');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('isn’t offered where HA shows the end half a minute off', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await pick(el, 'next');
    await tap(el, 'warmer');
    put('sensor.gym_override_ends', new Date(NEXT + 30_000).toISOString());
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('goes where only the high edge changes from elsewhere', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    put('number.gym_manual_high', '23.5');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  // Focus moves only from Undo's own button.
  it('leaves focus on Cooler when a tap there ends Undo', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    const cooler = root(el).querySelector<HTMLElement>('.steps .cooler')!;
    cooler.focus();
    cooler.click();
    await flush(el);
    expect(undoButton(el)).toBeNull();
    expect(root(el).activeElement).toBe(cooler);
  });

  // The common order: HA's states first. The end it would put back is still
  // looked at again when it gets near.
  it('looks again at a near end where HA showed the change first', async () => {
    const ends = NOW + 2 * HOUR;
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(ends).toISOString() },
      'number.gym_manual_low': { state: '20.5' },
      'number.gym_manual_high': { state: '23' },
    });
    const el = await nowTab(hass);
    const call = hass.callService as unknown as ReturnType<typeof vi.fn>;
    const real = call.getMockImplementation()!;
    call.mockImplementationOnce(async (...args: Parameters<typeof real>) => {
      await real(...args);
      await deliver(el);
    });
    await tap(el, 'warmer');
    await flush(el);
    expect(undoButton(el)!.getAttribute('aria-label')).toBe(
      `Undo: back to 20.5–23° until ${formatTime(ends, hass)}`,
    );
    vi.advanceTimersByTime(ends - 5_000 - NOW + 1);
    await flush(el);
    expect(undoButton(el)!.getAttribute('aria-label')).toBe('Undo: back to the schedule');
  });

  // A dropped Undo's wait doesn't end the next change's.
  it('waits afresh for the next change’s state', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    vi.advanceTimersByTime(5_000);
    await tap(el, 'cooler');
    // The first wait would have ended now; the second's, from its answer at
    // 8 s, runs to 18 s.
    vi.advanceTimersByTime(6_000);
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
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

  // #25 review round 4: with the end unreadable, a re-time from elsewhere
  // can't be seen, and Undo would end someone else's adjustment.
  it('isn’t offered where the room’s end can’t be read', async () => {
    const { hass, deliver } = setup();
    vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] });
    vi.setSystemTime(NOW);
    // A disabled "Override ends" sensor: the card finds no entity for it.
    const el = await mount('comfort-band-now-tab', {
      hass,
      entities: { ...ENTITIES, overrideEnds: null } as unknown as ZoneEntities,
      zone: 'gym',
    });
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
    // Nor for Back to schedule, from an adjustment whose end can't be read.
    await back(el);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('goes where a running adjustment’s end can’t be read any more', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
    put('sensor.gym_override_ends', 'unavailable');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  // The integration puts the band back as an override ends only from
  // v0.25.0, told by cancel_override's fields.
  it.each([
    ['high', { zone: {}, low: {} }],
    ['low', { zone: {}, high: {} }],
  ])('isn’t offered where cancel_override takes no %s, Until still is', async (_, fields) => {
    const { hass, deliver } = setup(
      {},
      {
        services: {
          comfort_band: {
            start_override: { fields: { zone: {}, low: {}, high: {}, hours: {}, until: {} } },
            cancel_override: { fields },
          },
        },
      },
    );
    const el = await nowTab(hass);
    expect(root(el).querySelector('.lengths button[data-length="next"]')).not.toBeNull();
    await tap(el, 'warmer');
    await deliver(el);
    expect(root(el).querySelector('.undo')).toBeNull();
  });

  // #27: a refused change gets no Undo, and a length picked for it goes back.
  it('isn’t offered for a re-time HA refused, whose length goes back', async () => {
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(NOW + 2 * HOUR).toISOString() },
    });
    const el = await nowTab(hass);
    (hass.callService as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(async () => {
      throw new Error('refused');
    });
    await pick(el, '1');
    await deliver(el);
    expect(undoButton(el)).toBeNull();
    const pressed = Array.from(root(el).querySelectorAll('.lengths button[aria-pressed="true"]'));
    expect(pressed.map((b) => b.getAttribute('data-length'))).toEqual(['3']);
  });

  it('isn’t offered for a Back to schedule HA refused', async () => {
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(NOW + 2 * HOUR).toISOString() },
    });
    const el = await nowTab(hass);
    (hass.callService as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(async () => {
      throw new Error('refused');
    });
    await back(el);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  // Undo's own call refused: HA's toast says so; nothing is offered for it.
  it('offers nothing after its own call is refused', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    await deliver(el);
    const call = hass.callService as unknown as ReturnType<typeof vi.fn>;
    call.mockImplementationOnce(async () => {
      throw new Error('refused');
    });
    await undo(el);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
    // HA's own toast: the call isn't made quiet.
    expect(call.mock.calls[1]).toHaveLength(3);
  });

  // #52: taps sent to their room on a move to another aren't waited for,
  // and get no Undo there or on coming back.
  it('isn’t offered for taps sent to their room on a move to another', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
    await el.updateComplete;
    el.zone = 'kitchen';
    await flush(el);
    expect(calls(hass)).toEqual([['start_override', { zone: 'gym', low: 20, high: 23, hours: 3 }]]);
    await deliver(el);
    el.zone = 'gym';
    await flush(el);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('sits under Back, greyed, after Back to schedule', async () => {
    const { hass, deliver } = setup({
      'binary_sensor.gym_override_active': { state: 'on' },
      'sensor.gym_override_ends': { state: new Date(NOW + 2 * HOUR).toISOString() },
    });
    const el = await nowTab(hass);
    await back(el);
    await deliver(el);
    const backButton = root(el).querySelector('.back')!;
    expect(backButton.getAttribute('aria-disabled')).toBe('true');
    expect(backButton.nextElementSibling).toBe(undoButton(el));
  });

  // Undo is offered only after the call went through: nothing about it can
  // pass for a refusal, which would put a length back (#27).
  it('leaves a length picked during the taps where Undo can’t be offered', async () => {
    const unhandled = vi.fn();
    const proc = (
      globalThis as unknown as {
        process: {
          on(event: string, listener: (...args: unknown[]) => void): void;
          off(event: string, listener: (...args: unknown[]) => void): void;
        };
      }
    ).process;
    proc.on('unhandledRejection', unhandled);
    try {
      const { hass, deliver } = setup();
      vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] });
      vi.setSystemTime(NOW);
      const el = await mount('comfort-band-now-tab', {
        hass,
        entities: { ...ENTITIES, overrideEnds: null } as unknown as ZoneEntities,
        zone: 'gym',
      });
      const answered = answerAfter(hass, () => deliver(el));
      root(el).querySelector<HTMLElement>('.steps .warmer')!.click();
      await el.updateComplete;
      await pick(el, '1');
      vi.advanceTimersByTime(1_500);
      await answered(el);
      vi.useRealTimers();
      await new Promise((r) => setTimeout(r, 0));
      await flush(el);
      const pressed = Array.from(root(el).querySelectorAll('.lengths button[aria-pressed="true"]'));
      expect(pressed.map((b) => b.getAttribute('data-length'))).toEqual(['1']);
      expect(undoButton(el)).toBeNull();
      expect(unhandled).not.toHaveBeenCalled();
    } finally {
      proc.off('unhandledRejection', unhandled);
    }
  });

  it.each([
    ['low edge 0.1° off', 'number.gym_manual_low', '20.1'],
    ['high edge 0.1° off', 'number.gym_manual_high', '23.1'],
  ])('isn’t offered where HA shows the %s', async (_, id, value) => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await tap(el, 'warmer');
    put(id, value);
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  it('isn’t offered where HA shows the end two seconds off', async () => {
    const { hass, put, deliver } = setup();
    const el = await nowTab(hass);
    await pick(el, 'next');
    await tap(el, 'warmer');
    put('sensor.gym_override_ends', new Date(NEXT + 2_000).toISOString());
    await deliver(el);
    expect(undoButton(el)).toBeNull();
  });

  // With HA's state first (the usual order), an edge that couldn't be read
  // at the change would be put back as nothing.
  it.each(['number.gym_manual_low', 'number.gym_manual_high'])(
    'isn’t offered where %s couldn’t be read at the change',
    async (id) => {
      const { hass, deliver } = setup({ [id]: { state: 'unavailable' } });
      const el = await nowTab(hass);
      const answered = answerAfter(hass, () => deliver(el));
      await tap(el, 'warmer');
      await answered(el);
      expect(undoButton(el)).toBeNull();
    },
  );

  // The wait for HA's state runs from the call's answer, not its sending.
  it('waits from the answer, however long that takes', async () => {
    const { hass, deliver } = setup();
    const el = await nowTab(hass);
    const call = hass.callService as unknown as ReturnType<typeof vi.fn>;
    const real = call.getMockImplementation()!;
    call.mockImplementationOnce(
      (...args: Parameters<typeof real>) =>
        new Promise<void>((r) => setTimeout(() => void real(...args).then(() => r()), 12_000)),
    );
    await tap(el, 'warmer');
    vi.advanceTimersByTime(12_000);
    await flush(el);
    await deliver(el);
    expect(undoButton(el)).not.toBeNull();
  });

  // After Back to schedule, pressed in the earlier end's last seconds,
  // before Undo's own look at it: it ends nothing more, rather than put
  // back an end about to pass.
  it('puts back no end seconds away at the press, after Back to schedule', async () => {
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
    // The clock moves on without the timer that would look again.
    vi.setSystemTime(ends - 4_000);
    await undo(el);
    expect(calls(hass)[1]).toEqual(['cancel_override', { zone: 'gym', low: 21, high: 24 }]);
  });
});
