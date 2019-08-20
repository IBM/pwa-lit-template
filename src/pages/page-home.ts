/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, html, customElement } from 'lit-element';

@customElement('page-home')
export class PageHome extends LitElement {
  protected render() {
    return html`
      <section>
        <h1>Home</h1>

        <p>
          <a href="/about">About page</a>
        </p>
      </section>
    `;
  }
}
