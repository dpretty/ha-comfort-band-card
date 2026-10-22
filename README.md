# Comfort Band Card

A Lovelace card for the [Comfort Band](https://github.com/dpretty/ha-comfort-band) Home Assistant integration.

Compact tile + expanded modal with **Now / Schedule / Profiles / Insights** tabs. Replaces a dashboard full of sliders, input_numbers, and `browser_mod` popups with one element per zone.

> Requires the `comfort_band` integration ≥ **v0.1.0** for tile + Now / Schedule / Insights, **≥ v0.3.0** for full profile management (create / clone / rename / delete), or **≥ v0.4.0** for the Settings tab (apparent-temperature display + the use-apparent / learning-enabled toggles).

## What you get

- **Compact tile** — zone display name, the temperature that drives control (the room reading, or "feels like" when apparent temperature is in use, which the tile says beside it), an inline `[low … room … high]` band gauge coloured by `current_action` (red=heating, blue=cooling, neutral=idle or not controlling), and the Now tab's status line with its icon: what the room is doing (Comfortable, Heating, Cooling, or A bit cool / A bit warm when it's outside its range but neither), its range, and when that next changes or an adjustment ends ("Comfortable · 17.5–23° until 5 pm"; the times need integration ≥ **v0.23.0**, as on the Now tab). A paused zone says so, and so does one whose room sensor is offline (integration ≥ **v0.16.0**): "Room sensor offline · …" while a stand-in reading drives control (≥ **v0.18.0**), "On hold: the room sensor is offline" when nothing does. The Now tab adds a sentence on what that means and what to do.
- **Now tab** — the temperature that drives control, large (the room reading, or "feels like" when apparent temperature is in use), and one status line: what the room is doing, the range in force and when the schedule next changes it ("Comfortable · 17.5–23° until 9 pm"). Below it, **Adjust for** 1 h · 3 h (3 h until another is picked), then **Cooler** / **Warmer**: each tap moves the whole range half a degree (stopping at 10° and 35°, never pushing a range the other way), and taps made close together are sent as one `start_override` once they stop, for the length picked. Picking a length while a room is adjusted re-times the adjustment; **Back to schedule** ends it. While a change is going through, these controls ignore presses (they keep focus). The zone's `override_hours` applies only to overrides started elsewhere. Further down: the "How does it feel?" feedback buttons, and the two-handled slider under **Set an exact range**. The next-change time and the room-has-a-schedule check need integration ≥ **v0.23.0** (`sensor.{zone}_next_band_change`); on older versions the card leaves out "until" and offers "End adjustment" instead of "Back to schedule". In a room with no schedule an adjustment's range stays, so it offers no length and no way back to a schedule.
- **Schedule tab** — a chart of the comfortable range through the day (time across, 14–28 °C up), for reading only, and below it the list of changes: each a time of day, in HA's 12/24-hour setting, and the range it sets. **+ Add a change** and each row's **Edit** open a small form (time, lowest, highest); a row's **Delete** asks first, and the form's deletes at once. Saves with `comfort_band.set_schedule`; the live-update WS subscription keeps other open card instances in sync. Where profiles are set up (integration ≥ **v0.3.0**) it says whose schedule it shows ("Schedule: Home", the active profile's name as typed); otherwise it doesn't mention profiles. A room with no schedule in the active profile follows the default profile's, which this tab doesn't show.
- **Profiles tab** — list + switch active profile, plus full CRUD: tap **+ New profile** to create one, or use the per-row overflow menu (`⋮`) to Clone, Rename, or Delete. The active-fallback (`home` by default; tracks renames) is protected from deletion. Requires integration ≥ **v0.3.0**.
- **Settings tab** — per-zone toggles for **Use apparent temperature** (feed humidity-adjusted "feels like" into heat/cool decisions; falls back to raw temp if the humidity sensor goes offline) and **Learning enabled** (times heating and cooling from what the room has learned about how quickly it warms and cools: starting and stopping early, and holding off while it drifts back on its own; predictive control needs it on too). Shows the configured humidity sensor read-only — change it via HA's Configure dialog. Requires integration ≥ **v0.4.0**.
- **Insights tab** — two stacked 24 h charts: (1) room temperature with effective band edges and heating/cooling shading; (2) room vs apparent ("feels like") temperature with humidity overlaid on a secondary axis. The second chart requires the integration at **≥ v0.4.0** AND a humidity sensor configured for the zone — on older integrations a hint nudges you to upgrade, with the sensor still missing it points at the Settings tab.

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
