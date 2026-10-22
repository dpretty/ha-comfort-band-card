/**
 * Entity-registry resolution for a Comfort Band zone.
 *
 * The card never assumes entity-id patterns — the cutover left two
 * conventions in the wild (e.g. `*.gym_hvac_new_*` vs `*.{zone}_*` with
 * `_2` suffixes for collisions). Instead it resolves entities by:
 *
 *   1. Locating the zone's device via `(comfort_band, zone:{slug})` in the
 *      device registry (set in `entity.py:37`).
 *   2. Filtering the entity registry by that `device_id` and the
 *      `comfort_band` platform.
 *   3. Matching each entity's `translation_key` against the canonical
 *      key set in the integration (`_attr_translation_key = key` in
 *      every per-zone entity class).
 *
 * Note: HA's frontend `hass.entities` exposes a **lite** entity registry
 * payload that omits `unique_id`. `translation_key` IS in the lite payload
 * and is the matching field that works here.
 */

import type {
  ComfortBandCardConfig,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from './types.js';

const DOMAIN = 'comfort_band';

/** Entity IDs for one zone's full set of platform entities. Any may be `null`
 *  if the integration hasn't created it yet (or the user has disabled it). */
export interface ZoneEntities {
  // Sensors
  effectiveLow: string | null;
  effectiveHigh: string | null;
  roomTemperature: string | null;
  overrideEnds: string | null;
  /** v0.23.0+: when the schedule next changes the band; absent on older integrations. */
  nextBandChange: string | null;
  currentAction: string | null;
  // Binary sensors
  overrideActive: string | null;
  /** v0.16.0+: on while the zone's configured room sensor isn't reporting. */
  roomSensorUnavailable: string | null;
  // Numbers
  manualLow: string | null;
  manualHigh: string | null;
  overrideHours: string | null;
  deadbandBelow: string | null;
  deadbandAbove: string | null;
  minCycleMinutes: string | null;
  // Button
  cancelOverride: string | null;
  // Switches
  enabled: string | null;
  learningEnabled: string | null;
  useApparentTemperature: string | null;
  // Additional sensor (v0.4+)
  apparentTemperature: string | null;
  // Settings shown in the Advanced tab (optional: fixtures and older
  // integrations may not have them).
  crossModeMinMinutes?: string | null;
  lookaheadMinutes?: string | null;
  passiveTolerance?: string | null;
  mpcHorizonMinutes?: string | null;
  bandRampMinutes?: string | null;
  peakHeatOffset?: string | null;
  peakCoolOffset?: string | null;
  peakPreconditionMinutes?: string | null;
  mpcEnabled?: string | null;
  fanControlEnabled?: string | null;
  peakSavingEnabled?: string | null;
  activeFanMode?: string | null;
  idleFanMode?: string | null;
  scheduleAssignment?: string | null;
  // Device meta (null if device not found)
  deviceId: string | null;
  deviceName: string | null;
}

/** Map from `translation_key` to the `ZoneEntities` field that holds the
 *  resolved `entity_id`. Mirrors `_attr_translation_key = key` in entity.py. */
const KEY_TO_FIELD: Record<string, keyof ZoneEntities> = {
  effective_low: 'effectiveLow',
  effective_high: 'effectiveHigh',
  room_temperature: 'roomTemperature',
  apparent_temperature: 'apparentTemperature',
  override_ends: 'overrideEnds',
  next_band_change: 'nextBandChange',
  current_action: 'currentAction',
  override_active: 'overrideActive',
  room_sensor_unavailable: 'roomSensorUnavailable',
  manual_low: 'manualLow',
  manual_high: 'manualHigh',
  override_hours: 'overrideHours',
  deadband_below: 'deadbandBelow',
  deadband_above: 'deadbandAbove',
  min_cycle_minutes: 'minCycleMinutes',
  cancel_override: 'cancelOverride',
  enabled: 'enabled',
  learning_enabled: 'learningEnabled',
  use_apparent_temperature: 'useApparentTemperature',
  cross_mode_min_minutes: 'crossModeMinMinutes',
  lookahead_minutes: 'lookaheadMinutes',
  passive_tolerance: 'passiveTolerance',
  mpc_horizon_minutes: 'mpcHorizonMinutes',
  band_ramp_minutes: 'bandRampMinutes',
  peak_heat_offset: 'peakHeatOffset',
  peak_cool_offset: 'peakCoolOffset',
  peak_precondition_minutes: 'peakPreconditionMinutes',
  mpc_enabled: 'mpcEnabled',
  fan_control_enabled: 'fanControlEnabled',
  peak_saving_enabled: 'peakSavingEnabled',
  active_fan_mode: 'activeFanMode',
  idle_fan_mode: 'idleFanMode',
  schedule_assignment: 'scheduleAssignment',
};

function emptyZoneEntities(): ZoneEntities {
  return {
    effectiveLow: null,
    effectiveHigh: null,
    roomTemperature: null,
    apparentTemperature: null,
    overrideEnds: null,
    nextBandChange: null,
    currentAction: null,
    overrideActive: null,
    roomSensorUnavailable: null,
    manualLow: null,
    manualHigh: null,
    overrideHours: null,
    deadbandBelow: null,
    deadbandAbove: null,
    minCycleMinutes: null,
    cancelOverride: null,
    enabled: null,
    learningEnabled: null,
    useApparentTemperature: null,
    crossModeMinMinutes: null,
    lookaheadMinutes: null,
    passiveTolerance: null,
    mpcHorizonMinutes: null,
    bandRampMinutes: null,
    peakHeatOffset: null,
    peakCoolOffset: null,
    peakPreconditionMinutes: null,
    mpcEnabled: null,
    fanControlEnabled: null,
    peakSavingEnabled: null,
    activeFanMode: null,
    idleFanMode: null,
    scheduleAssignment: null,
    deviceId: null,
    deviceName: null,
  };
}

function findDeviceByIdentifier(
  hass: HomeAssistant,
  identifier: [string, string],
): DeviceRegistryEntry | null {
  for (const device of Object.values(hass.devices)) {
    for (const [domain, key] of device.identifiers) {
      if (domain === identifier[0] && key === identifier[1]) {
        return device;
      }
    }
  }
  return null;
}

function entitiesForDevice(hass: HomeAssistant, deviceId: string): EntityRegistryEntry[] {
  return Object.values(hass.entities).filter(
    (entry) => entry.device_id === deviceId && entry.platform === DOMAIN,
  );
}

/**
 * Resolve every entity for the given zone. Missing entities stay `null`.
 *
 * Returns `null` for `deviceId`/`deviceName` if the zone device is not
 * registered yet (e.g. the integration hasn't been added for that zone).
 */
export function findZoneEntities(hass: HomeAssistant, zoneSlug: string): ZoneEntities {
  const result = emptyZoneEntities();
  const device = findDeviceByIdentifier(hass, [DOMAIN, `zone:${zoneSlug}`]);
  if (device === null) return result;

  result.deviceId = device.id;
  result.deviceName = device.name_by_user ?? device.name;

  for (const entry of entitiesForDevice(hass, device.id)) {
    const key = entry.translation_key;
    if (key === null) continue;
    const field = KEY_TO_FIELD[key];
    if (field !== undefined) {
      // Cast: every key in `KEY_TO_FIELD` maps to a string-typed field.
      (result as unknown as Record<string, string | null>)[field] = entry.entity_id;
    }
  }
  return result;
}

/** Whether a Comfort Band profile manager is registered, whether or not its
 *  entities can be read: a disabled entity drops out of `hass.entities`, but
 *  its device stays in `hass.devices`. */
export function profileManagerExists(hass: HomeAssistant): boolean {
  return findDeviceByIdentifier(hass, [DOMAIN, 'profile_manager']) !== null;
}

/**
 * Whether the active-profile select's state is one to act on. Missing means
 * not loaded or disabled. "unavailable" is what HA writes for an entry that
 * failed to load or is reloading, with only the last `options`; a live
 * select (v0.3.0+) always carries `default_profile`, so a profile that's
 * actually named "unavailable" still reads.
 */
export function profileSelectReadable(state: HassEntity | undefined): boolean {
  if (!state) return false;
  return !(state.state === 'unavailable' && state.attributes.default_profile === undefined);
}

/** Resolve the singleton `select.{...}_active_profile` entity_id, if registered. */
export function findActiveProfileEntity(hass: HomeAssistant): string | null {
  const device = findDeviceByIdentifier(hass, [DOMAIN, 'profile_manager']);
  if (device === null) return null;
  for (const entry of entitiesForDevice(hass, device.id)) {
    if (entry.translation_key === 'active_profile') {
      return entry.entity_id;
    }
  }
  return null;
}

/**
 * Read the configured humidity sensor entity_id for a zone, which the
 * backend (`RoomTemperatureSensor.extra_state_attributes`) exposes as a
 * `humidity_sensor` attribute on the room-temperature sensor's state.
 * Returns `null` when the room entity is missing, the state hasn't been
 * pushed yet, or no humidity sensor has been configured.
 *
 * Centralised so the cast and attribute key live in one place — both
 * the Advanced tab's Comfort and History sections need this lookup.
 */
export function readHumiditySensor(
  hass: HomeAssistant | undefined,
  roomEntityId: string | null | undefined,
): string | null {
  if (!hass || !roomEntityId) return null;
  const attr = hass.states[roomEntityId]?.attributes.humidity_sensor as string | null | undefined;
  return attr ?? null;
}

/**
 * The name to show for a zone, in order: the card's own `name`, the area the
 * zone's device is in, the device's name, the zone slug.
 *
 * The area comes first because it names the room, which is how people think
 * about the house; the device name is usually the equipment ("Bedroom HVAC").
 */
export function zoneDisplayName(
  hass: HomeAssistant,
  config: Pick<ComfortBandCardConfig, 'zone' | 'name'>,
  entities: Pick<ZoneEntities, 'deviceId' | 'deviceName'>,
): string {
  const configured = config.name?.trim();
  if (configured) return configured;
  const areaId = entities.deviceId !== null ? hass.devices[entities.deviceId]?.area_id : null;
  const area = areaId ? hass.areas?.[areaId]?.name?.trim() : undefined;
  if (area) return area;
  return entities.deviceName ?? config.zone;
}
