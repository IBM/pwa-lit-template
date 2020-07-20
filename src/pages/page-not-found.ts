/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, customElement } from 'lit-element';
import { setMetaTag, removeMetaTag } from '../helpers/html-meta-manager/utils';

import { urlForName } from '../router';

import { PageElement } from '../helpers/page-element';

@customElement('page-not-found')
export class PageNotFound extends PageElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      text-align: center;
    }
  `;

  render() {
    return html`
      <section>
        <h1>Page not found</h1>

        <p>
          <a href="${urlForName('home')}">Back to home</a>
        </p>
      </section>
    `;
  }

  connectedCallback() {
    super.connectedCallback?.();

    setMetaTag('name', 'render:status_code', '404');
  }

  disconnectedCallback() {
    removeMetaTag('name', 'render:status_code');

    super.disconnectedCallback?.();
  }
}
