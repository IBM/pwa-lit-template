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
