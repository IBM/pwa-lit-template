/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { wrapRollupPlugin } = require('es-dev-server-rollup');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  plugins: [
    wrapRollupPlugin(
      commonjs({
        include: [
          '**/fast-json-stable-stringify/**/*',
          '**/graphql-tag/**/*',
          '**/zen-observable/**/*'
        ]
      })
    )
  ]
};
