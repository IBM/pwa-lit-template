/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, property } from 'lit-element';
import { ApolloClient, NetworkStatus } from 'apollo-boost';
import { GraphQLError } from 'graphql';

import { client } from '../graphql-service';

export class ApolloQueryElement extends LitElement {
  public client: ApolloClient<unknown> = client;

  @property({ type: Object })
  public query?: any;

  @property({ type: Object })
  public data?: any;

  @property({ type: Array })
  public errors?: readonly GraphQLError[];

  @property({ type: Boolean })
  public loading = true;

  @property({ type: Number })
  public networkStatus?: NetworkStatus;

  @property({ type: Boolean })
  public stale?: boolean;

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this.requestQuery();
  }

  public async requestQuery() {
    try {
      const queryResult = await client.query({ query: this.query });

      this.data = queryResult.data;
      this.errors = queryResult.errors;
      this.loading = queryResult.loading;
      this.networkStatus = queryResult.networkStatus;
      this.stale = queryResult.stale;
    } catch (error) {
      // TODO
      console.log(error);
    }
  }
}
