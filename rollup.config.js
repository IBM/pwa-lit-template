/**
 * Copyright (c) Abdón Rodríguez Davila and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { createCompatibilityConfig } from '@open-wc/building-rollup';

const configs = createCompatibilityConfig({
  input: './index.html',
  extensions: ['.js', '.ts']
});

export default configs;
