/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit-element';
import type {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
  WatchQueryOptions,
  FetchMoreQueryOptions,
  FetchMoreOptions,
  ObservableQuery
} from '@apollo/client/core';

declare global {
  interface HTMLElement {
    disconnectedCallback(): void;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Constructor<T = object> = new (...args: any[]) => T;

export const ConnectApolloMixin = <TQ = any, TQVariables = OperationVariables>(
  client: ApolloClient<NormalizedCacheObject>
) => <T extends Constructor<HTMLElement>>(base: T) => {
  class ConnectApollo extends base {
    // TODO: Ideally this should be protected
    client = client;

    // TODO: Ideally this should be protected
    @property({ type: Boolean })
    loading = false;

    // TODO: Ideally this should be protected
    @property({ type: Object })
    data?: ApolloQueryResult<TQ>['data'];

    // TODO: Ideally this should be private
    watchQuery?: ObservableQuery<TQ, TQVariables>;

    // TODO: Ideally this should be private
    watchQuerySubscription?: ZenObservable.Subscription;

    processQueryResult(queryResult: ApolloQueryResult<TQ>) {
      this.loading = queryResult.loading;
      this.data = queryResult.data;
    }

    // TODO: Ideally this should be protected
    async useQuery(options: QueryOptions<TQVariables>) {
      this.loading = true;

      const queryResult = await this.client.query<TQ, TQVariables>(options);

      this.processQueryResult(queryResult);

      return queryResult;
    }

    // TODO: Ideally this should be protected
    useWatchQuery(options: WatchQueryOptions<TQVariables>) {
      this.loading = true;

      this.watchQuery = this.client.watchQuery<TQ, TQVariables>(options);

      this.watchQuerySubscription = this.watchQuery.subscribe({
        next: (queryResult) => {
          this.processQueryResult(queryResult);
        }
      });
    }

    // TODO: Ideally this should be protected
    async fetchMore<K extends keyof TQVariables>(
      fetchMoreOptions: FetchMoreQueryOptions<TQVariables, K> &
        FetchMoreOptions<TQ, TQVariables>
    ): Promise<ApolloQueryResult<TQ> | void> {
      if (!this.watchQuery) {
        console.warn('You need to run fetchMore() before running watchQuery()');
        return;
      }

      this.loading = true;

      const queryResult = await this.watchQuery.fetchMore<K>(fetchMoreOptions);

      this.loading = false;

      return queryResult;
    }

    disconnectedCallback() {
      this.watchQuerySubscription?.unsubscribe();

      super.disconnectedCallback();
    }
  }

  return ConnectApollo;
};
