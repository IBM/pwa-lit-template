/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, customElement } from 'lit-element';

import { urlForName } from '../router';

import { PageElementNotFound } from '../helpers/page-element-not-found';

@customElement('page-not-found')
export class PageNotFound extends PageElementNotFound {
  static styles = css`
    :host {
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
}
