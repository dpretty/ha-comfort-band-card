/**
 * #108: the disclosure chevrons (every Advanced section, Settings'
 * Fine-tuning, Diagnostics' More) were spaced from their words by a physical
 * margin, so in a right-to-left layout (HA in Hebrew or Arabic) only 2 px
 * separated a chevron from its words, and the closed chevron pointed right,
 * away from them. Each is now spaced by logical margins, and in right-to-left
 * the closed chevron is turned to point left, towards its words. Open, it
 * points down in both directions.
 *
 * The right-to-left turn is its own rule (`:dir(rtl)`): a browser without
 * `:dir()` drops just that rule and keeps the rest.
 *
 * jsdom has no layout or pseudo-element styles, and its `:dir()` doesn't
 * follow the page's direction, so this pins the rules; real browsers check
 * the gap and the turn. Each tab's markup test checks no `dir` is set on the
 * chevrons' sections or headings.
 */

import { describe, expect, it } from 'vitest';
import '../src/tabs/advanced-tab.js';
import '../src/tabs/settings-tab.js';
import '../src/tabs/diagnostics-tab.js';
import { cssRules } from './_css.js';

/** A chevron's rules, whole: every rule drawing a summary's `::before`. */
const chevron = (tag: string) =>
  cssRules(tag).filter((r) => r.selector.includes('summary') && r.selector.includes('::before'));

const BORDERS =
  'border-right: 2px solid var(--cb-text-secondary); ' +
  'border-bottom: 2px solid var(--cb-text-secondary); ';

describe('#108 the disclosure chevrons in right-to-left', () => {
  // Each chevron, closed and open, in either direction: a physical margin,
  // the turn missing or in a selector list with others, or a turn that
  // also applies when open, fails here.
  it("spaces each Advanced section's chevron on its words' side, and turns it to them", () => {
    expect(chevron('comfort-band-advanced-tab')).toEqual([
      {
        at: '',
        selector: 'summary::before',
        body:
          "content: ''; align-self: center; flex: none; width: 6px; height: 6px; " +
          'margin-block: 0; margin-inline: 2px 6px; ' +
          BORDERS +
          'transform: rotate(-45deg); transition: transform 0.15s ease;',
      },
      {
        at: '',
        selector: 'details:not([open]) > summary:dir(rtl)::before',
        body: 'transform: rotate(135deg);',
      },
      { at: '', selector: 'details[open] > summary::before', body: 'transform: rotate(45deg);' },
    ]);
  });

  for (const [tag, cls] of [
    ['comfort-band-settings-tab', 'fine'],
    ['comfort-band-diagnostics-tab', 'more'],
  ] as const) {
    it(`spaces the ${cls} chevron in ${tag} on its words' side, and turns it to them`, () => {
      expect(chevron(tag)).toEqual([
        {
          at: '',
          selector: `details.${cls} > summary::before`,
          body:
            "content: ''; flex: none; width: 6px; height: 6px; " +
            'margin-block: 0; margin-inline: 2px 8px; ' +
            BORDERS +
            'transform: rotate(-45deg); transition: transform 0.15s ease;',
        },
        {
          at: '',
          selector: `details.${cls}:not([open]) > summary:dir(rtl)::before`,
          body: 'transform: rotate(135deg);',
        },
        {
          at: '',
          selector: `details.${cls}[open] > summary::before`,
          body: 'transform: rotate(45deg);',
        },
      ]);
    });
  }
});
