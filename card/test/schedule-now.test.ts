import { describe, it, expect } from 'vitest';
import {
  currentIndex,
  minutesOfDay,
  nowLine,
  ownScheduleInForce,
  sameAsBefore,
  sharedScheduleName,
} from '../src/schedule-now.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant, Transition } from '../src/types.js';
import { stubConnection } from './_fixture.js';

type Spec = string | { state: string; attributes?: Record<string, unknown> };

const ENTITIES = {
  effectiveLow: 'sensor.gym_effective_low',
  effectiveHigh: 'sensor.gym_effective_high',
  overrideActive: 'binary_sensor.gym_override_active',
  overrideEnds: 'sensor.gym_override_ends',
  nextBandChange: 'sensor.gym_next_band_change',
  scheduleAssignment: 'select.gym_schedule_assignment',
  peakSaving: 'sensor.gym_peak_saving',
};

function makeEntities(overrides: Partial<Record<keyof typeof ENTITIES, string | null>> = {}) {
  return { ...ENTITIES, ...overrides } as unknown as ZoneEntities;
}

const NOW = new Date(2026, 9, 23, 12, 0).getTime();
const at = (hour: number, minute = 0, days = 0) =>
  new Date(2026, 9, 23 + days, hour, minute).toISOString();

function makeHass(overrides: Record<string, Spec | null> = {}): HomeAssistant {
  const base: Record<string, Spec | null> = {
    'sensor.gym_effective_low': '19.5',
    'sensor.gym_effective_high': '22.5',
    'binary_sensor.gym_override_active': 'off',
    'sensor.gym_override_ends': 'unknown',
    'sensor.gym_next_band_change': {
      state: at(21),
      attributes: { low: 18, high: 22, scheduled: true },
    },
    'select.gym_schedule_assignment': {
      state: 'Own schedule',
      attributes: { schedule_id: null, options: ['Own schedule', 'Bedrooms'] },
    },
    'sensor.gym_peak_saving': 'waiting',
    ...overrides,
  };
  const states: HomeAssistant['states'] = {};
  for (const [id, spec] of Object.entries(base)) {
    if (spec === null) continue;
    const { state, attributes = {} } = typeof spec === 'string' ? { state: spec } : spec;
    states[id] = { entity_id: id, state, attributes, last_changed: '', last_updated: '' };
  }
  return {
    states,
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: async () => undefined,
    callWS: async () => undefined as never,
    locale: { language: 'en-GB', time_format: '24' },
  };
}

const t = (at: string, low: number, high: number): Transition => ({ at, low, high });

describe('minutesOfDay', () => {
  // A schedule's times are HA's local time, wherever the browser is.
  it('counts in HA’s time zone', () => {
    const ms = Date.UTC(2026, 9, 23, 1, 30);
    expect(minutesOfDay(ms, { config: { time_zone: 'Australia/Sydney' } })).toBe(12 * 60 + 30);
    expect(minutesOfDay(ms, { config: { time_zone: 'Europe/London' } })).toBe(2 * 60 + 30);
    expect(minutesOfDay(ms, { config: { time_zone: 'UTC' } })).toBe(90);
  });

  it('falls back to the browser’s clock without HA’s time zone, or with one it doesn’t know', () => {
    const ms = new Date(2026, 9, 23, 7, 45).getTime();
    expect(minutesOfDay(ms)).toBe(7 * 60 + 45);
    expect(minutesOfDay(ms, { config: {} })).toBe(7 * 60 + 45);
    expect(minutesOfDay(ms, { config: { time_zone: 'Not/AZone' } })).toBe(7 * 60 + 45);
  });
});

describe('currentIndex', () => {
  const day = [t('06:00', 19, 22), t('09:00', 17, 25), t('17:30', 19.5, 22.5), t('22:00', 18, 21)];

  it('finds the change in force', () => {
    expect(currentIndex(day, 6 * 60)).toBe(0);
    expect(currentIndex(day, 8 * 60 + 59)).toBe(0);
    expect(currentIndex(day, 12 * 60)).toBe(1);
    expect(currentIndex(day, 17 * 60 + 30)).toBe(2);
    expect(currentIndex(day, 23 * 60 + 59)).toBe(3);
  });

  // Before the first, the night before's last change is still in force.
  it('carries the day’s last change over midnight', () => {
    expect(currentIndex(day, 0)).toBe(3);
    expect(currentIndex(day, 5 * 60 + 59)).toBe(3);
  });

  it('finds none in an empty list', () => {
    expect(currentIndex([], 600)).toBeNull();
  });
});

describe('sameAsBefore', () => {
  it('marks a change that repeats the range before it, round midnight too', () => {
    expect(
      sameAsBefore([
        t('01:00', 17.5, 18.5),
        t('02:00', 17.5, 18.5),
        t('06:00', 19, 22),
        t('22:00', 17.5, 18.5),
      ]),
    ).toEqual([true, true, false, false]);
  });

  // Ranges are shown to the tenth.
  it('compares to the tenth', () => {
    expect(sameAsBefore([t('06:00', 18.04, 22), t('09:00', 18, 22.01)])).toEqual([true, true]);
    expect(sameAsBefore([t('06:00', 18, 22), t('09:00', 18.1, 22)])).toEqual([false, false]);
    expect(sameAsBefore([t('06:00', 18, 22), t('09:00', 18, 23)])).toEqual([false, false]);
  });

  it('marks nothing with fewer than two', () => {
    expect(sameAsBefore([t('06:00', 18, 22)])).toEqual([false]);
    expect(sameAsBefore([])).toEqual([]);
  });
});

describe('ownScheduleInForce and sharedScheduleName', () => {
  it('says the room’s own schedule is in force without a shared one', () => {
    expect(ownScheduleInForce(makeHass(), makeEntities())).toBe(true);
    expect(sharedScheduleName(makeHass(), makeEntities())).toBeNull();
  });

  it('says it isn’t while the room follows a shared schedule, and names it', () => {
    const hass = makeHass({
      'select.gym_schedule_assignment': {
        state: 'Bedrooms',
        attributes: { schedule_id: 'abc123', options: ['Own schedule', 'Bedrooms'] },
      },
    });
    expect(ownScheduleInForce(hass, makeEntities())).toBe(false);
    expect(sharedScheduleName(hass, makeEntities())).toBe('Bedrooms');
  });

  it('can’t tell while the assignment can’t be read', () => {
    for (const spec of [
      'unavailable',
      { state: 'unavailable', attributes: { schedule_id: null } },
      { state: 'Own schedule', attributes: {} },
      null,
    ] as Array<Spec | null>) {
      expect(
        ownScheduleInForce(makeHass({ 'select.gym_schedule_assignment': spec }), makeEntities()),
      ).toBeNull();
    }
  });

  // Shared schedules came with integration v0.14.0; later entities show it's there.
  it('can’t tell with the assignment turned off on an integration that has it', () => {
    expect(ownScheduleInForce(makeHass(), makeEntities({ scheduleAssignment: null }))).toBeNull();
  });

  it('says the own schedule is in force on an integration without shared schedules', () => {
    expect(
      ownScheduleInForce(
        makeHass(),
        makeEntities({ scheduleAssignment: null, nextBandChange: null, peakSaving: null }),
      ),
    ).toBe(true);
  });

  it('names no shared schedule it can’t read', () => {
    const hass = makeHass({
      'select.gym_schedule_assignment': { state: 'unknown', attributes: { schedule_id: 'abc' } },
    });
    expect(ownScheduleInForce(hass, makeEntities())).toBe(false);
    expect(sharedScheduleName(hass, makeEntities())).toBeNull();
  });
});

describe('nowLine', () => {
  const line = (overrides: Record<string, Spec | null> = {}, entities = makeEntities()) =>
    nowLine(makeHass(overrides), entities, NOW);

  it('says the range in force and the next change', () => {
    expect(line()).toBe('Now 19.5–22.5° · the schedule’s next change: 21:00 → 18–22°');
  });

  it('says which day the next change is on, if not today', () => {
    expect(
      line({
        'sensor.gym_next_band_change': {
          state: at(6, 30, 1),
          attributes: { low: 19, high: 22, scheduled: true },
        },
      }),
    ).toBe('Now 19.5–22.5° · the schedule’s next change: tomorrow 06:30 → 19–22°');
  });

  // An adjustment may last past the change: that's the schedule's, then.
  it('says an adjustment is in force, and until when', () => {
    expect(
      line({ 'binary_sensor.gym_override_active': 'on', 'sensor.gym_override_ends': at(17) }),
    ).toBe('Now 19.5–22.5°, adjusted until 17:00 · the schedule’s next change: 21:00 → 18–22°');
  });

  // In HA's time zone, as the list's times are.
  it('says the times in HA’s time zone', () => {
    const hass = makeHass({
      'binary_sensor.gym_override_active': 'on',
      'sensor.gym_override_ends': new Date(Date.UTC(2026, 9, 23, 15, 0)).toISOString(),
      'sensor.gym_next_band_change': {
        state: new Date(Date.UTC(2026, 9, 23, 20, 30)).toISOString(),
        attributes: { low: 18, high: 22, scheduled: true },
      },
    });
    hass.config = { time_zone: 'UTC' };
    expect(nowLine(hass, makeEntities(), Date.UTC(2026, 9, 23, 12, 0))).toBe(
      'Now 19.5–22.5°, adjusted until 15:00 · the schedule’s next change: 20:30 → 18–22°',
    );
  });

  // Without a schedule an adjustment's range stays, so it has no end.
  // Without a schedule an adjustment's range is simply the room's range.
  it('says nothing of an adjustment without a schedule, and only "adjusted" with an end it can’t use', () => {
    expect(
      line({
        'binary_sensor.gym_override_active': 'on',
        'sensor.gym_override_ends': at(17),
        'sensor.gym_next_band_change': { state: 'unknown', attributes: { scheduled: false } },
      }),
    ).toBe('Now 19.5–22.5°');
    expect(
      line({ 'binary_sensor.gym_override_active': 'on', 'sensor.gym_override_ends': at(11) }),
    ).toBe('Now 19.5–22.5°, adjusted · the schedule’s next change: 21:00 → 18–22°');
  });

  it('says a peak has relaxed or moved the range', () => {
    expect(line({ 'sensor.gym_peak_saving': 'active' })).toBe(
      'Now 19.5–22.5°, relaxed for a peak · the schedule’s next change: 21:00 → 18–22°',
    );
    expect(line({ 'sensor.gym_peak_saving': 'preconditioning' })).toBe(
      'Now 19.5–22.5°, moved ahead of a peak · the schedule’s next change: 21:00 → 18–22°',
    );
    // An announced peak can relax the range before the change: the change
    // is said as the schedule's whatever peak saving is doing.
    expect(line({ 'sensor.gym_peak_saving': 'waiting' })).toBe(
      'Now 19.5–22.5° · the schedule’s next change: 21:00 → 18–22°',
    );
  });

  it('says only the range where the next change isn’t known', () => {
    expect(line({ 'sensor.gym_next_band_change': null })).toBe('Now 19.5–22.5°');
    expect(line({}, makeEntities({ nextBandChange: null }))).toBe('Now 19.5–22.5°');
    expect(
      line({ 'sensor.gym_next_band_change': { state: at(21), attributes: { scheduled: true } } }),
    ).toBe('Now 19.5–22.5°');
    expect(
      line({
        'sensor.gym_next_band_change': {
          state: at(11),
          attributes: { low: 18, high: 22, scheduled: true },
        },
      }),
    ).toBe('Now 19.5–22.5°');
    expect(
      line({
        'sensor.gym_next_band_change': {
          state: at(21),
          attributes: { low: 18, high: 22, scheduled: false },
        },
      }),
    ).toBe('Now 19.5–22.5°');
  });

  it('says no next change without both its edges', () => {
    expect(
      line({
        'sensor.gym_next_band_change': {
          state: at(21),
          attributes: { low: 18, high: null, scheduled: true },
        },
      }),
    ).toBe('Now 19.5–22.5°');
  });

  it('says nothing while the range in force can’t be read', () => {
    expect(line({ 'sensor.gym_effective_low': 'unavailable' })).toBeNull();
    expect(line({ 'sensor.gym_effective_high': null })).toBeNull();
  });
});
