/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import replace from '@rollup/plugin-replace';

const ENVIRONMENT = process.env.NODE_ENV || 'development';

export default {
  appIndex: 'index.html',
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true }),
    fromRollup(replace)({
      include: 'src/config/index.ts',
      'config.development': `config.${ENVIRONMENT}`
    })
  ]
};
