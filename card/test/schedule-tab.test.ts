import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/schedule-tab.js';
import type { ComfortBandScheduleTab } from '../src/tabs/schedule-tab.js';
import type {
  HassConnection,
  HomeAssistant,
  ProfileSchedule,
  Transition,
  UnsubscribeFunc,
} from '../src/types.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

interface FakeHassOptions {
  initialSchedule?: ProfileSchedule | null;
  active?: string;
}

interface FakeHass {
  hass: HomeAssistant;
  subscribeMessage: ReturnType<typeof vi.fn>;
  pushUpdate: (schedule: ProfileSchedule | null) => void;
  unsub: ReturnType<typeof vi.fn>;
}

function makeHass(opts: FakeHassOptions = {}): FakeHass {
  let stored: ProfileSchedule | null = opts.initialSchedule ?? null;
  let activeCallback: ((event: { schedule: ProfileSchedule | null }) => void) | null = null;

  const unsub = vi.fn(() => {
    activeCallback = null;
  });

  const subscribeMessage = vi.fn(
    async (
      callback: (event: { schedule: ProfileSchedule | null }) => void,
      _msg: { type: string } & Record<string, unknown>,
    ): Promise<UnsubscribeFunc> => {
      activeCallback = callback;
      // Backend sends the initial value immediately after the ack.
      Promise.resolve().then(() => callback({ schedule: stored }));
      return unsub;
    },
  );

  const callService = vi.fn(
    async (_domain: string, service: string, data?: Record<string, unknown>) => {
      if (service === 'set_schedule' && data) {
        stored = {
          baseline: [...((data.transitions as Transition[]) ?? [])],
          current: [...((data.transitions as Transition[]) ?? [])],
        };
        // Echo via the active subscription on a microtask, matching the real
        // backend's async dispatcher → WS frame → client delivery timing.
        Promise.resolve().then(() => activeCallback?.({ schedule: stored }));
      }
    },
  );

  const hass: HomeAssistant = {
    states: {
      'select.comfort_band_profiles_active_profile': {
        entity_id: 'select.comfort_band_profiles_active_profile',
        state: opts.active ?? 'home',
        attributes: { options: ['home', 'away', 'sleep'] },
        last_changed: '',
        last_updated: '',
      },
    },
    devices: {
      'dev-pm': {
        id: 'dev-pm',
        identifiers: [['comfort_band', 'profile_manager']],
        name: 'Comfort Band Profiles',
        name_by_user: null,
        area_id: null,
      },
    },
    entities: {
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
    },
    connection: {
      subscribeMessage: subscribeMessage as unknown as HassConnection['subscribeMessage'],
    },
    callService,
    callWS: vi.fn(),
  };
  return {
    hass,
    subscribeMessage,
    pushUpdate: (schedule) => activeCallback?.({ schedule }),
    unsub,
  };
}

async function tab(hass: HomeAssistant, zone = 'gym'): Promise<ComfortBandScheduleTab> {
  const el = await mount('comfort-band-schedule-tab', { hass, zone });
  // Allow the async subscribe + initial-value microtask to resolve.
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  return el;
}

describe('comfort-band-schedule-tab', () => {
  it('opens a subscription for the active (zone, profile) on mount', async () => {
    const { hass, subscribeMessage } = makeHass();
    await tab(hass);
    expect(subscribeMessage).toHaveBeenCalledTimes(1);
    const [, msg] = subscribeMessage.mock.calls[0];
    expect(msg).toEqual({
      type: 'comfort_band/subscribe_schedule',
      zone: 'gym',
      profile: 'home',
    });
  });

  it('renders transitions delivered by the initial subscription event', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [
          { at: '06:00', low: 20, high: 23 },
          { at: '22:00', low: 18, high: 21 },
        ],
        current: [],
      },
    });
    const el = await tab(hass);
    // Two handles per transition (low + high).
    const handles = el
      .shadowRoot!.querySelector('comfort-band-schedule-chart')!
      .shadowRoot!.querySelectorAll('.handle');
    expect(handles.length).toBe(4);
  });

  it('re-renders when the subscription pushes a live update', async () => {
    const fake = makeHass({
      initialSchedule: { baseline: [], current: [] },
    });
    const el = await tab(fake.hass);
    expect(
      el
        .shadowRoot!.querySelector('comfort-band-schedule-chart')!
        .shadowRoot!.querySelectorAll('.handle').length,
    ).toBe(0);
    // (After the live update we expect 2 handles for the new 1-transition schedule.)

    fake.pushUpdate({
      baseline: [{ at: '07:00', low: 19.5, high: 22.5 }],
      current: [],
    });
    await el.updateComplete;
    // Two handles per transition (low + high).
    expect(
      el
        .shadowRoot!.querySelector('comfort-band-schedule-chart')!
        .shadowRoot!.querySelectorAll('.handle').length,
    ).toBe(2);
  });

  it('handles a null schedule (zone has no profile schedule yet) without error', async () => {
    const { hass } = makeHass({ initialSchedule: null });
    const el = await tab(hass);
    expect(el.shadowRoot!.textContent).not.toContain('Failed');
    const editor = el.shadowRoot!.querySelector('comfort-band-schedule-chart');
    expect(editor).not.toBeNull();
  });

  it('persists deletions via comfort_band.set_schedule (no extra get_schedule call)', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [
          { at: '06:00', low: 20, high: 23 },
          { at: '22:00', low: 18, high: 21 },
        ],
        current: [],
      },
    });
    const el = await tab(hass);
    const editor = el.shadowRoot!.querySelector('comfort-band-schedule-chart')!;
    editor.dispatchEvent(
      new CustomEvent('transition-delete', {
        detail: { at: '22:00' },
        bubbles: true,
        composed: true,
      }),
    );
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'home',
      transitions: [{ at: '06:00', low: 20, high: 23 }],
    });
    expect(hass.callWS).not.toHaveBeenCalled();
  });

  it('persists a drag-update via comfort_band.set_schedule', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [
          { at: '06:00', low: 20, high: 23 },
          { at: '22:00', low: 18, high: 21 },
        ],
        current: [],
      },
    });
    const el = await tab(hass);
    const chartEl = el.shadowRoot!.querySelector('comfort-band-schedule-chart')!;
    chartEl.dispatchEvent(
      new CustomEvent('transition-update', {
        detail: {
          oldAt: '06:00',
          transition: { at: '06:15', low: 20.5, high: 23 },
        },
        bubbles: true,
        composed: true,
      }),
    );
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'home',
      transitions: [
        { at: '06:15', low: 20.5, high: 23 },
        { at: '22:00', low: 18, high: 21 },
      ],
    });
  });

  // The chart's own clamp prevents a drag from ever firing this exact event
  // (it would clamp `at` to a non-collision slot), but the schedule-tab's
  // collision drop has to be tolerant in case a YAML automation or future
  // call path bypasses the chart. Test the tab's logic via a synthetic event.
  it('drops a collision when a drag-update lands on another transition at', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [
          { at: '06:00', low: 20, high: 23 },
          { at: '08:00', low: 19, high: 22 },
        ],
        current: [],
      },
    });
    const el = await tab(hass);
    const chartEl = el.shadowRoot!.querySelector('comfort-band-schedule-chart')!;
    chartEl.dispatchEvent(
      new CustomEvent('transition-update', {
        detail: {
          oldAt: '06:00',
          transition: { at: '08:00', low: 21, high: 24 },
        },
        bubbles: true,
        composed: true,
      }),
    );
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'home',
      transitions: [{ at: '08:00', low: 21, high: 24 }],
    });
  });

  it('opens the dialog on transition-edit then persists the new values on save', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(hass);

    const editor = el.shadowRoot!.querySelector('comfort-band-schedule-chart')!;
    editor.dispatchEvent(
      new CustomEvent('transition-edit', {
        detail: { transition: { at: '06:00', low: 20, high: 23 } },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    const dlg = el.shadowRoot!.querySelector('transition-edit-dialog');
    expect(dlg).not.toBeNull();

    dlg!.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { transition: { at: '06:00', low: 20, high: 23.5 } },
        bubbles: true,
        composed: true,
      }),
    );
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'home',
      transitions: [{ at: '06:00', low: 20, high: 23.5 }],
    });
  });

  it('opens the add dialog on transition-add and persists the new transition on save', async () => {
    const { hass } = makeHass({ initialSchedule: null });
    const el = await tab(hass);

    const editor1 = el.shadowRoot!.querySelector('comfort-band-schedule-chart')!;
    editor1.dispatchEvent(
      new CustomEvent('transition-add', {
        detail: { at: '07:00' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    const dlg1 = el.shadowRoot!.querySelector('transition-edit-dialog');
    expect(dlg1).not.toBeNull();

    dlg1!.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { transition: { at: '07:00', low: 19, high: 22 } },
        bubbles: true,
        composed: true,
      }),
    );
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'home',
      transitions: [{ at: '07:00', low: 19, high: 22 }],
    });
  });

  it('cancel returns to the list mode without writing', async () => {
    const { hass } = makeHass({ initialSchedule: null });
    const el = await tab(hass);
    const editor2 = el.shadowRoot!.querySelector('comfort-band-schedule-chart')!;
    editor2.dispatchEvent(
      new CustomEvent('transition-add', {
        detail: { at: '08:00' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    const dlg2 = el.shadowRoot!.querySelector('transition-edit-dialog')!;
    dlg2.dispatchEvent(new CustomEvent('dialog-cancel', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('transition-edit-dialog')).toBeNull();
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('resubscribes when the active profile flips', async () => {
    const fake = makeHass({ active: 'home', initialSchedule: null });
    const el = await tab(fake.hass);
    expect(fake.subscribeMessage).toHaveBeenCalledTimes(1);
    expect(fake.unsub).not.toHaveBeenCalled();

    // Simulate a profile flip via the existing hass-prop pattern.
    fake.hass.states['select.comfort_band_profiles_active_profile'] = {
      ...fake.hass.states['select.comfort_band_profiles_active_profile'],
      state: 'away',
    };
    el.hass = { ...fake.hass };
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    expect(fake.unsub).toHaveBeenCalledTimes(1);
    expect(fake.subscribeMessage).toHaveBeenCalledTimes(2);
    const [, msg] = fake.subscribeMessage.mock.calls[1];
    expect(msg).toMatchObject({ zone: 'gym', profile: 'away' });
  });

  it('keeps the editor visible (no .loading flash) across a profile flip', async () => {
    // Stale data is in place when the flip happens — we must NOT drop back
    // to the "Loading schedule…" placeholder while the new subscription
    // resolves; that would be a visible flash.
    const fake = makeHass({
      active: 'home',
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(fake.hass);
    expect(el.shadowRoot!.querySelector('.loading')).toBeNull();

    fake.hass.states['select.comfort_band_profiles_active_profile'] = {
      ...fake.hass.states['select.comfort_band_profiles_active_profile'],
      state: 'away',
    };
    el.hass = { ...fake.hass };
    await el.updateComplete;

    // Before any new initial event arrives we should still see the editor,
    // not the loading placeholder.
    expect(el.shadowRoot!.querySelector('.loading')).toBeNull();
    expect(el.shadowRoot!.querySelector('comfort-band-schedule-chart')).not.toBeNull();
  });

  it('unsubscribes when the element is removed from the DOM', async () => {
    const fake = makeHass();
    const el = await tab(fake.hass);
    expect(fake.unsub).not.toHaveBeenCalled();
    el.remove();
    expect(fake.unsub).toHaveBeenCalledTimes(1);
  });

  it('re-subscribes when reattached to the DOM after a disconnect', async () => {
    const fake = makeHass();
    const el = await tab(fake.hass);
    expect(fake.subscribeMessage).toHaveBeenCalledTimes(1);

    el.remove();
    expect(fake.unsub).toHaveBeenCalledTimes(1);

    document.body.appendChild(el);
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    expect(fake.subscribeMessage).toHaveBeenCalledTimes(2);
  });

  it('does not flash the loading state on DOM reattach when stale data exists', async () => {
    const fake = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(fake.hass);
    expect(el.shadowRoot!.querySelector('.loading')).toBeNull();

    el.remove();
    document.body.appendChild(el);
    // No microtask gap: the user perceives the in-between frame.
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('.loading')).toBeNull();
    expect(el.shadowRoot!.querySelector('comfort-band-schedule-chart')).not.toBeNull();
  });

  it('preserves already-rendered transitions when a re-subscribe errors', async () => {
    const subscribeMessage = vi
      .fn()
      .mockImplementationOnce(async (cb: (event: { schedule: ProfileSchedule | null }) => void) => {
        // First subscribe: succeed with initial data.
        Promise.resolve().then(() =>
          cb({
            schedule: {
              baseline: [{ at: '06:00', low: 20, high: 23 }],
              current: [],
            },
          }),
        );
        return () => {};
      })
      .mockRejectedValueOnce(new Error('network down'));

    const hass: HomeAssistant = {
      states: {
        'select.comfort_band_profiles_active_profile': {
          entity_id: 'select.comfort_band_profiles_active_profile',
          state: 'home',
          attributes: { options: ['home', 'away', 'sleep'] },
          last_changed: '',
          last_updated: '',
        },
      },
      devices: {
        'dev-pm': {
          id: 'dev-pm',
          identifiers: [['comfort_band', 'profile_manager']],
          name: 'Comfort Band Profiles',
          name_by_user: null,
          area_id: null,
        },
      },
      entities: {
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
      },
      connection: {
        subscribeMessage: subscribeMessage as unknown as HassConnection['subscribeMessage'],
      },
      callService: vi.fn(),
      callWS: vi.fn(),
    };

    const el = await mount('comfort-band-schedule-tab', { hass, zone: 'gym' });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    // First subscribe delivered one transition → two handles (low + high).
    expect(
      el
        .shadowRoot!.querySelector('comfort-band-schedule-chart')!
        .shadowRoot!.querySelectorAll('.handle').length,
    ).toBe(2);

    // Flip the profile so the second (failing) subscribe runs.
    hass.states['select.comfort_band_profiles_active_profile'] = {
      ...hass.states['select.comfort_band_profiles_active_profile'],
      state: 'away',
    };
    el.hass = { ...hass };
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    // Error overlay replaces the editor (existing render contract), but
    // the underlying _transitions are preserved so the next successful
    // subscribe can render them again without a wipe-and-refetch.
    const errorDiv = el.shadowRoot!.querySelector('.error');
    expect(errorDiv).not.toBeNull();
    expect(errorDiv!.textContent).toContain('network down');
  });

  it('surfaces a subscribe error in the UI', async () => {
    const subscribeMessage = vi.fn().mockRejectedValue(new Error('boom: zone not found'));
    const hass: HomeAssistant = {
      states: {
        'select.comfort_band_profiles_active_profile': {
          entity_id: 'select.comfort_band_profiles_active_profile',
          state: 'home',
          attributes: { options: ['home', 'away', 'sleep'] },
          last_changed: '',
          last_updated: '',
        },
      },
      devices: {
        'dev-pm': {
          id: 'dev-pm',
          identifiers: [['comfort_band', 'profile_manager']],
          name: 'Comfort Band Profiles',
          name_by_user: null,
          area_id: null,
        },
      },
      entities: {
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
      },
      connection: {
        subscribeMessage: subscribeMessage as unknown as HassConnection['subscribeMessage'],
      },
      callService: vi.fn(),
      callWS: vi.fn(),
    };

    const el = await mount('comfort-band-schedule-tab', { hass, zone: 'gym' });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    const errorDiv = el.shadowRoot!.querySelector('.error');
    expect(errorDiv).not.toBeNull();
    expect(errorDiv!.textContent).toContain('boom');
  });

  it('surfaces a save error without clobbering already-rendered transitions', async () => {
    const fake = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    (fake.hass.callService as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('save failed'),
    );
    const el = await tab(fake.hass);

    const editor = el.shadowRoot!.querySelector('comfort-band-schedule-chart')!;
    editor.dispatchEvent(
      new CustomEvent('transition-delete', {
        detail: { at: '06:00' },
        bubbles: true,
        composed: true,
      }),
    );
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    const errorDiv = el.shadowRoot!.querySelector('.error');
    expect(errorDiv).not.toBeNull();
    expect(errorDiv!.textContent).toContain('save failed');
  });

  it('cancels an in-flight subscribe when superseded by a profile flip', async () => {
    let resolveFirst: ((u: UnsubscribeFunc) => void) | null = null;
    const firstUnsub = vi.fn();
    const secondUnsub = vi.fn();

    const subscribeMessage = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<UnsubscribeFunc>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(async () => secondUnsub);

    const hass: HomeAssistant = {
      states: {
        'select.comfort_band_profiles_active_profile': {
          entity_id: 'select.comfort_band_profiles_active_profile',
          state: 'home',
          attributes: { options: ['home', 'away', 'sleep'] },
          last_changed: '',
          last_updated: '',
        },
      },
      devices: {
        'dev-pm': {
          id: 'dev-pm',
          identifiers: [['comfort_band', 'profile_manager']],
          name: 'Comfort Band Profiles',
          name_by_user: null,
          area_id: null,
        },
      },
      entities: {
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
      },
      connection: {
        subscribeMessage: subscribeMessage as unknown as HassConnection['subscribeMessage'],
      },
      callService: vi.fn(),
      callWS: vi.fn(),
    };

    const el = await mount('comfort-band-schedule-tab', { hass, zone: 'gym' });
    // First subscribe is still pending. Trigger a profile flip.
    el.hass = {
      ...hass,
      states: {
        'select.comfort_band_profiles_active_profile': {
          ...hass.states['select.comfort_band_profiles_active_profile'],
          state: 'away',
        },
      },
    };
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));

    expect(subscribeMessage).toHaveBeenCalledTimes(2);
    expect(firstUnsub).not.toHaveBeenCalled();

    // Now resolve the first subscribe with its unsub handle. Because the gen
    // counter has advanced, the subscribe must tear itself down rather than
    // overwriting `_unsub`.
    resolveFirst!(firstUnsub);
    await new Promise((r) => setTimeout(r, 0));

    expect(firstUnsub).toHaveBeenCalledTimes(1);
  });
});
