/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_usersConnection_aggregate {
  __typename: "UsersPermissionsUserAggregator";
  count: number | null;
}

export interface GetUsers_usersConnection_values {
  __typename: "UsersPermissionsUser";
  id: string;
  username: string;
}

export interface GetUsers_usersConnection {
  __typename: "UsersPermissionsUserConnection";
  aggregate: GetUsers_usersConnection_aggregate | null;
  values: (GetUsers_usersConnection_values | null)[] | null;
}

export interface GetUsers {
  usersConnection: GetUsers_usersConnection | null;
}

export interface GetUsersVariables {
  limit?: number | null;
  start?: number | null;
}
