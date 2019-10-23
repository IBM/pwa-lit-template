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
import { connectApollo } from '../helpers';

const GET_USER = gql`
  query GetUser($where: JSON) {
    users(where: $where) {
      username
      name
      profilePicture {
        url
      }
    }
  }
`;

@customElement('page-user')
export class PageUser extends connectApollo(client)(PageElement) {
  protected render() {
    const user = this.data && this.data.users[0];

    // prettier-ignore
    return html`
      <section>
        <h1>User</h1>

        ${this.loading ? html`
          <div>Loading user...</div>
        ` : !this.loading && this.data ? html`
          <p>Username: ${user.username}</p>
          <p>Name: ${user.name}</p>
        ` : null}
      </section>
    `;
  }

  protected onAfterEnter(location: Router.Location) {
    this.requestQuery({
      query: GET_USER,
      variables: {
        where: {
          username: location.params.username
        }
      }
    });
  }

  protected shouldUpdate() {
    const user = this.data && this.data.users[0];

    if (user === undefined && !this.loading) {
      // TODO: Show page-not-found element
      return false;
    }

    return true;
  }

  protected updateMetadata() {
    const user = this.data && this.data.users[0];

    if (!user) {
      return;
    }

    return {
      title: `${user.name} (@${user.username}) | ${config.name}`,
      description: `All the information about ${user.name}.`,
      image: {
        url: user.profilePicture && user.profilePicture.url,
        alt: `${user.name}'s profile picture`,
        width: '256',
        height: '256'
      },
      url: window.location.href
    };
  }
}
