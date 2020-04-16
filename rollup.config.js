/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { createCompatibilityConfig } from '@open-wc/building-rollup';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-cpy';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const DIST_PATH = 'server/dist/';

const configs = createCompatibilityConfig({
  input: './index.html',
  outputDir: DIST_PATH
});

// Add plugins to both configs
configs.forEach((config) => {
  config.plugins = [
    ...config.plugins,
    replace({
      include: 'src-js/config/index.js',
      development: ENVIRONMENT
    })
  ];
});

// Add plugins to legacy config
// Added the copy task here because we only need to execute it once
configs[0] = {
  ...configs[0],
  plugins: [
    ...configs[0].plugins,
    copy({
      files: ['images/**/*', 'manifest.webmanifest'],
      dest: DIST_PATH,
      options: { parents: true }
    })
  ]
};

export default configs;
