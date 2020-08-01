/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, customElement } from 'lit-element';
import type { BeforeEnterObserver, RouterLocation } from '@vaadin/router';

import { ConnectApollo, gql } from '../graphql-service';
import { PageElement } from '../helpers/page-element';

import type { GetUser, GetUserVariables } from '@types-graphql/GetUser';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
    }
  }
`;

@customElement('page-user')
export class PageUser
  extends ConnectApollo<GetUser, GetUserVariables>()(PageElement)
  implements BeforeEnterObserver {
  onBeforeEnter(location: RouterLocation) {
    this.useQuery({
      query: GET_USER,
      variables: { id: location.params.id as string }
    });
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `;

  private renderPlaceholder() {
    return html`<div class="loading">Loading...</div>`;
  }

  private renderEmpty() {
    return html`<div class="empty">Nothing found!</div>`;
  }

  private renderUser() {
    const user = this.data?.user;

    if (!user && this.loading) {
      return this.renderPlaceholder();
    }
    if (!user) {
      return this.renderEmpty();
    }

    return html`
      <p>ID: ${user.id}</p>
      <p>Username: ${user.username}</p>
    `;
  }

  render() {
    return html`
      <section>
        <h1>User</h1>

        ${this.renderUser()}
      </section>
    `;
  }

  metadata() {
    const user = this.data?.user;

    if (!user) {
      return;
    }

    return {
      title: `${user.username}`,
      description: `All the information about ${user.username}.`
    };
  }
}
