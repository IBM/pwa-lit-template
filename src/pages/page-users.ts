/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';

import { PageElement } from './page-element';
import { client, gql } from '../graphql-service';
import { connectApollo } from '../helpers';

const GET_USERS = gql`
  query GetUsers($limit: Int, $start: Int) {
    users(limit: $limit, start: $start) {
      username
    }
  }
`;

@customElement('page-users')
export class PageUsers extends connectApollo(client)(PageElement) {
  protected onBeforeEnter() {
    this.watchQuery({
      query: GET_USERS,
      variables: {
        limit: 10
      }
    });
  }

  protected render() {
    const users = this.data && this.data.users;

    // prettier-ignore
    return html`
      <section>
        <h1>Users</h1>

        ${users ? html`
          <ul>
            ${users.map((user: any) => html`
              <li>
                <a href="/user/${user.username}">${user.username}</a>
              </li>
            `)}
          </ul>
        ` : null}

        ${this.loading ? html`
          <div>Loading users...</div>
        ` : null}

        ${users ? html`
          <button @click=${this.loadMoreUsers}>Load more...</button>
        ` : null}
      </section>
    `;
  }

  protected loadMoreUsers() {
    const currentUsersCount = this.data.users.length;

    this.fetchMore({
      variables: { start: currentUsersCount },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        return {
          users: [...previousQueryResult.users, ...fetchMoreResult.users]
        };
      }
    });
  }
}
