/**
 * #101: each chart's legend swatch was spaced from its words by a physical
 * `margin-right`, so in a right-to-left layout (HA in Hebrew or Arabic) the
 * margin fell outside the item. Most swatches sat flush against their words,
 * their forced-colours ring touching the next glyph (Heating and Cooling,
 * whose words follow a space, sat a space away). The gap is now on the words'
 * side in either direction (`margin-inline-end`).
 *
 * jsdom has no layout, so this pins the rules; real browsers check the gap.
 * The legends' markup carries no `dir` (the charts' own tests).
 */

import { describe, expect, it } from 'vitest';
import '../src/history-chart.js';
import '../src/schedule-chart.js';
import { cssRules, physical } from './_css.js';

const TAGS = ['comfort-band-history-chart', 'comfort-band-schedule-chart'];

/** Every declaration of the rules whose selector matches. */
function decls(tag: string, selector: RegExp): string[] {
  return cssRules(tag)
    .filter((r) => selector.test(r.selector))
    .flatMap((r) => r.body.split(/;\s*/))
    .filter(Boolean);
}

/** Every margin or padding declared by the rules naming `name`, whole. */
function spacing(tag: string, name: string): string[] {
  return decls(tag, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).filter((d) =>
    /^(margin|padding)/i.test(d),
  );
}

/** The card's own legend (`.legend`), not uPlot's (`.u-legend`). */
const LEGEND = /(^|[^\w-])\.legend\b/;

describe('#101 the legend swatches in right-to-left', () => {
  // The swatch's only spacing is on its words' side: a physical margin or
  // padding added to any rule naming it, or the gap's size changed, fails.
  it("spaces each History swatch from its words on the words' side", () => {
    expect(spacing('comfort-band-history-chart', 'swatch')).toEqual(['margin-inline-end: 4px']);
  });

  it("spaces each Schedule swatch from its word on the word's side", () => {
    expect(spacing('comfort-band-schedule-chart', '::before')).toEqual(['margin-inline-end: 6px']);
  });

  // Nothing in either legend is spaced or placed by a physical side, in any
  // rule naming `.legend` (in or out of forced colours).
  it('spaces and places nothing in either legend by a left or right side', () => {
    for (const tag of TAGS) expect(decls(tag, LEGEND).filter(physical)).toEqual([]);
  });

  // The gap follows each swatch's direction, which is the page's: a rule
  // naming either legend that sets its own would undo the fix.
  it('lets neither legend set its own direction', () => {
    for (const tag of TAGS) {
      expect(
        decls(tag, LEGEND).filter((d) => /^\s*(direction|unicode-bidi|writing-mode)\s*:/i.test(d)),
      ).toEqual([]);
    }
  });

  // The helper itself: each kind it should catch, and what it should pass.
  it('tells physical spacing from logical', () => {
    expect(
      [
        'margin-right: 4px',
        'PADDING-LEFT: 2px',
        'border-left: 1px solid',
        'left: 0',
        'inset: 0 auto 0 0',
        'float: right',
        'text-align: left',
        'margin: 0 4px 0 0',
        'padding: var(--cb-gap-sm) 0 0 6px',
      ].filter((d) => !physical(d)),
    ).toEqual([]);
    expect(
      [
        'margin-inline-end: 4px',
        'padding-top: var(--cb-gap-sm)',
        'margin: 0 4px',
        'margin: 0 4px 2px',
        'padding: 1px 2px 3px 2px',
        'text-align: center',
        'gap: var(--cb-gap-md)',
      ].filter(physical),
    ).toEqual([]);
  });
});
