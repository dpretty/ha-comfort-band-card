/**
 * #101: each chart's legend swatch was spaced from its words by a physical
 * `margin-right`, so in a right-to-left layout (HA in Hebrew or Arabic) it
 * sat flush against them, and in forced colours its ring touched the next
 * glyph. The gap is now on the words' side in either direction
 * (`margin-inline-end`).
 *
 * jsdom has no layout, so this pins the rules; real browsers check the gap.
 */

import { describe, expect, it } from 'vitest';
import '../src/history-chart.js';
import '../src/schedule-chart.js';
import { cssRules } from './_css.js';

/** Every margin or padding declared by the rules naming `name`, whole. */
function spacing(tag: string, name: string): string[] {
  return cssRules(tag)
    .filter((r) => r.selector.includes(name))
    .flatMap((r) => r.body.split(/;\s*/))
    .filter((d) => /^(margin|padding)/.test(d));
}

describe('#101 the legend swatches in right-to-left', () => {
  // The swatch's only spacing is on its words' side: a physical margin or
  // padding added to any rule naming it, or the gap's size changed, fails.
  it("spaces each History swatch from its words on the words' side", () => {
    expect(spacing('comfort-band-history-chart', 'swatch')).toEqual(['margin-inline-end: 4px']);
  });

  it("spaces each Schedule swatch from its word on the word's side", () => {
    expect(spacing('comfort-band-schedule-chart', '::before')).toEqual(['margin-inline-end: 6px']);
  });

  // Nothing in either legend is spaced by a physical side.
  it('gives neither legend a left or right margin or padding', () => {
    for (const tag of ['comfort-band-history-chart', 'comfort-band-schedule-chart']) {
      expect(spacing(tag, 'legend').filter((d) => /-(left|right)\b/.test(d))).toEqual([]);
    }
  });
});
