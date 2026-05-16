import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tabs/profiles-tab.js';
import type { ComfortBandProfilesTab } from '../src/tabs/profiles-tab.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

afterEach(teardown);

function makeHass(opts: {
  options?: string[];
  active?: string;
  defaultProfile?: string;
  descriptions?: Record<string, string>;
  selectEntity?: string | null;
}): HomeAssistant {
  const entityId = opts.selectEntity ?? 'select.comfort_band_profiles_active_profile';
  const states: Record<string, ReturnType<typeof entityState>> = {};
  const entities: Record<string, unknown> = {};
  const devices: Record<string, unknown> = {};

  if (opts.selectEntity !== null) {
    devices['dev-pm'] = {
      id: 'dev-pm',
      identifiers: [['comfort_band', 'profile_manager']],
      name: 'Comfort Band Profiles',
      name_by_user: null,
      area_id: null,
    };
    entities[entityId] = {
      entity_id: entityId,
      platform: 'comfort_band',
      device_id: 'dev-pm',
      area_id: null,
      hidden: false,
      entity_category: null,
      translation_key: 'active_profile',
      name: null,
    };
    states[entityId] = entityState(entityId, opts.active ?? 'home', {
      options: opts.options ?? ['home', 'away'],
      default_profile: opts.defaultProfile ?? 'home',
      descriptions: opts.descriptions ?? {},
    });
  }

  return {
    states: states as HomeAssistant['states'],
    entities: entities as HomeAssistant['entities'],
    devices: devices as HomeAssistant['devices'],
    connection: stubConnection(),
    callService: vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn().mockResolvedValue(undefined),
  };
}

function entityState(entityId: string, state: string, attributes: Record<string, unknown> = {}) {
  return {
    entity_id: entityId,
    state,
    attributes,
    last_changed: '',
    last_updated: '',
  };
}

async function profilesTab(hass: HomeAssistant): Promise<ComfortBandProfilesTab> {
  return mount('comfort-band-profiles-tab', { hass });
}

function findMenuButton(el: ComfortBandProfilesTab, text: string): HTMLButtonElement | null {
  const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.menu button');
  return Array.from(buttons).find((b) => b.textContent?.trim() === text) ?? null;
}

describe('comfort-band-profiles-tab', () => {
  it('lists every profile from the select options', async () => {
    const el = await profilesTab(makeHass({ options: ['home', 'away'] }));
    const items = el.shadowRoot!.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(Array.from(items).map((li) => li.querySelector('.name')!.textContent!.trim())).toEqual([
      'home',
      'away',
    ]);
  });

  it('marks the active profile with the active class and a badge', async () => {
    const el = await profilesTab(makeHass({ options: ['home', 'away'], active: 'away' }));
    const items = el.shadowRoot!.querySelectorAll('li');
    expect(items[0].classList.contains('active')).toBe(false);
    expect(items[1].classList.contains('active')).toBe(true);
    expect(items[1].querySelector('.badge')).not.toBeNull();
  });

  it('clicking a profile fires comfort_band.set_profile', async () => {
    const hass = makeHass({ options: ['home', 'away'], active: 'home' });
    const el = await profilesTab(hass);
    const items = el.shadowRoot!.querySelectorAll<HTMLLIElement>('li');
    items[1].click();
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_profile', {
      profile: 'away',
    });
  });

  it('Enter / Space on a focused option selects it (keyboard a11y)', async () => {
    const hass = makeHass({ options: ['home', 'away'], active: 'home' });
    const el = await profilesTab(hass);
    const items = el.shadowRoot!.querySelectorAll<HTMLLIElement>('li');
    items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'set_profile', {
      profile: 'away',
    });
  });

  it('renders a friendly empty state when the profile manager is not yet registered', async () => {
    const el = await profilesTab(makeHass({ selectEntity: null }));
    expect(el.shadowRoot!.textContent).toContain('not registered');
  });

  it('renders a no-profiles message when options is empty', async () => {
    const el = await profilesTab(makeHass({ options: [] }));
    expect(el.shadowRoot!.textContent).toContain('No profiles');
  });

  it('renders descriptions as secondary text under each name', async () => {
    const el = await profilesTab(
      makeHass({
        options: ['home', 'weekend'],
        descriptions: { home: 'Default schedule', weekend: 'Sat + Sun' },
      }),
    );
    const items = el.shadowRoot!.querySelectorAll('li');
    expect(items[0].querySelector('.description')!.textContent).toBe('Default schedule');
    expect(items[1].querySelector('.description')!.textContent).toBe('Sat + Sun');
  });

  // ----- new-profile dialog -----

  it('clicking "+ New profile" opens the create dialog', async () => {
    const el = await profilesTab(makeHass({ options: ['home', 'away'] }));
    el.shadowRoot!.querySelector<HTMLButtonElement>('.new-profile')!.click();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector('profile-edit-dialog');
    expect(dialog).not.toBeNull();
    expect(dialog!.getAttribute('mode') ?? (dialog as unknown as { mode: string }).mode).toBe(
      'create',
    );
  });

  it('saving from the create dialog fires create_profile with name + description', async () => {
    const hass = makeHass({ options: ['home', 'away'] });
    const el = await profilesTab(hass);
    el.shadowRoot!.querySelector<HTMLButtonElement>('.new-profile')!.click();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector('profile-edit-dialog')!;
    dialog.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { name: 'weekend', description: 'Sat + Sun' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'create_profile', {
      name: 'weekend',
      description: 'Sat + Sun',
    });
  });

  // ----- overflow menu -----

  it('clicking the overflow button opens a menu for that row', async () => {
    const el = await profilesTab(makeHass({ options: ['home', 'away'] }));
    const row = el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[1];
    const overflow = row.querySelector<HTMLButtonElement>('.overflow')!;
    overflow.click();
    await el.updateComplete;
    const menu = row.querySelector('.menu');
    expect(menu).not.toBeNull();
    expect(menu!.querySelectorAll('button').length).toBe(3); // Clone / Rename / Delete
  });

  it('Delete is disabled in the menu for the default profile', async () => {
    const el = await profilesTab(makeHass({ options: ['home', 'away'], defaultProfile: 'home' }));
    const homeRow = el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[0];
    homeRow.querySelector<HTMLButtonElement>('.overflow')!.click();
    await el.updateComplete;
    const deleteBtn = findMenuButton(el, 'Delete')!;
    expect(deleteBtn.hasAttribute('disabled')).toBe(true);
  });

  it('Clone from overflow → save fires clone_profile with source + target', async () => {
    const hass = makeHass({ options: ['home', 'away'] });
    const el = await profilesTab(hass);
    el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[0]
      .querySelector<HTMLButtonElement>('.overflow')!
      .click();
    await el.updateComplete;
    findMenuButton(el, 'Clone')!.click();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector('profile-edit-dialog')!;
    dialog.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { name: 'weekend', description: '' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'clone_profile', {
      source: 'home',
      target: 'weekend',
      description: '',
    });
  });

  it('Rename from overflow → save fires rename_profile', async () => {
    const hass = makeHass({ options: ['home', 'away'] });
    const el = await profilesTab(hass);
    el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[1]
      .querySelector<HTMLButtonElement>('.overflow')!
      .click();
    await el.updateComplete;
    findMenuButton(el, 'Rename')!.click();
    await el.updateComplete;
    const dialog = el.shadowRoot!.querySelector('profile-edit-dialog')!;
    dialog.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { name: 'trip', description: '' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'rename_profile', {
      old: 'away',
      new: 'trip',
    });
  });

  it('Rename to the same name does not call the service (no-op)', async () => {
    const hass = makeHass({ options: ['home', 'away'] });
    const el = await profilesTab(hass);
    el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[1]
      .querySelector<HTMLButtonElement>('.overflow')!
      .click();
    await el.updateComplete;
    findMenuButton(el, 'Rename')!.click();
    await el.updateComplete;
    el.shadowRoot!.querySelector('profile-edit-dialog')!.dispatchEvent(
      new CustomEvent('dialog-save', {
        detail: { name: 'away', description: '' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('Delete from overflow → confirm → fires delete_profile', async () => {
    const hass = makeHass({ options: ['home', 'away', 'vacation'] });
    const el = await profilesTab(hass);
    el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[2]
      .querySelector<HTMLButtonElement>('.overflow')!
      .click();
    await el.updateComplete;
    findMenuButton(el, 'Delete')!.click();
    await el.updateComplete;
    const confirmRoot = el.shadowRoot!.querySelector('.confirm-delete');
    expect(confirmRoot).not.toBeNull();
    const confirmBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.confirm-actions .danger')!;
    confirmBtn.click();
    await el.updateComplete;
    expect(hass.callService).toHaveBeenCalledWith('comfort_band', 'delete_profile', {
      name: 'vacation',
    });
  });

  it('confirm-delete shows an extra warning when deleting the active profile', async () => {
    const el = await profilesTab(
      makeHass({ options: ['home', 'away', 'vacation'], active: 'vacation' }),
    );
    el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[2]
      .querySelector<HTMLButtonElement>('.overflow')!
      .click();
    await el.updateComplete;
    findMenuButton(el, 'Delete')!.click();
    await el.updateComplete;
    const text = el.shadowRoot!.querySelector('.confirm-delete')!.textContent ?? '';
    expect(text).toContain('active');
    expect(text).toContain('home'); // default fallback
  });

  it('cancel from confirm-delete returns to the list without a service call', async () => {
    const hass = makeHass({ options: ['home', 'away', 'vacation'] });
    const el = await profilesTab(hass);
    el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[2]
      .querySelector<HTMLButtonElement>('.overflow')!
      .click();
    await el.updateComplete;
    findMenuButton(el, 'Delete')!.click();
    await el.updateComplete;
    el.shadowRoot!.querySelector<HTMLButtonElement>('.confirm-actions .secondary')!.click();
    await el.updateComplete;
    expect(hass.callService).not.toHaveBeenCalled();
    // Back to list view.
    expect(el.shadowRoot!.querySelector('ul')).not.toBeNull();
  });

  it('a document click outside the menu dismisses it', async () => {
    const el = await profilesTab(makeHass({ options: ['home', 'away'] }));
    el.shadowRoot!.querySelectorAll<HTMLLIElement>('li')[0]
      .querySelector<HTMLButtonElement>('.overflow')!
      .click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.menu')).not.toBeNull();
    // Click somewhere completely outside the tab.
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.menu')).toBeNull();
  });
});
