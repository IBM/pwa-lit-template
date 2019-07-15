/**
 * Copyright (c) Abdón Rodríguez Davila and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit-element';

class AppShell extends LitElement {
  render() {
    return html`
      <section>
        <h1>app-shell</h1>
      </section>
    `;
  }
}

window.customElements.define('app-shell', AppShell);
