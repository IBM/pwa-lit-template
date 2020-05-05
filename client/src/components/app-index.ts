/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, css, customElement, query } from 'lit-element';

import { config } from '../config';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';

@customElement('app-index')
export class AppIndex extends LitElement {
  @query('main')
  private main!: HTMLElement;

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        header {
          display: flex;
          align-items: center;
          height: 50px;
          padding: 0 1rem;
          background-color: #ddd;
        }

        header nav {
          flex: 1;
        }

        main {
          flex: 1;
        }

        main:empty ~ footer {
          display: none;
        }

        footer {
          padding: 1rem;
          background-color: #eee;
          text-align: center;
        }
      `
    ];
  }

  render() {
    return html`
      <header>
        <nav>
          <a href="/">Home</a>
          <span>-</span>
          <a href="/about">About</a>
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

  private async initializeRouter() {
    const router = await import('../router/index');

    router.init(this.main);
  }

  firstUpdated() {
    this.initializeRouter();
  }
}
