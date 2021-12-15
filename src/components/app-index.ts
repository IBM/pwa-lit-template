/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import config from '../config.js';
import { attachRouter, urlForName } from '../router/index.js';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';

@customElement('app-index')
export class AppIndex extends LitElement {
  @query('main')
  private main!: HTMLElement;

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

    header nav {
      display: flex;
      flex: 1;
      align-self: stretch;
    }

    header nav a {
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: 600;
      text-decoration: none;
    }

    header nav a:not(:last-child) {
      margin-right: 1rem;
    }

    header nav a:hover {
      color: #bbb;
    }

    main,
    main > * {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    footer {
      padding: 1rem;
      background-color: #eee;
      text-align: center;
    }

    main:empty ~ footer {
      display: none;
    }
  `;

  render() {
    return html`
      <header>
        <nav>
          <a href="${urlForName('home')}">Home</a>
          <a href="${urlForName('about')}">About</a>
        </nav>

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
  }
}
