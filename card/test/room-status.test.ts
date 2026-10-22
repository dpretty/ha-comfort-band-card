import { describe, it, expect } from 'vitest';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import {
  type RoomReadings,
  controlling,
  readRoom,
  readSchedule,
  roomBadges,
  sensorNotice,
} from '../src/room-status.js';
import { stubConnection } from './_fixture.js';

const ENTITIES: ZoneEntities = {
  effectiveLow: 'sensor.gym_effective_low',
  effectiveHigh: 'sensor.gym_effective_high',
  roomTemperature: 'sensor.gym_room_temperature',
  apparentTemperature: 'sensor.gym_apparent_temperature',
  overrideEnds: 'sensor.gym_override_ends',
  nextBandChange: 'sensor.gym_next_band_change',
  currentAction: 'sensor.gym_current_action',
  overrideActive: 'binary_sensor.gym_override_active',
  roomSensorUnavailable: 'binary_sensor.gym_room_sensor_unavailable',
  manualLow: null,
  manualHigh: null,
  overrideHours: null,
  deadbandBelow: null,
  deadbandAbove: null,
  minCycleMinutes: null,
  cancelOverride: null,
  enabled: 'switch.gym_enabled',
  learningEnabled: null,
  useApparentTemperature: 'switch.gym_use_apparent_temperature',
  deviceId: 'dev-gym',
  deviceName: 'Gym',
};

function hassWith(
  states: Record<string, string>,
  attributes: Record<string, Record<string, unknown>> = {},
): HomeAssistant {
  return {
    states: Object.fromEntries(
      Object.entries(states).map(([k, v]) => [
        k,
        {
          entity_id: k,
          state: v,
          attributes: attributes[k] ?? {},
          last_changed: '',
          last_updated: '',
        },
      ]),
    ),
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: () => Promise.resolve(),
    callWS: () => Promise.resolve() as Promise<never>,
  };
}

const HEALTHY = {
  'sensor.gym_effective_low': '19.5',
  'sensor.gym_effective_high': '22.5',
  'sensor.gym_room_temperature': '21.0',
  'sensor.gym_apparent_temperature': '22.1',
  'sensor.gym_current_action': 'idle',
  'sensor.gym_override_ends': 'unknown',
  'binary_sensor.gym_override_active': 'off',
  'binary_sensor.gym_room_sensor_unavailable': 'off',
  'switch.gym_enabled': 'on',
  'switch.gym_use_apparent_temperature': 'off',
};

const read = (
  patch: Record<string, string> = {},
  attributes: Record<string, Record<string, unknown>> = {},
) => readRoom(hassWith({ ...HEALTHY, ...patch }, attributes), ENTITIES);

describe('readRoom', () => {
  it('reads a healthy room', () => {
    expect(read()).toEqual({
      enabled: true,
      action: 'idle',
      room: 21,
      apparent: 22.1,
      useApparent: false,
      temperature: 21,
      feelsLike: false,
      band: { low: 19.5, high: 22.5 },
      overrideActive: false,
      overrideEnds: null,
      scheduled: null,
      nextChange: null,
      sensor: 'ok',
      standIn: null,
    });
  });

  it('takes "feels like" as the temperature when it drives control', () => {
    const r = read({ 'switch.gym_use_apparent_temperature': 'on' });
    expect(r.temperature).toBe(22.1);
    expect(r.feelsLike).toBe(true);
  });

  it('falls back to the room reading when "feels like" can\'t be read', () => {
    const r = read({
      'switch.gym_use_apparent_temperature': 'on',
      'sensor.gym_apparent_temperature': 'unavailable',
    });
    expect(r.temperature).toBe(21);
    expect(r.feelsLike).toBe(false);
  });

  it('reads an adjustment and its end', () => {
    const r = read({
      'binary_sensor.gym_override_active': 'on',
      'sensor.gym_override_ends': '2026-10-22T06:30:00+00:00',
    });
    expect(r.overrideActive).toBe(true);
    expect(r.overrideEnds).toBe(Date.parse('2026-10-22T06:30:00Z'));
  });

  it('reads a paused zone', () => {
    expect(read({ 'switch.gym_enabled': 'off' }).enabled).toBe(false);
  });

  it('names the stand-in while the room sensor is offline and one has a reading', () => {
    const offline = { 'binary_sensor.gym_room_sensor_unavailable': 'on' };
    const climate = read(offline, { 'sensor.gym_room_temperature': { source: 'climate' } });
    expect([climate.sensor, climate.standIn]).toEqual(['stand-in', 'climate']);
    const backup = read(offline, { 'sensor.gym_room_temperature': { source: 'fallback_sensor' } });
    expect([backup.sensor, backup.standIn]).toEqual(['stand-in', 'fallback_sensor']);
    // A source this card doesn't know isn't named.
    const other = read(offline, { 'sensor.gym_room_temperature': { source: 'primary' } });
    expect([other.sensor, other.standIn]).toEqual(['stand-in', null]);
  });

  it('says the sensor is offline when nothing stands in', () => {
    const r = read({
      'binary_sensor.gym_room_sensor_unavailable': 'on',
      'sensor.gym_room_temperature': 'unknown',
    });
    expect(r.sensor).toBe('offline');
  });

  // An integration older than v0.16.0, or one starting up.
  it("says there's no reading when the integration doesn't say the sensor is offline", () => {
    expect(read({ 'sensor.gym_room_temperature': 'unavailable' }).sensor).toBe('no-reading');
    const older = readRoom(hassWith({ ...HEALTHY, 'sensor.gym_room_temperature': 'unknown' }), {
      ...ENTITIES,
      roomSensorUnavailable: null,
    });
    expect(older.sensor).toBe('no-reading');
    const fine = readRoom(hassWith(HEALTHY), { ...ENTITIES, roomSensorUnavailable: null });
    expect(fine.sensor).toBe('ok');
  });
});

describe('readSchedule', () => {
  it('reads whether a schedule sets the band, and when it next changes', () => {
    const hass = hassWith(
      { 'sensor.gym_next_band_change': '2026-10-22T06:00:00+00:00' },
      { 'sensor.gym_next_band_change': { scheduled: true } },
    );
    expect(readSchedule(hass, ENTITIES)).toEqual({
      scheduled: true,
      nextChange: Date.parse('2026-10-22T06:00:00Z'),
    });
  });

  it("says nothing on an integration that doesn't publish it, or while it's unavailable", () => {
    expect(readSchedule(hassWith({}), ENTITIES)).toEqual({ scheduled: null, nextChange: null });
    const hass = hassWith({ 'sensor.gym_next_band_change': 'unavailable' });
    expect(readSchedule(hass, ENTITIES)).toEqual({ scheduled: null, nextChange: null });
  });
});

describe('roomBadges', () => {
  const room = (patch: Partial<RoomReadings> = {}): RoomReadings => ({ ...read(), ...patch });

  it('shows nothing for a comfortable room', () => {
    expect(roomBadges(room())).toEqual([]);
  });

  it('shows heating or cooling', () => {
    expect(roomBadges(room({ action: 'heating' }))).toEqual(['heating']);
    expect(roomBadges(room({ action: 'cooling' }))).toEqual(['cooling']);
  });

  it('shows which side of its range an idle room is, in the tenths shown', () => {
    expect(roomBadges(room({ temperature: 19.4 }))).toEqual(['below']);
    expect(roomBadges(room({ temperature: 19.46 }))).toEqual([]);
    expect(roomBadges(room({ temperature: 22.6 }))).toEqual(['above']);
  });

  // What it's doing about it says more than which side it's on.
  it('shows only heating or cooling while the room is outside its range', () => {
    expect(roomBadges(room({ action: 'heating', temperature: 18 }))).toEqual(['heating']);
    expect(roomBadges(room({ action: 'cooling', temperature: 23.5 }))).toEqual(['cooling']);
  });

  it('shows an adjustment, after what the room is doing', () => {
    expect(roomBadges(room({ overrideActive: true }))).toEqual(['adjusted']);
    expect(roomBadges(room({ overrideActive: true, action: 'heating' }))).toEqual([
      'heating',
      'adjusted',
    ]);
  });

  it('shows only that a paused room is paused', () => {
    expect(
      roomBadges(
        room({ enabled: false, action: 'heating', overrideActive: true, sensor: 'offline' }),
      ),
    ).toEqual(['paused']);
  });

  it('puts sensor trouble first, and goes on while a stand-in drives control', () => {
    expect(
      roomBadges(room({ sensor: 'stand-in', action: 'cooling', overrideActive: true })),
    ).toEqual(['sensor', 'cooling', 'adjusted']);
    expect(roomBadges(room({ sensor: 'stand-in', temperature: 19 }))).toEqual(['sensor', 'below']);
  });

  it('shows only the sensor while control is on hold', () => {
    const onHold = { action: 'heating', overrideActive: true, temperature: NaN };
    expect(roomBadges(room({ ...onHold, sensor: 'offline' }))).toEqual(['sensor']);
    expect(roomBadges(room({ ...onHold, sensor: 'no-reading' }))).toEqual(['sensor']);
  });

  it("shows nothing for an action it doesn't know", () => {
    expect(roomBadges(room({ action: 'unknown' }))).toEqual([]);
  });
});

describe('controlling', () => {
  it('is true only for an enabled zone with a reading', () => {
    const r = read();
    expect(controlling(r)).toBe(true);
    expect(controlling({ ...r, sensor: 'stand-in' })).toBe(true);
    expect(controlling({ ...r, sensor: 'offline' })).toBe(false);
    expect(controlling({ ...r, sensor: 'no-reading' })).toBe(false);
    expect(controlling({ ...r, enabled: false })).toBe(false);
  });
});

describe('sensorNotice', () => {
  const room = (patch: Partial<RoomReadings>): RoomReadings => ({ ...read(), ...patch });

  it('says nothing while the room sensor reports', () => {
    expect(sensorNotice(room({}))).toBeNull();
    expect(sensorNotice(room({ enabled: false }))).toBeNull();
  });

  it('names the stand-in in use, and what to do', () => {
    expect(sensorNotice(room({ sensor: 'stand-in', standIn: 'climate' }))).toBe(
      "Using the air conditioner's own sensor until the room sensor reports again. Check its battery or connection.",
    );
    expect(sensorNotice(room({ sensor: 'stand-in', standIn: 'fallback_sensor' }))).toBe(
      'Using the backup sensor until the room sensor reports again. Check its battery or connection.',
    );
    expect(sensorNotice(room({ sensor: 'stand-in', standIn: null }))).toBe(
      'Using a stand-in reading until the room sensor reports again. Check its battery or connection.',
    );
  });

  it('says nothing will be adjusted while control is on hold', () => {
    expect(sensorNotice(room({ sensor: 'offline' }))).toBe(
      "Heating and cooling here won't be adjusted until the room sensor reports again. Check its battery or connection.",
    );
    expect(sensorNotice(room({ sensor: 'no-reading' }))).toBe(
      "Heating and cooling here won't be adjusted until there's a room temperature reading.",
    );
  });

  it('says only that the sensor needs looking at in a paused zone', () => {
    for (const sensor of ['stand-in', 'offline'] as const) {
      expect(sensorNotice(room({ enabled: false, sensor }))).toBe(
        'The room sensor is offline. Check its battery or connection.',
      );
    }
    expect(sensorNotice(room({ enabled: false, sensor: 'no-reading' }))).toBeNull();
  });
});
