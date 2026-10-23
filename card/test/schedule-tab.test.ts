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
    // Times as "06:00", whatever the machine's own clock.
    locale: { language: 'en-GB', time_format: '24' },
  };
  return {
    hass,
    subscribeMessage,
    pushUpdate: (schedule) => activeCallback?.({ schedule }),
    unsub,
  };
}

/** Mounts the tab and, unless `edit` is false, presses "Edit schedule" so
 *  the list offers Add, Edit and Delete (#33: it reads first). */
async function tab(
  hass: HomeAssistant,
  zone = 'gym',
  edit = true,
): Promise<ComfortBandScheduleTab> {
  const el = await mount('comfort-band-schedule-tab', { hass, zone });
  // Allow the async subscribe + initial-value microtask to resolve.
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  if (edit) {
    const button = Array.from(
      el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.list-toolbar button'),
    ).find((b) => b.textContent!.trim() === 'Edit schedule');
    button?.click();
    await el.updateComplete;
  }
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
      .shadowRoot!.querySelectorAll('.marker');
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
        .shadowRoot!.querySelectorAll('.marker').length,
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
        .shadowRoot!.querySelectorAll('.marker').length,
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
    // Click Delete on the 22:00 row → inline confirm → Confirm.
    const rows = el.shadowRoot!.querySelectorAll('li.row');
    const targetRow = Array.from(rows).find((r) => r.textContent?.includes('22:00'))!;
    const deleteBtn = targetRow.querySelector<HTMLButtonElement>('button.danger')!;
    deleteBtn.click();
    await el.updateComplete;
    const confirmBtn = el
      .shadowRoot!.querySelector('li.row.confirm')!
      .querySelector<HTMLButtonElement>('button.danger')!;
    confirmBtn.click();
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_schedule', {
      zone: 'gym',
      profile: 'home',
      transitions: [{ at: '06:00', low: 20, high: 23 }],
    });
    expect(hass.callWS).not.toHaveBeenCalled();
  });

  it('persists an edit via the dialog', async () => {
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
    const row = Array.from(el.shadowRoot!.querySelectorAll('li.row')).find((r) =>
      r.textContent?.includes('06:00'),
    )!;
    const editBtn = row.querySelector<HTMLButtonElement>('button.secondary')!;
    editBtn.click();
    await el.updateComplete;

    const dlg = el.shadowRoot!.querySelector('transition-edit-dialog')!;
    dlg.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { transition: { at: '06:15', low: 20.5, high: 23 } },
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

  // A YAML automation or future call path could submit a save that lands on
  // another transition's `at`. The dialog's validator catches user input, but
  // the save handler must also drop the colliding entry defensively.
  it('drops a collision when an edit lands on another transitions at', async () => {
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
    const row = Array.from(el.shadowRoot!.querySelectorAll('li.row')).find((r) =>
      r.textContent?.includes('06:00'),
    )!;
    row.querySelector<HTMLButtonElement>('button.secondary')!.click();
    await el.updateComplete;
    const dlg = el.shadowRoot!.querySelector('transition-edit-dialog')!;
    dlg.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { transition: { at: '08:00', low: 21, high: 24 } },
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

  it('opens the dialog when a row is clicked then persists the new values on save', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(hass);
    const row = el.shadowRoot!.querySelector<HTMLElement>('li.row')!;
    row.click();
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

  it('clicking Add opens the dialog and persists the new transition on save', async () => {
    const { hass } = makeHass({ initialSchedule: null });
    const el = await tab(hass);

    const addBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.list-toolbar button.primary')!;
    expect(addBtn).not.toBeNull();
    addBtn.click();
    await el.updateComplete;
    const dlg = el.shadowRoot!.querySelector('transition-edit-dialog');
    expect(dlg).not.toBeNull();

    dlg!.dispatchEvent(
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

  it('Add seeds the dialog with a sensible default time and last-rows low/high', async () => {
    // Empty schedule → default to 06:00 with 19/22.
    const { hass: hassEmpty } = makeHass({ initialSchedule: null });
    const elEmpty = await tab(hassEmpty);
    elEmpty.shadowRoot!.querySelector<HTMLButtonElement>('.list-toolbar button.primary')!.click();
    await elEmpty.updateComplete;
    const dlgEmpty = elEmpty.shadowRoot!.querySelector('transition-edit-dialog') as HTMLElement & {
      transition: { at: string; low: number; high: number } | null;
    };
    expect(dlgEmpty.transition).toEqual({ at: '06:00', low: 19, high: 22 });

    // Non-empty schedule → default to the next free 15-min slot after the
    // latest entry; low/high copy the latest entry.
    const { hass: hassFull } = makeHass({
      initialSchedule: {
        baseline: [{ at: '22:00', low: 17, high: 21 }],
        current: [],
      },
    });
    const elFull = await tab(hassFull);
    elFull.shadowRoot!.querySelector<HTMLButtonElement>('.list-toolbar button.primary')!.click();
    await elFull.updateComplete;
    const dlgFull = elFull.shadowRoot!.querySelector('transition-edit-dialog') as HTMLElement & {
      transition: { at: string; low: number; high: number } | null;
    };
    expect(dlgFull.transition).toEqual({ at: '22:15', low: 17, high: 21 });
  });

  it('cancel returns to the list mode without writing', async () => {
    const { hass } = makeHass({ initialSchedule: null });
    const el = await tab(hass);
    el.shadowRoot!.querySelector<HTMLButtonElement>('.list-toolbar button.primary')!.click();
    await el.updateComplete;
    const dlg = el.shadowRoot!.querySelector('transition-edit-dialog')!;
    dlg.dispatchEvent(new CustomEvent('dialog-cancel', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('transition-edit-dialog')).toBeNull();
    expect(hass.callService).not.toHaveBeenCalled();
  });

  // ----- v0.9.0: list-first editor -----

  it('shows an inline confirm row when Delete is clicked; Cancel restores the row', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(hass);
    const row = el.shadowRoot!.querySelector('li.row')!;
    const deleteBtn = row.querySelector<HTMLButtonElement>('button.danger')!;
    deleteBtn.click();
    await el.updateComplete;

    const confirm = el.shadowRoot!.querySelector('li.row.confirm');
    expect(confirm).not.toBeNull();
    expect(confirm!.textContent).toContain('Delete the 06:00 change?');
    expect(confirm!.getAttribute('aria-label')).toBe('Delete the 06:00 change?');
    expect(confirm!.getAttribute('role')).toBe('alertdialog');

    // Cancel restores the regular row; no write happened.
    confirm!.querySelector<HTMLButtonElement>('button.secondary')!.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.confirm')).toBeNull();
    expect(el.shadowRoot!.querySelector('li.row')).not.toBeNull();
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('Enter on a focused row opens the edit dialog', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(hass);
    const row = el.shadowRoot!.querySelector<HTMLElement>('li.row')!;
    row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('transition-edit-dialog')).not.toBeNull();
  });

  it('Delete key on a focused row opens the inline confirm', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(hass);
    const row = el.shadowRoot!.querySelector<HTMLElement>('li.row')!;
    row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete', bubbles: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.confirm')).not.toBeNull();
  });

  it('auto-clears the inline confirm if a remote write removes the targeted row', async () => {
    const { hass, pushUpdate } = makeHass({
      initialSchedule: {
        baseline: [
          { at: '06:00', low: 20, high: 23 },
          { at: '22:00', low: 18, high: 21 },
        ],
        current: [],
      },
    });
    const el = await tab(hass);
    // Open confirm on 06:00.
    const row = Array.from(el.shadowRoot!.querySelectorAll('li.row')).find((r) =>
      r.textContent?.includes('06:00'),
    )!;
    row.querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.confirm')).not.toBeNull();

    // Remote write removes 06:00 out from under the open confirm.
    pushUpdate({
      baseline: [{ at: '22:00', low: 18, high: 21 }],
      current: [],
    });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.confirm')).toBeNull();
    // No write side-effect from the stale confirm.
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('shows an empty-state message when there are no transitions', async () => {
    const { hass } = makeHass({ initialSchedule: null });
    const el = await tab(hass);
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent!.trim()).toBe('No changes yet. Use “Add a change” to create one.');
    // The Add button stays visible regardless.
    expect(el.shadowRoot!.querySelector('.list-toolbar button.primary')).not.toBeNull();
  });

  it('Enter on an in-row button does not bubble to open the edit dialog', async () => {
    // Regression guard for the v0.9.0-R3 finding: pressing Enter on the
    // focused Delete button used to bubble to the row's keydown handler,
    // which `preventDefault()`'d the synthetic click — so Delete-key
    // accidentally opened the Edit dialog. Fix: row keydown handler
    // ignores events whose target isn't the row itself.
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(hass);
    const deleteBtn = el
      .shadowRoot!.querySelector('li.row')!
      .querySelector<HTMLButtonElement>('button.danger')!;
    // Dispatch a keydown sourced from the button (target === deleteBtn);
    // the row-level handler must be a no-op so the native click flow
    // owns the Enter→click synthesis.
    deleteBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    // The Edit dialog must NOT have opened from the row keydown handler.
    expect(el.shadowRoot!.querySelector('transition-edit-dialog')).toBeNull();
  });

  it('Escape on the confirm row dismisses it without writing', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(hass);
    el.shadowRoot!.querySelector('li.row')!
      .querySelector<HTMLButtonElement>('button.danger')!
      .click();
    await el.updateComplete;
    const confirm = el.shadowRoot!.querySelector('li.row.confirm')!;
    confirm.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('li.row.confirm')).toBeNull();
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('restores focus to the originating row after Cancel on the confirm', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(hass);
    // Open confirm via the Delete button on the row.
    el.shadowRoot!.querySelector('li.row')!
      .querySelector<HTMLButtonElement>('button.danger')!
      .click();
    await el.updateComplete;
    // Cancel via the confirm row.
    el.shadowRoot!.querySelector('li.row.confirm')!
      .querySelector<HTMLButtonElement>('button.secondary')!
      .click();
    // Two passes: first re-render swaps confirm → row; second microtask
    // runs the deferred `_restoreFocus()` once the new row is mounted.
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    // Focus lands on the row's Delete button (the original trigger).
    const restored = el.shadowRoot!.activeElement;
    expect(restored).not.toBeNull();
    const row = el.shadowRoot!.querySelector<HTMLElement>('li.row[data-at="06:00"]');
    expect(restored).toBe(row!.querySelector('button.danger'));
  });

  it('restores focus to the Add button after dialog cancel from Add flow', async () => {
    const { hass } = makeHass({ initialSchedule: null });
    const el = await tab(hass);
    const addBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.list-toolbar button.primary')!;
    addBtn.click();
    await el.updateComplete;
    const dlg = el.shadowRoot!.querySelector('transition-edit-dialog')!;
    dlg.dispatchEvent(new CustomEvent('dialog-cancel', { bubbles: true, composed: true }));
    await el.updateComplete;
    // _exitDialogMode defers focus restore one microtask to wait for the
    // dialog DOM to be torn down. Advance the queue so the deferred
    // updateComplete-chain resolves and we can observe activeElement.
    await new Promise((r) => setTimeout(r, 0));
    expect(el.shadowRoot!.activeElement).toBe(
      el.shadowRoot!.querySelector('.list-toolbar button.primary'),
    );
  });

  it('does not subscribe to chart events (negative: chart is read-only)', async () => {
    const { hass } = makeHass({
      initialSchedule: {
        baseline: [{ at: '06:00', low: 20, high: 23 }],
        current: [],
      },
    });
    const el = await tab(hass);
    const chartEl = el.shadowRoot!.querySelector('comfort-band-schedule-chart')!;
    // Dispatch a synthetic edit event — schedule-tab should NOT respond.
    chartEl.dispatchEvent(
      new CustomEvent('transition-edit', {
        detail: { transition: { at: '06:00', low: 20, high: 23 } },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('transition-edit-dialog')).toBeNull();
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
    // First subscribe delivered one transition → two markers (low + high).
    expect(
      el
        .shadowRoot!.querySelector('comfort-band-schedule-chart')!
        .shadowRoot!.querySelectorAll('.marker').length,
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

    // Drive the delete via the list UI (click Delete → click Confirm).
    const row = el.shadowRoot!.querySelector('li.row')!;
    row.querySelector<HTMLButtonElement>('button.danger')!.click();
    await el.updateComplete;
    el.shadowRoot!.querySelector('li.row.confirm')!
      .querySelector<HTMLButtonElement>('button.danger')!
      .click();
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

  describe('in plain words', () => {
    /** Text and labels a person meets: not the tab's own CSS. */
    const shownWords = (root: ParentNode) =>
      Array.from(root.querySelectorAll('*:not(style)'))
        .map((n) => `${n.textContent} ${n.getAttribute('aria-label') ?? ''}`)
        .join(' ');

    const schedule = {
      baseline: [
        { at: '06:00', low: 20, high: 23 },
        { at: '22:30', low: 18.5, high: 21 },
      ],
      current: [],
    };

    it("keeps a profile's name as typed, capitals included", async () => {
      for (const name of ['home', 'Holiday house']) {
        const { hass } = makeHass({ initialSchedule: schedule, active: name });
        const el = await tab(hass);
        expect(el.shadowRoot!.querySelector('.header')!.textContent!.trim()).toBe(
          `Schedule: ${name}`,
        );
        el.remove();
      }
      const css = (
        customElements.get('comfort-band-schedule-tab') as unknown as {
          styles: Array<{ cssText: string }>;
        }
      ).styles
        .flat()
        .map((s) => s.cssText)
        .join('\n');
      expect(css).not.toMatch(/\.profile-label\s*\{[^}]*text-transform/);
    });

    it('names the new profile when it switches while the tab is open', async () => {
      const fake = makeHass({ initialSchedule: schedule, active: 'home' });
      const el = await tab(fake.hass);
      expect(el.shadowRoot!.querySelector('.header')!.textContent!.trim()).toBe('Schedule: home');
      fake.hass.states['select.comfort_band_profiles_active_profile'] = {
        ...fake.hass.states['select.comfort_band_profiles_active_profile'],
        state: 'Holiday',
      };
      el.hass = { ...fake.hass };
      await new Promise((r) => setTimeout(r, 0));
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('.header')!.textContent!.trim()).toBe(
        'Schedule: Holiday',
      );
    });

    // Not "follows": with no schedule of its own in the active profile, a
    // room follows the default profile's.
    it("says whose schedule it shows, by the profile's name as typed", async () => {
      const { hass } = makeHass({ initialSchedule: schedule, active: 'away' });
      const el = await tab(hass);
      expect(el.shadowRoot!.querySelector('.header')!.textContent!.trim()).toBe('Schedule: away');
      expect(shownWords(el.shadowRoot!)).not.toMatch(/follow/i);
    });

    // A live select carries default_profile; one that failed to load doesn't.
    it('names a profile that’s actually called "unavailable"', async () => {
      const { hass } = makeHass({ initialSchedule: schedule, active: 'unavailable' });
      hass.states['select.comfort_band_profiles_active_profile'].attributes = {
        options: ['home', 'unavailable'],
        default_profile: 'home',
      };
      const el = await tab(hass);
      expect(el.shadowRoot!.querySelector('.header')!.textContent!.trim()).toBe(
        'Schedule: unavailable',
      );
    });

    it.each(['unavailable', 'unknown'])(
      'names no profile while the profile select is %s',
      async (state) => {
        const { hass } = makeHass({ initialSchedule: schedule, active: state });
        const el = await tab(hass);
        expect(el.shadowRoot!.querySelector('.header')).toBeNull();
      },
    );

    // A change can be saved at 18.25; it's shown, and read, to the tenth.
    it('reads a range as it shows it, to the tenth', async () => {
      const { hass } = makeHass({
        initialSchedule: { baseline: [{ at: '06:00', low: 18.25, high: 21.75 }], current: [] },
      });
      const el = await tab(hass);
      const row = el.shadowRoot!.querySelector('li.row')!;
      expect(row.querySelector('.band')!.textContent!.trim()).toBe('18.3–21.8°');
      expect(row.getAttribute('aria-label')).toBe('Edit the 06:00 change, 18.3 to 21.8 degrees');
    });

    // Without a profile manager the schedule is the zone's own.
    it("doesn't mention profiles where none are set up", async () => {
      const { hass } = makeHass({ initialSchedule: schedule });
      hass.devices = {};
      hass.entities = {};
      const el = await tab(hass);
      expect(el.shadowRoot!.querySelector('.header')).toBeNull();
      expect(shownWords(el.shadowRoot!)).not.toMatch(/profile/i);
      // The zone's own schedule still loads.
      expect(el.shadowRoot!.querySelectorAll('li.row')).toHaveLength(2);
    });

    it("lists each change at a time in HA's 12/24-hour setting, with its range", async () => {
      const { hass } = makeHass({ initialSchedule: schedule });
      hass.locale = { language: 'en-US', time_format: '12' };
      const el = await tab(hass);
      const rows = Array.from(el.shadowRoot!.querySelectorAll('li.row'));
      expect(rows.map((r) => r.querySelector('.at')!.textContent!.trim())).toEqual([
        '6 AM',
        '10:30 PM',
      ]);
      expect(rows.map((r) => r.querySelector('.band')!.textContent!.trim())).toEqual([
        '20–23°',
        '18.5–21°',
      ]);
      expect(rows[1].getAttribute('aria-label')).toBe(
        'Edit the 10:30 PM change, 18.5 to 21 degrees',
      );
      const buttons = rows[1].querySelectorAll('button');
      expect(Array.from(buttons).map((b) => b.getAttribute('aria-label'))).toEqual([
        'Edit the 10:30 PM change',
        'Delete the 10:30 PM change',
      ]);
      expect(el.shadowRoot!.querySelector('.list-toolbar button')!.textContent!.trim()).toBe(
        '+ Add a change',
      );
    });

    it("asks before deleting a change, naming its time in HA's setting", async () => {
      const { hass } = makeHass({ initialSchedule: schedule });
      hass.locale = { language: 'en-US', time_format: '12' };
      const el = await tab(hass);
      const row = el.shadowRoot!.querySelectorAll('li.row')[1];
      row.querySelector<HTMLButtonElement>('button.danger')!.click();
      await el.updateComplete;
      const confirm = el.shadowRoot!.querySelector('li.row.confirm')!;
      expect(confirm.querySelector('.confirm-text')!.textContent).toBe(
        'Delete the 10:30 PM change?',
      );
      expect(confirm.getAttribute('aria-label')).toBe('Delete the 10:30 PM change?');
    });

    it('never says "transition"', async () => {
      const { hass } = makeHass({ initialSchedule: schedule });
      const el = await tab(hass);
      expect(shownWords(el.shadowRoot!)).not.toMatch(/transition/i);
    });
  });
});
