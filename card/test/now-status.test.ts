import { describe, it, expect } from 'vitest';
import {
  bandText,
  formatClock,
  formatTime,
  headlineTemperature,
  rangePosition,
  shiftBand,
  shownTenths,
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

  it('rounds both ends to the tenth when a limit stops a step short', () => {
    // The bottom can only go 0.1 lower: 16.4 - 0.1 is 16.299999... in floats.
    expect(shiftBand({ low: 10.1, high: 16.4 }, -1)).toEqual({ low: 10, high: 16.3 });
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
    // Both shown as 21.4.
    expect(headlineTemperature({ room: 21.45, apparent: 21.4, useApparent: false }).note).toBe('');
    expect(headlineTemperature({ room: 21.45, apparent: 21.4, useApparent: true }).note).toBe(
      'Feels like',
    );
  });

  it('shows "feels like" when it drives control', () => {
    expect(headlineTemperature({ room: 19.2, apparent: 19.9, useApparent: true })).toEqual({
      value: 19.9,
      note: 'Feels like · room 19.2°',
    });
  });

  it('writes "feels like" to one decimal', () => {
    expect(headlineTemperature({ room: 21, apparent: 22, useApparent: false }).note).toBe(
      'Feels like 22.0°',
    );
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
    sensor: 'ok',
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
    expect(line({ temperature: 23.1 }).kind).toBe('above');
  });

  // 23.04 is shown as 23.0, inside an 18–23° range.
  it('judges comfort in the tenths shown', () => {
    expect(line({ temperature: 23.04 }).kind).toBe('comfortable');
    expect(line({ temperature: 17.96 }).kind).toBe('comfortable');
    expect(line({ temperature: 23.06 }).kind).toBe('above');
  });

  it('names heating and cooling whatever the temperature', () => {
    expect(line({ action: 'heating' }).text).toBe('Heating · 18–23° until T+60m');
    expect(line({ action: 'cooling', temperature: 17 }).text).toBe('Cooling · 18–23° until T+60m');
  });

  it('says "a bit cool" or "a bit warm" for a room outside its range that is not being heated or cooled', () => {
    expect(line({ temperature: 17.5 })).toEqual({
      kind: 'below',
      text: 'A bit cool · 18–23° until T+60m',
    });
    expect(line({ temperature: 23.5 })).toEqual({
      kind: 'above',
      text: 'A bit warm · 18–23° until T+60m',
    });
  });

  it('leaves the word out when the action is unknown', () => {
    expect(line({ action: 'unknown' })).toEqual({ kind: 'none', text: '18–23° until T+60m' });
  });

  it('promises no end when the next change is past, missing, or unscheduled', () => {
    expect(line({ nextChange: NOW }).text).toBe('Comfortable · 18–23°');
    expect(line({ nextChange: NOW - 1 }).text).toBe('Comfortable · 18–23°');
    expect(line({ nextChange: null }).text).toBe('Comfortable · 18–23°');
    expect(line({ scheduled: null }).text).toBe('Comfortable · 18–23°');
    expect(line({ scheduled: false }).text).toBe('Comfortable · 18–23°');
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
    // An end already past, or now, isn't one to promise.
    expect(line({ overrideActive: true, overrideEnds: NOW - 1 }).text).toBe(
      'Comfortable · adjusted to 18–23°',
    );
    expect(line({ overrideActive: true, overrideEnds: NOW }).text).toBe(
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
    expect(line({ enabled: false, sensor: 'offline' }).kind).toBe('paused');
  });

  it('leads with the sensor while a stand-in reading drives control', () => {
    expect(line({ sensor: 'stand-in', action: 'heating' })).toEqual({
      kind: 'sensor',
      text: 'Room sensor offline · Heating · 18–23° until T+60m',
    });
    expect(line({ sensor: 'stand-in', action: 'unknown', overrideActive: true }).text).toBe(
      'Room sensor offline · Adjusted to 18–23°',
    );
    expect(line({ sensor: 'stand-in', band: { low: NaN, high: 23 } })).toEqual({
      kind: 'sensor',
      text: "Room sensor offline · Can't read this room's range",
    });
  });

  it('says control is on hold with no room reading', () => {
    expect(line({ sensor: 'offline', temperature: NaN, action: 'heating' })).toEqual({
      kind: 'sensor',
      text: 'On hold: the room sensor is offline',
    });
    expect(line({ sensor: 'no-reading', temperature: NaN })).toEqual({
      kind: 'sensor',
      text: 'On hold: no room temperature reading',
    });
    // Before the range: it's the reading that's missing.
    expect(line({ sensor: 'offline', band: { low: NaN, high: NaN } }).kind).toBe('sensor');
  });

  it('puts a change made on the card before sensor trouble', () => {
    expect(line({ sensor: 'offline', doing: 'Going back to the schedule' }).kind).toBe('adjusting');
  });

  it("says when the range can't be read", () => {
    expect(line({ band: { low: NaN, high: 23 } })).toEqual({
      kind: 'none',
      text: "Can't read this room's range",
    });
    expect(line({ band: { low: 18, high: NaN } }).text).toBe("Can't read this room's range");
  });
});

describe('shownTenths', () => {
  it('rounds as toFixed(1) shows a temperature', () => {
    expect(shownTenths(17.45)).toBe(174);
    expect((17.45).toFixed(1)).toBe('17.4');
    expect(shownTenths(17.46)).toBe(175);
    expect(shownTenths(21)).toBe(210);
    expect(shownTenths(-0.05)).toBe(-1);
  });
});

describe('rangePosition', () => {
  const band = { low: 18, high: 23 };

  it('says which side of the range a temperature is, in the tenths shown', () => {
    expect(rangePosition(17.9, band)).toBe('below');
    expect(rangePosition(17.96, band)).toBe('in');
    expect(rangePosition(18, band)).toBe('in');
    expect(rangePosition(23, band)).toBe('in');
    expect(rangePosition(23.04, band)).toBe('in');
    expect(rangePosition(23.05, band)).toBe('above');
  });

  // 17.45 is stored just under the half: shown as 17.4, so below a 17.5 low.
  it('compares a temperature as it is shown, half-tenths included', () => {
    expect(rangePosition(17.45, { low: 17.5, high: 23 })).toBe('below');
    expect(rangePosition(19.95, { low: 20, high: 23 })).toBe('below');
    expect(rangePosition(20.45, { low: 20.5, high: 23 })).toBe('below');
    expect(rangePosition(22.55, { low: 18, high: 22.5 })).toBe('above');
  });

  // bandText writes a 17.45 low as "17.5", so 17.4 is below it, even
  // though the temperature itself would show 17.45 as 17.4.
  it('compares a range end as bandText writes it, not as a temperature is shown', () => {
    expect(bandText({ low: 17.45, high: 23 })).toBe('17.5–23°');
    expect(rangePosition(17.4, { low: 17.45, high: 23 })).toBe('below');
    expect(bandText({ low: 18, high: 22.45 })).toBe('18–22.5°');
    expect(rangePosition(22.5, { low: 18, high: 22.45 })).toBe('in');
  });

  // Mid-ramp, a range end can sit between tenths; it's shown rounded.
  it('compares a range end as it is shown', () => {
    expect(rangePosition(19.8, { low: 19.84, high: 23 })).toBe('in');
    expect(rangePosition(23.2, { low: 18, high: 23.16 })).toBe('in');
  });

  it("is null when the temperature or either end can't be read", () => {
    expect(rangePosition(NaN, band)).toBeNull();
    expect(rangePosition(20, { low: NaN, high: 23 })).toBeNull();
    expect(rangePosition(20, { low: 18, high: NaN })).toBeNull();
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

  // With `hour12`, some engines (Node 20 among them) count a 12-hour clock
  // from 0 and a 24-hour one to 24 when the language's own clock is the other.
  it('writes noon and midnight as 12 on a 12-hour clock and 00 on a 24-hour one', () => {
    expect(formatTime(at(12, 0), locale('12', 'en-GB'))).toBe('12 pm');
    expect(formatTime(at(0, 0), locale('12', 'en-GB'))).toBe('12 am');
    expect(formatTime(at(0, 30), locale('24', 'en-US'))).toBe('00:30');
    expect(formatTime(at(12, 0), locale('24', 'en-US'))).toBe('12:00');
  });

  // As HA's frontend does: the browser's 12/24-hour choice, HA's language.
  it("takes the browser's 12/24-hour choice for HA's 'system' setting", () => {
    const cycle = new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions()
      .hourCycle;
    const browser = cycle === 'h11' || cycle === 'h12' ? '12' : '24';
    // A language whose own clock is the other one, so following it would show.
    const other = browser === '12' ? 'en-GB' : 'en-US';
    expect(formatTime(at(21, 0), { locale: { language: other, time_format: 'system' } })).toBe(
      formatTime(at(21, 0), { locale: { language: other, time_format: browser } }),
    );
    expect(formatTime(at(21, 0), { locale: { language: other, time_format: 'system' } })).not.toBe(
      formatTime(at(21, 0), { locale: { language: other } }),
    );
    expect(formatTime(at(12, 0), { locale: { language: other, time_format: 'system' } })).toBe(
      formatTime(at(12, 0), { locale: { language: other, time_format: browser } }),
    );
  });

  it("follows the language's own clock when no preference is set", () => {
    expect(formatTime(at(21, 0), { locale: { language: 'en-GB' } })).toBe('21:00');
    expect(formatTime(at(21, 0), { locale: { language: 'en-US' } })).toBe('9 PM');
  });
});

describe('formatClock', () => {
  const locale = (time_format: '12' | '24', language = 'en-US') => ({
    locale: { language, time_format },
  });

  it("writes a schedule's time of day as formatTime does", () => {
    expect(formatClock('07:00', locale('12'))).toBe('7 AM');
    expect(formatClock('16:30', locale('12'))).toBe('4:30 PM');
    expect(formatClock('07:00', locale('24', 'en-GB'))).toBe('07:00');
    expect(formatClock('0:05', locale('24', 'en-GB'))).toBe('00:05');
    expect(formatClock('12:00', locale('12', 'en-GB'))).toBe('12 pm');
  });

  it("leaves anything that isn't a time of day as it is", () => {
    expect(formatClock('24:00', locale('12'))).toBe('24:00');
    expect(formatClock('07:60', locale('12'))).toBe('07:60');
    expect(formatClock('7am', locale('12'))).toBe('7am');
    expect(formatClock('', locale('12'))).toBe('');
  });
});
