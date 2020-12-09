/**
 * Copyright (c) IBM, Corp.
 */

// TODO: Can we get this URL from `src/config`?
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
