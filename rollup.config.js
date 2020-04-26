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
const DIST_PATH = 'server/dist/';

const baseConfig = createSpaConfig({
  outputDir: DIST_PATH,
  legacyBuild: true,
  workbox: false
});

const config = merge(baseConfig, {
  input: './index.html',
  plugins: [
    replace({
      include: 'src-js/config/index.js',
      development: ENVIRONMENT
    }),
    copy({
      targets: [
        {
          src: ['images/**/*'],
          dest: `${DIST_PATH}images/`
        },
        {
          src: ['public/**/*', 'manifest.webmanifest'],
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
