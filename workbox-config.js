/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

module.exports = {
  clientsClaim: true,
  globDirectory: 'dist/',
  globPatterns: ['index.html', 'manifest.json', '**/*.js'],
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
  swDest: 'dist/service-worker.js'
};
