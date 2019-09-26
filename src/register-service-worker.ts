/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import './components/app-snackbar';

const createUIPrompt = ({ onAccept }: { onAccept: Function }) => {
  const snackbarElement = document.createElement('app-snackbar');

  snackbarElement.addEventListener('on-accept', () => {
    onAccept();
  });

  snackbarElement.addEventListener('on-cancel', () => {
    snackbarElement.remove();
  });

  document.body.appendChild(snackbarElement);
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
