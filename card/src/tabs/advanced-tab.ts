/**
 * `<comfort-band-advanced-tab>` — the Advanced tab: what someone setting
 * the house up needs, out of the family's way (#30). Folding sections, each
 * a heading and a one-line summary of what's inside:
 *
 *   - Comfort: "feels like", the humidity sensor, and an exact range.
 *   - Automation: learning.
 *   - Schedules: profiles.
 *   - History: the last 24 hours' charts, loaded only while open.
 */

import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './settings-tab.js';
import './profiles-tab.js';
import './insights-tab.js';
import '../exact-range.js';
import { findActiveProfileEntity, profileManagerExists, type ZoneEntities } from '../helpers.js';
import type { HomeAssistant } from '../types.js';
import { tokens } from '../styles.js';

@customElement('comfort-band-advanced-tab')
export class ComfortBandAdvancedTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';
  @property({ attribute: false }) public entities?: ZoneEntities;

  /** Whether History is open: its charts subscribe to HA's history, so
   *  they're only there while it is. */
  @state() private _historyOpen = false;

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--cb-gap-sm) var(--cb-gap-md) var(--cb-gap-md);
      }
      details {
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      details:last-of-type {
        border-bottom: none;
      }
      summary {
        display: flex;
        align-items: center;
        padding: 10px 0;
        /* WCAG 2.5.5: 44px touch target. */
        min-height: 44px;
        box-sizing: border-box;
        cursor: pointer;
      }
      /* A flex summary loses the browser's own marker, so draw one: a chevron
         that turns down when the section is open. */
      summary {
        list-style: none;
      }
      summary::-webkit-details-marker {
        display: none;
      }
      summary::before {
        content: '';
        align-self: center;
        flex: none;
        width: 6px;
        height: 6px;
        margin: 0 6px 0 2px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details[open] > summary::before {
        transform: rotate(45deg);
      }
      summary:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
      }
      /* The name and summary wrap together, beside the chevron. */
      .label {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 0 var(--cb-gap-sm);
        min-width: 0;
      }
      .name {
        font-size: 15px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      .summary {
        min-width: 0;
        overflow-wrap: anywhere;
        font-size: 13px;
        color: var(--cb-text-secondary);
      }
      .content {
        padding-bottom: var(--cb-gap-md);
      }
    `,
  ];

  private _state(entityId: string | null): string | undefined {
    return entityId !== null ? this.hass?.states[entityId]?.state : undefined;
  }

  private _comfortSummary(): string {
    const state = this._state(this.entities?.useApparentTemperature ?? null);
    if (state === 'on') return '“Feels like” on';
    if (state === 'off') return '“Feels like” off';
    return '';
  }

  private _automationSummary(): string {
    const state = this._state(this.entities?.learningEnabled ?? null);
    if (state === 'on') return 'Learning on';
    if (state === 'off') return 'Learning off';
    return '';
  }

  private _schedulesSummary(): string {
    if (!this.hass) return '';
    const entity = findActiveProfileEntity(this.hass);
    // As the section says: a manager that's there but can't be read (its
    // select disabled, or not loaded) isn't "none set up".
    const readable = entity !== null && this.hass.states[entity] !== undefined;
    if (!readable) {
      return profileManagerExists(this.hass) ? 'Not available right now' : 'No profiles set up';
    }
    const profile = this.hass.states[entity]?.state;
    if (!profile || profile === 'unavailable' || profile === 'unknown') return '';
    return `Profile: ${profile}`;
  }

  private _section(
    id: string,
    name: string,
    summary: string,
    content: TemplateResult | typeof nothing,
    onToggle?: (open: boolean) => void,
  ) {
    return html`
      <details
        data-section=${id}
        @toggle=${onToggle
          ? (e: Event) => onToggle((e.target as HTMLDetailsElement).open)
          : nothing}
      >
        <summary>
          <span class="label">
            <span class="name">${name}</span>
            ${summary ? html`<span class="summary">${summary}</span>` : nothing}
          </span>
        </summary>
        <div class="content">${content}</div>
      </details>
    `;
  }

  protected override render() {
    if (!this.hass || !this.entities) return nothing;
    return html`
      ${this._section(
        'comfort',
        'Comfort',
        this._comfortSummary(),
        html`<comfort-band-settings-tab
            section="comfort"
            .hass=${this.hass}
            .zone=${this.zone}
            .entities=${this.entities}
          ></comfort-band-settings-tab>
          <comfort-band-exact-range
            .hass=${this.hass}
            .zone=${this.zone}
            .entities=${this.entities}
          ></comfort-band-exact-range>`,
      )}
      ${this._section(
        'automation',
        'Automation',
        this._automationSummary(),
        html`<comfort-band-settings-tab
          section="automation"
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`,
      )}
      ${this._section(
        'schedules',
        'Schedules',
        this._schedulesSummary(),
        html`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`,
      )}
      ${this._section(
        'history',
        'History',
        'Last 24 hours',
        this._historyOpen
          ? html`<comfort-band-insights-tab
              .hass=${this.hass}
              .entities=${this.entities}
            ></comfort-band-insights-tab>`
          : nothing,
        (open) => (this._historyOpen = open),
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-advanced-tab': ComfortBandAdvancedTab;
  }
}
