import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/card-editor.js';
import type { ComfortBandCardEditor } from '../src/card-editor.js';
import type { HomeAssistant } from '../src/types.js';
import { mount, stubConnection, teardown } from './_fixture.js';

afterEach(teardown);

function makeHass(zones: string[]): HomeAssistant {
  return {
    states: {},
    entities: {},
    devices: Object.fromEntries(
      zones.map((slug, i) => [
        `dev-${i}`,
        {
          id: `dev-${i}`,
          identifiers: [['comfort_band', `zone:${slug}`]] as Array<[string, string]>,
          name: slug,
          name_by_user: null,
          area_id: null,
        },
      ]),
    ),
    connection: stubConnection(),
    callService: vi.fn(),
    callWS: vi.fn(),
  };
}

async function editor(
  hass: HomeAssistant,
  config: Parameters<ComfortBandCardEditor['setConfig']>[0] = {
    type: 'custom:comfort-band-card',
    zone: '',
  },
): Promise<ComfortBandCardEditor> {
  const el = await mount('comfort-band-card-editor', { hass });
  el.setConfig(config);
  await el.updateComplete;
  return el;
}

describe('comfort-band-card-editor', () => {
  it('lists every Comfort Band zone in the dropdown, sorted', async () => {
    const el = await editor(makeHass(['mbr', 'gym', 'office']));
    const zoneSelect = el.shadowRoot!.querySelectorAll('select')[0] as HTMLSelectElement;
    const options = zoneSelect.querySelectorAll('option:not([disabled])');
    const values = Array.from(options).map((o) => (o as HTMLOptionElement).value);
    expect(values).toEqual(['gym', 'mbr', 'office']);
  });

  it('shows a friendly empty state when no zones are registered', async () => {
    const el = await editor(makeHass([]));
    expect(el.shadowRoot!.querySelector('.empty')!.textContent).toContain('No Comfort Band zones');
  });

  it('fires config-changed with the new zone when the dropdown changes', async () => {
    const el = await editor(makeHass(['gym', 'office']));
    const fire = vi.fn();
    el.addEventListener('config-changed', fire);
    const select = el.shadowRoot!.querySelector('select') as HTMLSelectElement;
    select.value = 'office';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    expect(fire.mock.calls[0][0].detail.config).toEqual({
      type: 'custom:comfort-band-card',
      zone: 'office',
    });
  });

  it('toggles `compact: true` from the checkbox', async () => {
    const el = await editor(makeHass(['gym']), {
      type: 'custom:comfort-band-card',
      zone: 'gym',
    });
    const fire = vi.fn();
    el.addEventListener('config-changed', fire);
    const checkbox = el.shadowRoot!.querySelector('input[type="checkbox"]') as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    expect(fire.mock.calls[0][0].detail.config).toEqual({
      type: 'custom:comfort-band-card',
      zone: 'gym',
      compact: true,
    });
  });

  it('removes `compact` from the config when unchecked', async () => {
    const el = await editor(makeHass(['gym']), {
      type: 'custom:comfort-band-card',
      zone: 'gym',
      compact: true,
    });
    const fire = vi.fn();
    el.addEventListener('config-changed', fire);
    const checkbox = el.shadowRoot!.querySelector('input[type="checkbox"]') as HTMLInputElement;
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    expect(fire.mock.calls[0][0].detail.config).toEqual({
      type: 'custom:comfort-band-card',
      zone: 'gym',
    });
  });

  it('sets variant: mini when the variant dropdown changes', async () => {
    const el = await editor(makeHass(['gym']), {
      type: 'custom:comfort-band-card',
      zone: 'gym',
    });
    const fire = vi.fn();
    el.addEventListener('config-changed', fire);
    const selects = el.shadowRoot!.querySelectorAll('select');
    const variantSelect = selects[1] as HTMLSelectElement;
    variantSelect.value = 'mini';
    variantSelect.dispatchEvent(new Event('change', { bubbles: true }));
    expect(fire.mock.calls[0][0].detail.config).toEqual({
      type: 'custom:comfort-band-card',
      zone: 'gym',
      variant: 'mini',
    });
  });

  it('removes variant from the config when set back to tile', async () => {
    const el = await editor(makeHass(['gym']), {
      type: 'custom:comfort-band-card',
      zone: 'gym',
      variant: 'mini',
    });
    const fire = vi.fn();
    el.addEventListener('config-changed', fire);
    const selects = el.shadowRoot!.querySelectorAll('select');
    const variantSelect = selects[1] as HTMLSelectElement;
    variantSelect.value = 'tile';
    variantSelect.dispatchEvent(new Event('change', { bubbles: true }));
    expect(fire.mock.calls[0][0].detail.config).toEqual({
      type: 'custom:comfort-band-card',
      zone: 'gym',
    });
  });

  it('commits a trimmed name on change, and removes it when cleared', async () => {
    const el = await editor(makeHass(['gym']), { type: 'custom:comfort-band-card', zone: 'gym' });
    const fire = vi.fn();
    el.addEventListener('config-changed', (e) => fire((e as CustomEvent).detail.config));
    const input = el.shadowRoot!.querySelector('input[type="text"]') as HTMLInputElement;

    input.value = '  Weights room ';
    input.dispatchEvent(new Event('change'));
    expect(fire).toHaveBeenLastCalledWith({
      type: 'custom:comfort-band-card',
      zone: 'gym',
      name: 'Weights room',
    });

    input.value = '';
    input.dispatchEvent(new Event('change'));
    expect(fire).toHaveBeenLastCalledWith({ type: 'custom:comfort-band-card', zone: 'gym' });
  });

  it('clears a name of only spaces from the field as well as the config', async () => {
    const el = await editor(makeHass(['gym']), { type: 'custom:comfort-band-card', zone: 'gym' });
    const fire = vi.fn();
    el.addEventListener('config-changed', (e) => fire((e as CustomEvent).detail.config));
    const input = el.shadowRoot!.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = '   ';
    input.dispatchEvent(new Event('change'));
    expect(fire).toHaveBeenLastCalledWith({ type: 'custom:comfort-band-card', zone: 'gym' });
    expect(input.value).toBe('');
  });

  it("changes the placeholder to the new zone's default name when the zone changes", async () => {
    const hass = makeHass(['gym', 'office']);
    hass.devices['dev-0']!.area_id = 'area-gym';
    hass.devices['dev-1']!.area_id = 'area-office';
    hass.areas = {
      'area-gym': { area_id: 'area-gym', name: 'Home Gym' },
      'area-office': { area_id: 'area-office', name: 'Study' },
    };
    const el = await editor(hass, { type: 'custom:comfort-band-card', zone: 'gym' });
    const input = () => el.shadowRoot!.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input().placeholder).toBe('Home Gym');
    el.setConfig({ type: 'custom:comfort-band-card', zone: 'office' });
    await el.updateComplete;
    expect(input().placeholder).toBe('Study');
  });

  it('shows the default name as the placeholder', async () => {
    const hass = makeHass(['gym']);
    hass.devices['dev-0']!.area_id = 'area-1';
    hass.areas = { 'area-1': { area_id: 'area-1', name: 'Home Gym' } };
    const el = await editor(hass, { type: 'custom:comfort-band-card', zone: 'gym' });
    const input = el.shadowRoot!.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input.placeholder).toBe('Home Gym');
  });

  // `name:` with nothing after it in YAML.
  it('drops an empty name from the config it writes back', async () => {
    const el = await editor(makeHass(['gym', 'office']), {
      type: 'custom:comfort-band-card',
      zone: 'gym',
      name: null,
    } as never);
    const fire = vi.fn();
    el.addEventListener('config-changed', (e) => fire((e as CustomEvent).detail.config));
    const zoneSelect = el.shadowRoot!.querySelectorAll('select')[0] as HTMLSelectElement;
    zoneSelect.value = 'office';
    zoneSelect.dispatchEvent(new Event('change'));
    expect(fire).toHaveBeenLastCalledWith({ type: 'custom:comfort-band-card', zone: 'office' });
  });

  // The placeholder is what an empty field would give, not the name in it.
  it('shows the default name as the placeholder even with a name set', async () => {
    const hass = makeHass(['gym']);
    hass.devices['dev-0']!.area_id = 'area-1';
    hass.areas = { 'area-1': { area_id: 'area-1', name: 'Home Gym' } };
    const el = await editor(hass, {
      type: 'custom:comfort-band-card',
      zone: 'gym',
      name: 'Weights room',
    });
    const input = el.shadowRoot!.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input.placeholder).toBe('Home Gym');
  });

  it('keeps an existing name when the config is loaded', async () => {
    const el = await editor(makeHass(['gym']), {
      type: 'custom:comfort-band-card',
      zone: 'gym',
      name: 'Weights room',
    });
    const input = el.shadowRoot!.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input.value).toBe('Weights room');
  });
});
