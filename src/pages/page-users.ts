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
    let users;
    let areMoreUsers = false;

    if (this.data.usersConnection) {
      users = this.data.usersConnection.values;

      const currentCount = this.data.usersConnection.values.length;
      const totalCount = this.data.usersConnection.aggregate.count;
      areMoreUsers = currentCount < totalCount;
    }

    // prettier-ignore
    return html`
      <section>
        <h1>Users</h1>

        ${users ? html`
          <ul>
            ${users.map((user: any) => html`
              <li>
                <a href="/user/${user.id}">${user.username}</a>
              </li>
            `)}
          </ul>
        ` : null}

        ${this.loading ? html`
          <div>Loading users...</div>
        ` : null}

        ${users && !this.loading && areMoreUsers ? html`
          <button @click=${this.loadMoreUsers}>Load more...</button>
        ` : null}
      </section>
    `;
  }

  protected loadMoreUsers() {
    const currentUsersCount = this.data.usersConnection.values.length;

    this.fetchMore({
      variables: { start: currentUsersCount },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        return {
          usersConnection: {
            ...previousQueryResult.usersConnection,
            aggregate: {
              ...previousQueryResult.usersConnection.aggregate,
              ...fetchMoreResult.usersConnection.aggregate
            },
            values: [
              ...previousQueryResult.usersConnection.values,
              ...fetchMoreResult.usersConnection.values
            ]
          }
        };
      }
    });
  }
}
