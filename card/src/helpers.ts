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

import type { DeviceRegistryEntry, EntityRegistryEntry, HomeAssistant } from './types.js';

const DOMAIN = 'comfort_band';

/** Entity IDs for one zone's full set of platform entities. Any may be `null`
 *  if the integration hasn't created it yet (or the user has disabled it). */
export interface ZoneEntities {
  // Sensors
  effectiveLow: string | null;
  effectiveHigh: string | null;
  roomTemperature: string | null;
  overrideEnds: string | null;
  currentAction: string | null;
  // Binary sensor
  overrideActive: string | null;
  // Numbers
  manualLow: string | null;
  manualHigh: string | null;
  overrideHours: string | null;
  deadbandBelow: string | null;
  deadbandAbove: string | null;
  minCycleMinutes: string | null;
  // Button
  cancelOverride: string | null;
  // Switch
  enabled: string | null;
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
  override_ends: 'overrideEnds',
  current_action: 'currentAction',
  override_active: 'overrideActive',
  manual_low: 'manualLow',
  manual_high: 'manualHigh',
  override_hours: 'overrideHours',
  deadband_below: 'deadbandBelow',
  deadband_above: 'deadbandAbove',
  min_cycle_minutes: 'minCycleMinutes',
  cancel_override: 'cancelOverride',
  enabled: 'enabled',
};

function emptyZoneEntities(): ZoneEntities {
  return {
    effectiveLow: null,
    effectiveHigh: null,
    roomTemperature: null,
    overrideEnds: null,
    currentAction: null,
    overrideActive: null,
    manualLow: null,
    manualHigh: null,
    overrideHours: null,
    deadbandBelow: null,
    deadbandAbove: null,
    minCycleMinutes: null,
    cancelOverride: null,
    enabled: null,
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
