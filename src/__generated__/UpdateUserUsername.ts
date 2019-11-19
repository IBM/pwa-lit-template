/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserUsername
// ====================================================

export interface UpdateUserUsername_updateUser_user {
  __typename: "UsersPermissionsUser";
  fullName: string | null;
}

export interface UpdateUserUsername_updateUser {
  __typename: "updateUserPayload";
  user: UpdateUserUsername_updateUser_user | null;
}

export interface UpdateUserUsername {
  /**
   * Update an existing user
   */
  updateUser: UpdateUserUsername_updateUser | null;
}

export interface UpdateUserUsernameVariables {
  id: string;
  fullName: string;
}
