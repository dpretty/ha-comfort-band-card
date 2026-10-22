/**
 * `<comfort-band-card-editor>` — visual config UI for the dashboard editor.
 *
 * Registered globally; HA picks it up via `static getConfigElement()` on
 * the card class. Renders a zone dropdown (populated from `comfort_band`
 * device identifiers), an optional name (its placeholder shows the name the
 * card would use by default), a variant picker and a "Compact mode" toggle.
 *
 * Fires HA's standard `config-changed` event with the merged config so the
 * dashboard preview re-renders live as the user picks a zone.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ComfortBandCardConfig, HomeAssistant } from './types.js';
import { findZoneEntities, zoneDisplayName } from './helpers.js';
import { tokens } from './styles.js';

@customElement('comfort-band-card-editor')
export class ComfortBandCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config: ComfortBandCardConfig = {
    type: 'custom:comfort-band-card',
    zone: '',
  };

  public setConfig(config: ComfortBandCardConfig): void {
    this.config = {
      type: config.type ?? 'custom:comfort-band-card',
      zone: config.zone ?? '',
      ...(config.name != null ? { name: config.name } : {}),
      ...(config.compact !== undefined ? { compact: config.compact } : {}),
      ...(config.variant !== undefined ? { variant: config.variant } : {}),
    };
  }

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: var(--cb-gap-md);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
      select,
      input[type='text'],
      input[type='checkbox'] {
        font: inherit;
      }
      input[type='text'] {
        font-size: 14px;
        padding: 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--cb-text-primary);
        background-color: var(
          --mdc-text-field-fill-color,
          var(--secondary-background-color, var(--card-background-color, #ffffff))
        );
      }
      input[type='text']:focus-visible {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: 1px;
      }
      /* Native <select> picks up OS chrome in many browsers, which
         bypasses theme variables. appearance:none strips the chrome
         so the theme-aware bg/text colors actually take. */
      select {
        font-size: 14px;
        padding: 8px 32px 8px 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--cb-text-primary);
        background-color: var(
          --mdc-text-field-fill-color,
          var(--secondary-background-color, var(--card-background-color, #ffffff))
        );
        appearance: none;
        -webkit-appearance: none;
        background-image:
          linear-gradient(45deg, transparent 50%, currentColor 50%),
          linear-gradient(135deg, currentColor 50%, transparent 50%);
        background-position:
          calc(100% - 18px) 50%,
          calc(100% - 12px) 50%;
        background-size:
          6px 6px,
          6px 6px;
        background-repeat: no-repeat;
        cursor: pointer;
        width: 100%;
      }
      select:focus-visible {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: 1px;
      }
      /* Browsers vary in how much they let us style options, but set
         theme-aware defaults so most cases are readable in dark mode. */
      option {
        background-color: var(--card-background-color, #ffffff);
        color: var(--cb-text-primary);
      }
      .checkbox-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .empty {
        color: var(--cb-text-secondary);
        font-size: 13px;
      }
    `,
  ];

  private _availableZones(): string[] {
    if (!this.hass) return [];
    const slugs: string[] = [];
    for (const device of Object.values(this.hass.devices)) {
      for (const [domain, key] of device.identifiers) {
        if (domain === 'comfort_band' && key.startsWith('zone:')) {
          slugs.push(key.slice('zone:'.length));
        }
      }
    }
    return slugs.sort();
  }

  private _onZoneChange = (event: Event) => {
    const zone = (event.target as HTMLSelectElement).value;
    this._fireConfig({ ...this.config, zone });
  };

  /** Committed on `change` (blur/Enter) rather than every keystroke, so the
   *  dashboard preview isn't re-rendered mid-word. Blank removes the key. */
  private _onNameChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const name = input.value.trim();
    // Show what was saved: a name of only spaces is no name.
    input.value = name;
    const next = { ...this.config };
    if (name) next.name = name;
    else delete next.name;
    this._fireConfig(next);
  };

  /** The name the card shows when `name` is unset, used as the placeholder. */
  private _defaultName(): string {
    if (!this.hass || !this.config.zone) return '';
    const entities = findZoneEntities(this.hass, this.config.zone);
    return zoneDisplayName(this.hass, { zone: this.config.zone }, entities);
  }

  private _onCompactChange = (event: Event) => {
    const compact = (event.target as HTMLInputElement).checked;
    const next = { ...this.config };
    if (compact) next.compact = true;
    else delete next.compact;
    this._fireConfig(next);
  };

  private _onVariantChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    const next = { ...this.config };
    if (value === 'mini') next.variant = 'mini';
    else delete next.variant;
    this._fireConfig(next);
  };

  private _fireConfig(config: ComfortBandCardConfig): void {
    this.config = config;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override render() {
    const zones = this._availableZones();
    if (zones.length === 0) {
      return html`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    }

    const variant = this.config.variant === 'mini' ? 'mini' : 'tile';
    return html`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ''}>
          ${this.config.zone === ''
            ? html`<option value="" disabled selected>Select a zone…</option>`
            : null}
          ${zones.map(
            (z) => html` <option value=${z} ?selected=${z === this.config.zone}>${z}</option> `,
          )}
        </select>
      </label>
      <label>
        Name (optional)
        <input
          type="text"
          .value=${this.config.name ?? ''}
          placeholder=${this._defaultName()}
          @change=${this._onNameChange}
        />
      </label>
      <label>
        Variant
        <select @change=${this._onVariantChange} .value=${variant}>
          <option value="tile" ?selected=${variant === 'tile'}>Tile (default)</option>
          <option value="mini" ?selected=${variant === 'mini'}>
            Mini (small chip, for floorplans)
          </option>
        </select>
      </label>
      <label class="checkbox-row">
        <input
          type="checkbox"
          .checked=${this.config.compact === true}
          @change=${this._onCompactChange}
        />
        Compact mode (tile only, no expand on tap)
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-card-editor': ComfortBandCardEditor;
  }
}
