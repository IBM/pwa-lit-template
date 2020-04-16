/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, property, css } from 'lit-element';

import { RouterLocation, BeforeEnterObserver } from '@vaadin/router';
import {
  GetUsersWithPagination,
  GetUsersWithPaginationVariables,
  GetUsersWithPagination_usersConnection_values as User
} from '@graphql-types/GetUsersWithPagination';

import { PageElement } from './page-element';
import { client, gql } from '../graphql-service';
import { connectApollo } from '../helpers/connect-apollo-mixin';

import '../components/my-pagination';

const GET_USERS_WITH_PAGINATION = gql`
  query GetUsersWithPagination($limit: Int, $offset: Int) {
    usersConnection(limit: $limit, start: $offset) {
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

@customElement('page-users-pagination')
export class PagePaginationExample
  extends connectApollo<
    GetUsersWithPagination,
    GetUsersWithPaginationVariables
  >(client)(PageElement)
  implements BeforeEnterObserver {
  @property({ type: Number })
  public limit = 10;

  @property({ type: Number })
  public offset = 0;

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `
    ];
  }

  onBeforeEnter(location: RouterLocation) {
    const searchParams = new URLSearchParams(location.search);
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');

    this.limit = limitParam ? parseInt(limitParam) : 10;
    this.offset = offsetParam ? parseInt(offsetParam) : 0;

    this.watchQuery({
      query: GET_USERS_WITH_PAGINATION,
      variables: {
        limit: this.limit,
        offset: this.offset
      }
    });
  }

  protected render() {
    let users;
    let totalCount;

    if (this.data.usersConnection) {
      users = this.data.usersConnection.values as User[];
      totalCount = this.data.usersConnection.aggregate!.count!;
    }

    // prettier-ignore
    return html`
      <section>
        <h1>Users</h1>

        ${users ? html`
          <ul>
            ${users.map(user => html`
              <li>
                <a href="/user/${user.id}">${user.username}</a>
              </li>
            `)}
          </ul>
        ` : null}

        ${this.loading ? html`
          <div>Loading users...</div>
        ` : null}

        ${users && totalCount ? html`
          <my-pagination
              @update-query-event=${this.loadMoreUsers}
              limit=${this.limit}
              total=${totalCount}
              offset=${this.offset}>
          </my-pagination>
        ` : null}
      </section>
    `;
  }

  private loadMoreUsers(event: CustomEvent) {
    const limit = event.detail.limit;
    const offset = event.detail.offset;

    this.fetchMore({
      variables: { limit, offset },
      updateQuery: (_previousQueryResult, { fetchMoreResult }) => {
        this.offset = offset;
        this.limit = limit;

        return fetchMoreResult as GetUsersWithPagination;
      }
    });
  }
}
