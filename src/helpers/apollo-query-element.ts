/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, property } from 'lit-element';
import {
  ApolloClient,
  NetworkStatus,
  OperationVariables,
  ObservableQuery
} from 'apollo-boost';
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

  private __mutation: DocumentNode | undefined;
  public get mutation(): DocumentNode | undefined {
    return this.__mutation;
  }
  public set mutation(value: DocumentNode | undefined) {
    this.__mutation = value;
    this.requestMutation();
  }

  private __mutationVariables: OperationVariables | undefined;
  public get mutationVariables(): OperationVariables | undefined {
    return this.__mutationVariables;
  }
  public set mutationVariables(value: OperationVariables | undefined) {
    this.__mutationVariables = value;
    this.requestMutation();
  }

  private __observableQuery: ObservableQuery | undefined;
  public get observableQuery(): ObservableQuery | undefined {
    return this.__observableQuery;
  }
  public set observableQuery(value: ObservableQuery | undefined) {
    this.__observableQuery = value;
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

  public async refetch() {
    if (this.observableQuery) {
      await this.observableQuery.refetch();
    }
  }

  public async requestQuery() {
    try {
      this.observableQuery = await this.client.watchQuery({
        query: this.query,
        ...(this.queryVariables && { variables: this.queryVariables })
      });

      await this.observableQuery.subscribe(
        ({ data, loading, errors, networkStatus, stale }) => {
          this.data = data;
          this.errors = errors;
          this.loading = loading;
          this.networkStatus = networkStatus;
          this.stale = stale;
        }
      );
    } catch (error) {
      // TODO
      console.log(error);
    }
  }

  public async requestMutation() {
    if (!this.mutation || !this.mutationVariables) return;
    try {
      await this.client.mutate({
        mutation: this.mutation,
        ...(this.mutationVariables && { variables: this.mutationVariables })
      });

      await this.refetch();
    } catch (error) {
      // TODO
      console.error(error);
    }
  }
}
