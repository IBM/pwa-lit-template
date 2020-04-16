/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default [
  {
    path: '/',
    name: 'home',
    component: 'page-home',
    title: 'MyApplication',
    description: 'MyApplication description',
    action: async () => {
      await import('../pages/page-home');
    }
  },
  {
    path: '/about',
    name: 'about',
    component: 'page-about',
    title: 'About',
    description: 'About page description',
    action: async () => {
      await import('../pages/page-about');
    }
  },
  {
    path: '/users',
    name: 'users',
    component: 'page-users',
    title: 'Users',
    description: 'Users page description',
    action: async () => {
      await import('../pages/page-users');
    }
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: 'page-user',
    action: async () => {
      await import('../pages/page-user');
    }
  },
  {
    path: '/users-pagination',
    name: 'users-pagination',
    component: 'page-users-pagination',
    title: 'Users pagination',
    description: 'Users page pagination description',
    action: async () => {
      await import('../pages/page-users-pagination');
    }
  },
  {
    path: '(.*)',
    component: 'page-not-found',
    title: 'Error',
    description: null,
    image: null,
    action: async () => {
      await import('../pages/page-not-found');
    }
  }
];
