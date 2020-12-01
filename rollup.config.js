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

import {
  envVariables,
  injectEnvVariablesToWindow
} from './inject-env-variables-to-window.mjs';

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
    html: {
      transform: [(html) => injectEnvVariablesToWindow(html)]
    },
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
      copy({
        // Copy all the static files
        patterns: ['images/**/*', 'manifest.webmanifest', 'robots.txt']
      })
    ]
  }
);

console.log(black.bgWhite(' Build information'.padEnd(60, ' ')), '\n');
console.log(`${blue('Environment')}       ${envVariables.ENVIRONMENT}`);
console.log(`${blue('Version')}           v${envVariables.VERSION}`);

export default config;
