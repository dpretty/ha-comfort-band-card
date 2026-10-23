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
  type Rates,
} from '../src/diagnostics.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { stubConnection } from './_fixture.js';

const ENTITIES = {
  roomTemperature: 'sensor.gym_room_temperature',
  useApparentTemperature: 'switch.gym_use_apparent_temperature',
  lookaheadMinutes: 'number.gym_lookahead_minutes',
  mpcHorizonMinutes: 'number.gym_mpc_horizon_minutes',
  peakHeatOffset: 'number.gym_peak_heat_offset',
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
  'sensor.gym_current_action': 'heating',
  'sensor.gym_predicted_action': 'idle',
  'sensor.gym_mpc_action': 'heating',
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

/** A room temperature from before integration v0.18.0, which had no
 *  `source`: for fixtures of integrations that old. */
const BEFORE_V0_18: Record<string, Spec> = { 'sensor.gym_room_temperature': '21.0' };

describe('readDeciding', () => {
  // As the coordinator chooses (coordinator.py, the three-way gate).
  it('has predictive control decide with Learning and it on, and it ready', () => {
    expect(readDeciding(makeHass(), makeEntities())).toEqual({
      paused: false,
      noReading: false,
      controller: 'predictive',
      reason: null,
      decision: 'heating',
      learning: 'idle',
      predictive: 'heating',
    });
  });

  it('has Learning decide while predictive control is on but not ready', () => {
    const d = readDeciding(makeHass({ 'binary_sensor.gym_mpc_ready': 'off' }), makeEntities());
    expect([d.controller, d.reason, d.predictive]).toEqual(['learning', 'not-ready', 'not-ready']);
  });

  it('has Learning decide while predictive control is off', () => {
    const d = readDeciding(makeHass({ 'switch.gym_mpc_enabled': 'off' }), makeEntities());
    expect([d.controller, d.reason, d.predictive]).toEqual(['learning', null, 'heating']);
  });

  it('has basic control decide while Learning is off, even with predictive control on', () => {
    const d = readDeciding(makeHass({ 'switch.gym_learning_enabled': 'off' }), makeEntities());
    expect([d.controller, d.reason]).toEqual(['basic', 'learning-off']);
  });

  // The integration's actions are "heating" and "cooling" (its ACTION_*).
  it('reads the integration’s heating and cooling', () => {
    const d = readDeciding(
      makeHass({
        'sensor.gym_current_action': 'cooling',
        'sensor.gym_predicted_action': 'heating',
      }),
      makeEntities(),
    );
    expect([d.decision, d.learning]).toEqual(['cooling', 'heating']);
  });

  // Before integration v0.4.0 there was no learning.
  it('has basic control decide where the integration has no learning', () => {
    const d = readDeciding(
      makeHass(BEFORE_V0_18),
      makeEntities({
        learningEnabled: null,
        useApparentTemperature: null,
        predictedAction: null,
        thermalSlope: null,
        lookaheadMinutes: null,
        mpcEnabled: null,
        mpcReady: null,
        mpcAction: null,
        mpcHorizonMinutes: null,
        peakSaving: null,
        peakSavingEnabled: null,
        peakHeatOffset: null,
      }),
    );
    expect([d.controller, d.reason]).toEqual(['basic', 'no-learning']);
  });

  // A turned-off entity drops out of the registry; the switch's setting
  // still decides.
  it('can’t tell with learning’s switch turned off as an entity', () => {
    const d = readDeciding(makeHass(), makeEntities({ learningEnabled: null }));
    expect(d.controller).toBeNull();
  });

  // v0.4.0 and v0.5 had learning's switch but no learning.
  it('can’t tell with learning on but no learning to be had', () => {
    const d = readDeciding(
      makeHass(BEFORE_V0_18),
      makeEntities({
        predictedAction: null,
        thermalSlope: null,
        lookaheadMinutes: null,
        mpcEnabled: null,
        mpcReady: null,
        mpcAction: null,
        mpcHorizonMinutes: null,
        peakSaving: null,
        peakSavingEnabled: null,
        peakHeatOffset: null,
      }),
    );
    expect(d.controller).toBeNull();
  });

  it('has Learning decide where the integration has no predictive control', () => {
    const d = readDeciding(
      makeHass(BEFORE_V0_18),
      makeEntities({
        mpcEnabled: null,
        mpcReady: null,
        mpcAction: null,
        mpcHorizonMinutes: null,
        peakSaving: null,
        peakSavingEnabled: null,
        peakHeatOffset: null,
      }),
    );
    expect([d.controller, d.reason]).toEqual(['learning', null]);
  });

  // Any entity from a feature's release or a later one shows it's there:
  // each one alone, with the feature's own entities turned off.
  const LATER_THAN_LEARNING = [
    'useApparentTemperature',
    'apparentTemperature',
    'crossModeMinMinutes',
    'predictedAction',
    'thermalSlope',
    'lookaheadMinutes',
    'passiveTolerance',
    'mpcEnabled',
    'mpcReady',
    'mpcAction',
    'mpcHorizonMinutes',
    'bandRampMinutes',
    'fanControlEnabled',
    'activeFanMode',
    'idleFanMode',
    'scheduleAssignment',
    'roomSensorUnavailable',
    'nextBandChange',
    'peakSaving',
    'peakSavingEnabled',
    'peakHeatOffset',
    'peakCoolOffset',
    'peakPreconditionMinutes',
  ] as const;
  const only = (keep: readonly string[]) =>
    ({
      roomTemperature: 'sensor.gym_room_temperature',
      enabled: 'switch.gym_enabled',
      currentAction: 'sensor.gym_current_action',
      ...Object.fromEntries(
        keep.map((f) => [f, (ENTITIES as Record<string, string>)[f] ?? `x.gym_${f}`]),
      ),
    }) as unknown as ZoneEntities;

  it.each(LATER_THAN_LEARNING)('can’t tell without learning’s switch beside %s', (field) => {
    expect(readDeciding(makeHass(), only([field])).controller).toBeNull();
  });

  it.each(LATER_THAN_LEARNING.slice(LATER_THAN_LEARNING.indexOf('mpcEnabled') + 1))(
    'can’t tell without predictive control’s entities beside %s',
    (field) => {
      expect(
        readDeciding(makeHass(), only(['learningEnabled', 'lookaheadMinutes', field])).controller,
      ).toBeNull();
    },
  );

  it('has Learning decide with only learning’s own releases there', () => {
    for (const field of [
      'predictedAction',
      'thermalSlope',
      'lookaheadMinutes',
      'passiveTolerance',
    ]) {
      expect(
        readDeciding(makeHass(BEFORE_V0_18), only(['learningEnabled', field])).controller,
        field,
      ).toBe('learning');
    }
  });

  it.each([
    'peakSaving',
    'peakSavingEnabled',
    'peakHeatOffset',
    'peakCoolOffset',
    'peakPreconditionMinutes',
  ])('can’t tell about a peak with only %s there and unreadable', (field) => {
    expect(
      readDeciding(
        makeHass({
          'sensor.gym_peak_saving': 'unavailable',
          'switch.gym_peak_saving_enabled': 'unavailable',
        }),
        only([field]),
      ).controller,
    ).toBeNull();
  });

  it('can’t tell with predictive control’s switch turned off as an entity', () => {
    const d = readDeciding(makeHass(), makeEntities({ mpcEnabled: null }));
    expect(d.controller).toBeNull();
  });

  // A stand-in may be in use without it.
  it('can’t tell without the room temperature entity, or while it can’t be read', () => {
    expect(readDeciding(makeHass(), makeEntities({ roomTemperature: null })).controller).toBeNull();
    const unavailable = readDeciding(
      makeHass({ 'sensor.gym_room_temperature': 'unavailable' }),
      makeEntities(),
    );
    expect([unavailable.controller, unavailable.noReading]).toEqual([null, false]);
  });

  it('puts a stand-in before an unreadable peak status', () => {
    const d = readDeciding(
      makeHass({
        'sensor.gym_room_temperature': { state: '21', attributes: { source: 'climate' } },
        'sensor.gym_peak_saving': 'unavailable',
      }),
      makeEntities(),
    );
    expect([d.controller, d.reason]).toEqual(['basic', 'stand-in']);
  });

  it('can’t tell whether it’s paused without its switch', () => {
    expect(readDeciding(makeHass(), makeEntities({ enabled: null })).paused).toBeNull();
    expect(
      readDeciding(makeHass({ 'switch.gym_enabled': 'unavailable' }), makeEntities()).paused,
    ).toBeNull();
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
    const d = readDeciding(
      makeHass(),
      makeEntities({ peakSaving: null, peakSavingEnabled: null, peakHeatOffset: null }),
    );
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
    expect(d.predictive).toBeNull();
  });

  it('says it’s paused while "Control this room" is off, and still what it decides', () => {
    const d = readDeciding(makeHass({ 'switch.gym_enabled': 'off' }), makeEntities());
    expect([d.paused, d.controller, d.decision]).toEqual([true, 'predictive', 'heating']);
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
      (readRates(slope(attributes), makeEntities()) as Rates).idle;
    expect(at({ idle_slope: 0.398, idle_slope_source: 'live' })).toEqual({
      value: 'Warms about 0.4° an hour',
      source: 'From the latest readings while idle.',
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
      readRates(slope(attributes), makeEntities()) as Rates;
    expect(r({ recovery_slope_heat: 1.234, method_recovery_heat: 'wls' }).heat).toEqual({
      value: 'Warms it about 1.2° an hour',
      source: 'From the latest heating run.',
      known: true,
    });
    expect(r({ recovery_slope_heat: 0.07, method_recovery_heat: 'previous' }).heat).toEqual({
      value: 'Warms it under 0.1° an hour',
      source: 'From an earlier heating run, as the latest is too short to tell.',
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

  // One decimal is shown: under 0.1 would read as 0.
  it('words the edges of its roundings', () => {
    const r = (attributes: Record<string, unknown>) =>
      readRates(slope(attributes), makeEntities()) as Rates;
    expect(r({ idle_slope: 0.049 }).idle.value).toBe('Holds steady');
    expect(r({ idle_slope: -0.05 }).idle.value).toBe('Cools under 0.1° an hour');
    expect(r({ recovery_slope_heat: 0.099 }).heat.value).toBe('Warms it under 0.1° an hour');
    expect(r({ recovery_slope_heat: 0.1 }).heat.value).toBe('Warms it about 0.1° an hour');
    const aged = (minutes: number) =>
      r({ idle_slope: 0.3, idle_slope_source: 'cached', idle_slope_cached_age_min: minutes }).idle
        .source;
    expect(aged(0.2)).toBe('From earlier readings, 1 minute old.');
    expect(aged(89)).toBe('From earlier readings, 89 minutes old.');
    expect(aged(90)).toBe('From earlier readings, about 2 hours old.');
  });

  // Before integration v0.15.0 a run could fit the wrong way round.
  it('words a rate by its sign, whatever the run', () => {
    const r = (attributes: Record<string, unknown>) =>
      readRates(slope(attributes), makeEntities()) as Rates;
    expect(r({ recovery_slope_heat: -0.3, method_recovery_heat: 'wls' }).heat.value).toBe(
      'Cools it about 0.3° an hour',
    );
    expect(r({ recovery_slope_cool: 0.42, method_recovery_cool: 'wls' }).cool.value).toBe(
      'Warms it about 0.4° an hour',
    );
    expect(r({ recovery_slope_heat: 0.04, method_recovery_heat: 'wls' }).heat.value).toBe(
      'Holds it steady',
    );
    expect(r({ recovery_slope_heat: 0.05, method_recovery_heat: 'wls' }).heat.value).toBe(
      'Warms it under 0.1° an hour',
    );
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
    ) as Rates;
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
    expect(readRates(slope({ idle_slope: 0.4 }, 'unavailable'), makeEntities())).toBe(
      'unavailable',
    );
    expect(readRates(makeHass(), makeEntities())).toBe('unavailable');
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
      desc: `If that goes offline for 5 minutes, Hall temperature stands in if it has a reading, otherwise the unit’s own reading if it has one. ${CONFIGURE}`,
    });
    expect(
      at({ source: 'primary', fallback_temp_sensor: null, fallback_to_climate: true })!.desc,
    ).toBe(
      `If that goes offline for 5 minutes, the unit’s own reading stands in if it has a reading. ${CONFIGURE}`,
    );
    expect(
      at({ source: 'primary', fallback_temp_sensor: null, fallback_to_climate: false })!.desc,
    ).toBe(`If that goes offline, control is on hold until it’s back. ${CONFIGURE}`);
    expect(at({ source: 'primary' })!.desc).toBe(
      `If that goes offline, control is on hold until it’s back. ${CONFIGURE}`,
    );
  });

  it('names a stand-in without a name by its entity', () => {
    expect(
      at(
        { source: 'fallback_sensor', fallback_temp_sensor: 'sensor.hall' },
        { 'sensor.hall': { state: '20', attributes: { friendly_name: '' } } },
      )!.value,
    ).toBe('Stand-in: sensor.hall');
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
    expect(at({ source: 'climate' })).toEqual({
      title: 'Room reading',
      value: 'Stand-in: the unit’s own reading',
      desc: 'Its own sensor is offline. Basic control decides until it’s back.',
    });
    expect(
      at(
        { source: 'none', fallback_temp_sensor: 'sensor.hall', fallback_to_climate: true },
        {
          'sensor.hall': {
            state: 'unavailable',
            attributes: { friendly_name: 'Hall temperature' },
          },
        },
      )!.desc,
    ).toBe(
      'Its own sensor has no reading, so control is on hold. A stand-in is used only once its own sensor has been offline for 5 minutes, and only while it has a reading: Hall temperature, otherwise the unit’s own reading.',
    );
    expect(at({ source: 'none' })).toEqual({
      title: 'Room reading',
      value: 'None right now',
      desc: 'Its own sensor has no reading and no stand-in is set up, so control is on hold.',
    });
    // FALLBACK_GRACE_S: no stand-in is tried for the first 5 minutes.
    expect(at({ source: 'none', fallback_to_climate: true })!.desc).toBe(
      'Its own sensor has no reading, so control is on hold. A stand-in is used only once its own sensor has been offline for 5 minutes, and only while it has a reading: the unit’s own reading.',
    );
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
    expect(formatWhen(at(-6, 9), now, hass)).toBe('Sat 09:30');
    expect(formatWhen(at(6, 9), now, hass)).toBe('Thu 09:30');
    expect(formatWhen(at(-7, 9), now, hass)).toBe('16 Oct, 09:30');
    expect(formatWhen(at(7, 9), now, hass)).toBe('30 Oct, 09:30');
  });

  // Days and dates in a given zone: 23:00 UTC on the 23rd is the 24th in
  // Sydney, whatever the machine's zone.
  it('counts days and writes dates in a given time zone', () => {
    const late = Date.UTC(2026, 9, 23, 23, 0);
    expect(formatWhen(Date.UTC(2026, 9, 24, 1, 0), late, hass, 'UTC')).toBe('tomorrow 01:00');
    expect(formatWhen(Date.UTC(2026, 9, 24, 1, 0), late, hass, 'Australia/Sydney')).toBe('12:00');
    expect(formatWhen(Date.UTC(2026, 9, 21, 9, 0), late, hass, 'UTC')).toBe('Wed 09:00');
    expect(formatWhen(Date.UTC(2026, 9, 1, 9, 0), late, hass, 'UTC')).toBe('1 Oct, 09:00');
    expect(formatWhen(Date.UTC(2025, 11, 31, 23, 30), late, hass, 'UTC')).toBe(
      '31 Dec 2025, 23:30',
    );
    expect(formatWhen(Date.UTC(2025, 11, 31, 23, 30), late, hass, 'Australia/Sydney')).toBe(
      '1 Jan, 10:30',
    );
  });

  // The feedback goes back up to 2000 taps.
  it('gives the year of another year', () => {
    expect(formatWhen(new Date(2025, 8, 21, 13, 0).getTime(), now, hass)).toBe(
      '21 Sept 2025, 13:00',
    );
  });

  // The card's words are English: so are its days and months.
  it('words days and months in English, whatever HA’s language', () => {
    const de = { locale: { language: 'de', time_format: '24' as const } };
    expect(formatWhen(at(-3, 9), now, de)).toBe('Tue 09:30');
    const us = { locale: { language: 'en-US', time_format: '12' as const } };
    expect(formatWhen(at(-10, 9), now, us)).toBe('Oct 13, 9:30 AM');
  });

  // A day that's 23 hours long: the clocks went forward overnight.
  it('counts days across a change of the clocks', () => {
    const env = (globalThis as unknown as { process: { env: Record<string, string | undefined> } })
      .process.env;
    const was = env.TZ;
    env.TZ = 'Europe/London';
    // Unset, it must go back to unset: "undefined" would read as UTC.
    try {
      // The clocks go forward at 1 am on 29 March: its midnight to the next
      // is 23 hours.
      const before = new Date(2026, 2, 29, 12, 0).getTime();
      // The clocks go back at 2 am on 25 October: its midnight to the next
      // is 25 hours.
      const october = new Date(2026, 9, 25, 12, 0).getTime();
      expect(formatWhen(new Date(2026, 9, 26, 13, 0).getTime(), october, hass)).toBe(
        'tomorrow 13:00',
      );
      expect(formatWhen(new Date(2026, 2, 30, 13, 0).getTime(), before, hass)).toBe(
        'tomorrow 13:00',
      );
    } finally {
      if (was === undefined) delete env.TZ;
      else env.TZ = was;
    }
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
      desc: 'Getting the room ready for the next peak, starting 17:00: the bottom up 1°.',
    });
    expect(
      at('preconditioning', { precondition: 'cooling', low_adjustment: 0, high_adjustment: -0.5 }),
    ).toEqual({
      title: 'Right now',
      value: 'Cooling ahead',
      desc: 'Getting the room ready for the next peak: the top down 0.5°.',
    });
  });

  // Clamped by the unit's limits, an edge can move by next to nothing.
  it('leaves out an edge moved by less than 0.05°', () => {
    expect(at('active', { low_adjustment: -0.04, high_adjustment: 0.05 })!.desc).toBe(
      'The range is relaxed: the top up 0.1°. Basic control decides meanwhile.',
    );
    expect(at('active', { low_adjustment: -0.05, high_adjustment: 0.04 })!.desc).toBe(
      'The range is relaxed: the bottom down 0.1°. Basic control decides meanwhile.',
    );
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
