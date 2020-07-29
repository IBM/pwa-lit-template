/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, internalProperty } from 'lit-element';
import type { PropertyValues } from 'lit-element';
import type { Route, RouterLocation } from '@vaadin/router';

import { config } from '../config';

import { updateMetadata } from './html-meta-manager';
import type { MetadataOptions } from './html-meta-manager';

// Add metadata options to the @vaadin/router BaseRoute
declare module '@vaadin/router/dist/vaadin-router' {
  export interface BaseRoute {
    metadata?: MetadataOptions;
  }
}

export class PageElement extends LitElement {
  @internalProperty()
  protected location = {} as RouterLocation;

  private defaultTitleTemplate = `%s | ${config.name}`;

  private getTitleTemplate(titleTemplate?: string | null) {
    return titleTemplate || titleTemplate === null
      ? titleTemplate
      : this.defaultTitleTemplate;
  }

  protected metadata(route: Route) {
    return route.metadata;
  }

  private updateMetadata() {
    const { route } = this.location;

    if (!route) {
      return;
    }

    const metadata = this.metadata(route);

    if (metadata) {
      const defaultMetadata = {
        url: window.location.href,
        titleTemplate: this.getTitleTemplate(metadata.titleTemplate)
      };

      updateMetadata({
        ...defaultMetadata,
        ...metadata
      });
    }
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.updateMetadata();
  }
}
