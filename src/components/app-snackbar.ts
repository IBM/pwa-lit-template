/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, html, css, customElement } from 'lit-element';

@customElement('app-snackbar')
export class AppSnackbar extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          position: fixed;
          bottom: 0;
          display: flex;
          box-sizing: border-box;
          min-width: 288px;
          margin: 12px;
          padding: 14px 16px;
          color: #fff;
          background-color: #333;
          border-radius: 4px;
        }

        .message {
          flex-grow: 1;
        }

        button {
          background-color: #fff;
        }
      `
    ];
  }

  protected render() {
    return html`
      <div class="message">New version available!</div>
      <button @click=${this.onAccept}>Update</button>
      <button @click=${this.onCancel}>X</button>
    `;
  }

  private onAccept() {
    const onAcceptEvent = new CustomEvent('app-snackbar-on-accept');
    this.dispatchEvent(onAcceptEvent);
  }

  private onCancel() {
    this.remove();
  }
}
