/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { property } from 'lit-element';
import { ApolloClient, NetworkStatus, QueryOptions } from 'apollo-boost';
import { GraphQLError } from 'graphql';

type Constructor<T> = new (...args: any[]) => T;

export const connectApollo = (client: ApolloClient<unknown>) => <
  T extends Constructor<HTMLElement>
>(
  baseElement: T
) => {
  class ApolloQueryElement extends baseElement {
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

    public async requestQuery(options: QueryOptions) {
      try {
        this.loading = true;
        const queryResult = await client.query(options);

        this.data = queryResult.data;
        this.errors = queryResult.errors;
        this.loading = queryResult.loading;
        this.networkStatus = queryResult.networkStatus;
        this.stale = queryResult.stale;
      } catch (error) {
        // TODO: Manage the errors
        console.error('requestQuery error:', error);
        this.loading = false;
      }
    }
  }

  return ApolloQueryElement;
};
