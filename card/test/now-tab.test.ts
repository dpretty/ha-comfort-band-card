import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
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

function makeHass(overrides: Partial<Record<string, string>> = {}): HomeAssistant {
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
          attributes: {},
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

describe('comfort-band-now-tab', () => {
  it('renders prominent room temperature with one decimal', async () => {
    const el = await nowTab(makeHass());
    expect(el.shadowRoot!.querySelector('.room-temp')!.textContent).toContain('21.0°');
  });

  it('omits the action chip when idle', async () => {
    const el = await nowTab(makeHass({ 'sensor.gym_current_action': 'idle' }));
    expect(el.shadowRoot!.querySelector('.action-chip')).toBeNull();
  });

  it('shows the action chip when heating', async () => {
    const el = await nowTab(makeHass({ 'sensor.gym_current_action': 'heating' }));
    expect(el.shadowRoot!.querySelector('.action-chip')!.textContent).toContain('Heating');
  });

  // The manual values are the *last* override's; the slider used to start from
  // them, so nudging one handle silently replaced the other limit with a stale
  // value. It must start from the band actually in force.
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

  it('slider change calls comfort_band.start_override with the new band', async () => {
    const hass = makeHass();
    const el = await nowTab(hass);
    const slider = el.shadowRoot!.querySelector('dual-handle-slider')!;
    slider.dispatchEvent(
      new CustomEvent('change', { detail: { low: 20.5, high: 23.5 }, bubbles: true }),
    );
    await flush(el);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
      zone: 'gym',
      low: 20.5,
      high: 23.5,
    });
  });

  it('hides the override section when override is inactive', async () => {
    const el = await nowTab(makeHass());
    expect(el.shadowRoot!.textContent).not.toContain('Cancel');
  });

  it('shows the override section + Cancel button when override is active', async () => {
    const el = await nowTab(
      makeHass({
        'binary_sensor.gym_override_active': 'on',
        'sensor.gym_override_ends': new Date(Date.now() + 60 * 60_000).toISOString(),
      }),
    );
    const cancelBtn = el.shadowRoot!.querySelector('.button.secondary');
    expect(cancelBtn).not.toBeNull();
    expect(cancelBtn!.textContent).toContain('Cancel');
  });

  it('Cancel button calls comfort_band.cancel_override', async () => {
    const hass = makeHass({
      'binary_sensor.gym_override_active': 'on',
      'sensor.gym_override_ends': new Date(Date.now() + 60 * 60_000).toISOString(),
    });
    const el = await nowTab(hass);
    const cancel = el.shadowRoot!.querySelector('.button.secondary') as HTMLButtonElement;
    cancel.click();
    await flush(el);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'cancel_override', {
      zone: 'gym',
    });
  });

  it('clicking a duration preset calls number.set_value on the hours entity', async () => {
    const hass = makeHass({ 'number.gym_override_hours': '3' });
    const el = await nowTab(hass);
    const presets = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.preset');
    presets[2].click(); // 6h
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('number', 'set_value', {
      entity_id: 'number.gym_override_hours',
      value: 6,
    });
  });

  it('marks the active duration preset', async () => {
    const el = await nowTab(makeHass({ 'number.gym_override_hours': '3' }));
    const presets = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.preset');
    expect(presets[0].classList.contains('active')).toBe(false);
    expect(presets[1].classList.contains('active')).toBe(true);
    expect(presets[2].classList.contains('active')).toBe(false);
  });

  // ----- "Feels like" line (v0.4 apparent-temperature) -----

  it('hides "Feels like" when apparent equals room temp', async () => {
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'sensor.gym_apparent_temperature': '21.0',
      }),
    );
    expect(el.shadowRoot!.querySelector('.feels-like')).toBeNull();
  });

  it('shows "Feels like" when apparent differs by >= 0.1 °C', async () => {
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'sensor.gym_apparent_temperature': '23.5',
      }),
    );
    const line = el.shadowRoot!.querySelector('.feels-like');
    expect(line).not.toBeNull();
    expect(line!.textContent).toContain('Feels like 23.5°');
  });

  it('omits the "Driving decisions" badge when the toggle is off', async () => {
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'sensor.gym_apparent_temperature': '23.5',
        'switch.gym_use_apparent_temperature': 'off',
      }),
    );
    expect(el.shadowRoot!.querySelector('.feels-like .driving')).toBeNull();
  });

  it('shows the "Driving decisions" badge when use_apparent_temperature is on', async () => {
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'sensor.gym_apparent_temperature': '23.5',
        'switch.gym_use_apparent_temperature': 'on',
      }),
    );
    const badge = el.shadowRoot!.querySelector('.feels-like .driving');
    expect(badge).not.toBeNull();
    expect(badge!.textContent).toContain('Driving decisions');
  });

  it('keeps the badge visible when apparent rounds to the same value as room', async () => {
    // Mid-humidity case: 1-decimal rounding collapses the delta below the
    // 0.1 °C `showFeelsLike` threshold, but apparent mode is still in
    // charge of decisions — the badge must stay so the user sees that.
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'sensor.gym_apparent_temperature': '21.0',
        'switch.gym_use_apparent_temperature': 'on',
      }),
    );
    const row = el.shadowRoot!.querySelector('.feels-like');
    expect(row).not.toBeNull();
    const badge = row!.querySelector('.driving');
    expect(badge).not.toBeNull();
    expect(badge!.textContent).toContain('Driving decisions');
    // No "Feels like X°" text — would just duplicate the room number.
    // Scope to the row so we don't pick up "Feels like" inside CSS comments
    // in the component's <style> block, which shadowRoot.textContent
    // includes verbatim.
    expect(row!.textContent).not.toContain('Feels like');
  });

  it('warns when apparent mode is on but no humidity reading is available', async () => {
    // No `sensor.gym_apparent_temperature` state at all — happens when
    // the humidity sensor is unconfigured or offline. The toggle is on
    // but decisions silently fall back to raw room temp; we warn so the
    // user can investigate.
    const el = await nowTab(
      makeHass({
        'sensor.gym_room_temperature': '21.0',
        'switch.gym_use_apparent_temperature': 'on',
      }),
    );
    const warn = el.shadowRoot!.querySelector('.feels-like .muted-warn');
    expect(warn).not.toBeNull();
    expect(warn!.textContent).toContain('no humidity reading');
    // Don't render a badge in this state — it'd contradict the warning.
    expect(el.shadowRoot!.querySelector('.feels-like .driving')).toBeNull();
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
});
