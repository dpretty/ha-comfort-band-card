/**
 * #109: in a right-to-left layout (HA in Hebrew or Arabic), parts of the
 * tabs and the card editor were placed by a physical side, so they didn't
 * mirror: the profile menu's items sat at its far end, the Settings switches'
 * knobs, the steppers, choices and values were pushed or aligned to the
 * right, Diagnostics' numbers likewise, Fine-tuning's grey words sat flush
 * against its title, the drop-down arrows stayed on the right (where the
 * words start), and the Schedule list's current row kept its bar on the left.
 *
 * Each is now placed by the start or end side. The Settings switches mirror
 * (Dave's choice): on, the knob sits at the end, the left in right-to-left.
 *
 * The arrows and the bar have no logical form, so a right-to-left rule of
 * their own (`:dir(rtl)`) moves them. Each arrow's rule moves its room (the
 * padding) with it, so a browser without `:dir()`, which drops the rule
 * whole, keeps the arrow and its room together on the right, as before #109,
 * rather than drawing the arrow over the words.
 *
 * jsdom has no layout, and its `:dir()` doesn't follow the page, so this
 * pins the rules; real browsers check the placement.
 */

import { describe, expect, it } from 'vitest';
import '../src/tabs/settings-tab.js';
import '../src/tabs/profiles-tab.js';
import '../src/tabs/schedule-tab.js';
import '../src/tabs/diagnostics-tab.js';
import '../src/card-editor.js';
import { cssRules, physical } from './_css.js';

const TAGS = [
  'comfort-band-settings-tab',
  'comfort-band-profiles-tab',
  'comfort-band-schedule-tab',
  'comfort-band-diagnostics-tab',
  'comfort-band-card-editor',
];

/** The rules drawn by a physical side on purpose, and pinned whole below:
 *  the drop-down arrows with their room, each mirrored by its `:dir(rtl)`
 *  rule. (The disclosure chevrons too, pinned by #108's test.) */
const ARROW_RULES: Record<string, string[]> = {
  'comfort-band-settings-tab': ['.choice', '.choice:dir(rtl)'],
  'comfort-band-card-editor': ['select', 'select:dir(rtl)'],
};

/** The body of the one rule with exactly this selector, outside at-rules. */
function body(tag: string, selector: string): string {
  const found = cssRules(tag).filter((r) => r.at === '' && r.selector === selector);
  expect(found, `${tag} ${selector}`).toHaveLength(1);
  return found[0].body;
}

/** One declaration's value from a rule's body. */
function value(decls: string, prop: string): string {
  const m = new RegExp(`(?:^|; )${prop}: ([^;]*);`).exec(decls);
  expect(m, prop).not.toBeNull();
  return m![1];
}

describe('#109 the tabs in right-to-left', () => {
  // Every rule in the tabs and the editor, in and out of at-rules: a side in
  // a property's name, a left or right keyword, `inset`, or an uneven
  // margin/padding shorthand fails here, the arrows and chevrons aside.
  it('spaces, places and aligns nothing else in the tabs or the editor by a side', () => {
    for (const tag of TAGS) {
      expect(
        cssRules(tag)
          .filter((r) => !r.selector.endsWith('summary::before'))
          .filter((r) => !(r.at === '' && (ARROW_RULES[tag] ?? []).includes(r.selector)))
          .flatMap((r) =>
            r.body
              .split(/;\s*/)
              .filter(Boolean)
              .filter(physical)
              .map((d) => `${r.selector} { ${d} }`),
          ),
        tag,
      ).toEqual([]);
    }
  });

  // The page's direction reaches every control: nothing in the tabs or the
  // editor sets its own.
  it('lets nothing in the tabs or the editor set its own direction', () => {
    for (const tag of TAGS) {
      expect(
        cssRules(tag).flatMap((r) =>
          r.body
            .split(/;\s*/)
            .filter((d) => /^\s*(direction|unicode-bidi|writing-mode)\s*:/i.test(d))
            .map((d) => `${r.selector} { ${d} }`),
        ),
        tag,
      ).toEqual([]);
    }
  });

  it('mirrors the Settings switches: the knob from the start, to the end when on', () => {
    expect(value(body('comfort-band-settings-tab', '.toggle .knob'), 'inset-inline-start')).toBe(
      '4px',
    );
    expect(value(body('comfort-band-settings-tab', '.toggle .knob'), 'transition')).toBe(
      'inset-inline-start 0.15s ease',
    );
    expect(body('comfort-band-settings-tab', ".toggle[aria-checked='true'] .knob")).toBe(
      'inset-inline-start: 24px;',
    );
  });

  it('pushes and aligns to the end, and spaces from the start', () => {
    const want: Array<[string, string, string, string]> = [
      ['comfort-band-settings-tab', '.stepper', 'margin-inline-start', 'auto'],
      ['comfort-band-settings-tab', '.choice', 'margin-inline-start', 'auto'],
      ['comfort-band-settings-tab', '.info-value', 'text-align', 'end'],
      [
        'comfort-band-settings-tab',
        'details.fine .fine-summary',
        'margin-inline-start',
        'var(--cb-gap-sm)',
      ],
      ['comfort-band-profiles-tab', '.menu button', 'text-align', 'start'],
      ['comfort-band-schedule-tab', '.row .actions', 'margin-inline-start', 'auto'],
      ['comfort-band-diagnostics-tab', '.value', 'margin-inline-start', 'auto'],
      ['comfort-band-diagnostics-tab', '.value', 'text-align', 'end'],
      ['comfort-band-diagnostics-tab', 'th, td', 'text-align', 'end'],
      [
        'comfort-band-diagnostics-tab',
        'th:first-child, td:first-child',
        'padding-inline-start',
        '0',
      ],
      ['comfort-band-diagnostics-tab', 'th:first-child, td:first-child', 'text-align', 'start'],
    ];
    for (const [tag, selector, prop, v] of want) {
      expect(value(body(tag, selector), prop), `${tag} ${selector} ${prop}`).toBe(v);
    }
  });

  // Every rule naming a choice, the editor's select or the current row,
  // whole: a later declaration in one of them, or another rule restoring the
  // left-to-right arrow, room or bar, fails here.
  it('draws the choices, the editor select and the current row only by these rules', () => {
    const naming = (tag: string, name: RegExp) =>
      cssRules(tag)
        .filter((r) => name.test(r.selector))
        .map((r) => [r.at, r.selector]);
    expect(naming('comfort-band-settings-tab', /\.choice\b/)).toEqual([
      ['', '.step:focus-visible, .choice:focus-visible, summary:focus-visible'],
      ['', '.choice'],
      ['', '.choice:dir(rtl)'],
      ['', '.choice:disabled'],
    ]);
    expect(naming('comfort-band-card-editor', /(^|[\s,>+~])select\b/)).toEqual([
      ['', "select, input[type='text'], input[type='checkbox']"],
      ['', 'select'],
      ['', 'select:dir(rtl)'],
      ['', 'select:focus-visible'],
    ]);
    expect(naming('comfort-band-schedule-tab', /\.current\b/)).toEqual([
      ['', '.row.read:not(.current):hover'],
      ['', '.row.current'],
      ['', '.row.current:dir(rtl)'],
      ['', '.row.current .band, .row.current .tag'],
      ['', '.tag.current'],
    ]);
    expect(body('comfort-band-settings-tab', '.choice:disabled')).toBe('opacity: 0.6;');
    expect(body('comfort-band-card-editor', 'select:focus-visible')).toBe(
      'outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 1px;',
    );
    expect(body('comfort-band-schedule-tab', '.row.current')).toBe(
      'box-shadow: inset 3px 0 0 var(--cb-accent, var(--primary-color, #03a9f4)); ' +
        'background: var(--cb-track-bg);',
    );
    expect(body('comfort-band-schedule-tab', '.row.current:dir(rtl)')).toBe(
      'box-shadow: inset -3px 0 0 var(--cb-accent, var(--primary-color, #03a9f4));',
    );
  });

  // The arrow is two small triangles drawn as backgrounds, `size` wide, the
  // first `far` from the end and the second `near`, in room left by the
  // padding at the end. In right-to-left the same picture sits as far from
  // the start, the first at `near` and the second at `near + size`, and the
  // padding swaps sides with it, in the same rule: a browser that drops the
  // rule keeps both on the right.
  for (const [tag, selector, size, far, near] of [
    ['comfort-band-settings-tab', '.choice', 5, 15, 10],
    ['comfort-band-card-editor', 'select', 6, 18, 12],
  ] as const) {
    it(`mirrors the drop-down arrow of ${tag} ${selector} with its room`, () => {
      const ltr = body(tag, selector);
      const rtl = body(tag, `${selector}:dir(rtl)`);
      expect(value(ltr, 'background-position')).toBe(
        `calc(100% - ${far}px) 50%, calc(100% - ${near}px) 50%`,
      );
      const [top, end, bottom, start] = value(ltr, 'padding').split(' ');
      expect(Number.parseFloat(end)).toBeGreaterThan(far + size);
      expect(rtl).toBe(
        `padding: ${top} ${start} ${bottom} ${end}; ` +
          `background-position: ${near}px 50%, ${near + size}px 50%;`,
      );
      // Nothing else in the left-to-right rule sets the padding or position.
      expect(ltr.match(/(^|; )(padding|background-position)[\w-]*:/g)).toHaveLength(2);
    });
  }
});
