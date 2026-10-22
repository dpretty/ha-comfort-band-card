/**
 * Pure helpers behind the Now tab's top half and the tile: which temperature
 * to show large, the one-line status ("Comfortable · 17.5–23° until 9 pm"),
 * and the Warmer / Cooler shift. Kept free of Lit so each rule can be tested
 * on its own.
 */

import type { HomeAssistant } from './types.js';

/** One tap of Warmer or Cooler moves the whole range by this much. */
export const SHIFT_STEP = 0.5;
/** The schedule editor's limits. Warmer and Cooler stop at them: neither
 *  takes a range past one, and neither moves a range already past one any
 *  further that way. */
export const SHIFT_MIN_LOW = 10;
export const SHIFT_MAX_HIGH = 35;

export interface Band {
  low: number;
  high: number;
}

/** "17.5–23°": whole degrees without a trailing ".0", as people write them. */
export function bandText(band: Band): string {
  return `${degrees(band.low)}–${degrees(band.high)}°`;
}

function degrees(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1);
}

/**
 * The range moved `steps` taps warmer (positive) or cooler (negative), keeping
 * its width. Warmer stops where the top reaches 35, Cooler where the bottom
 * reaches 10; only ever in the direction tapped, so a range already past a
 * limit (a frost-protection 7°, say) stays where it is rather than jumping.
 */
export function shiftBand(base: Band, steps: number): Band {
  let delta = steps * SHIFT_STEP;
  if (delta > 0) delta = Math.max(0, Math.min(delta, SHIFT_MAX_HIGH - base.high));
  if (delta < 0) delta = Math.min(0, Math.max(delta, SHIFT_MIN_LOW - base.low));
  return { low: round1(base.low + delta), high: round1(base.high + delta) };
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * The temperature shown large is the one that drives control: "feels like"
 * when apparent temperature is in use and readable, otherwise the room
 * reading. The other one, when it differs, goes underneath.
 */
export function headlineTemperature(opts: {
  room: number;
  apparent: number;
  useApparent: boolean;
}): { value: number; note: string } {
  const { room, apparent, useApparent } = opts;
  // Compared in the tenths both are shown in, so 19.8 and 19.9 differ.
  const differ =
    Number.isFinite(room) &&
    Number.isFinite(apparent) &&
    Math.round(apparent * 10) !== Math.round(room * 10);
  if (useApparent && Number.isFinite(apparent)) {
    return {
      value: apparent,
      note: differ ? `Feels like · room ${room.toFixed(1)}°` : 'Feels like',
    };
  }
  return { value: room, note: differ ? `Feels like ${apparent.toFixed(1)}°` : '' };
}

/** Where a temperature sits against a range, compared in the tenths both
 *  are shown in; null when either can't be read. */
export function rangePosition(temperature: number, band: Band): 'below' | 'in' | 'above' | null {
  if (![temperature, band.low, band.high].every(Number.isFinite)) return null;
  const t = Math.round(temperature * 10);
  if (t < Math.round(band.low * 10)) return 'below';
  if (t > Math.round(band.high * 10)) return 'above';
  return 'in';
}

/**
 * The room reading control is using:
 * - `ok`: the configured room sensor;
 * - `stand-in`: the room sensor is offline and a stand-in reading (a backup
 *   sensor, or the air conditioner's own) is driving control (v0.18.0+);
 * - `offline`: the room sensor is offline and nothing stands in, so control
 *   is on hold. Since v0.18.0 that includes the first few minutes of an
 *   outage, before a stand-in may take over;
 * - `no-reading`: there's no room reading, though the integration doesn't
 *   say the sensor is offline (one older than v0.16.0, or one starting up).
 */
export type SensorState = 'ok' | 'stand-in' | 'offline' | 'no-reading';

export type StatusKind =
  | 'adjusting'
  | 'paused'
  | 'sensor'
  | 'heating'
  | 'cooling'
  | 'comfortable'
  | 'below'
  | 'above'
  | 'idle'
  | 'none';

const STATUS_WORDS: Partial<Record<StatusKind, string>> = {
  heating: 'Heating',
  cooling: 'Cooling',
  comfortable: 'Comfortable',
  below: 'Idle',
  above: 'Idle',
  idle: 'Idle',
};

export interface StatusInput {
  /** The zone's `enabled` switch; false means it isn't controlling the room. */
  enabled: boolean;
  /** The room reading control is using. */
  sensor: SensorState;
  /** `heating`, `cooling`, `idle` or anything else (unknown). */
  action: string;
  /** The temperature that drives control. */
  temperature: number;
  /** The band in force (NaN when it can't be read). */
  band: Band;
  overrideActive: boolean;
  /** When the override ends, in ms, or null. */
  overrideEnds: number | null;
  /** Whether a schedule sets the zone's band; null when the integration doesn't say. */
  scheduled: boolean | null;
  /** When the schedule next changes the band, in ms, or null. */
  nextChange: number | null;
  /** What a change made on the card is doing, until it has gone through. */
  doing: string | null;
  now: number;
  formatTime: (ms: number) => string;
}

/**
 * The status line, in words. "until" is said only when it is true: for a
 * schedule, its next change; for an adjustment, when it ends, and only when a
 * schedule sets the zone's band. Without one, an adjustment's band is the
 * zone's band from then on, so it doesn't end.
 *
 * While a stand-in reading drives control, the line leads with "Room sensor
 * offline" and goes on as usual; with no reading at all, control is on hold.
 */
export function statusLine(s: StatusInput): { kind: StatusKind; text: string } {
  if (s.doing) return { kind: 'adjusting', text: s.doing };
  if (!s.enabled) return { kind: 'paused', text: 'Paused: not controlling this room' };
  if (s.sensor === 'offline')
    return { kind: 'sensor', text: 'On hold: the room sensor is offline' };
  if (s.sensor === 'no-reading') {
    return { kind: 'sensor', text: 'On hold: no room temperature reading' };
  }
  if (!Number.isFinite(s.band.low) || !Number.isFinite(s.band.high)) {
    return { kind: 'none', text: "Can't read this room's range" };
  }

  const position = rangePosition(s.temperature, s.band);
  const kind: StatusKind =
    s.action === 'heating'
      ? 'heating'
      : s.action === 'cooling'
        ? 'cooling'
        : s.action === 'idle'
          ? position === 'in'
            ? 'comfortable'
            : (position ?? 'idle')
          : 'none';
  const word = STATUS_WORDS[kind];

  let rest: string;
  if (s.overrideActive) {
    const until =
      s.scheduled === true && s.overrideEnds !== null && s.overrideEnds > s.now
        ? ` until ${s.formatTime(s.overrideEnds)}`
        : '';
    rest = `${s.scheduled === false ? 'set to' : 'adjusted to'} ${bandText(s.band)}${until}`;
  } else {
    const until =
      s.scheduled === true && s.nextChange !== null && s.nextChange > s.now
        ? ` until ${s.formatTime(s.nextChange)}`
        : '';
    rest = `${bandText(s.band)}${until}`;
  }
  const text = word ? `${word} · ${rest}` : rest.charAt(0).toUpperCase() + rest.slice(1);
  if (s.sensor === 'stand-in') return { kind: 'sensor', text: `Room sensor offline · ${text}` };
  return { kind, text };
}

/**
 * A wall-clock time in HA's chosen language and 12/24-hour setting where the
 * frontend provides them: "9 pm" or "4:30 pm" on a 12-hour clock, "21:00" or
 * "09:05" on a 24-hour one, where an hour on its own would read as a number.
 */
export function formatTime(ms: number, hass?: Pick<HomeAssistant, 'locale'>): string {
  const date = new Date(ms);
  const pref = hass?.locale?.time_format;
  const language = hass?.locale?.language;
  let twelveHour: boolean;
  if (pref === '12') twelveHour = true;
  else if (pref === '24') twelveHour = false;
  else {
    // 'system' takes the 12/24-hour choice from the browser, as HA's frontend
    // does, and keeps HA's language for everything else; otherwise the
    // language's own clock.
    const cycle = new Intl.DateTimeFormat(pref === 'system' ? undefined : language, {
      hour: 'numeric',
    }).resolvedOptions().hourCycle;
    twelveHour = cycle === 'h11' || cycle === 'h12';
  }
  // Applied as an hour cycle, as HA's frontend does. `hour12` maps to h11 or
  // h24 on some engines, which writes noon "0 pm" and half past midnight "24:30".
  const options: Intl.DateTimeFormatOptions = {
    hourCycle: twelveHour ? 'h12' : 'h23',
    hour: twelveHour ? 'numeric' : '2-digit',
  };
  if (!twelveHour || date.getMinutes() !== 0) options.minute = '2-digit';
  return new Intl.DateTimeFormat(language, options).format(date);
}
