/**
 * Copyright (c) Abdón Rodríguez Davila and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, html, customElement, TemplateResult } from 'lit-element';

@customElement('app-shell')
export class AppShell extends LitElement {
  protected render(): TemplateResult {
    return html`
      <section>
        <h1>app-shell</h1>
      </section>
    `;
  }
}
