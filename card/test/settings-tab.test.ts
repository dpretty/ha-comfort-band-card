import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/settings-tab.js';
import {
  type ComfortBandSettingsTab,
  type SettingsSection,
  SETTINGS,
  SETTLE_MS,
  STEP_SEND_DELAY_MS,
  optionLabel,
  stepDecimals,
} from '../src/tabs/settings-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

afterEach(() => {
  teardown();
  vi.useRealTimers();
});

function makeEntities(zone = 'gym', overrides: Partial<ZoneEntities> = {}): ZoneEntities {
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
    crossModeMinMinutes: `number.${zone}_cross_mode_min_minutes`,
    lookaheadMinutes: `number.${zone}_lookahead_minutes`,
    passiveTolerance: `number.${zone}_passive_tolerance`,
    mpcHorizonMinutes: `number.${zone}_mpc_horizon_minutes`,
    bandRampMinutes: `number.${zone}_band_ramp_minutes`,
    peakHeatOffset: `number.${zone}_peak_heat_offset`,
    peakCoolOffset: `number.${zone}_peak_cool_offset`,
    peakPreconditionMinutes: `number.${zone}_peak_precondition_minutes`,
    mpcEnabled: `switch.${zone}_mpc_enabled`,
    fanControlEnabled: `switch.${zone}_fan_control_enabled`,
    peakSavingEnabled: `switch.${zone}_peak_saving_enabled`,
    activeFanMode: `select.${zone}_active_fan_mode`,
    idleFanMode: `select.${zone}_idle_fan_mode`,
    scheduleAssignment: `select.${zone}_schedule_assignment`,
    deviceId: `dev-${zone}`,
    deviceName: zone,
    ...overrides,
  };
}

type StateSpec = { state: string; attributes?: Record<string, unknown> };

const number = (value: string, min: number, max: number, step: number, unit: string) => ({
  state: value,
  attributes: { min, max, step, unit_of_measurement: unit },
});
const FAN_MODES = ['(none)', 'auto', 'low', 'medium-low', 'medium', 'high'];

function makeHass(
  overrides: {
    states?: Record<string, StateSpec>;
    callServiceImpl?: ReturnType<typeof vi.fn>;
  } = {},
): HomeAssistant {
  const defaults: Record<string, StateSpec> = {
    'sensor.gym_room_temperature': { state: '21.0', attributes: { humidity_sensor: null } },
    'sensor.gym_apparent_temperature': { state: '21.0', attributes: {} },
    'switch.gym_enabled': { state: 'on' },
    'switch.gym_learning_enabled': { state: 'off' },
    'switch.gym_use_apparent_temperature': { state: 'off' },
    'switch.gym_mpc_enabled': { state: 'off' },
    'switch.gym_fan_control_enabled': { state: 'off' },
    'switch.gym_peak_saving_enabled': { state: 'off' },
    'number.gym_deadband_below': number('0.3', 0.1, 2, 0.1, '°C'),
    'number.gym_deadband_above': number('0.5', 0.1, 2, 0.1, '°C'),
    'number.gym_band_ramp_minutes': number('45.0', 0, 120, 5, 'min'),
    'number.gym_override_hours': number('3', 1, 12, 1, 'h'),
    'number.gym_lookahead_minutes': number('5', 2, 15, 1, 'min'),
    'number.gym_passive_tolerance': number('0.5', 0, 2, 0.1, '°C'),
    'number.gym_mpc_horizon_minutes': number('60.0', 10, 60, 1, 'min'),
    'number.gym_min_cycle_minutes': number('8', 0, 60, 1, 'min'),
    'number.gym_cross_mode_min_minutes': number('8', 0, 60, 1, 'min'),
    'number.gym_peak_heat_offset': number('1.0', 0, 5, 0.5, '°C'),
    'number.gym_peak_cool_offset': number('1.0', 0, 5, 0.5, '°C'),
    'number.gym_peak_precondition_minutes': number('60', 0, 180, 15, 'min'),
    'select.gym_active_fan_mode': { state: 'medium', attributes: { options: FAN_MODES } },
    'select.gym_idle_fan_mode': { state: 'low', attributes: { options: FAN_MODES } },
    'select.gym_schedule_assignment': {
      state: 'Own schedule',
      attributes: { options: ['Own schedule', 'Bedrooms'] },
    },
  };
  const merged = { ...defaults, ...(overrides.states ?? {}) };
  return {
    states: Object.fromEntries(
      Object.entries(merged).map(([entityId, { state, attributes }]) => [
        entityId,
        {
          entity_id: entityId,
          state,
          attributes: attributes ?? {},
          last_changed: '',
          last_updated: '',
        },
      ]),
    ),
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: overrides.callServiceImpl ?? vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn().mockResolvedValue(undefined),
  };
}

async function settingsTab(
  hass: HomeAssistant,
  section: SettingsSection = 'comfort',
  entities = makeEntities(),
): Promise<ComfortBandSettingsTab> {
  return mount('comfort-band-settings-tab', { hass, entities, section });
}

/** Lets a sent call settle and Lit re-render. */
async function flush(el: ComfortBandSettingsTab): Promise<void> {
  for (let i = 0; i < 20; i++) await Promise.resolve();
  await el.updateComplete;
}

function rows(el: ComfortBandSettingsTab): Array<{ setting: string | null; title: string }> {
  return Array.from(el.shadowRoot!.querySelectorAll('.row')).map((r) => ({
    setting: r.getAttribute('data-setting'),
    title: r.querySelector('.title')!.textContent!.trim(),
  }));
}

function row(el: ComfortBandSettingsTab, setting: string): HTMLElement {
  return el.shadowRoot!.querySelector(`.row[data-setting="${setting}"]`) as HTMLElement;
}

function shown(el: ComfortBandSettingsTab, setting: string): string {
  return row(el, setting).querySelector('.value')!.textContent!.trim();
}

function stepButtons(el: ComfortBandSettingsTab, setting: string) {
  const [less, more] = Array.from(row(el, setting).querySelectorAll<HTMLButtonElement>('.step'));
  return { less, more };
}

function calls(hass: HomeAssistant): unknown[][] {
  return (hass.callService as ReturnType<typeof vi.fn>).mock.calls;
}

function css(): string {
  return (
    customElements.get('comfort-band-settings-tab') as unknown as {
      styles: Array<{ cssText: string }>;
    }
  ).styles
    .flat()
    .map((s) => s.cssText)
    .join('\n');
}

describe('comfort-band-settings-tab sections', () => {
  it('shows comfort: "feels like", the deadbands, the ramp, the default length, the humidity sensor', async () => {
    const el = await settingsTab(makeHass());
    expect(rows(el)).toEqual([
      { setting: 'useApparentTemperature', title: 'Use “feels like”' },
      { setting: 'deadbandBelow', title: 'Heating starts below the range by' },
      { setting: 'deadbandAbove', title: 'Cooling starts above the range by' },
      { setting: 'bandRampMinutes', title: 'Ease schedule changes over' },
      { setting: 'overrideHours', title: 'Adjustments made elsewhere last' },
      { setting: null, title: 'Humidity sensor' },
    ]);
  });

  it('shows automation: control, learning, predictive control, with timings under "Fine-tuning"', async () => {
    const el = await settingsTab(makeHass(), 'automation');
    expect(rows(el)).toEqual([
      { setting: 'enabled', title: 'Control this room' },
      { setting: 'learningEnabled', title: 'Learning' },
      { setting: 'mpcEnabled', title: 'Predictive control' },
      { setting: 'lookaheadMinutes', title: 'Look ahead by' },
      { setting: 'passiveTolerance', title: 'Let it drift back within' },
      { setting: 'mpcHorizonMinutes', title: 'Plan ahead by' },
      { setting: 'minCycleMinutes', title: 'Repeat a command no sooner than' },
      {
        setting: 'crossModeMinMinutes',
        title: 'Switch between heating and cooling no sooner than',
      },
    ]);
    const fine = el.shadowRoot!.querySelector('details.fine') as HTMLDetailsElement;
    expect(fine.open).toBe(false);
    expect(fine.querySelector('summary')!.textContent!.replace(/\s+/g, ' ').trim()).toBe(
      'Fine-tuning Timings and tolerances',
    );
    expect(
      Array.from(fine.querySelectorAll('.row')).map((r) => r.getAttribute('data-setting')),
    ).toEqual([
      'lookaheadMinutes',
      'passiveTolerance',
      'mpcHorizonMinutes',
      'minCycleMinutes',
      'crossModeMinMinutes',
    ]);
    expect(row(el, 'enabled').querySelector('.title')!.textContent!.trim()).toBe(
      'Control this room',
    );
  });

  it('shows fan, peak saving and schedules', async () => {
    const fan = await settingsTab(makeHass(), 'fan');
    expect(rows(fan)).toEqual([
      { setting: 'fanControlEnabled', title: 'Fan control' },
      { setting: 'activeFanMode', title: 'Fan while heating or cooling' },
      { setting: 'idleFanMode', title: 'Fan while idle' },
    ]);
    fan.remove();
    const peak = await settingsTab(makeHass(), 'peak');
    expect(rows(peak)).toEqual([
      { setting: 'peakSavingEnabled', title: 'Peak saving' },
      { setting: 'peakHeatOffset', title: 'Relax the bottom of the range by' },
      { setting: 'peakCoolOffset', title: 'Relax the top of the range by' },
      { setting: 'peakPreconditionMinutes', title: 'Prepare ahead by' },
    ]);
    peak.remove();
    const schedules = await settingsTab(makeHass(), 'schedules');
    expect(rows(schedules)).toEqual([{ setting: 'scheduleAssignment', title: 'Follows' }]);
  });

  // The integration names "Configure" as where a peak entity is chosen.
  it('says where peak saving gets its peak entity', async () => {
    const el = await settingsTab(makeHass(), 'peak');
    expect(row(el, 'peakSavingEnabled').querySelector('.desc')!.textContent).toContain(
      'Needs a peak entity chosen under Settings → Devices & Services → Comfort Band → Configure.',
    );
  });

  // Predictive control never reads the deadbands, and heats to the top.
  it('says the deadbands aren’t used while predictive control plans', async () => {
    const el = await settingsTab(makeHass());
    for (const [setting, edge] of [
      ['deadbandBelow', 'heats towards the top'],
      ['deadbandAbove', 'cools towards the bottom'],
    ]) {
      expect(row(el, setting).querySelector('.desc')!.textContent).toContain(
        `Not used while predictive control is planning: it decides when to start and stop, and ${edge} of the range.`,
      );
    }
  });

  // In a peak a cycle still starts past the relaxed edge by the deadband.
  it('doesn’t promise peak saving keeps heating and cooling out of a peak', async () => {
    const el = await settingsTab(makeHass(), 'peak');
    const desc = (setting: string) => row(el, setting).querySelector('.desc')!.textContent!;
    expect(desc('peakSavingEnabled')).not.toMatch(/keeps heating and cooling out/i);
    expect(desc('peakSavingEnabled')).toContain('An adjustment in force sets both aside.');
    expect(desc('peakHeatOffset')).toContain('heating still starts the usual amount below it');
    expect(desc('peakCoolOffset')).toContain('cooling still starts the usual amount above it');
  });

  it('gives "Fine-tuning" a 44px target', () => {
    expect(css()).toMatch(/details\.fine > summary\s*\{[^}]*min-height:\s*44px/);
  });

  it('describes learning as controlling anticipation, not as having no effect', async () => {
    const el = await settingsTab(makeHass(), 'automation');
    const desc = row(el, 'learningEnabled')
      .querySelector('.desc')!
      .textContent!.replace(/\s+/g, ' ');
    expect(desc).not.toMatch(/no effect|reserved for upcoming/i);
    expect(desc).toMatch(
      /starting early .* stopping early .* holding off while it’s already heading back/,
    );
    expect(desc).toMatch(/Predictive control needs this on too/);
    expect(desc).toMatch(/While it’s off, the room keeps recording readings/);
  });
});

describe('comfort-band-settings-tab missing settings', () => {
  it('leaves out a setting whose entity is missing, and says some are', async () => {
    const el = await settingsTab(
      makeHass(),
      'comfort',
      makeEntities('gym', { bandRampMinutes: null }),
    );
    expect(row(el, 'bandRampMinutes')).toBeNull();
    expect(el.shadowRoot!.querySelector('.note')!.textContent!.replace(/\s+/g, ' ').trim()).toBe(
      'Some settings aren’t shown: they need a newer comfort_band, or their entities are turned off.',
    );
  });

  it('has no note when every setting is there', async () => {
    const el = await settingsTab(makeHass(), 'automation');
    expect(el.shadowRoot!.querySelector('.note')).toBeNull();
    expect(el.shadowRoot!.querySelector('.upgrade-hint')).toBeNull();
  });

  const without = (section: SettingsSection) => {
    const { main, fine = [] } = SETTINGS[section];
    return makeEntities(
      'gym',
      Object.fromEntries([...main, ...fine].map((s) => [s.field, null])) as Partial<ZoneEntities>,
    );
  };
  const hint = (el: ComfortBandSettingsTab) =>
    el.shadowRoot!.querySelector('.upgrade-hint')!.textContent!.replace(/\s+/g, ' ').trim();

  // The version each section's first setting arrived in. A disabled entity
  // drops out of the registry too, hence "turned on".
  // Named, not "these settings": profiles still work below Follows.
  it.each([
    ['fan', 'Fan control needs', 'v0.13.0'],
    ['peak', 'Peak saving needs', 'v0.24.0'],
    ['schedules', 'Choosing a shared schedule needs', 'v0.14.0'],
  ] as const)('says what %s settings need when none is there', async (section, what, since) => {
    const el = await settingsTab(makeHass(), section, without(section));
    expect(el.shadowRoot!.querySelectorAll('.row')).toHaveLength(0);
    expect(hint(el)).toBe(
      `${what} the comfort_band integration ${since} or later, with its entities turned on.`,
    );
  });

  // Their first settings came with v0.1.0, as far back as the card goes.
  it.each(['comfort', 'automation'] as const)(
    'says %s settings are turned off when none is there',
    async (section) => {
      const el = await settingsTab(makeHass(), section, without(section));
      expect(el.shadowRoot!.querySelectorAll('.row[data-setting]')).toHaveLength(0);
      expect(hint(el)).toBe(
        'These settings’ entities are turned off. Turn them on from this room’s device page, under Settings → Devices & Services.',
      );
    },
  );

  it('keeps the humidity sensor and the other comfort settings without the "feels like" switch', async () => {
    const el = await settingsTab(
      makeHass(),
      'comfort',
      makeEntities('gym', { useApparentTemperature: null }),
    );
    expect(rows(el).map((r) => r.setting)).toEqual([
      'deadbandBelow',
      'deadbandAbove',
      'bandRampMinutes',
      'overrideHours',
      null,
    ]);
    expect(el.shadowRoot!.querySelector('.note')).not.toBeNull();
  });
});

describe('comfort-band-settings-tab switches', () => {
  it('flips at once and turns the switch on or off', async () => {
    const hass = makeHass({ states: { 'switch.gym_enabled': { state: 'on' } } });
    const el = await settingsTab(hass, 'automation');
    const toggle = row(el, 'enabled').querySelector<HTMLButtonElement>('button[role="switch"]')!;
    expect(toggle.getAttribute('aria-checked')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Control this room');
    toggle.click();
    await el.updateComplete;
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    await flush(el);
    expect(calls(hass)).toEqual([['switch', 'turn_off', { entity_id: 'switch.gym_enabled' }]]);
  });

  it('turns learning on from the automation section', async () => {
    const hass = makeHass();
    const el = await settingsTab(hass, 'automation');
    row(el, 'learningEnabled').querySelector<HTMLButtonElement>('button[role="switch"]')!.click();
    await flush(el);
    expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_on', {
      entity_id: 'switch.gym_learning_enabled',
    });
  });

  it('rolls back and says why when the call is refused', async () => {
    const hass = makeHass({
      callServiceImpl: vi.fn().mockRejectedValueOnce(new Error('Backend down')),
    });
    const el = await settingsTab(hass);
    const toggle = () =>
      row(el, 'useApparentTemperature').querySelector<HTMLButtonElement>('button[role="switch"]')!;
    toggle().click();
    await flush(el);
    expect(toggle().getAttribute('aria-checked')).toBe('false');
    expect(el.shadowRoot!.querySelector('[role="alert"]')!.textContent).toContain('Backend down');
  });

  it('ignores presses while its call is going through, then accepts them again', async () => {
    let finish: () => void = () => {};
    const slow = vi.fn().mockImplementationOnce(() => new Promise<void>((r) => (finish = r)));
    slow.mockResolvedValue(undefined);
    const hass = makeHass({ callServiceImpl: slow });
    const el = await settingsTab(hass);
    const toggle = () =>
      row(el, 'useApparentTemperature').querySelector<HTMLButtonElement>('button[role="switch"]')!;
    toggle().click();
    await flush(el);
    expect(toggle().getAttribute('aria-disabled')).toBe('true');
    toggle().click();
    await flush(el);
    expect(hass.callService).toHaveBeenCalledTimes(1);
    finish();
    el.hass = makeHass({
      states: { 'switch.gym_use_apparent_temperature': { state: 'on' } },
      callServiceImpl: slow,
    });
    await flush(el);
    expect(toggle().getAttribute('aria-disabled')).toBe('false');
    toggle().click();
    await flush(el);
    expect(hass.callService).toHaveBeenCalledTimes(2);
  });

  // Both presses land before the switch re-renders.
  it('sends one call for two presses in a row', async () => {
    const hass = makeHass();
    const el = await settingsTab(hass);
    const toggle = row(el, 'useApparentTemperature').querySelector<HTMLButtonElement>(
      'button[role="switch"]',
    )!;
    toggle.click();
    toggle.click();
    await flush(el);
    expect(calls(hass)).toEqual([
      ['switch', 'turn_on', { entity_id: 'switch.gym_use_apparent_temperature' }],
    ]);
  });

  it('stays flipped until HA reports the change', async () => {
    const hass = makeHass();
    const el = await settingsTab(hass);
    const toggle = () =>
      row(el, 'useApparentTemperature').querySelector<HTMLButtonElement>('button[role="switch"]')!;
    toggle().click();
    await flush(el);
    expect(calls(hass)).toHaveLength(1);
    expect(toggle().getAttribute('aria-checked')).toBe('true');
    expect(toggle().getAttribute('aria-disabled')).toBe('true');
    el.hass = makeHass({ states: { 'switch.gym_use_apparent_temperature': { state: 'on' } } });
    await el.updateComplete;
    expect(toggle().getAttribute('aria-checked')).toBe('true');
    expect(toggle().getAttribute('aria-disabled')).toBe('false');
  });

  // Not "off": "Control this room" off reads as paused.
  it('says a switch it can’t read is unavailable, and offers no press', async () => {
    const el = await settingsTab(
      makeHass({
        states: {
          'switch.gym_enabled': { state: 'unavailable' },
          'switch.gym_learning_enabled': { state: 'unknown' },
        },
      }),
      'automation',
    );
    expect(row(el, 'enabled').querySelector('button')).toBeNull();
    expect(row(el, 'enabled').querySelector('.info-value')!.textContent!.trim()).toBe(
      'Unavailable',
    );
    expect(row(el, 'learningEnabled').querySelector('.info-value')!.textContent!.trim()).toBe(
      'Unknown',
    );
    expect(row(el, 'mpcEnabled').querySelector('button[role="switch"]')).not.toBeNull();
  });

  it('reflects a new state from HA', async () => {
    const el = await settingsTab(makeHass());
    el.hass = makeHass({ states: { 'switch.gym_use_apparent_temperature': { state: 'on' } } });
    await el.updateComplete;
    const toggle = row(el, 'useApparentTemperature').querySelector('button[role="switch"]')!;
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });
});

describe('comfort-band-settings-tab steppers', () => {
  it('shows the value with its unit, to the step', async () => {
    const el = await settingsTab(makeHass());
    expect(shown(el, 'deadbandBelow')).toBe('0.3 °C');
    expect(shown(el, 'bandRampMinutes')).toBe('45 min');
    expect(shown(el, 'overrideHours')).toBe('3 h');
    const group = row(el, 'deadbandBelow').querySelector('.stepper')!;
    expect(group.getAttribute('role')).toBe('group');
    const title = el.shadowRoot!.getElementById(group.getAttribute('aria-labelledby')!)!;
    expect(title.textContent!.trim()).toBe('Heating starts below the range by');
    const { less, more } = stepButtons(el, 'deadbandBelow');
    expect([less.getAttribute('aria-label'), more.getAttribute('aria-label')]).toEqual([
      'Decrease',
      'Increase',
    ]);
  });

  it('moves a step per tap and sends once the taps stop', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass();
    const el = await settingsTab(hass);
    const { more } = stepButtons(el, 'deadbandBelow');
    more.click();
    more.click();
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.5 °C');
    expect(STEP_SEND_DELAY_MS).toBe(1000);
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS - 1);
    await flush(el);
    expect(hass.callService).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    await flush(el);
    expect(calls(hass)).toEqual([
      ['number', 'set_value', { entity_id: 'number.gym_deadband_below', value: 0.5 }],
    ]);
  });

  it('steps down too, a whole step at a time for whole-number settings', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass();
    const el = await settingsTab(hass);
    stepButtons(el, 'bandRampMinutes').less.click();
    await el.updateComplete;
    expect(shown(el, 'bandRampMinutes')).toBe('40 min');
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(calls(hass)).toEqual([
      ['number', 'set_value', { entity_id: 'number.gym_band_ramp_minutes', value: 40 }],
    ]);
  });

  it('stops at its limits, and says so', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass({
      states: { 'number.gym_deadband_below': number('2.0', 0.1, 2, 0.1, '°C') },
    });
    const el = await settingsTab(hass);
    const { less, more } = stepButtons(el, 'deadbandBelow');
    expect(more.getAttribute('aria-disabled')).toBe('true');
    expect(less.getAttribute('aria-disabled')).toBe('false');
    more.click();
    await el.updateComplete;
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(shown(el, 'deadbandBelow')).toBe('2.0 °C');
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('stops at its lower limit too', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass({
      states: { 'number.gym_deadband_below': number('0.1', 0.1, 2, 0.1, '°C') },
    });
    const el = await settingsTab(hass);
    const { less, more } = stepButtons(el, 'deadbandBelow');
    expect(less.getAttribute('aria-disabled')).toBe('true');
    expect(more.getAttribute('aria-disabled')).toBe('false');
    less.click();
    await el.updateComplete;
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(shown(el, 'deadbandBelow')).toBe('0.1 °C');
    expect(hass.callService).not.toHaveBeenCalled();
  });

  // A value off the step's grid lands on the limit, not past it.
  it('lands on a limit rather than stepping past it', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass({
      states: {
        'number.gym_peak_heat_offset': number('4.8', 0, 5, 0.5, '°C'),
        'number.gym_peak_cool_offset': number('0.2', 0, 5, 0.5, '°C'),
      },
    });
    const el = await settingsTab(hass, 'peak');
    stepButtons(el, 'peakHeatOffset').more.click();
    stepButtons(el, 'peakCoolOffset').less.click();
    await el.updateComplete;
    expect(shown(el, 'peakHeatOffset')).toBe('5.0 °C');
    expect(shown(el, 'peakCoolOffset')).toBe('0.0 °C');
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(calls(hass).map((c) => c[2])).toEqual([
      { entity_id: 'number.gym_peak_heat_offset', value: 5 },
      { entity_id: 'number.gym_peak_cool_offset', value: 0 },
    ]);
  });

  // 0.2 + 0.1 is 0.30000000000000004 in floating point.
  it('sends the value to the step, without floating-point error', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass({
      states: { 'number.gym_deadband_below': number('0.2', 0.1, 2, 0.1, '°C') },
    });
    const el = await settingsTab(hass);
    stepButtons(el, 'deadbandBelow').more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(calls(hass)).toEqual([
      ['number', 'set_value', { entity_id: 'number.gym_deadband_below', value: 0.3 }],
    ]);
  });

  it('steps by 1 where the entity gives no step', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass({
      states: {
        'number.gym_override_hours': {
          state: '3',
          attributes: { min: 1, max: 12, unit_of_measurement: 'h' },
        },
      },
    });
    const el = await settingsTab(hass);
    stepButtons(el, 'overrideHours').more.click();
    await el.updateComplete;
    expect(shown(el, 'overrideHours')).toBe('4 h');
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(calls(hass)).toEqual([
      ['number', 'set_value', { entity_id: 'number.gym_override_hours', value: 4 }],
    ]);
  });

  // A closed section stays on the page; the dialog closing takes it off.
  it('sends taps not yet sent when it’s taken off the page', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass();
    const el = await settingsTab(hass);
    stepButtons(el, 'overrideHours').more.click();
    await el.updateComplete;
    el.remove();
    await flush(el);
    expect(calls(hass)).toEqual([
      ['number', 'set_value', { entity_id: 'number.gym_override_hours', value: 4 }],
    ]);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('goes back to the value in force and says why when the call is refused', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass({
      callServiceImpl: vi.fn().mockRejectedValueOnce(new Error('Out of range')),
    });
    const el = await settingsTab(hass);
    stepButtons(el, 'deadbandAbove').more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(shown(el, 'deadbandAbove')).toBe('0.5 °C');
    expect(el.shadowRoot!.querySelector('[role="alert"]')!.textContent).toContain('Out of range');
  });

  // The call for the first taps lands after newer taps were made.
  it('keeps showing taps made while an earlier value is going through', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    let finish: () => void = () => {};
    const slow = vi.fn().mockImplementationOnce(() => new Promise<void>((r) => (finish = r)));
    slow.mockResolvedValue(undefined);
    const hass = makeHass({ callServiceImpl: slow });
    const el = await settingsTab(hass);
    const { more } = stepButtons(el, 'deadbandBelow');
    more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    more.click();
    await el.updateComplete;
    finish();
    await flush(el);
    expect(shown(el, 'deadbandBelow')).toBe('0.5 °C');
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(calls(hass).map((c) => (c[2] as { value: number }).value)).toEqual([0.4, 0.5]);
  });

  // The newer taps end on the value going through; they still go.
  it('keeps showing taps back to the value going through', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    let finish: () => void = () => {};
    const slow = vi.fn().mockImplementationOnce(() => new Promise<void>((r) => (finish = r)));
    slow.mockResolvedValue(undefined);
    const hass = makeHass({ callServiceImpl: slow });
    const el = await settingsTab(hass);
    const { less, more } = stepButtons(el, 'deadbandBelow');
    more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    more.click();
    less.click();
    await el.updateComplete;
    finish();
    await flush(el);
    expect(shown(el, 'deadbandBelow')).toBe('0.4 °C');
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(calls(hass).map((c) => (c[2] as { value: number }).value)).toEqual([0.4, 0.4]);
  });

  it("offers no steps for a value it can't read", async () => {
    const el = await settingsTab(
      makeHass({
        states: { 'number.gym_deadband_below': { state: 'unavailable', attributes: {} } },
      }),
    );
    expect(shown(el, 'deadbandBelow')).toBe('—');
    const { less, more } = stepButtons(el, 'deadbandBelow');
    expect([less.getAttribute('aria-disabled'), more.getAttribute('aria-disabled')]).toEqual([
      'true',
      'true',
    ]);
  });

  it('announces each tap', async () => {
    const el = await settingsTab(makeHass());
    expect(row(el, 'deadbandBelow').querySelector('output.value')!.getAttribute('aria-live')).toBe(
      'polite',
    );
  });

  // Set elsewhere, a value can be off the step's grid.
  it('shows a value off the step’s grid as it is, and steps onto the grid', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const at = async (direction: 'less' | 'more') => {
      const hass = makeHass({
        states: { 'number.gym_deadband_below': number('0.25', 0.1, 2, 0.1, '°C') },
      });
      const el = await settingsTab(hass);
      expect(shown(el, 'deadbandBelow')).toBe('0.25 °C');
      stepButtons(el, 'deadbandBelow')[direction].click();
      vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
      await flush(el);
      el.remove();
      return (calls(hass)[0][2] as { value: number }).value;
    };
    expect(await at('more')).toBe(0.3);
    expect(await at('less')).toBe(0.2);
  });

  // As HA's own slider: steps of 10 from a bottom limit of 5 are 5, 15, 25...
  it('counts steps from the bottom limit', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass({
      states: { 'number.gym_band_ramp_minutes': number('25', 5, 95, 10, 'min') },
    });
    const el = await settingsTab(hass);
    stepButtons(el, 'bandRampMinutes').more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(calls(hass)).toEqual([
      ['number', 'set_value', { entity_id: 'number.gym_band_ramp_minutes', value: 35 }],
    ]);
  });

  it('gives each step button a 44px target', () => {
    expect(css()).toMatch(/\.step\s*\{[^}]*width:\s*44px;[^}]*height:\s*44px/);
  });
});

describe('comfort-band-settings-tab choices', () => {
  function select(el: ComfortBandSettingsTab, setting: string): HTMLSelectElement {
    return row(el, setting).querySelector('select')!;
  }

  it('lists the options as people say them, with the current one picked', async () => {
    const el = await settingsTab(makeHass(), 'fan');
    const s = select(el, 'activeFanMode');
    expect(Array.from(s.options).map((o) => [o.value, o.textContent!.trim()])).toEqual([
      ['(none)', 'Leave as it is'],
      ['auto', 'Auto'],
      ['low', 'Low'],
      ['medium-low', 'Medium low'],
      ['medium', 'Medium'],
      ['high', 'High'],
    ]);
    expect(s.value).toBe('medium');
    const title = el.shadowRoot!.getElementById(s.getAttribute('aria-labelledby')!)!;
    expect(title.textContent!.trim()).toBe('Fan while heating or cooling');
  });

  it('sends the option picked', async () => {
    const hass = makeHass();
    const el = await settingsTab(hass, 'schedules');
    const s = select(el, 'scheduleAssignment');
    s.value = 'Bedrooms';
    s.dispatchEvent(new Event('change'));
    await flush(el);
    expect(calls(hass)).toEqual([
      [
        'select',
        'select_option',
        { entity_id: 'select.gym_schedule_assignment', option: 'Bedrooms' },
      ],
    ]);
  });

  it('goes back to the option in force when the call is refused', async () => {
    const hass = makeHass({ callServiceImpl: vi.fn().mockRejectedValueOnce(new Error('No')) });
    const el = await settingsTab(hass, 'fan');
    const s = select(el, 'idleFanMode');
    s.value = 'high';
    s.dispatchEvent(new Event('change'));
    await flush(el);
    expect(select(el, 'idleFanMode').value).toBe('low');
  });

  it('keeps showing a newer choice while an earlier one goes through', async () => {
    const finishes: Array<() => void> = [];
    const slow = vi.fn().mockImplementation(() => new Promise<void>((r) => finishes.push(r)));
    const hass = makeHass({ callServiceImpl: slow });
    const el = await settingsTab(hass, 'fan');
    const pick = (option: string) => {
      const s = select(el, 'idleFanMode');
      s.value = option;
      s.dispatchEvent(new Event('change'));
    };
    pick('high');
    await flush(el);
    pick('auto');
    await flush(el);
    finishes[0]();
    await flush(el);
    expect(select(el, 'idleFanMode').value).toBe('auto');
    expect(calls(hass).map((c) => (c[2] as { option: string }).option)).toEqual(['high', 'auto']);
  });

  it('leaves out options that aren’t text', async () => {
    const el = await settingsTab(
      makeHass({
        states: {
          'select.gym_idle_fan_mode': {
            state: 'low',
            attributes: { options: ['low', 3, null, 'high'] },
          },
        },
      }),
      'fan',
    );
    expect(Array.from(select(el, 'idleFanMode').options).map((o) => o.value)).toEqual([
      'low',
      'high',
    ]);
  });

  // A fanless unit's fan selects have no options and are unavailable.
  it("can't be changed while it's unavailable", async () => {
    for (const attributes of [{}, { options: FAN_MODES }]) {
      const el = await settingsTab(
        makeHass({ states: { 'select.gym_idle_fan_mode': { state: 'unavailable', attributes } } }),
        'fan',
      );
      const s = select(el, 'idleFanMode');
      expect(s.disabled).toBe(true);
      expect(s.options[s.selectedIndex].textContent!.trim()).toBe('Unavailable');
      el.remove();
    }
  });

  // The integration reads "unknown" for a stored fan mode the unit no
  // longer offers: picking one it does offer is the way out.
  it('can still be changed while its value is none of its options', async () => {
    const hass = makeHass({
      states: {
        'select.gym_idle_fan_mode': { state: 'unknown', attributes: { options: FAN_MODES } },
      },
    });
    const el = await settingsTab(hass, 'fan');
    const s = select(el, 'idleFanMode');
    expect(s.disabled).toBe(false);
    expect(s.options[s.selectedIndex].textContent!.trim()).toBe('—');
    expect(s.options[s.selectedIndex].disabled).toBe(true);
    s.value = 'low';
    s.dispatchEvent(new Event('change'));
    await flush(el);
    expect(calls(hass)).toEqual([
      ['select', 'select_option', { entity_id: 'select.gym_idle_fan_mode', option: 'low' }],
    ]);
  });

  // Shared schedules are named by people; fan modes are the unit's words.
  it('shows schedule names as typed', async () => {
    const el = await settingsTab(
      makeHass({
        states: {
          'select.gym_schedule_assignment': {
            state: 'Own schedule',
            attributes: { options: ['Own schedule', 'iPad corner', 'own-schedule', 'bed_rooms'] },
          },
        },
      }),
      'schedules',
    );
    expect(
      Array.from(select(el, 'scheduleAssignment').options).map((o) => o.textContent!.trim()),
    ).toEqual(['Own schedule', 'iPad corner', 'own-schedule', 'bed_rooms']);
  });

  it('draws its own 44px box, as WebKit ignores the height of its menu button', () => {
    expect(css()).toMatch(/\.choice\s*\{[^}]*min-height:\s*44px/);
    expect(css()).toMatch(/\.choice\s*\{[^}]*[^-]appearance:\s*none/);
    expect(css()).toMatch(/\.choice\s*\{[^}]*-webkit-appearance:\s*none/);
  });

  it('puts a choice below its title when they don’t fit side by side', () => {
    expect(css()).toMatch(/\.row\.pick\s*\{[^}]*flex-wrap:\s*wrap/);
    expect(css()).toMatch(/\.choice\s*\{[^}]*max-width:\s*100%/);
  });
});

describe('comfort-band-settings-tab humidity sensor', () => {
  const withRoom = (attributes: Record<string, unknown>, extra: Record<string, StateSpec> = {}) =>
    makeHass({
      states: { 'sensor.gym_room_temperature': { state: '21.0', attributes }, ...extra },
    });
  const info = (el: ComfortBandSettingsTab) => {
    const r = Array.from(el.shadowRoot!.querySelectorAll('.row')).find(
      (x) => x.querySelector('.title')!.textContent!.trim() === 'Humidity sensor',
    )!;
    return {
      value: r.querySelector('.info-value')!.textContent!.trim(),
      desc: r.querySelector('.desc')!.textContent!.replace(/\s+/g, ' ').trim(),
      unconfigured: r.querySelector('.info-value')!.classList.contains('unconfigured'),
    };
  };

  it('shows the sensor by its name and reading, not its ID', async () => {
    const el = await settingsTab(
      withRoom(
        { humidity_sensor: 'sensor.gym_humidity' },
        {
          'sensor.gym_humidity': {
            state: '54',
            attributes: { friendly_name: 'Gym humidity', unit_of_measurement: '%' },
          },
        },
      ),
    );
    expect(info(el)).toEqual({
      value: 'Gym humidity · 54 %',
      desc: 'Change it under Settings → Devices & Services → Comfort Band → Configure.',
      unconfigured: false,
    });
  });

  it('formats the reading as HA does, where the frontend can', async () => {
    const hass = withRoom(
      { humidity_sensor: 'sensor.gym_humidity' },
      {
        'sensor.gym_humidity': {
          state: '54.29999923706055',
          attributes: { friendly_name: 'Gym humidity', unit_of_measurement: '%' },
        },
      },
    );
    hass.formatEntityState = (s) => `${Number(s.state).toFixed(1)}%`;
    const el = await settingsTab(hass);
    expect(info(el).value).toBe('Gym humidity · 54.3%');
  });

  it('says a sensor has no reading, and falls back to its ID without a name', async () => {
    const at = async (sensor: StateSpec | null) => {
      const el = await settingsTab(
        withRoom(
          { humidity_sensor: 'sensor.gym_humidity' },
          sensor ? { 'sensor.gym_humidity': sensor } : {},
        ),
      );
      const value = info(el).value;
      el.remove();
      return value;
    };
    expect(await at({ state: 'unavailable', attributes: { friendly_name: 'Gym humidity' } })).toBe(
      'Gym humidity · no reading',
    );
    expect(await at({ state: '61', attributes: {} })).toBe('sensor.gym_humidity · 61');
    expect(await at(null)).toBe('sensor.gym_humidity');
  });

  it('says none is set up, and where to set one', async () => {
    const el = await settingsTab(makeHass());
    expect(info(el)).toEqual({
      value: 'Not configured',
      desc: 'Set one up under Settings → Devices & Services → Comfort Band → Configure.',
      unconfigured: true,
    });
  });

  // HA drops an unavailable entity's attributes; a disabled one isn't there.
  it("says it can't be read where the room temperature entity can't", async () => {
    const unavailable = await settingsTab(
      makeHass({
        states: { 'sensor.gym_room_temperature': { state: 'unavailable', attributes: {} } },
      }),
    );
    expect(info(unavailable)).toEqual({
      value: 'Can’t be read right now',
      desc: 'Set under Settings → Devices & Services → Comfort Band → Configure.',
      unconfigured: true,
    });
    unavailable.remove();
    const disabled = await settingsTab(
      makeHass(),
      'comfort',
      makeEntities('gym', { roomTemperature: null }),
    );
    expect(info(disabled)).toEqual({
      value: 'Can’t be read',
      desc: 'It’s read from this room’s Room temperature sensor, which is turned off. Turn it on from this room’s device page, under Settings → Devices & Services.',
      unconfigured: true,
    });
  });

  it('wraps a long name rather than overflowing', () => {
    expect(css()).toMatch(/\.info-value\s*\{[^}]*max-width:\s*55%/);
    expect(css()).toMatch(/\.info-value\s*\{[^}]*overflow-wrap:\s*anywhere/);
  });
});

describe('comfort-band-settings-tab calls', () => {
  it('sends changes to different settings one after another, in the order made', async () => {
    let finish: () => void = () => {};
    const slow = vi.fn().mockImplementationOnce(() => new Promise<void>((r) => (finish = r)));
    slow.mockResolvedValue(undefined);
    const hass = makeHass({ callServiceImpl: slow });
    const el = await settingsTab(hass, 'fan');
    row(el, 'fanControlEnabled').querySelector<HTMLButtonElement>('button[role="switch"]')!.click();
    const s = row(el, 'idleFanMode').querySelector('select')!;
    s.value = 'auto';
    s.dispatchEvent(new Event('change'));
    await flush(el);
    expect(hass.callService).toHaveBeenCalledTimes(1);
    finish();
    await flush(el);
    expect(calls(hass).map((c) => c[1])).toEqual(['turn_on', 'select_option']);
  });
});

// The integration saves a number through HA's debounced refresh, so its
// new state can come up to 10 s after the call returns.
describe('comfort-band-settings-tab once a call has gone through', () => {
  const below = (value: string) =>
    makeHass({ states: { 'number.gym_deadband_below': number(value, 0.1, 2, 0.1, '°C') } });

  async function sent(): Promise<{ el: ComfortBandSettingsTab; hass: HomeAssistant }> {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = below('0.3');
    const el = await settingsTab(hass);
    stepButtons(el, 'deadbandBelow').more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(calls(hass)).toHaveLength(1);
    return { el, hass };
  }

  it('keeps showing the value sent until HA reports it, then follows HA', async () => {
    const { el } = await sent();
    expect(shown(el, 'deadbandBelow')).toBe('0.4 °C');
    el.hass = below('0.4');
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.4 °C');
    expect(vi.getTimerCount()).toBe(0);
    el.hass = below('0.7');
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.7 °C');
  });

  it('shows what HA reports, even if not the value sent', async () => {
    const { el } = await sent();
    el.hass = below('0.5');
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.5 °C');
  });

  it('stops waiting after 15 s', async () => {
    expect(SETTLE_MS).toBe(15000);
    const { el } = await sent();
    vi.advanceTimersByTime(SETTLE_MS - 1);
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.4 °C');
    vi.advanceTimersByTime(1);
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.3 °C');
  });

  // HA keeps an unchanged entity's state object.
  it('keeps waiting through changes to other entities', async () => {
    const { el, hass } = await sent();
    const other = makeHass({ states: { 'switch.gym_enabled': { state: 'off' } } });
    el.hass = {
      ...hass,
      states: { ...hass.states, 'switch.gym_enabled': other.states['switch.gym_enabled'] },
    };
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.4 °C');
  });

  it('keeps a tap made while waiting, past the end of the earlier wait', async () => {
    const { el, hass } = await sent();
    vi.advanceTimersByTime(SETTLE_MS - 500);
    stepButtons(el, 'deadbandBelow').more.click();
    vi.advanceTimersByTime(600);
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.5 °C');
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(calls(hass).map((c) => (c[2] as { value: number }).value)).toEqual([0.4, 0.5]);
  });

  it('keeps a choice made while waiting, past the end of the earlier wait', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const finishes: Array<() => void> = [];
    const slow = vi.fn().mockImplementation(() => new Promise<void>((r) => finishes.push(r)));
    const el = await settingsTab(makeHass({ callServiceImpl: slow }), 'fan');
    const pick = (option: string) => {
      const s = row(el, 'idleFanMode').querySelector('select')!;
      s.value = option;
      s.dispatchEvent(new Event('change'));
    };
    pick('high');
    await flush(el);
    finishes[0]();
    await flush(el);
    vi.advanceTimersByTime(SETTLE_MS - 500);
    pick('auto');
    await flush(el);
    vi.advanceTimersByTime(600);
    await el.updateComplete;
    expect(row(el, 'idleFanMode').querySelector('select')!.value).toBe('auto');
  });

  it('keeps a newer tap when HA reports the value before it', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    let finish: () => void = () => {};
    const slow = vi.fn().mockImplementationOnce(() => new Promise<void>((r) => (finish = r)));
    slow.mockResolvedValue(undefined);
    const el = await settingsTab(
      makeHass({
        states: { 'number.gym_deadband_below': number('0.3', 0.1, 2, 0.1, '°C') },
        callServiceImpl: slow,
      }),
    );
    const { more } = stepButtons(el, 'deadbandBelow');
    more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    more.click();
    el.hass = makeHass({
      states: { 'number.gym_deadband_below': number('0.4', 0.1, 2, 0.1, '°C') },
      callServiceImpl: slow,
    });
    finish();
    await flush(el);
    expect(shown(el, 'deadbandBelow')).toBe('0.5 °C');
  });

  it('keeps a newer tap when the call before it is refused', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    let refuse: (e: Error) => void = () => {};
    const slow = vi
      .fn()
      .mockImplementationOnce(() => new Promise<void>((_, r) => (refuse = r)))
      .mockResolvedValue(undefined);
    const el = await settingsTab(makeHass({ callServiceImpl: slow }));
    const { more } = stepButtons(el, 'deadbandBelow');
    more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    more.click();
    refuse(new Error('Busy'));
    await flush(el);
    expect(shown(el, 'deadbandBelow')).toBe('0.5 °C');
    expect(el.shadowRoot!.querySelector('[role="alert"]')!.textContent).toContain('Busy');
  });

  // The taps end on the value going through; HA then reports another.
  it('keeps taps back to the value going through, whatever HA reports meanwhile', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    let finish: () => void = () => {};
    const slow = vi.fn().mockImplementationOnce(() => new Promise<void>((r) => (finish = r)));
    slow.mockResolvedValue(undefined);
    const el = await settingsTab(
      makeHass({
        states: { 'number.gym_deadband_below': number('0.3', 0.1, 2, 0.1, '°C') },
        callServiceImpl: slow,
      }),
    );
    const { less, more } = stepButtons(el, 'deadbandBelow');
    more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    more.click();
    less.click();
    finish();
    await flush(el);
    el.hass = makeHass({
      states: { 'number.gym_deadband_below': number('0.6', 0.1, 2, 0.1, '°C') },
      callServiceImpl: slow,
    });
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.4 °C');
  });

  it('keeps taps back to the value going through when it is refused', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    let refuse: (e: Error) => void = () => {};
    const slow = vi
      .fn()
      .mockImplementationOnce(() => new Promise<void>((_, r) => (refuse = r)))
      .mockResolvedValue(undefined);
    const el = await settingsTab(makeHass({ callServiceImpl: slow }));
    const { less, more } = stepButtons(el, 'deadbandBelow');
    more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    more.click();
    less.click();
    refuse(new Error('Busy'));
    await flush(el);
    expect(shown(el, 'deadbandBelow')).toBe('0.4 °C');
  });

  // A choice has no send timer: only its value tells it's newer.
  it('keeps a newer choice when HA reports the one before it', async () => {
    const finishes: Array<() => void> = [];
    const slow = vi.fn().mockImplementation(() => new Promise<void>((r) => finishes.push(r)));
    const el = await settingsTab(makeHass({ callServiceImpl: slow }), 'fan');
    const pick = (option: string) => {
      const s = row(el, 'idleFanMode').querySelector('select')!;
      s.value = option;
      s.dispatchEvent(new Event('change'));
    };
    pick('high');
    await flush(el);
    pick('auto');
    await flush(el);
    finishes[0]();
    await flush(el);
    el.hass = makeHass({
      states: { 'select.gym_idle_fan_mode': { state: 'high', attributes: { options: FAN_MODES } } },
      callServiceImpl: slow,
    });
    await el.updateComplete;
    expect(row(el, 'idleFanMode').querySelector('select')!.value).toBe('auto');
  });

  it('keeps a newer choice when the one before it is refused', async () => {
    let refuse: (e: Error) => void = () => {};
    const slow = vi
      .fn()
      .mockImplementationOnce(() => new Promise<void>((_, r) => (refuse = r)))
      .mockImplementation(() => new Promise<void>(() => {}));
    const el = await settingsTab(makeHass({ callServiceImpl: slow }), 'fan');
    const pick = (option: string) => {
      const s = row(el, 'idleFanMode').querySelector('select')!;
      s.value = option;
      s.dispatchEvent(new Event('change'));
    };
    pick('high');
    await flush(el);
    pick('auto');
    refuse(new Error('Busy'));
    await flush(el);
    expect(row(el, 'idleFanMode').querySelector('select')!.value).toBe('auto');
  });

  it('shows what HA says when shown again after its taps were sent on the way out', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const hass = makeHass();
    const el = await settingsTab(hass);
    stepButtons(el, 'deadbandBelow').more.click();
    el.remove();
    await flush(el);
    expect(calls(hass)).toHaveLength(1);
    document.body.appendChild(el);
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.3 °C');
  });

  // Two calls for the same value both come back while it shows.
  it('waits from the later of two calls for the same choice', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const finishes: Array<() => void> = [];
    const slow = vi.fn().mockImplementation(() => new Promise<void>((r) => finishes.push(r)));
    const el = await settingsTab(makeHass({ callServiceImpl: slow }), 'fan');
    const pick = (option: string) => {
      const s = row(el, 'idleFanMode').querySelector('select')!;
      s.value = option;
      s.dispatchEvent(new Event('change'));
    };
    pick('high');
    await flush(el);
    pick('auto');
    pick('high');
    finishes[0]();
    await flush(el);
    vi.advanceTimersByTime(5000);
    finishes[1]();
    await flush(el);
    finishes[2]();
    await flush(el);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(SETTLE_MS - 1);
    await el.updateComplete;
    expect(row(el, 'idleFanMode').querySelector('select')!.value).toBe('high');
  });

  it('shows what HA says when it is shown again', async () => {
    const { el } = await sent();
    el.remove();
    document.body.appendChild(el);
    await el.updateComplete;
    expect(shown(el, 'deadbandBelow')).toBe('0.3 °C');
  });

  // As HA does: the entity's new state is written before the call returns.
  describe('where HA has reported the change by the time the call returns', () => {
    function reporting(states: Record<string, StateSpec>) {
      let el!: ComfortBandSettingsTab;
      const hass = makeHass({
        callServiceImpl: vi.fn(async () => {
          el.hass = makeHass({ states });
        }),
      });
      return { hass, set: (e: ComfortBandSettingsTab) => (el = e) };
    }

    it('is ready for the next press at once', async () => {
      const r = reporting({ 'switch.gym_use_apparent_temperature': { state: 'on' } });
      const el = r.set(await settingsTab(r.hass));
      const toggle = () =>
        row(el, 'useApparentTemperature').querySelector<HTMLButtonElement>(
          'button[role="switch"]',
        )!;
      toggle().click();
      await flush(el);
      expect(toggle().getAttribute('aria-checked')).toBe('true');
      expect(toggle().getAttribute('aria-disabled')).toBe('false');
    });

    it("doesn't take an entity HA has dropped for one that reported the value", async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const ref: { el?: ComfortBandSettingsTab } = {};
      const hass = makeHass({
        callServiceImpl: vi.fn(async () => {
          const next = makeHass();
          delete next.states['number.gym_deadband_below'];
          ref.el!.hass = next;
        }),
      });
      const el = (ref.el = await settingsTab(hass));
      stepButtons(el, 'deadbandBelow').more.click();
      vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
      await flush(el);
      expect(vi.getTimerCount()).toBe(1);
    });

    it('stops waiting for a number or a choice at once', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const r = reporting({
        'number.gym_peak_heat_offset': number('1.5', 0, 5, 0.5, '°C'),
      });
      const el = r.set(await settingsTab(r.hass, 'peak'));
      stepButtons(el, 'peakHeatOffset').more.click();
      vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
      await flush(el);
      expect(shown(el, 'peakHeatOffset')).toBe('1.5 °C');
      expect(vi.getTimerCount()).toBe(0);
      el.remove();

      const r2 = reporting({
        'select.gym_idle_fan_mode': { state: 'high', attributes: { options: FAN_MODES } },
      });
      const el2 = r2.set(await settingsTab(r2.hass, 'fan'));
      const s = row(el2, 'idleFanMode').querySelector('select')!;
      s.value = 'high';
      s.dispatchEvent(new Event('change'));
      await flush(el2);
      expect(row(el2, 'idleFanMode').querySelector('select')!.value).toBe('high');
      expect(vi.getTimerCount()).toBe(0);
    });
  });
});

describe('comfort-band-settings-tab errors', () => {
  const failFirst = () =>
    makeHass({
      callServiceImpl: vi
        .fn()
        .mockRejectedValueOnce(new Error('Backend down'))
        .mockResolvedValue(undefined),
    });
  const alert = (el: ComfortBandSettingsTab) => el.shadowRoot!.querySelector('[role="alert"]');
  const toggle = (el: ComfortBandSettingsTab, setting: string) =>
    row(el, setting).querySelector<HTMLButtonElement>('button[role="switch"]')!;
  async function failed(section: SettingsSection, setting: string) {
    const el = await settingsTab(failFirst(), section);
    toggle(el, setting).click();
    await flush(el);
    expect(alert(el)!.textContent).toContain('Backend down');
    return el;
  }

  it('clears with the next switch pressed', async () => {
    const el = await failed('fan', 'fanControlEnabled');
    toggle(el, 'fanControlEnabled').click();
    await el.updateComplete;
    expect(alert(el)).toBeNull();
  });

  it('clears with the next choice', async () => {
    const el = await failed('fan', 'fanControlEnabled');
    const s = row(el, 'idleFanMode').querySelector('select')!;
    s.value = 'auto';
    s.dispatchEvent(new Event('change'));
    await el.updateComplete;
    expect(alert(el)).toBeNull();
  });

  // HA's frontend rejects with an object, not an Error.
  it('shows HA’s own message', async () => {
    const hass = makeHass({
      callServiceImpl: vi.fn().mockRejectedValueOnce({ code: 'invalid', message: 'Too high' }),
    });
    const el = await settingsTab(hass, 'fan');
    toggle(el, 'fanControlEnabled').click();
    await flush(el);
    expect(alert(el)!.textContent).toBe('Too high');
  });

  it('says something even with no message', async () => {
    const el = await settingsTab(
      makeHass({ callServiceImpl: vi.fn().mockRejectedValueOnce('nope') }),
      'fan',
    );
    toggle(el, 'fanControlEnabled').click();
    await flush(el);
    expect(alert(el)!.textContent).toBe('That setting couldn’t be changed.');
  });

  // A newer value for the same setting, tapped while the refused one was
  // going through, goes through after it.
  it('clears once a later value for the same setting goes through', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    let refuse: (e: Error) => void = () => {};
    const slow = vi
      .fn()
      .mockImplementationOnce(() => new Promise<void>((_, r) => (refuse = r)))
      .mockResolvedValue(undefined);
    const el = await settingsTab(makeHass({ callServiceImpl: slow }));
    const { more } = stepButtons(el, 'deadbandBelow');
    more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    more.click();
    refuse(new Error('Busy'));
    await flush(el);
    expect(alert(el)).not.toBeNull();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(alert(el)).toBeNull();
  });

  it('stays while another setting’s value goes through', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    let refuse: (e: Error) => void = () => {};
    const slow = vi
      .fn()
      .mockImplementationOnce(() => new Promise<void>((_, r) => (refuse = r)))
      .mockResolvedValue(undefined);
    const el = await settingsTab(makeHass({ callServiceImpl: slow }));
    stepButtons(el, 'deadbandBelow').more.click();
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    stepButtons(el, 'deadbandAbove').more.click();
    refuse(new Error('Busy'));
    await flush(el);
    vi.advanceTimersByTime(STEP_SEND_DELAY_MS);
    await flush(el);
    expect(slow).toHaveBeenCalledTimes(2);
    expect(alert(el)!.textContent).toContain('Busy');
  });

  it('clears with the next step', async () => {
    const el = await failed('peak', 'peakSavingEnabled');
    stepButtons(el, 'peakHeatOffset').more.click();
    await el.updateComplete;
    expect(alert(el)).toBeNull();
  });
});

describe('optionLabel and stepDecimals', () => {
  it('words options as people say them', () => {
    expect(optionLabel('(none)')).toBe('Leave as it is');
    expect(optionLabel('very-high')).toBe('Very high');
    expect(optionLabel('medium_low')).toBe('Medium low');
    expect(optionLabel('Own schedule')).toBe('Own schedule');
  });

  it('shows as many decimals as the step has', () => {
    expect(stepDecimals(0.1)).toBe(1);
    expect(stepDecimals(0.5)).toBe(1);
    expect(stepDecimals(1)).toBe(0);
    expect(stepDecimals(15)).toBe(0);
    expect(stepDecimals(0.25)).toBe(2);
  });
});
