/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSpaConfig } from '@open-wc/building-rollup';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { copy } from '@web/rollup-plugin-copy';
import { black, blue } from 'chalk';
import merge from 'deepmerge';

const DIST_PATH = 'server/dist/';
const GENERATE_SERVICE_WORKER = false;

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
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
      },
    },
  ],
  navigateFallback: 'index.html',
  skipWaiting: false,
  clientsClaim: false,
};

const config = merge(
  createSpaConfig({
    outputDir: DIST_PATH,
    legacyBuild: true,
    developmentMode: process.env.ROLLUP_WATCH === 'true',
    ...(GENERATE_SERVICE_WORKER && {
      workbox: workboxConfig,
      injectServiceWorker: true,
    }),
  }),
  {
    input: 'index.html',
    plugins: [
      typescript({
        declaration: false,
        sourceMap: false,
        inlineSources: false,
      }),
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
      ...(process.env.NODE_ENV
        ? [
            replace({
              preventAssignment: true,
              include: 'src/**/*.ts',
              exclude: 'src/config.*.ts',
              delimiters: ['', ''],
              values: {
                './config.js': `./config.${process.env.NODE_ENV}.js`,
              },
            }),
          ]
        : []),
      copy({
        // Copy all the static files
        patterns: ['images/**/*', 'manifest.webmanifest', 'robots.txt'],
      }),
    ],
  }
);

console.log(`${black.bgWhite(' Build information'.padEnd(60, ' '))}

${blue('Name')}                   ${process.env.npm_package_name}
${blue('Environment')}            ${process.env.NODE_ENV || 'development'}
${blue('Version')}                v${process.env.npm_package_version}`);

export default config;
