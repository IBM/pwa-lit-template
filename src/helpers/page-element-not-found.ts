/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { updateMeta } from './html-meta-manager/index.js';
import { setMetaTag, removeMetaTag } from './html-meta-manager/utils.js';
import { PageElement } from './page-element.js';

export const pageNotFoundMeta = {
  title: 'Error: Page not found',
  description: null,
  image: null,
};

export class PageElementNotFound extends PageElement {
  connectedCallback() {
    super.connectedCallback();

    setMetaTag('name', 'render:status_code', '404');

    updateMeta({
      ...this.defaultMeta,
      ...pageNotFoundMeta,
    });
  }

  disconnectedCallback() {
    removeMetaTag('name', 'render:status_code');

    super.disconnectedCallback();
  }
}
