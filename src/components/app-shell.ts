/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { LitElement, html, customElement, TemplateResult } from 'lit-element';

import config from '../config';
import { updateMetadata } from '../helpers';

@customElement('app-shell')
export class AppShell extends LitElement {
  protected render(): TemplateResult {
    return html`
      <section>
        <h1>app-shell</h1>

        <main role="main">
          <!-- added / removed dynamically by the router -->
        </main>

        <footer>
          <p>Current environment: ${config.environment}</p>
        </footer>
      </section>
    `;
  }

  private updateMetadata(event: CustomEvent): void {
    const { route } = event.detail.location;

    // TODO: Remove setTimeout. https://github.com/vaadin/vaadin-router/issues/340
    setTimeout((): void => {
      updateMetadata({
        title: `${route.title} | ${config.name}`,
        description: route.description,
        url: window.location.href
      });
    }, 0);
  }

  private async initializeRouter(): Promise<void> {
    window.addEventListener('vaadin-router-location-changed', ((
      event: CustomEvent
    ): void => {
      this.updateMetadata(event);
    }) as EventListener);

    const router = await import('../router/index');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const mainElement = this.shadowRoot!.querySelector('main')!;

    router.init(mainElement);
  }

  protected firstUpdated(): void {
    this.initializeRouter();
  }
}
