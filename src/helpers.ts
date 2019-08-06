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
  url?: string;
}

export const updateMetadata = (metadataOptions: MetadataOptions): void => {
  const { title, description, url } = metadataOptions;

  if (title) {
    document.title = title;
    setMetaTag('property', 'og:title', title);
  }

  if (description) {
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:description', description);
  }

  if (url) {
    setMetaTag('property', 'og:url', url);
  }
};
