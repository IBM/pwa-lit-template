/**
 * Copyright (c) IBM, Corp.
 */

// TODO: Can we get this URL from `src/config`?
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
