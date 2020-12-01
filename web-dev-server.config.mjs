/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { esbuildPlugin } from '@web/dev-server-esbuild';
import { injectEnvVariablesToWindowPlugin } from './inject-env-variables-to-window.mjs';

export default {
  appIndex: 'index.html',
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true }),
    injectEnvVariablesToWindowPlugin()
  ]
};
