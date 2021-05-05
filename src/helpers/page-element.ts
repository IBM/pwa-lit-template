/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, property } from 'lit-element';
import type { PropertyValues } from 'lit-element';

import config from '../config.js';
import { updateMeta } from './html-meta-manager/index.js';
import type { MetaOptions } from './html-meta-manager/index.js';

// Add meta options to the @vaadin/router BaseRoute
declare module '@vaadin/router/dist/vaadin-router' {
  export interface BaseRoute {
    meta?: MetaOptions;
  }
}

export class PageElement extends LitElement {
  @property({ type: Object })
  location?: RouterLocation;

  private defaultTitleTemplate = `%s | ${config.appName}`;

  protected get defaultMeta() {
    return {
      url: window.location.href,
      titleTemplate: this.defaultTitleTemplate
    };
  }

  /**
   * The page can override this method to customize the meta
   */
  protected meta(route: Route) {
    return route.meta;
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (this.location?.route) {
      const meta = this.meta(this.location.route);

      if (meta) {
        updateMeta({
          ...this.defaultMeta,
          ...(meta.titleTemplate && { titleTemplate: meta.titleTemplate }),
          ...meta
        });
      }
    }
  }
}
