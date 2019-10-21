/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';
import { PageElement } from '../helpers/page-element';

@customElement('page-not-found')
export class PageNotFound extends PageElement {
  protected render() {
    return html`
      <section>
        <h1>Page not found</h1>

        <p>
          <a href="/">Back to home</a>
        </p>
      </section>
    `;
  }
}
