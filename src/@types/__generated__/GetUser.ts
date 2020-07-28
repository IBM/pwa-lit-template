/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  __typename: "UsersPermissionsUser";
  id: string;
  username: string;
}

export interface GetUser {
  user: GetUser_user | null;
}

export interface GetUserVariables {
  id: string;
}
