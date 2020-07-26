/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, css, customElement } from 'lit-element';

import { urlForName } from '../router';

@customElement('app-navigation')
export class AppNavigation extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }

    nav {
      display: flex;
      flex: 1;
      align-self: stretch;
    }

    nav a {
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: 600;
      text-decoration: none;
    }

    nav a:not(:last-child) {
      margin-right: 1rem;
    }

    nav a:hover {
      color: #bbb;
    }
  `;

  render() {
    return html`
      <nav>
        <a href="${urlForName('home')}">Home</a>
        <a href="${urlForName('about')}">About</a>
      </nav>
    `;
  }
}
