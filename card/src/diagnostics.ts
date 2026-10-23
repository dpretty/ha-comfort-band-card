/**
 * What the Advanced tab says about what the integration is doing, read from
 * its entities: who decides heating and cooling now, what learning has
 * learned, whether predictive control is ready, where the room's reading
 * comes from, and what peak saving is up to. State in, words out.
 *
 * Each reading mirrors the integration's own code: the coordinator's choice
 * of controller, and the `thermal_slope`, `mpc_ready`, `predicted_action`,
 * `mpc_action`, `room_temperature` and `peak_saving` entities. Where an input
 * can't be read, it says it can't tell rather than guess. An entity that's
 * missing counts as a feature the integration doesn't have only where none
 * of the entities that came with it is there either; otherwise it's turned
 * off, and can't be read.
 */

import type { ZoneEntities } from './helpers.js';
import type { HassEntity, HomeAssistant } from './types.js';
import { degrees, formatTime } from './now-status.js';

export type Controller = 'basic' | 'learning' | 'predictive';
/** The integration's actions (`ACTION_*` in its `const.py`). */
export type Action = 'heating' | 'cooling' | 'idle' | 'unknown';

export const CONTROLLER_NAMES: Record<Controller, string> = {
  basic: 'Basic control',
  learning: 'Learning',
  predictive: 'Predictive control',
};

export const ACTION_WORDS: Record<Action, string> = {
  heating: 'Heat',
  cooling: 'Cool',
  idle: 'Stay idle',
  unknown: 'Nothing',
};

function entity(
  hass: HomeAssistant,
  entities: ZoneEntities,
  field: keyof ZoneEntities,
): HassEntity | undefined {
  const id = entities[field];
  return typeof id === 'string' ? hass.states[id] : undefined;
}

/** A switch as on, off, missing (the integration has no such switch, or it's
 *  turned off) or unknown (there, but HA can't read it). */
function switchState(
  hass: HomeAssistant,
  entities: ZoneEntities,
  field: keyof ZoneEntities,
): 'on' | 'off' | 'missing' | 'unknown' {
  if (typeof entities[field] !== 'string') return 'missing';
  const state = entity(hass, entities, field)?.state;
  return state === 'on' || state === 'off' ? state : 'unknown';
}

function action(state: string | undefined): Action | null {
  return state === 'heating' || state === 'cooling' || state === 'idle' || state === 'unknown'
    ? state
    : null;
}

/** Whether the integration has any of the entities that came with a
 *  feature: then a missing one of them is turned off, not absent. */
function hasAny(entities: ZoneEntities, fields: Array<keyof ZoneEntities>): boolean {
  return fields.some((f) => typeof entities[f] === 'string');
}

/** The entities each release brought, to tell a turned-off entity from one
 *  the integration doesn't have. */
const SINCE_V0_4: Array<keyof ZoneEntities> = ['learningEnabled', 'useApparentTemperature'];
const SINCE_V0_6: Array<keyof ZoneEntities> = [
  'predictedAction',
  'thermalSlope',
  'lookaheadMinutes',
];
const SINCE_V0_8: Array<keyof ZoneEntities> = [
  'mpcEnabled',
  'mpcReady',
  'mpcAction',
  'mpcHorizonMinutes',
];
const SINCE_V0_24: Array<keyof ZoneEntities> = [
  'peakSaving',
  'peakSavingEnabled',
  'peakHeatOffset',
  'peakCoolOffset',
  'peakPreconditionMinutes',
];

/** Where the room's reading comes from (`room_temperature`'s `source`,
 *  integration v0.18.0+). Before then there was no stand-in: "primary". */
export function roomSource(
  hass: HomeAssistant,
  entities: ZoneEntities,
): 'primary' | 'fallback_sensor' | 'climate' | 'none' | null {
  const room = entity(hass, entities, 'roomTemperature');
  if (!room) return null;
  const source = room.attributes.source;
  if (source === 'primary' || source === 'fallback_sensor' || source === 'climate') return source;
  if (source === 'none') return 'none';
  if (source === undefined && room.state !== 'unavailable') {
    return Number.isFinite(Number.parseFloat(room.state)) ? 'primary' : 'none';
  }
  return null;
}

/** Whether a peak is relaxing the range now (`peak_saving` reads "active"),
 *  or null where that can't be told. */
function peakRelaxing(hass: HomeAssistant, entities: ZoneEntities): boolean | null {
  const peak = entity(hass, entities, 'peakSaving');
  const PEAK_STATES = ['off', 'no_signal', 'waiting', 'preconditioning', 'active', 'override'];
  if (peak && PEAK_STATES.includes(peak.state)) return peak.state === 'active';
  // Without its status: no peak saving at all before integration v0.24.0, and
  // none while it's switched off.
  if (switchState(hass, entities, 'peakSavingEnabled') === 'off') return false;
  return hasAny(entities, SINCE_V0_24) ? null : false;
}

export interface Deciding {
  /** "Control this room" is off: nothing is sent, but it still decides.
   *  Null where that switch can't be read. */
  paused: boolean | null;
  /** No reading from the room's sensor or a stand-in: nothing is decided. */
  noReading: boolean;
  /** Who decides now, or null where it can't be told. */
  controller: Controller | null;
  /** Why it's that one, where there's more to say. */
  reason: 'stand-in' | 'peak' | 'learning-off' | 'no-learning' | 'not-ready' | null;
  /** What it decided (`current_action`). */
  decision: Action | null;
  /** What learning would do now (`predicted_action`). */
  learning: Action | null;
  /** What predictive control would do now (`mpc_action`); "not-ready" while
   *  it isn't, when that sensor repeats learning's. */
  predictive: Action | 'not-ready' | null;
}

/**
 * Who decides now, as the integration's coordinator chooses: basic control
 * on a stand-in reading or while a peak relaxes the range; otherwise
 * predictive control when Learning and Predictive control are both on and
 * it's ready; otherwise Learning when it's on; otherwise basic control.
 */
export function readDeciding(hass: HomeAssistant, entities: ZoneEntities): Deciding {
  const source = roomSource(hass, entities);
  const ready = switchState(hass, entities, 'mpcReady');
  const enabled = switchState(hass, entities, 'enabled');
  const result: Deciding = {
    paused: enabled === 'on' ? false : enabled === 'off' ? true : null,
    noReading: source === 'none',
    controller: null,
    reason: null,
    decision: action(entity(hass, entities, 'currentAction')?.state),
    learning: action(entity(hass, entities, 'predictedAction')?.state),
    predictive: ready === 'off' ? 'not-ready' : action(entity(hass, entities, 'mpcAction')?.state),
  };
  // Where the reading comes from can't be told: a stand-in may be in use.
  if (source === null) return result;
  if (source === 'fallback_sensor' || source === 'climate') {
    return { ...result, controller: 'basic', reason: 'stand-in' };
  }
  const relaxing = peakRelaxing(hass, entities);
  if (relaxing === null) return result;
  if (relaxing) return { ...result, controller: 'basic', reason: 'peak' };
  const learning = switchState(hass, entities, 'learningEnabled');
  if (learning === 'unknown') return result;
  if (learning === 'missing') {
    return hasAny(entities, SINCE_V0_4)
      ? result
      : { ...result, controller: 'basic', reason: 'no-learning' };
  }
  if (learning === 'off') return { ...result, controller: 'basic', reason: 'learning-off' };
  // Learning's switch came before learning did (v0.4.0, v0.6.0).
  if (!hasAny(entities, SINCE_V0_6)) return result;
  const mpc = switchState(hass, entities, 'mpcEnabled');
  if (mpc === 'unknown') return result;
  if (mpc === 'missing') {
    return hasAny(entities, SINCE_V0_8) ? result : { ...result, controller: 'learning' };
  }
  if (mpc === 'off') return { ...result, controller: 'learning' };
  if (ready === 'on') return { ...result, controller: 'predictive' };
  if (ready === 'off') return { ...result, controller: 'learning', reason: 'not-ready' };
  return result;
}

/** The Diagnostics section's one-line summary. */
export function decidingSummary(d: Deciding): string {
  if (d.paused === true) return 'Paused';
  if (d.noReading) return 'On hold';
  return d.controller ? `${CONTROLLER_NAMES[d.controller]} deciding` : '';
}

/** One learned rate, in words, and where it came from. */
export interface Rate {
  /** "Warms about 0.4° an hour", or "Not learned yet". */
  value: string;
  /** Where it came from. */
  source: string;
  /** Whether there's a rate at all. */
  known: boolean;
}

/** The learned rates' raw numbers, as the integration reports them. */
export interface RateDetail {
  name: string;
  perHour: number | null;
  samples: number | null;
  spread: number | null;
  method: string | null;
}

export interface Rates {
  idle: Rate;
  heat: Rate;
  cool: Rate;
  details: RateDetail[];
  /** The span of readings learning keeps, in minutes, and how many. */
  windowMinutes: number | null;
  sampleCount: number | null;
  /** When the rates were last worked out (ms), or null. */
  updated: number | null;
}

function num(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/** "about 0.4°", or "under 0.1°" for a rate the one decimal shown would
 *  round to nothing. */
function amount(perHour: number): string {
  const size = Math.abs(perHour);
  return size < 0.1 ? 'under 0.1°' : `about ${degrees(size)}°`;
}

/** "35 minutes", "about 2 hours". */
function age(minutes: number): string {
  if (minutes < 90) {
    const m = Math.max(1, Math.round(minutes));
    return `${m} minute${m === 1 ? '' : 's'}`;
  }
  return `about ${Math.round(minutes / 60)} hours`;
}

function recoveryRate(kind: 'heat' | 'cool', perHour: number | null, method: unknown): Rate {
  const run = kind === 'heat' ? 'heating' : 'cooling';
  if (method === 'rejected') {
    return {
      value: 'Not known',
      source: `The latest ${run} run’s readings didn’t show the room ${kind === 'heat' ? 'warming' : 'cooling'}, so they were set aside.`,
      known: false,
    };
  }
  if (perHour === null) {
    return {
      value: 'Not learned yet',
      source: `Not enough recent ${run} to learn from.`,
      known: false,
    };
  }
  const verb = kind === 'heat' ? 'Warms it' : 'Cools it';
  return {
    value: `${verb} ${amount(perHour)} an hour`,
    source:
      method === 'previous'
        ? `From an earlier ${run} run, as the latest is too short to tell.`
        : `From the latest ${run} run.`,
    known: true,
  };
}

/** What learning has learned (`thermal_slope`'s attributes, integration
 *  v0.6.0+): null without that sensor, "unavailable" while it can't be
 *  read. */
export function readRates(
  hass: HomeAssistant,
  entities: ZoneEntities,
): Rates | 'unavailable' | null {
  if (typeof entities.thermalSlope !== 'string') return null;
  const slope = entity(hass, entities, 'thermalSlope');
  if (!slope || slope.state === 'unavailable') return 'unavailable';
  const a = slope.attributes;
  const idlePerHour = num(a.idle_slope);
  const cachedAge = num(a.idle_slope_cached_age_min);
  let idle: Rate;
  if (idlePerHour === null) {
    idle = {
      value: 'Not learned yet',
      source: 'Not enough recent readings while idle to learn from.',
      known: false,
    };
  } else {
    idle = {
      value:
        Math.abs(idlePerHour) < 0.05
          ? 'Holds steady'
          : `${idlePerHour > 0 ? 'Warms' : 'Cools'} ${amount(idlePerHour)} an hour`,
      source:
        a.idle_slope_source === 'cached'
          ? `From earlier readings${cachedAge !== null ? `, ${age(cachedAge)} old` : ''}.`
          : 'From the latest readings while idle.',
      known: true,
    };
  }
  const heatPerHour = num(a.recovery_slope_heat);
  const coolPerHour = num(a.recovery_slope_cool);
  const updated = typeof a.last_updated === 'string' ? Date.parse(a.last_updated) : NaN;
  return {
    idle,
    heat: recoveryRate('heat', heatPerHour, a.method_recovery_heat),
    cool: recoveryRate('cool', coolPerHour, a.method_recovery_cool),
    details: [
      {
        name: 'On its own',
        perHour: idlePerHour,
        samples: num(a.sample_count_idle),
        spread: num(a.std_dev_idle),
        method: typeof a.method_idle === 'string' ? a.method_idle : null,
      },
      {
        name: 'Heating',
        perHour: heatPerHour,
        samples: num(a.sample_count_recovery_heat),
        spread: num(a.std_dev_recovery_heat),
        method: typeof a.method_recovery_heat === 'string' ? a.method_recovery_heat : null,
      },
      {
        name: 'Cooling',
        perHour: coolPerHour,
        samples: num(a.sample_count_recovery_cool),
        spread: num(a.std_dev_recovery_cool),
        method: typeof a.method_recovery_cool === 'string' ? a.method_recovery_cool : null,
      },
    ],
    windowMinutes: num(a.window_minutes),
    sampleCount: num(a.sample_count),
    updated: Number.isFinite(updated) ? updated : null,
  };
}

/** A status row: a title, a short value, and a line of explanation. */
export interface StatusRow {
  title: string;
  value: string;
  desc: string;
}

/**
 * Whether predictive control has what it needs to plan (`mpc_ready`,
 * integration v0.8.0+): a rate for how the room drifts on its own, and one
 * for heating or cooling. Null without that sensor.
 */
export function readReadiness(hass: HomeAssistant, entities: ZoneEntities): StatusRow | null {
  const ready = switchState(hass, entities, 'mpcReady');
  if (ready === 'missing') return null;
  const title = 'Ready to plan';
  if (ready === 'unknown') {
    return { title, value: 'Can’t tell', desc: 'Its readiness can’t be read right now.' };
  }
  if (ready === 'on') {
    return {
      title,
      value: 'Yes',
      desc: 'It has learned how this room drifts on its own and how fast heating or cooling moves it.',
    };
  }
  const read = readRates(hass, entities);
  const rates = read === 'unavailable' ? null : read;
  const missing: string[] = [];
  if (rates && !rates.idle.known) missing.push('how this room drifts on its own');
  if (rates && !rates.heat.known && !rates.cool.known) {
    missing.push('how fast heating or cooling moves it');
  }
  return {
    title,
    value: 'Not yet',
    desc: missing.length
      ? `Still to learn: ${missing.join(', and ')}.`
      : 'It’s still learning how this room warms and cools.',
  };
}

function friendlyName(hass: HomeAssistant, entityId: unknown): string | null {
  if (typeof entityId !== 'string' || !entityId) return null;
  const name = hass.states[entityId]?.attributes.friendly_name;
  return typeof name === 'string' && name ? name : entityId;
}

const CONFIGURE = 'Set under Settings → Devices & Services → Comfort Band → Configure.';

/**
 * Where the room's reading comes from: its own sensor, a stand-in while that
 * sensor is offline, or nothing. Null before integration v0.18.0, which had
 * no stand-ins and didn't say.
 */
export function readRoomSource(hass: HomeAssistant, entities: ZoneEntities): StatusRow | null {
  const room = entity(hass, entities, 'roomTemperature');
  if (!room) return null;
  const title = 'Room reading';
  const standIn = friendlyName(hass, room.attributes.fallback_temp_sensor);
  const climate = room.attributes.fallback_to_climate === true;
  const backups = [standIn, climate ? 'the unit’s own reading' : null].filter(Boolean);
  // The coordinator tries the stand-ins only once its own sensor has been
  // offline for FALLBACK_GRACE_S (5 minutes).
  const standsIn = `${backups[0]} stands in if it has a reading${
    backups.length > 1 ? `, otherwise ${backups[1]} if it has one` : ''
  }`;
  switch (room.attributes.source) {
    case 'primary':
      return {
        title,
        value: 'Its own sensor',
        desc: backups.length
          ? `If that goes offline for 5 minutes, ${standsIn}. ${CONFIGURE}`
          : `If that goes offline, control is on hold until it’s back. ${CONFIGURE}`,
      };
    case 'fallback_sensor':
      return {
        title,
        value: `Stand-in: ${standIn ?? 'the stand-in sensor'}`,
        desc: 'Its own sensor is offline. Basic control decides until it’s back.',
      };
    case 'climate':
      return {
        title,
        value: 'Stand-in: the unit’s own reading',
        desc: 'Its own sensor is offline. Basic control decides until it’s back.',
      };
    case 'none':
      return {
        title,
        value: 'None right now',
        desc: backups.length
          ? `Its own sensor has no reading, so control is on hold. Once it has been offline for 5 minutes, ${standsIn}.`
          : 'Its own sensor has no reading and no stand-in is set up, so control is on hold.',
      };
    default:
      return null;
  }
}

/** "5 pm" today, "tomorrow 5 pm", "Mon 5 pm", "21 Oct, 5 pm": when, in HA's
 *  language and 12/24-hour setting. */
export function formatWhen(ms: number, now: number, hass?: Pick<HomeAssistant, 'locale'>): string {
  const time = formatTime(ms, hass);
  const day = (t: number) => {
    const d = new Date(t);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  };
  const days = Math.round((day(ms) - day(now)) / 86_400_000);
  if (days === 0) return time;
  if (days === 1) return `tomorrow ${time}`;
  if (days === -1) return `yesterday ${time}`;
  // The words around the time are English, as the card's are; HA's own
  // language only where it's an English one, for its date order.
  const own = hass?.locale?.language;
  const language = own?.startsWith('en') ? own : 'en';
  if (Math.abs(days) < 7) {
    return `${new Intl.DateTimeFormat(language, { weekday: 'short' }).format(ms)} ${time}`;
  }
  const sameYear = new Date(ms).getFullYear() === new Date(now).getFullYear();
  const date = new Intl.DateTimeFormat(language, {
    day: 'numeric',
    month: 'short',
    ...(sameYear ? {} : { year: 'numeric' }),
  }).format(ms);
  return `${date}, ${time}`;
}

function when(value: unknown, now: number, hass: HomeAssistant): string | null {
  const ms = typeof value === 'string' ? Date.parse(value) : NaN;
  return Number.isFinite(ms) ? formatWhen(ms, now, hass) : null;
}

/** "the bottom down 1°, the top up 1°": how far peak saving has moved each
 *  edge of the range, from its signed adjustments. */
function moved(low: number | null, high: number | null): string {
  const parts: string[] = [];
  if (low !== null && Math.abs(low) >= 0.05) {
    parts.push(`the bottom ${low < 0 ? 'down' : 'up'} ${degrees(Math.abs(low))}°`);
  }
  if (high !== null && Math.abs(high) >= 0.05) {
    parts.push(`the top ${high > 0 ? 'up' : 'down'} ${degrees(Math.abs(high))}°`);
  }
  return parts.join(', ');
}

/** What peak saving is doing now (`peak_saving`, integration v0.24.0+), or
 *  null without that sensor. */
export function readPeak(
  hass: HomeAssistant,
  entities: ZoneEntities,
  now: number,
): StatusRow | null {
  const peak = entity(hass, entities, 'peakSaving');
  if (!peak) return null;
  const a = peak.attributes;
  const title = 'Right now';
  const shift = moved(num(a.low_adjustment), num(a.high_adjustment));
  switch (peak.state) {
    case 'off':
      return a.peak_entity
        ? { title, value: 'Off', desc: 'Peak saving is switched off.' }
        : {
            title,
            value: 'Off',
            desc: 'No peak entity is chosen. Choose one under Settings → Devices & Services → Comfort Band → Configure.',
          };
    case 'no_signal':
      return {
        title,
        value: 'No peak signal',
        desc: 'The peak entity can’t be read, so it counts as no peak.',
      };
    case 'waiting': {
      const next = when(a.next_start, now, hass);
      return {
        title,
        value: 'No peak now',
        desc: next ? `The next one is announced for ${next}.` : 'None is announced yet.',
      };
    }
    case 'preconditioning': {
      const start = when(a.next_start, now, hass);
      const warming = a.precondition === 'heating';
      return {
        title,
        value: warming ? 'Warming ahead' : 'Cooling ahead',
        desc: `Getting the room ready for the peak${start ? ` at ${start}` : ''}${shift ? `: ${shift}` : ''}.`,
      };
    }
    case 'active': {
      const ends = when(a.ends, now, hass);
      return {
        title,
        value: 'Peak on',
        desc: [
          ends ? `Until ${ends}.` : '',
          shift ? `The range is relaxed: ${shift}.` : '',
          'Basic control decides meanwhile.',
        ]
          .filter(Boolean)
          .join(' '),
      };
    }
    case 'override':
      return {
        title,
        value: 'Standing aside',
        desc: 'An adjustment is in force, so peak saving stands aside.',
      };
    default:
      return { title, value: 'Can’t tell', desc: 'Its status can’t be read right now.' };
  }
}
