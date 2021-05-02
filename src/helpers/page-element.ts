/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, property } from 'lit-element';
import type { PropertyValues } from 'lit-element';
import type { Route, RouterLocation } from '@vaadin/router';

import config from '../config.js';

import { updateMetadata } from './html-meta-manager/index.js';
import type { MetadataOptions } from './html-meta-manager/index.js';

// Add metadata options to the @vaadin/router BaseRoute
declare module '@vaadin/router/dist/vaadin-router' {
  export interface BaseRoute {
    metadata?: MetadataOptions;
  }
}

export class PageElement extends LitElement {
  @property({ type: Object })
  location?: RouterLocation;

  private defaultTitleTemplate = `%s | ${config.appName}`;

  protected get defaultMetadata() {
    return {
      url: window.location.href,
      titleTemplate: this.defaultTitleTemplate
    };
  }

  /**
   * The page can override this method to customize the metadata
   */
  protected metadata(route: Route) {
    return route.metadata;
  }

  private updateMetadata(route: Route) {
    const metadata = this.metadata(route);

    if (!metadata) {
      return;
    }

    updateMetadata({
      ...this.defaultMetadata,
      ...(metadata.titleTemplate && { titleTemplate: metadata.titleTemplate }),
      ...metadata
    });
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('location') && this.location!.route) {
      this.updateMetadata(this.location!.route);
    }
  }
}
