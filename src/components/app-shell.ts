/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
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
          display: block;
          padding: 1rem;
        }

        main > * {
          display: block;
        }

        main {
          margin-bottom: 50px;
        }

        footer {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0 1rem;
          background-color: #eeeeee;
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
          <a href="/users">Users</a>
          <span>-</span>
          <a href="/about">About</a>
          <span>-</span>
          <a href="/error">Error</a>
        </nav>
      </header>

      <main role="main">
        <!-- added / removed dynamically by the router -->
      </main>

      <footer>
        <span>Current environment: ${config.environment}</span>
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
