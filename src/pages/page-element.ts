/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, property } from 'lit-element';

import config from '../config';
import { updateMetadata } from '../helpers';
import { MetadataOptions } from '../helpers/metadata';

type AppRoute = Router.Route & MetadataOptions;

export class PageElement extends LitElement {
  // TODO: Review this issue https://github.com/vaadin/vaadin-router/issues/404
  @property({ type: Object })
  protected location!: Router.Location;

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
