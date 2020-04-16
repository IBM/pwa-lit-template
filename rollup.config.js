/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { createSpaConfig } from '@open-wc/building-rollup';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-cpy';
import merge from 'deepmerge';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const DIST_PATH = 'server/dist/';

const baseConfig = createSpaConfig({
  outputDir: DIST_PATH,
  legacyBuild: true,
  workbox: require('./workbox-config.js')
});

export default merge(baseConfig, {
  input: './index.html',
  plugins: [
    replace({
      include: 'src-js/config/index.js',
      development: ENVIRONMENT
    }),
    copy({
      files: ['images/**/*', 'manifest.webmanifest'],
      dest: DIST_PATH,
      options: { parents: true }
    })
  ]
});
