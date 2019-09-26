/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { createCompatibilityConfig } from '@open-wc/building-rollup';
import copy from 'rollup-plugin-cpy';
import replace from 'rollup-plugin-replace';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const DIST_FOLDER = 'dist';

const configs = createCompatibilityConfig({
  input: './index.html',
  extensions: ['.js', '.ts']
});

export default configs.map((config, index) => {
  const defaultConfig = {
    ...config,
    plugins: [
      ...config.plugins,
      replace({
        include: 'src/config/index.ts',
        development: ENVIRONMENT
      })
    ]
  };

  // We only need to execute the copy task once
  if (index === 0) {
    return {
      ...defaultConfig,
      plugins: [
        ...defaultConfig.plugins,
        copy({
          files: ['images/**/*', 'manifest.webmanifest'],
          dest: DIST_FOLDER,
          options: { parents: true }
        })
      ]
    };
  }

  return defaultConfig;
});
