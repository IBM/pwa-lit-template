/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, html, css, customElement } from 'lit-element';

@customElement('app-toast')
export class AppToast extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          position: absolute;
          bottom: 0;
          width: 100%;
        }

        .content {
          display: flex;
          padding: 1rem;
          background-color: #dddddd;
        }

        .message {
          flex-grow: 1;
        }
      `
    ];
  }

  protected render() {
    return html`
      <div class="content">
        <div class="message">New version available!</div>
        <button @click=${this._onAccept}>Update</button>
        <button @click=${this._onCancel}>Close</button>
      </div>
    `;
  }

  protected _onAccept() {
    const onAcceptEvent = new CustomEvent('on-accept');
    this.dispatchEvent(onAcceptEvent);
  }

  protected _onCancel() {
    const onCancelEvent = new CustomEvent('on-cancel');
    this.dispatchEvent(onCancelEvent);
  }
}

const createUIPrompt = ({ onAccept }: { onAccept: Function }) => {
  const toastElement = document.createElement('app-toast');

  toastElement.addEventListener('on-accept', () => {
    onAccept();
  });

  toastElement.addEventListener('on-cancel', () => {
    toastElement.remove();
  });

  document.body.appendChild(toastElement);
};

const registerServiceWorker = async () => {
  const { Workbox } = await import('workbox-window');
  const wb = new Workbox('service-worker.js');

  wb.addEventListener('waiting', () => {
    createUIPrompt({
      onAccept: async () => {
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });

        wb.messageSW({ type: 'SKIP_WAITING' });
      }
    });
  });

  wb.register();
};

if ('serviceWorker' in navigator) {
  registerServiceWorker();
}
