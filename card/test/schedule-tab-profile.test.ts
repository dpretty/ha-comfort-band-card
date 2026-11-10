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
 * subscription at once; the others wait for `answer`, and those in `failing`
 * refuse it.
 */
function setup(
  active: HassEntity = select('home'),
  auto: Record<string, Transition[]> = { home: HOME },
  failing: string[] = [],
) {
  const subscribed: string[] = [];
  const listeners = new Map<string, (event: { schedule: ProfileSchedule | null }) => void>();
  const subscribeMessage = async (
    callback: (event: { schedule: ProfileSchedule | null }) => void,
    message: { profile: string },
  ): Promise<UnsubscribeFunc> => {
    subscribed.push(message.profile);
    if (failing.includes(message.profile))
      throw new Error(`Profile '${message.profile}' does not exist`);
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
  'The active profile is “away”, so your change to the “home” schedule wasn’t saved.';

async function editing(el: ComfortBandScheduleTab): Promise<void> {
  button(el, 'Edit schedule').click();
  await el.updateComplete;
}

/** The form's Save, as the dialog sends it. */
function save(el: ComfortBandScheduleTab, transition: Transition): void {
  dialog(el)!.dispatchEvent(
    new CustomEvent('dialog-save', { detail: { transition }, bubbles: true, composed: true }),
  );
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

  // Nothing can be started on the old list once the profile has changed: it
  // isn't on screen to start it on (#46 review).
  it('shows the new profile’s list loading, not the old one’s', async () => {
    const { hass, answer } = setup();
    const el = await tab(hass);
    await editing(el);
    await switchTo(el, select('away'));
    expect(rows(el)).toEqual([]);
    expect(text(root(el).querySelector('.loading'))).toBe('Loading schedule…');
    expect(root(el).querySelector('.header')).toBeNull();
    expect(notice(el)).toBeUndefined();
    answer('away', AWAY);
    await settle(el);
    expect(rows(el)).toEqual(['00:00']);
    expect(text(root(el).querySelector('.header'))).toBe('Schedule: away');
    // Its changes go to away.
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

  // The backstop, should a list ever be on screen for a profile that isn't
  // the active one.
  it('refuses to write a list to a profile it isn’t from', async () => {
    const { hass } = setup();
    const el = await tab(hass);
    await editing(el);
    (el as unknown as { _profile: string })._profile = 'away';
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    button(el, 'Delete').click();
    await settle(el);
    expect(hass.callService).not.toHaveBeenCalled();
    expect(notice(el)).toBe(NOT_SAVED);
    expect(root(el).activeElement).toBe(root(el).querySelector('.profile-notice'));
  });

  // A failed save puts its list back only if nothing has replaced it: here
  // away's list has, and putting home's back would show it as away's.
  it('keeps the new profile’s list when a save from before the change fails', async () => {
    const { hass, answer } = setup();
    let fail: () => void = () => {};
    hass.callService = vi.fn(
      () => new Promise<undefined>((_, reject) => (fail = () => reject(new Error('Failed')))),
    );
    const el = await tab(hass);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.secondary')!.click();
    await el.updateComplete;
    save(el, { at: '06:00', low: 20, high: 23 });
    await settle(el);
    await switchTo(el, select('away'));
    answer('away', AWAY);
    await settle(el);
    fail();
    await settle(el);
    expect(text(root(el).querySelector('.error'))).toBe('Failed');
    // Shown again, before away's next answer: still away's list.
    el.remove();
    document.body.appendChild(el);
    await settle(el);
    expect(rows(el)).toEqual(['00:00']);
    expect(text(root(el).querySelector('.header'))).toBe('Schedule: away');
  });

  // Shown again before HA answers, the tab shows the list as it was.
  it('puts a failed save’s list back where nothing has replaced it', async () => {
    const { hass, answer } = setup(select('home'), {});
    hass.callService = vi.fn().mockRejectedValue(new Error('Failed'));
    const el = await tab(hass);
    answer('home', HOME);
    await settle(el);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    button(el, 'Delete').click();
    await settle(el);
    el.remove();
    document.body.appendChild(el);
    await settle(el);
    expect(rows(el)).toEqual(['06:00', '22:00']);
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
    save(el, { at: '06:00', low: 20, high: 23 });
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

  it('says nothing when the profile changes with no change being made', async () => {
    const { hass } = setup(select('home'), { home: HOME, away: AWAY });
    const el = await tab(hass);
    await editing(el);
    await switchTo(el, select('away'));
    expect(notice(el)).toBeUndefined();
    expect(rows(el)).toEqual(['00:00']);
  });
});

describe('comfort-band-schedule-tab notice', () => {
  /** A change dropped by a change of profile, with away's list on screen. */
  async function dropped(): Promise<ComfortBandScheduleTab> {
    const { hass } = setup(select('home'), { home: HOME, away: AWAY });
    const el = await tab(hass);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    await switchTo(el, select('away'));
    expect(notice(el)).toBe(NOT_SAVED);
    return el;
  }

  it('goes when a delete starts', async () => {
    const el = await dropped();
    row(el, '00:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    button(el, 'Cancel').click();
    await el.updateComplete;
    expect(notice(el)).toBeUndefined();
  });

  it('goes when the form opens', async () => {
    const el = await dropped();
    button(el, '+ Add a change').click();
    await el.updateComplete;
    dialog(el)!.dispatchEvent(new CustomEvent('dialog-cancel', { bubbles: true, composed: true }));
    await settle(el);
    expect(dialog(el)).toBeNull();
    expect(notice(el)).toBeUndefined();
  });

  it('goes when Edit opens the form', async () => {
    const el = await dropped();
    row(el, '00:00').querySelector<HTMLButtonElement>('button.secondary')!.click();
    await el.updateComplete;
    dialog(el)!.dispatchEvent(new CustomEvent('dialog-cancel', { bubbles: true, composed: true }));
    await settle(el);
    expect(dialog(el)).toBeNull();
    expect(notice(el)).toBeUndefined();
  });

  // A delete confirmed before the change of profile restores focus when its
  // write is done: by then it's the notice's, and stays so.
  it('keeps focus on the notice when an earlier write finishes', async () => {
    const { hass } = setup(select('home'), { home: HOME, away: AWAY });
    let finish: () => void = () => {};
    hass.callService = vi.fn(() => new Promise<undefined>((r) => (finish = () => r(undefined))));
    const el = await tab(hass);
    await editing(el);
    row(el, '06:00').querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    button(el, 'Delete').click();
    await el.updateComplete;
    row(el, '22:00').querySelector<HTMLButtonElement>('button.secondary')!.click();
    await el.updateComplete;
    await switchTo(el, select('away'));
    expect(notice(el)).toBe(NOT_SAVED);
    finish();
    await settle(el);
    expect(root(el).activeElement).toBe(root(el).querySelector('.profile-notice'));
  });

  // What it says is about the profile it names; with another, it's gone.
  it('goes when the profile changes again', async () => {
    const el = await dropped();
    await switchTo(el, select('home'));
    expect(notice(el)).toBeUndefined();
  });

  it('takes focus once, not again at each update from HA', async () => {
    const el = await dropped();
    const done = button(el, 'Done');
    done.focus();
    el.hass = { ...el.hass! };
    await settle(el);
    expect(root(el).activeElement).toBe(done);
  });

  // A profile's name can be long and unbroken.
  it('wraps a long name rather than widening the dialog', () => {
    const css = (
      customElements.get('comfort-band-schedule-tab') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    expect(css).toMatch(/\.profile-notice\s*\{[^}]*overflow-wrap:\s*anywhere/);
    expect(css).toMatch(/\.profile-label\s*\{[^}]*overflow-wrap:\s*anywhere/);
  });
});

describe('comfort-band-schedule-tab header', () => {
  // It names the list on screen, so not before there is one.
  it('names no profile until its list arrives', async () => {
    const { hass, answer } = setup(select('home'), {});
    const el = await tab(hass);
    expect(root(el).querySelector('.header')).toBeNull();
    answer('home', HOME);
    await settle(el);
    expect(text(root(el).querySelector('.header'))).toBe('Schedule: home');
  });

  it('names no profile over an error', async () => {
    const { hass } = setup(select('home'), { home: HOME }, ['away']);
    const el = await tab(hass);
    await switchTo(el, select('away'));
    expect(text(root(el).querySelector('.error'))).toBe("Profile 'away' does not exist");
    expect(root(el).querySelector('.header')).toBeNull();
  });
});

describe('comfort-band-schedule-tab with the profile select unreadable', () => {
  // The select's own "unavailable" and "unknown" carry no `default_profile`.
  it('doesn’t take the select’s own “unavailable” or “unknown” as a profile', async () => {
    const { hass, subscribed } = setup(select('unavailable', {}), { home: HOME, away: AWAY });
    const el = await tab(hass);
    expect(subscribed).toEqual(['home']);
    expect(rows(el)).toEqual(['06:00', '22:00']);
    await switchTo(el, select('unknown', {}));
    await switchTo(el, select('unavailable', {}));
    expect(subscribed).toEqual(['home']);
    expect(root(el).querySelector('.error')).toBeNull();
    await switchTo(el, select('away'));
    expect(subscribed).toEqual(['home', 'away']);
    expect(rows(el)).toEqual(['00:00']);
  });

  // The profile manager's device and the select's entry, but no state yet.
  it('goes by home while the select has no state', async () => {
    const { hass, subscribed } = setup(select('home'), { home: HOME });
    delete hass.states[SELECT];
    const el = await tab(hass);
    expect(subscribed).toEqual(['home']);
    expect(rows(el)).toEqual(['06:00', '22:00']);
  });

  // A live select carries `default_profile`: with it, they're profiles.
  it.each(['unavailable', 'unknown'])('still takes a profile named “%s”', async (name) => {
    const { hass, subscribed } = setup(
      select(name, { options: ['home', name], default_profile: 'home' }),
      { home: HOME, [name]: AWAY },
    );
    const el = await tab(hass);
    expect(subscribed).toEqual([name]);
    expect(rows(el)).toEqual(['00:00']);
  });
});
