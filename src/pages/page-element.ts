/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, property } from 'lit-element';

import { Route, RouterLocation } from '@vaadin/router';

import { updateMetadata, MetadataOptions } from '../helpers/metadata';

import config from '../config';

// Add metadata options to the @vaadin/router BaseRoute
declare module '@vaadin/router/dist/vaadin-router' {
  export interface BaseRoute {
    metadata?: MetadataOptions;
  }
}

export class PageElement extends LitElement {
  @property({ type: Object })
  protected location!: RouterLocation;

  protected updated() {
    const { route } = this.location;

    if (!route) {
      return;
    }

    const metadata = this.updateMetadata(route);

    if (metadata) {
      updateMetadata(metadata);
    }
  }

  protected updateMetadata(route: Route) {
    if (!route.metadata) {
      return null;
    }

    const { title, description, image } = route.metadata;
    const isHomePage = route.component === 'page-home';

    const options: MetadataOptions = {
      title: isHomePage ? title : `${title} | ${config.name}`,
      description,
      image,
      url: window.location.href
    };

    return options;
  }
}
