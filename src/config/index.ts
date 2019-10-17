/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import config from './development';

const sharedConfig = {
  name: 'MyApplication',
  apiUrl: 'http://localhost:1337/graphql'
};

export default {
  ...sharedConfig,
  ...config
};
