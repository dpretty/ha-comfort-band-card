import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/history-chart.js';
import uPlot from 'uplot';
import {
  actionAt,
  fitAxis,
  mixColor,
  readoutLine,
  readoutTime,
  stripRects,
  timeLabels,
} from '../src/history-chart.js';
import type { ComfortBandHistoryChart } from '../src/history-chart.js';
import type { HomeAssistant, HassConnection } from '../src/types.js';
import { captureSubscription, mount, teardown } from './_fixture.js';

// #34: a readout of the values at the pointer, a range picker, heating and
// cooling as a strip under the plot, and readable axes.

afterEach(() => {
  teardown();
  vi.useRealTimers();
});

const FULL = {
  roomEntity: 'sensor.gym_room_temperature',
  lowEntity: 'sensor.gym_effective_low',
  highEntity: 'sensor.gym_effective_high',
  actionEntity: 'sensor.gym_current_action',
};
const OVERLAYS = {
  ...FULL,
  apparentEntity: 'sensor.gym_apparent_temperature',
  humidityEntity: 'sensor.gym_humidity',
};

function makeHass(connection: HassConnection, unit: string | null = '°C'): HomeAssistant {
  return {
    states: {
      'sensor.gym_room_temperature': {
        entity_id: 'sensor.gym_room_temperature',
        state: '21',
        attributes: unit === null ? {} : { unit_of_measurement: unit },
        last_changed: '',
        last_updated: '',
      },
    },
    devices: {},
    entities: {},
    connection,
    callService: vi.fn(),
    callWS: vi.fn(),
    locale: { language: 'en-GB', time_format: '24' },
  };
}

type Internals = {
  _plot: unknown;
  _loading: boolean;
  _cursorIdx: number | null;
  _intervals: Array<{ start: number; end: number; action: 'heating' | 'cooling' }>;
  _stripColors: { heating: string; cooling: string };
  _buildOpts: (w: number) => {
    axes: Array<{
      ticks?: { show?: boolean };
      gap?: number;
      size?: number;
      values?: (u: unknown, vs: number[]) => string[];
    }>;
    hooks: {
      draw: Array<(u: unknown) => void>;
      setCursor: Array<(u: unknown) => void>;
    };
  };
  _actionIntervals: (
    points: Array<{ s: string; lu: number }>,
  ) => Array<{ start: number; end: number; action: string }>;
  _data: Array<Array<number | null>> | null;
  _toggleLabel: (label: string) => void;
};
const internals = (el: ComfortBandHistoryChart) => el as unknown as Internals;

/** A stand-in for uPlot, so the chart's own code runs without a canvas. */
function fakePlot(seriesCount: number) {
  return {
    series: new Array(seriesCount + 1),
    destroy: vi.fn(),
    setSize: vi.fn(),
    setData: vi.fn(),
    redraw: vi.fn(),
    setSeries: vi.fn(),
  };
}

async function chart(
  props: Partial<ComfortBandHistoryChart>,
): Promise<{ el: ComfortBandHistoryChart; sub: ReturnType<typeof captureSubscription> }> {
  const sub = captureSubscription();
  const el = await mount('comfort-band-history-chart', {
    hass: makeHass(sub.connection),
    ...props,
  } as Partial<ComfortBandHistoryChart>);
  await new Promise((r) => setTimeout(r, 0));
  return { el, sub };
}

/** A room's history: one reading of each, a minute ago. */
const ROOM = (now: number) => ({
  'sensor.gym_room_temperature': [{ s: '21.0', lu: now - 60 }],
  'sensor.gym_effective_low': [{ s: '19.5', lu: now - 60 }],
  'sensor.gym_effective_high': [{ s: '22.5', lu: now - 60 }],
});

const root = (el: ComfortBandHistoryChart) => el.shadowRoot!;
const readout = (el: ComfortBandHistoryChart) =>
  root(el).querySelector('.readout')!.textContent!.replace(/\s+/g, ' ').trim();
const rangeButtons = (el: ComfortBandHistoryChart) =>
  Array.from(root(el).querySelectorAll<HTMLButtonElement>('.ranges button'));
const pressed = (el: ComfortBandHistoryChart) =>
  rangeButtons(el)
    .filter((b) => b.getAttribute('aria-pressed') === 'true')
    .map((b) => b.textContent!.trim());

describe('readoutLine', () => {
  const base = {
    when: '22:30',
    room: 21.3,
    apparent: 21.9,
    low: 19.5,
    high: 22.5,
    humidity: 45.4,
    action: 'heating' as const,
  };

  it('gives the time and each value, and heating or cooling', () => {
    expect(readoutLine(base)).toBe(
      '22:30 · Room 21.3° · Feels like 21.9° · Range 19.5–22.5° · Humidity 45% · Heating',
    );
    expect(readoutLine({ ...base, action: 'cooling', room: 21 })).toBe(
      '22:30 · Room 21° · Feels like 21.9° · Range 19.5–22.5° · Humidity 45% · Cooling',
    );
  });

  it('gives one edge of the range alone where the other is hidden', () => {
    expect(readoutLine({ ...base, low: null })).toBe(
      '22:30 · Room 21.3° · Feels like 21.9° · High 22.5° · Humidity 45% · Heating',
    );
    expect(readoutLine({ ...base, high: null })).toBe(
      '22:30 · Room 21.3° · Feels like 21.9° · Low 19.5° · Humidity 45% · Heating',
    );
  });

  it('leaves out what isn’t there', () => {
    expect(
      readoutLine({
        when: 'Now',
        room: 21.3,
        apparent: null,
        low: 19.5,
        high: null,
        humidity: null,
        action: null,
      }),
    ).toBe('Now · Room 21.3° · Low 19.5°');
    expect(readoutLine({ ...base, room: null, apparent: null, low: null, high: null })).toBe(
      '22:30 · Humidity 45% · Heating',
    );
  });
});

describe('readoutTime', () => {
  const h24 = { locale: { language: 'en-GB', time_format: '24' } } as const;
  const h12 = { locale: { language: 'en-US', time_format: '12' } } as const;
  const now = new Date(2026, 10, 20, 16, 0).getTime();

  it('gives the time today, and the weekday with it another day', () => {
    expect(readoutTime(new Date(2026, 10, 20, 9, 30).getTime(), now, h24)).toBe('09:30');
    expect(readoutTime(new Date(2026, 10, 19, 22, 30).getTime(), now, h24)).toBe('Thu 22:30');
    expect(readoutTime(new Date(2026, 10, 15, 6, 0).getTime(), now, h12)).toBe('Sun 6 AM');
    // Six days back: still the weekday alone.
    expect(readoutTime(new Date(2026, 10, 14, 6, 0).getTime(), now, h12)).toBe('Sat 6 AM');
    // A week back: today's weekday, so the date too.
    expect(readoutTime(new Date(2026, 10, 13, 22, 0).getTime(), now, h24)).toBe('Fri 13 22:00');
    // By the calendar day, not 24 hours: last night is another day.
    expect(
      readoutTime(
        new Date(2026, 10, 20, 0, 30).getTime(),
        new Date(2026, 10, 20, 23, 0).getTime(),
        h24,
      ),
    ).toBe('00:30');
    expect(
      readoutTime(
        new Date(2026, 10, 19, 23, 30).getTime(),
        new Date(2026, 10, 20, 0, 30).getTime(),
        h24,
      ),
    ).toBe('Thu 23:30');
    expect(
      readoutTime(new Date(2026, 10, 19, 22, 30).getTime(), now, {
        locale: { language: 'fr', time_format: '24' },
      } as never),
    ).toBe('Thu 22:30');
  });

  // A day with a clock change has 23 or 25 hours: still one day (#34 review).
  it('counts calendar days across a clock change', () => {
    vi.stubEnv('TZ', 'Europe/Berlin');
    try {
      const at = (m: number, d: number, h: number) => new Date(2026, m - 1, d, h, 0).getTime();
      // Clocks forward on Sunday 29 March: a 23-hour day.
      expect(readoutTime(at(3, 29, 10), at(3, 30, 12), h24)).toBe('Sun 10:00');
      expect(readoutTime(at(3, 23, 10), at(3, 30, 12), h24)).toBe('Mon 23 10:00');
      // Back on Sunday 25 October: a 25-hour day.
      expect(readoutTime(at(10, 25, 10), at(10, 31, 12), h24)).toBe('Sun 10:00');
      expect(readoutTime(at(10, 24, 10), at(10, 31, 12), h24)).toBe('Sat 24 10:00');
    } finally {
      vi.unstubAllEnvs();
    }
  });
});

describe('actionAt', () => {
  const intervals = [
    { start: 100, end: 200, action: 'heating' as const },
    { start: 300, end: 360, action: 'cooling' as const },
  ];

  it('finds the action at a time, from its start up to its end', () => {
    expect(actionAt(intervals, 100)).toBe('heating');
    expect(actionAt(intervals, 199)).toBe('heating');
    expect(actionAt(intervals, 200)).toBeNull();
    expect(actionAt(intervals, 330)).toBe('cooling');
    expect(actionAt(intervals, 50)).toBeNull();
  });
});

describe('stripRects', () => {
  const toX = (v: number) => v;

  it('places each interval in whole pixels within the plot', () => {
    expect(stripRects([{ start: 20.4, end: 40.6, action: 'heating' }], toX, 10, 110)).toEqual([
      { x: 20, w: 21, action: 'heating' },
    ]);
    // Cut at the plot's edges.
    expect(
      stripRects(
        [
          { start: 0, end: 30, action: 'cooling' },
          { start: 100, end: 150, action: 'heating' },
        ],
        toX,
        10,
        110,
      ),
    ).toEqual([
      { x: 10, w: 20, action: 'cooling' },
      { x: 100, w: 10, action: 'heating' },
    ]);
  });

  it('gives a short cycle at least a pixel, and leaves out what’s outside the plot', () => {
    expect(stripRects([{ start: 50, end: 50.2, action: 'cooling' }], toX, 10, 110)).toEqual([
      { x: 50, w: 1, action: 'cooling' },
    ]);
    expect(stripRects([{ start: 50, end: 50, action: 'cooling' }], toX, 10, 110)).toEqual([
      { x: 50, w: 1, action: 'cooling' },
    ]);
    expect(
      stripRects(
        [
          { start: 0, end: 5, action: 'cooling' },
          { start: 0, end: 10, action: 'cooling' },
          { start: 110, end: 120, action: 'heating' },
          { start: 115, end: 120, action: 'heating' },
        ],
        toX,
        10,
        110,
      ),
    ).toEqual([]);
  });
});

describe('timeLabels', () => {
  const at = (h: number, m = 0, day = 20) => new Date(2026, 10, day, h, m).getTime() / 1000;
  const h24 = { locale: { language: 'en-GB', time_format: '24' } } as const;
  const h12 = { locale: { language: 'en-US', time_format: '12' } } as const;

  it('writes times in HA’s 12/24-hour setting, the day under midnight', () => {
    expect(timeLabels([at(18), at(0, 0, 21), at(6, 30)], 24 * 3600, h24)).toEqual([
      '18:00',
      '00:00\nSat 21',
      '06:30',
    ]);
    expect(timeLabels([at(18), at(0, 0, 21)], 24 * 3600, h12)).toEqual(['6 PM', '12 AM\nSat 21']);
  });

  it('writes the day alone at midnight over more than a day and a half', () => {
    expect(timeLabels([at(0, 0, 14), at(12, 0, 14)], 7 * 24 * 3600, h24)).toEqual([
      'Sat 14',
      '12:00',
    ]);
    expect(timeLabels([at(0, 0, 14)], 36 * 3600, h24)).toEqual(['00:00\nSat 14']);
    // Only midnight itself gets the day.
    expect(timeLabels([at(0, 30, 14)], 24 * 3600, h24)).toEqual(['00:30']);
  });

  it('names days in English where HA’s language isn’t', () => {
    expect(
      timeLabels([at(0, 0, 21)], 7 * 24 * 3600, {
        locale: { language: 'de', time_format: '24' },
      } as never),
    ).toEqual(['Sat 21']);
  });
});

describe('mixColor', () => {
  it('mixes a colour part of the way to another', () => {
    expect(mixColor('#ff6f22', '#141414', 0.3)).toBe('rgb(185, 84, 30)');
    expect(mixColor('#f00', 'rgb(0, 0, 255)', 0.5)).toBe('rgb(128, 0, 128)');
    expect(mixColor('rgba(0, 0, 0, 0.5)', '#ffffff', 0.25)).toBe('rgb(64, 64, 64)');
    // Unreadable: as given.
    expect(mixColor(' red ', '#000', 0.3)).toBe('red');
    expect(mixColor('#123456', 'var(--x)', 0.3)).toBe('#123456');
  });
});

describe('fitAxis', () => {
  it('makes an axis as wide as its widest label, and a pixel either side', () => {
    const measured: string[] = [];
    const u = {
      axes: [{}, { ticks: { size: 10 }, gap: 5, font: ['12px test', 12], _size: 33 }],
      ctx: {
        font: '',
        measureText(text: string) {
          measured.push(`${this.font}|${text}`);
          return { width: text.length * 7 };
        },
      },
    } as unknown as uPlot;
    expect(fitAxis(u, ['20', '20.5', '21'], 1, 0)).toBe(10 + 5 + 28 + 2);
    // Each label measured: digits' widths differ in some fonts, so the
    // longest string needn't be the widest.
    expect(measured).toEqual(['12px test|20', '12px test|20.5', '12px test|21']);
    const narrowOnes = {
      ...u,
      ctx: {
        font: '',
        measureText: (t: string) => ({ width: t === '11.5' ? 20 : t === '24' ? 23.3 : 10 }),
      },
    } as unknown as uPlot;
    // The widest, though shorter; rounded up.
    expect(fitAxis(narrowOnes, ['11.5', '24'], 1, 0)).toBe(Math.ceil(10 + 5 + 23.3) + 2);
    // The canvas's font is in device pixels: the width comes back in CSS.
    const ratio = Object.getOwnPropertyDescriptor(uPlot, 'pxRatio');
    Object.defineProperty(uPlot, 'pxRatio', { value: 2, configurable: true, writable: true });
    try {
      const hi = {
        ...u,
        ctx: { font: '', measureText: (t: string) => ({ width: t.length * 14 }) },
      };
      expect(fitAxis(hi as unknown as uPlot, ['20.5'], 1, 0)).toBe(10 + 5 + 28 + 2);
    } finally {
      if (ratio) Object.defineProperty(uPlot, 'pxRatio', ratio);
    }
    // uPlot's first measured call is its cycle 1: measured, not the size
    // it started with (both axes collapsed to 17 px otherwise).
    expect(fitAxis(u, ['20', '20.5'], 1, 1)).toBe(10 + 5 + 28 + 2);
    // Asked again once laid out: the size it settled on.
    expect(fitAxis(u, ['20', '20.5'], 1, 2)).toBe(33);
    expect(fitAxis(u, null, 1, 0)).toBe(17);
  });
});

describe('comfort-band-history-chart ranges (#34)', () => {
  it('offers 6 h, 24 h and 7 d, showing 24 h to start with', async () => {
    const { el, sub } = await chart(FULL);
    expect(rangeButtons(el).map((b) => b.textContent!.trim())).toEqual(['6 h', '24 h', '7 d']);
    expect(rangeButtons(el).map((b) => b.getAttribute('aria-label'))).toEqual([
      '6 hours',
      '24 hours',
      '7 days',
    ]);
    expect(root(el).querySelector('.ranges')!.getAttribute('role')).toBe('group');
    expect(pressed(el)).toEqual(['24 h']);
    expect(root(el).querySelector('.ranges')!.getAttribute('aria-label')).toBe('Show the last');
    const start = Date.parse(sub.subscriptions[0].message.start_time as string);
    expect(Date.now() - start).toBeGreaterThanOrEqual(24 * 3600_000 - 1000);
    expect(Date.now() - start).toBeLessThan(24 * 3600_000 + 60_000);
    expect(root(el).querySelector('.status')!.textContent).toContain(
      'Loading 24 hours of history…',
    );
  });

  it('asks HA for the range picked, in place of the last', async () => {
    const { el, sub } = await chart(FULL);
    rangeButtons(el)[2].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);
    expect(sub.subscriptions[0].unsubscribe).toHaveBeenCalledOnce();
    const start = Date.parse(sub.subscriptions[1].message.start_time as string);
    expect(Date.now() - start).toBeGreaterThanOrEqual(168 * 3600_000 - 1000);
    expect(Date.now() - start).toBeLessThan(168 * 3600_000 + 60_000);
    expect(pressed(el)).toEqual(['7 d']);
    expect(root(el).querySelector('.status')!.textContent).toContain('Loading 7 days of history…');
    expect(root(el).querySelector('.chart-host')!.getAttribute('aria-label')).toContain(
      'last 7 days',
    );
    rangeButtons(el)[0].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    const six = Date.parse(sub.subscriptions[2].message.start_time as string);
    expect(Date.now() - six).toBeLessThan(6 * 3600_000 + 60_000);
    expect(Date.now() - six).toBeGreaterThanOrEqual(6 * 3600_000 - 1000);
  });

  it('asks nothing new for the range already shown, leaving its chart as it is', async () => {
    const { el, sub } = await chart(FULL);
    const now = Math.floor(Date.now() / 1000);
    internals(el)._plot = fakePlot(3);
    sub.emit({ states: ROOM(now) });
    await el.updateComplete;
    rangeButtons(el)[1].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(sub.callCount).toBe(1);
    expect(readout(el)).toBe('Now · Room 21° · Range 19.5–22.5°');
  });

  // With a chart drawn, it stays until the new range's history arrives.
  it('keeps the chart while another range loads, the readout saying so', async () => {
    const { el, sub } = await chart(FULL);
    const now = Math.floor(Date.now() / 1000);
    internals(el)._plot = fakePlot(3);
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [{ s: '21.0', lu: now - 60 }],
        'sensor.gym_effective_low': [{ s: '19.5', lu: now - 60 }],
        'sensor.gym_effective_high': [{ s: '22.5', lu: now - 60 }],
      },
    });
    await el.updateComplete;
    rangeButtons(el)[2].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(readout(el)).toBe('Loading 7 days of history…');
    expect(root(el).querySelector('.status')).toBeNull();
    expect(root(el).querySelector('.chart-host')!.classList.contains('idle')).toBe(false);
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [{ s: '20.0', lu: now - 60 }],
        'sensor.gym_effective_low': [{ s: '19', lu: now - 60 }],
        'sensor.gym_effective_high': [{ s: '22', lu: now - 60 }],
      },
    });
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 20° · Range 19–22°');
  });
});

// With no chart to keep, a range picked shows the loading message (#34 review).
describe('comfort-band-history-chart: a range picked with no chart drawn (#34 review)', () => {
  const loadingWeek = (el: ComfortBandHistoryChart) => {
    expect(root(el).querySelector('.status')!.textContent).toContain('Loading 7 days of history…');
    expect(root(el).querySelector('.chart-host')!.classList.contains('idle')).toBe(true);
    expect(readout(el)).toBe('');
  };
  const pickWeek = async (el: ComfortBandHistoryChart) => {
    rangeButtons(el)[2].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
  };

  it('shows the loading message after no history', async () => {
    const { el, sub } = await chart(FULL);
    internals(el)._plot = fakePlot(3);
    sub.emit({ states: { 'sensor.gym_room_temperature': [] } });
    await el.updateComplete;
    expect(root(el).querySelector('.status')!.textContent).toContain('No history available');
    await pickWeek(el);
    loadingWeek(el);
  });

  it('shows the loading message after an error', async () => {
    const sub = captureSubscription();
    sub.subscribeMessage.mockRejectedValueOnce(new Error('Connection lost'));
    const el = await mount('comfort-band-history-chart', {
      hass: makeHass(sub.connection),
      ...FULL,
    } as Partial<ComfortBandHistoryChart>);
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(root(el).querySelector('.status')!.textContent).toContain('Connection lost');
    await pickWeek(el);
    loadingWeek(el);
  });

  // Taken off the page, the chart goes; back on, it's loading.
  it('shows the loading message when put back on the page while a range loads', async () => {
    const { el, sub } = await chart(FULL);
    const now = Math.floor(Date.now() / 1000);
    internals(el)._plot = fakePlot(3);
    sub.emit({ states: ROOM(now) });
    await el.updateComplete;
    await pickWeek(el);
    expect(readout(el)).toBe('Loading 7 days of history…');
    el.remove();
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    loadingWeek(el);
  });

  // A change of entities after a range pick, before it loaded, is another
  // room's: its chart goes.
  it('shows the loading message for another room picked while a range loads', async () => {
    const { el, sub } = await chart(FULL);
    const now = Math.floor(Date.now() / 1000);
    internals(el)._plot = fakePlot(3);
    sub.emit({ states: ROOM(now) });
    await el.updateComplete;
    await pickWeek(el);
    expect(readout(el)).toBe('Loading 7 days of history…');
    el.roomEntity = 'sensor.study_room_temperature';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    loadingWeek(el);
  });
});

describe('comfort-band-history-chart: another room (#34 review)', () => {
  // Only a range pick keeps the chart drawn while the new history loads.
  it('shows the loading message, not the old room’s chart, for another room', async () => {
    const { el, sub } = await chart(FULL);
    const now = Math.floor(Date.now() / 1000);
    internals(el)._plot = fakePlot(3);
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [{ s: '21.0', lu: now - 60 }],
        'sensor.gym_effective_low': [{ s: '19.5', lu: now - 60 }],
        'sensor.gym_effective_high': [{ s: '22.5', lu: now - 60 }],
      },
    });
    await el.updateComplete;
    el.roomEntity = 'sensor.study_room_temperature';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(root(el).querySelector('.status')!.textContent).toContain('Loading');
    expect(root(el).querySelector('.chart-host')!.classList.contains('idle')).toBe(true);
    expect(readout(el)).toBe('');
  });
});

describe('comfort-band-history-chart readout (#34)', () => {
  /** A chart with history delivered: a stand-in for uPlot drawn. */
  async function withHistory(props = OVERLAYS) {
    const { el, sub } = await chart(props);
    const now = Math.floor(Date.now() / 1000);
    const count = props === OVERLAYS ? 5 : 3;
    internals(el)._plot = fakePlot(count);
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [
          { s: '20.0', lu: now - 7200 },
          { s: '21.3', lu: now - 60 },
        ],
        'sensor.gym_effective_low': [{ s: '19.5', lu: now - 7200 }],
        'sensor.gym_effective_high': [{ s: '22.5', lu: now - 7200 }],
        'sensor.gym_apparent_temperature': [{ s: '21.9', lu: now - 7200 }],
        'sensor.gym_humidity': [{ s: '45', lu: now - 7200 }],
        'sensor.gym_current_action': [
          { s: 'heating', lu: now - 7200 },
          { s: 'idle', lu: now - 3600 },
        ],
      },
    });
    await el.updateComplete;
    return { el, now };
  }

  // The action's changes come at their own times, after a reading as often
  // as not: "Now" is now's (#34 review).
  it('gives now’s heating or cooling as "Now", whenever the last reading was', async () => {
    const { el, sub } = await chart(FULL);
    const now = Math.floor(Date.now() / 1000);
    internals(el)._plot = fakePlot(3);
    const room = {
      'sensor.gym_room_temperature': [{ s: '19.4', lu: now - 900 }],
      'sensor.gym_effective_low': [{ s: '19.5', lu: now - 7200 }],
      'sensor.gym_effective_high': [{ s: '22.5', lu: now - 7200 }],
    };
    sub.emit({
      states: {
        ...room,
        'sensor.gym_current_action': [
          { s: 'idle', lu: now - 7200 },
          { s: 'heating', lu: now - 300 },
        ],
      },
    });
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 19.4° · Range 19.5–22.5° · Heating');
    sub.emit({ states: { 'sensor.gym_current_action': [{ s: 'idle', lu: now - 60 }] } });
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 19.4° · Range 19.5–22.5°');
  });

  it('runs the chart to now, with each heating or cooling change on its time axis', async () => {
    const { el, sub } = await chart(FULL);
    const now = Math.floor(Date.now() / 1000);
    internals(el)._plot = fakePlot(3);
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [
          { s: '23.0', lu: now - 3600 },
          { s: '22.8', lu: now - 1800 },
        ],
        'sensor.gym_effective_low': [{ s: '19.5', lu: now - 3600 }],
        'sensor.gym_effective_high': [{ s: '22.5', lu: now - 3600 }],
        // A short cycle between two readings.
        'sensor.gym_current_action': [
          { s: 'idle', lu: now - 3600 },
          { s: 'cooling', lu: now - 3000 },
          { s: 'idle', lu: now - 2880 },
        ],
      },
    });
    await el.updateComplete;
    const xs = internals(el)._data![0] as number[];
    expect(xs).toEqual([now - 3600, now - 3000, now - 2880, now - 1800, now]);
    // The pointer on the cycle's start.
    internals(el)._cursorIdx = 1;
    await el.updateComplete;
    expect(readout(el)).toMatch(/· Room 23° · Range 19\.5–22\.5° · Cooling$/);
    internals(el)._cursorIdx = 2;
    await el.updateComplete;
    expect(readout(el)).not.toContain('Cooling');
    // A point past the data (stale) reads as now.
    internals(el)._cursorIdx = 999;
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 22.8° · Range 19.5–22.5°');
  });

  // The stream's updates change nothing else the readout would redraw for.
  it('gives a live update’s values at once', async () => {
    const { el, sub } = await chart(FULL);
    const now = Math.floor(Date.now() / 1000);
    internals(el)._plot = fakePlot(3);
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [{ s: '21.0', lu: now - 600 }],
        'sensor.gym_effective_low': [{ s: '19.5', lu: now - 600 }],
        'sensor.gym_effective_high': [{ s: '22.5', lu: now - 600 }],
      },
    });
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 21° · Range 19.5–22.5°');
    sub.emit({ states: { 'sensor.gym_room_temperature': [{ s: '21.6', lu: now - 10 }] } });
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 21.6° · Range 19.5–22.5°');
  });

  it('gives the other edge alone when one is hidden in the legend', async () => {
    const { el } = await withHistory();
    internals(el)._toggleLabel('Low band');
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 21.3° · Feels like 21.9° · High 22.5° · Humidity 45%');
  });

  it('gives the latest values as "Now" without a pointer', async () => {
    const { el } = await withHistory();
    expect(readout(el)).toBe(
      'Now · Room 21.3° · Feels like 21.9° · Range 19.5–22.5° · Humidity 45%',
    );
  });

  it('gives the values where the pointer is, with heating or cooling then', async () => {
    const { el, now } = await withHistory();
    internals(el)._cursorIdx = 0;
    await el.updateComplete;
    // Two hours ago: today's time, or yesterday's with its weekday.
    const when = readoutTime((now - 7200) * 1000, Date.now(), {
      locale: { language: 'en-GB', time_format: '24' },
    } as never);
    expect(readout(el)).toBe(
      `${when} · Room 20° · Feels like 21.9° · Range 19.5–22.5° · Humidity 45% · Heating`,
    );
  });

  it('leaves out a series hidden in the legend', async () => {
    const { el } = await withHistory();
    const toggle = Array.from(root(el).querySelectorAll<HTMLElement>('.legend .toggle')).find((t) =>
      t.textContent!.includes('Humidity'),
    )!;
    toggle.click();
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 21.3° · Feels like 21.9° · Range 19.5–22.5°');
  });

  // The last point is now's.
  it('gives the last point as "Now"', async () => {
    const { el } = await withHistory();
    internals(el)._cursorIdx = internals(el)._data![0].length - 1;
    await el.updateComplete;
    expect(readout(el)).toBe(
      'Now · Room 21.3° · Feels like 21.9° · Range 19.5–22.5° · Humidity 45%',
    );
    internals(el)._cursorIdx = internals(el)._data![0].length - 2;
    await el.updateComplete;
    expect(readout(el)).not.toMatch(/^Now/);
  });

  it('follows uPlot’s cursor, back to the latest when it leaves', async () => {
    const { el } = await withHistory();
    const hook = internals(el)._buildOpts(400).hooks.setCursor[0];
    hook({ cursor: { idx: 0 } });
    expect(internals(el)._cursorIdx).toBe(0);
    hook({ cursor: { idx: null } });
    expect(internals(el)._cursorIdx).toBeNull();
    hook({ cursor: {} });
    expect(internals(el)._cursorIdx).toBeNull();
  });

  it('forgets the pointer’s point when another range is picked', async () => {
    const { el } = await withHistory();
    internals(el)._cursorIdx = 0;
    rangeButtons(el)[0].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(internals(el)._cursorIdx).toBeNull();
  });

  // As the card's other controls: 44 px to tap (WCAG 2.5.5).
  it('makes the range buttons 44 px tall, the one shown marked by more than colour', () => {
    const css = (
      customElements.get('comfort-band-history-chart') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    const rule = (sel: string) =>
      new RegExp(`${sel.replace(/[[\]'=]/g, (c) => `\\${c}`)}\\s*\\{([^}]*)\\}`).exec(css)?.[1] ??
      '';
    expect(rule('.ranges button')).toMatch(/min-height:\s*44px/);
    const pressedRule = rule(".ranges button[aria-pressed='true']");
    expect(pressedRule).toMatch(/border-color:\s*var\(--cb-text-secondary\)/);
    expect(pressedRule).toMatch(/font-weight:\s*500/);
  });

  it('is two lines tall whatever its words take', () => {
    const css = (
      customElements.get('comfort-band-history-chart') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    const rule = /\.readout\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
    expect(rule).toMatch(/line-height:\s*1\.35/);
    expect(rule).toMatch(/min-height:\s*2\.7em/);
  });
});

describe('comfort-band-history-chart strip and axes (#34)', () => {
  it('draws heating and cooling as a strip under the plot, in their mixed colours', async () => {
    const { el } = await chart(FULL);
    const opts = internals(el)._buildOpts(400);
    internals(el)._intervals = [
      { start: 20, end: 40, action: 'heating' },
      { start: 60, end: 61, action: 'cooling' },
    ];
    const fills: Array<{ style: string; args: number[] }> = [];
    const ctx = {
      fillStyle: '',
      save: vi.fn(),
      restore: vi.fn(),
      fillRect(...args: number[]) {
        fills.push({ style: this.fillStyle, args });
      },
    };
    opts.hooks.draw[0]({
      ctx,
      bbox: { left: 10, top: 5, width: 100, height: 50 },
      valToPos: (v: number) => v,
    });
    const { heating, cooling } = internals(el)._stripColors;
    // The action's colour 30% of the way to the text's (the theme's, or
    // these fallbacks where it gives none).
    expect(heating).toBe(mixColor('#d9603f', '#212121', 0.3));
    expect(cooling).toBe(mixColor('#2f7fcc', '#212121', 0.3));
    // 3 px under the plot, 6 px tall.
    expect(fills).toEqual([
      { style: heating, args: [20, 58, 20, 6] },
      { style: cooling, args: [60, 58, 1, 6] },
    ]);
  });

  it('draws the strip in whole device pixels at a phone’s ratio, cut at the plot’s right', async () => {
    const { el } = await chart(FULL);
    const opts = internals(el)._buildOpts(400);
    internals(el)._intervals = [{ start: 100, end: 150, action: 'heating' }];
    const fills: number[][] = [];
    const ctx = {
      fillStyle: '',
      save: vi.fn(),
      restore: vi.fn(),
      fillRect: (...args: number[]) => fills.push(args),
    };
    const ratio = Object.getOwnPropertyDescriptor(uPlot, 'pxRatio');
    Object.defineProperty(uPlot, 'pxRatio', { value: 1.5, configurable: true, writable: true });
    try {
      opts.hooks.draw[0]({
        ctx,
        bbox: { left: 10, top: 5, width: 100, height: 50 },
        valToPos: (v: number) => v,
      });
    } finally {
      if (ratio) Object.defineProperty(uPlot, 'pxRatio', ratio);
    }
    // Top 55 + 4.5 → 60, height 9; to the plot's right edge, 110.
    expect(fills).toEqual([[100, 60, 10, 9]]);
  });

  it('keeps two runs of heating with idle between them apart', async () => {
    const { el } = await chart(FULL);
    expect(
      internals(el)._actionIntervals([
        { s: 'heating', lu: 0 },
        { s: 'idle', lu: 60 },
        { s: 'heating', lu: 120 },
        { s: 'idle', lu: 180 },
      ]),
    ).toEqual([
      { start: 0, end: 60, action: 'heating' },
      { start: 120, end: 180, action: 'heating' },
    ]);
  });

  it('draws a run of the same action as one interval', async () => {
    const { el } = await chart(FULL);
    const runs = internals(el)._actionIntervals([
      { s: 'heating', lu: 0 },
      { s: 'heating', lu: 60 },
      { s: 'heating', lu: 120 },
      { s: 'idle', lu: 180 },
      { s: 'cooling', lu: 240 },
      { s: 'heating', lu: 300 },
    ]);
    expect(runs).toEqual([
      { start: 0, end: 180, action: 'heating' },
      { start: 240, end: 300, action: 'cooling' },
      // The one in force now runs on.
      { start: 300, end: Infinity, action: 'heating' },
    ]);
  });

  it('shows the strip’s colours in the legend', async () => {
    const { el } = await chart(FULL);
    internals(el)._buildOpts(400);
    internals(el)._loading = false;
    el.requestUpdate();
    await el.updateComplete;
    const swatch = (name: string) =>
      Array.from(root(el).querySelectorAll('.legend > span'))
        .find((s) => s.textContent!.includes(name))!
        .querySelector<HTMLElement>('.swatch')!;
    expect(swatch('Heating').style.background).toBe(internals(el)._stripColors.heating);
    expect(swatch('Cooling').style.background).toBe(internals(el)._stripColors.cooling);
    expect(swatch('Heating').style.opacity).toBe('');
  });

  it('labels the time axis in HA’s setting, leaving room for the strip', async () => {
    const { el } = await chart(FULL);
    const x = internals(el)._buildOpts(400).axes[0];
    expect(x.ticks?.show).toBe(false);
    expect(x.gap).toBe(14);
    expect(x.size).toBe(62);
    const at = new Date(2026, 10, 20, 18, 0).getTime() / 1000;
    expect(x.values!({ scales: { x: { min: at - 3600, max: at + 3600 } } }, [at])).toEqual([
      '18:00',
    ]);
  });

  // uPlot writes the temperature axis's numbers, to whatever step it takes
  // (round 2: a unit and rounding of our own got 0.025 steps wrong).
  it('leaves the temperature axis’s numbers to uPlot, both value axes as wide as their labels', async () => {
    const { el } = await chart(OVERLAYS);
    const axes = internals(el)._buildOpts(400).axes;
    expect(axes[1].values).toBeUndefined();
    expect(axes[1].size).toBe(fitAxis);
    expect(axes[2].size).toBe(fitAxis);
    expect(axes[2].values!({}, [100])).toEqual(['100%']);
  });

  it('labels the time axis by the span shown', async () => {
    const { el } = await chart(FULL);
    const x = internals(el)._buildOpts(400).axes[0];
    const midnight = new Date(2026, 10, 21, 0, 0).getTime() / 1000;
    const span = (hours: number) => ({
      scales: { x: { min: midnight - hours * 3600, max: midnight } },
    });
    expect(x.values!(span(24), [midnight])).toEqual(['00:00\nSat 21']);
    expect(x.values!(span(168), [midnight])).toEqual(['Sat 21']);
  });
});
