/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { Router, RouteCommands } from '@vaadin/router';

import routes from './routes';

export function init(outlet: HTMLElement): void {
  const router = new Router(outlet, { baseUrl: '/' });

  router.setRoutes([
    // Redirect to URL without trailing slash
    {
      path: '(.*)/',
      action: (context, commands): ReturnType<RouteCommands['redirect']> => {
        const newPath = context.pathname.slice(0, -1);
        return commands.redirect(newPath);
      }
    },
    ...routes
  ]);
}
