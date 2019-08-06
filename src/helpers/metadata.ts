/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

const setMetaTag = (
  attributeName: string,
  attributeValue: string,
  content: string
): void => {
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

interface MetadataOptions {
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

export const updateMetadata = (metadataOptions: MetadataOptions): void => {
  const { title, description, image, url } = metadataOptions;

  if (title) {
    document.title = title;
    setMetaTag('property', 'og:title', title);
  }

  if (description) {
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:description', description);
  }

  if (image) {
    if (image.url) {
      const imageUrl = `${window.location.origin}/${image.url}`;
      setMetaTag('property', 'og:image', imageUrl);
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
  }

  if (url) {
    setMetaTag('property', 'og:url', url);
  }
};
