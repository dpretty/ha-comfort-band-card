/**
 * #3: the card on a phone. The dialog fills the screen where HA's own do,
 * every control in it is 44 px to tap, a narrow tile puts its gauge under
 * the temperature, and its status line keeps a range on one line.
 *
 * jsdom lays nothing out, so the styles are checked as written: each rule,
 * its at-rule's exact condition, and its place in the cascade. The author's
 * browser runs check what they do.
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

/** Where the at-rule whose condition is exactly `prelude` starts. */
function atIndex(css: string, prelude: string): number {
  for (let at = css.indexOf(prelude); at >= 0; at = css.indexOf(prelude, at + 1)) {
    if (/^\s*\{/.test(css.slice(at + prelude.length))) return at;
  }
  throw new Error(`no ${prelude}`);
}

/** The inside of the at-rule whose condition is exactly `prelude`. */
function atBlock(css: string, prelude: string): string {
  const open = css.indexOf('{', atIndex(css, prelude));
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
    const block = atBlock(out, out.slice(at, out.indexOf('{', at)).trimEnd());
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

  it('fills the screen at 450 px wide or 500 px tall, or less, where HA’s own dialogs do', () => {
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

  it('comes after the floating dialog’s rules, so on a phone it wins', () => {
    const css = cssOf('comfort-band-modal');
    expect(atIndex(css, PHONE)).toBeGreaterThan(css.search(/(^|[}\s])dialog\s*\{/));
    expect(atIndex(css, PHONE)).toBeGreaterThan(css.search(/(^|[}\s])\.frame\s*\{/));
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
    // 44 px less 7 above and below: the 30 px it took before. At the line's
    // end, whichever way it runs, so the ✕ keeps its place right to left too.
    expect(prop(css, '.close', 'margin-block')).toBe('-7px');
    expect(prop(css, '.close', 'margin-inline-end')).toBe('-7px');
    expect(prop(css, '.close', 'margin')).toBeUndefined();
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

  it('lets the toggles’ height space the legend’s rows, with no gap as well', () => {
    const css = cssOf('comfort-band-history-chart');
    expect(prop(css, '.legend', 'row-gap')).toBe('0');
    expect(prop(css, '.legend', 'align-items')).toBe('center');
  });

  it('makes each range button at least 44 px wide', () => {
    expect(prop(cssOf('comfort-band-history-chart'), '.ranges button', 'min-width')).toBe('44px');
  });
});

describe('#3 the exact-range slider', () => {
  /** 16–26° over a 200 px track 10 px from the left: 20 px a degree. The
   *  handles a degree apart, as they are on a phone with a narrow range:
   *  21.5° at 120 px and 22.5° at 140, the point between them at 130. Their
   *  44 px areas overlap from 118 to 142, the high one's on top. */
  async function slider(low = 21.5, high = 22.5): Promise<DualHandleSlider> {
    const el = await mount('dual-handle-slider', { min: 16, max: 26, step: 0.5, low, high });
    const track = el.shadowRoot!.querySelector<HTMLElement>('.track')!;
    track.getBoundingClientRect = () =>
      ({ left: 10, right: 210, width: 200, top: 0, bottom: 6, height: 6 }) as DOMRect;
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

  it('keeps the area 44 px while the thumb grows as it’s dragged', () => {
    const css = cssOf('dual-handle-slider');
    expect(prop(css, '.thumb.dragging', 'transform')).toBe('scale(1.15)');
    expect(prop(css, '.thumb.dragging::before', 'transform')).toBe('scale(calc(1 / 1.15))');
  });

  it('lets a swipe up or down that starts on a thumb scroll the panel', () => {
    expect(prop(cssOf('dual-handle-slider'), '.thumb', 'touch-action')).toBe('pan-y');
  });

  it('takes the low handle where the areas overlap, the pointer nearer it', async () => {
    const el = await slider();
    const [low, high] = thumbs(el);
    const input = vi.fn();
    el.addEventListener('input', input);
    // In the overlap, on the high thumb's area, 6 px from the low one's middle.
    pointer(high, 'pointerdown', 126);
    await el.updateComplete;
    expect(low.classList.contains('dragging')).toBe(true);
    expect(high.classList.contains('dragging')).toBe(false);
    pointer(high, 'pointermove', 106);
    pointer(high, 'pointerup', 106);
    expect([el.low, el.high]).toEqual([20.5, 22.5]);
    expect(input).toHaveBeenCalled();
  });

  it('takes the high handle where the areas overlap, the pointer nearer it', async () => {
    const el = await slider();
    const [low, high] = thumbs(el);
    pointer(high, 'pointerdown', 134);
    await el.updateComplete;
    expect(high.classList.contains('dragging')).toBe(true);
    expect(low.classList.contains('dragging')).toBe(false);
    pointer(high, 'pointermove', 154);
    pointer(high, 'pointerup', 154);
    expect([el.low, el.high]).toEqual([21.5, 23.5]);
  });

  it('takes the high handle exactly between the two, as the track does', async () => {
    const el = await slider();
    const [, high] = thumbs(el);
    pointer(high, 'pointerdown', 130);
    pointer(high, 'pointermove', 150);
    pointer(high, 'pointerup', 150);
    expect([el.low, el.high]).toEqual([21.5, 23.5]);
  });

  it('keeps the thumb its distance from the pointer, rather than jumping to it', async () => {
    const el = await slider();
    const [, high] = thumbs(el);
    const input = vi.fn();
    el.addEventListener('input', input);
    // Taken 6 px right of its middle (22.5° is at 140 px), outside the overlap.
    pointer(high, 'pointerdown', 146);
    pointer(high, 'pointermove', 146);
    expect(el.high).toBe(22.5);
    expect(input).not.toHaveBeenCalled();
    pointer(high, 'pointermove', 166);
    expect(el.high).toBe(23.5);
    pointer(high, 'pointerup', 166);
  });

  /** The `change` events' ranges. */
  function changes(el: DualHandleSlider): Array<[number, number]> {
    const seen: Array<[number, number]> = [];
    el.addEventListener('change', (e) => {
      const { low, high } = (e as CustomEvent<{ low: number; high: number }>).detail;
      seen.push([low, high]);
    });
    return seen;
  }

  it('ends a drag that moved the range with a change', async () => {
    const el = await slider();
    const [, high] = thumbs(el);
    const seen = changes(el);
    pointer(high, 'pointerdown', 146);
    pointer(high, 'pointermove', 166);
    pointer(high, 'pointerup', 166);
    expect(seen).toEqual([[21.5, 23.5]]);
  });

  it('fires nothing for a tap, or a touch taken to scroll before it moved anything', async () => {
    const el = await slider();
    const [low, high] = thumbs(el);
    const seen = changes(el);
    const input = vi.fn();
    el.addEventListener('input', input);
    pointer(high, 'pointerdown', 146);
    pointer(high, 'pointerup', 146);
    pointer(low, 'pointerdown', 110);
    pointer(low, 'pointercancel', 110);
    expect(seen).toEqual([]);
    expect(input).not.toHaveBeenCalled();
  });

  it('puts the handle back when the browser takes the touch to scroll', async () => {
    const el = await slider();
    const [, high] = thumbs(el);
    const seen = changes(el);
    pointer(high, 'pointerdown', 146);
    pointer(high, 'pointermove', 166);
    expect(el.high).toBe(23.5);
    pointer(high, 'pointercancel', 166);
    expect([el.low, el.high]).toEqual([21.5, 22.5]);
    // The range as it was: exact-range sends nothing for it, and lets go of
    // the dragged values.
    expect(seen).toEqual([[21.5, 22.5]]);
  });

  it('ends a drag back where it began with the range as it was', async () => {
    const el = await slider();
    const [, high] = thumbs(el);
    const seen = changes(el);
    pointer(high, 'pointerdown', 146);
    pointer(high, 'pointermove', 166);
    pointer(high, 'pointermove', 146);
    pointer(high, 'pointerup', 146);
    expect(seen).toEqual([[21.5, 22.5]]);
  });

  it('still moves the nearer handle to a press on the track', async () => {
    // 18° at 50 px and 24° at 170: the point between them (21°) at 110.
    const el = await slider(18, 24);
    const track = el.shadowRoot!.querySelector('.track')!;
    pointer(track, 'pointerdown', 90);
    expect([el.low, el.high]).toEqual([20, 24]);
    pointer(track, 'pointerdown', 190);
    expect([el.low, el.high]).toEqual([20, 25]);
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

  it('wraps the gauge under the temperature when there isn’t room for 110 px of it', () => {
    const css = topLevel(cssOf('comfort-band-tile'));
    expect(prop(css, '.body', 'display')).toBe('flex');
    expect(prop(css, '.body', 'flex-wrap')).toBe('wrap');
    expect(prop(css, '.body', 'gap')).toBe('var(--cb-gap-sm) var(--cb-gap-md)');
    // Grows to the line's width either way: beside the temperature, or under it.
    expect(prop(css, '.gauge-wrap', 'flex')).toBe('1 1 110px');
    expect(prop(css, '.gauge-wrap', 'min-width')).toBe('0');
  });

  it('is laid out by what it holds, so a tile placed at its own width keeps it', () => {
    // Containment would give it no width of its own: a 24 px sliver on a floorplan.
    const css = cssOf('comfort-band-tile');
    expect(css).not.toMatch(/container-type|contain\s*:|@container/);
  });

  it('keeps a range on one line, the words unchanged', async () => {
    const text = 'Heating · 19.5–22.5° until 09:00';
    const el = await tile(text);
    const status = el.shadowRoot!.querySelector('.status span')!;
    expect(status.textContent).toBe(text);
    const kept = [...status.querySelectorAll('.nowrap')].map((s) => s.textContent);
    expect(kept).toEqual(['19.5–22.5°']);
    // Only the range: the sentence still wraps.
    expect(status.classList.contains('nowrap')).toBe(false);
    expect(el.shadowRoot!.querySelector('.status')!.classList.contains('nowrap')).toBe(false);
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
