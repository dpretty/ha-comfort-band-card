import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/settings-tab.js';
import type { ComfortBandSettingsTab } from '../src/tabs/settings-tab.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

afterEach(teardown);

function makeEntities(zone = 'gym', overrides: Partial<ZoneEntities> = {}): ZoneEntities {
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
    ...overrides,
  };
}

function makeHass(
  overrides: {
    states?: Record<string, { state: string; attributes?: Record<string, unknown> }>;
    callServiceImpl?: ReturnType<typeof vi.fn>;
  } = {},
): HomeAssistant {
  const defaults: Record<string, { state: string; attributes?: Record<string, unknown> }> = {
    'sensor.gym_room_temperature': { state: '21.0', attributes: { humidity_sensor: null } },
    'sensor.gym_apparent_temperature': { state: '21.0', attributes: {} },
    'switch.gym_learning_enabled': { state: 'off', attributes: {} },
    'switch.gym_use_apparent_temperature': { state: 'off', attributes: {} },
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
  entities = makeEntities(),
  zone = 'gym',
): Promise<ComfortBandSettingsTab> {
  return mount('comfort-band-settings-tab', { hass, entities, zone });
}

describe('comfort-band-settings-tab', () => {
  it('renders both toggles reflecting current entity state', async () => {
    const el = await settingsTab(
      makeHass({
        states: {
          'switch.gym_learning_enabled': { state: 'on' },
          'switch.gym_use_apparent_temperature': { state: 'off' },
        },
      }),
    );
    const toggles = el.shadowRoot!.querySelectorAll('button[role="switch"]');
    expect(toggles.length).toBe(2);
    // Order: use_apparent first, learning second (matches render order).
    expect(toggles[0].getAttribute('aria-checked')).toBe('false');
    expect(toggles[1].getAttribute('aria-checked')).toBe('true');
  });

  it('clicking a toggle calls switch.turn_on with the right entity_id', async () => {
    const hass = makeHass();
    const el = await settingsTab(hass);
    // The first toggle is "Use apparent temperature".
    const toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('button[role="switch"]')!;
    toggle.click();
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_on', {
      entity_id: 'switch.gym_use_apparent_temperature',
    });
  });

  it('clicking an ON toggle calls switch.turn_off', async () => {
    const hass = makeHass({
      states: {
        'switch.gym_use_apparent_temperature': { state: 'on' },
      },
    });
    const el = await settingsTab(hass);
    const toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('button[role="switch"]')!;
    toggle.click();
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_off', {
      entity_id: 'switch.gym_use_apparent_temperature',
    });
  });

  it('optimistically flips immediately and rolls back on service rejection', async () => {
    const rejectingCall = vi.fn().mockRejectedValueOnce(new Error('Backend down'));
    const hass = makeHass({ callServiceImpl: rejectingCall });
    const el = await settingsTab(hass);
    const toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('button[role="switch"]')!;
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    toggle.click();
    // Wait for the catch + re-render to settle.
    await el.updateComplete;
    await el.updateComplete;
    // Toggle is back off after rollback.
    const after = el.shadowRoot!.querySelector<HTMLButtonElement>('button[role="switch"]')!;
    expect(after.getAttribute('aria-checked')).toBe('false');
    // Error displayed to the user.
    expect(el.shadowRoot!.querySelector('[role="alert"]')!.textContent).toContain('Backend down');
  });

  it('shows the configured humidity sensor entity_id', async () => {
    const el = await settingsTab(
      makeHass({
        states: {
          'sensor.gym_room_temperature': {
            state: '21.0',
            attributes: { humidity_sensor: 'sensor.gym_humidity' },
          },
        },
      }),
    );
    const info = el.shadowRoot!.querySelector('.info-value');
    expect(info!.textContent).toContain('sensor.gym_humidity');
    expect(info!.classList.contains('unconfigured')).toBe(false);
  });

  it('shows a "Not configured" hint when no humidity sensor is set', async () => {
    const el = await settingsTab(makeHass());
    const info = el.shadowRoot!.querySelector('.info-value');
    expect(info!.textContent).toContain('Not configured');
    expect(info!.classList.contains('unconfigured')).toBe(true);
  });

  it('reflects updated entity state when hass property is reassigned', async () => {
    // Simulates a state push from HA: the parent re-assigns `hass` with
    // an updated entity state. Without Lit's `@property` reactivity
    // working, the toggle would render the stale value.
    const hass1 = makeHass({
      states: { 'switch.gym_use_apparent_temperature': { state: 'off' } },
    });
    const el = await settingsTab(hass1);
    let toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('button[role="switch"]')!;
    expect(toggle.getAttribute('aria-checked')).toBe('false');

    const hass2 = makeHass({
      states: { 'switch.gym_use_apparent_temperature': { state: 'on' } },
    });
    el.hass = hass2;
    await el.updateComplete;
    toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('button[role="switch"]')!;
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  it('toggle button is aria-disabled and ignores clicks while a call is in flight', async () => {
    // Use a callService that never resolves so the optimistic-flip state
    // sticks. We can't synchronously inspect the post-click attribute
    // because Lit hasn't re-rendered yet — await one tick.
    let resolveCall: () => void = () => {};
    const slowCall = vi
      .fn()
      .mockImplementation(() => new Promise<void>((resolve) => (resolveCall = resolve)));
    const hass = makeHass({ callServiceImpl: slowCall });
    const el = await settingsTab(hass);
    const toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('button[role="switch"]')!;
    toggle.click();
    await el.updateComplete;
    const after = el.shadowRoot!.querySelector<HTMLButtonElement>('button[role="switch"]')!;
    expect(after.getAttribute('aria-disabled')).toBe('true');
    // A second click while disabled must not dispatch another service call.
    after.click();
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledTimes(1);
    // Resolve the pending call so the test cleans up without dangling.
    resolveCall();
  });

  it('falls back to an upgrade hint on pre-v0.4 integrations (no new switches)', async () => {
    const entities = makeEntities('gym', {
      learningEnabled: null,
      useApparentTemperature: null,
    });
    const el = await settingsTab(makeHass(), entities);
    expect(el.shadowRoot!.querySelector('button[role="switch"]')).toBeNull();
    expect(el.shadowRoot!.querySelector('.upgrade-hint')!.textContent).toContain('v0.4.0');
  });
});
