/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

export default [
  {
    path: '/',
    component: 'page-home',
    title: 'MyApplication',
    description: 'MyApplication description',
    action: async () => {
      await import('../pages/page-home');
    }
  },
  {
    path: '/about',
    component: 'page-about',
    title: 'About',
    description: 'About page description',
    action: async () => {
      await import('../pages/page-about');
    }
  },
  {
    path: '/user/:username',
    component: 'page-user',
    action: async () => {
      await import('../pages/page-user');
    }
  },
  {
    path: '(.*)',
    component: 'page-not-found',
    title: 'Error',
    description: '',
    action: async () => {
      await import('../pages/page-not-found');
    }
  }
];
