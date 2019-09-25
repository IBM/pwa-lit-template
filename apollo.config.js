/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

module.exports = {
  client: {
    service: {
      name: 'graphql-service',
      // TODO: Can we get this URL from `src/config/`?
      url: 'http://localhost:1337/graphql'
    }
  }
};
