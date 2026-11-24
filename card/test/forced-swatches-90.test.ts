/**
 * #90: in forced colours (a Windows contrast theme) the History chart's
 * legend swatches took the page's colour, while the chart's canvas keeps
 * its lines' colours, so the legend no longer said which line was which.
 * The swatches keep their colours there (opted out), each ringed in the
 * text colour by a shadow, which takes no room.
 *
 * jsdom has no forced colours or layout, so this pins the rules; real
 * browsers check the look.
 */

import { describe, expect, it } from 'vitest';
import '../src/history-chart.js';
import { cssRules } from './_css.js';

describe('#90 the History legend swatches in forced colours', () => {
  // Read in each test, so CSS the helper can't parse fails a named test.
  const chart = () => cssRules('comfort-band-history-chart');

  // Every rule naming `swatch`, whole, in and out of forced colours: one of
  // them added, changed or put in another order among them fails here (one
  // moved past rules that don't name `swatch` doesn't). A rule reaching the
  // swatches under a selector that doesn't name `swatch` isn't caught,
  // unless it's in forced colours or sets forced-color-adjust (#73's test,
  // which lists the chart's forced rules); nor is an inline style.
  it('keeps each swatch its colour, ringed in the text colour, and nothing else changes', () => {
    expect(chart().filter((r) => r.selector.includes('swatch'))).toEqual([
      {
        at: '',
        selector: '.legend .swatch',
        body:
          'display: inline-block; width: 12px; height: 12px; border-radius: 2px; ' +
          'vertical-align: middle; margin-inline-end: 4px;',
      },
      {
        at: '@media (forced-colors: active)',
        selector: '.legend .swatch',
        body: 'forced-color-adjust: none; box-shadow: 0 0 0 1px CanvasText;',
      },
      {
        at: '',
        selector: '.legend .swatch.dashed',
        body:
          'background-image: repeating-linear-gradient( 90deg, currentColor 0, currentColor 4px, ' +
          'transparent 4px, transparent 7px ); background-color: transparent;',
      },
    ]);
  });
});
