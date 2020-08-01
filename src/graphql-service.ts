/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import type { OperationVariables } from '@apollo/client/core';
export { gql } from '@apollo/client/core';

import { config } from './config';
import { ConnectApolloMixin } from './helpers/connect-apollo-mixin';
import type { Constructor } from './helpers/connect-apollo-mixin';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: config.apiUrl
});

export const ConnectApollo = <TQ = any, TQVariables = OperationVariables>() => <
  T extends Constructor<HTMLElement>
>(
  base: T
) => ConnectApolloMixin<TQ, TQVariables>(client)(base);
