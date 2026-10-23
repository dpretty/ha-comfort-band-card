import { describe, it, expect } from 'vitest';
import {
  decidingSummary,
  formatWhen,
  readDeciding,
  readPeak,
  readReadiness,
  readRates,
  readRoomSource,
  roomSource,
} from '../src/diagnostics.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { stubConnection } from './_fixture.js';

const ENTITIES = {
  roomTemperature: 'sensor.gym_room_temperature',
  enabled: 'switch.gym_enabled',
  learningEnabled: 'switch.gym_learning_enabled',
  mpcEnabled: 'switch.gym_mpc_enabled',
  mpcReady: 'binary_sensor.gym_mpc_ready',
  peakSavingEnabled: 'switch.gym_peak_saving_enabled',
  peakSaving: 'sensor.gym_peak_saving',
  currentAction: 'sensor.gym_current_action',
  predictedAction: 'sensor.gym_predicted_action',
  mpcAction: 'sensor.gym_mpc_action',
  thermalSlope: 'sensor.gym_thermal_slope',
} as const;

function makeEntities(overrides: Partial<Record<keyof typeof ENTITIES, string | null>> = {}) {
  return { ...ENTITIES, ...overrides } as unknown as ZoneEntities;
}

type Spec = string | { state: string; attributes?: Record<string, unknown> };

/** Learning and predictive control on and ready, no peak, its own sensor. */
const BASE: Record<string, Spec> = {
  'sensor.gym_room_temperature': { state: '21.0', attributes: { source: 'primary' } },
  'switch.gym_enabled': 'on',
  'switch.gym_learning_enabled': 'on',
  'switch.gym_mpc_enabled': 'on',
  'binary_sensor.gym_mpc_ready': 'on',
  'switch.gym_peak_saving_enabled': 'on',
  'sensor.gym_peak_saving': 'waiting',
  'sensor.gym_current_action': 'heat',
  'sensor.gym_predicted_action': 'idle',
  'sensor.gym_mpc_action': 'heat',
};

function makeHass(
  overrides: Record<string, Spec | null> = {},
  locale?: HomeAssistant['locale'],
): HomeAssistant {
  const merged: Record<string, Spec | null> = { ...BASE, ...overrides };
  const states: HomeAssistant['states'] = {};
  for (const [id, spec] of Object.entries(merged)) {
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
    locale,
  };
}

describe('readDeciding', () => {
  // As the coordinator chooses (coordinator.py, the three-way gate).
  it('has predictive control decide with Learning and it on, and it ready', () => {
    expect(readDeciding(makeHass(), makeEntities())).toEqual({
      paused: false,
      noReading: false,
      controller: 'predictive',
      reason: null,
      decision: 'heat',
      learning: 'idle',
      predictive: 'heat',
    });
  });

  it('has Learning decide while predictive control is on but not ready', () => {
    const d = readDeciding(makeHass({ 'binary_sensor.gym_mpc_ready': 'off' }), makeEntities());
    expect([d.controller, d.reason, d.predictive]).toEqual(['learning', 'not-ready', 'not-ready']);
  });

  it('has Learning decide while predictive control is off', () => {
    const d = readDeciding(makeHass({ 'switch.gym_mpc_enabled': 'off' }), makeEntities());
    expect([d.controller, d.reason, d.predictive]).toEqual(['learning', null, 'heat']);
  });

  it('has basic control decide while Learning is off, even with predictive control on', () => {
    const d = readDeciding(makeHass({ 'switch.gym_learning_enabled': 'off' }), makeEntities());
    expect([d.controller, d.reason]).toEqual(['basic', 'learning-off']);
  });

  // Before integration v0.4.0 there was no learning.
  it('has basic control decide without a learning switch', () => {
    const d = readDeciding(makeHass(), makeEntities({ learningEnabled: null }));
    expect([d.controller, d.reason]).toEqual(['basic', 'learning-off']);
  });

  it('has basic control decide while a peak relaxes the range', () => {
    const d = readDeciding(makeHass({ 'sensor.gym_peak_saving': 'active' }), makeEntities());
    expect([d.controller, d.reason]).toEqual(['basic', 'peak']);
  });

  it.each(['fallback_sensor', 'climate'])(
    'has basic control decide on a stand-in reading (%s), even in a peak',
    (source) => {
      const d = readDeciding(
        makeHass({
          'sensor.gym_room_temperature': { state: '21.0', attributes: { source } },
          'sensor.gym_peak_saving': 'active',
        }),
        makeEntities(),
      );
      expect([d.controller, d.reason]).toEqual(['basic', 'stand-in']);
    },
  );

  // Only "active" relaxes the range; an adjustment sets a peak aside.
  it.each(['off', 'no_signal', 'waiting', 'preconditioning', 'override'])(
    "doesn't count peak saving that's %s",
    (state) => {
      const d = readDeciding(makeHass({ 'sensor.gym_peak_saving': state }), makeEntities());
      expect(d.controller).toBe('predictive');
    },
  );

  it('tells there’s no peak without its status while peak saving is off', () => {
    const d = readDeciding(
      makeHass({ 'sensor.gym_peak_saving': null, 'switch.gym_peak_saving_enabled': 'off' }),
      makeEntities({ peakSaving: null }),
    );
    expect(d.controller).toBe('predictive');
  });

  // Before integration v0.24.0 there was no peak saving.
  it('tells there’s no peak without peak saving at all', () => {
    const d = readDeciding(makeHass(), makeEntities({ peakSaving: null, peakSavingEnabled: null }));
    expect(d.controller).toBe('predictive');
  });

  // Its switch turned off as an entity, its status there but unreadable.
  it('can’t tell from an unreadable status without peak saving’s switch', () => {
    const d = readDeciding(
      makeHass({ 'sensor.gym_peak_saving': 'unavailable' }),
      makeEntities({ peakSavingEnabled: null }),
    );
    expect(d.controller).toBeNull();
  });

  it('can’t tell without peak saving’s status while it’s on', () => {
    for (const hass of [
      makeHass({ 'sensor.gym_peak_saving': 'unavailable' }),
      makeHass({ 'sensor.gym_peak_saving': null }),
    ]) {
      expect(readDeciding(hass, makeEntities()).controller).toBeNull();
    }
    expect(readDeciding(makeHass(), makeEntities({ peakSaving: null })).controller).toBeNull();
  });

  it.each([
    ['switch.gym_learning_enabled', 'unavailable'],
    ['switch.gym_mpc_enabled', 'unknown'],
    ['binary_sensor.gym_mpc_ready', 'unavailable'],
  ])('can’t tell while %s is %s', (id, state) => {
    expect(readDeciding(makeHass({ [id]: state }), makeEntities()).controller).toBeNull();
  });

  it('can’t tell without the readiness sensor while predictive control is on', () => {
    const d = readDeciding(makeHass(), makeEntities({ mpcReady: null }));
    expect(d.controller).toBeNull();
    expect(d.predictive).toBe('heat');
  });

  it('says it’s paused while "Control this room" is off, and still what it decides', () => {
    const d = readDeciding(makeHass({ 'switch.gym_enabled': 'off' }), makeEntities());
    expect([d.paused, d.controller, d.decision]).toEqual([true, 'predictive', 'heat']);
  });

  it('says there’s no reading, from the source or an old integration’s state', () => {
    expect(
      readDeciding(
        makeHass({
          'sensor.gym_room_temperature': { state: 'unknown', attributes: { source: 'none' } },
        }),
        makeEntities(),
      ).noReading,
    ).toBe(true);
    expect(
      readDeciding(makeHass({ 'sensor.gym_room_temperature': 'unknown' }), makeEntities())
        .noReading,
    ).toBe(true);
    expect(
      readDeciding(makeHass({ 'sensor.gym_room_temperature': '21.5' }), makeEntities()).noReading,
    ).toBe(false);
  });

  // The integration says "unknown" without a reading.
  it('reads the integration’s own "unknown"', () => {
    const d = readDeciding(makeHass({ 'sensor.gym_current_action': 'unknown' }), makeEntities());
    expect(d.decision).toBe('unknown');
  });

  it('reads an action it can’t read as unknown to it', () => {
    const d = readDeciding(
      makeHass({ 'sensor.gym_current_action': 'unavailable', 'sensor.gym_predicted_action': null }),
      makeEntities(),
    );
    expect([d.decision, d.learning]).toEqual([null, null]);
  });
});

describe('roomSource', () => {
  it('reads the source, or works it out before integration v0.18.0', () => {
    const at = (spec: Spec) =>
      roomSource(makeHass({ 'sensor.gym_room_temperature': spec }), makeEntities());
    expect(at({ state: '20', attributes: { source: 'climate' } })).toBe('climate');
    expect(at({ state: 'unknown', attributes: { source: 'none' } })).toBe('none');
    expect(at('20.5')).toBe('primary');
    expect(at('unknown')).toBe('none');
    expect(at('unavailable')).toBeNull();
    expect(roomSource(makeHass(), makeEntities({ roomTemperature: null }))).toBeNull();
  });
});

describe('decidingSummary', () => {
  const d = (over: Partial<ReturnType<typeof readDeciding>>) => ({
    ...readDeciding(makeHass(), makeEntities()),
    ...over,
  });
  it('sums up who decides, or that it’s paused or on hold', () => {
    expect(decidingSummary(d({}))).toBe('Predictive control deciding');
    expect(decidingSummary(d({ controller: 'learning' }))).toBe('Learning deciding');
    expect(decidingSummary(d({ controller: 'basic' }))).toBe('Basic control deciding');
    expect(decidingSummary(d({ controller: null }))).toBe('');
    expect(decidingSummary(d({ paused: true, noReading: true }))).toBe('Paused');
    expect(decidingSummary(d({ noReading: true }))).toBe('On hold');
  });
});

describe('readRates', () => {
  const slope = (attributes: Record<string, unknown>, state = '0.4') =>
    makeHass({ 'sensor.gym_thermal_slope': { state, attributes } });

  it('says how the room drifts on its own, and where that came from', () => {
    const at = (attributes: Record<string, unknown>) =>
      readRates(slope(attributes), makeEntities())!.idle;
    expect(at({ idle_slope: 0.398, idle_slope_source: 'live' })).toEqual({
      value: 'Warms about 0.4° an hour',
      source: 'Learned from recent readings.',
      known: true,
    });
    expect(
      at({ idle_slope: -0.75, idle_slope_source: 'cached', idle_slope_cached_age_min: 35 }),
    ).toEqual({
      value: 'Cools about 0.8° an hour',
      source: 'From earlier readings, 35 minutes old.',
      known: true,
    });
    expect(
      at({ idle_slope: 0.02, idle_slope_source: 'cached', idle_slope_cached_age_min: 130 }),
    ).toEqual({
      value: 'Holds steady',
      source: 'From earlier readings, about 2 hours old.',
      known: true,
    });
    expect(
      at({ idle_slope: 0.3, idle_slope_source: 'cached', idle_slope_cached_age_min: 1 }).source,
    ).toBe('From earlier readings, 1 minute old.');
    expect(at({ idle_slope: null, idle_slope_source: 'none' })).toEqual({
      value: 'Not learned yet',
      source: 'Not enough recent readings while idle to learn from.',
      known: false,
    });
  });

  it('says how fast heating and cooling move it, and where that came from', () => {
    const r = (attributes: Record<string, unknown>) =>
      readRates(slope(attributes), makeEntities())!;
    expect(r({ recovery_slope_heat: 1.234, method_recovery_heat: 'wls' }).heat).toEqual({
      value: 'Warms it about 1.2° an hour',
      source: 'From the latest heating run.',
      known: true,
    });
    expect(r({ recovery_slope_heat: 0.04, method_recovery_heat: 'previous' }).heat).toEqual({
      value: 'Warms it under 0.1° an hour',
      source: 'From the heating run before this one, which is too short to tell yet.',
      known: true,
    });
    expect(r({ recovery_slope_cool: -0.81, method_recovery_cool: 'wls' }).cool).toEqual({
      value: 'Cools it about 0.8° an hour',
      source: 'From the latest cooling run.',
      known: true,
    });
    expect(r({ recovery_slope_cool: null, method_recovery_cool: 'rejected' }).cool).toEqual({
      value: 'Not known',
      source:
        'The latest cooling run’s readings didn’t show the room cooling, so they were set aside.',
      known: false,
    });
    expect(r({ recovery_slope_heat: null, method_recovery_heat: 'rejected' }).heat.source).toBe(
      'The latest heating run’s readings didn’t show the room warming, so they were set aside.',
    );
    expect(r({ recovery_slope_heat: null, method_recovery_heat: 'none' }).heat).toEqual({
      value: 'Not learned yet',
      source: 'Not enough recent heating to learn from.',
      known: false,
    });
  });

  it('keeps the raw numbers for the details', () => {
    const r = readRates(
      slope({
        idle_slope: 0.398,
        recovery_slope_heat: 1.234,
        recovery_slope_cool: null,
        sample_count: 19,
        window_minutes: 87.9,
        last_updated: '2026-10-23T00:48:18+00:00',
        sample_count_idle: 12,
        sample_count_recovery_heat: 7,
        sample_count_recovery_cool: 0,
        std_dev_idle: 0.1174,
        std_dev_recovery_heat: 0.21,
        std_dev_recovery_cool: 0,
        method_idle: 'wls',
        method_recovery_heat: 'previous',
        method_recovery_cool: 'none',
      }),
      makeEntities(),
    )!;
    expect(r.details).toEqual([
      { name: 'On its own', perHour: 0.398, samples: 12, spread: 0.1174, method: 'wls' },
      { name: 'Heating', perHour: 1.234, samples: 7, spread: 0.21, method: 'previous' },
      { name: 'Cooling', perHour: null, samples: 0, spread: 0, method: 'none' },
    ]);
    expect([r.windowMinutes, r.sampleCount, r.updated]).toEqual([
      87.9,
      19,
      Date.parse('2026-10-23T00:48:18+00:00'),
    ]);
  });

  // Its state is unknown when the latest action's rate is; the rest stands.
  it('reads the rates while the sensor’s own state is unknown, not while it’s unavailable', () => {
    expect(readRates(slope({ idle_slope: 0.4 }, 'unknown'), makeEntities())).not.toBeNull();
    expect(readRates(slope({ idle_slope: 0.4 }, 'unavailable'), makeEntities())).toBeNull();
    expect(readRates(makeHass(), makeEntities({ thermalSlope: null }))).toBeNull();
  });
});

describe('readReadiness', () => {
  const at = (ready: string | null, attributes?: Record<string, unknown>) =>
    readReadiness(
      makeHass({
        'binary_sensor.gym_mpc_ready': ready,
        ...(attributes ? { 'sensor.gym_thermal_slope': { state: '0.4', attributes } } : {}),
      }),
      makeEntities(),
    );

  it('says it’s ready, and what that means', () => {
    expect(at('on')).toEqual({
      title: 'Ready to plan',
      value: 'Yes',
      desc: 'It has learned how this room drifts on its own and how fast heating or cooling moves it.',
    });
  });

  // mpc_ready: a rate for drifting on its own, and one for heating or cooling.
  it('says what it still has to learn', () => {
    expect(
      at('off', { idle_slope: 0.4, recovery_slope_heat: null, recovery_slope_cool: null })!.desc,
    ).toBe('Still to learn: how fast heating or cooling moves it.');
    expect(at('off', { idle_slope: null, recovery_slope_heat: 1.2 })!.desc).toBe(
      'Still to learn: how this room drifts on its own.',
    );
    expect(at('off', { idle_slope: null })!.desc).toBe(
      'Still to learn: how this room drifts on its own, and how fast heating or cooling moves it.',
    );
    expect(at('off')).toEqual({
      title: 'Ready to plan',
      value: 'Not yet',
      desc: 'It’s still learning how this room warms and cools.',
    });
  });

  it('says it can’t tell, or nothing without the sensor', () => {
    expect(at('unavailable')!.value).toBe('Can’t tell');
    expect(readReadiness(makeHass(), makeEntities({ mpcReady: null }))).toBeNull();
  });
});

describe('readRoomSource', () => {
  const at = (attributes: Record<string, unknown> | null, extra: Record<string, Spec> = {}) =>
    readRoomSource(
      makeHass({
        'sensor.gym_room_temperature': attributes ? { state: '21', attributes } : '21',
        ...extra,
      }),
      makeEntities(),
    );
  const CONFIGURE = 'Set under Settings → Devices & Services → Comfort Band → Configure.';

  it('says the room’s own sensor is in use, and what stands in if it goes offline', () => {
    expect(
      at(
        { source: 'primary', fallback_temp_sensor: 'sensor.hall', fallback_to_climate: true },
        { 'sensor.hall': { state: '20', attributes: { friendly_name: 'Hall temperature' } } },
      ),
    ).toEqual({
      title: 'Room reading',
      value: 'Its own sensor',
      desc: `If that goes offline, after a short wait Hall temperature, then the unit’s own reading stands in. ${CONFIGURE}`,
    });
    expect(
      at({ source: 'primary', fallback_temp_sensor: null, fallback_to_climate: true })!.desc,
    ).toBe(
      `If that goes offline, after a short wait the unit’s own reading stands in. ${CONFIGURE}`,
    );
    expect(
      at({ source: 'primary', fallback_temp_sensor: null, fallback_to_climate: false })!.desc,
    ).toBe(`If that goes offline, control is on hold until it’s back. ${CONFIGURE}`);
    expect(at({ source: 'primary' })!.desc).toBe(
      `If that goes offline, control is on hold until it’s back. ${CONFIGURE}`,
    );
  });

  it('names the stand-in in use', () => {
    expect(
      at(
        { source: 'fallback_sensor', fallback_temp_sensor: 'sensor.hall' },
        { 'sensor.hall': { state: '20', attributes: { friendly_name: 'Hall temperature' } } },
      ),
    ).toEqual({
      title: 'Room reading',
      value: 'Stand-in: Hall temperature',
      desc: 'Its own sensor is offline. Basic control decides until it’s back.',
    });
    expect(at({ source: 'fallback_sensor', fallback_temp_sensor: 'sensor.gone' })!.value).toBe(
      'Stand-in: sensor.gone',
    );
    expect(at({ source: 'climate' })!.value).toBe('Stand-in: the unit’s own reading');
    expect(at({ source: 'none' })).toEqual({
      title: 'Room reading',
      value: 'None right now',
      desc: 'Neither its own sensor nor a stand-in has a reading, so control is on hold.',
    });
  });

  // Integration v0.18.0 added stand-ins and the source.
  it('says nothing before integration v0.18.0', () => {
    expect(at(null)).toBeNull();
    expect(readRoomSource(makeHass(), makeEntities({ roomTemperature: null }))).toBeNull();
  });
});

describe('formatWhen', () => {
  const hass = { locale: { language: 'en-GB', time_format: '24' as const } };
  const now = new Date(2026, 9, 23, 12, 0).getTime();
  const at = (days: number, hour: number) => new Date(2026, 9, 23 + days, hour, 30).getTime();

  it('gives the time today, and the day otherwise', () => {
    expect(formatWhen(at(0, 17), now, hass)).toBe('17:30');
    expect(formatWhen(at(1, 6), now, hass)).toBe('tomorrow 06:30');
    expect(formatWhen(at(-1, 21), now, hass)).toBe('yesterday 21:30');
    expect(formatWhen(at(-3, 9), now, hass)).toBe('Tue 09:30');
    expect(formatWhen(at(4, 9), now, hass)).toBe('Tue 09:30');
    expect(formatWhen(at(-10, 9), now, hass)).toBe('13 Oct, 09:30');
  });
});

describe('readPeak', () => {
  const now = new Date(2026, 9, 23, 12, 0).getTime();
  const iso = (hour: number) => new Date(2026, 9, 23, hour, 0).toISOString();
  const at = (state: string, attributes: Record<string, unknown> = {}) =>
    readPeak(
      makeHass(
        { 'sensor.gym_peak_saving': { state, attributes } },
        { language: 'en-GB', time_format: '24' },
      ),
      makeEntities(),
      now,
    );

  it('says whether it’s off, and why', () => {
    expect(at('off', { peak_entity: 'schedule.peak' })).toEqual({
      title: 'Right now',
      value: 'Off',
      desc: 'Peak saving is switched off.',
    });
    expect(at('off', { peak_entity: null })!.desc).toBe(
      'No peak entity is chosen. Choose one under Settings → Devices & Services → Comfort Band → Configure.',
    );
  });

  it('says there’s no peak now, and when the next one is', () => {
    expect(at('waiting', { next_start: iso(17) })).toEqual({
      title: 'Right now',
      value: 'No peak now',
      desc: 'The next one is announced for 17:00.',
    });
    expect(at('waiting', { next_start: null })!.desc).toBe('None is announced yet.');
    expect(at('no_signal')).toEqual({
      title: 'Right now',
      value: 'No peak signal',
      desc: 'The peak entity can’t be read, so it counts as no peak.',
    });
  });

  it('says how it’s getting ready for one', () => {
    expect(
      at('preconditioning', {
        next_start: iso(17),
        precondition: 'heating',
        low_adjustment: 1,
        high_adjustment: 0,
      }),
    ).toEqual({
      title: 'Right now',
      value: 'Warming ahead',
      desc: 'Getting the room ready for the peak at 17:00: the bottom up 1°.',
    });
    expect(
      at('preconditioning', { precondition: 'cooling', low_adjustment: 0, high_adjustment: -0.5 }),
    ).toEqual({
      title: 'Right now',
      value: 'Cooling ahead',
      desc: 'Getting the room ready for the peak: the top down 0.5°.',
    });
  });

  it('says how a peak on relaxes the range, and until when', () => {
    expect(at('active', { ends: iso(20), low_adjustment: -1, high_adjustment: 1.5 })).toEqual({
      title: 'Right now',
      value: 'Peak on',
      desc: 'Until 20:00. The range is relaxed: the bottom down 1°, the top up 1.5°. Basic control decides meanwhile.',
    });
    expect(at('active', { low_adjustment: 0, high_adjustment: 0 })!.desc).toBe(
      'Basic control decides meanwhile.',
    );
  });

  it('says it stands aside for an adjustment, or that it can’t tell', () => {
    expect(at('override')).toEqual({
      title: 'Right now',
      value: 'Standing aside',
      desc: 'An adjustment is in force, so peak saving stands aside.',
    });
    expect(at('unavailable')!.value).toBe('Can’t tell');
    expect(readPeak(makeHass(), makeEntities({ peakSaving: null }), now)).toBeNull();
  });
});
