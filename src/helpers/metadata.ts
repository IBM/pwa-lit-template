/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const setMetaTag = (
  attributeName: string,
  attributeValue: string,
  content: string
) => {
  let element = document.head.querySelector(
    `meta[${attributeName}="${attributeValue}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

export const removeMetaTag = (
  attributeName: string,
  attributeValue: string
) => {
  const element = document.head.querySelector(
    `meta[${attributeName}="${attributeValue}"]`
  );

  if (element) {
    document.head.removeChild(element);
  }
};

export const setLinkTag = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

export interface MetadataOptions {
  title?: string;
  description?: string;
  image?: {
    url: string;
    alt?: string;
    width?: string;
    height?: string;
  };
  url?: string;
}

export const updateMetadata = (metadataOptions: MetadataOptions) => {
  const { title, description, image, url } = metadataOptions;

  if (title) {
    document.title = title;
    setMetaTag('property', 'og:title', title);
  }

  if (description === null || description) {
    setMetaTag('name', 'description', description || '');
    setMetaTag('property', 'og:description', description || '');
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
