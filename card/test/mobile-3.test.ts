/**
 * #3: the card on a phone. The dialog fills the screen where HA's own do,
 * every control in it is 44 px to tap, a narrow tile stacks its gauge under
 * the temperature, and its status line keeps a range on one line.
 */

import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/modal.js';
import '../src/history-chart.js';
import '../src/dual-handle-slider.js';
import '../src/tabs/profiles-tab.js';
import '../src/tabs/settings-tab.js';
import '../src/transition-edit-dialog.js';
import '../src/profile-edit-dialog.js';
import '../src/tile.js';
import { keepRangesWhole } from '../src/tile.js';
import type { DualHandleSlider } from '../src/dual-handle-slider.js';
import type { ComfortBandTile } from '../src/tile.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

/** An element's styles, as written. */
function cssOf(tag: string): string {
  const styles = (customElements.get(tag) as unknown as { styles: unknown }).styles;
  return ([styles] as unknown[])
    .flat(Infinity)
    .map((s) => (s as { cssText: string }).cssText)
    .join('\n');
}

/** The inside of the at-rule that starts with `prelude`. */
function atBlock(css: string, prelude: string): string {
  const at = css.indexOf(prelude);
  if (at < 0) throw new Error(`no ${prelude}`);
  const open = css.indexOf('{', at);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i);
  }
  throw new Error(`unclosed ${prelude}`);
}

/** The styles with every at-rule's block taken out: the rules always in force. */
function topLevel(css: string): string {
  let out = css;
  for (let at = out.indexOf('@'); at >= 0; at = out.indexOf('@')) {
    const block = atBlock(out, out.slice(at, out.indexOf('{', at)));
    const end = out.indexOf(block, at) + block.length + 1;
    out = out.slice(0, at) + out.slice(end);
  }
  return out;
}

/** One property's value across every rule for exactly `selector`; the last wins. */
function prop(css: string, selector: string, name: string): string | undefined {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rules = [...css.matchAll(new RegExp(`(?:^|[}\\s])${escaped}\\s*\\{([^}]*)\\}`, 'g'))];
  if (rules.length === 0) throw new Error(`no rule for ${selector}`);
  let value: string | undefined;
  for (const [, body] of rules) {
    const body1 = body.replace(/\/\*[\s\S]*?\*\//g, '');
    for (const m of body1.matchAll(new RegExp(`(?:^|[;{\\s])${name}\\s*:\\s*([^;]+);`, 'g'))) {
      value = m[1].replace(/\s+/g, ' ').trim();
    }
  }
  return value;
}

describe('#3 the dialog on a phone', () => {
  const PHONE = '@media (max-width: 450px), (max-height: 500px)';

  it('fills the screen under 450 px wide or 500 px tall, where HA’s own dialogs do', () => {
    const phone = atBlock(cssOf('comfort-band-modal'), PHONE);
    expect(prop(phone, 'dialog', 'width')).toBe('100%');
    expect(prop(phone, 'dialog', 'max-width')).toBe('none');
    expect(prop(phone, 'dialog', 'height')).toBe('100%');
    expect(prop(phone, 'dialog', 'max-height')).toBe('none');
    expect(prop(phone, 'dialog', 'margin')).toBe('0');
    expect(prop(phone, 'dialog', 'border-radius')).toBe('0');
    expect(prop(phone, 'dialog', 'box-shadow')).toBe('none');
    expect(prop(phone, '.frame', 'height')).toBe('100%');
  });

  it('keeps clear of a notch and the home indicator, inside its own size', () => {
    const phone = atBlock(cssOf('comfort-band-modal'), PHONE);
    expect(prop(phone, 'dialog', 'padding')).toBe(
      'env(safe-area-inset-top, 0) env(safe-area-inset-right, 0) env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0)',
    );
    // Without it, the padding would make the dialog wider and taller than the screen.
    expect(prop(phone, 'dialog', 'box-sizing')).toBe('border-box');
  });

  it('floats over the dashboard as before on anything larger', () => {
    const always = topLevel(cssOf('comfort-band-modal'));
    expect(prop(always, 'dialog', 'width')).toBe('min(90vw, var(--cb-modal-max-width))');
    expect(prop(always, 'dialog', 'max-height')).toBe('min(90vh, 720px)');
    expect(prop(always, 'dialog', 'margin-block')).toBe('max(16px, 5vh) auto');
    expect(prop(always, 'dialog', 'border-radius')).toBe('var(--cb-radius-card)');
  });

  it('makes the ✕ 44 px each way without making the header taller', () => {
    const css = topLevel(cssOf('comfort-band-modal'));
    expect(prop(css, '.close', 'min-width')).toBe('44px');
    expect(prop(css, '.close', 'min-height')).toBe('44px');
    expect(prop(css, '.close', 'padding')).toBe('0');
    // 44 px less 7 above and below: the 30 px it took before.
    expect(prop(css, '.close', 'margin')).toBe('-7px -7px -7px 0');
  });

  it('makes the Now, Schedule and Advanced tabs 44 px tall', () => {
    expect(prop(topLevel(cssOf('comfort-band-modal')), 'nav button', 'min-height')).toBe('44px');
  });
});

describe('#3 the History chart', () => {
  it('makes each legend toggle 44 px tall and at least as wide', () => {
    const css = cssOf('comfort-band-history-chart');
    expect(prop(css, '.legend .toggle', 'display')).toBe('inline-flex');
    expect(prop(css, '.legend .toggle', 'align-items')).toBe('center');
    expect(prop(css, '.legend .toggle', 'min-width')).toBe('44px');
    expect(prop(css, '.legend .toggle', 'min-height')).toBe('44px');
  });

  it('closes the gap between legend rows, so one toggle’s area doesn’t reach into the next', () => {
    const css = cssOf('comfort-band-history-chart');
    expect(prop(css, '.legend', 'row-gap')).toBe('0');
    expect(prop(css, '.legend', 'align-items')).toBe('center');
  });

  it('makes each range button at least 44 px wide', () => {
    expect(prop(cssOf('comfort-band-history-chart'), '.ranges button', 'min-width')).toBe('44px');
  });
});

describe('#3 the exact-range slider', () => {
  /** 16–26° over a 200 px track: 20 px a degree; 19° at 60 px, 22° at 120,
   *  the point between them (20.5°) at 90. */
  async function slider(): Promise<DualHandleSlider> {
    const el = await mount('dual-handle-slider', {
      min: 16,
      max: 26,
      step: 0.5,
      low: 19,
      high: 22,
    });
    const track = el.shadowRoot!.querySelector<HTMLElement>('.track')!;
    track.getBoundingClientRect = () =>
      ({ left: 0, right: 200, width: 200, top: 0, bottom: 6, height: 6 }) as DOMRect;
    return el;
  }

  function thumbs(el: DualHandleSlider): [HTMLElement, HTMLElement] {
    const [low, high] = el.shadowRoot!.querySelectorAll<HTMLElement>('.thumb');
    return [low, high];
  }

  function pointer(target: Element, type: string, clientX: number): void {
    const Ctor = window.PointerEvent ?? MouseEvent;
    target.dispatchEvent(new Ctor(type, { bubbles: true, composed: true, clientX }));
  }

  it('gives each thumb a 44 px tap area, the thumb drawn the size it was', () => {
    const css = cssOf('dual-handle-slider');
    expect(prop(css, ':host', '--thumb-size')).toBe('20px');
    expect(prop(css, '.thumb', 'width')).toBe('var(--thumb-size)');
    expect(prop(css, '.thumb::before', 'content')).toBe("''");
    expect(prop(css, '.thumb::before', 'position')).toBe('absolute');
    // (20 − 44) / 2 = −12 px all round: 44 px each way, centred.
    expect(prop(css, '.thumb::before', 'inset')).toBe('calc((var(--thumb-size) - 44px) / 2)');
  });

  it('takes the low handle when the pointer is nearer it, though in the high thumb’s area', async () => {
    const el = await slider();
    const [, high] = thumbs(el);
    const input = vi.fn();
    el.addEventListener('input', input);
    pointer(high, 'pointerdown', 85);
    pointer(high, 'pointermove', 65);
    pointer(high, 'pointerup', 65);
    expect([el.low, el.high]).toEqual([18, 22]);
    expect(input).toHaveBeenCalled();
  });

  it('takes the high handle when the pointer is nearer it, though in the low thumb’s area', async () => {
    const el = await slider();
    const [low] = thumbs(el);
    pointer(low, 'pointerdown', 95);
    pointer(low, 'pointermove', 135);
    pointer(low, 'pointerup', 135);
    expect([el.low, el.high]).toEqual([19, 24]);
  });

  it('takes the high handle exactly between the two, as the track does', async () => {
    const el = await slider();
    const [low] = thumbs(el);
    pointer(low, 'pointerdown', 90);
    pointer(low, 'pointermove', 110);
    pointer(low, 'pointerup', 110);
    expect([el.low, el.high]).toEqual([19, 23]);
  });

  it('keeps the thumb its distance from the pointer, rather than jumping to it', async () => {
    const el = await slider();
    const [low] = thumbs(el);
    const input = vi.fn();
    el.addEventListener('input', input);
    // Taken 10 px right of its middle (19° is at 60 px).
    pointer(low, 'pointerdown', 70);
    pointer(low, 'pointermove', 70);
    expect(el.low).toBe(19);
    expect(input).not.toHaveBeenCalled();
    pointer(low, 'pointermove', 50);
    expect(el.low).toBe(18);
    pointer(low, 'pointerup', 50);
  });

  it('still moves the nearer handle to a press on the track', async () => {
    const el = await slider();
    const track = el.shadowRoot!.querySelector('.track')!;
    pointer(track, 'pointerdown', 50);
    expect([el.low, el.high]).toEqual([18.5, 22]);
    pointer(track, 'pointerdown', 90);
    expect([el.low, el.high]).toEqual([18.5, 20.5]);
  });
});

describe('#3 the profile list', () => {
  it('makes “+ New profile” and the ⋮ menu’s items 44 px tall', () => {
    const css = cssOf('comfort-band-profiles-tab');
    expect(prop(css, '.new-profile', 'min-height')).toBe('44px');
    expect(prop(css, '.menu button', 'min-height')).toBe('44px');
  });
});

describe('#3 text fields and choices', () => {
  it.each(['transition-edit-dialog', 'profile-edit-dialog'])(
    'makes %s’s fields 44 px tall, in type iOS doesn’t zoom into',
    (tag) => {
      const css = cssOf(tag);
      expect(prop(css, 'input', 'min-height')).toBe('44px');
      expect(prop(css, 'input', 'box-sizing')).toBe('border-box');
      expect(prop(css, 'input', 'font-size')).toBe('16px');
    },
  );

  it('sets the settings’ drop-downs in type iOS doesn’t zoom into', () => {
    expect(prop(cssOf('comfort-band-settings-tab'), '.choice', 'font-size')).toBe('16px');
  });
});

describe('#3 a narrow tile', () => {
  const NARROW = '@container (max-width: 215px)';

  async function tile(statusText: string): Promise<ComfortBandTile> {
    return mount('comfort-band-tile', {
      zoneName: 'Study',
      temperature: 21.3,
      low: 19.5,
      high: 22.5,
      action: 'heating',
      statusKind: 'heating',
      statusText,
    } as Partial<ComfortBandTile>);
  }

  it('is measured by its own width, not the screen’s', () => {
    expect(prop(topLevel(cssOf('comfort-band-tile')), '.tile', 'container-type')).toBe(
      'inline-size',
    );
  });

  it('puts the gauge under the temperature, at the tile’s width, below 240 px', () => {
    const narrow = atBlock(cssOf('comfort-band-tile'), NARROW);
    expect(prop(narrow, '.body', 'flex-direction')).toBe('column');
    expect(prop(narrow, '.body', 'align-items')).toBe('stretch');
    expect(prop(narrow, '.gauge-wrap', 'flex')).toBe('none');
  });

  it('keeps the gauge beside the temperature on a wider tile', () => {
    const always = topLevel(cssOf('comfort-band-tile'));
    expect(prop(always, '.body', 'flex-direction')).toBeUndefined();
    expect(prop(always, '.gauge-wrap', 'flex')).toBe('1');
  });

  it('keeps a range on one line, the words unchanged', async () => {
    const text = 'Heating · 19.5–22.5° until 09:00';
    const el = await tile(text);
    const status = el.shadowRoot!.querySelector('.status span')!;
    expect(status.textContent).toBe(text);
    const kept = [...status.querySelectorAll('.nowrap')].map((s) => s.textContent);
    expect(kept).toEqual(['19.5–22.5°']);
    expect(prop(cssOf('comfort-band-tile'), '.nowrap', 'white-space')).toBe('nowrap');
  });

  it('keeps each range whole, whole degrees and below zero included', () => {
    const parts = (text: string) =>
      keepRangesWhole(text).map((p) => (typeof p === 'string' ? p : `[${String(p.values[0])}]`));
    expect(parts('Comfortable · 17–24° for a peak until 6 pm')).toEqual([
      'Comfortable · ',
      '[17–24°]',
      ' for a peak until 6 pm',
    ]);
    expect(parts('Adjusting to 18.5–21° from 17.5–23°')).toEqual([
      'Adjusting to ',
      '[18.5–21°]',
      ' from ',
      '[17.5–23°]',
      '',
    ]);
    expect(parts('A bit cool · -2–5°')).toEqual(['A bit cool · ', '[-2–5°]', '']);
    expect(parts('On hold: the room sensor is offline')).toEqual([
      'On hold: the room sensor is offline',
    ]);
  });
});
