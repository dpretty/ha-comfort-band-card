/**
 * #87: in forced colours (a Windows contrast theme) every tab of a room's
 * dialog took the text colour, words and underline, so the tab on show
 * looked like the others. The theme's selection colours fill it there, as
 * #73 and #89 did, every colour its own (or forced colours would put its
 * words on a plate of the page's colour). The keys take focus to it, so its
 * focus ring goes inside, in its words' colour.
 *
 * jsdom has no forced colours or layout, so this pins the rules; real
 * browsers check the look.
 */

import { describe, expect, it } from 'vitest';
import '../src/modal.js';
import { cssRules } from './_css.js';

const ON_SHOW = "nav button[aria-selected='true']";
const FORCED = '@media (forced-colors: active)';

describe('#87 the tab on show in forced colours', () => {
  // Read in each test, so CSS the helper can't parse fails a named test.
  const modal = () => cssRules('comfort-band-modal');

  // Every rule naming `nav`, whole, in and out of forced colours: one of
  // them added, changed or put in another order among them fails here (one
  // moved past rules that don't name `nav` doesn't). A rule reaching the
  // tabs under a selector that doesn't name `nav` isn't caught, unless it's
  // in forced colours or sets forced-color-adjust (the next test); nor is an
  // inline style.
  it('fills the tab on show with the selection colours, its ring inside, and nothing else changes', () => {
    expect(modal().filter((r) => r.selector.includes('nav'))).toEqual([
      {
        at: '',
        selector: 'nav',
        body:
          'flex-shrink: 0; display: flex; gap: 0; ' +
          'border-bottom: 1px solid var(--divider-color, #e0e0e0); overflow-x: auto;',
      },
      {
        at: '',
        selector: 'nav button',
        body:
          'font: inherit; font-size: 13px; min-height: 44px; padding: 10px 14px; ' +
          'background: transparent; border: none; border-bottom: 2px solid transparent; ' +
          'color: var(--cb-text-secondary); cursor: pointer; white-space: nowrap;',
      },
      {
        at: '',
        selector: ON_SHOW,
        body:
          'color: var(--cb-accent, var(--primary-color, #03a9f4)); ' +
          'border-bottom-color: var(--cb-accent, var(--primary-color, #03a9f4));',
      },
      {
        at: FORCED,
        selector: ON_SHOW,
        body:
          'forced-color-adjust: none; background: Highlight; ' +
          'border-bottom-color: Highlight; color: HighlightText;',
      },
      {
        at: FORCED,
        selector: `${ON_SHOW}:focus-visible`,
        body: 'outline: 2px solid HighlightText; outline-offset: -4px;',
      },
    ]);
  });

  // So no other forced-colours rule, under any selector, undoes them there,
  // and no other rule opts in or out of forced colours. (A rule outside
  // forced colours can still reach the opted-out tab: see above.)
  it("are the dialog's only forced-colours rules, and its only forced-color-adjust", () => {
    const rules = modal();
    expect(rules.filter((r) => r.at.includes('forced-colors')).map((r) => r.selector)).toEqual([
      ON_SHOW,
      `${ON_SHOW}:focus-visible`,
    ]);
    expect(
      rules.filter((r) => r.body.includes('forced-color-adjust')).map((r) => r.selector),
    ).toEqual([ON_SHOW]);
  });
});
