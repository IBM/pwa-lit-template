/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

import config from '../config';

const cache = new InMemoryCache();
const link = new HttpLink({ uri: config.apiUrl });
const client = new ApolloClient({ cache, link });

export { client, gql };
