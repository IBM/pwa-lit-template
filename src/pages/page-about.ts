/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, html, customElement } from 'lit-element';

@customElement('page-about')
export class PageAbout extends LitElement {
  protected render() {
    return html`
      <section>
        <h1>About</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
          delectus? Unde, sit. Fuga modi ea praesentium. Nemo dicta qui, magnam
          cum dolorum excepturi beatae explicabo quidem fugiat ullam blanditiis
          minima!
        </p>
      </section>
    `;
  }
}
