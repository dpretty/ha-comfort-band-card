import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/advanced-tab.js';
import type { ComfortBandAdvancedTab } from '../src/tabs/advanced-tab.js';
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
  states: Record<string, string> = {},
  opts: { profile?: string | null } = {},
): HomeAssistant {
  const all: Record<string, string> = {
    'sensor.gym_effective_low': '19.5',
    'sensor.gym_effective_high': '22.5',
    'sensor.gym_room_temperature': '21.0',
    'switch.gym_use_apparent_temperature': 'on',
    'switch.gym_learning_enabled': 'off',
    ...states,
  };
  const profile = opts.profile === undefined ? null : opts.profile;
  if (profile !== null) all['select.comfort_band_profiles_active_profile'] = profile;
  return {
    states: Object.fromEntries(
      Object.entries(all).map(([k, v]) => [
        k,
        { entity_id: k, state: v, attributes: {}, last_changed: '', last_updated: '' },
      ]),
    ),
    devices:
      profile !== null
        ? {
            'dev-pm': {
              id: 'dev-pm',
              identifiers: [['comfort_band', 'profile_manager']],
              name: 'Comfort Band Profiles',
              name_by_user: null,
              area_id: null,
            },
          }
        : {},
    entities:
      profile !== null
        ? {
            'select.comfort_band_profiles_active_profile': {
              entity_id: 'select.comfort_band_profiles_active_profile',
              platform: 'comfort_band',
              device_id: 'dev-pm',
              area_id: null,
              hidden: false,
              entity_category: null,
              translation_key: 'active_profile',
              name: null,
            },
          }
        : {},
    connection: stubConnection(),
    callService: vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn().mockResolvedValue(undefined),
  };
}

async function advancedTab(hass = makeHass()): Promise<ComfortBandAdvancedTab> {
  return mount('comfort-band-advanced-tab', { hass, entities: makeEntities(), zone: 'gym' });
}

function sections(el: ComfortBandAdvancedTab) {
  return Array.from(el.shadowRoot!.querySelectorAll('details')).map((d) => ({
    id: d.getAttribute('data-section'),
    name: d.querySelector('summary .name')!.textContent!.trim(),
    summary: d.querySelector('summary .summary')?.textContent!.trim() ?? null,
    open: d.open,
  }));
}

function section(el: ComfortBandAdvancedTab, id: string): HTMLDetailsElement {
  return el.shadowRoot!.querySelector(`details[data-section="${id}"]`) as HTMLDetailsElement;
}

async function setOpen(el: ComfortBandAdvancedTab, id: string, open: boolean): Promise<void> {
  const d = section(el, id);
  d.open = open;
  d.dispatchEvent(new Event('toggle'));
  await el.updateComplete;
}

describe('comfort-band-advanced-tab', () => {
  it('folds its sections away, each with a summary of what is inside', async () => {
    const el = await advancedTab();
    expect(sections(el)).toEqual([
      { id: 'comfort', name: 'Comfort', summary: 'Going by “feels like”', open: false },
      { id: 'automation', name: 'Automation', summary: 'Learning off', open: false },
      { id: 'schedules', name: 'Schedules', summary: 'No profiles set up', open: false },
      { id: 'history', name: 'History', summary: 'Last 24 hours', open: false },
    ]);
  });

  it('sums up the other states of each setting', async () => {
    const el = await advancedTab(
      makeHass(
        { 'switch.gym_use_apparent_temperature': 'off', 'switch.gym_learning_enabled': 'on' },
        { profile: 'home' },
      ),
    );
    expect(sections(el).map((s) => s.summary)).toEqual([
      'Going by the room’s reading',
      'Learning on',
      'Profile: home',
      'Last 24 hours',
    ]);
  });

  it("says nothing it can't read", async () => {
    const el = await advancedTab(
      makeHass(
        {
          'switch.gym_use_apparent_temperature': 'unavailable',
          'switch.gym_learning_enabled': 'unavailable',
        },
        { profile: 'unavailable' },
      ),
    );
    expect(sections(el).map((s) => s.summary)).toEqual([null, null, null, 'Last 24 hours']);
  });

  it('puts "feels like", the humidity sensor and the exact range under Comfort', async () => {
    const el = await advancedTab();
    const comfort = section(el, 'comfort');
    const settings = comfort.querySelector('comfort-band-settings-tab') as HTMLElement & {
      section: string;
    };
    expect(settings.section).toBe('comfort');
    expect(comfort.querySelector('comfort-band-exact-range')).not.toBeNull();
  });

  it('puts learning under Automation and profiles under Schedules', async () => {
    const el = await advancedTab();
    const automation = section(el, 'automation').querySelector(
      'comfort-band-settings-tab',
    ) as HTMLElement & { section: string };
    expect(automation.section).toBe('automation');
    expect(section(el, 'schedules').querySelector('comfort-band-profiles-tab')).not.toBeNull();
  });

  // The charts subscribe to HA's history.
  it('loads the history charts only while History is open', async () => {
    const el = await advancedTab();
    const charts = () => section(el, 'history').querySelector('comfort-band-insights-tab');
    expect(charts()).toBeNull();
    await setOpen(el, 'history', true);
    expect(charts()).not.toBeNull();
    await setOpen(el, 'history', false);
    expect(charts()).toBeNull();
  });

  it('gives each heading a 44px touch target', () => {
    const css = (
      customElements.get('comfort-band-advanced-tab') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    expect(css).toMatch(/summary\s*\{[^}]*min-height:\s*44px/);
  });

  // A flex summary loses the browser's own marker.
  it('marks each heading as one that opens, turning when it does', () => {
    const css = (
      customElements.get('comfort-band-advanced-tab') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    expect(css).toMatch(/summary::before\s*\{[^}]*rotate\(-45deg\)/);
    expect(css).toMatch(/details\[open\]\s*>\s*summary::before\s*\{[^}]*rotate\(45deg\)/);
  });
});
