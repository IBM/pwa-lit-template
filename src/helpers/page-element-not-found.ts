/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable wc/guard-super-call */

import { setMetaTag, removeMetaTag } from '../helpers/html-meta-manager/utils';

import { PageElement } from '../helpers/page-element';

export class PageElementNotFound extends PageElement {
  connectedCallback() {
    super.connectedCallback();

    setMetaTag('name', 'render:status_code', '404');
  }

  disconnectedCallback() {
    removeMetaTag('name', 'render:status_code');

    super.disconnectedCallback();
  }
}
