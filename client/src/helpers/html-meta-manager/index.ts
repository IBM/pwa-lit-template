/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { setMetaTag, setLinkTag } from './utils';

interface ImageMetadataOptions {
  url: string;
  alt?: string;
  width?: string;
  height?: string;
}

export interface MetadataOptions {
  title?: string;
  description?: string | null;
  image?: ImageMetadataOptions | null;
  url?: string;
}

export const updateMetadata = (options: MetadataOptions) => {
  const { title, description, image, url } = options;

  if (title) {
    document.title = title;
    setMetaTag('property', 'og:title', title);
  }

  if (description) {
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:description', description);
  } else if (description === null) {
    setMetaTag('name', 'description', '');
    setMetaTag('property', 'og:description', '');
  }

  if (image) {
    if (image.url) {
      setMetaTag('property', 'og:image', image.url);
    }
    if (image.alt) {
      setMetaTag('property', 'og:image:alt', image.alt);
    }
    if (image.width) {
      setMetaTag('property', 'og:image:width', image.width);
    }
    if (image.height) {
      setMetaTag('property', 'og:image:height', image.height);
    }
  } else if (image === null) {
    setMetaTag('property', 'og:image', '');
    setMetaTag('property', 'og:image:alt', '');
    setMetaTag('property', 'og:image:width', '');
    setMetaTag('property', 'og:image:height', '');
  }

  if (url) {
    setLinkTag('canonical', url);
    setMetaTag('property', 'og:url', url);
  }
};
