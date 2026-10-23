import { afterEach, describe, it, expect } from 'vitest';
import '../src/schedule-chart.js';
import type { ComfortBandScheduleChart } from '../src/schedule-chart.js';
import type { Transition } from '../src/types.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

// v0.9.0: the schedule-chart is now a pure read-only visualization. All
// interaction (drag, long-press, tap-to-add, keyboard nudges) moved into
// the schedule-tab's list view. These tests cover the chart's render
// contract — caller passes transitions, chart draws stepped lines + fill
// + markers. The companion editor tests live in schedule-tab.test.ts.

const SCHEDULE: Transition[] = [
  { at: '06:00', low: 20, high: 23 },
  { at: '22:00', low: 18, high: 21 },
];

async function chart(transitions: Transition[] = SCHEDULE): Promise<ComfortBandScheduleChart> {
  return mount('comfort-band-schedule-chart', { transitions });
}

describe('comfort-band-schedule-chart', () => {
  it('renders two stepped polylines, one filled path, and 2N markers', async () => {
    const el = await chart();
    expect(el.shadowRoot!.querySelectorAll('.line.low').length).toBe(1);
    expect(el.shadowRoot!.querySelectorAll('.line.high').length).toBe(1);
    expect(el.shadowRoot!.querySelectorAll('.fill').length).toBe(1);
    expect(el.shadowRoot!.querySelectorAll('.marker').length).toBe(SCHEDULE.length * 2);
  });

  it('renders no paths or markers when there are no transitions', async () => {
    const el = await chart([]);
    expect(el.shadowRoot!.querySelector('.line.low')).toBeNull();
    expect(el.shadowRoot!.querySelector('.line.high')).toBeNull();
    expect(el.shadowRoot!.querySelector('.fill')).toBeNull();
    expect(el.shadowRoot!.querySelectorAll('.marker').length).toBe(0);
  });

  it('renders the axis labels regardless of transition count', async () => {
    const empty = await chart([]);
    // 4 Y temp ticks + 5 X hour ticks = 9 axis labels.
    expect(empty.shadowRoot!.querySelectorAll('.axis-label').length).toBe(9);
    const full = await chart();
    expect(full.shadowRoot!.querySelectorAll('.axis-label').length).toBe(9);
  });

  it('markers are non-interactive (no tabindex, no role=button, no listeners attribute)', async () => {
    // The whole point of v0.9.0 — circles are visual only. A future regression
    // re-introducing interactivity would re-introduce the v0.8.x drag bugs.
    const el = await chart();
    const markers = el.shadowRoot!.querySelectorAll('.marker');
    expect(markers.length).toBe(SCHEDULE.length * 2);
    markers.forEach((m) => {
      expect(m.getAttribute('tabindex')).toBeNull();
      expect(m.getAttribute('role')).toBeNull();
      expect(m.getAttribute('aria-label')).toBeNull();
    });
  });

  it('exports parseTime for sort-order parity with the chart', async () => {
    const { parseTime } = await import('../src/schedule-chart.js');
    expect(parseTime('00:00')).toBe(0);
    expect(parseTime('06:00')).toBe(360);
    expect(parseTime('23:45')).toBe(23 * 60 + 45);
    expect(parseTime('garbage')).toBe(0);
  });

  // #33: colour isn't the only cue.
  it('colours the low edge for heating and the high for cooling, and labels them', async () => {
    const el = await chart();
    const css = (
      customElements.get('comfort-band-schedule-chart') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    expect(css).toMatch(
      /\.line\.low,\s*\.marker\.low\s*\{[^}]*stroke:\s*var\(--cb-action-heating\)/,
    );
    expect(css).toMatch(
      /\.line\.high,\s*\.marker\.high\s*\{[^}]*stroke:\s*var\(--cb-action-cooling\)/,
    );
    const labels = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.edge-label'));
    expect(labels.map((l) => [l.className, l.textContent!.trim()])).toEqual([
      ['edge-label high', 'High'],
      ['edge-label low', 'Low'],
    ]);
    // Where each edge ends the day: 22:00's 21° and 18°, on a 14–28° axis.
    expect(labels[0].style.top).toBe(`${((28 - 21) / 14) * 100}%`);
    expect(labels[1].style.top).toBe(`${((28 - 18) / 14) * 100}%`);
  });

  it('labels no edges without changes', async () => {
    const el = await chart([]);
    expect(el.shadowRoot!.querySelector('.edge-label')).toBeNull();
  });

  it('marks now, beside its gutter', async () => {
    const el = await mount('comfort-band-schedule-chart', { transitions: SCHEDULE, now: 18 * 60 });
    const line = el.shadowRoot!.querySelector('.now-line')!;
    expect([line.getAttribute('x1'), line.getAttribute('x2')]).toEqual(['450', '450']);
    const label = el.shadowRoot!.querySelector<HTMLElement>('.now-label')!;
    expect(label.textContent!.trim()).toBe('Now');
    expect(label.getAttribute('style')).toContain('calc(32px + (100% - 32px) * 0.75)');
  });

  it('marks no now without one', async () => {
    const el = await chart();
    expect(el.shadowRoot!.querySelector('.now-line')).toBeNull();
    expect(el.shadowRoot!.querySelector('.now-label')).toBeNull();
  });

  it('describes itself in plain words', async () => {
    const el = await chart();
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('aria-label')).toBe('The comfortable range through the day');
    expect(svg.querySelector('title')!.textContent).toBe('The comfortable range through the day');
  });
});
