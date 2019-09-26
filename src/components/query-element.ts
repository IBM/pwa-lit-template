/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { DocumentNode } from 'graphql';
import { OperationVariables } from 'apollo-boost';

import { ApolloQueryElement } from '../helpers/apollo-query-element';
import { client } from '../graphql-service';

export class QueryElement extends ApolloQueryElement {
  constructor(query: DocumentNode, queryVariables?: OperationVariables) {
    if (queryVariables) {
      super(client, query, queryVariables);
    } else {
      super(client, query);
    }
  }
}
