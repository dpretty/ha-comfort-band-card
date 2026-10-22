/**
 * What a room is doing, read from its Comfort Band entities. Shared by the
 * tile, the floorplan chip and the Now tab, so all three say the same thing.
 */

import type { ZoneEntities } from './helpers.js';
import type { HomeAssistant } from './types.js';
import {
  type Band,
  type SensorState,
  type StatusKind,
  headlineTemperature,
  rangePosition,
} from './now-status.js';

export interface RoomReadings {
  /** The zone's `enabled` switch; false means it isn't controlling the room. */
  enabled: boolean;
  /** `heating`, `cooling`, `idle` or anything else (unknown). */
  action: string;
  room: number;
  apparent: number;
  useApparent: boolean;
  /** The temperature that drives control: "feels like" when it is in use and
   *  readable, otherwise the room reading. */
  temperature: number;
  /** Whether `temperature` is "feels like". */
  feelsLike: boolean;
  /** The band in force (NaN when it can't be read). */
  band: Band;
  overrideActive: boolean;
  /** When the override ends, in ms, or null. */
  overrideEnds: number | null;
  /** Whether a schedule sets the zone's band; null when the integration doesn't say. */
  scheduled: boolean | null;
  /** When the schedule next changes the band, in ms, or null. */
  nextChange: number | null;
  sensor: SensorState;
  /** The stand-in driving control (`climate` or `fallback_sensor`), or null. */
  standIn: string | null;
}

function stateOf(hass: HomeAssistant, entityId: string | null) {
  return entityId !== null ? hass.states[entityId] : undefined;
}

function numericState(hass: HomeAssistant, entityId: string | null): number {
  const s = stateOf(hass, entityId);
  if (!s) return NaN;
  const n = parseFloat(s.state);
  return Number.isFinite(n) ? n : NaN;
}

/** From `sensor.{zone}_next_band_change` (v0.23.0+): whether a schedule sets
 *  the zone's band (null on integrations that don't say), and when it next
 *  changes. */
export function readSchedule(
  hass: HomeAssistant,
  entities: ZoneEntities,
): { scheduled: boolean | null; nextChange: number | null } {
  const s = stateOf(hass, entities.nextBandChange);
  if (!s) return { scheduled: null, nextChange: null };
  const scheduled = s.attributes.scheduled;
  const next = Date.parse(s.state);
  return {
    scheduled: typeof scheduled === 'boolean' ? scheduled : null,
    nextChange: Number.isNaN(next) ? null : next,
  };
}

export function readRoom(hass: HomeAssistant, entities: ZoneEntities): RoomReadings {
  const room = numericState(hass, entities.roomTemperature);
  const apparent = numericState(hass, entities.apparentTemperature);
  const useApparent = stateOf(hass, entities.useApparentTemperature)?.state === 'on';
  const ends = Date.parse(stateOf(hass, entities.overrideEnds)?.state ?? '');
  // The room temperature entity mirrors whichever reading drives control,
  // a stand-in's included, so a reading there with the sensor offline is a
  // stand-in's. "Feels like" is worked out from that reading, so it counts
  // too, in case the room temperature entity is disabled.
  const offline = stateOf(hass, entities.roomSensorUnavailable)?.state === 'on';
  const reading = Number.isFinite(room) || Number.isFinite(apparent);
  const source = stateOf(hass, entities.roomTemperature)?.attributes.source;
  return {
    enabled: stateOf(hass, entities.enabled)?.state !== 'off',
    action: stateOf(hass, entities.currentAction)?.state ?? 'unknown',
    room,
    apparent,
    useApparent,
    temperature: headlineTemperature({ room, apparent, useApparent }).value,
    feelsLike: useApparent && Number.isFinite(apparent),
    band: {
      low: numericState(hass, entities.effectiveLow),
      high: numericState(hass, entities.effectiveHigh),
    },
    overrideActive: stateOf(hass, entities.overrideActive)?.state === 'on',
    overrideEnds: Number.isNaN(ends) ? null : ends,
    ...readSchedule(hass, entities),
    sensor: offline ? (reading ? 'stand-in' : 'offline') : reading ? 'ok' : 'no-reading',
    standIn: source === 'climate' || source === 'fallback_sensor' ? source : null,
  };
}

/** Whether the room is being controlled from a reading, so its action means
 *  something: a paused zone still works out what it would do, but doesn't do it. */
export function controlling(r: RoomReadings): boolean {
  return r.enabled && (r.sensor === 'ok' || r.sensor === 'stand-in');
}

export const STATUS_ICONS: Record<StatusKind, string> = {
  adjusting: 'mdi:timer-sand',
  paused: 'mdi:pause-circle-outline',
  sensor: 'mdi:alert-circle-outline',
  heating: 'mdi:fire',
  cooling: 'mdi:snowflake',
  comfortable: 'mdi:check-circle-outline',
  below: 'mdi:thermometer-low',
  above: 'mdi:thermometer-high',
  idle: 'mdi:minus-circle-outline',
  none: 'mdi:thermometer',
};

export type Badge = 'paused' | 'sensor' | 'heating' | 'cooling' | 'below' | 'above' | 'adjusted';

export const BADGE_ICONS: Record<Badge, string> = {
  paused: STATUS_ICONS.paused,
  sensor: STATUS_ICONS.sensor,
  heating: STATUS_ICONS.heating,
  cooling: STATUS_ICONS.cooling,
  below: STATUS_ICONS.below,
  above: STATUS_ICONS.above,
  adjusted: 'mdi:timer-outline',
};

/**
 * The floorplan chip's icons, most urgent first: none for a comfortable room,
 * so anything unusual stands out. A paused room shows only that it's paused,
 * and a room on hold only its sensor trouble; otherwise sensor trouble, then
 * heating or cooling (or, when it's doing neither, which side of its range
 * it's on), then whether someone has adjusted it.
 */
export function roomBadges(r: RoomReadings): Badge[] {
  if (!r.enabled) return ['paused'];
  const badges: Badge[] = [];
  if (r.sensor !== 'ok') badges.push('sensor');
  if (!controlling(r)) return badges;
  if (r.action === 'heating' || r.action === 'cooling') {
    badges.push(r.action);
  } else {
    const position = rangePosition(r.temperature, r.band);
    if (position === 'below' || position === 'above') badges.push(position);
  }
  if (r.overrideActive) badges.push('adjusted');
  return badges;
}

/**
 * One sentence for the Now tab on what sensor trouble means and what to do,
 * or null when there is none. A paused zone isn't controlled either way, so
 * it only says the sensor needs looking at.
 */
export function sensorNotice(r: RoomReadings): string | null {
  const check = 'Check its battery or connection.';
  if (!r.enabled) {
    return r.sensor === 'stand-in' || r.sensor === 'offline'
      ? `The room sensor is offline. ${check}`
      : null;
  }
  switch (r.sensor) {
    case 'stand-in': {
      const what =
        r.standIn === 'climate'
          ? "the air conditioner's own sensor"
          : r.standIn === 'fallback_sensor'
            ? 'the backup sensor'
            : 'a stand-in reading';
      return `Using ${what} until the room sensor reports again. ${check}`;
    }
    // Not "until the sensor reports": a stand-in may take over first.
    case 'offline':
      return "Heating and cooling here won't be adjusted while there's no room temperature reading. Check the room sensor's battery or connection.";
    case 'no-reading':
      return "Heating and cooling here won't be adjusted while there's no room temperature reading.";
    default:
      return null;
  }
}
