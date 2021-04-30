/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  PageElementNotFound,
  pageNotFoundMeta,
} from '../helpers/page-element-not-found.js';
import { urlForName } from '../router/index.js';

@customElement('page-not-found')
export class PageNotFound extends PageElementNotFound {
  static styles = css`
    :host {
      display: block;
    }

    section {
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

  meta() {
    return pageNotFoundMeta;
  }
}
