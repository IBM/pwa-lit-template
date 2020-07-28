/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Router } from '@vaadin/router';
import type { Params } from '@vaadin/router';

import { routes } from './routes';

const router = new Router();

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

export const attachRouter = (outlet: Node | null): void => {
  router.setOutlet(outlet);
};

export const urlForName = (name: string, params?: Params | null): string => {
  return router.urlForName(name, params);
};
