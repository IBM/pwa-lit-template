/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSpaConfig } from '@open-wc/building-rollup';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';
import merge from 'deepmerge';
import { black, blue } from 'chalk';

import packageJson from './package.json';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const DIST_PATH = 'server/dist/';

const workboxConfig = {
  mode: 'production',
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
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'config.development': `config.${ENVIRONMENT}`
      }),
      commonjs({
        include: [
          '**/fast-json-stable-stringify/**/*',
          '**/graphql-tag/**/*',
          '**/zen-observable/**/*'
        ]
      }),
      copy({
        hook: 'buildStart',
        targets: [
          {
            // Copy all the static files
            src: ['images', 'manifest.webmanifest', 'robots.txt'],
            dest: DIST_PATH
          }
        ],
        flatten: false
      })
    ]
  }
);

console.log(black.bgWhite(' Build information'.padEnd(60, ' ')));
console.log();
console.log(`${blue('Environment')} \t\t ${ENVIRONMENT}`);
console.log(`${blue('Version')} \t\t v${packageJson.version}`);

export default config;
