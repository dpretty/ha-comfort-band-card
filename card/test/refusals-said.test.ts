import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import '../src/modal.js';
import '../src/tabs/now-tab.js';
import '../src/exact-range.js';
import type { ComfortBandModal } from '../src/modal.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ComfortBandExactRange } from '../src/exact-range.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HassEntity, HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// #53: HA's toast tells of a refused call, painted above the card's dialog
// (HA 2026.9+) but outside it, so screen readers don't hear it while the
// dialog is open. Where a tab leaves a refusal to that toast, it hands the
// dialog plain words (#27's), which the dialog says from inside itself.

beforeAll(() => {
  const proto = window.HTMLDialogElement?.prototype as
    | (HTMLDialogElement & { showModal?: () => void; close?: () => void })
    | undefined;
  if (proto && typeof proto.showModal !== 'function') proto.showModal = function () {};
  if (proto && typeof proto.close !== 'function') proto.close = function () {};
});

afterEach(() => {
  teardown();
  vi.useRealTimers();
});

const NOW = Date.parse('2026-10-22T10:00:00Z');
const HOUR = 3_600_000;

function entitiesOf(zone: 'gym' | 'study', device: Partial<ZoneEntities> = {}): ZoneEntities {
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
    deviceId: null,
    deviceName: null,
    ...device,
  } as unknown as ZoneEntities;
}

/** v0.25.0's services, as HA describes them: "Until" and Undo. */
const SERVICES = {
  comfort_band: {
    start_override: { fields: { zone: {}, low: {}, high: {}, hours: {}, until: {} } },
    cancel_override: { fields: { zone: {}, low: {}, high: {} } },
  },
};

/**
 * HA with a gym and a study, each at 19.5–22.5° from its schedule (with
 * `scheduled`), the gym adjusted where `adjusted`. Calls change the states
 * as the integration does, handed to the card by `deliver`; they go
 * through unless `refuse` or `hold` says otherwise for the next one.
 */
function setup({ adjusted = false, scheduled = true as boolean | null } = {}) {
  const states: Record<string, HassEntity> = {};
  const put = (id: string, state: string, attributes: Record<string, unknown> = {}) => {
    states[id] = { entity_id: id, state, attributes, last_changed: '', last_updated: '' };
  };
  for (const zone of ['gym', 'study'] as const) {
    const on = adjusted && zone === 'gym';
    put(`sensor.${zone}_effective_low`, '19.5');
    put(`sensor.${zone}_effective_high`, '22.5');
    put(`sensor.${zone}_room_temperature`, '21.0');
    put(`sensor.${zone}_current_action`, 'idle');
    put(`sensor.${zone}_override_ends`, on ? new Date(NOW + 2 * HOUR).toISOString() : 'unknown');
    put(`binary_sensor.${zone}_override_active`, on ? 'on' : 'off');
    put(`number.${zone}_manual_low`, '19');
    put(`number.${zone}_manual_high`, '22');
    if (scheduled !== null) {
      put(`sensor.${zone}_next_band_change`, new Date(NOW + 5 * HOUR).toISOString(), {
        scheduled,
        low: 18,
        high: 23,
      });
    }
  }
  const service = vi.fn(async (_d: string, name: string, data: Record<string, unknown>) => {
    const zone = String(data.zone);
    if (data.low !== undefined) put(`number.${zone}_manual_low`, String(data.low));
    if (data.high !== undefined) put(`number.${zone}_manual_high`, String(data.high));
    if (name === 'start_override') {
      put(`binary_sensor.${zone}_override_active`, 'on');
      const ends =
        typeof data.until === 'string'
          ? Date.parse(data.until)
          : Date.now() + Number(data.hours ?? 3) * HOUR;
      put(`sensor.${zone}_override_ends`, new Date(ends).toISOString());
      put(`sensor.${zone}_effective_low`, String(data.low));
      put(`sensor.${zone}_effective_high`, String(data.high));
    } else if (name === 'cancel_override') {
      put(`binary_sensor.${zone}_override_active`, 'off');
      put(`sensor.${zone}_override_ends`, 'unknown');
      put(`sensor.${zone}_effective_low`, '19.5');
      put(`sensor.${zone}_effective_high`, '22.5');
    }
  });
  const hass: HomeAssistant = {
    states: { ...states },
    devices: {},
    entities: {},
    connection: stubConnection(),
    // A promise of its own, as HA's is.
    callService: (async (...args: unknown[]) =>
      (service as unknown as (...a: unknown[]) => Promise<void>)(
        ...args,
      )) as unknown as HomeAssistant['callService'],
    callWS: vi.fn().mockResolvedValue(undefined),
    services: SERVICES as HomeAssistant['services'],
    locale: { language: 'en-GB', time_format: '24' },
  };
  const refuse = () => service.mockRejectedValueOnce(new Error('Entity not available'));
  const hold = () => {
    const handle = { resolve: () => {}, reject: () => {} };
    service.mockImplementationOnce(
      () =>
        new Promise<void>((res, rej) => {
          handle.resolve = () => res();
          handle.reject = () => rej(new Error('Entity not available'));
        }),
    );
    return handle;
  };
  /** HA's latest states, as the frontend hands them to the card. */
  const deliver = async (el: ComfortBandNowTab): Promise<void> => {
    el.hass = { ...el.hass!, states: { ...states } };
    await flush(el);
  };
  return { hass, service, refuse, hold, deliver };
}

async function flush(el: Element & { updateComplete: Promise<boolean> }): Promise<void> {
  for (let i = 0; i < 50; i++) await Promise.resolve();
  await el.updateComplete;
}

function fakeTime(): void {
  vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] });
  vi.setSystemTime(NOW);
}

async function nowTab(
  hass: HomeAssistant,
  announce?: (words: string) => void,
  entities = entitiesOf('gym'),
): Promise<ComfortBandNowTab> {
  fakeTime();
  return mount('comfort-band-now-tab', { hass, entities, zone: 'gym', announce });
}

const root = (el: ComfortBandNowTab) => el.shadowRoot!;
/** A pointer coming down, as a tap or a click starts. */
const pointerDown = () =>
  new (window.PointerEvent ?? MouseEvent)('pointerdown', { bubbles: true, composed: true });
const press = (el: ComfortBandNowTab, selector: string) =>
  root(el).querySelector<HTMLElement>(selector)!.click();

/** Taps, then waits out the burst so the change is sent. */
async function tap(el: ComfortBandNowTab, which: 'warmer' | 'cooler', times = 1): Promise<void> {
  for (let i = 0; i < times; i++) press(el, `.steps .${which}`);
  await el.updateComplete;
  vi.advanceTimersByTime(1_500);
  await flush(el);
}

async function pick(el: ComfortBandNowTab, length: '1' | '3' | 'next'): Promise<void> {
  press(el, `.lengths button[data-length="${length}"]`);
  await flush(el);
}

async function feedback(el: ComfortBandNowTab, label: string): Promise<void> {
  press(el, `[data-feedback="${label}"]`);
  await flush(el);
}

describe('Now tab: a refusal said to screen readers (#53)', () => {
  it('says a refused Warmer or Cooler, leaving HA’s toast as it was', async () => {
    const announce = vi.fn();
    const { hass, service, refuse } = setup();
    const el = await nowTab(hass, announce);
    refuse();
    await tap(el, 'warmer', 2);
    expect(announce.mock.calls).toEqual([['Couldn’t adjust the room. Try again.']]);
    // HA's own toast still says it, to the eye: the call isn't made quiet.
    expect(service.mock.calls[0]).toHaveLength(3);
    refuse();
    await tap(el, 'cooler');
    expect(announce).toHaveBeenCalledTimes(2);
    expect(announce).toHaveBeenLastCalledWith('Couldn’t adjust the room. Try again.');
  });

  it('says a refused change of length', async () => {
    const announce = vi.fn();
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass, announce);
    refuse();
    await pick(el, '1');
    expect(announce.mock.calls).toEqual([
      ['Couldn’t change how long the adjustment lasts. Try again.'],
    ]);
  });

  it('says a refused length picked during taps that cancel out', async () => {
    const announce = vi.fn();
    const { hass, service, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass, announce);
    press(el, '.steps .warmer');
    press(el, '.steps .cooler');
    await pick(el, '1');
    refuse();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(service.mock.calls.map((c) => c[1])).toEqual(['start_override']);
    expect(announce.mock.calls).toEqual([
      ['Couldn’t change how long the adjustment lasts. Try again.'],
    ]);
  });

  it('says a refused range change where a length was picked during the taps', async () => {
    const announce = vi.fn();
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass, announce);
    press(el, '.steps .warmer');
    await pick(el, '1');
    refuse();
    vi.advanceTimersByTime(1_500);
    await flush(el);
    expect(announce.mock.calls).toEqual([['Couldn’t adjust the room. Try again.']]);
  });

  it('says a refused Back to schedule', async () => {
    const announce = vi.fn();
    const { hass, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass, announce);
    refuse();
    press(el, '.back');
    await flush(el);
    expect(announce.mock.calls).toEqual([['Couldn’t go back to the schedule. Try again.']]);
  });

  it('says a refused End adjustment, where it can’t be told what sets the range', async () => {
    const announce = vi.fn();
    const { hass, refuse } = setup({ adjusted: true, scheduled: null });
    const el = await nowTab(hass, announce);
    expect(root(el).querySelector('.back')!.textContent!.trim()).toBe('End adjustment');
    refuse();
    press(el, '.back');
    await flush(el);
    expect(announce.mock.calls).toEqual([['Couldn’t end the adjustment. Try again.']]);
  });

  // Undo isn't offered again after a refusal (#25): no "Try again".
  it('says a refused Undo, without asking to try again', async () => {
    const announce = vi.fn();
    const { hass, service, refuse, deliver } = setup();
    const el = await nowTab(hass, announce);
    await tap(el, 'warmer');
    await deliver(el);
    expect(root(el).querySelector('.undo')!.getAttribute('aria-disabled')).toBe('false');
    refuse();
    press(el, '.undo');
    await flush(el);
    expect(service.mock.calls.map((c) => c[1])).toEqual(['start_override', 'cancel_override']);
    expect(announce.mock.calls).toEqual([['Couldn’t undo the change.']]);
    await flush(el);
    expect(root(el).querySelector('.undo')!.getAttribute('aria-disabled')).toBe('true');
  });

  it('says a refused feedback tap, by the pill’s words', async () => {
    const announce = vi.fn();
    const { hass, refuse } = setup();
    const el = await nowTab(hass, announce);
    for (const label of ['too_cold', 'just_right', 'too_hot']) {
      refuse();
      await feedback(el, label);
    }
    expect(announce.mock.calls).toEqual([
      ['Too cool: not sent. Try again.'],
      ['Just right: not sent. Try again.'],
      ['Too warm: not sent. Try again.'],
    ]);
  });

  it('says the same pill refused again, within its 1.5 s', async () => {
    const announce = vi.fn();
    const { hass, refuse } = setup();
    const el = await nowTab(hass, announce);
    refuse();
    await feedback(el, 'too_cold');
    vi.advanceTimersByTime(500);
    refuse();
    await feedback(el, 'too_cold');
    expect(announce).toHaveBeenCalledTimes(2);
  });

  // Its pill goes to the later tap; the refusal is still told.
  it('says a refused feedback tap that a later tap overtook', async () => {
    const announce = vi.fn();
    const { hass, hold } = setup();
    const el = await nowTab(hass, announce);
    const first = hold();
    press(el, '[data-feedback="too_hot"]');
    await feedback(el, 'just_right');
    first.reject();
    await flush(el);
    expect(announce.mock.calls).toEqual([['Too warm: not sent. Try again.']]);
    expect(root(el).querySelector('.feedback-pill.confirmed')!.getAttribute('data-feedback')).toBe(
      'just_right',
    );
  });

  it('says nothing for calls that go through', async () => {
    const announce = vi.fn();
    const { hass, service, deliver } = setup();
    const el = await nowTab(hass, announce);
    await tap(el, 'warmer');
    await deliver(el);
    await pick(el, '1');
    await deliver(el);
    press(el, '.undo');
    await flush(el);
    await deliver(el);
    await tap(el, 'cooler');
    await deliver(el);
    press(el, '.back');
    await flush(el);
    await feedback(el, 'too_cold');
    // Warmer, a length, Undo (putting the first adjustment back), Cooler,
    // Back, feedback.
    expect(service.mock.calls.map((c) => c[1])).toEqual([
      'start_override',
      'start_override',
      'start_override',
      'start_override',
      'cancel_override',
      'record_feedback',
    ]);
    expect(announce).not.toHaveBeenCalled();
  });

  // Swapped out for another tab with taps held, the tab sends them; the
  // dialog may still be open, and says the refusal.
  it('says a refusal answered after the tab was taken off the page', async () => {
    const announce = vi.fn();
    const { hass, hold } = setup();
    const el = await nowTab(hass, announce);
    press(el, '.steps .warmer');
    const held = hold();
    el.remove();
    held.reject();
    await flush(el);
    expect(announce.mock.calls).toEqual([['Couldn’t adjust the room. Try again.']]);
  });

  it('says a refused feedback tap answered after the tab was taken off the page', async () => {
    const announce = vi.fn();
    const { hass, hold } = setup();
    const el = await nowTab(hass, announce);
    const held = hold();
    press(el, '[data-feedback="too_cold"]');
    el.remove();
    held.reject();
    await flush(el);
    expect(announce.mock.calls).toEqual([['Too cool: not sent. Try again.']]);
  });

  it('lets a refusal go quietly where no dialog hands it `announce`', async () => {
    const { hass, refuse } = setup();
    const el = await nowTab(hass);
    refuse();
    await tap(el, 'warmer');
    expect(root(el).querySelector('[role="alert"]')).toBeNull();
  });
});

describe('Now tab: a refusal for taps held when the card moved on (#52, #53)', () => {
  async function moveToStudy(el: ComfortBandNowTab): Promise<void> {
    el.zone = 'study';
    el.entities = entitiesOf('study');
    await flush(el);
  }

  it('names the room the taps were for, by its area', async () => {
    const announce = vi.fn();
    const { hass, hold } = setup();
    hass.devices = { 'dev-gym': { id: 'dev-gym', area_id: 'area-gym' } } as never;
    hass.areas = { 'area-gym': { area_id: 'area-gym', name: 'Home gym' } } as never;
    const el = await nowTab(
      hass,
      announce,
      entitiesOf('gym', { deviceId: 'dev-gym', deviceName: 'Gym HVAC' }),
    );
    press(el, '.steps .warmer');
    const held = hold();
    await moveToStudy(el);
    held.reject();
    await flush(el);
    expect(announce.mock.calls).toEqual([['Couldn’t adjust Home gym. Try again.']]);
  });

  it('names it where HA answers after the tab was taken off the page', async () => {
    const announce = vi.fn();
    const { hass, hold } = setup();
    const el = await nowTab(hass, announce);
    press(el, '.steps .warmer');
    const held = hold();
    await moveToStudy(el);
    el.remove();
    held.reject();
    await flush(el);
    expect(announce.mock.calls).toEqual([['Couldn’t adjust gym. Try again.']]);
  });

  it('names it by its device, where it has no area', async () => {
    const announce = vi.fn();
    const { hass, refuse } = setup();
    const el = await nowTab(
      hass,
      announce,
      entitiesOf('gym', { deviceId: 'dev-gym', deviceName: 'Gym HVAC' }),
    );
    press(el, '.steps .warmer');
    refuse();
    await moveToStudy(el);
    await flush(el);
    expect(announce.mock.calls).toEqual([['Couldn’t adjust Gym HVAC. Try again.']]);
  });

  it('names it by its zone, where nothing else names it', async () => {
    const announce = vi.fn();
    const { hass, refuse } = setup();
    const el = await nowTab(hass, announce);
    press(el, '.steps .warmer');
    refuse();
    await moveToStudy(el);
    await flush(el);
    expect(announce.mock.calls).toEqual([['Couldn’t adjust gym. Try again.']]);
  });

  it('says a refused re-time for that room, naming it', async () => {
    const announce = vi.fn();
    const { hass, service, refuse } = setup({ adjusted: true });
    const el = await nowTab(hass, announce);
    press(el, '.steps .warmer');
    press(el, '.steps .cooler');
    await pick(el, '1');
    refuse();
    await moveToStudy(el);
    await flush(el);
    expect(service.mock.calls.map((c) => [c[1], (c[2] as { zone: string }).zone])).toEqual([
      ['start_override', 'gym'],
    ]);
    expect(announce.mock.calls).toEqual([
      ['Couldn’t change how long the adjustment in gym lasts. Try again.'],
    ]);
  });
});

describe('exact range: a refusal said to screen readers (#53)', () => {
  async function exactRange(
    hass: HomeAssistant,
    announce?: (words: string) => void,
  ): Promise<ComfortBandExactRange> {
    return mount('comfort-band-exact-range', {
      hass,
      entities: entitiesOf('gym'),
      zone: 'gym',
      announce,
    });
  }

  async function release(el: ComfortBandExactRange, low: number, high: number): Promise<void> {
    el.shadowRoot!.querySelector('dual-handle-slider')!.dispatchEvent(
      new CustomEvent('change', { detail: { low, high }, bubbles: true }),
    );
    await flush(el);
  }

  it('says a refused range, leaving HA’s toast as it was', async () => {
    const announce = vi.fn();
    const { hass, service, refuse } = setup();
    const el = await exactRange(hass, announce);
    refuse();
    await release(el, 20, 23);
    expect(announce.mock.calls).toEqual([['Couldn’t set the range. Try again.']]);
    expect(service.mock.calls[0]).toHaveLength(3);
  });

  it('says each refusal, and nothing for a range that goes through', async () => {
    const announce = vi.fn();
    const { hass, service, refuse } = setup();
    const el = await exactRange(hass, announce);
    await release(el, 20, 23);
    expect(announce).not.toHaveBeenCalled();
    refuse();
    await release(el, 20.5, 23);
    refuse();
    await release(el, 21, 23);
    await release(el, 21.5, 23);
    expect(service).toHaveBeenCalledTimes(4);
    expect(announce).toHaveBeenCalledTimes(2);
  });

  // Its tab swapped out before HA answers, the dialog may still be open.
  it('says a refusal answered after it was taken off the page', async () => {
    const announce = vi.fn();
    const { hass, hold } = setup();
    const el = await exactRange(hass, announce);
    const held = hold();
    el.shadowRoot!.querySelector('dual-handle-slider')!.dispatchEvent(
      new CustomEvent('change', { detail: { low: 20, high: 23 }, bubbles: true }),
    );
    await flush(el);
    el.remove();
    held.reject();
    await flush(el);
    expect(announce.mock.calls).toEqual([['Couldn’t set the range. Try again.']]);
  });

  it('lets a refusal go quietly where no dialog hands it `announce`', async () => {
    const { hass, service, refuse } = setup();
    const el = await exactRange(hass);
    refuse();
    await release(el, 20, 23);
    // A later release still goes: the chain wasn't broken.
    await release(el, 20.5, 23);
    expect(service.mock.calls.map((c) => (c[2] as { low: number }).low)).toEqual([20, 20.5]);
  });
});

describe('comfort-band-modal: what it says to screen readers (#53)', () => {
  async function openModal(hass = setup().hass): Promise<ComfortBandModal> {
    const el = await mount('comfort-band-modal', {
      hass,
      zone: 'gym',
      zoneName: 'Gym',
      entities: entitiesOf('gym'),
    });
    el.open();
    await el.updateComplete;
    return el;
  }
  const region = (el: ComfortBandModal) =>
    el.shadowRoot!.querySelector<HTMLElement>('dialog > .refusal');
  const said = (el: ComfortBandModal) => region(el)?.textContent?.trim() ?? null;
  const tab = <T extends Element>(el: ComfortBandModal, tag: string) =>
    el.shadowRoot!.querySelector(`[role="tabpanel"] ${tag}`) as T & {
      announce?: (words: string) => void;
    };
  const tabButton = (el: ComfortBandModal, id: string) =>
    el.shadowRoot!.querySelector<HTMLButtonElement>(`#cb-tab-${id}`)!;

  it('has an alert inside the dialog, saying nothing while nothing is refused', async () => {
    const el = await openModal();
    const alert = region(el)!;
    expect(alert.getAttribute('role')).toBe('alert');
    // Inside the modal dialog: outside it, it would be inert, as HA's toast is.
    // Last in it, after the tabs: where reading the dialog through ends.
    expect(alert.parentElement!.tagName).toBe('DIALOG');
    expect(alert.parentElement!.lastElementChild).toBe(alert);
    expect(said(el)).toBe('');
  });

  // A region that's there, exposed, before its words are: one that comes
  // with them, or is hidden until then, isn't reliably heard.
  it('is there and exposed before a refusal, and the same region after', async () => {
    const el = await openModal();
    const before = region(el)!;
    expect(before.getAttributeNames().sort()).toEqual(['class', 'role']);
    tab(el, 'comfort-band-now-tab').announce!('Couldn’t adjust the room. Try again.');
    await el.updateComplete;
    expect(region(el)).toBe(before);
    expect(before.getAttributeNames().sort()).toEqual(['class', 'role']);
  });

  it('says what the Now tab hands it', async () => {
    const el = await openModal();
    tab<ComfortBandNowTab>(el, 'comfort-band-now-tab').announce!('Couldn’t adjust the room.');
    await el.updateComplete;
    expect(said(el)).toBe('Couldn’t adjust the room.');
  });

  it('hands the Advanced tab the same', async () => {
    const el = await openModal();
    const fromNow = tab(el, 'comfort-band-now-tab').announce;
    el.selectTab('advanced');
    await el.updateComplete;
    const advanced = tab(el, 'comfort-band-advanced-tab');
    expect(advanced.announce).toBe(fromNow);
    advanced.announce!('Couldn’t set the range. Try again.');
    await el.updateComplete;
    expect(said(el)).toBe('Couldn’t set the range. Try again.');
  });

  it('says the same words again as a new node, so they’re heard again', async () => {
    const el = await openModal();
    const announce = tab(el, 'comfort-band-now-tab').announce!;
    announce('Too cool: not sent. Try again.');
    await el.updateComplete;
    const first = region(el)!.firstElementChild;
    announce('Too cool: not sent. Try again.');
    await el.updateComplete;
    const second = region(el)!.firstElementChild;
    expect(second).not.toBeNull();
    expect(second).not.toBe(first);
    expect(first!.isConnected).toBe(false);
    expect(said(el)).toBe('Too cool: not sent. Try again.');
  });

  it('puts the words away at the next press anywhere in the dialog', async () => {
    const { hass } = setup({ adjusted: true });
    const el = await openModal(hass);
    const nowTabEl = tab<ComfortBandNowTab>(el, 'comfort-band-now-tab');
    await nowTabEl.updateComplete;
    const inNow = (sel: string) => nowTabEl.shadowRoot!.querySelector(sel)!;
    const targets: Array<[string, () => Element]> = [
      ['a tab', () => tabButton(el, 'now')],
      ['Warmer', () => inNow('.steps .warmer')],
      ['a pill', () => inNow('[data-feedback="too_cold"]')],
      ['Back', () => inNow('.back')],
      ['Close', () => el.shadowRoot!.querySelector('.close')!],
    ];
    for (const [what, target] of targets) {
      nowTabEl.announce!('Couldn’t adjust the room. Try again.');
      await el.updateComplete;
      target().dispatchEvent(pointerDown());
      await el.updateComplete;
      expect(said(el), what).toBe('');
    }
    nowTabEl.announce!('Couldn’t adjust the room. Try again.');
    await el.updateComplete;
    inNow('.steps .warmer').dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }),
    );
    await el.updateComplete;
    expect(said(el), 'a key').toBe('');
  });

  // The exact range sends its call as the pointer comes down or is let go,
  // before the click of the same press: that click mustn't put the words
  // of its refusal away.
  // Only a pointer coming down or a key: any later event of the same press
  // (the pointer let go, a key coming up, the click) can come after the
  // exact range has sent its call, and would put its refusal's words away.
  it('puts the words away at no other event of a press', async () => {
    const el = await openModal();
    const announce = tab(el, 'comfort-band-now-tab').announce!;
    const target = tabButton(el, 'now');
    for (const type of [
      'pointerup',
      'pointercancel',
      'mousedown',
      'mouseup',
      'touchstart',
      'touchend',
      'keyup',
      'click',
      'focusin',
      'focusout',
    ]) {
      announce(`Couldn’t set the range. Try again. (${type})`);
      await el.updateComplete;
      target.dispatchEvent(new Event(type, { bubbles: true, composed: true }));
      await el.updateComplete;
      expect(said(el), type).toBe(`Couldn’t set the range. Try again. (${type})`);
    }
  });

  // The press's own handler can hear HA's answer before the press is done.
  it('keeps words handed on by the press’s own handler', async () => {
    const el = await openModal();
    const announce = tab(el, 'comfort-band-now-tab').announce!;
    const now = tabButton(el, 'now');
    for (const [type, make] of [
      ['pointerdown', pointerDown],
      [
        'keydown',
        () => new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }),
      ],
    ] as const) {
      announce('Couldn’t go back to the schedule. Try again.');
      await el.updateComplete;
      const own = () => announce(`Couldn’t end the adjustment. Try again. (${type})`);
      now.addEventListener(type, own);
      now.dispatchEvent(make());
      now.removeEventListener(type, own);
      await el.updateComplete;
      expect(said(el)).toBe(`Couldn’t end the adjustment. Try again. (${type})`);
    }
  });

  it('puts the words away on a move to another tab from the keyboard', async () => {
    const el = await openModal();
    tab(el, 'comfort-band-now-tab').announce!('Couldn’t adjust the room. Try again.');
    await el.updateComplete;
    el.shadowRoot!.querySelector('nav')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
    );
    await el.updateComplete;
    expect(tabButton(el, 'schedule').getAttribute('aria-selected')).toBe('true');
    expect(said(el)).toBe('');
  });

  // Closed, the dialog makes nothing inert: HA's toast is heard.
  it('says nothing handed on once it’s closed, and opens again saying nothing', async () => {
    const el = await openModal();
    const announce = tab(el, 'comfort-band-now-tab').announce!;
    announce('Couldn’t adjust the room. Try again.');
    await el.updateComplete;
    el.shadowRoot!.querySelector('dialog')!.dispatchEvent(new Event('close'));
    await el.updateComplete;
    expect(region(el)).toBeNull();
    announce('Couldn’t undo the change. Try again.');
    await el.updateComplete;
    el.open();
    await el.updateComplete;
    expect(said(el)).toBe('');
  });

  // Off the page the dialog makes nothing inert either.
  it('says nothing handed on while the card is off the page, nor keeps words for its return', async () => {
    const el = await openModal();
    const announce = tab(el, 'comfort-band-now-tab').announce!;
    announce('Couldn’t adjust the room. Try again.');
    await el.updateComplete;
    el.remove();
    announce('Couldn’t undo the change.');
    document.body.appendChild(el);
    await el.updateComplete;
    expect(said(el)).toBe('');
  });

  it('is heard, not seen: nothing on screen changes', () => {
    const styles = (
      customElements.get('comfort-band-modal') as unknown as { styles: Array<{ cssText: string }> }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    const rule = /(?:^|\})\s*\.refusal\s*\{([^}]*)\}/.exec(styles)?.[1] ?? '';
    const decls = rule
      .split(';')
      .map((d) => d.trim().replace(/\s+/g, ' '))
      .filter(Boolean)
      .sort();
    expect(decls).toEqual(
      [
        'clip-path: inset(50%)',
        'height: 1px',
        'left: 0',
        'overflow: hidden',
        'position: absolute',
        'top: 0',
        'white-space: nowrap',
        'width: 1px',
      ].sort(),
    );
  });
});

describe('a refusal said from the dialog, end to end (#53)', () => {
  async function openModal(hass: HomeAssistant): Promise<ComfortBandModal> {
    fakeTime();
    const el = await mount('comfort-band-modal', {
      hass,
      zone: 'gym',
      zoneName: 'Gym',
      entities: entitiesOf('gym'),
    });
    el.open();
    await flush(el);
    return el;
  }
  const said = (el: ComfortBandModal) =>
    el.shadowRoot!.querySelector('dialog > .refusal')?.textContent?.trim() ?? null;
  const now = (el: ComfortBandModal) =>
    el.shadowRoot!.querySelector('comfort-band-now-tab') as ComfortBandNowTab;

  it('says a refused Warmer from inside the dialog, the Now tab showing nothing new', async () => {
    const { hass, refuse } = setup();
    const el = await openModal(hass);
    refuse();
    now(el).shadowRoot!.querySelector<HTMLElement>('.steps .warmer')!.click();
    vi.advanceTimersByTime(1_500);
    await flush(now(el));
    await flush(el);
    expect(said(el)).toBe('Couldn’t adjust the room. Try again.');
    expect(now(el).shadowRoot!.querySelector('[role="alert"]')).toBeNull();
  });

  // The tap on the Schedule tab sends the held taps, and HA answers after.
  it('says a refusal for taps sent on a move to another tab', async () => {
    const { hass, hold } = setup();
    const el = await openModal(hass);
    now(el).shadowRoot!.querySelector<HTMLElement>('.steps .warmer')!.click();
    await flush(el);
    const held = hold();
    el.shadowRoot!.querySelector<HTMLButtonElement>('#cb-tab-schedule')!.click();
    await flush(el);
    expect(el.shadowRoot!.querySelector('comfort-band-now-tab')).toBeNull();
    held.reject();
    await flush(el);
    expect(said(el)).toBe('Couldn’t adjust the room. Try again.');
  });

  // A tap on the track sends at once as the pointer comes down, a dragged
  // handle as it's let go: either way before the press's click.
  it('says a refused exact range, through the click of the press that set it', async () => {
    const { hass, refuse } = setup();
    const el = await openModal(hass);
    el.selectTab('advanced');
    await flush(el);
    const advanced = el.shadowRoot!.querySelector('comfort-band-advanced-tab')!;
    await (advanced as unknown as { updateComplete: Promise<boolean> }).updateComplete;
    const exact = advanced.shadowRoot!.querySelector(
      'comfort-band-exact-range',
    ) as ComfortBandExactRange;
    const slider = exact.shadowRoot!.querySelector('dual-handle-slider')!;
    // Each press's events in the order a browser sends them, with the
    // slider's call where it makes it ("change").
    const presses: Record<string, string[]> = {
      'a tap on the track': ['pointerdown', 'change', 'mousedown', 'pointerup', 'mouseup', 'click'],
      'a dragged handle': ['pointerdown', 'mousedown', 'pointerup', 'change', 'mouseup', 'click'],
      'a touch on the track': [
        'pointerdown',
        'change',
        'touchstart',
        'pointerup',
        'touchend',
        'mousedown',
        'mouseup',
        'click',
      ],
      'a key': ['keydown', 'change', 'keyup'],
    };
    let low = 20;
    for (const [press, events] of Object.entries(presses)) {
      for (const type of events) {
        if (type === 'change') {
          refuse();
          low += 0.5;
          slider.dispatchEvent(
            new CustomEvent('change', { detail: { low, high: 23 }, bubbles: true }),
          );
          await flush(exact);
          await flush(el);
        } else {
          slider.dispatchEvent(
            type === 'pointerdown'
              ? pointerDown()
              : new Event(type, { bubbles: true, composed: true }),
          );
          await flush(el);
        }
      }
      expect(said(el), press).toBe('Couldn’t set the range. Try again.');
    }
  });

  // #63: a refused pick in Advanced › Schedules, said from the dialog too.
  it('says a refused profile pick', async () => {
    const { hass, refuse } = setup();
    hass.devices = {
      'dev-pm': {
        id: 'dev-pm',
        identifiers: [['comfort_band', 'profile_manager']],
        name: 'Comfort Band Profiles',
        name_by_user: null,
        area_id: null,
      },
    } as HomeAssistant['devices'];
    hass.entities = {
      'select.comfort_band_profiles_active_profile': {
        entity_id: 'select.comfort_band_profiles_active_profile',
        platform: 'comfort_band',
        device_id: 'dev-pm',
        area_id: null,
        hidden: false,
        entity_category: null,
        translation_key: 'active_profile',
        name: null,
      },
    } as HomeAssistant['entities'];
    hass.states['select.comfort_band_profiles_active_profile'] = {
      entity_id: 'select.comfort_band_profiles_active_profile',
      state: 'home',
      attributes: { options: ['home', 'away'], default_profile: 'home', descriptions: {} },
      last_changed: '',
      last_updated: '',
    };
    const el = await openModal(hass);
    el.selectTab('advanced');
    await flush(el);
    const advanced = el.shadowRoot!.querySelector('comfort-band-advanced-tab')!;
    await (advanced as unknown as { updateComplete: Promise<boolean> }).updateComplete;
    const profiles = advanced.shadowRoot!.querySelector('comfort-band-profiles-tab')!;
    await (profiles as unknown as { updateComplete: Promise<boolean> }).updateComplete;
    const away = Array.from(profiles.shadowRoot!.querySelectorAll<HTMLLIElement>('li')).find(
      (li) => li.querySelector('.name')!.textContent!.trim() === 'away',
    )!;
    refuse();
    away.click();
    await flush(el);
    expect(said(el)).toBe('Couldn’t switch to “away”. Try again.');
  });
});
