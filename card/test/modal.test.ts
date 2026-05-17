import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import '../src/modal.js';
import type { ComfortBandModal } from '../src/modal.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

// happy-dom doesn't implement `<dialog>.showModal()`. The modal's `open()`
// method calls it inside a `then()` so the rejection is unhandled rather
// than blocking the render — but it still pollutes test output and could
// flag as an unhandled-promise warning. Stub it to a no-op for the suite.
beforeAll(() => {
  const proto = window.HTMLDialogElement?.prototype as
    | (HTMLDialogElement & { showModal?: () => void })
    | undefined;
  if (proto && typeof proto.showModal !== 'function') {
    proto.showModal = function () {};
  }
  const closeProto = window.HTMLDialogElement?.prototype as
    | (HTMLDialogElement & { close?: () => void })
    | undefined;
  if (closeProto && typeof closeProto.close !== 'function') {
    closeProto.close = function () {};
  }
});

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

function makeHass(): HomeAssistant {
  return {
    states: {},
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn().mockResolvedValue(undefined),
  };
}

async function openModal(): Promise<ComfortBandModal> {
  const el = await mount('comfort-band-modal', {
    hass: makeHass(),
    zone: 'gym',
    zoneName: 'Gym',
    entities: makeEntities(),
  });
  el.open();
  await el.updateComplete;
  return el;
}

function getTabs(el: ComfortBandModal): HTMLButtonElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>('button[role="tab"]'));
}

function getPanel(el: ComfortBandModal): HTMLElement {
  return el.shadowRoot!.querySelector<HTMLElement>('[role="tabpanel"]')!;
}

async function pressKey(el: ComfortBandModal, key: string): Promise<void> {
  // The keydown handler is on the <nav role="tablist">, so dispatch from
  // there — matches the real event flow (button focus bubbles to nav).
  const nav = el.shadowRoot!.querySelector('nav[role="tablist"]')!;
  nav.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  await el.updateComplete;
  // A second tick for the post-update focus-management promise to settle.
  await el.updateComplete;
}

describe('comfort-band-modal tab a11y', () => {
  it('wires every tab button with id, role, aria-controls, and a roving tabindex', async () => {
    const el = await openModal();
    const tabs = getTabs(el);
    expect(tabs.length).toBe(5); // now / schedule / profiles / settings / insights
    const expectedIds = [
      'cb-tab-now',
      'cb-tab-schedule',
      'cb-tab-profiles',
      'cb-tab-settings',
      'cb-tab-insights',
    ];
    tabs.forEach((tab, i) => {
      expect(tab.id).toBe(expectedIds[i]);
      expect(tab.getAttribute('aria-controls')).toBe('cb-panel');
    });
    // Roving tabindex: only the active tab is in the tab order.
    expect(tabs[0].getAttribute('tabindex')).toBe('0');
    tabs.slice(1).forEach((tab) => {
      expect(tab.getAttribute('tabindex')).toBe('-1');
    });
  });

  it('wires the tabpanel with id and aria-labelledby pointing at the active tab', async () => {
    const el = await openModal();
    const panel = getPanel(el);
    expect(panel.id).toBe('cb-panel');
    expect(panel.getAttribute('aria-labelledby')).toBe('cb-tab-now');
  });

  it('updates aria-labelledby when the active tab changes', async () => {
    const el = await openModal();
    el.selectTab('schedule');
    await el.updateComplete;
    expect(getPanel(el).getAttribute('aria-labelledby')).toBe('cb-tab-schedule');
  });

  it('ArrowRight moves selection to the next tab and focuses it', async () => {
    const el = await openModal();
    getTabs(el)[0].focus();
    await pressKey(el, 'ArrowRight');
    const tabs = getTabs(el);
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('tabindex')).toBe('0');
    expect(tabs[0].getAttribute('tabindex')).toBe('-1');
    expect(el.shadowRoot!.activeElement).toBe(tabs[1]);
  });

  it('ArrowLeft on the first tab wraps to the last', async () => {
    const el = await openModal();
    await pressKey(el, 'ArrowLeft');
    const tabs = getTabs(el);
    expect(tabs[tabs.length - 1].getAttribute('aria-selected')).toBe('true');
    expect(el.shadowRoot!.activeElement).toBe(tabs[tabs.length - 1]);
  });

  it('ArrowRight on the last tab wraps to the first', async () => {
    const el = await openModal();
    el.selectTab('insights');
    await el.updateComplete;
    await pressKey(el, 'ArrowRight');
    const tabs = getTabs(el);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(el.shadowRoot!.activeElement).toBe(tabs[0]);
  });

  it('Home jumps to the first tab', async () => {
    const el = await openModal();
    el.selectTab('insights');
    await el.updateComplete;
    await pressKey(el, 'Home');
    expect(getTabs(el)[0].getAttribute('aria-selected')).toBe('true');
  });

  it('End jumps to the last tab', async () => {
    const el = await openModal();
    await pressKey(el, 'End');
    const tabs = getTabs(el);
    expect(tabs[tabs.length - 1].getAttribute('aria-selected')).toBe('true');
  });

  it('ignores non-navigation keys (Tab, Enter, Space, letters)', async () => {
    const el = await openModal();
    const before = getTabs(el).find((t) => t.getAttribute('aria-selected') === 'true')!.id;
    for (const key of ['Tab', 'Enter', ' ', 'a', 'ArrowUp', 'ArrowDown']) {
      await pressKey(el, key);
    }
    const after = getTabs(el).find((t) => t.getAttribute('aria-selected') === 'true')!.id;
    expect(after).toBe(before);
  });
});
