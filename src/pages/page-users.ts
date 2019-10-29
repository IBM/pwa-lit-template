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
  query GetUsers($limit: Int = 20, $start: Int) {
    users(limit: $limit, start: $start) {
      username
    }
  }
`;

@customElement('page-users')
export class PageUsers extends connectApollo(client)(PageElement) {
  protected render() {
    // prettier-ignore
    return html`
      <section>
        <h1>Users</h1>

        ${this.data && this.data.users ? html`
          <ul>
            ${this.data.users.map((user: any) => html`
              <li>
                <a href="/user/${user.username}">${user.username}</a>
              </li>
            `)}
          </ul>
        ` : null}

        ${this.loading ? html`
          <div>Loading users...</div>
        ` : null}
      </section>
    `;
  }

  protected onBeforeEnter() {
    this.query({
      query: GET_USERS
    });
  }
}
