/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, customElement, property } from 'lit-element';

import type { BeforeEnterObserver } from '@vaadin/router';
import type { QueryOptions, OperationVariables } from '@apollo/client/core';
import type { GetUsers, GetUsersVariables } from '@types-graphql/GetUsers';

import { client, gql } from '../graphql-service';
import { PageElement } from '../helpers/page-element';

const GET_USERS = gql`
  query GetUsers($limit: Int, $start: Int) {
    users(limit: $limit, start: $start) {
      id
      username
    }
  }
`;

@customElement('page-users')
export class PageUsers extends PageElement implements BeforeEnterObserver {
  @property({ type: Boolean })
  protected loading = false;

  @property({ type: Object })
  protected data?: GetUsers;

  protected useQuery<T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables>
  ) {
    return client.query<T, TVariables>(options);
  }

  onBeforeEnter() {
    this.queryUsers();
  }

  private async queryUsers() {
    const queryResult = await this.useQuery<GetUsers, GetUsersVariables>({
      query: GET_USERS,
      variables: { limit: 20 }
    });

    this.loading = queryResult.loading;
    this.data = queryResult.data;
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    ul {
      padding-left: 1rem;
    }
  `;

  private renderPlaceholder() {
    return html`<div class="loading">Loading...</div>`;
  }

  private renderEmpty() {
    return html`<div class="empty">Nothing found!</div>`;
  }

  private renderUsers() {
    const users = this.data?.users;

    if (!users && this.loading) {
      return this.renderPlaceholder();
    }
    if (!users?.length) {
      return this.renderEmpty();
    }

    return html`
      <ul>
        ${users.map(
          (user) => html`
            <li>
              ${user.username}
            </li>
          `
        )}
      </ul>
    `;
  }

  render() {
    return html`
      <section>
        <h1>Users</h1>

        ${this.renderUsers()}
      </section>
    `;
  }
}
