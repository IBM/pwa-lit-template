/**
 * Copyright (c) IBM, Corp.
 */

import { createApolloClient } from '@apollo-elements/lib/create-apollo-client';

import config from './config';

export const client = createApolloClient({
  uri: `${config.apiUrl}/graphql`,
  validateVariables: true
});

export { gql } from '@apollo/client/core';
