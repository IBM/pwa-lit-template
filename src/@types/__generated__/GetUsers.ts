/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_usersConnection_aggregate {
  __typename: "UsersPermissionsUserAggregator";
  count: number;
}

export interface GetUsers_usersConnection_values {
  __typename: "UsersPermissionsUser";
  id: string;
  username: string;
}

export interface GetUsers_usersConnection {
  __typename: "UsersPermissionsUserConnection";
  aggregate: GetUsers_usersConnection_aggregate;
  values: GetUsers_usersConnection_values[];
}

export interface GetUsers {
  usersConnection: GetUsers_usersConnection;
}

export interface GetUsersVariables {
  limit?: number | null;
  start?: number | null;
}
