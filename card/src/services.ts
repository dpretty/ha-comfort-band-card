/**
 * Typed wrappers around the eight `comfort_band.*` services.
 *
 * Mirrors `custom_components/comfort_band/services.yaml`. Each call returns
 * the promise from `hass.callService` so callers can `await` for the round-trip.
 */

import type { HomeAssistant, ProfileSchedule, Transition, UnsubscribeFunc } from './types.js';

const DOMAIN = 'comfort_band';

export function subscribeSchedule(
  hass: HomeAssistant,
  args: { zone: string; profile: string },
  callback: (schedule: ProfileSchedule | null) => void,
): Promise<UnsubscribeFunc> {
  return hass.connection.subscribeMessage<{ schedule: ProfileSchedule | null }>(
    (event) => callback(event.schedule),
    { type: 'comfort_band/subscribe_schedule', ...args },
  );
}

export function setSchedule(
  hass: HomeAssistant,
  args: { zone: string; profile: string; transitions: Transition[] },
): Promise<unknown> {
  return hass.callService(DOMAIN, 'set_schedule', { ...args });
}

export function addTransition(
  hass: HomeAssistant,
  args: { zone: string; profile: string; at: string; low: number; high: number },
): Promise<unknown> {
  return hass.callService(DOMAIN, 'add_transition', { ...args });
}

export function updateTransition(
  hass: HomeAssistant,
  args: { zone: string; profile: string; at: string; low: number; high: number },
): Promise<unknown> {
  return hass.callService(DOMAIN, 'update_transition', { ...args });
}

export function removeTransition(
  hass: HomeAssistant,
  args: { zone: string; profile: string; at: string },
): Promise<unknown> {
  return hass.callService(DOMAIN, 'remove_transition', { ...args });
}

export function startOverride(
  hass: HomeAssistant,
  args: { zone: string; low?: number; high?: number; hours?: number },
): Promise<unknown> {
  const data: Record<string, unknown> = { zone: args.zone };
  if (args.low !== undefined) data.low = args.low;
  if (args.high !== undefined) data.high = args.high;
  if (args.hours !== undefined) data.hours = args.hours;
  return hass.callService(DOMAIN, 'start_override', data);
}

export function cancelOverride(hass: HomeAssistant, args: { zone: string }): Promise<unknown> {
  return hass.callService(DOMAIN, 'cancel_override', { ...args });
}

export function setProfile(hass: HomeAssistant, args: { profile: string }): Promise<unknown> {
  return hass.callService(DOMAIN, 'set_profile', { ...args });
}

export function createProfile(
  hass: HomeAssistant,
  args: { name: string; description?: string },
): Promise<unknown> {
  const data: Record<string, unknown> = { name: args.name };
  if (args.description !== undefined) data.description = args.description;
  return hass.callService(DOMAIN, 'create_profile', data);
}

export function cloneProfile(
  hass: HomeAssistant,
  args: { source: string; target: string; description?: string },
): Promise<unknown> {
  const data: Record<string, unknown> = { source: args.source, target: args.target };
  if (args.description !== undefined) data.description = args.description;
  return hass.callService(DOMAIN, 'clone_profile', data);
}

export function renameProfile(
  hass: HomeAssistant,
  args: { old: string; new: string },
): Promise<unknown> {
  return hass.callService(DOMAIN, 'rename_profile', { old: args.old, new: args.new });
}

export function deleteProfile(hass: HomeAssistant, args: { name: string }): Promise<unknown> {
  return hass.callService(DOMAIN, 'delete_profile', { name: args.name });
}
