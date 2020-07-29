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

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    const { route } = this.location;

    if (!route) {
      return;
    }

    const metadata = this.metadata(route);

    if (metadata) {
      updateMetadata(metadata);
    }
  }

  protected metadata(route: Route) {
    if (!route.metadata) {
      return null;
    }

    const { title, description, image } = route.metadata;
    const isHomePage = route.name === 'home';

    const options: MetadataOptions = {
      title: isHomePage ? title : `${title} | ${config.name}`,
      description,
      image,
      url: window.location.href
    };

    return options;
  }
}
