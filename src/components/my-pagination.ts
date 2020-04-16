/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, property, html, customElement, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { filter, head, last, range } from 'lodash-es';
import { Router } from '@vaadin/router';

@customElement('my-pagination')
export class MyPagination extends LitElement {
  @property({ type: Number })
  public limit = 10;

  @property({ type: Number })
  public total = 0;

  @property({ type: Number })
  public offset = 0;

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        button.active {
          color: #fff;
          font-weight: bold;
          background-color: #0062ff;
          border: 1px solid #0062ff;
        }
      `
    ];
  }

  private getCurrentPage() {
    return Math.floor(this.offset / this.limit) + 1;
  }

  private getLastPage() {
    return Math.ceil(this.total / this.limit);
  }

  private getPageArgs(page: number) {
    return {
      offset: (page - 1) * this.limit,
      limit: this.limit
    };
  }

  private goToPage(page: number) {
    const { limit, offset } = this.getPageArgs(page);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('limit', limit.toString());
    searchParams.set('offset', offset.toString());

    const queryString = searchParams.toString();
    const path = window.location.pathname;
    Router.go(`${path}?${queryString}`);
    const event = new CustomEvent('update-query-event', {
      detail: { limit, offset }
    });
    this.dispatchEvent(event);
  }

  private renderPrevPage() {
    const currentPage = this.getCurrentPage();
    const isDisabled = currentPage === 1;

    return html`
      <button
        ?disabled=${isDisabled}
        @click=${() => this.goToPage(currentPage - 1)}
      >
        &lt;
      </button>
    `;
  }

  private renderNextPage() {
    const currentPage = this.getCurrentPage();
    const lastPage = this.getLastPage();
    const isDisabled = currentPage === lastPage;

    return html`
      <button
        ?disabled=${isDisabled}
        @click=${() => this.goToPage(currentPage + 1)}
      >
        &gt;
      </button>
    `;
  }

  private renderPage(page: number) {
    const currentPage = this.getCurrentPage();
    const isActive = currentPage === page;
    const classes = { active: isActive };

    return html`
      <button
        ?disabled=${isActive}
        class=${classMap(classes)}
        @click=${() => this.goToPage(page)}
      >
        ${page}
      </button>
    `;
  }

  private renderEllipsis() {
    return html` <span>...</span> `;
  }

  protected render() {
    if (this.total === 0) return html``;

    const currentPage = this.getCurrentPage();
    const lastPage = this.getLastPage();

    const contextPages = 1;

    const pages = filter(
      range(currentPage - contextPages, currentPage + contextPages + 1),
      (page) => page >= 1 && page <= lastPage
    ) as number[];

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const renderInitialPage = head(pages)! > 1;
    const renderLeftEllipsis = head(pages)! > 2;
    const renderLastPage = last(pages)! > 1 && last(pages)! < lastPage;
    const renderRightEllipsis = last(pages)! > 1 && last(pages)! < lastPage - 1;

    return html`
      <div>
        ${this.renderPrevPage()}
        ${renderInitialPage ? this.renderPage(1) : null}
        ${renderLeftEllipsis ? this.renderEllipsis() : null}
        ${pages.map((page) => this.renderPage(page))}
        ${renderRightEllipsis ? this.renderEllipsis() : null}
        ${renderLastPage ? this.renderPage(lastPage) : null}
        ${this.renderNextPage()}
      </div>
    `;
  }
}
