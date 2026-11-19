/**
 * What the Schedule tab says about now (#33): the range in force, which of
 * the list's changes is in force, and which changes repeat the range before
 * them.
 *
 * The range in force comes from the integration's entities
 * (`effective_low`/`effective_high`), as on the Now tab, not from the list:
 * an adjustment, peak saving or a shared schedule can each make it differ
 * from it. The list's times are HA's local time, so "now" on the chart and
 * in the list is too, and so are the times the lines say.
 */

import type { ZoneEntities } from './helpers.js';
import type { HomeAssistant, Transition } from './types.js';
import { readRoom } from './room-status.js';
import { bandText } from './now-status.js';
import { formatWhen, hasSince, peakShift } from './diagnostics.js';
import { parseTime } from './schedule-chart.js';

/** Minutes past midnight at `ms`, in HA's time zone where the frontend
 *  gives it (a schedule's times are HA's local time), else the browser's. */
export function minutesOfDay(ms: number, hass?: Pick<HomeAssistant, 'config'>): number {
  const zone = hass?.config?.time_zone;
  if (zone) {
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: zone,
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(ms);
      const hour = Number(parts.find((p) => p.type === 'hour')?.value);
      const minute = Number(parts.find((p) => p.type === 'minute')?.value);
      if (Number.isFinite(hour) && Number.isFinite(minute)) return hour * 60 + minute;
    } catch {
      // An unknown zone: the browser's clock below.
    }
  }
  const d = new Date(ms);
  return d.getHours() * 60 + d.getMinutes();
}

/** The change in force at `minutes` past midnight: the last one at or
 *  before it, or, before the first, the day's last, carried over from the
 *  night before. Null for an empty list. `transitions` is in time order. */
export function currentIndex(transitions: Transition[], minutes: number): number | null {
  if (transitions.length === 0) return null;
  let found = transitions.length - 1;
  for (let i = 0; i < transitions.length; i++) {
    if (parseTime(transitions[i].at) <= minutes) found = i;
  }
  return found;
}

/** Which changes set the same range as the one in force before them (the
 *  list wraps round midnight). None, for a list of fewer than two. */
export function sameAsBefore(transitions: Transition[]): boolean[] {
  if (transitions.length < 2) return transitions.map(() => false);
  const tenths = (v: number) => Math.round(v * 10);
  return transitions.map((t, i) => {
    const before = transitions[(i + transitions.length - 1) % transitions.length];
    return tenths(t.low) === tenths(before.low) && tenths(t.high) === tenths(before.high);
  });
}

/**
 * Whether the list (the room's own schedule) is the one in force: not while
 * the room follows a shared schedule. Null where that can't be told: the
 * schedule assignment entity unreadable, or turned off on an integration
 * that has shared schedules, as its v0.16.0+ entities show. On v0.14–v0.15
 * the assignment is the only sign of shared schedules, so with it turned
 * off the room's own is taken as in force.
 */
export function ownScheduleInForce(hass: HomeAssistant, entities: ZoneEntities): boolean | null {
  const id = entities.scheduleAssignment;
  if (typeof id !== 'string') return hasSince(entities, 'v0.14') ? null : true;
  const state = hass.states[id];
  if (!state || state.state === 'unavailable') return null;
  const shared = state.attributes.schedule_id;
  if (shared === null) return true;
  return typeof shared === 'string' ? false : null;
}

/** The shared schedule the room follows, by name as typed, or null. */
export function sharedScheduleName(hass: HomeAssistant, entities: ZoneEntities): string | null {
  if (ownScheduleInForce(hass, entities) !== false) return null;
  const state = hass.states[entities.scheduleAssignment as string];
  return state?.state && state.state !== 'unknown' ? state.state : null;
}

/**
 * "Now 19.5–22.5°", and why it differs from the schedule's where an entity
 * proves it (#47): "adjusted until 5 pm", only while a schedule sets the
 * range (without one, an adjustment's range is simply the room's);
 * "relaxed for a peak until 6 pm" or "getting ready for a peak at 4 pm",
 * only where peak saving's adjustments say it moved the range. The band
 * ramp's easing isn't said: nothing tells it. Null while the range in force
 * can't be read.
 */
export function nowLine(hass: HomeAssistant, entities: ZoneEntities, now: number): string | null {
  const r = readRoom(hass, entities);
  if (!Number.isFinite(r.band.low) || !Number.isFinite(r.band.high)) return null;
  const zone = hass.config?.time_zone;
  const ahead = (ms: number | null) => ms !== null && ms > now;
  let why = '';
  if (r.overrideActive) {
    if (r.scheduled === true) {
      why = ahead(r.overrideEnds)
        ? `, adjusted until ${formatWhen(r.overrideEnds!, now, hass, zone)}`
        : ', adjusted';
    }
  } else {
    const peak = peakShift(hass, entities);
    if (peak?.kind === 'relaxed') {
      why = ahead(peak.at)
        ? `, relaxed for a peak until ${formatWhen(peak.at!, now, hass, zone)}`
        : ', relaxed for a peak';
    } else if (peak?.kind === 'ahead') {
      why = ahead(peak.at)
        ? `, getting ready for a peak at ${formatWhen(peak.at!, now, hass, zone)}`
        : ', getting ready for a peak';
    }
  }
  return `Now ${bandText(r.band)}${why}`;
}

/**
 * "The schedule’s next change: 9 pm → 18–22°": the schedule's own, said as
 * the schedule's, since the range in force can differ from then (an
 * adjustment or a peak can outlast it, and the band ramp eases into it)
 * (#33). It's the schedule in force: "The shared schedule’s" while the
 * room follows one, as the list below isn't it then. Null where no
 * schedule sets the range, or its next change, ahead, or its range can't
 * be read.
 */
export function nextChangeLine(
  hass: HomeAssistant,
  entities: ZoneEntities,
  now: number,
): string | null {
  const r = readRoom(hass, entities);
  if (r.scheduled !== true || r.nextChange === null || r.nextChange <= now) return null;
  const id = entities.nextBandChange;
  const attributes = id !== null ? hass.states[id]?.attributes : undefined;
  const low = attributes?.low;
  const high = attributes?.high;
  if (typeof low !== 'number' || typeof high !== 'number') return null;
  if (!Number.isFinite(low) || !Number.isFinite(high)) return null;
  const when = formatWhen(r.nextChange, now, hass, hass.config?.time_zone);
  const whose = ownScheduleInForce(hass, entities) === false ? 'shared schedule' : 'schedule';
  return `The ${whose}’s next change: ${when} → ${bandText({ low, high })}`;
}
