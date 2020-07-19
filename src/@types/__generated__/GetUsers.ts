/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users {
  __typename: "UsersPermissionsUser";
  id: string;
  username: string;
}

export interface GetUsers {
  users: GetUsers_users[];
}

export interface GetUsersVariables {
  limit?: number | null;
  start?: number | null;
}
