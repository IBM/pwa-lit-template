/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import replace from '@rollup/plugin-replace';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  appIndex: 'index.html',
  nodeResolve: {
    exportConditions: ['development'],
  },
  plugins: [
    esbuildPlugin({ ts: true }),
    ...(NODE_ENV !== 'development'
      ? [
          fromRollup(replace)({
            preventAssignment: true,
            include: 'src/**/*.ts',
            exclude: 'src/config.*.ts',
            delimiters: ['', ''],
            values: {
              './config.js': `./config.${NODE_ENV}.js`,
            },
          }),
        ]
      : []),
  ],
};
