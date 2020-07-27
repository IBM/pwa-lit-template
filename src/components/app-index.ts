/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  LitElement,
  html,
  css,
  customElement,
  query,
  internalProperty
} from 'lit-element';

import { config } from '../config';
import { attachRouter } from '../router';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';
import './app-navigation';

@customElement('app-index')
export class AppIndex extends LitElement {
  @query('main')
  private main!: HTMLElement;

  @internalProperty()
  private routeName?: string;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    header {
      display: flex;
      align-items: center;
      height: 53px;
      padding: 0 1rem;
      background-color: #24292e;
    }

    main {
      flex: 1;
    }

    main:empty ~ footer {
      display: none;
    }

    footer {
      padding: 1rem;
      text-align: center;
      background-color: #eee;
    }
  `;

  render() {
    return html`
      <header>
        <app-navigation .activeMenuItem=${this.routeName}></app-navigation>

        <pwa-install-button>
          <button>Install app</button>
        </pwa-install-button>

        <pwa-update-available>
          <button>Update app</button>
        </pwa-update-available>
      </header>

      <!-- The main content is added / removed dynamically by the router -->
      <main role="main"></main>

      <footer>
        <span>Environment: ${config.environment}</span>
      </footer>
    `;
  }

  firstUpdated() {
    attachRouter(this.main);

    window.addEventListener('vaadin-router-location-changed', (event) => {
      const { route } = (<CustomEvent>event).detail.location;
      this.routeName = route.name;
    });
  }
}
