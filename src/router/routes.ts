/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Route } from '@vaadin/router';

export const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: 'page-home',
    metadata: {
      title: 'MyApplication',
      titleTemplate: null,
      description: 'MyApplication description'
    },
    action: async () => {
      await import('../pages/page-home');
    }
  },
  {
    path: '/about',
    name: 'about',
    component: 'page-about',
    metadata: {
      title: 'About',
      description: 'About page description'
    },
    action: async () => {
      await import('../pages/page-about');
    }
  },
  {
    path: '(.*)',
    name: 'not-found',
    component: 'page-not-found',
    metadata: {
      title: 'Error',
      description: null,
      image: null
    },
    action: async () => {
      await import('../pages/page-not-found');
    }
  }
];
