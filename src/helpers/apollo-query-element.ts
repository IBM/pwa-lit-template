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
  }

  private __mutationVariables: OperationVariables | undefined;
  public get mutationVariables(): OperationVariables | undefined {
    return this.__mutationVariables;
  }
  public set mutationVariables(value: OperationVariables | undefined) {
    this.__mutationVariables = value;
  }

  private observableQuery: ObservableQuery | undefined;

  private subscriptionQuery: ZenObservable.Subscription | undefined;

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

  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }

    this.subscriptionQuery && this.subscriptionQuery.unsubscribe();
  }

  private queryHandler({ data, loading, networkStatus, stale }: any) {
    this.data = data;
    this.loading = loading;
    this.networkStatus = networkStatus;
    this.stale = stale;
  }

  private errorHandler({ graphQLErrors, networkError }: any) {
    this.loading = false;
    console.error(networkError); // TODO handle network error
    this.errors = graphQLErrors.length ? graphQLErrors : undefined;
  }

  public async requestQuery() {
    if (!this.client || !this.query) return;

    this.observableQuery = await this.client.watchQuery({
      query: this.query,
      ...(this.queryVariables && { variables: this.queryVariables })
    });

    this.subscriptionQuery = await this.observableQuery.subscribe({
      next: this.queryHandler.bind(this),
      error: this.errorHandler.bind(this)
    });

    return this.subscriptionQuery;
  }

  public async refetch() {
    if (this.observableQuery) {
      await this.observableQuery.refetch();
    }
  }

  public async requestMutation(
    {
      mutation = this.mutation,
      mutationVariables = this.mutationVariables,
      ...options
    } = this
  ) {
    if (!mutation || !mutationVariables) return;

    try {
      const response = await this.client.mutate({
        mutation,
        variables: mutationVariables,
        ...options
      });

      await this.refetch();

      return response;
    } catch (error) {
      this.errorHandler(error);
      return error;
    }
  }
}
