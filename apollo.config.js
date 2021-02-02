/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO: Can we get this URL from `src/config.ts`?
const apiUrl = 'https://strapi-demo-staging.mybluemix.net/graphql';

module.exports = {
  client: {
    includes: ['src/**/*'],
    service: {
      name: 'client-service',
      url: apiUrl
    }
  }
};
