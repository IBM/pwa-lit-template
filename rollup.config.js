/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { createCompatibilityConfig } from '@open-wc/building-rollup';
import copy from 'rollup-plugin-cpy';
import replace from 'rollup-plugin-replace';
import { generateSW } from 'rollup-plugin-workbox';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const workboxConfig = require('./workbox-config.js');

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const DIST_PATH = 'dist/';

const configs = createCompatibilityConfig({
  input: './index.html',
  plugins: {
    workbox: false
  },
  extensions: ['.js', '.ts']
});

// Add plugins to both configs
configs.forEach(config => {
  config.plugins = [
    ...config.plugins,
    replace({
      include: 'src/config/index.ts',
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

// Add plugins to modern config
configs[1] = {
  ...configs[1],
  plugins: [...configs[1].plugins, generateSW(workboxConfig)]
};

export default configs;
