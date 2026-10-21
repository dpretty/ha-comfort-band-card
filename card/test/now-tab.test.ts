import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/now-tab.js';
import type { ComfortBandNowTab } from '../src/tabs/now-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

afterEach(teardown);

/** Holds a test hasn't opened, opened after it so a failing test can't leave
 *  the zone's call queue, which outlives a test, stuck for the next. */
const unopened = new Set<() => void>();
afterEach(async () => {
  for (const open of [...unopened]) open();
  // Enough turns for a long queue of held calls to drain.
  for (let i = 0; i < 1_000; i++) await Promise.resolve();
});

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

/** Lets the queued, awaited service call resolve and Lit re-render. */
async function flush(el: ComfortBandNowTab): Promise<void> {
  for (let i = 0; i < 50; i++) await Promise.resolve();
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

interface ZoneModel {
  manualLow: number;
  manualHigh: number;
  /** When the override ends, in ms; null when none is running. */
  overrideUntil: number | null;
  overrideHours: number;
  /** The schedule's band right now; null for a zone with no schedule. */
  schedule: [number, number] | null;
}

/**
 * A stand-in for the integration, after coordinator.py. `start_override`
 * stores any band it is given in the manual values and ends the override
 * `hours` from now (the zone's override length when none is passed);
 * `cancel_override` clears only the end time. Each call then refreshes: an
 * override that has ended is cleared, and the band in force is the manual
 * band during an override, otherwise the schedule's, or the manual band
 * when there is no schedule. The new state reaches the tab before the call
 * resolves, as HA's state events do, so a test sees what the card would.
 */
function integration(initial: Partial<ZoneModel> = {}) {
  const zone: ZoneModel = {
    manualLow: 19,
    manualHigh: 22,
    overrideUntil: null,
    overrideHours: 3,
    schedule: [18, 23],
    ...initial,
  };
  let tab: ComfortBandNowTab | null = null;
  type Holds = (service: string, data: Record<string, unknown>) => boolean;
  const gates: Array<{ holds: Holds; until: Promise<void> }> = [];
  let failNext = false;

  const refresh = () => {
    if (zone.overrideUntil !== null && !(Date.now() < zone.overrideUntil)) {
      zone.overrideUntil = null;
    }
  };
  const inForce = (): [number, number] => {
    refresh();
    return zone.overrideUntil !== null || !zone.schedule
      ? [zone.manualLow, zone.manualHigh]
      : zone.schedule;
  };

  const callService = vi.fn(
    async (domain: string, service: string, data: Record<string, unknown> = {}) => {
      for (const gate of [...gates]) if (gate.holds(service, data)) await gate.until;
      if (failNext) {
        failNext = false;
        throw new Error('rejected');
      }
      if (domain !== 'comfort_band') return;
      // As services.py's schemas would: an unknown zone, or a value that isn't
      // a number (NaN goes over the wire as null), is rejected.
      if (data.zone !== 'gym') throw new Error(`unknown zone ${String(data.zone)}`);
      for (const key of ['low', 'high', 'hours']) {
        if (data[key] !== undefined && !Number.isFinite(data[key])) {
          throw new Error(`${key} is not a number`);
        }
      }
      if (service === 'start_override') {
        if (data.low !== undefined) zone.manualLow = data.low as number;
        if (data.high !== undefined) zone.manualHigh = data.high as number;
        const hours = (data.hours as number | undefined) ?? zone.overrideHours;
        zone.overrideUntil = Date.now() + hours * 3_600_000;
      } else if (service === 'cancel_override') {
        zone.overrideUntil = null;
      }
      if (tab) tab.hass = hass();
    },
  );

  const hass = (): HomeAssistant => {
    const [low, high] = inForce();
    const active = zone.overrideUntil !== null;
    const h = makeHass({
      'sensor.gym_effective_low': String(low),
      'sensor.gym_effective_high': String(high),
      'binary_sensor.gym_override_active': active ? 'on' : 'off',
      'sensor.gym_override_ends': active ? new Date(zone.overrideUntil!).toISOString() : 'unknown',
      'number.gym_manual_low': String(zone.manualLow),
      'number.gym_manual_high': String(zone.manualHigh),
      'number.gym_override_hours': String(zone.overrideHours),
    });
    h.callService = callService as unknown as HomeAssistant['callService'];
    return h;
  };

  return {
    zone,
    callService,
    inForce,
    async mount(): Promise<ComfortBandNowTab> {
      tab = await nowTab(hass());
      return tab;
    },
    /** Holds every call, or those `holds` picks, until the returned function is called. */
    hold(holds: Holds = () => true): () => void {
      let release!: () => void;
      const gate = { holds, until: new Promise<void>((resolve) => (release = resolve)) };
      gates.push(gate);
      const open = () => {
        const at = gates.indexOf(gate);
        if (at >= 0) gates.splice(at, 1);
        unopened.delete(open);
        release();
      };
      unopened.add(open);
      return open;
    },
    rejectNext(): void {
      failNext = true;
    },
  };
}

async function undo(el: ComfortBandNowTab): Promise<void> {
  notice(el)!.undo!.click();
  await flush(el);
}

async function cancel(el: ComfortBandNowTab): Promise<void> {
  (el.shadowRoot!.querySelector('.button.secondary') as HTMLButtonElement).click();
  await flush(el);
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

  // Rounded to what the labels show, not to the slider's steps: snapping would
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

  // Clamped to the track, a band of 15–28 showed as 16–26, and nudging the low
  // handle sent 16.5–26: the high limit rewritten without being touched.
  it('takes in a band outside its track, and sends the other limit back unchanged', async () => {
    const hass = makeHass({ 'sensor.gym_effective_low': '15', 'sensor.gym_effective_high': '28' });
    const el = await nowTab(hass);
    const s = slider(el) as SliderProbe & { min: number; max: number };
    expect([s.min, s.max, s.low, s.high]).toEqual([15, 28, 15, 28]);

    const lowThumb = s.shadowRoot!.querySelector('.thumb') as HTMLElement;
    lowThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await flush(el);
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
      zone: 'gym',
      low: 15.5,
      high: 28,
    });
  });

  it('widens the track to whole degrees around a fractional band outside it', async () => {
    // Rounding would give 16 and 27, leaving the band off the track.
    const el = await nowTab(
      makeHass({ 'sensor.gym_effective_low': '15.6', 'sensor.gym_effective_high': '27.3' }),
    );
    expect([slider(el).min, slider(el).max]).toEqual([15, 28]);
  });

  it('keeps the track while the chosen values are on it, though the band in force moves', async () => {
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

  describe('undo', () => {
    afterEach(() => vi.useRealTimers());

    const state = (zone: ZoneModel, inForce: [number, number]) => ({
      inForce,
      manual: [zone.manualLow, zone.manualHigh],
      override: zone.overrideUntil !== null,
    });

    // start_override writes the manual band, and with no schedule the manual
    // band is the band in force. Cancelling the override isn't enough: the
    // adjusted band would stay, with no end.
    it('puts the band back in a zone with no schedule', async () => {
      const fake = integration({ schedule: null, manualLow: 19.5, manualHigh: 22.5 });
      const el = await fake.mount();
      await release(el, 21, 24);
      expect(fake.inForce()).toEqual([21, 24]);

      await undo(el);
      expect(state(fake.zone, fake.inForce())).toEqual({
        inForce: [19.5, 22.5],
        manual: [19.5, 22.5],
        override: false,
      });
      expect(notice(el)!.text).toBe('Undone');
    });

    it('goes back to the schedule, and puts the manual band back too', async () => {
      const fake = integration({ schedule: [18, 23], manualLow: 19.5, manualHigh: 22.5 });
      const el = await fake.mount();
      await release(el, 20, 24);
      await undo(el);
      expect(state(fake.zone, fake.inForce())).toEqual({
        inForce: [18, 23],
        manual: [19.5, 22.5],
        override: false,
      });
      // In one call, so nothing else is in force in between.
      expect(fake.callService).toHaveBeenCalledTimes(2);
    });

    it('restores a running override with its band and its end time', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date('2026-10-21T10:00:00Z'));
      const ends = Date.parse('2026-10-21T11:20:00Z');
      const fake = integration({ manualLow: 20.5, manualHigh: 23.5, overrideUntil: ends });
      const el = await fake.mount();
      await release(el, 21, 24);
      vi.setSystemTime(new Date('2026-10-21T10:00:03Z'));

      await undo(el);
      expect(fake.inForce()).toEqual([20.5, 23.5]);
      // Not rounded up to a quarter-hour: the service takes any length.
      expect(Math.abs(fake.zone.overrideUntil! - ends)).toBeLessThan(1);
    });

    it('lets the previous override go if it has run out by the time of undo', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date('2026-10-21T10:00:00Z'));
      const fake = integration({
        manualLow: 20.5,
        manualHigh: 23,
        overrideUntil: Date.parse('2026-10-21T10:00:05Z'),
      });
      const el = await fake.mount();
      await release(el, 21, 24);
      vi.setSystemTime(new Date('2026-10-21T10:00:09Z'));

      await undo(el);
      expect(state(fake.zone, fake.inForce())).toEqual({
        inForce: [18, 23],
        manual: [20.5, 23],
        override: false,
      });
    });

    // Each keyboard step is its own change. Undoing only the last would leave
    // a band the user was passing through.
    it('takes a run of changes back together, to before the first', async () => {
      const fake = integration();
      const el = await fake.mount();
      for (const high of [23.5, 24, 24.5, 25]) await release(el, 18, high);
      expect(fake.inForce()).toEqual([18, 25]);

      await undo(el);
      expect(state(fake.zone, fake.inForce())).toEqual({
        inForce: [18, 23],
        manual: [19, 22],
        override: false,
      });
      expect(fake.callService).toHaveBeenCalledTimes(5);
    });

    it('starts a new run once the notice has gone', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      const firstEnds = fake.zone.overrideUntil!;
      vi.advanceTimersByTime(10_000);
      await el.updateComplete;
      expect(notice(el)).toBeNull();

      await release(el, 18, 25);
      await undo(el);
      // Back to the first change, which is no longer part of a run.
      expect(fake.inForce()).toEqual([18, 24]);
      expect(Math.abs(fake.zone.overrideUntil! - firstEnds)).toBeLessThan(1);
    });

    it('keeps a run going while a change in it is still going through', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      vi.advanceTimersByTime(9_000);
      const open = fake.hold();
      await release(el, 18, 24.5);
      // The first change's notice goes while the second is still going through.
      vi.advanceTimersByTime(1_000);
      await release(el, 18, 25);
      open();
      await flush(el);
      await undo(el);
      expect(state(fake.zone, fake.inForce())).toEqual({
        inForce: [18, 23],
        manual: [19, 22],
        override: false,
      });
    });

    it('keeps a run going while a Cancel in it is still going through', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      vi.advanceTimersByTime(9_000);
      const open = fake.hold();
      await cancel(el);
      // The notice goes while the Cancel is still going through; Cancel holds
      // no slider values, so only the call keeps the run, for a change made
      // before it finishes.
      vi.advanceTimersByTime(1_000);
      await release(el, 18, 25);
      open();
      await flush(el);
      await undo(el);
      expect(state(fake.zone, fake.inForce())).toEqual({
        inForce: [18, 23],
        manual: [19, 22],
        override: false,
      });
    });

    it('starts a new run for a drag still under way when the notice goes', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      vi.advanceTimersByTime(9_000);
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 18, high: 24.5 }, bubbles: true }),
      );
      vi.advanceTimersByTime(1_000);
      await el.updateComplete;
      expect(notice(el)).toBeNull();
      await release(el, 18, 25);
      await undo(el);
      expect(fake.inForce()).toEqual([18, 24]);
    });

    it('starts a new run once a rejected change has had its notice', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      fake.rejectNext();
      await release(el, 18, 24.5);
      vi.advanceTimersByTime(10_000);
      await el.updateComplete;
      expect(notice(el)).toBeNull();

      await release(el, 18, 25);
      await undo(el);
      expect(fake.inForce()).toEqual([18, 24]);
    });

    it('starts a new run after the tab is detached and put back', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      el.remove();
      document.body.appendChild(el);
      await el.updateComplete;
      await release(el, 18, 25);
      await undo(el);
      expect(fake.inForce()).toEqual([18, 24]);
    });

    it('says nothing about a change that finishes after Undo was tapped', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      const openChange = fake.hold();
      await release(el, 20, 24.5);
      // Undo is tapped while that change is still going through.
      const openUndo = fake.hold((_service, data) => data.hours === 0);
      notice(el)!.undo!.click();
      await flush(el);
      openChange();
      await flush(el);
      expect(notice(el)).toBeNull();
      openUndo();
      await flush(el);
      expect(notice(el)!.text).toBe('Undone');
      expect(fake.inForce()).toEqual([18, 23]);
    });

    it('makes Cancel undoable, restoring the override it ended', async () => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date('2026-10-21T10:00:00Z'));
      const ends = Date.parse('2026-10-21T12:00:00Z');
      const fake = integration({ manualLow: 20.5, manualHigh: 23, overrideUntil: ends });
      const el = await fake.mount();
      await cancel(el);
      expect(fake.inForce()).toEqual([18, 23]);
      // Not "back to the schedule": with no schedule, the band would stay.
      expect(notice(el)!.text).toBe('Override cancelled');

      await undo(el);
      expect(fake.inForce()).toEqual([20.5, 23]);
      expect(Math.abs(fake.zone.overrideUntil! - ends)).toBeLessThan(1);
    });

    it('takes back an adjustment and a Cancel made in the same run', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      await cancel(el);
      await undo(el);
      expect(state(fake.zone, fake.inForce())).toEqual({
        inForce: [18, 23],
        manual: [19, 22],
        override: false,
      });
    });

    for (const overrideState of ['unavailable', 'unknown', undefined]) {
      it(`offers no undo when the override's state is ${overrideState ?? 'missing'}`, async () => {
        // With a readable end, so only the override's state is in question.
        const hass = makeHass({
          'sensor.gym_override_ends': new Date(Date.now() + 3_600_000).toISOString(),
        });
        if (overrideState) hass.states['binary_sensor.gym_override_active']!.state = overrideState;
        else delete hass.states['binary_sensor.gym_override_active'];
        const el = await nowTab(hass);
        await release(el, 21, 24);
        expect(notice(el)!.text).toMatch(/^Adjusted to/);
        expect(notice(el)!.undo).toBeNull();
      });
    }

    it("offers no undo when a running override's end cannot be read", async () => {
      const hass = makeHass({
        'binary_sensor.gym_override_active': 'on',
        'sensor.gym_override_ends': 'unknown',
      });
      const el = await nowTab(hass);
      await release(el, 21, 24);
      expect(notice(el)!.undo).toBeNull();
    });

    for (const side of ['low', 'high']) {
      it(`offers no undo when the manual ${side} limit cannot be read`, async () => {
        const el = await nowTab(makeHass({ [`number.gym_manual_${side}`]: 'unavailable' }));
        await release(el, 21, 24);
        expect(notice(el)!.text).toMatch(/^Adjusted to/);
        expect(notice(el)!.undo).toBeNull();
      });
    }

    // The modal makes a new Now tab whenever it opens or changes tab.
    it('queues calls for the zone across Now tabs, and offers no undo while one is going through', async () => {
      const fake = integration();
      const first = await fake.mount();
      const open = fake.hold();
      await release(first, 20, 24);
      first.remove();
      const second = await fake.mount();
      await release(second, 20, 25);
      expect(fake.callService).toHaveBeenCalledTimes(1);
      open();
      await flush(second);
      expect(fake.callService.mock.calls.map((c) => c[2])).toEqual([
        { zone: 'gym', low: 20, high: 24 },
        { zone: 'gym', low: 20, high: 25 },
      ]);
      expect(notice(second)).toEqual({ text: 'Adjusted to 20.0° – 25.0°', undo: null });
    });

    it("queues one zone's calls apart from another's", async () => {
      const fake = integration();
      const gym = await fake.mount();
      const open = fake.hold();
      await release(gym, 20, 24);
      const office = makeHass({
        'sensor.office_effective_low': '18',
        'sensor.office_effective_high': '23',
        'binary_sensor.office_override_active': 'off',
        'number.office_manual_low': '19',
        'number.office_manual_high': '22',
      });
      const other = await nowTab(office, makeEntities('office'), 'office');
      await release(other, 18, 24);
      expect(office.callService).toHaveBeenCalledWith('comfort_band', 'start_override', {
        zone: 'office',
        low: 18,
        high: 24,
      });
      expect(notice(other)!.undo).not.toBeNull();
      open();
      await flush(gym);
    });

    it('keeps a run whose last change a drag supersedes after its notice has gone', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      vi.advanceTimersByTime(9_000);
      const open = fake.hold();
      await release(el, 18, 24.5);
      vi.advanceTimersByTime(1_000);
      // A drag starts before that change goes through, so its notice never shows.
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 18, high: 25 }, bubbles: true }),
      );
      open();
      await flush(el);
      expect(notice(el)).toBeNull();

      await release(el, 18, 25);
      await undo(el);
      // The change the drag superseded never had a notice of its own, so the
      // drag's release joins its run: Undo doesn't leave a band that was
      // never confirmed, and goes as far back whether that change lands
      // before the release or after.
      expect(fake.inForce()).toEqual([18, 23]);
    });

    // An "Undone" notice has no run. Going, it mustn't end the run of a change
    // made while it was up.
    it('keeps a run made while "Undone" is up when "Undone" goes', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      await undo(el);
      expect(notice(el)!.text).toBe('Undone');
      const open = fake.hold();
      await release(el, 20, 25);
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 20, high: 25.5 }, bubbles: true }),
      );
      open();
      await flush(el);
      vi.advanceTimersByTime(4_000);
      await el.updateComplete;
      await release(el, 20, 25.5);
      await undo(el);
      expect(state(fake.zone, fake.inForce())).toEqual({
        inForce: [18, 23],
        manual: [19, 22],
        override: false,
      });
    });

    it('keeps a run while any of its calls is still going through', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      vi.advanceTimersByTime(9_000);
      const openB = fake.hold((_service, data) => data.high === 24.5);
      await release(el, 18, 24.5);
      vi.advanceTimersByTime(1_000);
      const openC = fake.hold((_service, data) => data.high === 25);
      await release(el, 18, 25);
      // B finishes, superseded by C, which is still going through.
      openB();
      await flush(el);
      await release(el, 18, 25.5);
      openC();
      await flush(el);
      await undo(el);
      expect(fake.inForce()).toEqual([18, 23]);
    });

    it('keeps a run whose notice is back up when a later change in it is superseded', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      vi.advanceTimersByTime(9_000);
      let open = fake.hold();
      await release(el, 18, 24.5);
      vi.advanceTimersByTime(1_000);
      open();
      await flush(el);
      // The notice is back up. A change, then a drag over it.
      open = fake.hold();
      await release(el, 18, 25);
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 18, high: 25.5 }, bubbles: true }),
      );
      open();
      await flush(el);
      await release(el, 18, 25.5);
      await undo(el);
      expect(fake.inForce()).toEqual([18, 23]);
    });

    it('ends a run that outlived its first notice once the last one has gone', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 18, 24);
      vi.advanceTimersByTime(9_000);
      const open = fake.hold();
      await release(el, 18, 24.5);
      // The first notice goes while the second change is still going through;
      // that change then puts the notice back up, and it goes in turn.
      vi.advanceTimersByTime(1_000);
      open();
      await flush(el);
      vi.advanceTimersByTime(10_000);
      await el.updateComplete;
      expect(notice(el)).toBeNull();
      await release(el, 18, 25);
      await undo(el);
      expect(fake.inForce()).toEqual([18, 24.5]);
    });

    // hass may not show the undo's result yet, so the state to go back to
    // isn't known.
    it('offers no undo for a change made while an undo is going through', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      const open = fake.hold();
      notice(el)!.undo!.click();
      await flush(el);
      await release(el, 20.5, 24);
      open();
      await flush(el);
      expect(notice(el)!.text).toMatch(/^Adjusted to 20\.5°/);
      expect(notice(el)!.undo).toBeNull();
    });

    it('offers no further undo once undone, and sends one undo however often it is tapped', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      const button = notice(el)!.undo!;
      button.click();
      button.click();
      await flush(el);
      expect(fake.callService).toHaveBeenCalledTimes(2);
      expect(notice(el)).toEqual({ text: 'Undone', undo: null });
    });

    // In a zone with no schedule the band stays when the override ends, so an
    // end time would be false there, and the card can't tell the zones apart.
    it('says what the band was set to, without promising when it ends', async () => {
      const el = await nowTab(makeHass({ 'number.gym_override_hours': '3' }));
      await release(el, 20.5, 23.5);
      expect(notice(el)!.text).toBe('Adjusted to 20.5° – 23.5°');
    });

    it('keeps the full undo window for a change made while an earlier notice is up', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);
      vi.advanceTimersByTime(5_000);
      await release(el, 21, 23.5);
      // The first notice's timer would have ended at 10 s.
      vi.advanceTimersByTime(9_999);
      await el.updateComplete;
      expect(notice(el)!.undo).not.toBeNull();
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

    it('keeps an Undo up for ten seconds, and other notices for four', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20.5, 23.5);
      vi.advanceTimersByTime(9_999);
      await el.updateComplete;
      expect(notice(el)!.undo).not.toBeNull();
      vi.advanceTimersByTime(1);
      await el.updateComplete;
      expect(notice(el)).toBeNull();

      await release(el, 21, 23.5);
      await undo(el);
      vi.advanceTimersByTime(3_999);
      await el.updateComplete;
      expect(notice(el)!.text).toBe('Undone');
      vi.advanceTimersByTime(1);
      await el.updateComplete;
      expect(notice(el)).toBeNull();
    });

    it('clears a notice and its timers when the tab is detached', async () => {
      vi.useFakeTimers();
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);
      expect(notice(el)).not.toBeNull();
      expect(vi.getTimerCount()).toBeGreaterThan(0);
      el.remove();
      expect(vi.getTimerCount()).toBe(0);
    });

    it('leaves a detached tab alone when a call finishes after', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const fake = integration();
      const el = await fake.mount();
      const open = fake.hold();
      await release(el, 20.5, 23.5);
      el.remove();
      open();
      await flush(el);
      expect(fake.callService).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
      expect(notice(el)).toBeNull();
    });
  });

  describe('failures', () => {
    afterEach(() => vi.useRealTimers());

    const isError = (el: ComfortBandNowTab) =>
      el.shadowRoot!.querySelector('.notice')!.classList.contains('error');

    it('says so when an adjustment is rejected, and offers no undo', async () => {
      const hass = makeHass();
      (hass.callService as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('nope'));
      const el = await nowTab(hass);
      await release(el, 20.5, 23.5);
      const n = notice(el)!;
      expect(n.text).toBe("Couldn't adjust this room. Try again.");
      expect(isError(el)).toBe(true);
      expect(n.undo).toBeNull();
      // And the slider goes back to what is really in force.
      expect([slider(el).low, slider(el).high]).toEqual([19.5, 22.5]);
    });

    it('keeps the Undo for a change superseded by a drag when the next one is rejected', async () => {
      const fake = integration();
      const el = await fake.mount();
      const open = fake.hold();
      await release(el, 20, 24);
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 20, high: 24.5 }, bubbles: true }),
      );
      open();
      await flush(el);
      fake.rejectNext();
      await release(el, 20, 24.5);
      expect(notice(el)!.text).toBe("Couldn't adjust this room. Try again.");
      await undo(el);
      expect(fake.inForce()).toEqual([18, 23]);
    });

    it('says nothing about a rejected change a drag has superseded, and leaves the drag alone', async () => {
      const fake = integration();
      const el = await fake.mount();
      const open = fake.hold();
      fake.rejectNext();
      await release(el, 20, 24);
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 20.5, high: 24 }, bubbles: true }),
      );
      open();
      await flush(el);
      expect(notice(el)).toBeNull();
      expect([slider(el).low, slider(el).high]).toEqual([20.5, 24]);
    });

    it('keeps the Undo for earlier changes in the run when a later one is rejected', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      fake.rejectNext();
      await release(el, 20, 25);
      expect(notice(el)!.text).toBe("Couldn't adjust this room. Try again.");
      await undo(el);
      expect(fake.inForce()).toEqual([18, 23]);
    });

    it('says so when Cancel is rejected', async () => {
      const fake = integration({ overrideUntil: Date.now() + 3_600_000 });
      const el = await fake.mount();
      fake.rejectNext();
      await cancel(el);
      expect(notice(el)).toEqual({ text: "Couldn't cancel the override. Try again.", undo: null });
      expect(isError(el)).toBe(true);
    });

    it('shows a change that went through as a plain notice, not an error', async () => {
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);
      expect(isError(el)).toBe(false);
    });

    // A newer change has the slider; an older one failing mustn't let go of it.
    it("leaves a newer change's values alone when an older one is rejected", async () => {
      const hass = makeHass();
      let reject!: (err: Error) => void;
      (hass.callService as ReturnType<typeof vi.fn>).mockImplementationOnce(
        () => new Promise((_resolve, rej) => (reject = rej)),
      );
      unopened.add(() => reject(new Error('cleanup')));
      const el = await nowTab(hass);
      await release(el, 20, 24);
      await release(el, 20, 25);
      reject(new Error('rejected'));
      await flush(el);
      expect(notice(el)!.text).toBe('Adjusted to 20.0° – 25.0°');
      expect([slider(el).low, slider(el).high]).toEqual([20, 25]);
    });

    it('says so when an undo is rejected, and keeps the Undo to try again', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      fake.rejectNext();
      await undo(el);
      expect(notice(el)!.text).toBe("Couldn't undo that.");
      expect(isError(el)).toBe(true);
      expect(fake.inForce()).toEqual([20, 24]);
      await undo(el);
      expect(fake.inForce()).toEqual([18, 23]);
    });

    it('keeps a failed undo up for the undo window, with its button', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      fake.rejectNext();
      await undo(el);
      vi.advanceTimersByTime(9_999);
      await el.updateComplete;
      expect(notice(el)!.text).toBe("Couldn't undo that.");
      expect(notice(el)!.undo).not.toBeNull();
      vi.advanceTimersByTime(1);
      await el.updateComplete;
      expect(notice(el)).toBeNull();
    });

    it('keeps the run after a rejected undo, so a further change joins it', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      fake.rejectNext();
      await undo(el);
      await release(el, 20, 25);
      await undo(el);
      expect(fake.inForce()).toEqual([18, 23]);
    });

    it('says nothing about an undo a drag has superseded', async () => {
      for (const reject of [false, true]) {
        const fake = integration();
        const el = await fake.mount();
        await release(el, 20, 24);
        const open = fake.hold();
        if (reject) fake.rejectNext();
        notice(el)!.undo!.click();
        await flush(el);
        slider(el).dispatchEvent(
          new CustomEvent('input', { detail: { low: 20.5, high: 23 }, bubbles: true }),
        );
        open();
        await flush(el);
        expect(notice(el)).toBeNull();
        el.remove();
      }
    });

    it('leaves a detached tab alone when an undo finishes after', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      const open = fake.hold();
      notice(el)!.undo!.click();
      await flush(el);
      el.remove();
      open();
      await flush(el);
      expect(vi.getTimerCount()).toBe(0);
      expect(notice(el)).toBeNull();
      vi.useRealTimers();
    });
  });

  describe('order', () => {
    // HA runs service calls concurrently; two sent together could land in
    // either order and leave the earlier one in force.
    it('sends calls one at a time, in the order they were made', async () => {
      const fake = integration();
      const el = await fake.mount();
      const open = fake.hold();
      await release(el, 20, 24);
      await release(el, 20, 25);
      expect(fake.callService).toHaveBeenCalledTimes(1);
      open();
      await flush(el);
      expect(fake.callService.mock.calls.map((c) => c[2])).toEqual([
        { zone: 'gym', low: 20, high: 24 },
        { zone: 'gym', low: 20, high: 25 },
      ]);
      expect(fake.inForce()).toEqual([20, 25]);
      expect(notice(el)!.text).toMatch(/^Adjusted to 20\.0° – 25\.0°/);
    });

    // A hold on the change alone, so the fake's own gate doesn't put the calls
    // in order: only the queue can.
    it('sends an Undo only after a change still going through', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      const open = fake.hold((_service, data) => data.high === 24.5);
      await release(el, 20, 24.5);
      notice(el)!.undo!.click();
      await flush(el);
      expect(fake.callService).toHaveBeenCalledTimes(2);
      open();
      await flush(el);
      expect(fake.callService.mock.calls.map((c) => c[2])).toEqual([
        { zone: 'gym', low: 20, high: 24 },
        { zone: 'gym', low: 20, high: 24.5 },
        { zone: 'gym', low: 19, high: 22, hours: 0 },
      ]);
      expect(fake.inForce()).toEqual([18, 23]);
    });

    it('sends a Cancel only after a change still going through', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      const open = fake.hold((_service, data) => data.high === 24.5);
      await release(el, 20, 24.5);
      await cancel(el);
      expect(fake.callService).toHaveBeenCalledTimes(2);
      open();
      await flush(el);
      expect(fake.callService.mock.calls.map((c) => c[1])).toEqual([
        'start_override',
        'start_override',
        'cancel_override',
      ]);
      expect(fake.inForce()).toEqual([18, 23]);
    });

    it('waits for Cancel to go through before saying it has', async () => {
      const fake = integration({ overrideUntil: Date.now() + 3_600_000 });
      const el = await fake.mount();
      const open = fake.hold();
      await cancel(el);
      expect(notice(el)).toBeNull();
      open();
      await flush(el);
      expect(notice(el)!.text).toBe('Override cancelled');
    });
  });

  describe('after a change', () => {
    afterEach(() => vi.useRealTimers());

    it('keeps showing the chosen band until the integration reports it', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const el = await nowTab(makeHass());
      // Only the high handle moved: the low limit already matches.
      await release(el, 19.5, 23.5);

      // An unrelated state update arrives before ours: no snapping back.
      el.hass = makeHass({ 'sensor.gym_room_temperature': '21.1' });
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([19.5, 23.5]);
      // Nor for a band that is close to ours on either side, but not ours.
      for (const [low, high] of [
        ['19.8', '23.5'],
        ['19.5', '23'],
      ]) {
        el.hass = makeHass({ 'sensor.gym_effective_low': low, 'sensor.gym_effective_high': high });
        await el.updateComplete;
        expect([slider(el).low, slider(el).high]).toEqual([19.5, 23.5]);
      }

      // Ours arrives: the slider now follows the integration again.
      el.hass = makeHass({
        'sensor.gym_effective_low': '19.5',
        'sensor.gym_effective_high': '23.5',
      });
      await el.updateComplete;
      el.hass = makeHass({ 'sensor.gym_effective_low': '18', 'sensor.gym_effective_high': '23' });
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([18, 23]);
    });

    // Five seconds from when the change is sent, not while it waits behind a
    // slow one: until it is sent, the values are only the user's.
    it('keeps holding the chosen values while the change waits behind a slow one', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const fake = integration();
      const el = await fake.mount();
      const open = fake.hold();
      await release(el, 18, 24);
      vi.advanceTimersByTime(1_000);
      await release(el, 18, 25);
      vi.advanceTimersByTime(6_000);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([18, 25]);
      open();
      await flush(el);
    });

    // A change still going through is the user's; the limit runs from its result.
    it('keeps holding the chosen values while the change is going through, however long', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass();
      let resolve!: () => void;
      (hass.callService as ReturnType<typeof vi.fn>).mockImplementationOnce(
        () => new Promise<void>((res) => (resolve = res)),
      );
      unopened.add(() => resolve());
      const el = await nowTab(hass);
      await release(el, 20.5, 23.5);
      vi.advanceTimersByTime(6_000);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([20.5, 23.5]);
      resolve();
      await flush(el);
      vi.advanceTimersByTime(4_999);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([20.5, 23.5]);
      vi.advanceTimersByTime(1);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([19.5, 22.5]);
    });

    it("clears an earlier change's time limit when the next change is made", async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const hass = makeHass();
      let resolve!: () => void;
      const el = await nowTab(hass);
      await release(el, 20.5, 23.5);
      vi.advanceTimersByTime(2_000);
      // The next change is slow; the first one's limit would end at 5 s.
      (hass.callService as ReturnType<typeof vi.fn>).mockImplementationOnce(
        () => new Promise<void>((res) => (resolve = res)),
      );
      unopened.add(() => resolve());
      await release(el, 21, 23.5);
      vi.advanceTimersByTime(3_500);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([21, 23.5]);
      resolve();
      await flush(el);
    });

    it('sets no time limit for a change superseded before it was sent', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const fake = integration();
      const el = await fake.mount();
      const open = fake.hold();
      await release(el, 18, 24);
      await release(el, 18, 25);
      // A drag supersedes the second change while it waits to be sent.
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 18, high: 25.5 }, bubbles: true }),
      );
      open();
      await flush(el);
      vi.advanceTimersByTime(5_000);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([18, 25.5]);
    });

    it('stops waiting after five seconds if the new band never arrives', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);
      vi.advanceTimersByTime(4_999);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([20.5, 23.5]);
      vi.advanceTimersByTime(1);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([19.5, 22.5]);
    });

    it('stops waiting when a new drag starts, so nothing moves under the finger', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 21, high: 23.5 }, bubbles: true }),
      );
      vi.advanceTimersByTime(5_000);
      el.hass = makeHass();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([21, 23.5]);
    });

    it('does not start waiting for a change that finishes during a new drag', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const fake = integration();
      const el = await fake.mount();
      const open = fake.hold();
      await release(el, 20.5, 23.5);
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 21, high: 23.5 }, bubbles: true }),
      );
      open();
      await flush(el);
      // Neither a settle timer nor a notice: the drag superseded the change.
      expect(vi.getTimerCount()).toBe(0);
      vi.advanceTimersByTime(5_000);
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([21, 23.5]);
    });

    // HA usually sends the new state before the call's result.
    it('follows the band in force once the integration reports the change, even first', async () => {
      const fake = integration();
      const el = await fake.mount();
      await release(el, 20, 24);
      // Someone else then cancels the override, at the wall.
      fake.zone.overrideUntil = null;
      el.hass = makeHass({ 'sensor.gym_effective_low': '18', 'sensor.gym_effective_high': '23' });
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([18, 23]);
    });

    it('stops waiting when the change is rejected', async () => {
      const fake = integration();
      const el = await fake.mount();
      fake.rejectNext();
      await release(el, 20, 24);
      expect([slider(el).low, slider(el).high]).toEqual([18, 23]);
    });

    it('lets go of the chosen band as soon as Undo is tapped', async () => {
      const el = await nowTab(makeHass());
      await release(el, 20.5, 23.5);
      expect([slider(el).low, slider(el).high]).toEqual([20.5, 23.5]);
      notice(el)!.undo!.click();
      await el.updateComplete;
      expect([slider(el).low, slider(el).high]).toEqual([19.5, 22.5]);
    });

    // A band that happens to equal the values under the finger mustn't let go
    // of them, and the widened track with them.
    it('keeps a drag in hand when the band in force matches it', async () => {
      const el = await nowTab(
        makeHass({ 'sensor.gym_effective_low': '15', 'sensor.gym_effective_high': '28' }),
      );
      await release(el, 16, 27);
      slider(el).dispatchEvent(
        new CustomEvent('input', { detail: { low: 17, high: 25 }, bubbles: true }),
      );
      el.hass = makeHass({ 'sensor.gym_effective_low': '17', 'sensor.gym_effective_high': '25' });
      await el.updateComplete;
      expect([slider(el).min, slider(el).max]).toEqual([15, 28]);
    });

    it('shows the band in force as soon as Cancel is tapped', async () => {
      const hass = makeHass({
        'binary_sensor.gym_override_active': 'on',
        'sensor.gym_override_ends': new Date(Date.now() + 3_600_000).toISOString(),
      });
      const el = await nowTab(hass);
      await release(el, 20.5, 23.5);
      expect([slider(el).low, slider(el).high]).toEqual([20.5, 23.5]);
      await cancel(el);
      expect([slider(el).low, slider(el).high]).toEqual([19.5, 22.5]);
    });
  });
});
