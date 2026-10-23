/**
 * What the Schedule tab says about now (#33): the range in force and when
 * the schedule next changes it, which of the list's changes is in force,
 * and which changes repeat the range before them.
 *
 * The range in force and the next change come from the integration's
 * entities (`effective_low`/`effective_high`, `next_band_change`), as on the
 * Now tab, not from the list: an adjustment, peak saving or a shared
 * schedule can each make them differ from it. The list's times are HA's
 * local time, so "now" on the chart, and the times in the line, are too.
 */

import type { ZoneEntities } from './helpers.js';
import type { HomeAssistant, Transition } from './types.js';
import { readRoom } from './room-status.js';
import { bandText } from './now-status.js';
import { formatWhen, hasSince } from './diagnostics.js';
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
 * that has shared schedules (v0.14.0+).
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
 * "Now 19.5–22.5° · from 9 pm 18–22°": the range in force, why it's not
 * the schedule's where it isn't, and when the schedule next changes it and
 * to what. Null while the range in force can't be read.
 */
export function nowLine(hass: HomeAssistant, entities: ZoneEntities, now: number): string | null {
  const r = readRoom(hass, entities);
  if (!Number.isFinite(r.band.low) || !Number.isFinite(r.band.high)) return null;
  let line = `Now ${bandText(r.band)}`;
  // In HA's time zone, as the list's times are.
  const zone = hass.config?.time_zone;
  // Something other than the schedule shaping the range now may still be at
  // its next change, so that's said as the schedule's, not as what's in force.
  let shaped = r.overrideActive;
  if (r.overrideActive) {
    line +=
      r.scheduled === true && r.overrideEnds !== null && r.overrideEnds > now
        ? `, adjusted until ${formatWhen(r.overrideEnds, now, hass, zone)}`
        : ', adjusted';
  } else {
    const peakId = entities.peakSaving;
    const peak = typeof peakId === 'string' ? hass.states[peakId]?.state : undefined;
    if (peak === 'active') line += ', relaxed for a peak';
    if (peak === 'preconditioning') line += ', moved ahead of a peak';
    shaped = peak === 'active' || peak === 'preconditioning';
  }
  const nextId = entities.nextBandChange;
  const next = nextId !== null ? hass.states[nextId] : undefined;
  const low = next?.attributes.low;
  const high = next?.attributes.high;
  if (
    r.scheduled === true &&
    r.nextChange !== null &&
    r.nextChange > now &&
    typeof low === 'number' &&
    typeof high === 'number'
  ) {
    const when = formatWhen(r.nextChange, now, hass, zone);
    const band = bandText({ low, high });
    line += shaped ? ` · the schedule changes to ${band} at ${when}` : ` · from ${when} ${band}`;
  }
  return line;
}
