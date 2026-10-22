import { describe, it, expect } from 'vitest';
import {
  bandText,
  formatTime,
  headlineTemperature,
  shiftBand,
  statusLine,
  type StatusInput,
} from '../src/now-status.js';

describe('bandText', () => {
  it('writes whole degrees without a trailing .0', () => {
    expect(bandText({ low: 18, high: 23 })).toBe('18–23°');
    expect(bandText({ low: 17.5, high: 23 })).toBe('17.5–23°');
  });

  it('rounds to the tenth of a degree', () => {
    expect(bandText({ low: 18.37, high: 22.96 })).toBe('18.4–23°');
  });
});

describe('shiftBand', () => {
  it('moves both ends by half a degree a step, keeping the width', () => {
    expect(shiftBand({ low: 17.5, high: 23 }, 2)).toEqual({ low: 18.5, high: 24 });
    expect(shiftBand({ low: 17.5, high: 23 }, -3)).toEqual({ low: 16, high: 21.5 });
  });

  it('stops at the schedule editor limits rather than passing them', () => {
    expect(shiftBand({ low: 30, high: 34.5 }, 3)).toEqual({ low: 30.5, high: 35 });
    expect(shiftBand({ low: 10.5, high: 15 }, -3)).toEqual({ low: 10, high: 14.5 });
  });

  // A frost-protection or away band can sit past a limit; a tap must never
  // move it the other way, nor further past the limit.
  it('never moves a range against the tap, nor further past a limit', () => {
    expect(shiftBand({ low: 7, high: 32 }, -1)).toEqual({ low: 7, high: 32 });
    expect(shiftBand({ low: 7, high: 32 }, 1)).toEqual({ low: 7.5, high: 32.5 });
    expect(shiftBand({ low: 20, high: 37 }, 1)).toEqual({ low: 20, high: 37 });
    expect(shiftBand({ low: 20, high: 37 }, -1)).toEqual({ low: 19.5, high: 36.5 });
    // Wider than the limits allow: each direction still only goes its way.
    expect(shiftBand({ low: 8, high: 34 }, -1)).toEqual({ low: 8, high: 34 });
    expect(shiftBand({ low: 8, high: 34 }, 3)).toEqual({ low: 9, high: 35 });
  });

  it('rounds a range clamped from a fractional base to the tenth', () => {
    expect(shiftBand({ low: 30.37, high: 34.83 }, 1)).toEqual({ low: 30.5, high: 35 });
  });

  it('keeps a fractional band to the tenth', () => {
    expect(shiftBand({ low: 18.4, high: 22.8 }, 1)).toEqual({ low: 18.9, high: 23.3 });
  });
});

describe('headlineTemperature', () => {
  it('shows the room reading when it drives control', () => {
    expect(headlineTemperature({ room: 21, apparent: 21, useApparent: false })).toEqual({
      value: 21,
      note: '',
    });
  });

  it('notes "feels like" when it differs in the tenths shown', () => {
    expect(headlineTemperature({ room: 21, apparent: 21.1, useApparent: false }).note).toBe(
      'Feels like 21.1°',
    );
    // 19.9 - 19.8 is just under 0.1 in floating point; shown, they differ.
    expect(headlineTemperature({ room: 19.8, apparent: 19.9, useApparent: false }).note).toBe(
      'Feels like 19.9°',
    );
    expect(headlineTemperature({ room: 21, apparent: 21.04, useApparent: false }).note).toBe('');
  });

  it('shows "feels like" when it drives control', () => {
    expect(headlineTemperature({ room: 19.2, apparent: 19.9, useApparent: true })).toEqual({
      value: 19.9,
      note: 'Feels like · room 19.2°',
    });
  });

  it('falls back to the room reading when "feels like" can\'t be read', () => {
    expect(headlineTemperature({ room: 19.2, apparent: NaN, useApparent: true })).toEqual({
      value: 19.2,
      note: '',
    });
  });

  it('says only "feels like" when the room reading is missing', () => {
    expect(headlineTemperature({ room: NaN, apparent: 19.9, useApparent: true }).note).toBe(
      'Feels like',
    );
  });
});

describe('statusLine', () => {
  const NOW = Date.parse('2026-10-22T10:00:00Z');
  const base: StatusInput = {
    enabled: true,
    action: 'idle',
    temperature: 20,
    band: { low: 18, high: 23 },
    overrideActive: false,
    overrideEnds: null,
    scheduled: true,
    nextChange: NOW + 3_600_000,
    doing: null,
    now: NOW,
    formatTime: (ms) => `T+${(ms - NOW) / 60_000}m`,
  };
  const line = (patch: Partial<StatusInput>) => statusLine({ ...base, ...patch });

  it('says the room is comfortable, its range, and until the next change', () => {
    expect(line({})).toEqual({ kind: 'comfortable', text: 'Comfortable · 18–23° until T+60m' });
  });

  it('counts the range ends as inside it', () => {
    expect(line({ temperature: 18 }).kind).toBe('comfortable');
    expect(line({ temperature: 23 }).kind).toBe('comfortable');
    expect(line({ temperature: 23.1 }).kind).toBe('idle');
  });

  it('names heating and cooling whatever the temperature', () => {
    expect(line({ action: 'heating' }).text).toBe('Heating · 18–23° until T+60m');
    expect(line({ action: 'cooling', temperature: 17 }).text).toBe('Cooling · 18–23° until T+60m');
  });

  it('says "idle" for a room outside its range that is not being heated or cooled', () => {
    expect(line({ temperature: 17.5 })).toEqual({
      kind: 'idle',
      text: 'Idle · 18–23° until T+60m',
    });
  });

  it('leaves the word out when the action is unknown', () => {
    expect(line({ action: 'unknown' })).toEqual({ kind: 'none', text: '18–23° until T+60m' });
  });

  it('promises no end when the next change is past, missing, or unscheduled', () => {
    expect(line({ nextChange: NOW - 1 }).text).toBe('Comfortable · 18–23°');
    expect(line({ nextChange: null }).text).toBe('Comfortable · 18–23°');
    expect(line({ scheduled: null }).text).toBe('Comfortable · 18–23°');
  });

  it('says an adjustment and when it ends, where a schedule sets the band', () => {
    expect(line({ overrideActive: true, overrideEnds: NOW + 7_200_000 }).text).toBe(
      'Comfortable · adjusted to 18–23° until T+120m',
    );
    expect(line({ overrideActive: true, overrideEnds: null }).text).toBe(
      'Comfortable · adjusted to 18–23°',
    );
    expect(line({ overrideActive: true, overrideEnds: NOW + 1, scheduled: null }).text).toBe(
      'Comfortable · adjusted to 18–23°',
    );
    // An end already past isn't one to promise.
    expect(line({ overrideActive: true, overrideEnds: NOW - 1 }).text).toBe(
      'Comfortable · adjusted to 18–23°',
    );
  });

  it('says an adjustment is set, without an end, where no schedule sets the band', () => {
    expect(
      line({ overrideActive: true, overrideEnds: NOW + 7_200_000, scheduled: false }).text,
    ).toBe('Comfortable · set to 18–23°');
  });

  it('capitalises the sentence when it has no leading word', () => {
    expect(line({ action: 'unknown', overrideActive: true }).text).toBe('Adjusted to 18–23°');
  });

  it('shows a change made on the card before anything else', () => {
    expect(line({ doing: 'Adjusting to 19–24°', enabled: false })).toEqual({
      kind: 'adjusting',
      text: 'Adjusting to 19–24°',
    });
  });

  it("doesn't call a room with no reading comfortable", () => {
    expect(line({ temperature: NaN }).kind).toBe('idle');
  });

  it('says a paused room is not being controlled', () => {
    expect(line({ enabled: false, action: 'heating' })).toEqual({
      kind: 'paused',
      text: 'Paused: not controlling this room',
    });
  });

  it("says when the range can't be read", () => {
    expect(line({ band: { low: NaN, high: 23 } })).toEqual({
      kind: 'none',
      text: "Can't read this room's range",
    });
  });
});

describe('formatTime', () => {
  const at = (h: number, m: number) => new Date(2026, 9, 22, h, m).getTime();
  const locale = (time_format: '12' | '24', language = 'en-US') => ({
    locale: { language, time_format },
  });

  it('leaves the minutes off a whole hour on a 12-hour clock', () => {
    expect(formatTime(at(21, 0), locale('12'))).toBe('9 PM');
    expect(formatTime(at(16, 30), locale('12'))).toBe('4:30 PM');
  });

  it('keeps the minutes on a 24-hour clock, where an hour alone reads as a number', () => {
    expect(formatTime(at(21, 0), locale('24', 'en-GB'))).toBe('21:00');
    expect(formatTime(at(9, 5), locale('24', 'en-GB'))).toBe('09:05');
  });

  it("follows HA's 12/24-hour setting over the language's own clock", () => {
    expect(formatTime(at(21, 0), locale('12', 'en-GB'))).toBe('9 pm');
    expect(formatTime(at(21, 0), locale('24', 'en-US'))).toBe('21:00');
  });

  it("follows the browser's own clock for HA's 'system' setting", () => {
    // A language whose clock differs from the browser's, so following it
    // would show.
    const cycle = new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions()
      .hourCycle;
    const browser12 = cycle === 'h11' || cycle === 'h12';
    const other = browser12 ? 'en-GB' : 'en-US';
    const expected = formatTime(at(21, 0));
    expect(formatTime(at(21, 0), { locale: { language: other, time_format: 'system' } })).toBe(
      expected,
    );
    expect(formatTime(at(21, 0), { locale: { language: other } })).not.toBe(expected);
  });

  it("follows the language's own clock when no preference is set", () => {
    expect(formatTime(at(21, 0), { locale: { language: 'en-GB' } })).toBe('21:00');
    expect(formatTime(at(21, 0), { locale: { language: 'en-US' } })).toBe('9 PM');
  });
});
