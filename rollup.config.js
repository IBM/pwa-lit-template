/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSpaConfig } from '@open-wc/building-rollup';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import merge from 'deepmerge';
import { black, blue } from 'chalk';

import packageJson from './package.json';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const SOURCE_PATH = 'client/';
const DIST_PATH = 'server/dist/';

const workboxConfig = {
  globDirectory: DIST_PATH,
  skipWaiting: false,
  clientsClaim: false
};

const baseConfig = createSpaConfig({
  outputDir: DIST_PATH,
  legacyBuild: true,
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  workbox: workboxConfig,
  injectServiceWorker: true
});

const config = merge(baseConfig, {
  input: `${SOURCE_PATH}index.html`,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    replace({
      include: `${SOURCE_PATH}src-js/config/index.js`,
      development: ENVIRONMENT
    }),
    copy({
      targets: [
        {
          src: [
            // Copy all client files except the source code
            `${SOURCE_PATH}**/*`,
            `!${SOURCE_PATH}node_modules`,
            `!${SOURCE_PATH}patches`,
            `!${SOURCE_PATH}src`,
            `!${SOURCE_PATH}src-js`,
            `!${SOURCE_PATH}package-lock.json`,
            `!${SOURCE_PATH}package.json`
          ],
          dest: DIST_PATH
        }
      ],
      flatten: false
    })
  ]
});

console.log(black.bgWhite(' Build information'.padEnd(60, ' ')));
console.log();
console.log(`${blue('Environment')} \t\t ${ENVIRONMENT}`);
console.log(`${blue('Version')} \t\t v${packageJson.version}`);

export default config;
