/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsersWithPagination
// ====================================================

export interface GetUsersWithPagination_usersConnection_aggregate {
  __typename: "UsersPermissionsUserAggregator";
  count: number | null;
}

export interface GetUsersWithPagination_usersConnection_values {
  __typename: "UsersPermissionsUser";
  id: string;
  username: string;
}

export interface GetUsersWithPagination_usersConnection {
  __typename: "UsersPermissionsUserConnection";
  aggregate: GetUsersWithPagination_usersConnection_aggregate | null;
  values: (GetUsersWithPagination_usersConnection_values | null)[] | null;
}

export interface GetUsersWithPagination {
  usersConnection: GetUsersWithPagination_usersConnection | null;
}

export interface GetUsersWithPaginationVariables {
  limit?: number | null;
  offset?: number | null;
}
