/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, property } from 'lit-element';

import { Route, RouterLocation } from '@vaadin/router';

import config from '../config';
import { updateMetadata, MetadataOptions } from '../helpers/metadata';

type AppRoute = Route & MetadataOptions;

export class PageElement extends LitElement {
  @property({ type: Object })
  private location!: RouterLocation;

  protected updated() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const route = this.location.route!;

    const metadata = this.updateMetadata(route);
    if (metadata) {
      updateMetadata(metadata);
    }
  }

  protected updateMetadata(route: AppRoute): MetadataOptions | void {
    const { title, description, image } = route;
    const isHomePage = route.component === 'page-home';

    return {
      title: isHomePage ? title : `${title} | ${config.name}`,
      description,
      image,
      url: window.location.href
    };
  }
}
