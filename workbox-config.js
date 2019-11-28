/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

const DIST_PATH = 'server/dist/';

module.exports = {
  clientsClaim: true,
  globDirectory: DIST_PATH,
  globPatterns: ['index.html', 'manifest.webmanifest', '**/*.js'],
  navigateFallback: 'index.html',
  runtimeCaching: [
    {
      urlPattern: /\.(?:ico|png|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100
        }
      }
    }
  ],
  swDest: `${DIST_PATH}service-worker.js`
};
