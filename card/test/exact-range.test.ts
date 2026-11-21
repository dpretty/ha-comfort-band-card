import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/exact-range.js';
import type { ComfortBandExactRange } from '../src/exact-range.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

afterEach(teardown);

function makeEntities(zone = 'gym'): ZoneEntities {
  return {
    effectiveLow: `sensor.${zone}_effective_low`,
    effectiveHigh: `sensor.${zone}_effective_high`,
    roomTemperature: `sensor.${zone}_room_temperature`,
    apparentTemperature: `sensor.${zone}_apparent_temperature`,
    overrideEnds: `sensor.${zone}_override_ends`,
    nextBandChange: `sensor.${zone}_next_band_change`,
    currentAction: `sensor.${zone}_current_action`,
    overrideActive: `binary_sensor.${zone}_override_active`,
    roomSensorUnavailable: `binary_sensor.${zone}_room_sensor_unavailable`,
    manualLow: `number.${zone}_manual_low`,
    manualHigh: `number.${zone}_manual_high`,
    overrideHours: `number.${zone}_override_hours`,
    deadbandBelow: `number.${zone}_deadband_below`,
    deadbandAbove: `number.${zone}_deadband_above`,
    minCycleMinutes: `number.${zone}_min_cycle_minutes`,
    cancelOverride: `button.${zone}_cancel_override`,
    enabled: `switch.${zone}_enabled`,
    learningEnabled: `switch.${zone}_learning_enabled`,
    useApparentTemperature: `switch.${zone}_use_apparent_temperature`,
    deviceId: `dev-${zone}`,
    deviceName: zone,
  };
}

function makeHass(
  overrides: Partial<Record<string, string>> = {},
  attributes: Record<string, Record<string, unknown>> = {},
): HomeAssistant {
  const states: Record<string, string> = {
    'sensor.gym_effective_low': '19.5',
    'sensor.gym_effective_high': '22.5',
    'sensor.gym_room_temperature': '21.0',
    'sensor.gym_current_action': 'idle',
    'sensor.gym_override_ends': 'unknown',
    'binary_sensor.gym_override_active': 'off',
    'number.gym_manual_low': '19',
    'number.gym_manual_high': '22',
    // Not the card's default of 3 h: the card no longer reads it.
    'number.gym_override_hours': '6',
    ...overrides,
  };
  return {
    states: Object.fromEntries(
      Object.entries(states).map(([k, v]) => [
        k,
        {
          entity_id: k,
          state: v as string,
          attributes: attributes[k] ?? {},
          last_changed: '',
          last_updated: '',
        },
      ]),
    ),
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn().mockResolvedValue(undefined),
  };
}

/** Lets the awaited service call resolve and Lit re-render. */
async function flush(el: ComfortBandExactRange): Promise<void> {
  for (let i = 0; i < 50; i++) await Promise.resolve();
  await el.updateComplete;
}

async function exactRange(
  hass: HomeAssistant,
  entities = makeEntities(),
  zone = 'gym',
): Promise<ComfortBandExactRange> {
  return mount('comfort-band-exact-range', { hass, entities, zone });
}

type SliderProbe = HTMLElement & { low: number; high: number; min: number; max: number };
function slider(el: ComfortBandExactRange): SliderProbe {
  return el.shadowRoot!.querySelector('dual-handle-slider') as SliderProbe;
}

async function release(el: ComfortBandExactRange, low: number, high: number): Promise<void> {
  slider(el).dispatchEvent(new CustomEvent('change', { detail: { low, high }, bubbles: true }));
  await flush(el);
}

describe('comfort-band-exact-range', () => {
  it('starts the slider from the band in force, not the last override', async () => {
    const el = await exactRange(
      makeHass({
        'sensor.gym_effective_low': '18.0',
        'sensor.gym_effective_high': '23.0',
        'number.gym_manual_low': '19.5',
        'number.gym_manual_high': '22.5',
      }),
    );
    const s = slider(el);
    expect([s.low, s.high]).toEqual([18, 23]);
  });
  // Rounded to what the readout shows, not to the slider's steps: snapping would
  // change the limit the user doesn't move when they nudge the other.
  it('starts from a mid-ramp band to the tenth of a degree the values show', async () => {
    const el = await exactRange(
      makeHass({ 'sensor.gym_effective_low': '18.37', 'sensor.gym_effective_high': '22.83' }),
    );
    const s = slider(el);
    expect([s.low, s.high]).toEqual([18.4, 22.8]);
  });
  it('falls back to 19–22 when neither band can be read', async () => {
    for (const manualLow of ['unavailable', '20']) {
      const el = await exactRange(
        makeHass({
          'sensor.gym_effective_low': 'unavailable',
          'sensor.gym_effective_high': 'unavailable',
          'number.gym_manual_low': manualLow,
          'number.gym_manual_high': 'unavailable',
        }),
      );
      expect([slider(el).low, slider(el).high]).toEqual([19, 22]);
      el.remove();
    }
  });
  it('falls back to the manual values when only one side of the band is unavailable', async () => {
    for (const [low, high] of [
      ['unavailable', '23'],
      ['18', 'unavailable'],
    ]) {
      const el = await exactRange(
        makeHass({
          'sensor.gym_effective_low': low,
          'sensor.gym_effective_high': high,
          'number.gym_manual_low': '20',
          'number.gym_manual_high': '23.5',
        }),
      );
      expect([slider(el).low, slider(el).high]).toEqual([20, 23.5]);
      el.remove();
    }
  });
  it('widens a band narrower than one step, which the slider cannot hold', async () => {
    const el = await exactRange(
      makeHass({ 'sensor.gym_effective_low': '21', 'sensor.gym_effective_high': '21.2' }),
    );
    expect([slider(el).low, slider(el).high]).toEqual([21, 21.5]);
  });
  it('keeps its usual 16–26 track for a band inside it', async () => {
    const el = await exactRange(makeHass());
    expect([slider(el).min, slider(el).max]).toEqual([16, 26]);
  });
  // On a 16–26 track, a band of 15–28 had both handles drawn off the track, the
  // low handle's first press took it to 16, and End on the high one sent 26.
  it('takes in a band outside its track, so each handle moves only itself', async () => {
    const hass = makeHass({ 'sensor.gym_effective_low': '15', 'sensor.gym_effective_high': '28' });
    const el = await exactRange(hass);
    const s = slider(el);
    expect([s.min, s.max, s.low, s.high]).toEqual([15, 28, 15, 28]);

    const lowThumb = s.shadowRoot!.querySelector('.thumb') as HTMLElement;
    lowThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await flush(el);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
      zone: 'gym',
      low: 15.5,
      high: 28,
      hours: 3,
    });

    // End on the high handle, already at the top: nothing to send.
    const highThumb = s.shadowRoot!.querySelectorAll('.thumb')[1] as HTMLElement;
    highThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await flush(el);
    expect(hass.callService).toHaveBeenCalledTimes(1);
  });
  it('widens the track to whole degrees around a fractional band outside it', async () => {
    // Rounding would give 16 and 27, leaving the band off the track.
    const el = await exactRange(
      makeHass({ 'sensor.gym_effective_low': '15.6', 'sensor.gym_effective_high': '27.3' }),
    );
    expect([slider(el).min, slider(el).max]).toEqual([15, 28]);
  });
  it('keeps the track during a drag, though the band in force moves', async () => {
    const el = await exactRange(
      makeHass({ 'sensor.gym_effective_low': '15', 'sensor.gym_effective_high': '28' }),
    );
    slider(el).dispatchEvent(
      new CustomEvent('input', { detail: { low: 17, high: 25 }, bubbles: true }),
    );
    await el.updateComplete;
    expect([slider(el).min, slider(el).max]).toEqual([15, 28]);
    // A ramp moves the band in force mid-drag.
    el.hass = makeHass({ 'sensor.gym_effective_low': '16.5', 'sensor.gym_effective_high': '25' });
    await el.updateComplete;
    expect([slider(el).min, slider(el).max]).toEqual([15, 28]);
    // Once the slider follows the band in force again, the track does too.
    await release(el, 17, 25);
    el.hass = makeHass({ 'sensor.gym_effective_low': '17', 'sensor.gym_effective_high': '25' });
    await el.updateComplete;
    expect([slider(el).min, slider(el).max]).toEqual([16, 26]);
  });
  it('falls back to the manual values when the band is unavailable', async () => {
    const el = await exactRange(
      makeHass({
        'sensor.gym_effective_low': 'unavailable',
        'sensor.gym_effective_high': 'unavailable',
        'number.gym_manual_low': '20',
        'number.gym_manual_high': '23',
      }),
    );
    const s = slider(el);
    expect([s.low, s.high]).toEqual([20, 23]);
  });
  // As on main: the slider shows the dragged values while dragging, and follows
  // the band in force once the drag is released.
  it('lets go of the dragged values on release', async () => {
    const el = await exactRange(makeHass());
    slider(el).dispatchEvent(
      new CustomEvent('input', { detail: { low: 20.5, high: 23.5 }, bubbles: true }),
    );
    await el.updateComplete;
    expect([slider(el).low, slider(el).high]).toEqual([20.5, 23.5]);
    await release(el, 20.5, 23.5);
    el.hass = makeHass({ 'sensor.gym_effective_low': '20.5', 'sensor.gym_effective_high': '23.5' });
    await el.updateComplete;
    el.hass = makeHass({ 'sensor.gym_effective_low': '18', 'sensor.gym_effective_high': '23' });
    await el.updateComplete;
    expect([slider(el).low, slider(el).high]).toEqual([18, 23]);
  });

  it("sends the range released for three hours, the Now tab's default length", async () => {
    const hass = makeHass();
    const el = await exactRange(hass);
    await release(el, 20.5, 23.5);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
      zone: 'gym',
      low: 20.5,
      high: 23.5,
      hours: 3,
    });
  });

  it('says how long the range lasts', async () => {
    const desc = async (hass: HomeAssistant) => {
      const el = await exactRange(hass);
      const text = el.shadowRoot!.querySelector('.desc')!.textContent!.trim();
      el.remove();
      return text;
    };
    const withSchedule = (scheduled: boolean) =>
      makeHass(
        { 'sensor.gym_next_band_change': 'unknown' },
        { 'sensor.gym_next_band_change': { scheduled } },
      );
    expect(await desc(withSchedule(true))).toBe(
      'Sets this room’s range for 3 hours, then the schedule takes over again.',
    );
    // With no schedule, the range stays: start_override writes the manual band.
    expect(await desc(withSchedule(false))).toBe('Sets this room’s range until you change it.');
    // An integration that doesn't say.
    expect(await desc(makeHass())).toBe('Sets this room’s range for 3 hours.');
  });

  it('is titled "Set an exact range"', async () => {
    const el = await exactRange(makeHass());
    expect(el.shadowRoot!.querySelector('.title')!.textContent!.trim()).toBe('Set an exact range');
  });

  it('sends nothing without a zone', async () => {
    const hass = makeHass();
    const el = await exactRange(hass, makeEntities(), '');
    await release(el, 20, 23);
    expect(hass.callService).not.toHaveBeenCalled();
  });

  // HA's own toast reports it; nothing is left unhandled, and the next
  // release still goes.
  it('lets a rejected call go', async () => {
    const unhandled = vi.fn();
    // Node's own process; the project has no Node types.
    const proc = (
      globalThis as unknown as {
        process: {
          on(event: string, listener: (...args: unknown[]) => void): void;
          off(event: string, listener: (...args: unknown[]) => void): void;
        };
      }
    ).process;
    proc.on('unhandledRejection', unhandled);
    try {
      const hass = makeHass();
      (hass.callService as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('nope'));
      const el = await exactRange(hass);
      await release(el, 20, 23);
      await new Promise((r) => setTimeout(r, 0));
      await release(el, 20.5, 23);
      await new Promise((r) => setTimeout(r, 0));
      expect(unhandled).not.toHaveBeenCalled();
      expect(hass.callService).toHaveBeenCalledTimes(2);
    } finally {
      proc.off('unhandledRejection', unhandled);
    }
  });

  // As they were from the Now tab, so the last release is the one in force.
  it('sends releases one after another, in the order made', async () => {
    const hass = makeHass();
    let finish = () => {};
    (hass.callService as ReturnType<typeof vi.fn>).mockImplementationOnce(
      () => new Promise<void>((resolve) => (finish = resolve)),
    );
    const el = await exactRange(hass);
    await release(el, 20, 23);
    await release(el, 21, 24);
    expect(hass.callService).toHaveBeenCalledTimes(1);
    finish();
    await flush(el);
    expect((hass.callService as ReturnType<typeof vi.fn>).mock.calls.map((c) => c[2])).toEqual([
      { zone: 'gym', low: 20, high: 23, hours: 3 },
      { zone: 'gym', low: 21, high: 24, hours: 3 },
    ]);
  });

  it('names its sliders as one group, with what it does', async () => {
    const el = await exactRange(makeHass());
    const group = el.shadowRoot!.querySelector('[role="group"]')!;
    const title = el.shadowRoot!.getElementById(group.getAttribute('aria-labelledby')!)!;
    const desc = el.shadowRoot!.getElementById(group.getAttribute('aria-describedby')!)!;
    expect(title.textContent!.trim()).toBe('Set an exact range');
    expect(desc.textContent!.trim()).toBe('Sets this room’s range for 3 hours.');
    expect(group.querySelector('dual-handle-slider')).not.toBeNull();
  });
});
