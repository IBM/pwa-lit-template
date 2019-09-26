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
  private __client: ApolloClient<unknown>;
  public get client(): ApolloClient<unknown> {
    return this.__client;
  }
  public set client(value: ApolloClient<unknown>) {
    this.__client = value;
    this.requestQuery();
  }

  private __query: DocumentNode;
  public get query(): DocumentNode {
    return this.__query;
  }
  public set query(value: DocumentNode) {
    this.__query = value;
    this.requestQuery();
  }

  private __queryVariables: OperationVariables | undefined;
  public get queryVariables(): OperationVariables | undefined {
    return this.__queryVariables;
  }
  public set queryVariables(value: OperationVariables | undefined) {
    this.__queryVariables = value;
    this.requestQuery();
  }

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

  public constructor(
    client: ApolloClient<unknown>,
    query: DocumentNode,
    queryVariables?: OperationVariables
  ) {
    super();

    this.__client = client;

    this.__query = query;

    if (queryVariables) {
      this.__queryVariables = queryVariables;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this.requestQuery();
  }

  public async requestQuery() {
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
