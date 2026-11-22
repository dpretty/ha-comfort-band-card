/**
 * #89: in forced colours (a Windows contrast theme) the Now tab's length
 * picked lost its fill, leaving a 2 px border against the others' 1 px, which
 * rounds to the same device pixel below 100% zoom, and a weight some fonts
 * (Segoe UI) don't draw. The theme's selection colours fill it there, as #73
 * did for the History chart's range on show, every colour its own (or forced
 * colours would put its words on a plate of the page's colour).
 *
 * jsdom has no forced colours or layout, so this pins the rules; real
 * browsers check the look.
 */

import { describe, expect, it } from 'vitest';
import '../src/tabs/now-tab.js';
import { cssRules } from './_css.js';

const PICKED = ".lengths button[aria-pressed='true']";

describe('#89 the length picked in forced colours', () => {
  const rules = cssRules('comfort-band-now-tab');

  // Every rule naming `.lengths`, whole, in and out of forced colours, and
  // the focus ring the fill's own ring replaces: one of them added, moved or
  // changed fails here. A rule reaching the buttons under a selector that
  // doesn't name `.lengths` isn't caught (except in forced colours, or by
  // its forced-color-adjust: the next test), nor is an inline style.
  it('fills the length picked with the selection colours, and nothing else changes', () => {
    expect(
      rules.filter((r) => r.selector.includes('lengths') || r.selector === 'button:focus-visible'),
    ).toEqual([
      { at: '', selector: '.lengths, .steps', body: 'display: flex; gap: var(--cb-gap-sm);' },
      {
        at: '',
        selector: '.lengths button, .steps button, .back, .undo',
        body:
          'flex: 1; font: inherit; min-height: 44px; padding: 6px 12px; ' +
          'border-radius: var(--cb-radius-pill); border: 1px solid var(--divider-color, #cccccc); ' +
          'background: transparent; color: var(--cb-text-primary); cursor: pointer;',
      },
      { at: '', selector: ".lengths button[data-length='next']", body: 'flex: 1.6;' },
      { at: '', selector: '.lengths .time', body: 'white-space: nowrap;' },
      {
        at: '',
        selector: PICKED,
        body:
          'background: var(--cb-accent, var(--primary-color, #03a9f4)); ' +
          'border: 2px solid currentColor; color: #ffffff; font-weight: 500;',
      },
      {
        at: '@media (forced-colors: active)',
        selector: PICKED,
        body:
          'forced-color-adjust: none; background: Highlight; border-color: Highlight; ' +
          'color: HighlightText; outline-color: Highlight;',
      },
      {
        at: '',
        selector:
          ".lengths button[aria-disabled='true'], .steps button[aria-disabled='true'], " +
          ".back[aria-disabled='true'], .undo[aria-disabled='true']",
        body: 'opacity: 0.5; cursor: default;',
      },
      {
        at: '',
        selector: 'button:focus-visible',
        body: 'outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4)); outline-offset: 1px;',
      },
    ]);
  });

  // So no rule under another selector undoes it there, or opts anything
  // else out of forced colours.
  it("is the Now tab's only forced-colours rule, and its only forced-color-adjust", () => {
    expect(rules.filter((r) => r.at.includes('forced-colors')).map((r) => r.selector)).toEqual([
      PICKED,
    ]);
    expect(
      rules.filter((r) => r.body.includes('forced-color-adjust')).map((r) => r.selector),
    ).toEqual([PICKED]);
  });
});
