/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, css, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { urlForName } from '../router';

@customElement('app-navigation')
export class AppNavigation extends LitElement {
  @property({ type: String })
  activeMenuItem?: string;

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

    nav a.active {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <nav>
        <a
          href="${urlForName('home')}"
          class="${classMap({ active: this.activeMenuItem === 'home' })}"
          >Home</a
        >
        <a
          href="${urlForName('about')}"
          class="${classMap({ active: this.activeMenuItem === 'about' })}"
          >About</a
        >
      </nav>
    `;
  }
}
