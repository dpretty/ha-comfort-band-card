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

type SliderProbe = HTMLElement & { low: number; high: number };
function slider(el: ComfortBandNowTab): SliderProbe {
  return el.shadowRoot!.querySelector('dual-handle-slider') as SliderProbe;
}

async function release(el: ComfortBandNowTab, low: number, high: number): Promise<void> {
  slider(el).dispatchEvent(new CustomEvent('change', { detail: { low, high }, bubbles: true }));
  await flush(el);
}

/** Lets the awaited service call resolve and Lit re-render. */
async function flush(el: ComfortBandNowTab): Promise<void> {
  for (let i = 0; i < 3; i++) await Promise.resolve();
  await el.updateComplete;
}

function notice(el: ComfortBandNowTab): { text: string; undo: HTMLButtonElement | null } | null {
  const n = el.shadowRoot!.querySelector('.notice');
  if (!n) return null;
  return {
    text: n.querySelector('span')!.textContent!.trim(),
    undo: n.querySelector('button.undo') as HTMLButtonElement | null,
  };
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

  it("snaps a mid-ramp band to the slider's half-degree steps", async () => {
    const el = await nowTab(
      makeHass({ 'sensor.gym_effective_low': '18.37', 'sensor.gym_effective_high': '22.83' }),
    );
    const s = slider(el);
    expect([s.low, s.high]).toEqual([18.5, 23]);
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
    await el.updateComplete;
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
    await el.updateComplete;
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

  describe('undo', () => {
    afterEach(() => vi.useRealTimers());

    it('confirms an adjustment with an Undo that cancels it when none was active', async () => {
      const hass = makeHass();
      const el = await nowTab(hass);
      await release(el, 20.5, 23.5);

      const n = notice(el)!;
      // Same range format as the schedule list.
      expect(n.text).toMatch(/^Adjusted to 20\.5° – 23\.5° until /);
      expect(n.undo).not.toBeNull();

      n.undo!.click();
      await flush(el);
      expect(hass.callService).toHaveBeenLastCalledWith('comfort_band', 'cancel_override', {
        zone: 'gym',
      });
      expect(notice(el)!.text).toBe('Undone');
    });

    it('restores the previous override, band and time left, when one was active', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date('2026-10-21T10:00:00Z'));
      const hass = makeHass({
        'binary_sensor.gym_override_active': 'on',
        'sensor.gym_override_ends': '2026-10-21T11:20:00Z', // 1 h 20 min left
        'number.gym_manual_low': '20',
        'number.gym_manual_high': '22',
      });
      const el = await nowTab(hass);
      await release(el, 21, 24);

      notice(el)!.undo!.click();
      await flush(el);
      // 1 h 20 min, rounded up to the service's quarter-hour steps.
      expect(hass.callService).toHaveBeenLastCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 20,
        high: 22,
        hours: 1.5,
      });
    });

    it('cancels instead when the previous override has run out by the time of undo', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date('2026-10-21T10:00:00Z'));
      const hass = makeHass({
        'binary_sensor.gym_override_active': 'on',
        'sensor.gym_override_ends': '2026-10-21T10:00:05Z',
      });
      const el = await nowTab(hass);
      await release(el, 21, 24);
      vi.setSystemTime(new Date('2026-10-21T10:00:09Z'));

      notice(el)!.undo!.click();
      await flush(el);
      expect(hass.callService).toHaveBeenLastCalledWith('comfort_band', 'cancel_override', {
        zone: 'gym',
      });
    });

    it('makes Cancel undoable too, restoring the override it ended', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date('2026-10-21T10:00:00Z'));
      const hass = makeHass({
        'binary_sensor.gym_override_active': 'on',
        'sensor.gym_override_ends': '2026-10-21T12:00:00Z',
        'number.gym_manual_low': '20',
        'number.gym_manual_high': '22',
      });
      const el = await nowTab(hass);
      (el.shadowRoot!.querySelector('.button.secondary') as HTMLButtonElement).click();
      await flush(el);

      const n = notice(el)!;
      expect(n.text).toBe('Back to the schedule');
      n.undo!.click();
      await flush(el);
      expect(hass.callService).toHaveBeenLastCalledWith('comfort_band', 'start_override', {
        zone: 'gym',
        low: 20,
        high: 22,
        hours: 2,
      });
    });

    it('offers no undo when the previous override cannot be read back', async () => {
      const hass = makeHass({
        'binary_sensor.gym_override_active': 'on',
        'sensor.gym_override_ends': 'unknown',
      });
      const el = await nowTab(hass);
      await release(el, 21, 24);
      expect(notice(el)!.undo).toBeNull();
    });

    // The region exists before anything is said in it, so screen readers
    // announce the notice when it appears.
    it('announces notices through a polite live region that is always present', async () => {
      const el = await nowTab(makeHass());
      const region = el.shadowRoot!.querySelector('.notice-region')!;
      expect(region.getAttribute('role')).toBe('status');
      expect(region.getAttribute('aria-live')).toBe('polite');
      expect(region.querySelector('.notice')).toBeNull();
      await release(el, 20.5, 23.5);
      expect(el.shadowRoot!.querySelector('.notice-region .notice')).not.toBeNull();
    });

    it('takes the notice down after the undo window', async () => {
      vi.useFakeTimers();
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);
      expect(notice(el)).not.toBeNull();
      vi.advanceTimersByTime(10_000);
      await el.updateComplete;
      expect(notice(el)).toBeNull();
    });

    it('clears a pending notice when the tab is detached', async () => {
      vi.useFakeTimers();
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);
      el.remove();
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe('failures', () => {
    it('says so when an adjustment is rejected, and offers no undo', async () => {
      const hass = makeHass();
      (hass.callService as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('nope'));
      const el = await nowTab(hass);
      await release(el, 20.5, 23.5);
      const n = notice(el)!;
      expect(n.text).toBe("Couldn't adjust this room. Try again.");
      expect(n.undo).toBeNull();
      // And the slider goes back to what is really in force.
      expect([slider(el).low, slider(el).high]).toEqual([19.5, 22.5]);
    });
  });

  describe('after a change', () => {
    afterEach(() => vi.useRealTimers());

    it('keeps showing the chosen band until the integration reports it', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);

      // An unrelated state update arrives before ours: no snapping back.
      el.hass = makeHass({ 'sensor.gym_room_temperature': '21.1' });
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([20.5, 23.5]);

      // Ours arrives: the slider now follows the integration again.
      el.hass = makeHass({
        'sensor.gym_effective_low': '20.5',
        'sensor.gym_effective_high': '23.5',
      });
      await el.updateComplete;
      el.hass = makeHass({ 'sensor.gym_effective_low': '18', 'sensor.gym_effective_high': '23' });
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([18, 23]);
    });

    it('stops waiting if the new band never arrives', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);
      vi.advanceTimersByTime(5_000);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([19.5, 22.5]);
    });
  });
});
