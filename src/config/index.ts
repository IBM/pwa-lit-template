/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import environmentConfig from './config.development';

export const config = {
  appName: 'MyApplication',
  appDescription: 'MyApplication description',
  ...environmentConfig
};
