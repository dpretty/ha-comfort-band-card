import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/schedule-tab.js';
import type { ComfortBandScheduleTab } from '../src/tabs/schedule-tab.js';
import type {
  HassConnection,
  HassEntity,
  HomeAssistant,
  ProfileSchedule,
  Transition,
  UnsubscribeFunc,
} from '../src/types.js';
import { mount, teardown } from './_fixture.js';

// #46: a change made to one profile's list is never written to another's.

afterEach(() => teardown());

const HOME: Transition[] = [
  { at: '06:00', low: 19, high: 22 },
  { at: '22:00', low: 17, high: 25 },
];
const AWAY: Transition[] = [{ at: '00:00', low: 15, high: 28 }];
const SELECT = 'select.comfort_band_profiles_active_profile';
const OPTIONS = { options: ['home', 'away'], default_profile: 'home' };

function select(state: string, attributes: Record<string, unknown> = OPTIONS): HassEntity {
  return { entity_id: SELECT, state, attributes, last_changed: '', last_updated: '' };
}

/**
 * HA with home and away profiles. Each profile listed in `auto` answers its
 * subscription at once; the others wait for `answer`.
 */
function setup(
  active: HassEntity = select('home'),
  auto: Record<string, Transition[]> = { home: HOME },
) {
  const subscribed: string[] = [];
  const listeners = new Map<string, (event: { schedule: ProfileSchedule | null }) => void>();
  const subscribeMessage = async (
    callback: (event: { schedule: ProfileSchedule | null }) => void,
    message: { profile: string },
  ): Promise<UnsubscribeFunc> => {
    subscribed.push(message.profile);
    listeners.set(message.profile, callback);
    const list = auto[message.profile];
    if (list)
      Promise.resolve().then(() => callback({ schedule: { baseline: list, current: list } }));
    return () => {};
  };
  const hass: HomeAssistant = {
    states: { [SELECT]: active },
    devices: {
      'dev-pm': {
        id: 'dev-pm',
        identifiers: [['comfort_band', 'profile_manager']],
        name: 'Comfort Band Profiles',
        name_by_user: null,
        area_id: null,
      },
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
  const answer = (profile: string, list: Transition[]) =>
    listeners.get(profile)!({ schedule: { baseline: list, current: list } });
  return { hass, subscribed, answer };
}

/** Lets subscriptions answer and the tab render what they said. */
async function settle(el: ComfortBandScheduleTab): Promise<void> {
  for (let i = 0; i < 10; i++) await Promise.resolve();
  await el.updateComplete;
  await el.updateComplete;
}

async function tab(hass: HomeAssistant): Promise<ComfortBandScheduleTab> {
  const el = await mount('comfort-band-schedule-tab', { hass, zone: 'gym' });
  await settle(el);
  return el;
}

/** The active profile, as HA would publish its change. */
async function switchTo(el: ComfortBandScheduleTab, active: HassEntity): Promise<void> {
  el.hass = { ...el.hass!, states: { ...el.hass!.states, [SELECT]: active } };
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
const NOT_SAVED =
  'The active profile changed to “away”, so your change to the “home” schedule wasn’t saved.';

async function editing(el: ComfortBandScheduleTab): Promise<void> {
  button(el, 'Edit schedule').click();
  await el.updateComplete;
}

async function save(el: ComfortBandScheduleTab, transition: Transition): Promise<void> {
  dialog(el)!.dispatchEvent(
    new CustomEvent('dialog-save', { detail: { transition }, bubbles: true, composed: true }),
  );
  await settle(el);
}

describe('comfort-band-schedule-tab across a change of active profile', () => {
  it('drops a change being made in the form, says so, and moves focus to it', async () => {
    const { hass } = setup();
    const el = await tab(hass);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.secondary')!.click();
    await el.updateComplete;
    expect(dialog(el)).not.toBeNull();
    await switchTo(el, select('away'));
    expect(dialog(el)).toBeNull();
    expect(notice(el)).toBe(NOT_SAVED);
    const shown = root(el).querySelector('.profile-notice')!;
    expect(shown.getAttribute('role')).toBe('status');
    expect(root(el).activeElement).toBe(shown);
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('drops a delete being confirmed, and says so', async () => {
    const { hass } = setup();
    const el = await tab(hass);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    expect(root(el).querySelector('li.row.confirm')).not.toBeNull();
    await switchTo(el, select('away'));
    expect(root(el).querySelector('li.row.confirm')).toBeNull();
    expect(notice(el)).toBe(NOT_SAVED);
    expect(hass.callService).not.toHaveBeenCalled();
  });

  // The old list stays on screen until the new one's arrives: nothing made
  // from it is written to the new profile.
  it('refuses a delete from the old list before the new one arrives', async () => {
    const { hass, answer } = setup();
    const el = await tab(hass);
    await editing(el);
    await switchTo(el, select('away'));
    expect(rows(el)).toEqual(['06:00', '22:00']);
    expect(notice(el)).toBeUndefined();
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    button(el, 'Delete').click();
    await settle(el);
    expect(hass.callService).not.toHaveBeenCalled();
    expect(notice(el)).toBe(NOT_SAVED);
    expect(root(el).activeElement).toBe(root(el).querySelector('.profile-notice'));
    expect(rows(el)).toEqual(['06:00', '22:00']);
    // Once away's list is on screen, its changes go to away.
    answer('away', AWAY);
    await settle(el);
    row(el, '00:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    button(el, 'Delete').click();
    await settle(el);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'away',
      transitions: [],
    });
  });

  it('refuses a save from the old list before the new one arrives', async () => {
    const { hass } = setup();
    const el = await tab(hass);
    await editing(el);
    await switchTo(el, select('away'));
    button(el, '+ Add a change').click();
    await el.updateComplete;
    await save(el, { at: '13:00', low: 18, high: 24 });
    expect(hass.callService).not.toHaveBeenCalled();
    expect(dialog(el)).toBeNull();
    expect(notice(el)).toBe(NOT_SAVED);
  });

  // The form's change is to home's list: with home active again, it's good.
  it('keeps a change being made when the profile changes back to the list’s', async () => {
    const { hass } = setup();
    const el = await tab(hass);
    await editing(el);
    await switchTo(el, select('away'));
    row(el, '06:00').querySelector<HTMLButtonElement>('button.secondary')!.click();
    await el.updateComplete;
    await switchTo(el, select('home'));
    expect(dialog(el)).not.toBeNull();
    expect(notice(el)).toBeUndefined();
    await save(el, { at: '06:00', low: 20, high: 23 });
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'home',
      transitions: [
        { at: '06:00', low: 20, high: 23 },
        { at: '22:00', low: 17, high: 25 },
      ],
    });
  });

  // A save sent before the change of profile was to the profile active then.
  it('says nothing of a save already on its way', async () => {
    const { hass } = setup(select('home'), { home: HOME, away: AWAY });
    let finish: () => void = () => {};
    hass.callService = vi.fn(() => new Promise<undefined>((r) => (finish = () => r(undefined))));
    const el = await tab(hass);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.secondary')!.click();
    await el.updateComplete;
    dialog(el)!.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { transition: { at: '06:00', low: 20, high: 23 } },
        bubbles: true,
        composed: true,
      }),
    );
    await switchTo(el, select('away'));
    finish();
    await settle(el);
    expect(hass.callService).toHaveBeenCalledWith(
      'comfort_band',
      'set_schedule',
      expect.objectContaining({ profile: 'home' }),
    );
    expect(notice(el)).toBeUndefined();
    expect(rows(el)).toEqual(['00:00']);
  });

  it('says nothing of a delete from the form already on its way', async () => {
    const { hass } = setup(select('home'), { home: HOME, away: AWAY });
    let finish: () => void = () => {};
    hass.callService = vi.fn(() => new Promise<undefined>((r) => (finish = () => r(undefined))));
    const el = await tab(hass);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.secondary')!.click();
    await el.updateComplete;
    dialog(el)!.dispatchEvent(
      new CustomEvent('dialog-delete', { detail: { at: '06:00' }, bubbles: true, composed: true }),
    );
    await switchTo(el, select('away'));
    finish();
    await settle(el);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'home',
      transitions: [{ at: '22:00', low: 17, high: 25 }],
    });
    expect(notice(el)).toBeUndefined();
  });

  // Two changes of profile before the first's list arrives: the change was
  // to the list on screen, home's, not to the profile in between.
  it('names the schedule the change was to', async () => {
    const three = { options: ['home', 'away', 'guest'], default_profile: 'home' };
    const { hass } = setup(select('home', three));
    const el = await tab(hass);
    await editing(el);
    await switchTo(el, select('away', three));
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    await switchTo(el, select('guest', three));
    expect(notice(el)).toBe(
      'The active profile changed to “guest”, so your change to the “home” schedule wasn’t saved.',
    );
  });

  it('says nothing when the profile changes with no change being made', async () => {
    const { hass } = setup(select('home'), { home: HOME, away: AWAY });
    const el = await tab(hass);
    await editing(el);
    await switchTo(el, select('away'));
    expect(notice(el)).toBeUndefined();
    expect(rows(el)).toEqual(['00:00']);
  });

  it('puts the notice away when the next change starts', async () => {
    const { hass } = setup(select('home'), { home: HOME, away: AWAY });
    const el = await tab(hass);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    await switchTo(el, select('away'));
    expect(notice(el)).toBe(NOT_SAVED);
    row(el, '00:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    button(el, 'Cancel').click();
    await el.updateComplete;
    expect(notice(el)).toBeUndefined();
  });
});

describe('comfort-band-schedule-tab with the profile select unreadable', () => {
  it('doesn’t take “unavailable” or “unknown” as a profile', async () => {
    const { hass, subscribed } = setup(select('unavailable', {}), { home: HOME, away: AWAY });
    const el = await tab(hass);
    expect(subscribed).toEqual(['home']);
    expect(rows(el)).toEqual(['06:00', '22:00']);
    await switchTo(el, select('unknown'));
    await switchTo(el, select('unavailable', {}));
    expect(subscribed).toEqual(['home']);
    expect(root(el).querySelector('.error')).toBeNull();
    await switchTo(el, select('away'));
    expect(subscribed).toEqual(['home', 'away']);
    expect(rows(el)).toEqual(['00:00']);
  });

  // HA reports a profile named "unavailable" with the select's attributes.
  it('still takes a profile named “unavailable”', async () => {
    const { hass, subscribed } = setup(
      select('unavailable', { options: ['home', 'unavailable'], default_profile: 'home' }),
      { home: HOME, unavailable: AWAY },
    );
    const el = await tab(hass);
    expect(subscribed).toEqual(['unavailable']);
    expect(rows(el)).toEqual(['00:00']);
  });
});
