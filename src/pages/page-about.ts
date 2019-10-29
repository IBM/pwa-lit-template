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

const USER_ID = 1;

@customElement('page-about')
export class PageAbout extends connectApollo(client)(PageElement) {
  protected render() {
    return html`
      <section>
        <h1>About</h1>

        ${this.loading
          ? html`
              <div>Loading user with id 1...</div>
            `
          : !this.loading && this.data
          ? html`
              <ul>
                <li>${this.data.user.username}</li>
              </ul>
            `
          : null}

        <form id="form" @submit="${this.updateUser}">
          <label for="username">New username:</label>
          <input id="username" name="username" type="text" />
          <input type="submit" value="Modify" />
        </form>
      </section>
    `;
  }

  protected onBeforeEnter() {
    this.watchQuery({
      query: gql`
        query GetUser {
          user(id: "${USER_ID}") {
            username
          }
        }
      `
    });
  }

  protected async updateUser(e: Event) {
    e.preventDefault();

    const form =
      this.shadowRoot &&
      (this.shadowRoot.getElementById('form') as HTMLFormElement | undefined);
    if (form) {
      const formData = new FormData(form);
      const username = formData.get('username');

      await this.mutate({
        mutation: gql`
          mutation updateUserMutation($id: ID!, $username: String!) {
            updateUser(
              input: { where: { id: $id }, data: { username: $username } }
            ) {
              user {
                username
              }
            }
          }
        `,
        variables: { id: USER_ID, username }
      });
    }
  }
}
