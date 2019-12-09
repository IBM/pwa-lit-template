/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';

import { PageElement } from './page-element';

import { setMetaTag, removeMetaTag } from '../helpers/metadata';

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

  public connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    setMetaTag('name', 'render:status_code', '404');
  }

  public disconnectedCallback() {
    removeMetaTag('name', 'render:status_code');

    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }
}
