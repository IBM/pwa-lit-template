/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

type OptionalPromise<T> = T | Promise<T>;

export interface RouteContext {
  pathname: string;
  search: string;
  hash: string;
  params: {};
  route: Route;
  next: () => Promise<Route | null>;
}

export interface RouteRedirect {
  redirect: {
    pathname: string;
    from: string;
    params: {};
  };
}

export interface RouteCommands {
  redirect: (path: string) => RouteRedirect;
  component: (component: string) => HTMLElement;
}

export interface Route {
  path: string;
  children?: Route[];
  action?: (
    context: RouteContext,
    commands: RouteCommands
  ) => OptionalPromise<void | HTMLElement | RouteRedirect>;
  redirect?: string;
  bundle?: string;
  component?: string;
  name?: string;
}

export interface RouterOptions {
  baseUrl?: string;
}

export declare class Router {
  public constructor(outlet: HTMLElement, options: RouterOptions);

  public setRoutes(routes: Route[] | Route): void;
}
