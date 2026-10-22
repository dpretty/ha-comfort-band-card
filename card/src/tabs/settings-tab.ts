/**
 * `<comfort-band-settings-tab>` — the two behaviour switches that v0.4
 * introduced (learning_enabled, use_apparent_temperature) and a read-only
 * view of the optional humidity sensor, shown in the Advanced tab's
 * sections: `section="comfort"` for "feels like" and the humidity sensor,
 * `section="automation"` for learning.
 *
 * Optimistic UI: each toggle flips local state immediately, awaits the
 * service call, and rolls back on rejection. Matches the schedule-tab
 * `_writeSchedule` pattern.
 *
 * Graceful degradation: when its switch doesn't exist (pre-v0.4
 * integration), a section shows an upgrade hint instead.
 */

import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { readHumiditySensor, type ZoneEntities } from '../helpers.js';
import type { HomeAssistant } from '../types.js';
import { tokens } from '../styles.js';

@customElement('comfort-band-settings-tab')
export class ComfortBandSettingsTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';
  @property({ attribute: false }) public entities?: ZoneEntities;
  /** Which of the Advanced tab's sections this shows. */
  @property({ type: String }) public section: 'comfort' | 'automation' = 'comfort';

  /** Optimistic state for the two switches, keyed by entity_id. Cleared
   *  on success; rolled back on failure with `_error` set. */
  @state() private _pendingByEntity: Record<string, boolean | null> = {};
  @state() private _error: string | null = null;

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
      }
      .row {
        display: flex;
        align-items: flex-start;
        gap: var(--cb-gap-md);
        padding: var(--cb-gap-sm) 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .row:last-of-type {
        border-bottom: none;
      }
      .row-label {
        flex: 1;
        min-width: 0;
      }
      .row-label .title {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .row-label .desc {
        margin-top: 4px;
        font-size: 12px;
        color: var(--cb-text-secondary);
        line-height: 1.35;
      }
      /* WCAG 2.5.5: 44x44 minimum tap target on the toggle. */
      .toggle {
        position: relative;
        flex: 0 0 auto;
        width: 52px;
        min-height: 44px;
        padding: 0;
        border: none;
        border-radius: var(--cb-radius-pill);
        background: var(--cb-track-bg);
        cursor: pointer;
      }
      .toggle:hover:not([aria-disabled='true']) {
        filter: brightness(0.92);
      }
      .toggle:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .toggle[aria-checked='true'] {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
      }
      .toggle .knob {
        position: absolute;
        top: 50%;
        left: 4px;
        width: 24px;
        height: 24px;
        margin-top: -12px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: left 0.15s ease;
      }
      .toggle[aria-checked='true'] .knob {
        left: 24px;
      }
      .toggle[aria-disabled='true'] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .info-value {
        /* A long name or ID wraps rather than squeezing the label out. */
        max-width: 55%;
        overflow-wrap: anywhere;
        font-size: 13px;
        color: var(--cb-text-primary);
        text-align: right;
      }
      .info-value.unconfigured {
        font-style: italic;
        color: var(--cb-text-secondary);
      }
      .error {
        margin-bottom: var(--cb-gap-sm);
        padding: 8px 12px;
        border-radius: 6px;
        background: rgba(183, 28, 28, 0.1);
        color: var(--error-color, #b71c1c);
        font-size: 12px;
      }
      .upgrade-hint {
        margin-top: var(--cb-gap-md);
        font-size: 12px;
        color: var(--cb-text-secondary);
        text-align: center;
      }
      .upgrade-hint code {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 11px;
      }
    `,
  ];

  /** Resolve the displayed state: optimistic flip wins if one is in flight,
   *  otherwise read the entity. */
  private _isOn(entityId: string): boolean {
    const pending = this._pendingByEntity[entityId];
    if (pending !== undefined && pending !== null) return pending;
    return this.hass?.states[entityId]?.state === 'on';
  }

  private _onToggle = async (entityId: string): Promise<void> => {
    if (!this.hass) return;
    const target = !this._isOn(entityId);
    // Optimistic flip. The HA state push that follows a successful
    // callService arrives via the entity-state subscription, so we drop
    // the pending value in `finally` — on success the next render reads
    // the real value, on failure we already rolled back.
    this._pendingByEntity = { ...this._pendingByEntity, [entityId]: target };
    this._error = null;
    try {
      await this.hass.callService('switch', target ? 'turn_on' : 'turn_off', {
        entity_id: entityId,
      });
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to toggle switch.';
    } finally {
      const next = { ...this._pendingByEntity };
      delete next[entityId];
      this._pendingByEntity = next;
    }
  };

  protected override render() {
    if (!this.hass || !this.entities) return nothing;
    const entityId =
      this.section === 'comfort'
        ? this.entities.useApparentTemperature
        : this.entities.learningEnabled;
    if (entityId === null) {
      return html`<div class="upgrade-hint">
        ${this.section === 'comfort' ? '“Feels like”' : 'Learning'} needs the
        <code>comfort_band</code> integration v0.4.0 or later.
      </div>`;
    }
    return html`
      ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : nothing}
      ${this.section === 'comfort' ? this._renderComfort(entityId) : this._renderLearning(entityId)}
    `;
  }

  private _renderComfort(useApparent: string) {
    // The Room Temperature sensor's `humidity_sensor` attribute carries
    // the currently-configured sensor entity_id. None if not configured.
    const humidity = readHumiditySensor(this.hass!, this.entities!.roomTemperature);
    return html`
      ${this._renderToggle({
        entityId: useApparent,
        title: 'Use “feels like”',
        desc: html`When on, heating and cooling go by the humidity-adjusted “feels like” temperature
        instead of the room's own reading. Falls back to the room's reading automatically if the
        humidity sensor is unavailable.`,
      })}
      <div class="row">
        <div class="row-label">
          <div class="title">Humidity sensor</div>
          <div class="desc">
            ${humidity ? 'Change it' : 'Set one up'} under Settings → Devices &amp; Services →
            Comfort Band → Configure.
          </div>
        </div>
        <div class="info-value ${humidity ? '' : 'unconfigured'}">
          ${humidity ? this._sensorText(humidity) : 'Not configured'}
        </div>
      </div>
    `;
  }

  /** "Bedroom humidity · 54%": the sensor's own name and reading, not its
   *  ID, the reading as HA formats it where the frontend can. */
  private _sensorText(entityId: string): string {
    const s = this.hass!.states[entityId];
    if (!s) return entityId;
    const name =
      typeof s.attributes.friendly_name === 'string' && s.attributes.friendly_name
        ? s.attributes.friendly_name
        : entityId;
    const value = Number.parseFloat(s.state);
    if (!Number.isFinite(value)) return `${name} · no reading`;
    if (this.hass!.formatEntityState) return `${name} · ${this.hass!.formatEntityState(s)}`;
    const unit =
      typeof s.attributes.unit_of_measurement === 'string' ? s.attributes.unit_of_measurement : '';
    return `${name} · ${s.state}${unit ? ` ${unit}` : ''}`;
  }

  private _renderLearning(learning: string) {
    return this._renderToggle({
      entityId: learning,
      title: 'Learning',
      // Mirrors the integration's control gate: on, the learned predictor
      // decides (and MPC, when its own switch is on and it is ready); off,
      // plain on/off at the deadband edges. Samples are recorded either way.
      desc: html`Uses what this room has learned about how quickly it warms and cools to time
      heating and cooling: starting early rather than waiting for the room to get too cold or warm,
      stopping early so it doesn't overshoot, and holding off while it's already heading back on its
      own. Predictive control (the “MPC enabled” switch) needs this on too. While it's off, the room
      keeps recording readings; it just doesn't act on what it has learned.`,
    });
  }

  private _renderToggle(opts: { entityId: string; title: string; desc: TemplateResult }) {
    const on = this._isOn(opts.entityId);
    // Disabled while a service call is in flight to prevent a double-tap
    // from dispatching two concurrent turn_on/turn_off pairs.
    const pending = this._pendingByEntity[opts.entityId] !== undefined;
    // Bespoke <button role="switch"> rather than <ha-switch> / <mwc-switch>:
    // those are private HA internal elements with no stable API for custom
    // cards. The hand-rolled control is WCAG-correct (44px target,
    // aria-checked, focus-visible) at the cost of ~50 lines of CSS.
    return html`
      <div class="row">
        <div class="row-label">
          <div class="title">${opts.title}</div>
          <div class="desc">${opts.desc}</div>
        </div>
        <button
          class="toggle"
          role="switch"
          aria-checked=${on ? 'true' : 'false'}
          aria-disabled=${pending ? 'true' : 'false'}
          aria-label=${opts.title}
          @click=${pending ? null : () => this._onToggle(opts.entityId)}
        >
          <span class="knob"></span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-settings-tab': ComfortBandSettingsTab;
  }
}
