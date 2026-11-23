/**
 * #88: in forced colours (a Windows contrast theme) the Settings tab's
 * switches vanished: their track and knob are drawn by backgrounds alone,
 * which forced colours turn to the page's colour, and neither had a border.
 * There they're now drawn in the theme's button colours, a track edged and
 * a knob in its text colour; on, the track is filled with the selection
 * colour and the knob takes that colour's text. Every colour is the
 * switch's own (opted out, as #73's buttons). The edge is an inset shadow,
 * which takes no room, so the knob stays where it was.
 *
 * jsdom has no forced colours or layout, so this pins the rules; real
 * browsers check the look.
 */

import { describe, expect, it } from 'vitest';
import '../src/tabs/settings-tab.js';
import { cssRules } from './_css.js';

const FORCED = '@media (forced-colors: active)';
const ACCENT = 'var(--cb-accent, var(--primary-color, #03a9f4))';

describe('#88 the Settings switches in forced colours', () => {
  // Read in each test, so CSS the helper can't parse fails a named test.
  const settings = () => cssRules('comfort-band-settings-tab');

  // Every rule naming `.toggle`, whole, in and out of forced colours: one
  // of them added, changed or put in another order among them fails here
  // (one moved past rules that don't name `.toggle` doesn't). A rule
  // reaching the switches under a selector that doesn't name `.toggle`
  // isn't caught, unless it's in forced colours or sets
  // forced-color-adjust (the next test); nor is an inline style.
  it('draws the track and knob in the button colours, on in the selection colours, and nothing else changes', () => {
    expect(settings().filter((r) => r.selector.includes('toggle'))).toEqual([
      {
        at: '',
        selector: '.toggle',
        body:
          'position: relative; flex: 0 0 auto; width: 52px; min-height: 44px; padding: 0; ' +
          'border: none; border-radius: var(--cb-radius-pill); background: var(--cb-track-bg); ' +
          'cursor: pointer;',
      },
      {
        at: '',
        selector: ".toggle:hover:not([aria-disabled='true'])",
        body: 'filter: brightness(0.92);',
      },
      {
        at: '',
        selector: '.toggle:focus-visible',
        body: `outline: 2px solid ${ACCENT}; outline-offset: 2px;`,
      },
      { at: '', selector: ".toggle[aria-checked='true']", body: `background: ${ACCENT};` },
      {
        at: '',
        selector: '.toggle .knob',
        body:
          'position: absolute; top: 50%; left: 4px; width: 24px; height: 24px; ' +
          'margin-top: -12px; border-radius: 50%; background: #ffffff; ' +
          'box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); transition: left 0.15s ease;',
      },
      { at: '', selector: ".toggle[aria-checked='true'] .knob", body: 'left: 24px;' },
      {
        at: '',
        selector: ".toggle[aria-disabled='true']",
        body: 'opacity: 0.5; cursor: not-allowed;',
      },
      {
        at: FORCED,
        selector: '.toggle',
        body:
          'forced-color-adjust: none; background: ButtonFace; ' +
          'box-shadow: inset 0 0 0 2px ButtonText;',
      },
      { at: FORCED, selector: '.toggle:focus-visible', body: 'outline-color: Highlight;' },
      {
        at: FORCED,
        selector: ".toggle[aria-checked='true']",
        body: 'background: Highlight; box-shadow: none;',
      },
      {
        at: FORCED,
        selector: '.toggle .knob',
        body: 'background: ButtonText; box-shadow: none;',
      },
      {
        at: FORCED,
        selector: ".toggle[aria-checked='true'] .knob",
        body: 'background: HighlightText;',
      },
    ]);
  });

  // So no other forced-colours rule, under any selector, undoes them there,
  // and no other rule opts in or out of forced colours. (A rule outside
  // forced colours can still reach the opted-out switch: see above.)
  it("are the Settings tab's only forced-colours rules, and its only forced-color-adjust", () => {
    const rules = settings();
    expect(rules.filter((r) => r.at.includes('forced-colors')).map((r) => r.selector)).toEqual([
      '.toggle',
      '.toggle:focus-visible',
      ".toggle[aria-checked='true']",
      '.toggle .knob',
      ".toggle[aria-checked='true'] .knob",
    ]);
    expect(
      rules.filter((r) => r.body.includes('forced-color-adjust')).map((r) => r.selector),
    ).toEqual(['.toggle']);
  });
});
