import { describe, it, expect } from 'vitest';
import {
  currentIndex,
  minutesOfDay,
  lineText,
  nextChangeLine,
  nextChangeLineParts,
  nowLine,
  nowLineParts,
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

// Noon on the day `at` counts from, in the browser's zone (no HA time zone
// given), as `at` is.
const NOON = new Date(2026, 9, 23, 12, 0).getTime();

/** The peak sensor, with its adjustments. */
const peak = (state: string, low: number, high: number, more: Record<string, unknown> = {}) => ({
  state,
  attributes: { low_adjustment: low, high_adjustment: high, ...more },
});

describe('nowLine', () => {
  const line = (
    overrides: Record<string, Spec | null> = {},
    entities = makeEntities(),
    now = NOON,
  ) => nowLine(makeHass(overrides), entities, now);
  const adjusted = (ends: string) => ({
    'binary_sensor.gym_override_active': 'on',
    'sensor.gym_override_ends': ends,
  });
  const noSchedule: Spec = {
    state: 'unknown',
    attributes: { low: null, high: null, scheduled: false },
  };

  it('says the range in force', () => {
    expect(line()).toBe('Now 19.5–22.5°');
  });

  it('says an adjustment and when it ends, while a schedule sets the range', () => {
    expect(line(adjusted(at(17)))).toBe('Now 19.5–22.5°, adjusted until 17:00');
    expect(line(adjusted(at(7, 30, 1)))).toBe('Now 19.5–22.5°, adjusted until tomorrow 07:30');
  });

  it('says an adjustment without an end it can’t read, or one that has passed', () => {
    expect(line(adjusted('unknown'))).toBe('Now 19.5–22.5°, adjusted');
    expect(line(adjusted(at(11)))).toBe('Now 19.5–22.5°, adjusted');
    expect(line(adjusted(at(12)))).toBe('Now 19.5–22.5°, adjusted');
  });

  // Without a schedule, an adjustment's range is simply the room's range.
  it('says no adjustment where no schedule sets the range, or it can’t be told', () => {
    expect(line({ ...adjusted(at(17)), 'sensor.gym_next_band_change': noSchedule })).toBe(
      'Now 19.5–22.5°',
    );
    expect(line(adjusted(at(17)), makeEntities({ nextBandChange: null }))).toBe('Now 19.5–22.5°');
  });

  // Peak saving stands aside while an adjustment runs.
  it('says only the adjustment while one runs, whatever the peak sensor says', () => {
    expect(
      line({
        ...adjusted(at(17)),
        'sensor.gym_peak_saving': peak('active', -1, 1, { ends: at(18) }),
      }),
    ).toBe('Now 19.5–22.5°, adjusted until 17:00');
    expect(
      line({
        ...adjusted(at(17)),
        'sensor.gym_next_band_change': noSchedule,
        'sensor.gym_peak_saving': peak('active', -1, 1, { ends: at(18) }),
      }),
    ).toBe('Now 19.5–22.5°');
  });

  it('says a peak relaxed the range, and until when', () => {
    expect(line({ 'sensor.gym_peak_saving': peak('active', -1, 1, { ends: at(18) }) })).toBe(
      'Now 19.5–22.5°, relaxed for a peak until 18:00',
    );
    // One edge moved is enough.
    expect(line({ 'sensor.gym_peak_saving': peak('active', 0, 0.5, { ends: at(18) }) })).toBe(
      'Now 19.5–22.5°, relaxed for a peak until 18:00',
    );
    expect(line({ 'sensor.gym_peak_saving': peak('active', -0.5, 0) })).toBe(
      'Now 19.5–22.5°, relaxed for a peak',
    );
    expect(line({ 'sensor.gym_peak_saving': peak('active', -1, 1, { ends: at(11) }) })).toBe(
      'Now 19.5–22.5°, relaxed for a peak',
    );
  });

  it('says the range was moved ahead of a peak, and when it starts', () => {
    expect(
      line({ 'sensor.gym_peak_saving': peak('preconditioning', 1, 0, { next_start: at(16) }) }),
    ).toBe('Now 19.5–22.5°, getting ready for a peak starting 16:00');
    expect(
      line({
        'sensor.gym_peak_saving': peak('preconditioning', 0, -1, { next_start: at(16, 0, 1) }),
      }),
    ).toBe('Now 19.5–22.5°, getting ready for a peak starting tomorrow 16:00');
    expect(line({ 'sensor.gym_peak_saving': peak('preconditioning', 1, 0) })).toBe(
      'Now 19.5–22.5°, getting ready for a peak',
    );
    expect(
      line({ 'sensor.gym_peak_saving': peak('preconditioning', 1, 0, { next_start: at(11) }) }),
    ).toBe('Now 19.5–22.5°, getting ready for a peak');
  });

  // An offset of 0, the climate's limits or a narrow band move nothing,
  // whatever the sensor's state (#33's review).
  it('says no peak where its adjustments moved nothing', () => {
    for (const state of ['active', 'preconditioning']) {
      expect(line({ 'sensor.gym_peak_saving': peak(state, 0, 0, { ends: at(18) }) }), state).toBe(
        'Now 19.5–22.5°',
      );
      expect(line({ 'sensor.gym_peak_saving': peak(state, -0.04, 0.04) }), state).toBe(
        'Now 19.5–22.5°',
      );
      expect(line({ 'sensor.gym_peak_saving': state }), state).toBe('Now 19.5–22.5°');
      expect(line({ 'sensor.gym_peak_saving': peak(state, Number.NaN, Number.NaN) }), state).toBe(
        'Now 19.5–22.5°',
      );
    }
  });

  it('says no peak in its other states, or without its sensor', () => {
    for (const state of ['waiting', 'off', 'override', 'no_signal', 'unavailable']) {
      expect(line({ 'sensor.gym_peak_saving': peak(state, -1, 1) }), state).toBe('Now 19.5–22.5°');
    }
    expect(line({}, makeEntities({ peakSaving: null }))).toBe('Now 19.5–22.5°');
  });

  it('says nothing while the range in force can’t be read', () => {
    expect(line({ 'sensor.gym_effective_low': 'unavailable' })).toBeNull();
    expect(line({ 'sensor.gym_effective_high': null })).toBeNull();
  });

  it('says its times in HA’s time zone', () => {
    // 17:00 in Auckland (UTC+13) is 04:00 UTC; now is 12:00 there.
    const inAuckland = (overrides: Record<string, Spec>) => {
      const hass = makeHass(overrides);
      hass.config = { time_zone: 'Pacific/Auckland' } as HomeAssistant['config'];
      return nowLine(hass, makeEntities(), Date.parse('2026-10-22T23:00:00Z'));
    };
    expect(
      inAuckland({
        'binary_sensor.gym_override_active': 'on',
        'sensor.gym_override_ends': '2026-10-23T04:00:00Z',
      }),
    ).toBe('Now 19.5–22.5°, adjusted until 17:00');
    expect(
      inAuckland({
        'sensor.gym_peak_saving': peak('active', -1, 1, { ends: '2026-10-23T04:00:00Z' }),
      }),
    ).toBe('Now 19.5–22.5°, relaxed for a peak until 17:00');
    expect(
      inAuckland({
        'sensor.gym_peak_saving': peak('preconditioning', 1, 0, {
          next_start: '2026-10-23T04:00:00Z',
        }),
      }),
    ).toBe('Now 19.5–22.5°, getting ready for a peak starting 17:00');
  });
});

describe('nextChangeLine', () => {
  const next = (
    overrides: Record<string, Spec | null> = {},
    entities = makeEntities(),
    now = NOON,
  ) => nextChangeLine(makeHass(overrides), entities, now);
  const change = (state: string, attributes: Record<string, unknown>) => ({
    'sensor.gym_next_band_change': { state, attributes },
  });

  it('says the schedule’s next change, as the schedule’s', () => {
    expect(next()).toBe('The schedule’s next change: 21:00 → 18–22°');
    expect(next(change(at(6, 30, 1), { low: 17.5, high: 21, scheduled: true }))).toBe(
      'The schedule’s next change: tomorrow 06:30 → 17.5–21°',
    );
  });

  // An adjustment or a peak can keep the range in force past it: it's the
  // schedule's change, said as such.
  it('says the same under an adjustment or a peak', () => {
    expect(
      next({ 'binary_sensor.gym_override_active': 'on', 'sensor.gym_override_ends': at(23) }),
    ).toBe('The schedule’s next change: 21:00 → 18–22°');
    expect(next({ 'sensor.gym_peak_saving': peak('active', -1, 1, { ends: at(22) }) })).toBe(
      'The schedule’s next change: 21:00 → 18–22°',
    );
  });

  it('says nothing where no schedule sets the range, or it can’t be told', () => {
    expect(next(change('unknown', { low: null, high: null, scheduled: false }))).toBeNull();
    expect(next(change(at(21), { low: 18, high: 22 }))).toBeNull();
    expect(next(change(at(21), { low: 18, high: 22, scheduled: false }))).toBeNull();
    expect(next({}, makeEntities({ nextBandChange: null }))).toBeNull();
    expect(next({ 'sensor.gym_next_band_change': null })).toBeNull();
  });

  it('says nothing for a change it can’t read, or one that isn’t ahead', () => {
    expect(next(change('unknown', { low: 18, high: 22, scheduled: true }))).toBeNull();
    expect(next(change(at(12), { low: 18, high: 22, scheduled: true }))).toBeNull();
    expect(next(change(at(11), { low: 18, high: 22, scheduled: true }))).toBeNull();
    expect(next(change(at(21), { low: '18', high: 22, scheduled: true }))).toBeNull();
    expect(next(change(at(21), { low: 18, scheduled: true }))).toBeNull();
    expect(next(change(at(21), { low: 18, high: Number.NaN, scheduled: true }))).toBeNull();
  });

  // The list below is the room's own, not the one in force, then.
  it('says it’s the shared schedule’s while the room follows one', () => {
    expect(
      next({
        'select.gym_schedule_assignment': {
          state: 'Bedrooms',
          attributes: { schedule_id: 'abc', options: ['Own schedule', 'Bedrooms'] },
        },
      }),
    ).toBe('The shared schedule’s next change: 21:00 → 18–22°');
    // Where that can't be told, as the schedule's.
    expect(next({ 'select.gym_schedule_assignment': 'unavailable' })).toBe(
      'The schedule’s next change: 21:00 → 18–22°',
    );
  });

  it('says its time in HA’s time zone', () => {
    const hass = makeHass(change('2026-10-23T08:00:00Z', { low: 18, high: 22, scheduled: true }));
    hass.config = { time_zone: 'Pacific/Auckland' } as HomeAssistant['config'];
    // 21:00 in Auckland.
    expect(nextChangeLine(hass, makeEntities(), Date.parse('2026-10-22T23:00:00Z'))).toBe(
      'The schedule’s next change: 21:00 → 18–22°',
    );
  });
});

// A time or a range mustn't be broken across two lines (#66): the lines come
// in parts, those to keep whole marked, the words unchanged.
describe('the Schedule tab’s lines, in parts', () => {
  const whole = (text: string) => ({ whole: text });
  const nowParts = (overrides: Record<string, Spec | null> = {}) =>
    nowLineParts(makeHass(overrides), makeEntities(), NOON);
  const nextParts = (overrides: Record<string, Spec | null> = {}) =>
    nextChangeLineParts(makeHass(overrides), makeEntities(), NOON);
  const adjusted = (ends: string) => ({
    'binary_sensor.gym_override_active': 'on',
    'sensor.gym_override_ends': ends,
  });
  const change = (state: string, attributes: Record<string, unknown>) => ({
    'sensor.gym_next_band_change': { state, attributes },
  });

  it('keeps the range in force whole', () => {
    expect(nowParts()).toEqual(['Now ', whole('19.5–22.5°')]);
  });

  it('keeps an adjustment’s end whole, with its day', () => {
    expect(nowParts(adjusted(at(7, 30, 1)))).toEqual([
      'Now ',
      whole('19.5–22.5°'),
      ', adjusted until ',
      whole('tomorrow 07:30'),
    ]);
    expect(nowParts(adjusted('unknown'))).toEqual(['Now ', whole('19.5–22.5°'), ', adjusted']);
  });

  it('keeps a peak’s end or start whole', () => {
    expect(nowParts({ 'sensor.gym_peak_saving': peak('active', -1, 1, { ends: at(18) }) })).toEqual(
      ['Now ', whole('19.5–22.5°'), ', relaxed for a peak until ', whole('18:00')],
    );
    expect(nowParts({ 'sensor.gym_peak_saving': peak('active', -0.5, 0) })).toEqual([
      'Now ',
      whole('19.5–22.5°'),
      ', relaxed for a peak',
    ]);
    expect(
      nowParts({ 'sensor.gym_peak_saving': peak('preconditioning', 1, 0, { next_start: at(16) }) }),
    ).toEqual([
      'Now ',
      whole('19.5–22.5°'),
      ', getting ready for a peak starting ',
      whole('16:00'),
    ]);
    expect(nowParts({ 'sensor.gym_peak_saving': peak('preconditioning', 1, 0) })).toEqual([
      'Now ',
      whole('19.5–22.5°'),
      ', getting ready for a peak',
    ]);
  });

  // So a line doesn't end in "→".
  it('keeps the next change’s time whole, and its range with the arrow before it', () => {
    expect(nextParts(change(at(6, 30, 1), { low: 17.5, high: 21, scheduled: true }))).toEqual([
      'The schedule’s next change: ',
      whole('tomorrow 06:30'),
      ' ',
      whole('→ 17.5–21°'),
    ]);
    expect(
      nextParts({
        'select.gym_schedule_assignment': {
          state: 'Bedrooms',
          attributes: { schedule_id: 'abc', options: ['Own schedule', 'Bedrooms'] },
        },
      }),
    ).toEqual(['The shared schedule’s next change: ', whole('21:00'), ' ', whole('→ 18–22°')]);
  });

  it('keeps a 12-hour time whole, “pm” with it', () => {
    const hass = makeHass({
      'sensor.gym_override_ends': at(16, 30),
      'binary_sensor.gym_override_active': 'on',
    });
    hass.locale = { language: 'en-US', time_format: '12' };
    expect(nowLineParts(hass, makeEntities(), NOON)).toEqual([
      'Now ',
      whole('19.5–22.5°'),
      ', adjusted until ',
      whole('4:30 PM'),
    ]);
  });

  it('is nothing where the line is nothing', () => {
    expect(nowParts({ 'sensor.gym_effective_low': 'unavailable' })).toBeNull();
    expect(nextParts(change('unknown', { low: 18, high: 22, scheduled: true }))).toBeNull();
  });

  it('makes the lines, joined', () => {
    expect(lineText(['Now ', whole('19.5–22.5°'), ', adjusted until ', whole('17:00')])).toBe(
      'Now 19.5–22.5°, adjusted until 17:00',
    );
    expect(lineText(nowParts(adjusted(at(17)))!)).toBe(
      nowLine(makeHass(adjusted(at(17))), makeEntities(), NOON),
    );
    expect(lineText(nextParts()!)).toBe(nextChangeLine(makeHass(), makeEntities(), NOON));
  });
});
