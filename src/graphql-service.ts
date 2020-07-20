/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
export { gql } from '@apollo/client/core';

import { ConnectApolloMixin } from './helpers/connect-apollo-mixin';
import type { Constructor } from './helpers/connect-apollo-mixin';

import { config } from './config';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: config.apiUrl
});

export const ConnectApollo = <QT, QTVariables>(
  base: Constructor<HTMLElement>
) => ConnectApolloMixin<QT, QTVariables>(client)(base);
