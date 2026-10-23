import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/diagnostics-tab.js';
import {
  type ComfortBandDiagnosticsTab,
  type FeedbackEntry,
  FEEDBACK_SHOWN,
} from '../src/tabs/diagnostics-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

afterEach(teardown);

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
};

function makeEntities(overrides: Partial<Record<keyof typeof ENTITIES, string | null>> = {}) {
  return { ...ENTITIES, ...overrides } as unknown as ZoneEntities;
}

type Spec = string | { state: string; attributes?: Record<string, unknown> };

const SLOPE = {
  idle_slope: 0.398,
  idle_slope_source: 'live',
  recovery_slope_heat: 1.234,
  recovery_slope_cool: null,
  sample_count: 19,
  window_minutes: 87.9,
  last_updated: null,
  sample_count_idle: 12,
  sample_count_recovery_heat: 7,
  sample_count_recovery_cool: 0,
  std_dev_idle: 0.1174,
  std_dev_recovery_heat: 0.21,
  std_dev_recovery_cool: 0,
  method_idle: 'wls',
  method_recovery_heat: 'wls',
  method_recovery_cool: 'none',
};

function makeHass(
  overrides: Record<string, Spec | null> = {},
  callWS: HomeAssistant['callWS'] = vi.fn().mockResolvedValue({ entries: [] }),
): HomeAssistant {
  const base: Record<string, Spec | null> = {
    'sensor.gym_room_temperature': { state: '21', attributes: { source: 'primary' } },
    'switch.gym_enabled': 'on',
    'switch.gym_learning_enabled': 'on',
    'switch.gym_mpc_enabled': 'on',
    'binary_sensor.gym_mpc_ready': 'off',
    'switch.gym_peak_saving_enabled': 'off',
    'sensor.gym_peak_saving': 'off',
    'sensor.gym_current_action': 'idle',
    'sensor.gym_predicted_action': 'idle',
    'sensor.gym_mpc_action': 'idle',
    'sensor.gym_thermal_slope': { state: '0.398', attributes: SLOPE },
    ...overrides,
  };
  const states: HomeAssistant['states'] = {};
  for (const [id, spec] of Object.entries(base)) {
    if (spec === null) continue;
    const { state, attributes = {} } = typeof spec === 'string' ? { state: spec } : spec;
    states[id] = { entity_id: id, state, attributes, last_changed: '', last_updated: '' };
  }
  return {
    states,
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: vi.fn().mockResolvedValue(undefined),
    callWS,
    locale: { language: 'en-GB', time_format: '24' },
  };
}

async function diagnostics(
  hass = makeHass(),
  entities = makeEntities(),
): Promise<ComfortBandDiagnosticsTab> {
  return mount('comfort-band-diagnostics-tab', { hass, entities, zone: 'gym' });
}

async function settle(el: ComfortBandDiagnosticsTab): Promise<void> {
  for (let i = 0; i < 10; i++) await Promise.resolve();
  await el.updateComplete;
}

const text = (n: Element | null | undefined) => n?.textContent?.replace(/\s+/g, ' ').trim();

function rows(el: ComfortBandDiagnosticsTab) {
  return Array.from(el.shadowRoot!.querySelectorAll('.row')).map((r) => ({
    id: r.getAttribute('data-diag'),
    title: text(r.querySelector('.title')),
    value: text(r.querySelector('.value')),
    desc: text(r.querySelector('.desc')) ?? null,
  }));
}

const row = (el: ComfortBandDiagnosticsTab, id: string) => rows(el).find((r) => r.id === id);

describe('comfort-band-diagnostics-tab deciding', () => {
  it('says who decides, what it decided, and what each would do', async () => {
    const el = await diagnostics(makeHass({ 'sensor.gym_mpc_action': 'heat' }));
    expect(rows(el).slice(0, 4)).toEqual([
      {
        id: 'controller',
        title: 'Deciding now',
        value: 'Learning',
        desc: 'Predictive control is on, but not ready to plan yet.',
      },
      { id: 'decision', title: 'Its decision', value: 'Stay idle', desc: null },
      { id: 'learning', title: 'Learning would', value: 'Stay idle', desc: null },
      { id: 'predictive', title: 'Predictive control would', value: 'Not ready yet', desc: null },
    ]);
  });

  it('says what predictive control would do once it’s ready', async () => {
    const el = await diagnostics(
      makeHass({ 'binary_sensor.gym_mpc_ready': 'on', 'sensor.gym_mpc_action': 'heat' }),
    );
    expect(row(el, 'controller')!.value).toBe('Predictive control');
    expect(row(el, 'controller')!.desc).toBeNull();
    expect(row(el, 'predictive')!.value).toBe('Heat');
  });

  it.each([
    [
      { 'switch.gym_learning_enabled': 'off' },
      'Learning is off. It starts heating or cooling once the room passes the range in force by the amounts set under Comfort, and stops at the range.',
    ],
    [
      { 'sensor.gym_peak_saving': 'active' },
      'While a peak is on. It starts heating or cooling once the room passes the range in force by the amounts set under Comfort, and stops at the range.',
    ],
    [
      { 'sensor.gym_room_temperature': { state: '21', attributes: { source: 'climate' } } },
      'While a stand-in sensor is in use. It starts heating or cooling once the room passes the range in force by the amounts set under Comfort, and stops at the range.',
    ],
  ])('says why basic control decides', async (states, desc) => {
    const el = await diagnostics(makeHass(states));
    expect(row(el, 'controller')).toMatchObject({ value: 'Basic control', desc });
  });

  it('says when it can’t tell who decides, or what', async () => {
    const el = await diagnostics(
      makeHass({ 'switch.gym_learning_enabled': 'unavailable', 'sensor.gym_current_action': null }),
    );
    expect(row(el, 'controller')).toMatchObject({
      value: 'Can’t tell',
      desc: 'Some of what decides it can’t be read right now.',
    });
    expect(row(el, 'decision')!.value).toBe('Can’t tell');
  });

  it('says it’s paused, then what it would do', async () => {
    const el = await diagnostics(makeHass({ 'switch.gym_enabled': 'off' }));
    expect(rows(el)[0]).toEqual({
      id: 'paused',
      title: 'Paused',
      value: '',
      desc: '“Control this room” is off, so nothing is sent to the unit. Below is what it would do.',
    });
    expect(rows(el)[1].id).toBe('controller');
  });

  it('says it’s on hold without a reading, and nothing more', async () => {
    const el = await diagnostics(
      makeHass({
        'sensor.gym_room_temperature': { state: 'unknown', attributes: { source: 'none' } },
      }),
    );
    expect(row(el, 'on-hold')!.desc).toBe(
      'There’s no room reading, so nothing is decided until there is.',
    );
    expect(row(el, 'controller')).toBeUndefined();
  });

  // Before integration v0.6.0 / v0.8.0.
  it('leaves out a controller the integration doesn’t have', async () => {
    const el = await diagnostics(
      makeHass(),
      makeEntities({ predictedAction: null, mpcAction: null, mpcReady: null }),
    );
    expect(row(el, 'learning')).toBeUndefined();
    expect(row(el, 'predictive')).toBeUndefined();
  });
});

describe('comfort-band-diagnostics-tab rates', () => {
  it('says what it has learned, and where from', async () => {
    const el = await diagnostics();
    expect(['idle', 'heat', 'cool'].map((id) => row(el, id))).toEqual([
      {
        id: 'idle',
        title: 'On its own',
        value: 'Warms about 0.4° an hour',
        desc: 'Learned from recent readings.',
      },
      {
        id: 'heat',
        title: 'Heating',
        value: 'Warms it about 1.2° an hour',
        desc: 'From the latest heating run.',
      },
      {
        id: 'cool',
        title: 'Cooling',
        value: 'Not learned yet',
        desc: 'Not enough recent cooling to learn from.',
      },
    ]);
  });

  it('folds the raw numbers under "Details"', async () => {
    const el = await diagnostics();
    const details = el.shadowRoot!.querySelector('details.more') as HTMLDetailsElement;
    expect(details.open).toBe(false);
    expect(text(details.querySelector('summary'))).toBe('Details');
    const cells = Array.from(details.querySelectorAll('tbody tr')).map((tr) =>
      Array.from(tr.children).map((c) => text(c)),
    );
    expect(cells).toEqual([
      ['On its own', '+0.40', '12', '0.12°', 'Fitted'],
      ['Heating', '+1.23', '7', '0.21°', 'Fitted'],
      ['Cooling', '—', '0', '0.00°', '—'],
    ]);
    expect(text(details.querySelector('.note'))).toBe('From 19 readings over the last 88 minutes.');
  });

  it('says when they were worked out', async () => {
    const el = await diagnostics(
      makeHass({
        'sensor.gym_thermal_slope': {
          state: '0.4',
          attributes: { ...SLOPE, last_updated: new Date(Date.now() - 60_000).toISOString() },
        },
      }),
    );
    expect(text(el.shadowRoot!.querySelector('details.more .note'))).toMatch(
      /^From 19 readings over the last 88 minutes\. Worked out (\d\d:\d\d|yesterday \d\d:\d\d)\.$/,
    );
  });

  it('gives a falling rate a minus sign', async () => {
    const el = await diagnostics(
      makeHass({
        'sensor.gym_thermal_slope': {
          state: '-0.5',
          attributes: { ...SLOPE, idle_slope: -0.5, method_idle: 'cached' },
        },
      }),
    );
    const first = el.shadowRoot!.querySelector('details.more tbody tr')!;
    expect(Array.from(first.children).map((c) => text(c))).toEqual([
      'On its own',
      '−0.50',
      '12',
      '0.12°',
      'Earlier',
    ]);
  });

  it('says what it needs without the learning sensor', async () => {
    const el = await diagnostics(makeHass(), makeEntities({ thermalSlope: null }));
    expect(row(el, 'idle')).toBeUndefined();
    expect(Array.from(el.shadowRoot!.querySelectorAll('.note')).map((n) => text(n))).toContain(
      'What it has learned needs the comfort_band integration v0.6.0 or later, with its entities turned on.',
    );
  });
});

describe('comfort-band-diagnostics-tab feedback', () => {
  const entry = (hoursAgo: number, over: Partial<FeedbackEntry> = {}): FeedbackEntry => ({
    timestamp: new Date(Date.now() - hoursAgo * 3_600_000).toISOString(),
    label: 'just_right',
    room_temp: 21,
    low: 19.5,
    high: 22.5,
    ...over,
  });
  const items = (el: ComfortBandDiagnosticsTab) =>
    Array.from(el.shadowRoot!.querySelectorAll('li')).map((li) => ({
      said: text(li.querySelector('.said')),
      detail: text(li.querySelector('.detail'))!.replace(/^.*? · /, ''),
    }));
  const lastNote = (el: ComfortBandDiagnosticsTab) =>
    text(Array.from(el.shadowRoot!.querySelectorAll('.note')).at(-1));

  it('asks for this room’s feedback', async () => {
    const callWS = vi.fn().mockResolvedValue({ entries: [] });
    await diagnostics(makeHass({}, callWS));
    expect(callWS).toHaveBeenCalledTimes(1);
    expect(callWS).toHaveBeenCalledWith({ type: 'comfort_band/get_feedback', zone: 'gym' });
  });

  it('lists the latest taps, newest first, as the Now tab words them', async () => {
    const callWS = vi.fn().mockResolvedValue({
      entries: [
        entry(30, { label: 'too_cold', room_temp: 19.2 }),
        entry(5, { label: 'too_hot', room_temp: 23.4, low: 20, high: 23, peak_state: 'active' }),
        entry(1, { room_temp: null, room_source: 'none' }),
        entry(0.5, { room_source: 'climate', peak_state: 'preconditioning' }),
      ],
    });
    const el = await diagnostics(makeHass({}, callWS));
    await settle(el);
    expect(items(el)).toEqual([
      { said: 'Just right', detail: '21° in 19.5–22.5° · stand-in reading · ahead of a peak' },
      { said: 'Just right', detail: 'no reading, range 19.5–22.5°' },
      { said: 'Too warm', detail: '23.4° in 20–23° · during a peak' },
      { said: 'Too cool', detail: '19.2° in 19.5–22.5°' },
    ]);
  });

  it('says when each was', async () => {
    const callWS = vi.fn().mockResolvedValue({ entries: [entry(30)] });
    const el = await diagnostics(makeHass({}, callWS));
    await settle(el);
    expect(text(el.shadowRoot!.querySelector('li .detail'))).toMatch(
      /^(yesterday|\w{3}) \d\d:\d\d · /,
    );
  });

  it(`shows the last ${FEEDBACK_SHOWN}, and says how many there are`, async () => {
    const entries = Array.from({ length: 14 }, (_, i) => entry(14 - i, { room_temp: 10 + i }));
    const el = await diagnostics(makeHass({}, vi.fn().mockResolvedValue({ entries })));
    await settle(el);
    const shown = items(el);
    expect(shown).toHaveLength(10);
    expect(shown[0].detail).toBe('23° in 19.5–22.5°');
    expect(shown[9].detail).toBe('14° in 19.5–22.5°');
    expect(lastNote(el)).toBe('The last 10 of 14.');
  });

  it('says there’s none yet, and where it comes from', async () => {
    const el = await diagnostics();
    await settle(el);
    expect(lastNote(el)).toBe('None yet. Taps on “How does it feel?” on the Now tab show here.');
  });

  it('says it’s loading meanwhile', async () => {
    const el = await diagnostics(makeHass({}, vi.fn().mockReturnValue(new Promise(() => {}))));
    expect(lastNote(el)).toBe('Loading…');
  });

  // HA's frontend rejects with {code, message}.
  it('says what it needs from an integration without it, or that it can’t load', async () => {
    const old = await diagnostics(
      makeHass({}, vi.fn().mockRejectedValue({ code: 'unknown_command', message: 'Unknown' })),
    );
    await settle(old);
    expect(lastNote(old)).toBe('Feedback needs the comfort_band integration v0.11.0 or later.');
    old.remove();
    const failed = await diagnostics(
      makeHass({}, vi.fn().mockRejectedValue({ code: 'zone_not_found', message: 'No' })),
    );
    await settle(failed);
    expect(lastNote(failed)).toBe('Feedback can’t be loaded right now.');
  });

  it('ignores the first room’s late refusal once asked for another', async () => {
    let refuse: (e: unknown) => void = () => {};
    const callWS = vi
      .fn()
      .mockImplementationOnce(() => new Promise((_, r) => (refuse = r)))
      .mockResolvedValue({ entries: [entry(1, { label: 'too_hot' })] });
    const el = await diagnostics(makeHass({}, callWS));
    el.zone = 'office';
    await settle(el);
    refuse({ code: 'unknown_command', message: 'Unknown' });
    await settle(el);
    expect(items(el).map((i) => i.said)).toEqual(['Too warm']);
  });

  it('lets the rates’ numbers scroll by keyboard, in their own named box', async () => {
    const el = await diagnostics();
    const wrap = el.shadowRoot!.querySelector('.table-wrap')!;
    expect([
      wrap.getAttribute('tabindex'),
      wrap.getAttribute('role'),
      wrap.getAttribute('aria-label'),
    ]).toEqual(['0', 'region', 'The rates in numbers']);
  });

  it('asks once, and again for another room, ignoring the first room’s late answer', async () => {
    let answer: (v: unknown) => void = () => {};
    const callWS = vi
      .fn()
      .mockImplementationOnce(() => new Promise((r) => (answer = r)))
      .mockResolvedValue({ entries: [entry(1, { label: 'too_hot' })] });
    const el = await diagnostics(makeHass({}, callWS));
    el.hass = makeHass({}, callWS);
    await el.updateComplete;
    expect(callWS).toHaveBeenCalledTimes(1);
    el.zone = 'office';
    await settle(el);
    expect(callWS).toHaveBeenLastCalledWith({ type: 'comfort_band/get_feedback', zone: 'office' });
    answer({ entries: [entry(1, { label: 'too_cold' })] });
    await settle(el);
    expect(items(el).map((i) => i.said)).toEqual(['Too warm']);
  });
});
