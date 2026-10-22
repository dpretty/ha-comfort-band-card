import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/tile.js';
import type { ComfortBandTile } from '../src/tile.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

async function tile(props: Partial<ComfortBandTile>): Promise<ComfortBandTile> {
  return mount('comfort-band-tile', props);
}

function tileCss(): string {
  return (customElements.get('comfort-band-tile') as unknown as typeof ComfortBandTile).styles
    .flat()
    .map((s) => (s as { cssText: string }).cssText)
    .join('\n');
}

/** The declarations of the rule whose selector is exactly `selector`. */
function rule(css: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(?:^|[}\\s])${escaped}\\s*\\{([^}]*)\\}`).exec(css);
  if (!match) throw new Error(`no rule for ${selector}`);
  return match[1];
}

function badgesOf(el: ComfortBandTile): Array<{ badge: string | null; icon: string | null }> {
  return Array.from(el.shadowRoot!.querySelectorAll('.mini ha-icon')).map((i) => ({
    badge: i.getAttribute('data-badge'),
    icon: i.getAttribute('icon'),
  }));
}

describe('comfort-band-tile', () => {
  it('renders zone name and temperature in degrees with one decimal', async () => {
    const el = await tile({ zoneName: 'Gym', temperature: 21.4, low: 19, high: 23 });
    const sr = el.shadowRoot!;
    expect(sr.querySelector('.zone-name')!.textContent).toContain('Gym');
    expect(sr.querySelector('.room-temp')!.textContent).toContain('21.4°');
  });

  it('shows an em-dash for an unknown temperature', async () => {
    const el = await tile({ zoneName: 'Gym', temperature: NaN });
    expect(el.shadowRoot!.querySelector('.room-temp')!.textContent).toContain('—');
  });

  it('says in words what the room is doing, with its icon', async () => {
    const el = await tile({
      zoneName: 'Gym',
      statusKind: 'heating',
      statusText: 'Heating · adjusted to 20–23° until 4:30 pm',
    });
    const status = el.shadowRoot!.querySelector('.status')!;
    expect(status.textContent!.trim()).toBe('Heating · adjusted to 20–23° until 4:30 pm');
    expect(status.classList.contains('heating')).toBe(true);
    const icon = status.querySelector('ha-icon')!;
    expect(icon.getAttribute('icon')).toBe('mdi:fire');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('marks sensor trouble with a warning icon', async () => {
    const el = await tile({
      statusKind: 'sensor',
      statusText: 'On hold: the room sensor is offline',
    });
    const icon = el.shadowRoot!.querySelector('.status ha-icon')!;
    expect(icon.getAttribute('icon')).toBe('mdi:alert-circle-outline');
  });

  // The words carry the meaning; the colours repeat it.
  it('colours the status icon for heating, cooling and sensor trouble', () => {
    const css = tileCss();
    expect(rule(css, '.status.heating ha-icon')).toMatch(/var\(--cb-action-heating\)/);
    expect(rule(css, '.status.cooling ha-icon')).toMatch(/var\(--cb-action-cooling\)/);
    expect(rule(css, '.status.sensor ha-icon')).toMatch(/var\(--warning-color/);
    expect(rule(css, '.status ha-icon')).toMatch(/--icon-primary-color:\s*currentColor/);
  });

  it("says when the range can't be read", async () => {
    const el = await tile({ statusKind: 'none', statusText: "Can't read this room's range" });
    const status = el.shadowRoot!.querySelector('.status')!;
    expect(status.textContent!.trim()).toBe("Can't read this room's range");
    expect(status.querySelector('ha-icon')!.getAttribute('icon')).toBe('mdi:thermometer');
  });

  it('leaves the status out until there is one', async () => {
    const el = await tile({ zoneName: 'Gym' });
    expect(el.shadowRoot!.querySelector('.status')).toBeNull();
  });

  // The status sentence says both now.
  it('has no separate action chip or override pill', async () => {
    const el = await tile({ statusKind: 'heating', statusText: 'Heating · 19–23°' });
    expect(el.shadowRoot!.querySelector('.action-chip')).toBeNull();
    expect(el.shadowRoot!.querySelector('.override-pill')).toBeNull();
  });

  it('fires a comfort-band-tile-tap event when tapped', async () => {
    const el = await tile({ zoneName: 'Gym' });
    const listener = vi.fn();
    el.addEventListener('comfort-band-tile-tap', listener);
    (el.shadowRoot!.querySelector('.tile') as HTMLElement).click();
    expect(listener).toHaveBeenCalledOnce();
  });

  it('does not fire a tap event in noExpand mode', async () => {
    const el = await tile({ zoneName: 'Gym', noExpand: true });
    const listener = vi.fn();
    el.addEventListener('comfort-band-tile-tap', listener);
    (el.shadowRoot!.querySelector('.tile') as HTMLElement).click();
    expect(listener).not.toHaveBeenCalled();
  });

  it('renders a band-gauge child with the same low/high/temperature/action', async () => {
    const el = await tile({
      zoneName: 'Gym',
      temperature: 21,
      low: 19,
      high: 23,
      action: 'cooling',
    });
    const gauge = el.shadowRoot!.querySelector('band-gauge') as HTMLElement & {
      low: number;
      high: number;
      room: number;
      roomLabel: string;
      action: string;
    };
    expect(gauge).not.toBeNull();
    expect(gauge.low).toBe(19);
    expect(gauge.high).toBe(23);
    expect(gauge.room).toBe(21);
    expect(gauge.roomLabel).toBe('room');
    expect(gauge.action).toBe('cooling');
  });

  it('says "feels like" beside the temperature when that is what it shows', async () => {
    const feels = await tile({ temperature: 22.4, feelsLike: true });
    expect(feels.shadowRoot!.querySelector('.reading .feels')!.textContent!.trim()).toBe(
      'feels like',
    );
    teardown();
    const room = await tile({ temperature: 21.4 });
    expect(room.shadowRoot!.querySelector('.feels')).toBeNull();
  });

  it('labels the gauge\'s marker "feels like" when that is the temperature shown', async () => {
    const el = await tile({ temperature: 22.4, feelsLike: true });
    const gauge = el.shadowRoot!.querySelector('band-gauge') as HTMLElement & {
      roomLabel: string;
    };
    expect(gauge.roomLabel).toBe('feels like');
  });

  describe('mini variant', () => {
    it('renders only the temperature, with no zone name, gauge or status line', async () => {
      const el = await tile({
        variant: 'mini',
        zoneName: 'Gym',
        temperature: 21.4,
        low: 19,
        high: 23,
        statusKind: 'comfortable',
        statusText: 'Comfortable · 19–23°',
      });
      const sr = el.shadowRoot!;
      expect(sr.querySelector('.tile')).toBeNull();
      expect(sr.querySelector('band-gauge')).toBeNull();
      expect(sr.querySelector('.zone-name')).toBeNull();
      expect(sr.querySelector('.status')).toBeNull();
      const mini = sr.querySelector('.mini')!;
      expect(mini.textContent!.trim()).toBe('21.4°');
      expect(badgesOf(el)).toEqual([]);
    });

    it('puts an icon in front for each thing worth noticing, in order', async () => {
      const el = await tile({
        variant: 'mini',
        temperature: 19.8,
        badges: ['sensor', 'heating', 'adjusted'],
      });
      expect(badgesOf(el)).toEqual([
        { badge: 'sensor', icon: 'mdi:alert-circle-outline' },
        { badge: 'heating', icon: 'mdi:fire' },
        { badge: 'adjusted', icon: 'mdi:timer-outline' },
      ]);
      const icons = Array.from(el.shadowRoot!.querySelectorAll('.mini ha-icon'));
      expect(icons.every((i) => i.getAttribute('aria-hidden') === 'true')).toBe(true);
      // Icons first, then the number.
      const mini = el.shadowRoot!.querySelector('.mini')!;
      expect(mini.lastElementChild!.textContent).toBe('19.8°');
    });

    it.each([
      ['paused', 'mdi:pause-circle-outline'],
      ['cooling', 'mdi:snowflake'],
      ['below', 'mdi:thermometer-low'],
      ['above', 'mdi:thermometer-high'],
    ] as const)('shows the %s icon', async (badge, icon) => {
      const el = await tile({ variant: 'mini', temperature: 21, badges: [badge] });
      expect(badgesOf(el)).toEqual([{ badge, icon }]);
    });

    it('tints the background when heating or cooling', async () => {
      const heat = await tile({ variant: 'mini', temperature: 22, badges: ['heating'] });
      const heatEl = heat.shadowRoot!.querySelector('.mini') as HTMLElement;
      expect(heatEl.classList.contains('tinted')).toBe(true);
      expect(heatEl.getAttribute('style')).toContain('--cb-action-heating');
      teardown();
      const cool = await tile({
        variant: 'mini',
        temperature: 22,
        badges: ['sensor', 'cooling', 'adjusted'],
      });
      const coolEl = cool.shadowRoot!.querySelector('.mini') as HTMLElement;
      expect(coolEl.classList.contains('tinted')).toBe(true);
      expect(coolEl.getAttribute('style')).toContain('--cb-action-cooling');
    });

    // The badges already leave heating out for a paused room. Red for a room
    // that's cold but not heating would say it's heating.
    it.each([[['paused']], [['below']], [['above']], [['sensor', 'adjusted']]] as const)(
      "doesn't tint for %j, whatever the action",
      async (badges) => {
        const el = await tile({
          variant: 'mini',
          temperature: 22,
          action: 'heating',
          badges: [...badges],
        });
        const mini = el.shadowRoot!.querySelector('.mini') as HTMLElement;
        expect(mini.classList.contains('tinted')).toBe(false);
        expect(mini.getAttribute('style')).toBe('');
      },
    );

    it('shows an em-dash for an unknown temperature', async () => {
      const el = await tile({ variant: 'mini', temperature: NaN, badges: ['sensor'] });
      expect(el.shadowRoot!.querySelector('.mini .value')!.textContent).toBe('—');
    });

    it('fires comfort-band-tile-tap on click', async () => {
      const el = await tile({ variant: 'mini', temperature: 22 });
      const listener = vi.fn();
      el.addEventListener('comfort-band-tile-tap', listener);
      (el.shadowRoot!.querySelector('.mini') as HTMLElement).click();
      expect(listener).toHaveBeenCalledOnce();
    });

    it('does not fire a tap event in noExpand mode', async () => {
      const el = await tile({ variant: 'mini', temperature: 22, noExpand: true });
      const listener = vi.fn();
      el.addEventListener('comfort-band-tile-tap', listener);
      (el.shadowRoot!.querySelector('.mini') as HTMLElement).click();
      expect(listener).not.toHaveBeenCalled();
    });

    it('says the zone, the temperature and the status sentence through aria-label', async () => {
      const el = await tile({
        variant: 'mini',
        zoneName: 'Gym',
        temperature: 21.4,
        statusText: 'Heating · adjusted to 20–23° until 4:30 pm',
        badges: ['heating', 'adjusted'],
      });
      const mini = el.shadowRoot!.querySelector('.mini')!;
      expect(mini.getAttribute('aria-label')).toBe(
        'Gym 21.4°. Heating · adjusted to 20–23° until 4:30 pm',
      );
      expect(mini.getAttribute('title')).toBe(mini.getAttribute('aria-label'));
    });

    it('says "feels like" in its label and tooltip, but not on the chip', async () => {
      const el = await tile({
        variant: 'mini',
        zoneName: 'Gym',
        temperature: 23.7,
        feelsLike: true,
        statusText: 'Comfortable · 19.5–24°',
      });
      const mini = el.shadowRoot!.querySelector('.mini')!;
      expect(mini.getAttribute('aria-label')).toBe('Gym, feels like 23.7°. Comfortable · 19.5–24°');
      expect(mini.getAttribute('title')).toBe(mini.getAttribute('aria-label'));
      expect(mini.textContent!.trim()).toBe('23.7°');
    });

    it('says just the zone and temperature until there is a status', async () => {
      const el = await tile({ variant: 'mini', zoneName: 'Gym', temperature: 21.4 });
      expect(el.shadowRoot!.querySelector('.mini')!.getAttribute('aria-label')).toBe('Gym 21.4°');
    });

    // jsdom has no layout, so these pin the rules; they were measured in a
    // browser: the chip stays 26px tall and takes taps 21px from its centre.
    it('has a touch area at least 44px each way, centred on a chip that opens', () => {
      const css = tileCss();
      const area = rule(css, '.mini:not(.no-expand)::before');
      expect(area).toMatch(/content:\s*''/);
      expect(area).toMatch(/position:\s*absolute/);
      expect(area).toMatch(/width:\s*max\(100%,\s*44px\)/);
      expect(area).toMatch(/height:\s*max\(100%,\s*44px\)/);
      expect(area).toMatch(/left:\s*50%/);
      expect(area).toMatch(/top:\s*50%/);
      expect(area).toMatch(/transform:\s*translate\(-50%,\s*-50%\)/);
      // Taps have to land on it.
      expect(area).not.toMatch(/pointer-events/);
      expect(rule(css, '.mini')).toMatch(/position:\s*relative/);
      // A compact chip doesn't open, so it doesn't take taps from around it.
      expect(css).not.toMatch(/\.mini::before/);
    });

    it('keeps its icons small', () => {
      expect(rule(tileCss(), '.mini ha-icon')).toMatch(/--mdc-icon-size:\s*16px/);
      // A theme's --icon-primary-color mustn't recolour them against the tint.
      expect(rule(tileCss(), '.mini ha-icon')).toMatch(/--icon-primary-color:\s*currentColor/);
    });
  });
});
