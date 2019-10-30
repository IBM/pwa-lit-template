/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { property } from 'lit-element';
import {
  ApolloClient,
  NetworkStatus,
  QueryOptions,
  ObservableQuery,
  OperationVariables,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  FetchMoreOptions,
  MutationOptions,
  FetchResult
} from 'apollo-boost';
import { GraphQLError } from 'graphql';

type Constructor<T> = new (...args: any[]) => T;

interface CustomElement extends HTMLElement {
  disconnectedCallback(): void;
}

type TData = any;
type TVariables = OperationVariables;

export const connectApollo = (client: ApolloClient<unknown>) => <
  T extends Constructor<CustomElement>
>(
  baseElement: T
) => {
  class ApolloQueryElement extends baseElement {
    // TODO: Make protected?
    _query?: ApolloQueryResult<any>;

    // TODO: Make protected?
    _watchQuery?: ObservableQuery<any, OperationVariables>;

    // TODO: Make protected?
    _watchQuerySubscription?: ZenObservable.Subscription;

    // TODO: Make protected?
    _mutation?: FetchResult<any, Record<string, any>, Record<string, any>>;

    @property({ type: Object })
    public data?: any;

    @property({ type: Array })
    public errors?: readonly GraphQLError[];

    @property({ type: Boolean })
    public loading = false;

    @property({ type: Number })
    public networkStatus?: NetworkStatus;

    @property({ type: Boolean })
    public stale?: boolean;

    // TODO: Make protected?
    _onSuccessQuery(queryResult: ApolloQueryResult<any>) {
      this.data = queryResult.data;
      this.errors = queryResult.errors;
      this.loading = queryResult.loading;
      this.networkStatus = queryResult.networkStatus;
      this.stale = queryResult.stale;
    }

    // TODO: Make protected?
    // TODO: Manage the errors
    _onErrorQuery(error: any) {
      this.loading = false;
      console.error('requestQuery error:', error);
    }

    public async query(options: QueryOptions) {
      try {
        this.loading = true;

        this._query = await client.query(options);
        this._onSuccessQuery(this._query);
      } catch (error) {
        this._onErrorQuery(error);
      }
    }

    public watchQuery(options: QueryOptions) {
      this.loading = true;

      this._watchQuery = client.watchQuery(options);

      this._watchQuerySubscription = this._watchQuery.subscribe({
        next: queryResult => this._onSuccessQuery(queryResult),
        error: error => this._onErrorQuery(error)
      });
    }

    public fetchMore<K extends keyof TVariables>(
      fetchMoreOptions: FetchMoreQueryOptions<TVariables, K> &
        FetchMoreOptions<TData, TVariables>
    ) {
      if (!this._watchQuery) {
        console.warn('You need to run fetchMore() before running watchQuery()');
        return;
      }

      this.loading = true;

      this._watchQuery.fetchMore(fetchMoreOptions);
    }

    public disconnectedCallback() {
      this._watchQuerySubscription &&
        this._watchQuerySubscription.unsubscribe();

      super.disconnectedCallback();
    }

    public async mutate(options: MutationOptions<any, OperationVariables>) {
      try {
        this.loading = true;

        this._mutation = await client.mutate(options);
      } catch (error) {
        this._onErrorQuery(error);
      }
    }
  }

  return ApolloQueryElement;
};
