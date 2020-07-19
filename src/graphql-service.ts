/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

import { config } from './config';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: config.apiUrl
});

export { client, gql };
