/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, property } from 'lit-element';

import { updateMetadata } from '../helpers';
import config from '../config';
import { MetadataOptions } from './metadata';

export class PageElement extends LitElement {
  @property({ type: Object })
  protected location?: Router.Location;

  protected updated() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const route = this.location!.route!;

    const metadata = this.updateMetadata(route);
    updateMetadata(metadata);
  }

  protected updateMetadata(route: Router.Route): MetadataOptions {
    return {
      title: `${route.title} | ${config.name}`,
      description: route.description,
      url: window.location.href
    };
  }
}
