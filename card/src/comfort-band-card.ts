/**
 * `<comfort-band-card>` — main custom element.
 *
 * Reads `{ type, zone }` config, resolves the zone's entities by device
 * identifier (sidesteps post-cutover entity_id chaos), and renders a
 * `<comfort-band-tile>` populated from live HA states. Tap on the tile
 * fires `comfort-band-tile-tap`; commit 4 will use that to open the modal.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import './tile.js';
import './modal.js';
import './card-editor.js';
import type { ComfortBandModal } from './modal.js';
import type { ComfortBandCardConfig, HomeAssistant } from './types.js';
import type { ZoneEntities } from './helpers.js';
import { findZoneEntities, zoneDisplayName } from './helpers.js';
import { formatTime, statusLine } from './now-status.js';
import { controlling, readRoom, roomBadges } from './room-status.js';
import { tokens } from './styles.js';

@customElement('comfort-band-card')
export class ComfortBandCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: ComfortBandCardConfig;
  @query('comfort-band-modal') private _modal?: ComfortBandModal;

  public setConfig(config: ComfortBandCardConfig): void {
    if (!config?.zone) {
      throw new Error('comfort-band-card: `zone` is required');
    }
    // `name:` left empty in YAML is null; treat it as unset. An unquoted
    // number (`name: 101`) is a room name too.
    const name: unknown = config.name;
    if (typeof name === 'number') config = { ...config, name: String(name) };
    else if (name != null && typeof name !== 'string') {
      throw new Error('comfort-band-card: `name` must be text');
    }
    this._config = config;
  }

  /** HA's panel/grid uses this to size the card. ~1 row per ~50 px of content. */
  public getCardSize(): number {
    return this._config?.variant === 'mini' ? 1 : 2;
  }

  /** HA dashboard editor: tells HA which custom element to render as the
   *  visual config UI. Returning the element directly (not a string) is
   *  the modern API. */
  public static getConfigElement(): HTMLElement {
    return document.createElement('comfort-band-card-editor');
  }

  /** Default config seed when the user adds the card via "Add card" in the
   *  dashboard editor. Picks the first registered Comfort Band zone, if any. */
  public static getStubConfig(hass: HomeAssistant | undefined): ComfortBandCardConfig {
    let zone = '';
    if (hass) {
      for (const device of Object.values(hass.devices)) {
        for (const [domain, key] of device.identifiers) {
          if (domain === 'comfort_band' && key.startsWith('zone:')) {
            zone = key.slice('zone:'.length);
            break;
          }
        }
        if (zone) break;
      }
    }
    return { type: 'custom:comfort-band-card', zone };
  }

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
      }
      .placeholder {
        padding: var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        color: var(--cb-text-secondary);
        font-family: var(--paper-font-body1_-_font-family, sans-serif);
        font-size: 13px;
      }
    `,
  ];

  protected override render() {
    if (!this._config || !this.hass) return html``;

    const zoneSlug = this._config.zone;
    const entities = findZoneEntities(this.hass, zoneSlug);

    if (entities.deviceId === null) {
      return html`<div class="placeholder">
        Comfort Band zone <code>${zoneSlug}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    }

    const compact = this._config.compact === true;
    const variant = this._config.variant === 'mini' ? 'mini' : 'tile';
    const view = this._buildView(this.hass, entities);

    return html`
      <comfort-band-tile
        zoneName=${view.zoneName}
        .temperature=${view.temperature}
        .feelsLike=${view.feelsLike}
        .low=${view.low}
        .high=${view.high}
        .action=${view.action}
        .statusKind=${view.statusKind}
        .statusText=${view.statusText}
        .badges=${view.badges}
        .noExpand=${compact}
        .variant=${variant}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${compact
        ? null
        : html`<comfort-band-modal
            .hass=${this.hass}
            zone=${zoneSlug}
            zoneName=${view.zoneName}
            .entities=${entities}
          ></comfort-band-modal>`}
    `;
  }

  private _onTileTap = () => {
    this._modal?.open();
  };

  private _buildView(hass: HomeAssistant, entities: ZoneEntities) {
    const room = readRoom(hass, entities);
    const status = statusLine({
      ...room,
      doing: null,
      now: Date.now(),
      formatTime: (ms) => formatTime(ms, hass),
    });
    return {
      zoneName: zoneDisplayName(hass, this._config!, entities),
      temperature: room.temperature,
      feelsLike: room.feelsLike,
      low: room.band.low,
      high: room.band.high,
      action: controlling(room) ? room.action : 'unknown',
      statusKind: status.kind,
      statusText: status.text,
      badges: roomBadges(room),
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-card': ComfortBandCard;
  }
}
