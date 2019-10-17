/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { createCompatibilityConfig } from '@open-wc/building-rollup';
import copy from 'rollup-plugin-cpy';
import replace from 'rollup-plugin-replace';
import workbox from 'rollup-plugin-workbox';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const DIST_PATH = 'dist/';

const configs = createCompatibilityConfig({
  input: './index.html',
  plugins: {
    workbox: false
  },
  extensions: ['.mjs', '.js', '.ts']
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
  plugins: [
    ...configs[1].plugins,
    workbox({
      mode: 'generateSW',
      render: ({ swDest, count, size }) => {
        console.log(`The service worker was written to ${swDest}`);
        console.log(`${count} files will be precached, totalling ${size} B.`);
      },
      workboxConfig: require('./workbox-config.js')
    })
  ]
};

export default configs;
