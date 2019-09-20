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
      <div class="message">New version available!</div>
      <button @click=${this._onAccept}>Update</button>
      <button @click=${this._onCancel}>Close</button>
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

// TODO: Update with a toast custom element
const createUIPrompt = ({ onAccept }: { onAccept: Function }) => {
  const toastElement = document.createElement('div');
  toastElement.style.display = 'flex';
  toastElement.style.padding = '1rem';
  toastElement.style.backgroundColor = '#dddddd';

  const messageElement = document.createElement('div');
  messageElement.style.flexGrow = '1';
  messageElement.innerText = 'New version available!';

  const updateButton = document.createElement('button');
  updateButton.innerText = 'Update';
  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';

  toastElement.appendChild(messageElement);
  toastElement.appendChild(updateButton);
  toastElement.appendChild(closeButton);

  updateButton.addEventListener('click', () => {
    onAccept();
  });
  closeButton.addEventListener('click', () => {
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
