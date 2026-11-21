/**
 * #3: the card on a phone. The dialog fills the screen where HA's own do,
 * its buttons, tabs, toggles and fields are 44 px to tap, a narrow tile puts
 * its gauge under the temperature, and its status line keeps a range on one
 * line. (The exact-range slider's handles stay as on main: 44 px tap areas
 * for them were cut back after two rounds of review.)
 *
 * jsdom lays nothing out, so the styles are checked as written: each rule
 * always in force outside any at-rule, and the phone's rules by their
 * at-rule's exact condition and its place in the cascade. The author's
 * browser runs check what they do.
 */

import { afterEach, describe, it, expect } from 'vitest';
import '../src/modal.js';
import '../src/history-chart.js';
import '../src/tabs/profiles-tab.js';
import '../src/tabs/settings-tab.js';
import '../src/transition-edit-dialog.js';
import '../src/profile-edit-dialog.js';
import '../src/tile.js';
import { keepRangesWhole } from '../src/tile.js';
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

/** The rules always in force for an element: none in an at-rule's block. */
function always(tag: string): string {
  return topLevel(cssOf(tag));
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

  it('scrolls the panel inside it, so nothing is cut off at the screen’s end', () => {
    const css = always('comfort-band-modal');
    expect(prop(css, '.frame', 'display')).toBe('flex');
    expect(prop(css, '.frame', 'flex-direction')).toBe('column');
    expect(prop(css, '.panel', 'flex')).toBe('1');
    expect(prop(css, '.panel', 'overflow-y')).toBe('auto');
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
    // The ✕ in the middle of its box, where the smaller box had it.
    expect(prop(css, '.close', 'display')).toBe('inline-flex');
    expect(prop(css, '.close', 'align-items')).toBe('center');
    expect(prop(css, '.close', 'justify-content')).toBe('center');
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
    const css = always('comfort-band-history-chart');
    expect(prop(css, '.legend .toggle', 'display')).toBe('inline-flex');
    expect(prop(css, '.legend .toggle', 'align-items')).toBe('center');
    expect(prop(css, '.legend .toggle', 'min-width')).toBe('44px');
    expect(prop(css, '.legend .toggle', 'min-height')).toBe('44px');
  });

  it('lets the toggles’ height space the legend’s rows, with no gap as well', () => {
    const css = always('comfort-band-history-chart');
    expect(prop(css, '.legend', 'row-gap')).toBe('0');
    expect(prop(css, '.legend', 'align-items')).toBe('center');
  });

  it('comes after the shared legend rule, whose gap would put the rows apart again', () => {
    const css = always('comfort-band-history-chart');
    const shared = css.search(/(^|[}\s])\.legend\s*\{[^}]*\bgap\s*:/);
    const own = css.search(/(^|[}\s])\.legend\s*\{[^}]*\brow-gap\s*:\s*0/);
    expect(shared).toBeGreaterThanOrEqual(0);
    expect(own).toBeGreaterThan(shared);
  });

  it('makes each range button at least 44 px wide', () => {
    expect(prop(always('comfort-band-history-chart'), '.ranges button', 'min-width')).toBe('44px');
  });
});

describe('#3 the profile list', () => {
  it('makes “+ New profile” and the ⋮ menu’s items 44 px tall', () => {
    const css = always('comfort-band-profiles-tab');
    expect(prop(css, '.new-profile', 'min-height')).toBe('44px');
    expect(prop(css, '.menu button', 'min-height')).toBe('44px');
  });
});

describe('#3 text fields and choices', () => {
  it.each(['transition-edit-dialog', 'profile-edit-dialog'])(
    'makes %s’s fields 44 px tall, in type iOS doesn’t zoom into',
    (tag) => {
      const css = always(tag);
      expect(prop(css, 'input', 'min-height')).toBe('44px');
      expect(prop(css, 'input', 'box-sizing')).toBe('border-box');
      expect(prop(css, 'input', 'font-size')).toBe('16px');
    },
  );

  it('sets the settings’ drop-downs in type iOS doesn’t zoom into', () => {
    expect(prop(always('comfort-band-settings-tab'), '.choice', 'font-size')).toBe('16px');
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
    expect(prop(always('comfort-band-tile'), '.nowrap', 'white-space')).toBe('nowrap');
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
    expect(parts('Comfortable · -6–-1°')).toEqual(['Comfortable · ', '[-6–-1°]', '']);
    expect(parts('On hold: the room sensor is offline')).toEqual([
      'On hold: the room sensor is offline',
    ]);
  });
});
