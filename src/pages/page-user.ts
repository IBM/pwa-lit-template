/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { html, customElement, query } from 'lit-element';

import { GetUser, GetUserVariables } from '@graphql-types/GetUser';
import {
  UpdateUserUsername,
  UpdateUserUsernameVariables
} from '@graphql-types/UpdateUserUsername';

import config from '../config';
import { PageElement } from './page-element';
import { client, gql } from '../graphql-service';
import { connectApollo } from '../helpers/connect-apollo-mixin';
import { renderPageNotFound } from '../helpers/render-page-not-found';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      fullName
    }
  }
`;

const UPDATE_USER_USERNAME = gql`
  mutation UpdateUserUsername($id: ID!, $fullName: String!) {
    updateUser(input: { where: { id: $id }, data: { fullName: $fullName } }) {
      user {
        fullName
      }
    }
  }
`;

@customElement('page-user')
export class PageUser extends connectApollo<
  GetUser,
  GetUserVariables,
  UpdateUserUsername,
  UpdateUserUsernameVariables
>(client)(PageElement) {
  @query('#form')
  private form!: HTMLFormElement;

  protected render() {
    const user = this.data.user;

    if (user === undefined && !this.loading) {
      return renderPageNotFound();
    }

    // prettier-ignore
    return html`
      <section>
        <h1>User</h1>

        <p>ID: ${user && user.id}</p>
        <p>Username: ${user && user.username}</p>
        <p>Full name: ${user && user.fullName}</p>

        ${this.loading ? html`
          <div>Loading user...</div>
        ` : null}

        ${user ? html`
          <form id="form" @submit=${this.updateUser}>
            <label for="fullName">New full name:</label>
            <input id="fullName" name="fullName" type="text" />
            <input type="submit" value="Update" />
          </form>
        ` : null}
      </section>
    `;
  }

  protected onBeforeEnter(location: Router.Location) {
    const { userId } = location.params;

    this.query({
      query: GET_USER,
      variables: { id: userId as string }
    });
  }

  protected updateUser(event: Event) {
    event.preventDefault();

    const formData = new FormData(this.form);
    const newUsername = formData.get('fullName') as string;
    const userId = this.data.user!.id;

    this.mutate({
      mutation: UPDATE_USER_USERNAME,
      variables: { id: userId, fullName: newUsername },
      update: (cache, fetchResult) => {
        const updatedUser = fetchResult.data!.updateUser!.user!;

        try {
          const cachedData = cache.readQuery<GetUser, GetUserVariables>({
            query: GET_USER,
            variables: { id: userId }
          });

          if (cachedData?.user) {
            cachedData.user.fullName = updatedUser.fullName;
          }

          cache.writeQuery({
            query: GET_USER,
            variables: { id: userId },
            data: cachedData
          });
        } catch (error) {
          // TODO: Manage the errors
          console.error(error);
        }

        this.form.reset();

        // TODO: Can we move this inside the mixin?
        this.loading = false;
      }
    });
  }

  protected updateMetadata() {
    const user = this.data.user;

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
