# Comfort Band Card

A Lovelace card for the [Comfort Band](https://github.com/dpretty/ha-comfort-band) Home Assistant integration.

Compact tile + expanded modal with **Now / Schedule / Advanced** tabs: Now and Schedule for the whole family, Advanced for whoever sets the house up. Replaces a dashboard full of sliders, input_numbers, and `browser_mod` popups with one element per zone.

> Requires the `comfort_band` integration ≥ **v0.1.0** for the tile, Now, Schedule and History, **≥ v0.3.0** for full profile management (create / clone / rename / delete), or **≥ v0.4.0** for the "feels like" and learning switches.

## What you get

- **Compact tile** — zone display name, the temperature that drives control (the room reading, or "feels like" when apparent temperature is in use, which the tile's name for screen readers says), an inline `[low … room … high]` band gauge coloured by `current_action` (red=heating, blue=cooling, neutral=idle or not controlling), and the Now tab's status line with its icon: what the room is doing (Comfortable, Heating, Cooling, or A bit cool / A bit warm when it's outside its range but neither), its range, and when that next changes or an adjustment ends ("Comfortable · 17.5–23° until 5 pm"; the times need integration ≥ **v0.23.0**, as on the Now tab). A paused zone says so, and so does one whose room sensor is offline (integration ≥ **v0.16.0**): "Room sensor offline · …" while a stand-in reading drives control (≥ **v0.18.0**), "On hold: the room sensor is offline" when nothing does. The Now tab adds a sentence on what that means and what to do.
- **Now tab** — the temperature that drives control, large (the room reading, or "feels like" when apparent temperature is in use), and one status line: what the room is doing, the range in force and when the schedule next changes it ("Comfortable · 17.5–23° until 9 pm"). Below it, **Adjust for** 1 h · 3 h (3 h until another is picked), then **Cooler** / **Warmer**: each tap moves the whole range half a degree (stopping at 10° and 35°, never pushing a range the other way), and taps made close together are sent as one `start_override` once they stop, for the length picked. Picking a length while a room is adjusted re-times the adjustment; **Back to schedule** ends it. While a change is going through, these controls ignore presses (they keep focus). The zone's `override_hours` applies only to overrides started elsewhere. Further down: the "How does it feel?" feedback buttons. The two-handled slider for an exact range is in Advanced › Comfort. The next-change time and the room-has-a-schedule check need integration ≥ **v0.23.0** (`sensor.{zone}_next_band_change`); on older versions the card leaves out "until" and offers "End adjustment" instead of "Back to schedule". In a room with no schedule an adjustment's range stays, so it offers no length and no way back to a schedule.
- **Schedule tab** — a chart of the comfortable range through the day (time across, 14–28 °C up), for reading only, and below it the list of changes: each a time of day, in HA's 12/24-hour setting, and the range it sets. **+ Add a change** and each row's **Edit** open a small form (time, lowest, highest); a row's **Delete** asks first, and the form's deletes at once. Saves with `comfort_band.set_schedule`; the live-update WS subscription keeps other open card instances in sync. Where profiles are set up (integration ≥ **v0.3.0**) it says whose schedule it shows ("Schedule: home", the active profile's name as typed); otherwise it doesn't mention profiles. A room can be following a different schedule from the one shown, such as the default profile's when the active profile has none for it, or a shared one; this tab doesn't show that.
- **Advanced tab** — folding sections, each a heading with a one-line summary of what's inside. Every per-zone setting the integration keeps as an entity is here (the sensors and the peak entity are chosen in HA's Configure dialog), each with a line on what it does: switches flip at once, numbers have − / + steppers (sent once you stop tapping), choices are drop-downs. What's shown stays until HA reports the change, and goes back, with HA's error, if the call is refused. A setting whose entity isn't there (an older integration, or the entity turned off) is left out, and the section says so; one HA can't read says "Unavailable" or "Unknown", or shows "—".
  - **Comfort** — **Use “feels like”** (heating and cooling go by the humidity-adjusted "feels like" temperature; falls back to the room's reading if the humidity sensor goes offline), how far below or above the range heating or cooling starts (the deadbands; learning can act early, and predictive control, while it plans, doesn't use them), how long to ease each schedule change over (band ramp), how long an adjustment made elsewhere lasts, the humidity sensor by its name and reading (change it via HA's Configure dialog), where the room's reading comes from (its own sensor, or a stand-in while that's offline; integration ≥ **v0.18.0**), and **Set an exact range**: the two-handled slider, which sets the range for 3 hours (until it's changed, in a room with no schedule).
  - **Automation** — **Control this room** (off: it works out what it would do but sends nothing, and the Now tab says it's paused), **Learning** (times heating and cooling from what the room has learned about how quickly it warms and cools: starting and stopping early, and holding off while it drifts back on its own), **Predictive control** (plans heating and cooling ahead; needs learning on, and plans only while it has recent enough readings) and whether it's ready to plan, with what it still has to learn (integration ≥ **v0.8.0**), and under **Fine-tuning** the look-ahead, drift tolerance, planning horizon, and the shortest times between repeated commands and between heating and cooling.
  - **Fan** — **Fan control** and the fan speeds while heating or cooling (peak saving can leave it as it is during a peak) and while idle (integration ≥ **v0.13.0**).
  - **Peak saving** — what it's doing right now (no peak, warming or cooling ahead of one, a peak on and how far it has relaxed the range, or standing aside for an adjustment), its switch (heating and cooling run less in a peak: the range widens, and the room can be warmed or cooled a little ahead of an announced one), how far a peak relaxes the bottom and top of the range, and how long ahead to prepare (integration ≥ **v0.24.0**; the peak entity is chosen in HA's Configure dialog).
  - **Schedules** — **Follows**: the room's own schedule or a shared one, its name as typed (integration ≥ **v0.14.0**; the Schedule tab still shows and changes the room's own). Then **Profiles**: list + switch active profile, plus full CRUD: tap **+ New profile** to create one, or use the per-row overflow menu (`⋮`) to Clone, Rename, or Delete. The active-fallback (`home` by default; tracks renames) is protected from deletion. Without a profile manager it says what profiles are and how to set one up. Requires integration ≥ **v0.3.0**.
  - **Diagnostics** — who decides heating and cooling now (basic control, Learning or Predictive control, and why) and what it decided, then what Learning and Predictive control would each do, to compare before turning one on; what learning has learned, in words (how the room drifts on its own, and how fast heating and cooling move it, each with where it came from), with the raw numbers under **Details** (integration ≥ **v0.6.0**); and the last 10 "How does it feel?" taps, newest first, with the reading and range at the time (integration ≥ **v0.11.0**). Loaded only while it's open.
  - **History** — one chart of the last 24 hours: the room temperature, the range's low and high edges (a smooth curve where the band ramps), and heating/cooling shading, with "feels like" overlaid (integration ≥ **v0.4.0**) and humidity on a second axis when a humidity sensor is set up. Where one can't be drawn, a hint says how to get it: upgrade the integration, or set up a humidity sensor in HA's Configure dialog. The chart loads only while the section is open.

Entity discovery is by device identifier (`(comfort_band, zone:{slug})`), so renamed entity_ids still work.

## Installation

### Via HACS (recommended)

1. **HACS → Frontend → ⋮ → Custom repositories** → URL `https://github.com/dpretty/ha-comfort-band-card`, category **Dashboard** → Add.
2. Click **Download** on the Comfort Band Card row. HACS adds the resource at `/hacsfiles/ha-comfort-band-card/comfort-band-card.js`.
3. Hard-refresh the browser (`Cmd-Shift-R` / `Ctrl-Shift-R`).

### Manual install

1. Download `comfort-band-card.js` from the [latest release](https://github.com/dpretty/ha-comfort-band-card/releases/latest).
2. Copy to `/config/www/comfort-band-card.js` on your HA instance.
3. **Settings → Dashboards → ⋮ → Resources → Add Resource:**
   - URL: `/local/comfort-band-card.js`
   - Type: `JavaScript Module`
4. Hard-refresh the browser.

## Dashboard config

```yaml
type: custom:comfort-band-card
zone: gym         # required — the zone slug from your comfort_band setup
name: Gym         # optional — defaults to the room (area) the zone's device is in
variant: tile     # optional — `tile` (default) or `mini` (floorplan chip)
compact: false    # optional — set true for a tile that doesn't expand on tap
```

The dashboard's visual editor offers a zone dropdown, an optional name, a variant picker, and a compact-mode toggle, so you don't need to write YAML by hand.

### Mini variant (for floorplans)

`variant: mini` renders a small inline chip showing the temperature that drives control, sized to its content. A comfortable room is the number alone; anything worth noticing adds an icon in front, most urgent first: the room sensor offline, heating or cooling (the background tints red or blue as well), below or above its range when it's neither heating nor cooling, and adjusted for a while (not in a room with no schedule, where an adjustment stays). A paused zone shows a pause icon only, and a room on hold (no reading at all) only the warning icon. The chip's label for screen readers, and its tooltip, is the zone, the temperature (saying "feels like" when it is) and the status line. Its touch area is at least 44 px each way, without the chip looking any bigger, and tapping it opens the same modal as the full tile (a `compact` chip, which doesn't open, keeps to its own size). Drop one inside a `picture-elements` card to label rooms on a floorplan:

```yaml
type: picture-elements
image: /local/floorplan.png
elements:
  - type: custom:comfort-band-card
    zone: gym
    variant: mini
    style:
      top: 32%
      left: 47%
```

## Development

```bash
npm install
npm run dev          # vite build --watch
npm run test         # vitest (jsdom + Lit element fixtures)
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run build        # produces dist/comfort-band-card.js
```

Stack: TypeScript + Lit 3 + Vite (lib mode, single-file ESM bundle) + Vitest + jsdom.

The committed `dist/comfort-band-card.js` is the canonical bundle — HACS plugin install reads it directly. CI verifies it matches `npm run build` output, so any source change without a rebuild fails.

## License

MIT — see [LICENSE](LICENSE).
