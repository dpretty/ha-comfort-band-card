# Comfort Band Card

A Lovelace card for the [Comfort Band](https://github.com/dpretty/ha-comfort-band) Home Assistant integration.

Compact tile + expanded modal with **Now / Schedule / Profiles / Insights** tabs. Replaces a dashboard full of sliders, input_numbers, and `browser_mod` popups with one element per zone.

> Requires the `comfort_band` integration ≥ **v0.1.0**.

## What you get

- **Compact tile** — zone display name, prominent room temperature, inline `[low … room … high]` band gauge coloured by `current_action` (red=heating, blue=cooling, neutral=idle), override pill while an override is active.
- **Now tab** — large band gauge + dual-handle slider for manual low/high (drag = `start_override`), Cancel-override button, 1h/3h/6h duration presets.
- **Schedule tab** — 24-hour timeline of the active profile's transitions. Tap empty space to add. Tap a transition to edit (precise time + low + high). Long-press to delete. Persists via `comfort_band.set_schedule`.
- **Profiles tab** — list + switch active profile (`comfort_band.set_profile`).
- **Insights tab** — wraps HA's built-in `history-graph` for the last 24 h of `room_temperature`.

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
variant: tile     # optional — `tile` (default) or `mini` (number-only chip)
compact: false    # optional — set true for a tile that doesn't expand on tap
```

The dashboard's visual editor offers a zone dropdown, variant picker, and compact-mode toggle, so you don't need to write YAML by hand.

### Mini variant (for floorplans)

`variant: mini` renders a small inline chip showing just the room temperature, sized to its content. The background tints red while heating and blue while cooling, and tapping it opens the same modal as the full tile. Drop one inside a `picture-elements` card to label rooms on a floorplan:

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
