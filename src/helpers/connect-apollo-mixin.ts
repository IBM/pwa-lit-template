/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit-element';

import type {
  ApolloClient,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions
} from '@apollo/client/core';

// eslint-disable-next-line @typescript-eslint/ban-types
type Constructor<T = object> = new (...args: any[]) => T;

export const ConnectApolloMixin = <QT = any, QTVariables = OperationVariables>(
  client: ApolloClient<NormalizedCacheObject>
) => <T extends Constructor<HTMLElement>>(base: T) => {
  class ConnectApollo extends base {
    @property({ type: Boolean })
    loading = false;

    @property({ type: Object })
    data?: QT;

    async useQuery(options: QueryOptions<QTVariables>) {
      this.loading = true;

      const queryResult = await client.query<QT, QTVariables>(options);

      this.loading = queryResult.loading;
      this.data = queryResult.data;

      return queryResult;
    }
  }

  return ConnectApollo;
};
