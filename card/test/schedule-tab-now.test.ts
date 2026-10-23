import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/schedule-tab.js';
import type { ComfortBandScheduleTab } from '../src/tabs/schedule-tab.js';
import type { ComfortBandScheduleChart } from '../src/schedule-chart.js';
import type { ZoneEntities } from '../src/helpers.js';
import type {
  HassConnection,
  HomeAssistant,
  ProfileSchedule,
  Transition,
  UnsubscribeFunc,
} from '../src/types.js';
import { mount, teardown } from './_fixture.js';

// #33: what's in force now, and a list that reads first.

afterEach(() => {
  teardown();
  vi.useRealTimers();
});

const DAY: Transition[] = [
  { at: '06:00', low: 19, high: 22 },
  { at: '09:00', low: 17, high: 25 },
  { at: '17:30', low: 19.5, high: 22.5 },
  { at: '22:00', low: 17, high: 25 },
];

const ENTITIES = {
  effectiveLow: 'sensor.gym_effective_low',
  effectiveHigh: 'sensor.gym_effective_high',
  overrideActive: 'binary_sensor.gym_override_active',
  overrideEnds: 'sensor.gym_override_ends',
  nextBandChange: 'sensor.gym_next_band_change',
  scheduleAssignment: 'select.gym_schedule_assignment',
};

type Spec = string | { state: string; attributes?: Record<string, unknown> };

/** HA in UTC, so "now" is the same on any machine. */
function makeHass(
  overrides: Record<string, Spec | null> = {},
  schedule: Transition[] = DAY,
): HomeAssistant {
  const base: Record<string, Spec | null> = {
    'select.comfort_band_profiles_active_profile': {
      state: 'home',
      attributes: { options: ['home'], default_profile: 'home' },
    },
    'sensor.gym_effective_low': '17',
    'sensor.gym_effective_high': '25',
    'binary_sensor.gym_override_active': 'off',
    'sensor.gym_override_ends': 'unknown',
    'sensor.gym_next_band_change': {
      state: new Date(Date.UTC(2026, 9, 23, 17, 30)).toISOString(),
      attributes: { low: 19.5, high: 22.5, scheduled: true },
    },
    'select.gym_schedule_assignment': {
      state: 'Own schedule',
      attributes: { schedule_id: null, options: ['Own schedule', 'Bedrooms'] },
    },
    ...overrides,
  };
  const states: HomeAssistant['states'] = {};
  for (const [id, spec] of Object.entries(base)) {
    if (spec === null) continue;
    const { state, attributes = {} } = typeof spec === 'string' ? { state: spec } : spec;
    states[id] = { entity_id: id, state, attributes, last_changed: '', last_updated: '' };
  }
  const stored: ProfileSchedule = { baseline: schedule, current: schedule };
  const subscribeMessage = async (
    callback: (event: { schedule: ProfileSchedule | null }) => void,
  ): Promise<UnsubscribeFunc> => {
    Promise.resolve().then(() => callback({ schedule: stored }));
    return () => {};
  };
  return {
    states,
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
    },
    connection: {
      subscribeMessage: subscribeMessage as unknown as HassConnection['subscribeMessage'],
    },
    callService: vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn(),
    locale: { language: 'en-GB', time_format: '24' },
    config: { time_zone: 'UTC' },
  };
}

function makeEntities(overrides: Partial<Record<keyof typeof ENTITIES, string | null>> = {}) {
  return { ...ENTITIES, ...overrides } as unknown as ZoneEntities;
}

/** Mounted at 12:00 UTC on 23 October 2026, its clock faked. */
async function tab(
  hass = makeHass(),
  entities: ZoneEntities | null = makeEntities(),
  time = Date.UTC(2026, 9, 23, 12, 0),
): Promise<ComfortBandScheduleTab> {
  vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] });
  vi.setSystemTime(time);
  const el = await mount('comfort-band-schedule-tab', {
    hass,
    zone: 'gym',
    entities: entities ?? undefined,
  });
  await settle(el);
  await el.updateComplete;
  return el;
}

/** Lets the subscription's first answer arrive and the tab render it. */
async function settle(el: ComfortBandScheduleTab): Promise<void> {
  for (let i = 0; i < 10; i++) await Promise.resolve();
  await el.updateComplete;
}

const text = (n: Element | null | undefined) => n?.textContent?.replace(/\s+/g, ' ').trim();
const toolbar = (el: ComfortBandScheduleTab) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.list-toolbar button')).map((b) =>
    text(b),
  );
const button = (el: ComfortBandScheduleTab, label: string) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('button')).find(
    (b) => text(b) === label,
  )!;
const rows = (el: ComfortBandScheduleTab) =>
  Array.from(el.shadowRoot!.querySelectorAll('li.row')).map((r) => ({
    at: r.getAttribute('data-at'),
    current: r.getAttribute('aria-current'),
    tags: Array.from(r.querySelectorAll('.tag')).map((t) => text(t)),
  }));

describe('comfort-band-schedule-tab now', () => {
  it('says the range in force', async () => {
    const el = await tab();
    expect(text(el.shadowRoot!.querySelector('.now-line'))).toBe('Now 17–25°');
  });

  it('marks the change in force, and now on the chart', async () => {
    const el = await tab();
    expect(rows(el)).toEqual([
      { at: '06:00', current: null, tags: [] },
      { at: '09:00', current: 'true', tags: ['Current'] },
      { at: '17:30', current: null, tags: [] },
      { at: '22:00', current: null, tags: [] },
    ]);
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('09:00');
    expect(text(el.shadowRoot!.querySelector('li.row.current .tag.current'))).toBe('Current');
    const chart = el.shadowRoot!.querySelector(
      'comfort-band-schedule-chart',
    ) as ComfortBandScheduleChart;
    expect(chart.now).toBe(12 * 60);
  });

  // In HA's time zone, not the browser's.
  it('goes by HA’s time zone', async () => {
    const hass = makeHass();
    hass.config = { time_zone: 'Asia/Kolkata' };
    const el = await tab(hass);
    // 12:00 UTC is 17:30 in Kolkata.
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('17:30');
  });

  // At the minute, not a minute after it opened.
  it('moves on with the clock, at the minute', async () => {
    const el = await tab(makeHass(), makeEntities(), Date.UTC(2026, 9, 23, 17, 29, 30));
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('09:00');
    vi.advanceTimersByTime(29_999);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('09:00');
    vi.advanceTimersByTime(1);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('17:30');
    vi.advanceTimersByTime(60_000 * 5);
    await el.updateComplete;
    expect(vi.getTimerCount()).toBe(1);
  });

  // HA's update for a change comes at the change; the row moves with it.
  it('moves on with each update from HA', async () => {
    const hass = makeHass();
    const el = await tab(hass, makeEntities(), Date.UTC(2026, 9, 23, 17, 29, 50));
    vi.setSystemTime(Date.UTC(2026, 9, 23, 17, 30, 1));
    el.hass = { ...hass };
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('17:30');
  });

  it('shows now as it is when it’s shown again', async () => {
    const el = await tab(makeHass(), makeEntities(), Date.UTC(2026, 9, 23, 12, 0));
    el.remove();
    vi.setSystemTime(Date.UTC(2026, 9, 23, 18, 0));
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('17:30');
  });

  it('stops its clock when it’s taken off the page', async () => {
    const el = await tab();
    expect(vi.getTimerCount()).toBe(1);
    el.remove();
    expect(vi.getTimerCount()).toBe(0);
  });

  // A turned-off select drops out of HA's entities; the tab then shows home's.
  it('marks nothing while the active profile can’t be told', async () => {
    const hass = makeHass();
    hass.entities = {};
    const el = await tab(hass);
    const chart = el.shadowRoot!.querySelector(
      'comfort-band-schedule-chart',
    ) as ComfortBandScheduleChart;
    expect(el.shadowRoot!.querySelector('li.row.current')).toBeNull();
    expect(chart.now).toBeNull();
    el.remove();
    const unavailable = await tab(
      makeHass({ 'select.comfort_band_profiles_active_profile': 'unavailable' }),
    );
    expect(unavailable.shadowRoot!.querySelector('li.row.current')).toBeNull();
  });

  // The old profile's list stays on screen until the new one's arrives.
  it('marks nothing on the old profile’s list after a change of profile', async () => {
    const AWAY: Transition[] = [{ at: '00:00', low: 18, high: 21 }];
    const profiles = (state: string) => ({
      'select.comfort_band_profiles_active_profile': {
        state,
        attributes: { options: ['home', 'away'], default_profile: 'home' },
      },
    });
    const hass = makeHass(profiles('home'));
    let answerAway: (() => void) | null = null;
    hass.connection.subscribeMessage = (async (
      callback: (event: { schedule: ProfileSchedule | null }) => void,
      message: { profile: string },
    ) => {
      const answer = (list: Transition[]) =>
        callback({ schedule: { baseline: list, current: list } });
      if (message.profile === 'away') answerAway = () => answer(AWAY);
      else Promise.resolve().then(() => answer(DAY));
      return () => {};
    }) as unknown as HassConnection['subscribeMessage'];
    const el = await tab(hass);
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('09:00');
    el.hass = { ...hass, states: { ...hass.states, ...makeHass(profiles('away')).states } };
    await settle(el);
    const chart = () =>
      el.shadowRoot!.querySelector('comfort-band-schedule-chart') as ComfortBandScheduleChart;
    expect(rows(el).map((r) => r.at)).toEqual(['06:00', '09:00', '17:30', '22:00']);
    expect(el.shadowRoot!.querySelector('li.row.current')).toBeNull();
    expect(chart().now).toBeNull();
    answerAway!();
    await settle(el);
    expect(rows(el)).toEqual([{ at: '00:00', current: 'true', tags: ['Current'] }]);
    expect(chart().now).toBe(12 * 60);
  });

  // HA can deliver a superseded subscription's answer late: home, then
  // away, then home again, before the new home answer.
  it('marks nothing on a list after a late answer for another profile', async () => {
    const AWAY: Transition[] = [{ at: '00:00', low: 18, high: 21 }];
    const profiles = (state: string) => ({
      'select.comfort_band_profiles_active_profile': {
        state,
        attributes: { options: ['home', 'away'], default_profile: 'home' },
      },
    });
    const hass = makeHass(profiles('home'));
    const answers: Array<(list: Transition[]) => void> = [];
    hass.connection.subscribeMessage = (async (
      callback: (event: { schedule: ProfileSchedule | null }) => void,
      message: { profile: string },
    ) => {
      const answer = (list: Transition[]) =>
        callback({ schedule: { baseline: list, current: list } });
      answers.push(answer);
      if (answers.length === 1) Promise.resolve().then(() => answer(DAY));
      if (message.profile === 'away') Promise.resolve().then(() => answer(AWAY));
      return () => {};
    }) as unknown as HassConnection['subscribeMessage'];
    const el = await tab(hass);
    el.hass = { ...hass, states: { ...hass.states, ...makeHass(profiles('away')).states } };
    await settle(el);
    expect(rows(el)).toEqual([{ at: '00:00', current: 'true', tags: ['Current'] }]);
    el.hass = { ...hass, states: { ...hass.states, ...makeHass(profiles('home')).states } };
    await settle(el);
    answers[0](DAY);
    await settle(el);
    expect(rows(el)).toEqual([{ at: '00:00', current: null, tags: [] }]);
  });

  // Without a profile manager, the room's schedule is home's.
  it('marks the change in force without a profile manager', async () => {
    const hass = makeHass({ 'select.comfort_band_profiles_active_profile': null });
    hass.devices = {};
    hass.entities = {};
    const el = await tab(hass);
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('09:00');
  });

  // The list is the room's own schedule; a shared one is in force.
  it('says the list isn’t in force while the room follows a shared schedule', async () => {
    const el = await tab(
      makeHass({
        'select.gym_schedule_assignment': {
          state: 'Bedrooms',
          attributes: { schedule_id: 'abc', options: ['Own schedule', 'Bedrooms'] },
        },
      }),
    );
    expect(text(el.shadowRoot!.querySelector('.shared-note'))).toBe(
      'This room follows “Bedrooms”, a shared schedule. The changes below are its own, not the ones in force.',
    );
    expect(el.shadowRoot!.querySelector('li.row.current')).toBeNull();
    expect(el.shadowRoot!.querySelector('[aria-current]')).toBeNull();
    const chart = el.shadowRoot!.querySelector(
      'comfort-band-schedule-chart',
    ) as ComfortBandScheduleChart;
    expect(chart.now).toBeNull();
  });

  it('says the room follows a shared schedule it can’t name', async () => {
    const el = await tab(
      makeHass({
        'select.gym_schedule_assignment': { state: 'unknown', attributes: { schedule_id: 'abc' } },
      }),
    );
    expect(text(el.shadowRoot!.querySelector('.shared-note'))).toBe(
      'This room follows a shared schedule. The changes below are its own, not the ones in force.',
    );
  });

  // Not UTC, which CI runs in: the row and the marker both use HA's.
  it('marks now in HA’s time zone, a half-hour one too', async () => {
    const hass = makeHass();
    hass.config = { time_zone: 'Asia/Kolkata' };
    const el = await tab(hass);
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('17:30');
    const chart = el.shadowRoot!.querySelector(
      'comfort-band-schedule-chart',
    ) as ComfortBandScheduleChart;
    expect(chart.now).toBe(17 * 60 + 30);
  });

  it('marks nothing while it can’t tell which schedule is in force', async () => {
    const el = await tab(makeHass({ 'select.gym_schedule_assignment': 'unavailable' }));
    expect(el.shadowRoot!.querySelector('li.row.current')).toBeNull();
    expect(el.shadowRoot!.querySelector('.shared-note')).toBeNull();
  });

  // The room then follows the default profile's schedule, or its own range.
  it('marks no now on an empty list', async () => {
    const el = await tab(makeHass({}, []));
    const chart = el.shadowRoot!.querySelector(
      'comfort-band-schedule-chart',
    ) as ComfortBandScheduleChart;
    expect(chart.now).toBeNull();
  });

  it('says nothing about now without the zone’s entities', async () => {
    const el = await tab(makeHass(), null);
    expect(el.shadowRoot!.querySelector('.now-line')).toBeNull();
    expect(el.shadowRoot!.querySelector('li.row.current')).toBeNull();
  });

  it('marks a change that repeats the range before it', async () => {
    const el = await tab(
      makeHass({}, [
        { at: '01:00', low: 17.5, high: 18.5 },
        { at: '02:00', low: 17.5, high: 18.5 },
        { at: '06:00', low: 19, high: 22 },
      ]),
    );
    expect(rows(el).map((r) => r.tags)).toEqual([[], ['Same as before'], ['Current']]);
  });
});

// Real browsers check the layout itself (#33 review).
describe('comfort-band-schedule-tab layout', () => {
  const css = () =>
    (
      customElements.get('comfort-band-schedule-tab') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');

  it('wraps a row on a phone, its range whole and its buttons at the right', () => {
    expect(css()).toMatch(/\.row\s*\{[^}]*flex-wrap:\s*wrap/);
    expect(css()).toMatch(/\.row \.band\s*\{[^}]*white-space:\s*nowrap/);
    expect(css()).toMatch(/\.row \.actions\s*\{[^}]*margin-left:\s*auto/);
  });

  it('keeps the current row’s highlight under the pointer, its text legible', () => {
    expect(css()).toMatch(/\.row\.read:not\(\.current\):hover\s*\{[^}]*background:\s*none/);
    expect(css()).toMatch(
      /\.row\.current \.band,\s*\.row\.current \.tag\s*\{[^}]*color:\s*var\(--cb-text-primary\)/,
    );
    expect(css()).toMatch(/\.tag\.current\s*\{[^}]*border-color:\s*var\(--cb-accent/);
  });
});

describe('comfort-band-schedule-tab reads first', () => {
  it('offers only "Edit schedule", and rows that aren’t buttons', async () => {
    const el = await tab();
    expect(toolbar(el)).toEqual(['Edit schedule']);
    const row = el.shadowRoot!.querySelector('li.row')!;
    expect(row.hasAttribute('tabindex')).toBe(false);
    expect(row.querySelector('button')).toBeNull();
    (row as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('transition-edit-dialog')).toBeNull();
  });

  it('says there are none yet, without pointing at Add', async () => {
    const el = await tab(makeHass({}, []));
    expect(text(el.shadowRoot!.querySelector('.empty'))).toBe('No changes yet.');
  });

  it('edits behind "Edit schedule", and back with "Done", moving focus to what replaces each', async () => {
    const el = await tab();
    button(el, 'Edit schedule').click();
    await el.updateComplete;
    expect(toolbar(el)).toEqual(['+ Add a change', 'Done']);
    expect(el.shadowRoot!.activeElement).toBe(button(el, '+ Add a change'));
    const row = el.shadowRoot!.querySelector('li.row')!;
    expect(row.getAttribute('tabindex')).toBe('0');
    expect(Array.from(row.querySelectorAll('button')).map((b) => text(b))).toEqual([
      'Edit',
      'Delete',
    ]);
    expect(el.shadowRoot!.querySelector('li.row.current')!.getAttribute('data-at')).toBe('09:00');
    button(el, 'Done').click();
    await el.updateComplete;
    expect(toolbar(el)).toEqual(['Edit schedule']);
    expect(el.shadowRoot!.activeElement).toBe(button(el, 'Edit schedule'));
  });

  it('marks the change in force in edit mode too, and names it', async () => {
    const el = await tab(
      makeHass({}, [
        { at: '06:00', low: 19, high: 22 },
        { at: '09:00', low: 19, high: 22 },
        { at: '17:30', low: 19.5, high: 22.5 },
      ]),
    );
    button(el, 'Edit schedule').click();
    await el.updateComplete;
    const current = el.shadowRoot!.querySelector('li.row.current')!;
    expect(current.getAttribute('data-at')).toBe('09:00');
    expect(current.getAttribute('aria-current')).toBe('true');
    expect(Array.from(current.querySelectorAll('.tag')).map((t) => text(t))).toEqual([
      'Current',
      'Same as before',
    ]);
    expect(current.getAttribute('aria-label')).toBe(
      'Edit the 09:00 change, 19 to 22 degrees, current, same as before',
    );
  });

  // Focus moves once, not on every update from HA after it.
  it('moves focus only once after a change of mode', async () => {
    const hass = makeHass();
    const el = await tab(hass);
    button(el, 'Edit schedule').click();
    await el.updateComplete;
    (el.shadowRoot!.querySelector('li.row') as HTMLElement).focus();
    el.hass = { ...hass };
    await el.updateComplete;
    expect(el.shadowRoot!.activeElement).toBe(el.shadowRoot!.querySelector('li.row'));
  });

  it('drops a delete it was asking about when editing is done', async () => {
    const el = await tab();
    button(el, 'Edit schedule').click();
    await el.updateComplete;
    (el.shadowRoot!.querySelector('li.row .button.danger') as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.confirm')).not.toBeNull();
    button(el, 'Done').click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.confirm')).toBeNull();
  });
});
