import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { formatTime } from '../src/now-status.js';
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
    'number.gym_override_hours': '3',
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

type SliderProbe = HTMLElement & { low: number; high: number; min: number; max: number };
function slider(el: ComfortBandNowTab): SliderProbe {
  return el.shadowRoot!.querySelector('dual-handle-slider') as SliderProbe;
}

async function release(el: ComfortBandNowTab, low: number, high: number): Promise<void> {
  slider(el).dispatchEvent(new CustomEvent('change', { detail: { low, high }, bubbles: true }));
  await flush(el);
}

/** Lets the awaited service call resolve and Lit re-render. */
async function flush(el: ComfortBandNowTab): Promise<void> {
  for (let i = 0; i < 50; i++) await Promise.resolve();
  await el.updateComplete;
}

async function nowTab(
  hass: HomeAssistant,
  entities = makeEntities(),
  zone = 'gym',
): Promise<ComfortBandNowTab> {
  return mount('comfort-band-now-tab', { hass, entities, zone });
}

function headline(el: ComfortBandNowTab): { value: string; note: string | null } {
  const root = el.shadowRoot!;
  return {
    value: root.querySelector('.temperature .value')!.textContent!.trim(),
    note: root.querySelector('.temperature .note')?.textContent!.trim() ?? null,
  };
}

function statusText(el: ComfortBandNowTab): string {
  return el.shadowRoot!.querySelector('.status span')!.textContent!.trim();
}

function lengths(el: ComfortBandNowTab): Array<{ text: string; checked: boolean }> {
  return Array.from(el.shadowRoot!.querySelectorAll('.lengths button')).map((b) => ({
    text: b.textContent!.trim(),
    checked: b.getAttribute('aria-checked') === 'true',
  }));
}

async function pickLength(el: ComfortBandNowTab, value: '1' | '3' | 'next'): Promise<void> {
  (el.shadowRoot!.querySelector(`.lengths button[data-length="${value}"]`) as HTMLElement).click();
  await flush(el);
}

async function tap(el: ComfortBandNowTab, which: 'warmer' | 'cooler', times = 1): Promise<void> {
  for (let i = 0; i < times; i++) {
    (el.shadowRoot!.querySelector(`.steps .${which}`) as HTMLElement).click();
  }
  await el.updateComplete;
}

function backButton(el: ComfortBandNowTab): HTMLButtonElement | null {
  return el.shadowRoot!.querySelector('.back');
}

/** A schedule-driven zone whose band next changes at `next` (ms). */
function scheduledHass(
  next: number | null,
  overrides: Partial<Record<string, string>> = {},
  scheduled = true,
): HomeAssistant {
  return makeHass(
    {
      'sensor.gym_next_band_change': next === null ? 'unknown' : new Date(next).toISOString(),
      ...overrides,
    },
    { 'sensor.gym_next_band_change': { scheduled, low: 18, high: 23 } },
  );
}

const NOW = Date.parse('2026-10-22T10:00:00Z');
const HOUR = 3_600_000;

describe('comfort-band-now-tab', () => {
  it('shows the room temperature large, to one decimal', async () => {
    const el = await nowTab(makeHass());
    expect(headline(el)).toEqual({ value: '21.0°', note: null });
  });

  // The value that drives control is the large one.
  it('shows "feels like" large when apparent temperature drives control', async () => {
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'sensor.gym_apparent_temperature': '23.5',
        'switch.gym_use_apparent_temperature': 'on',
      }),
    );
    expect(headline(el)).toEqual({ value: '23.5°', note: 'Feels like · room 21.0°' });
  });

  it('says "feels like" without the room when the two agree', async () => {
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'sensor.gym_apparent_temperature': '21.0',
        'switch.gym_use_apparent_temperature': 'on',
      }),
    );
    expect(headline(el)).toEqual({ value: '21.0°', note: 'Feels like' });
  });

  it('puts "feels like" underneath when it differs but the room drives control', async () => {
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'sensor.gym_apparent_temperature': '23.5',
      }),
    );
    expect(headline(el)).toEqual({ value: '21.0°', note: 'Feels like 23.5°' });
  });

  it('warns when apparent mode is on but no humidity reading is available', async () => {
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'switch.gym_use_apparent_temperature': 'on',
      }),
    );
    expect(headline(el)).toEqual({ value: '21.0°', note: null });
    expect(el.shadowRoot!.querySelector('.warn')!.textContent).toContain('no humidity reading');
  });

  it('starts the slider from the band in force, not the last override', async () => {
    const el = await nowTab(
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
    const el = await nowTab(
      makeHass({ 'sensor.gym_effective_low': '18.37', 'sensor.gym_effective_high': '22.83' }),
    );
    const s = slider(el);
    expect([s.low, s.high]).toEqual([18.4, 22.8]);
  });

  it('falls back to 19–22 when neither band can be read', async () => {
    for (const manualLow of ['unavailable', '20']) {
      const el = await nowTab(
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
      const el = await nowTab(
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
    const el = await nowTab(
      makeHass({ 'sensor.gym_effective_low': '21', 'sensor.gym_effective_high': '21.2' }),
    );
    expect([slider(el).low, slider(el).high]).toEqual([21, 21.5]);
  });

  it('keeps its usual 16–26 track for a band inside it', async () => {
    const el = await nowTab(makeHass());
    expect([slider(el).min, slider(el).max]).toEqual([16, 26]);
  });

  // On a 16–26 track, a band of 15–28 had both handles drawn off the track, the
  // low handle's first press took it to 16, and End on the high one sent 26.
  it('takes in a band outside its track, so each handle moves only itself', async () => {
    const hass = makeHass({ 'sensor.gym_effective_low': '15', 'sensor.gym_effective_high': '28' });
    const el = await nowTab(hass);
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
    const el = await nowTab(
      makeHass({ 'sensor.gym_effective_low': '15.6', 'sensor.gym_effective_high': '27.3' }),
    );
    expect([slider(el).min, slider(el).max]).toEqual([15, 28]);
  });

  it('keeps the track during a drag, though the band in force moves', async () => {
    const el = await nowTab(
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
    const el = await nowTab(
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

  it('slider change starts an override with the new band, for the chosen length', async () => {
    const hass = makeHass();
    const el = await nowTab(hass);
    await pickLength(el, '1');
    await release(el, 20.5, 23.5);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
      zone: 'gym',
      low: 20.5,
      high: 23.5,
      hours: 1,
    });
  });

  // Otherwise the taps would land after the slider's change and replace it.
  it('drops Warmer / Cooler taps not yet sent when the slider sets a range', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    try {
      const hass = makeHass();
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      await release(el, 18, 21);
      vi.advanceTimersByTime(2_000);
      await flush(el);
      expect((hass.callService as ReturnType<typeof vi.fn>).mock.calls.map((c) => c[2])).toEqual([
        { zone: 'gym', low: 18, high: 21, hours: 3 },
      ]);
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps the slider folded away under "Set an exact range"', async () => {
    const el = await nowTab(makeHass());
    const details = el.shadowRoot!.querySelector('details.exact-range') as HTMLDetailsElement;
    expect(details.open).toBe(false);
    expect(details.querySelector('summary')!.textContent!.trim()).toBe('Set an exact range');
    expect(details.querySelector('dual-handle-slider')).not.toBeNull();
  });

  // ----- v0.10.0: comfort feedback pills -----

  it('renders three comfort-feedback pills below the gauge', async () => {
    const el = await nowTab(makeHass());
    const pills = el.shadowRoot!.querySelectorAll('.feedback-pill');
    expect(pills.length).toBe(3);
    const labels = Array.from(pills).map((p) => p.getAttribute('data-feedback'));
    expect(labels).toEqual(['too_cold', 'just_right', 'too_hot']);
    expect(Array.from(pills).map((p) => p.textContent!.trim())).toEqual([
      'Too cool',
      'Just right',
      'Too warm',
    ]);
  });

  it('tapping a pill calls comfort_band.record_feedback with that label', async () => {
    const hass = makeHass();
    const el = await nowTab(hass);
    const warm = el.shadowRoot!.querySelector<HTMLButtonElement>('[data-feedback="too_hot"]')!;
    warm.click();
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'record_feedback', {
      zone: 'gym',
      label: 'too_hot',
    });
  });

  it('highlights the tapped pill, then clears it after the confirm window', async () => {
    vi.useFakeTimers();
    try {
      const hass = makeHass();
      const el = await nowTab(hass);
      const pill = el.shadowRoot!.querySelector<HTMLButtonElement>('[data-feedback="just_right"]')!;
      pill.click();
      // Flush the awaited callService microtask (not a timer).
      await vi.advanceTimersByTimeAsync(0);
      await el.updateComplete;
      const confirmed = el.shadowRoot!.querySelector('[data-feedback="just_right"]')!;
      expect(confirmed.classList.contains('confirmed')).toBe(true);
      expect(confirmed.textContent!.trim()).toBe('Thanks!');

      await vi.advanceTimersByTimeAsync(1500);
      await el.updateComplete;
      const cleared = el.shadowRoot!.querySelector('[data-feedback="just_right"]')!;
      expect(cleared.classList.contains('confirmed')).toBe(false);
      expect(cleared.textContent!.trim()).toBe('Just right');
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not highlight when record_feedback rejects (e.g. integration too old)', async () => {
    const hass = makeHass();
    (hass.callService as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('no service'));
    const el = await nowTab(hass);
    const pill = el.shadowRoot!.querySelector<HTMLButtonElement>('[data-feedback="too_cold"]')!;
    pill.click();
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.feedback-pill.confirmed')).toBeNull();
  });

  it('clears the pending confirm timer + confirmed state on disconnect', async () => {
    const el = await nowTab(makeHass());
    const pill = el.shadowRoot!.querySelector<HTMLButtonElement>('[data-feedback="too_hot"]')!;
    pill.click();
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    const internals = el as unknown as { _feedbackTimer: unknown; _feedbackConfirmed: unknown };
    expect(internals._feedbackTimer).not.toBeNull();
    expect(internals._feedbackConfirmed).toBe('too_hot');
    el.remove();
    // No stale timer (would setState on an unmounted element) and no
    // residual "Thanks!" that could resurface on reattach.
    expect(internals._feedbackTimer).toBeNull();
    expect(internals._feedbackConfirmed).toBeNull();
  });

  it('cross-pill double-tap: only the last-tapped pill is highlighted', async () => {
    vi.useFakeTimers();
    try {
      const el = await nowTab(makeHass());
      const cold = el.shadowRoot!.querySelector<HTMLButtonElement>('[data-feedback="too_cold"]')!;
      const hot = el.shadowRoot!.querySelector<HTMLButtonElement>('[data-feedback="too_hot"]')!;
      // Two taps within a frame; the seq guard makes the last one own the
      // highlight regardless of which service round-trip resolves first.
      cold.click();
      hot.click();
      await vi.advanceTimersByTimeAsync(0);
      await el.updateComplete;
      expect(
        el.shadowRoot!.querySelector('[data-feedback="too_hot"]')!.classList.contains('confirmed'),
      ).toBe(true);
      expect(
        el.shadowRoot!.querySelector('[data-feedback="too_cold"]')!.classList.contains('confirmed'),
      ).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  // As on main: the slider shows the dragged values while dragging, and follows
  // the band in force once the drag is released.
  it('lets go of the dragged values on release', async () => {
    const el = await nowTab(makeHass());
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
  describe('status line', () => {
    afterEach(() => vi.useRealTimers());

    it('says the room is comfortable, its range, and when the schedule next changes it', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(NOW);
      const el = await nowTab(scheduledHass(NOW + 5 * HOUR));
      expect(statusText(el)).toBe(`Comfortable · 19.5–22.5° until ${formatTime(NOW + 5 * HOUR)}`);
    });

    it('says what the room is doing when it is heating or cooling', async () => {
      const heating = await nowTab(scheduledHass(null, { 'sensor.gym_current_action': 'heating' }));
      expect(statusText(heating)).toBe('Heating · 19.5–22.5°');
      // The icon takes its colour from the kind.
      expect(heating.shadowRoot!.querySelector('.status')!.classList.contains('heating')).toBe(
        true,
      );
      heating.remove();
      const cooling = await nowTab(scheduledHass(null, { 'sensor.gym_current_action': 'cooling' }));
      expect(statusText(cooling)).toBe('Cooling · 19.5–22.5°');
    });

    it("doesn't call a room outside its range comfortable", async () => {
      const el = await nowTab(scheduledHass(null, { 'sensor.gym_room_temperature': '18.0' }));
      expect(statusText(el)).toBe('Idle · 19.5–22.5°');
    });

    // With apparent temperature in use, "comfortable" is about how it feels.
    it('judges comfort by the temperature that drives control', async () => {
      const el = await nowTab(
        scheduledHass(null, {
          'sensor.gym_room_temperature': '18.0',
          'sensor.gym_apparent_temperature': '20.0',
          'switch.gym_use_apparent_temperature': 'on',
        }),
      );
      expect(statusText(el)).toBe('Comfortable · 19.5–22.5°');
    });

    it('says when a room is paused', async () => {
      const el = await nowTab(scheduledHass(null, { 'switch.gym_enabled': 'off' }));
      expect(statusText(el)).toBe('Paused: not controlling this room');
    });

    it('says a room has been adjusted, and until when', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(NOW);
      const el = await nowTab(
        scheduledHass(NOW + 5 * HOUR, {
          'binary_sensor.gym_override_active': 'on',
          'sensor.gym_override_ends': new Date(NOW + 2 * HOUR).toISOString(),
          'sensor.gym_effective_low': '20',
          'sensor.gym_effective_high': '23',
        }),
      );
      expect(statusText(el)).toBe(
        `Comfortable · adjusted to 20–23° until ${formatTime(NOW + 2 * HOUR)}`,
      );
    });

    it('is a polite live region', async () => {
      const el = await nowTab(makeHass());
      const status = el.shadowRoot!.querySelector('.status')!;
      expect(status.getAttribute('role')).toBe('status');
      expect(status.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Warmer and Cooler', () => {
    afterEach(() => vi.useRealTimers());

    it('sends taps made close together as one change once they stop', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass();
      const el = await nowTab(hass);
      await tap(el, 'warmer', 2);
      expect(statusText(el)).toBe('Adjusting to 20.5–23.5°');
      vi.advanceTimersByTime(1_499);
      expect(hass.callService).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      await flush(el);
      expect(hass.callService).toHaveBeenCalledTimes(1);
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 20.5,
        high: 23.5,
        hours: 3,
      });
    });

    it('waits for a pause after the last tap', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass();
      const el = await nowTab(hass);
      await tap(el, 'cooler');
      vi.advanceTimersByTime(1_000);
      await tap(el, 'cooler');
      vi.advanceTimersByTime(1_000);
      expect(hass.callService).not.toHaveBeenCalled();
      vi.advanceTimersByTime(500);
      await flush(el);
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 18.5,
        high: 21.5,
        hours: 3,
      });
    });

    it('sends nothing for taps that cancel out', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass();
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      await tap(el, 'cooler');
      expect(statusText(el)).toBe('Comfortable · 19.5–22.5°');
      vi.advanceTimersByTime(2_000);
      await flush(el);
      expect(hass.callService).not.toHaveBeenCalled();
    });

    // The manual values are only the last override's.
    it('moves the band in force, not the last override', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass({
        'sensor.gym_effective_low': '17.5',
        'sensor.gym_effective_high': '23',
        'number.gym_manual_low': '22',
        'number.gym_manual_high': '24.5',
      });
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      vi.advanceTimersByTime(1_500);
      await flush(el);
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 18,
        high: 23.5,
        hours: 3,
      });
    });

    it('builds on a change still going through, and sends after it', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass();
      let resolve!: () => void;
      (hass.callService as ReturnType<typeof vi.fn>).mockImplementationOnce(
        () => new Promise<void>((res) => (resolve = res)),
      );
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      vi.advanceTimersByTime(1_500);
      await flush(el);
      expect(statusText(el)).toBe('Adjusting to 20–23°');
      // hass hasn't caught up; the next tap starts from what is being sent.
      await tap(el, 'warmer');
      vi.advanceTimersByTime(1_500);
      await flush(el);
      expect(hass.callService).toHaveBeenCalledTimes(1);
      resolve();
      await flush(el);
      expect((hass.callService as ReturnType<typeof vi.fn>).mock.calls.map((c) => c[2])).toEqual([
        { zone: 'gym', low: 20, high: 23, hours: 3 },
        { zone: 'gym', low: 20.5, high: 23.5, hours: 3 },
      ]);
    });

    it('keeps showing the latest change while an earlier one finishes', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass();
      let resolveFirst!: () => void;
      (hass.callService as ReturnType<typeof vi.fn>)
        .mockImplementationOnce(() => new Promise<void>((res) => (resolveFirst = res)))
        .mockImplementationOnce(() => new Promise<void>(() => undefined));
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      vi.advanceTimersByTime(1_500);
      await flush(el);
      await tap(el, 'warmer');
      vi.advanceTimersByTime(1_500);
      await flush(el);
      resolveFirst();
      await flush(el);
      expect(statusText(el)).toBe('Adjusting to 20.5–23.5°');
    });

    it('goes back to the band in force once the change has gone through, or failed', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass();
      (hass.callService as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('rejected'));
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      vi.advanceTimersByTime(1_500);
      await flush(el);
      expect(statusText(el)).toBe('Comfortable · 19.5–22.5°');
    });

    it('sends taps not yet sent when the dialog closes', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass();
      const el = await nowTab(hass);
      await tap(el, 'cooler');
      el.remove();
      await flush(el);
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 19,
        high: 22,
        hours: 3,
      });
      expect(vi.getTimerCount()).toBe(0);
    });

    it("isn't offered when the band in force can't be read", async () => {
      const el = await nowTab(
        makeHass({
          'sensor.gym_effective_low': 'unavailable',
          'sensor.gym_effective_high': 'unavailable',
        }),
      );
      expect(el.shadowRoot!.querySelector('.steps')).toBeNull();
      expect(statusText(el)).toBe("Can't read this room's range");
    });
  });

  describe('Adjust for', () => {
    afterEach(() => vi.useRealTimers());

    it('offers 1 h, 3 h and until the next change, and starts on until', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(NOW);
      const el = await nowTab(scheduledHass(NOW + 5 * HOUR));
      expect(lengths(el)).toEqual([
        { text: '1 h', checked: false },
        { text: '3 h', checked: false },
        { text: `Until ${formatTime(NOW + 5 * HOUR)}`, checked: true },
      ]);
    });

    it('sends the hours to the next change for "until"', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      vi.setSystemTime(NOW);
      const hass = scheduledHass(NOW + 3.5 * HOUR);
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      vi.advanceTimersByTime(1_500);
      await flush(el);
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 20,
        high: 23,
        hours: 3.5 - 1_500 / HOUR,
      });
    });

    it('sends the length picked', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      vi.setSystemTime(NOW);
      const hass = scheduledHass(NOW + 5 * HOUR);
      const el = await nowTab(hass);
      await pickLength(el, '1');
      expect(lengths(el).map((l) => l.checked)).toEqual([true, false, false]);
      await tap(el, 'cooler');
      vi.advanceTimersByTime(1_500);
      await flush(el);
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 19,
        high: 22,
        hours: 1,
      });
    });

    it('falls back to 3 h when "until" has been picked but is no longer on offer', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      vi.setSystemTime(NOW);
      const hass = scheduledHass(NOW + 20 * 60_000);
      const el = await nowTab(hass);
      await pickLength(el, 'next');
      vi.setSystemTime(NOW + 6 * 60_000);
      await tap(el, 'warmer');
      vi.advanceTimersByTime(1_500);
      await flush(el);
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 20,
        high: 23,
        hours: 3,
      });
    });

    it("doesn't offer until a change under fifteen minutes off, and starts on 3 h", async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(NOW);
      const el = await nowTab(scheduledHass(NOW + 14 * 60_000));
      expect(lengths(el)).toEqual([
        { text: '1 h', checked: false },
        { text: '3 h', checked: true },
      ]);
    });

    it('re-times an adjustment that is running', async () => {
      const hass = scheduledHass(null, {
        'binary_sensor.gym_override_active': 'on',
        'number.gym_manual_low': '20',
        'number.gym_manual_high': '23.5',
      });
      const el = await nowTab(hass);
      await pickLength(el, '1');
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 20,
        high: 23.5,
        hours: 1,
      });
    });

    it('only stores the length when nothing is adjusted', async () => {
      const hass = scheduledHass(null);
      const el = await nowTab(hass);
      await pickLength(el, '1');
      expect(hass.callService).not.toHaveBeenCalled();
    });

    it('gives a burst still being tapped the length picked, without a call of its own', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = scheduledHass(null, { 'binary_sensor.gym_override_active': 'on' });
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      await pickLength(el, '1');
      expect(hass.callService).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1_500);
      await flush(el);
      expect(hass.callService).toHaveBeenCalledTimes(1);
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 20,
        high: 23,
        hours: 1,
      });
    });
  });

  describe('Back to schedule', () => {
    afterEach(() => vi.useRealTimers());

    const adjusted = (extra: Partial<Record<string, string>> = {}) =>
      scheduledHass(null, { 'binary_sensor.gym_override_active': 'on', ...extra });

    it('is shown while a room is adjusted, and ends the adjustment', async () => {
      const hass = adjusted();
      const el = await nowTab(hass);
      expect(backButton(el)!.textContent!.trim()).toBe('Back to schedule');
      backButton(el)!.click();
      await flush(el);
      expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'cancel_override', {
        zone: 'gym',
      });
    });

    it("isn't shown when nothing is adjusted", async () => {
      const el = await nowTab(scheduledHass(null));
      expect(backButton(el)).toBeNull();
    });

    it('drops taps not yet sent', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = adjusted();
      const el = await nowTab(hass);
      await tap(el, 'warmer');
      backButton(el)!.click();
      vi.advanceTimersByTime(2_000);
      await flush(el);
      expect((hass.callService as ReturnType<typeof vi.fn>).mock.calls.map((c) => c[1])).toEqual([
        'cancel_override',
      ]);
    });
  });

  // start_override writes the band to the manual values, and with no schedule
  // those are the zone's band: an adjustment there doesn't end.
  describe('a room with no schedule', () => {
    afterEach(() => vi.useRealTimers());

    it('says an adjustment is set, without an end, and offers no way back to a schedule', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(NOW);
      const el = await nowTab(
        scheduledHass(
          null,
          {
            'binary_sensor.gym_override_active': 'on',
            'sensor.gym_override_ends': new Date(NOW + 2 * HOUR).toISOString(),
          },
          false,
        ),
      );
      expect(statusText(el)).toBe('Comfortable · set to 19.5–22.5°');
      expect(backButton(el)).toBeNull();
      expect(el.shadowRoot!.querySelector('.lengths')).toBeNull();
    });
  });

  // Integrations before v0.23.0 don't say whether a schedule sets the band.
  describe('an older integration', () => {
    afterEach(() => vi.useRealTimers());

    it('promises no end time, and ends an adjustment without naming the schedule', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(NOW);
      const el = await nowTab(
        makeHass({
          'binary_sensor.gym_override_active': 'on',
          'sensor.gym_override_ends': new Date(NOW + 2 * HOUR).toISOString(),
        }),
      );
      expect(statusText(el)).toBe('Comfortable · adjusted to 19.5–22.5°');
      expect(backButton(el)!.textContent!.trim()).toBe('End adjustment');
      expect(lengths(el).map((l) => l.text)).toEqual(['1 h', '3 h']);
    });
  });
});
