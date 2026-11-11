import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import '../src/tabs/schedule-tab.js';
import '../src/comfort-band-card.js';
import type { ComfortBandScheduleTab } from '../src/tabs/schedule-tab.js';
import type { ComfortBandCard } from '../src/comfort-band-card.js';
import type { ComfortBandModal } from '../src/modal.js';
import type {
  DeviceRegistryEntry,
  HassConnection,
  HassEntity,
  HomeAssistant,
  ProfileSchedule,
  Transition,
  UnsubscribeFunc,
} from '../src/types.js';
import { mount, teardown } from './_fixture.js';

// #49: a change made to one room's list is never written to another's.

afterEach(() => teardown());

// happy-dom has no `<dialog>.showModal()`, which the modal's `open()` calls.
beforeAll(() => {
  const proto = globalThis.HTMLDialogElement?.prototype as
    | (HTMLDialogElement & { showModal?: () => void })
    | undefined;
  if (proto && typeof proto.showModal !== 'function') proto.showModal = function () {};
});

const GYM: Transition[] = [
  { at: '06:00', low: 19, high: 22 },
  { at: '22:00', low: 17, high: 25 },
];
const STUDY: Transition[] = [{ at: '07:30', low: 18, high: 23 }];
const STUDY_AWAY: Transition[] = [{ at: '00:00', low: 15, high: 28 }];
const SELECT = 'select.comfort_band_profiles_active_profile';
const OPTIONS = { options: ['home', 'away'], default_profile: 'home' };

function select(state: string): HassEntity {
  return { entity_id: SELECT, state, attributes: OPTIONS, last_changed: '', last_updated: '' };
}

function device(id: string, identifier: string, name: string): DeviceRegistryEntry {
  return {
    id,
    identifiers: [['comfort_band', identifier]],
    name,
    name_by_user: null,
    area_id: null,
  };
}

/**
 * HA with two rooms, gym and study, and home and away profiles. Each
 * `room/profile` listed in `auto` answers its subscription at once; the
 * others wait for `answer`.
 */
function setup(auto: Record<string, Transition[]> = { 'gym/home': GYM }) {
  const subscribed: string[] = [];
  const released: string[] = [];
  const listeners = new Map<string, (event: { schedule: ProfileSchedule | null }) => void>();
  const subscribeMessage = async (
    callback: (event: { schedule: ProfileSchedule | null }) => void,
    message: { zone: string; profile: string },
  ): Promise<UnsubscribeFunc> => {
    const key = `${message.zone}/${message.profile}`;
    subscribed.push(key);
    listeners.set(key, callback);
    const list = auto[key];
    if (list)
      Promise.resolve().then(() => callback({ schedule: { baseline: list, current: list } }));
    return () => {
      released.push(key);
    };
  };
  const hass: HomeAssistant = {
    states: { [SELECT]: select('home') },
    devices: {
      'dev-pm': device('dev-pm', 'profile_manager', 'Comfort Band Profiles'),
      'dev-gym': device('dev-gym', 'zone:gym', 'Gym'),
      'dev-study': device('dev-study', 'zone:study', 'Study'),
    },
    entities: {
      [SELECT]: {
        entity_id: SELECT,
        platform: 'comfort_band',
        device_id: 'dev-pm',
        area_id: null,
        hidden: false,
        entity_category: null,
        translation_key: 'active_profile',
        name: null,
      },
    },
    connection: {
      subscribeMessage: subscribeMessage as unknown as HassConnection['subscribeMessage'],
    },
    callService: vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn(),
    locale: { language: 'en-GB', time_format: '24' },
    config: { time_zone: 'UTC' },
  };
  const answer = (key: string, list: Transition[]) =>
    listeners.get(key)!({ schedule: { baseline: list, current: list } });
  return { hass, subscribed, released, answer };
}

/** Lets subscriptions answer and the tab render what they said. */
async function settle(el: { updateComplete: Promise<boolean> }): Promise<void> {
  for (let i = 0; i < 10; i++) await Promise.resolve();
  await el.updateComplete;
  await el.updateComplete;
}

async function tab(hass: HomeAssistant): Promise<ComfortBandScheduleTab> {
  const el = await mount('comfort-band-schedule-tab', { hass, zone: 'gym' });
  await settle(el);
  return el;
}

/** The tab's room, as the card passes it on when its config is edited. */
async function moveTo(el: ComfortBandScheduleTab, zone: string): Promise<void> {
  el.zone = zone;
  await settle(el);
}

const text = (n: Element | null | undefined) => n?.textContent?.replace(/\s+/g, ' ').trim();
const root = (el: ComfortBandScheduleTab) => el.shadowRoot!;
const button = (el: ComfortBandScheduleTab, label: string) =>
  Array.from(root(el).querySelectorAll<HTMLButtonElement>('button')).find(
    (b) => text(b) === label,
  )!;
const row = (el: ComfortBandScheduleTab, at: string) =>
  root(el).querySelector<HTMLElement>(`li.row[data-at="${at}"]`)!;
const rows = (el: ComfortBandScheduleTab) =>
  Array.from(root(el).querySelectorAll('li.row')).map((r) => r.getAttribute('data-at'));
const notice = (el: ComfortBandScheduleTab) => text(root(el).querySelector('.profile-notice'));
const dialog = (el: ComfortBandScheduleTab) => root(el).querySelector('transition-edit-dialog');
const NOT_SAVED = 'This card now shows a different room, so your change wasn’t saved.';

async function editing(el: ComfortBandScheduleTab): Promise<void> {
  button(el, 'Edit schedule').click();
  await el.updateComplete;
}

/** Opens the form on a row, as its Edit button does. */
async function editRow(el: ComfortBandScheduleTab, at: string): Promise<void> {
  row(el, at).querySelector<HTMLButtonElement>('button.secondary')!.click();
  await el.updateComplete;
}

/** The form's Save, as the dialog sends it. */
function save(el: ComfortBandScheduleTab, transition: Transition): void {
  dialog(el)!.dispatchEvent(
    new CustomEvent('dialog-save', { detail: { transition }, bubbles: true, composed: true }),
  );
}

describe('comfort-band-schedule-tab across a change of room', () => {
  it('subscribes once to the room it opens with', async () => {
    const { hass, subscribed } = setup();
    const el = await tab(hass);
    expect(subscribed).toEqual(['gym/home']);
    expect(rows(el)).toEqual(['06:00', '22:00']);
  });

  it('shows the new room’s list loading, not the old one’s, then the new one', async () => {
    const { hass, subscribed, answer } = setup();
    const el = await tab(hass);
    await moveTo(el, 'study');
    expect(subscribed).toEqual(['gym/home', 'study/home']);
    expect(rows(el)).toEqual([]);
    expect(text(root(el).querySelector('.loading'))).toBe('Loading schedule…');
    expect(root(el).querySelector('.header')).toBeNull();
    expect(button(el, 'Edit schedule')).toBeUndefined();
    answer('study/home', STUDY);
    await settle(el);
    expect(rows(el)).toEqual(['07:30']);
    expect(text(root(el).querySelector('.header'))).toBe('Schedule: home');
  });

  it('lets the old room’s subscription go, and pays no heed to it after', async () => {
    const { hass, released, answer } = setup({ 'gym/home': GYM, 'study/home': STUDY });
    const el = await tab(hass);
    await moveTo(el, 'study');
    expect(released).toEqual(['gym/home']);
    answer('gym/home', [{ at: '12:00', low: 20, high: 24 }]);
    await settle(el);
    expect(rows(el)).toEqual(['07:30']);
  });

  it('drops a change being made in the form, says so, and moves focus to it', async () => {
    const { hass } = setup({ 'gym/home': GYM, 'study/home': STUDY });
    const el = await tab(hass);
    await editing(el);
    await editRow(el, '06:00');
    expect(dialog(el)).not.toBeNull();
    await moveTo(el, 'study');
    expect(dialog(el)).toBeNull();
    expect(notice(el)).toBe(NOT_SAVED);
    expect(root(el).activeElement).toBe(root(el).querySelector('.profile-notice'));
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('drops a delete being confirmed, and says so', async () => {
    const { hass } = setup({ 'gym/home': GYM, 'study/home': STUDY });
    const el = await tab(hass);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    await moveTo(el, 'study');
    expect(root(el).querySelector('li.row.confirm')).toBeNull();
    expect(notice(el)).toBe(NOT_SAVED);
    expect(rows(el)).toEqual(['07:30']);
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('says nothing when the room changes with no change being made', async () => {
    const { hass } = setup({ 'gym/home': GYM, 'study/home': STUDY });
    const el = await tab(hass);
    await editing(el);
    await moveTo(el, 'study');
    expect(notice(el)).toBeUndefined();
    expect(rows(el)).toEqual(['07:30']);
  });

  it('puts the notice away when the room changes again', async () => {
    const { hass } = setup({ 'gym/home': GYM, 'study/home': STUDY });
    const el = await tab(hass);
    await editing(el);
    await editRow(el, '06:00');
    await moveTo(el, 'study');
    expect(notice(el)).toBe(NOT_SAVED);
    await moveTo(el, 'gym');
    expect(notice(el)).toBeUndefined();
  });

  it('writes the new room’s list to the new room once it’s arrived', async () => {
    const { hass } = setup({ 'gym/home': GYM, 'study/home': STUDY });
    const el = await tab(hass);
    await moveTo(el, 'study');
    await editing(el);
    await editRow(el, '07:30');
    save(el, { at: '07:30', low: 19, high: 23 });
    await settle(el);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'study',
      profile: 'home',
      transitions: [{ at: '07:30', low: 19, high: 23 }],
    });
    expect(notice(el)).toBeUndefined();
  });

  it('refuses to write a list to a room it isn’t from', async () => {
    const { hass } = setup();
    const el = await tab(hass);
    await editing(el);
    (el as unknown as { _listZone: string })._listZone = 'study';
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    button(el, 'Delete').click();
    await settle(el);
    expect(hass.callService).not.toHaveBeenCalled();
    expect(notice(el)).toBe(NOT_SAVED);
    expect(root(el).activeElement).toBe(root(el).querySelector('.profile-notice'));
  });

  // A save sent before the change of room was to the room shown then.
  it('says nothing of a save already on its way', async () => {
    const { hass } = setup({ 'gym/home': GYM, 'study/home': STUDY });
    let finish: () => void = () => {};
    hass.callService = vi.fn(() => new Promise<undefined>((r) => (finish = () => r(undefined))));
    const el = await tab(hass);
    await editing(el);
    await editRow(el, '06:00');
    save(el, { at: '06:00', low: 20, high: 23 });
    await moveTo(el, 'study');
    finish();
    await settle(el);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'home',
      transitions: [
        { at: '06:00', low: 20, high: 23 },
        { at: '22:00', low: 17, high: 25 },
      ],
    });
    expect(notice(el)).toBeUndefined();
    expect(rows(el)).toEqual(['07:30']);
  });

  it('says it’s the room that changed where the profile changes with it', async () => {
    const { hass, subscribed } = setup({ 'gym/home': GYM, 'study/away': STUDY_AWAY });
    const el = await tab(hass);
    await editing(el);
    await editRow(el, '06:00');
    el.hass = { ...hass, states: { ...hass.states, [SELECT]: select('away') } };
    el.zone = 'study';
    await settle(el);
    expect(dialog(el)).toBeNull();
    expect(notice(el)).toBe(NOT_SAVED);
    expect(subscribed.at(-1)).toBe('study/away');
    expect(rows(el)).toEqual(['00:00']);
    expect(text(root(el).querySelector('.header'))).toBe('Schedule: away');
  });
});

describe('comfort-band-card with its room changed while the Schedule tab is open', () => {
  it('shows the new room’s schedule, and writes there', async () => {
    const { hass, subscribed } = setup({ 'gym/home': GYM, 'study/home': STUDY });
    const card = document.createElement('comfort-band-card') as ComfortBandCard;
    card.setConfig({ type: 'custom:comfort-band-card', zone: 'gym' });
    card.hass = hass;
    document.body.appendChild(card);
    await card.updateComplete;
    const modal = card.shadowRoot!.querySelector<ComfortBandModal>('comfort-band-modal')!;
    modal.open();
    modal.selectTab('schedule');
    await settle(modal);
    const el = modal.shadowRoot!.querySelector<ComfortBandScheduleTab>(
      'comfort-band-schedule-tab',
    )!;
    await settle(el);
    expect(rows(el)).toEqual(['06:00', '22:00']);

    card.setConfig({ type: 'custom:comfort-band-card', zone: 'study' });
    await settle(card);
    await settle(modal);
    await settle(el);
    expect(modal.shadowRoot!.querySelector('comfort-band-schedule-tab')).toBe(el);
    expect(text(modal.shadowRoot!.querySelector('h2'))).toBe('Study');
    expect(subscribed).toEqual(['gym/home', 'study/home']);
    expect(rows(el)).toEqual(['07:30']);

    await editing(el);
    row(el, '07:30').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    button(el, 'Delete').click();
    await settle(el);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'study',
      profile: 'home',
      transitions: [],
    });
  });
});
