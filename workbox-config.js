/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['index.html', 'manifest.json', '**/*.js'],
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
  navigateFallback: 'index.html',
  swDest: 'dist/service-worker.js'
};
