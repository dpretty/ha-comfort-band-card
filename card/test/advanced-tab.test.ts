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
      { id: 'comfort', name: 'Comfort', summary: '“Feels like” on', open: false },
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
      '“Feels like” off',
      'Learning on',
      'Profile: home',
      'Last 24 hours',
    ]);
  });

  // As the section says: a manager that's there but can't be read isn't
  // "none set up". A disabled select drops out of hass.entities; its device
  // stays.
  it("says profiles aren't available where a manager exists but can't be read", async () => {
    const disabled = makeHass({}, { profile: 'home' });
    disabled.entities = {};
    const el = await advancedTab(disabled);
    expect(sections(el)[2].summary).toBe('Not available right now');
    el.remove();
    const unloaded = makeHass({}, { profile: 'home' });
    delete unloaded.states['select.comfort_band_profiles_active_profile'];
    const el2 = await advancedTab(unloaded);
    expect(sections(el2)[2].summary).toBe('Not available right now');
  });

  it("doesn't name a profile while the select says unknown", async () => {
    const el = await advancedTab(makeHass({}, { profile: 'unknown' }));
    expect(sections(el)[2].summary).toBeNull();
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
    // A select left "unavailable" (its entry failed to load or is
    // reloading) isn't readable: the section says profiles aren't available.
    expect(sections(el).map((s) => s.summary)).toEqual([
      null,
      null,
      'Not available right now',
      'Last 24 hours',
    ]);
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

  // Without these, a section is blank or the slider silently sends nothing.
  it('hands each section what it needs', async () => {
    const hass = makeHass();
    const el = await advancedTab(hass);
    const entities = (el as unknown as { entities: ZoneEntities }).entities;
    type Child = HTMLElement & { hass?: HomeAssistant; zone?: string; entities?: ZoneEntities };
    for (const selector of [
      'details[data-section="comfort"] comfort-band-settings-tab',
      'details[data-section="comfort"] comfort-band-exact-range',
      'details[data-section="automation"] comfort-band-settings-tab',
    ]) {
      const child = el.shadowRoot!.querySelector(selector) as Child;
      expect([child.hass, child.zone, child.entities], selector).toEqual([hass, 'gym', entities]);
    }
    const profiles = el.shadowRoot!.querySelector('comfort-band-profiles-tab') as Child;
    expect(profiles.hass).toBe(hass);
    await setOpen(el, 'history', true);
    const charts = el.shadowRoot!.querySelector('comfort-band-insights-tab') as Child;
    expect([charts.hass, charts.entities]).toEqual([hass, entities]);
  });

  // The charts subscribe to HA's history.
  // Only History's own opening and closing count.
  it("doesn't load or drop the history chart when another section opens or closes", async () => {
    const el = await advancedTab();
    const charts = () => section(el, 'history').querySelector('comfort-band-insights-tab');
    await setOpen(el, 'comfort', true);
    expect(charts()).toBeNull();
    await setOpen(el, 'history', true);
    await setOpen(el, 'comfort', false);
    expect(charts()).not.toBeNull();
  });

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

  // A long summary wraps beside the chevron, under the section's name.
  it('wraps a long summary with the name, beside the chevron', async () => {
    const el = await advancedTab();
    const summary = el.shadowRoot!.querySelector('summary')!;
    expect(summary.children).toHaveLength(1);
    expect(summary.firstElementChild!.className).toBe('label');
    expect(Array.from(summary.firstElementChild!.children).map((c) => c.className)).toEqual([
      'name',
      'summary',
    ]);
    const css = (
      customElements.get('comfort-band-advanced-tab') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    expect(css).toMatch(/\.label\s*\{[^}]*flex-wrap:\s*wrap/);
    expect(css).toMatch(/\.summary\s*\{[^}]*overflow-wrap:\s*anywhere/);
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
    // Without these, some engines would draw their own marker as well.
    expect(css).toMatch(/summary\s*\{[^}]*list-style:\s*none/);
    expect(css).toMatch(/summary::-webkit-details-marker\s*\{[^}]*display:\s*none/);
    expect(css).toMatch(/summary:focus-visible\s*\{[^}]*outline:/);
    expect(css).toMatch(/details\[open\]\s*>\s*summary::before\s*\{[^}]*rotate\(45deg\)/);
  });
});
