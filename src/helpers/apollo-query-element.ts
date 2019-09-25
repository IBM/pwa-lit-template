/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, property } from 'lit-element';
import { ApolloClient, NetworkStatus, OperationVariables } from 'apollo-boost';
import { GraphQLError, DocumentNode } from 'graphql';

export class ApolloQueryElement extends LitElement {
  public client: ApolloClient<unknown> | undefined;

  public query: DocumentNode | undefined;

  public queryVariables?: OperationVariables;

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
    if (!this.client) {
      console.error('You need to have a client set up.');
      return;
    }

    if (!this.query) {
      console.error('You need to have a query set up.');
      return;
    }

    try {
      const queryResult = await this.client.query({
        query: this.query,
        ...(this.queryVariables && { variables: this.queryVariables })
      });

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
