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
    action: (): void => {
      import('../pages/page-home');
    }
  },
  {
    path: '/about',
    component: 'page-about',
    action: (): void => {
      import('../pages/page-about');
    }
  },
  {
    path: '(.*)',
    component: 'page-not-found',
    action: (): void => {
      import('../pages/page-not-found');
    }
  }
];
