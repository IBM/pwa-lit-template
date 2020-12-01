/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import rollupDotenv from 'rollup-plugin-dotenv';

const dotenv = fromRollup(rollupDotenv.default);

export default {
  appIndex: 'index.html',
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true }),
    dotenv()
  ]
};
