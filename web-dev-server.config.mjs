/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import replace from '@rollup/plugin-replace';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';

export default {
  appIndex: 'index.html',
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true }),
    ...(process.env.NODE_ENV
      ? [
          fromRollup(replace)({
            preventAssignment: true,
            include: 'src/**/*.ts',
            exclude: 'src/config.*.ts',
            delimiters: ['', ''],
            values: {
              './config': `./config.${process.env.NODE_ENV}`,
            },
          }),
        ]
      : []),
  ],
};
