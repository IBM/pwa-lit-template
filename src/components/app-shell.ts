/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, css, customElement, query } from 'lit-element';

import config from '../config';

@customElement('app-shell')
export class AppShell extends LitElement {
  @query('main')
  private main!: HTMLElement;

  static get styles() {
    return [
      css`
        :host {
          --app-header-size: 50px;

          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        header {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          height: var(--app-header-size);
          padding: 0 2rem;
          background-color: #ddd;
        }

        main {
          flex: 1;
        }

        main:empty {
          flex: none;
          height: calc(100vh - var(--app-header-size));
        }

        footer {
          padding: 1rem;
          background-color: #eee;
          text-align: center;
        }
      `
    ];
  }

  protected render() {
    return html`
      <header>
        <nav>
          <a href="/">Home</a>
          <span>-</span>
          <a href="/about">About</a>
          <span>-</span>
          <a href="/error">Error</a>
        </nav>
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

  protected firstUpdated() {
    this.initializeRouter();
  }
}
