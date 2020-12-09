/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSpaConfig } from '@open-wc/building-rollup';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { copy } from '@web/rollup-plugin-copy';
import merge from 'deepmerge';
import { black, blue } from 'chalk';

const DIST_PATH = 'server/dist/';

const workboxConfig = {
  mode: 'production',
  sourcemap: false,
  globDirectory: DIST_PATH,
  runtimeCaching: [
    {
      urlPattern: 'images/**/*',
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        }
      }
    }
  ],
  navigateFallback: 'index.html',
  skipWaiting: false,
  clientsClaim: false
};

const config = merge(
  createSpaConfig({
    outputDir: DIST_PATH,
    legacyBuild: true,
    developmentMode: process.env.ROLLUP_WATCH === 'true',
    workbox: workboxConfig,
    injectServiceWorker: true
  }),
  {
    input: 'index.html',
    plugins: [
      typescript({
        declaration: false,
        sourceMap: false,
        inlineSources: false
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      ...(process.env.NODE_ENV
        ? [
            replace({
              include: 'src/**/*.ts',
              exclude: 'src/config.*.ts',
              delimiters: ['', ''],
              './config': `./config.${process.env.NODE_ENV}`
            })
          ]
        : []),
      copy({
        // Copy all the static files
        patterns: ['images/**/*', 'manifest.webmanifest', 'robots.txt']
      })
    ]
  }
);

console.log(`${black.bgWhite(' Build information'.padEnd(60, ' '))}

${blue('Name')}                   ${process.env.npm_package_name}
${blue('Environment')}            ${process.env.NODE_ENV || 'development'}
${blue('Version')}                v${process.env.npm_package_version}`);

export default config;
