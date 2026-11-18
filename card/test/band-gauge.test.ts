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

/** The gauge's CSS rules (the shared tokens' too, unless `own`), comments
 *  stripped, each with the at-rules it's in. */
function rules(own = false): Array<{ at: string; selectors: string[]; body: string }> {
  const styles = (
    customElements.get('band-gauge') as unknown as { styles: Array<{ cssText: string }> }
  ).styles.flat();
  const css = (own ? styles.slice(-1) : styles)
    .map((s) => s.cssText)
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const out: Array<{ at: string; selectors: string[]; body: string }> = [];
  const open: string[] = [];
  let text = '';
  for (const ch of css) {
    if (ch === '{') {
      open.push(text.replace(/\s+/g, ' ').trim());
      text = '';
    } else if (ch === '}') {
      const head = open.pop()!;
      if (!head.startsWith('@')) {
        out.push({
          at: open.join(' '),
          selectors: head.split(',').map((x) => x.trim()),
          body: text.replace(/\s+/g, ' ').trim(),
        });
      }
      text = '';
    } else {
      text += ch;
    }
  }
  return out;
}
/** Every declaration for a selector, across the rules naming it, in `at`. */
const ruleFor = (sel: string, at = '') =>
  rules()
    .filter((r) => r.at === at && r.selectors.includes(sel))
    .map((r) => r.body)
    .join(' ');

describe('band-gauge', () => {
  it('draws the track, the band, the marker and the band’s limits', async () => {
    const el = await gauge({ low: 19, high: 23, room: 21, action: 'idle' });
    expect(part(el, '.track')).not.toBeNull();
    expect(part(el, '.band')).not.toBeNull();
    expect(part(el, '.marker')).not.toBeNull();
    // As the status line writes them: no trailing ".0".
    expect(limits(el)).toEqual(['19°', '23°']);
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
    expect(limits(el)).toEqual(['19.5°', '23°']);
    expect(part(el, '.limits .low')!.textContent!.trim()).toBe('19.5°');
    expect(part(el, '.limits .high')!.textContent!.trim()).toBe('23°');
    // The band, and the labels' places, from the lower end too.
    expect(parseFloat(part(el, '.band')!.style.left)).toBeCloseTo((4.5 / 13) * 100, 3);
    expect(parseFloat(part(el, '.band')!.style.width)).toBeCloseTo((3.5 / 13) * 100, 3);
    expect(parseFloat(drawn(el).style.getPropertyValue('--lo'))).toBeCloseTo((4.5 / 13) * 100, 3);
    expect(parseFloat(drawn(el).style.getPropertyValue('--hi'))).toBeCloseTo((8 / 13) * 100, 3);
  });

  // Painted in this order: the band over the track, the marker over both;
  // the limits under the bar, the low one at the band's start.
  it('draws track, band and marker in that order, the limits under them', async () => {
    const el = await gauge({ low: 19, high: 23, room: 21, action: 'idle' });
    const classes = (sel: string) =>
      Array.from(part(el, sel)!.children).map((c) => c.className.trim());
    expect(classes('.gauge')).toEqual(['bar', 'limits']);
    expect(classes('.bar')).toEqual(['track', 'band', 'marker']);
    expect(classes('.limits')).toEqual(['low', 'high']);
    expect(part(el, '.limits .low')!.textContent!.trim()).toBe('19°');
    expect(part(el, '.limits .high')!.textContent!.trim()).toBe('23°');
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
    expect(ruleFor('.limits .low')).toContain(
      'left: min(max(var(--lo), 5ch + 2px), 100% - 5ch - 2px);',
    );
    expect(ruleFor('.limits .low')).toContain('transform: translateX(-100%);');
    expect(ruleFor('.limits .low')).toContain('padding-right: 2px;');
    expect(ruleFor('.limits .high').replace(/\( /g, '(').replace(/ \)/g, ')')).toContain(
      'left: max(min(var(--hi), 100% - 5ch - 2px), min(max(var(--lo), 5ch + 2px), 100% - 5ch - 2px));',
    );
    expect(ruleFor('.limits .high')).toContain('padding-left: 2px;');
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
    expect(ruleFor('.gauge.idle')).toBe('--cb-gauge-base: var(--cb-action-idle);');
    expect(ruleFor('.band')).toContain('background: var(--cb-gauge-color);');
    expect(ruleFor('.marker')).toContain('border: 2.5px solid var(--cb-gauge-color);');
  });

  // #22 review: the test DOM (jsdom) lays nothing out, so the layout's load-bearing
  // declarations are pinned here; a real browser checked what they draw.
  it('lays the track, band and marker on one centre line in a 24 px bar', () => {
    for (const d of ['position: relative;', 'height: 24px;']) expect(ruleFor('.bar')).toContain(d);
    for (const sel of ['.track', '.band']) {
      for (const d of ['position: absolute;', 'top: 50%;', 'transform: translateY(-50%);']) {
        expect(ruleFor(sel)).toContain(d);
      }
    }
    for (const d of ['left: 0;', 'right: 0;', 'height: 4px;', 'background: var(--cb-track-bg);']) {
      expect(ruleFor('.track')).toContain(d);
    }
    expect(ruleFor('.band')).toContain('height: 6px;');
    for (const d of [
      'position: absolute;',
      'top: 50%;',
      'transform: translate(-50%, -50%);',
      'background: var(--ha-card-background, var(--card-background-color, #ffffff));',
    ]) {
      expect(ruleFor('.marker')).toContain(d);
    }
    for (const d of ['position: relative;', 'line-height: 14px;']) {
      expect(ruleFor('.limits')).toContain(d);
    }
    for (const d of ['position: absolute;', 'top: 0;'])
      expect(ruleFor('.limits span')).toContain(d);
  });

  // In HA's own font and the gauge's 11 px, inherited, and measured in it.
  it('writes the limits in the font it inherits, at 11 px', () => {
    expect(ruleFor(':host')).toContain('font-size: 11px;');
    expect(ruleFor(':host')).toContain('container-type: inline-size;');
    expect(ruleFor('.limits')).not.toContain('font-family');
    expect(ruleFor('.limits')).not.toContain('font-size');
  });

  it('writes no limits on a gauge too narrow for both', () => {
    expect(ruleFor('.limits span', '@container (width < 11ch)')).toBe('visibility: hidden;');
  });

  // #22 review: backgrounds become Canvas in forced colours; the SVG fills
  // they replaced weren't.
  it('draws in the system’s colours in forced colours', () => {
    const at = '@media (forced-colors: active)';
    for (const sel of ['.track', '.band', '.marker']) {
      expect(ruleFor(sel, at)).toContain('forced-color-adjust: none;');
    }
    expect(ruleFor('.track', at)).toContain('background: GrayText;');
    expect(ruleFor('.band', at)).toContain('background: CanvasText;');
    expect(ruleFor('.marker', at)).toContain('border-color: CanvasText;');
    expect(ruleFor('.marker', at)).toContain('background: Canvas;');
  });

  it('prints as shown', () => {
    expect(ruleFor('.bar')).toMatch(/(^|; )print-color-adjust: exact;/);
    expect(ruleFor('.bar')).toContain('-webkit-print-color-adjust: exact;');
  });

  // #22 review: each rule whole, so a declaration added that overrides
  // another (an extra transform, a forced-color-adjust, a print setting)
  // fails here too. A change to the gauge's CSS is a change to this list.
  it('has exactly these rules', () => {
    const norm = (body: string) => body.replace(/\( /g, '(').replace(/ \)/g, ')');
    expect(rules(true).map((r) => ({ ...r, body: norm(r.body) }))).toEqual([
      {
        at: '',
        selectors: [':host'],
        body: 'display: block; width: 100%; font-size: 11px; container-type: inline-size;',
      },
      {
        at: '',
        selectors: ['.gauge'],
        body: '--cb-gauge-color: color-mix(in oklab, var(--cb-gauge-base) 70%, var(--cb-text-primary)); --cb-gauge-base: var(--cb-action-unknown);',
      },
      { at: '', selectors: ['.gauge.heating'], body: '--cb-gauge-base: var(--cb-action-heating);' },
      { at: '', selectors: ['.gauge.cooling'], body: '--cb-gauge-base: var(--cb-action-cooling);' },
      { at: '', selectors: ['.gauge.idle'], body: '--cb-gauge-base: var(--cb-action-idle);' },
      {
        at: '',
        selectors: ['.bar'],
        body: 'position: relative; height: 24px; print-color-adjust: exact; -webkit-print-color-adjust: exact;',
      },
      {
        at: '',
        selectors: ['.track', '.band'],
        body: 'position: absolute; top: 50%; transform: translateY(-50%);',
      },
      {
        at: '',
        selectors: ['.track'],
        body: 'left: 0; right: 0; height: 4px; border-radius: 2px; background: var(--cb-track-bg);',
      },
      {
        at: '',
        selectors: ['.band'],
        body: 'height: 6px; border-radius: 3px; background: var(--cb-gauge-color);',
      },
      {
        at: '',
        selectors: ['.marker'],
        body: 'position: absolute; top: 50%; width: 9px; height: 9px; box-sizing: border-box; border-radius: 50%; border: 2.5px solid var(--cb-gauge-color); background: var(--ha-card-background, var(--card-background-color, #ffffff)); transform: translate(-50%, -50%);',
      },
      {
        at: '',
        selectors: ['.limits'],
        body: 'position: relative; height: 14px; line-height: 14px; color: var(--cb-text-secondary); font-variant-numeric: tabular-nums; white-space: nowrap;',
      },
      { at: '', selectors: ['.limits span'], body: 'position: absolute; top: 0;' },
      {
        at: '',
        selectors: ['.limits .low'],
        body: 'left: min(max(var(--lo), 5ch + 2px), 100% - 5ch - 2px); transform: translateX(-100%); padding-right: 2px;',
      },
      {
        at: '',
        selectors: ['.limits .high'],
        body: 'left: max(min(var(--hi), 100% - 5ch - 2px), min(max(var(--lo), 5ch + 2px), 100% - 5ch - 2px)); padding-left: 2px;',
      },
      { at: '@container (width < 11ch)', selectors: ['.limits span'], body: 'visibility: hidden;' },
      {
        at: '@media (forced-colors: active)',
        selectors: ['.track', '.band', '.marker'],
        body: 'forced-color-adjust: none;',
      },
      {
        at: '@media (forced-colors: active)',
        selectors: ['.track'],
        body: 'background: GrayText;',
      },
      {
        at: '@media (forced-colors: active)',
        selectors: ['.band'],
        body: 'background: CanvasText;',
      },
      {
        at: '@media (forced-colors: active)',
        selectors: ['.marker'],
        body: 'border-color: CanvasText; background: Canvas;',
      },
    ]);
  });
});
