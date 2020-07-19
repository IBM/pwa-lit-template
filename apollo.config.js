/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO: Can we get this URL from `src/config/`?
const apiUrl = 'http://localhost:1337/graphql';

module.exports = {
  client: {
    includes: ['src/**/*'],
    service: {
      name: 'client-service',
      url: apiUrl
    }
  }
};
