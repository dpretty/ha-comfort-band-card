/**
 * #67: while peak saving waits with a peak announced, or is getting ready for
 * one but moved nothing, the peak may move the range before the schedule's
 * next change, and whether it will isn't known until then. The status line
 * then doesn't say "until" the schedule's change, which could be untrue.
 */

import { describe, it, expect } from 'vitest';
import { peakComing } from '../src/diagnostics.js';
import { statusLine, type StatusInput } from '../src/now-status.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { stubConnection } from './_fixture.js';

const NOW = Date.parse('2026-10-22T10:00:00Z');
const MIN = 60_000;
const at = (minutes: number) => new Date(NOW + minutes * MIN).toISOString();

const ENTITIES = {
  peakSaving: 'sensor.gym_peak_saving',
  peakHeatOffset: 'number.gym_peak_heat_offset',
  peakCoolOffset: 'number.gym_peak_cool_offset',
  peakPreconditionMinutes: 'number.gym_peak_precondition_minutes',
};

type Spec = string | { state: string; attributes?: Record<string, unknown> } | null;

/** A zone waiting for a peak 2 hours ahead, offsets 2° and 1.5°, 60 minutes'
 *  lead; `overrides` replace any of it (null leaves an entity out). */
function makeHass(overrides: Record<string, Spec> = {}): HomeAssistant {
  const specs: Record<string, Spec> = {
    'sensor.gym_peak_saving': {
      state: 'waiting',
      attributes: { next_start: at(120), low_adjustment: 0, high_adjustment: 0 },
    },
    'number.gym_peak_heat_offset': '2',
    'number.gym_peak_cool_offset': '1.5',
    'number.gym_peak_precondition_minutes': '60',
    ...overrides,
  };
  const states: HomeAssistant['states'] = {};
  for (const [id, spec] of Object.entries(specs)) {
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
  };
}

const entities = (overrides: Partial<Record<keyof typeof ENTITIES, string | null>> = {}) =>
  ({ ...ENTITIES, ...overrides }) as unknown as ZoneEntities;

const peak = (state: string, attributes: Record<string, unknown>) => ({
  'sensor.gym_peak_saving': { state, attributes },
});

describe('peakComing', () => {
  const coming = (overrides: Record<string, Spec> = {}, e = entities()) =>
    peakComing(makeHass(overrides), e);

  it('is the lead time before an announced peak, while peak saving waits', () => {
    expect(coming()).toBe(NOW + 60 * MIN);
    expect(coming({ 'number.gym_peak_precondition_minutes': '0' })).toBe(NOW + 120 * MIN);
  });

  // It can't be told when getting ready would start.
  it('is any time before the peak where the lead time can’t be read', () => {
    expect(coming({ 'number.gym_peak_precondition_minutes': 'unavailable' })).toBe(-Infinity);
    expect(coming({ 'number.gym_peak_precondition_minutes': '' })).toBe(-Infinity);
    expect(coming({}, entities({ peakPreconditionMinutes: null }))).toBe(-Infinity);
  });

  // The offsets relax the range in a peak and move it ahead of one.
  it('is nothing where both peak offsets are 0, as no peak moves the range', () => {
    expect(
      coming({ 'number.gym_peak_heat_offset': '0', 'number.gym_peak_cool_offset': '0' }),
    ).toBeNull();
    expect(coming({ 'number.gym_peak_heat_offset': '0' })).toBe(NOW + 60 * MIN);
    expect(coming({ 'number.gym_peak_cool_offset': '0' })).toBe(NOW + 60 * MIN);
  });

  it('takes an offset it can’t read as one that may move the range', () => {
    const zeroAnd = (other: Spec) => ({
      'number.gym_peak_heat_offset': '0',
      'number.gym_peak_cool_offset': other,
    });
    expect(coming(zeroAnd('unavailable'))).toBe(NOW + 60 * MIN);
    expect(coming(zeroAnd(null))).toBe(NOW + 60 * MIN);
    expect(coming({}, entities({ peakHeatOffset: null, peakCoolOffset: null }))).toBe(
      NOW + 60 * MIN,
    );
  });

  // Getting ready moved nothing (that direction's offset 0, or a band 0.5°
  // wide or less). The integration decides the direction at every update, so
  // the other way's offset may move the range at once, and the peak's start
  // may relax it.
  it('is any time while getting ready for a peak moved nothing', () => {
    expect(
      coming(
        peak('preconditioning', { next_start: at(45), low_adjustment: 0, high_adjustment: 0 }),
      ),
    ).toBe(-Infinity);
    expect(coming(peak('preconditioning', { next_start: at(45) }))).toBe(-Infinity);
    // Getting ready to heat, with no heat offset: cooling could move it now.
    expect(
      coming({
        ...peak('preconditioning', { next_start: at(240), precondition: 'heating' }),
        'number.gym_peak_heat_offset': '0',
      }),
    ).toBe(-Infinity);
  });

  it('is nothing while getting ready where both offsets are 0', () => {
    expect(
      coming({
        ...peak('preconditioning', { next_start: at(45), low_adjustment: 0, high_adjustment: 0 }),
        'number.gym_peak_heat_offset': '0',
        'number.gym_peak_cool_offset': '0.0',
      }),
    ).toBeNull();
  });

  // #64 says those: the range is moved.
  it('is nothing where peak saving has moved the range', () => {
    expect(
      coming(
        peak('preconditioning', { next_start: at(45), low_adjustment: 0, high_adjustment: -1 }),
      ),
    ).toBeNull();
    expect(
      coming(peak('active', { ends: at(45), low_adjustment: -1, high_adjustment: 1 })),
    ).toBeNull();
  });

  it('is nothing in any other state, or without an announced start it can read', () => {
    for (const state of ['active', 'off', 'no_signal', 'override', 'unavailable']) {
      expect(coming(peak(state, { next_start: at(120) })), state).toBeNull();
    }
    expect(coming(peak('waiting', {}))).toBeNull();
    expect(coming(peak('waiting', { next_start: null }))).toBeNull();
    expect(coming(peak('waiting', { next_start: 'soon' }))).toBeNull();
    expect(coming({ 'sensor.gym_peak_saving': null })).toBeNull();
    expect(coming({}, entities({ peakSaving: null }))).toBeNull();
  });
});

describe('statusLine with a peak to come', () => {
  const base: StatusInput = {
    enabled: true,
    sensor: 'ok',
    action: 'idle',
    temperature: 20,
    band: { low: 17.5, high: 23 },
    overrideActive: false,
    overrideEnds: null,
    scheduled: true,
    nextChange: NOW + 180 * MIN,
    peak: null,
    peakComing: NOW + 60 * MIN,
    doing: null,
    now: NOW,
    formatTime: (ms) => `T+${(ms - NOW) / MIN}m`,
  };
  const line = (patch: Partial<StatusInput>) => statusLine({ ...base, ...patch }).text;

  it('leaves out the schedule’s next change where a peak may move the range first', () => {
    expect(line({})).toBe('Comfortable · 17.5–23°');
    expect(line({ peakComing: -Infinity })).toBe('Comfortable · 17.5–23°');
    // Already within the lead time, getting ready not yet begun.
    expect(line({ peakComing: NOW - 10 * MIN })).toBe('Comfortable · 17.5–23°');
    expect(statusLine(base).kind).toBe('comfortable');
  });

  it('says it where the schedule changes the range first, or then', () => {
    expect(line({ peakComing: NOW + 200 * MIN })).toBe('Comfortable · 17.5–23° until T+180m');
    expect(line({ peakComing: NOW + 180 * MIN })).toBe('Comfortable · 17.5–23° until T+180m');
    expect(line({ peakComing: null })).toBe('Comfortable · 17.5–23° until T+180m');
    expect(line({ peakComing: undefined })).toBe('Comfortable · 17.5–23° until T+180m');
  });

  // The A1 case from #67's review: the peak after the schedule's change, but
  // getting ready could move the range before it.
  it('leaves it out while getting ready moved nothing, the peak after the schedule’s change', () => {
    expect(line({ peakComing: -Infinity, nextChange: NOW + 30 * MIN })).toBe(
      'Comfortable · 17.5–23°',
    );
  });

  it('leaves it out after "Room sensor offline" too', () => {
    expect(line({ sensor: 'stand-in' })).toBe('Room sensor offline · Comfortable · 17.5–23°');
  });

  // Peak saving stands aside while an adjustment runs.
  it('still says when an adjustment ends', () => {
    expect(line({ overrideActive: true, overrideEnds: NOW + 120 * MIN })).toBe(
      'Comfortable · adjusted to 17.5–23° until T+120m',
    );
  });
});
