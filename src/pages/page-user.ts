/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';

import config from '../config';
import { PageElement } from './page-element';
import { client, gql } from '../graphql-service';
import { connectApollo, renderPageNotFound } from '../helpers';

const GET_USER = gql`
  query GetUser($where: JSON) {
    users(where: $where) {
      username
      fullName
    }
  }
`;

@customElement('page-user')
export class PageUser extends connectApollo(client)(PageElement) {
  protected render() {
    const user = this.data && this.data.users[0];

    if (user === undefined && !this.loading) {
      return renderPageNotFound();
    }

    // prettier-ignore
    return html`
      <section>
        <h1>User</h1>

        ${this.loading ? html`
          <div>Loading user...</div>
        ` : !this.loading && this.data ? html`
          <p>Username: ${user.username}</p>
          <p>Full name: ${user.fullName}</p>
        ` : null}
      </section>
    `;
  }

  protected onBeforeEnter(location: Router.Location) {
    this.requestQuery({
      query: GET_USER,
      variables: {
        where: {
          username: location.params.username
        }
      }
    });
  }

  protected updateMetadata() {
    const user = this.data && this.data.users[0];

    if (!user) {
      return;
    }

    return {
      title: `${user.fullName} (@${user.username}) | ${config.name}`,
      description: `All the information about ${user.fullName}.`,
      url: window.location.href
    };
  }
}
