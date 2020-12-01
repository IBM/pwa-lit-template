/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';

import dotenv from 'dotenv';

const packageJsonFile = fs.readFileSync('package.json', 'utf-8');
const packageJson = JSON.parse(packageJsonFile);

const dotenvOutput = dotenv.config();
const envVariablesFromDotenv = dotenvOutput.parsed;

export const envVariables = {
  VERSION: packageJson.version,
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  ...envVariablesFromDotenv
};

export const injectEnvVariablesToWindow = (html) =>
  html.replace(
    '</head>',
    `<script>window.env=${JSON.stringify(envVariables)};</script></head>`
  );

export const injectEnvVariablesToWindowPlugin = () => {
  return {
    name: 'inject-env-variables-to-window',
    transform(context) {
      if (context.path === '/index.html') {
        return {
          body: injectEnvVariablesToWindow(context.body, envVariables)
        };
      }
    }
  };
};
