/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { config as environmentConfig } from './config.development';

const sharedConfig = {
  name: 'MyApplication',
  description: 'MyApplication description'
};

export const config = {
  ...sharedConfig,
  ...environmentConfig
};
