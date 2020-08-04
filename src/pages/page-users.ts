/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, customElement } from 'lit-element';
import type { BeforeEnterObserver } from '@vaadin/router';

import { ConnectApollo, gql } from '../graphql-service';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';

import type { GetUsers, GetUsersVariables } from '@types-graphql/GetUsers';

const GET_USERS = gql`
  query GetUsers($limit: Int, $start: Int) {
    usersConnection(limit: $limit, start: $start) {
      aggregate {
        count
      }
      values {
        id
        username
      }
    }
  }
`;

@customElement('page-users')
export class PageUsers
  extends ConnectApollo<GetUsers, GetUsersVariables>()(PageElement)
  implements BeforeEnterObserver {
  onBeforeEnter() {
    this.useWatchQuery({
      query: GET_USERS,
      variables: { limit: 2 }
    });
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

  private loadMoreUsers() {
    const start = this.data!.usersConnection.values.length;

    this.fetchMore({
      variables: { start }
    });
  }

  private renderLoadingButton() {
    const currentCount = this.data!.usersConnection.values.length;
    const totalCount = this.data!.usersConnection.aggregate.count;
    const areMoreUsers = currentCount < totalCount;

    if (!this.loading && areMoreUsers) {
      return html`<button @click=${this.loadMoreUsers}>Load more</button>`;
    }

    if (this.loading) {
      return html`<button disabled>Loading...</button>`;
    }

    return '';
  }

  private renderUsers() {
    const users = this.data?.usersConnection.values;

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
              <a href="${urlForName('user', { id: user.id })}">
                ${user.username}
              </a>
            </li>
          `
        )}
      </ul>

      ${this.renderLoadingButton()}
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
