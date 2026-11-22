/**
 * #69: during a peak, Warmer and Cooler move the range without the peak's
 * relaxing: `withoutPeak` takes peak saving's published adjustments off the
 * range in force, where a peak has relaxed it. Not while getting ready for
 * one: that narrows the range towards comfort, and taking it off would move
 * the edge the heating or cooling works towards against the tap.
 */

import { describe, it, expect } from 'vitest';
import { withoutPeak } from '../src/diagnostics.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { stubConnection } from './_fixture.js';

const ENTITIES = { peakSaving: 'sensor.gym_peak_saving' } as unknown as ZoneEntities;

function makeHass(state: string | null, attributes: Record<string, unknown> = {}): HomeAssistant {
  return {
    states:
      state === null
        ? {}
        : {
            'sensor.gym_peak_saving': {
              entity_id: 'sensor.gym_peak_saving',
              state,
              attributes,
              last_changed: '',
              last_updated: '',
            },
          },
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: async () => undefined,
    callWS: async () => undefined as never,
  };
}

const BAND = { low: 17, high: 24 };

describe('withoutPeak', () => {
  it('takes a peak’s relaxing off the range', () => {
    expect(
      withoutPeak(makeHass('active', { low_adjustment: -1, high_adjustment: 1 }), ENTITIES, BAND),
    ).toEqual({ low: 18, high: 23 });
  });

  it('leaves getting ready’s shaping on', () => {
    expect(
      withoutPeak(
        makeHass('preconditioning', { low_adjustment: 0, high_adjustment: -1 }),
        ENTITIES,
        { low: 18, high: 22 },
      ),
    ).toEqual({ low: 18, high: 22 });
    expect(
      withoutPeak(
        makeHass('preconditioning', { low_adjustment: 1, high_adjustment: 0 }),
        ENTITIES,
        { low: 19, high: 23 },
      ),
    ).toEqual({ low: 19, high: 23 });
  });

  it('takes off the edge it can read where the other can’t be', () => {
    expect(
      withoutPeak(
        makeHass('active', { low_adjustment: -1, high_adjustment: null }),
        ENTITIES,
        BAND,
      ),
    ).toEqual({ low: 18, high: 24 });
    expect(withoutPeak(makeHass('active', { high_adjustment: 1 }), ENTITIES, BAND)).toEqual({
      low: 17,
      high: 23,
    });
  });

  // As the status line (#64): only where peak saving has moved the range.
  it('leaves the range as it is where peak saving hasn’t moved it', () => {
    const cases: Array<[string | null, Record<string, unknown>]> = [
      ['active', { low_adjustment: 0, high_adjustment: 0 }],
      ['active', { low_adjustment: -0.04, high_adjustment: 0.04 }],
      ['active', {}],
      ['waiting', { low_adjustment: -1, high_adjustment: 1 }],
      ['override', { low_adjustment: -1, high_adjustment: 1 }],
      ['off', { low_adjustment: -1, high_adjustment: 1 }],
      ['unavailable', {}],
      [null, {}],
    ];
    for (const [state, attributes] of cases) {
      expect(withoutPeak(makeHass(state, attributes), ENTITIES, BAND), String(state)).toEqual(BAND);
    }
    expect(
      withoutPeak(
        makeHass('active', { low_adjustment: -1, high_adjustment: 1 }),
        { peakSaving: null } as unknown as ZoneEntities,
        BAND,
      ),
    ).toEqual(BAND);
  });
});
