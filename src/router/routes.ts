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
    title: 'Home',
    description: 'Home description',
    action: (): void => {
      import('../pages/page-home');
    }
  },
  {
    path: '/about',
    component: 'page-about',
    title: 'About',
    description: 'About description',
    action: (): void => {
      import('../pages/page-about');
    }
  },
  {
    path: '(.*)',
    component: 'page-not-found',
    title: 'Page not found',
    description: 'Page not found description',
    action: (): void => {
      import('../pages/page-not-found');
    }
  }
];
