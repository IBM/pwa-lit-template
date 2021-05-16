/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import config from '../config.js';

import type { Route } from '@vaadin/router';

export const pageNotFoundMeta = {
  title: 'Error: Page not found',
  description: null,
  image: null,
};

export const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: 'page-home',
    meta: {
      title: config.appName,
      titleTemplate: null,
      description: config.appDescription,
    },
    action: async () => {
      await import('../pages/page-home.js');
    },
  },
  {
    path: '/about',
    name: 'about',
    component: 'page-about',
    meta: {
      title: 'About',
      description: 'About page description',
    },
    action: async () => {
      await import('../pages/page-about.js');
    },
  },
  {
    path: '(.*)',
    name: 'not-found',
    component: 'page-not-found',
    meta: pageNotFoundMeta,
    action: async () => {
      await import('../pages/page-not-found.js');
    },
  },
];
