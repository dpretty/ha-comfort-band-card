import { afterEach, describe, it, expect } from 'vitest';
import '../src/band-gauge.js';
import type { BandGauge } from '../src/band-gauge.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

async function gauge(props: Partial<BandGauge>): Promise<BandGauge> {
  return mount('band-gauge', props);
}

const part = (el: BandGauge, sel: string) => el.shadowRoot!.querySelector<HTMLElement>(sel);
const drawn = (el: BandGauge) => part(el, '.gauge')!;
const limits = (el: BandGauge) =>
  Array.from(el.shadowRoot!.querySelectorAll('.limits span')).map((s) => s.textContent!.trim());

/** The gauge's CSS rules, comments stripped. */
function rules(): Array<{ selectors: string[]; body: string }> {
  const css = (
    customElements.get('band-gauge') as unknown as { styles: Array<{ cssText: string }> }
  ).styles
    .flat()
    .map((s) => s.cssText)
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  return [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map((m) => ({
    selectors: m[1].split(',').map((s) => s.trim()),
    body: m[2].replace(/\s+/g, ' ').trim(),
  }));
}
/** Every declaration for a selector, across the rules naming it. */
const ruleFor = (sel: string) =>
  rules()
    .filter((r) => r.selectors.includes(sel))
    .map((r) => r.body)
    .join(' ');

describe('band-gauge', () => {
  it('draws the track, the band, the marker and the band’s limits', async () => {
    const el = await gauge({ low: 19, high: 23, room: 21, action: 'idle' });
    expect(part(el, '.track')).not.toBeNull();
    expect(part(el, '.band')).not.toBeNull();
    expect(part(el, '.marker')).not.toBeNull();
    expect(limits(el)).toEqual(['19.0°', '23.0°']);
    expect(el.shadowRoot!.querySelector('svg')).toBeNull();
  });

  it('places the band and marker on the 15–28° track, clamped at its ends', async () => {
    const el = await gauge({ low: 19, high: 23, room: 21, action: 'idle' });
    const band = part(el, '.band')!;
    expect(parseFloat(band.style.left)).toBeCloseTo((4 / 13) * 100, 3);
    expect(parseFloat(band.style.width)).toBeCloseTo((4 / 13) * 100, 3);
    expect(parseFloat(part(el, '.marker')!.style.left)).toBeCloseTo((6 / 13) * 100, 3);
    expect(parseFloat(drawn(el).style.getPropertyValue('--lo'))).toBeCloseTo((4 / 13) * 100, 3);
    expect(parseFloat(drawn(el).style.getPropertyValue('--hi'))).toBeCloseTo((8 / 13) * 100, 3);
    teardown();
    const wide = await gauge({ low: 10, high: 35, room: 40, action: 'idle' });
    expect(part(wide, '.band')!.style.left).toBe('0%');
    expect(part(wide, '.band')!.style.width).toBe('100%');
    expect(part(wide, '.marker')!.style.left).toBe('100%');
  });

  it('writes the lower limit first, whichever way round they come', async () => {
    const el = await gauge({ low: 23, high: 19.5, room: 21, action: 'idle' });
    expect(limits(el)).toEqual(['19.5°', '23.0°']);
    expect(parseFloat(part(el, '.band')!.style.left)).toBeCloseTo((4.5 / 13) * 100, 3);
  });

  // The row stays, so the gauge's height doesn't change.
  it('omits the band and its limits when low/high are missing, keeping their row', async () => {
    const el = await gauge({ low: NaN, high: NaN, room: 21, action: 'unknown' });
    expect(part(el, '.track')).not.toBeNull();
    expect(part(el, '.band')).toBeNull();
    expect(part(el, '.limits')).not.toBeNull();
    expect(part(el, '.limits')!.hidden).toBe(false);
    expect(limits(el)).toEqual([]);
  });

  it.each([
    ['low', { low: 19, high: NaN }],
    ['high', { low: NaN, high: 23 }],
  ])('draws no band, nor its limits, with only the %s known', async (_, band) => {
    const el = await gauge({ ...band, room: 21, action: 'idle' });
    expect(part(el, '.band')).toBeNull();
    expect(limits(el)).toEqual([]);
  });

  it('omits the marker when room temperature is unknown', async () => {
    const el = await gauge({ low: 19, high: 23, room: NaN, action: 'idle' });
    expect(part(el, '.band')).not.toBeNull();
    expect(part(el, '.marker')).toBeNull();
  });

  // #22: a stretched SVG circle became an oval at any width but 100:24.
  it('draws a round marker, its own box', () => {
    const marker = ruleFor('.marker');
    expect(marker).toContain('width: 9px;');
    expect(marker).toContain('height: 9px;');
    expect(marker).toContain('border-radius: 50%;');
    expect(marker).toContain('box-sizing: border-box;');
  });

  // #22: under the band's ends, never over each other, kept inside the gauge.
  it('writes the limits under the band’s ends, inside the gauge', () => {
    expect(ruleFor('.limits .low')).toContain('left: min(max(var(--lo), 5ch), 100% - 5ch);');
    expect(ruleFor('.limits .low')).toContain('transform: translateX(-100%);');
    expect(ruleFor('.limits .high')).toContain(
      'left: max(min(var(--hi), 100% - 5ch), min(max(var(--lo), 5ch), 100% - 5ch));',
    );
    // Its own height, not only its lines'.
    expect(ruleFor('.limits')).toMatch(/(^|; )height: 14px;/);
    expect(ruleFor('.limits')).toContain('color: var(--cb-text-secondary);');
  });

  it('says the range, the temperature and what the room is doing, without "band"', async () => {
    const heating = await mount('band-gauge', { low: 19, high: 23, room: 21.4, action: 'heating' });
    expect(drawn(heating).getAttribute('role')).toBe('img');
    expect(drawn(heating).getAttribute('aria-label')).toBe(
      'Comfortable range 19.0° to 23.0°, room 21.4°, heating',
    );
    teardown();
    const idle = await mount('band-gauge', {
      low: 19,
      high: 23,
      room: 21.4,
      action: 'idle',
      roomLabel: 'feels like',
    });
    expect(drawn(idle).getAttribute('aria-label')).toBe(
      'Comfortable range 19.0° to 23.0°, feels like 21.4°',
    );
    teardown();
    // Paused or on hold: no word for what it isn't doing.
    const unknown = await mount('band-gauge', { low: 19, high: 23, room: 21, action: 'unknown' });
    expect(drawn(unknown).getAttribute('aria-label')).toBe(
      'Comfortable range 19.0° to 23.0°, room 21.0°',
    );
    teardown();
    const cooling = await mount('band-gauge', { low: 19, high: 23, room: 23.4, action: 'cooling' });
    expect(drawn(cooling).getAttribute('aria-label')).toBe(
      'Comfortable range 19.0° to 23.0°, room 23.4°, cooling',
    );
  });

  it('hides itself from screen readers when decorative', async () => {
    const el = await mount('band-gauge', { low: 19, high: 23, room: 21, decorative: true });
    expect(drawn(el).getAttribute('aria-hidden')).toBe('true');
    expect(drawn(el).hasAttribute('role')).toBe(false);
    expect(drawn(el).hasAttribute('aria-label')).toBe(false);
  });

  it.each([
    ['heating', 'heating'],
    ['cooling', 'cooling'],
    ['idle', 'idle'],
    ['bogus', 'unknown'],
  ])('is coloured for %s', async (action, kind) => {
    const el = await gauge({ low: 19, high: 23, room: 21, action });
    expect(drawn(el).classList.contains(kind)).toBe(true);
  });

  // #22: idle is the commonest state, and its inactive grey was grey on the
  // grey track; a light theme colour failed 3:1 against a light card.
  it('takes each action’s colour, moved towards the text’s', () => {
    expect(ruleFor('.gauge')).toContain(
      '--cb-gauge-color: color-mix(in oklab, var(--cb-gauge-base) 70%, var(--cb-text-primary));',
    );
    expect(ruleFor('.gauge')).toContain('--cb-gauge-base: var(--cb-action-unknown);');
    expect(ruleFor('.gauge.heating')).toBe('--cb-gauge-base: var(--cb-action-heating);');
    expect(ruleFor('.gauge.cooling')).toBe('--cb-gauge-base: var(--cb-action-cooling);');
    expect(ruleFor('.gauge.idle')).toBe('--cb-gauge-base: var(--cb-text-secondary);');
    expect(ruleFor('.band')).toContain('background: var(--cb-gauge-color);');
    expect(ruleFor('.marker')).toContain('border: 2.5px solid var(--cb-gauge-color);');
  });
});
