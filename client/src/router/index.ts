/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Router } from '@vaadin/router';

import config from '../config';
import routes from './routes';

export const init = (outlet: HTMLElement) => {
  const router = new Router(outlet, { baseUrl: config.routerBaseUrl });

  router.setRoutes([
    // Redirect to URL without trailing slash
    {
      path: '(.*)/',
      action: (context, commands) => {
        const newPath = context.pathname.slice(0, -1);
        return commands.redirect(newPath);
      }
    },
    ...routes
  ]);
};
