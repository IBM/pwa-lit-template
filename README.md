> ### 🛠 Status: Experimental
>
> `pwa-lit-template` is currently in development.

# pwa-lit-template

##### [Getting started](#getting-started) | [Build for production](#build-for-production) | [Browser support](#browser-support)

This template helps you to build Progressive Web Applications following the modern web standards, best practices and providing you with tools for that purpose. Out of the box, this template provides you with the following features:

- Simple way to create Web Components with [LitElement](https://lit-element.polymer-project.org).
- Small and powerful client-side router for Web Components with [Vaadin Router](https://vaadin.com/router).
- All the benefits from a PWA (manifest, service worker, offline UI) thanks to [Workbox](https://developers.google.com/web/tools/workbox) and [pwa-helpers](https://github.com/thepassle/pwa-helpers).
- SEO friendly thanks to the `PageElement` custom element and the `html-meta-manager`.
- A development server with auto-reload to serve the application without wasting time bundling the code with [`es-dev-server`](https://open-wc.org/developing/es-dev-server.html).
- Simple build flow thanks to [Rollup](https://rollupjs.org) and [`@open-wc/building-rollup`](https://open-wc.org/building/building-rollup.html) initial configuration.
- Easy deployment over to [prpl-server](https://github.com/Polymer/prpl-server) or any static hosting.

## Getting started

### Prerequisites

- [node.js](https://nodejs.org)

Furthermore, this project is built on [TypeScript](https://www.typescriptlang.org) with the intention of improving the developer experience.

### Install the dependencies

    npm install

### Start the development server

This command serves the app at `http://localhost:8080`:

    npm start

The folder that `es-dev-server` will serve running this command will be `client/src-js/`, a compiled version from TypeScript that will output plain JavaScript, without any transformation from the build process.

### Structure

In the root you will see two main folders: `client` and `server`. The first one is where you are going to write most of the code of your application meanwhile, in the second one is where the output of your production build will be stored to serve it.

```
├─ client/
│  ├─ images/
│  ├─ patches/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ app-index.ts
│  │  │  └─ ···
│  │  ├─ config/
│  │  ├─ helpers/
│  │  │  ├─ html-meta-manager/
│  │  │  ├─ page-element.ts
│  │  │  └─ ···
│  │  ├─ pages/
│  │  │  ├─ page-home.ts
│  │  │  └─ ···
│  │  └─ router/
│  │     └─ routes.ts
│  ├─ index.html
│  ├─ manifest.webmanifest
│  └─ package.json
├─ server/
├─ package.json
├─ rollup.config.js
└─ tsconfig.json
```

- `images`: is use to store the static resourced used by your application.
- `patches`: contains the patches to apply in the different packages as we mention [here](#things-to-be-aware).
- `components`: contains your custom Web Components. Inside this folder you will find the `app-index.ts` file, main root of your application following the famous **PRPL patern**.
- `config`: handles your environment variables depending of the selected build.
- `helpers`: contains two interesting features: `PageElement` and `html-meta-manager` we go more in-depth with them [here](#create-your-own-page).
- `pages`: where you create your pages for your application.
- `routes`: stores the main configuration for your application.
- `server`: contains the logic to serve the application using `prpl-server`. And is where you are going to create your `dist/` folder containing the bundle of your application.

## Guides

### Build for production

This command use Rollup to build an optimized version of the application for production:

    npm run build

It has two outputs: in addition to outputting a regular build, it outputs a legacy build which is compatible with older browsers down to IE11.

At runtime it is determined which version should be loaded, so that legacy browsers don't force to ship more and slower code to most users on modern browsers.

And this command serves the production ready app:

    npm run serve:production

## Browser support

- Chrome
- Edge
- Firefox
- Safari

To run on other browsers, you need to use a combination of polyfills and transpilation. This step is automated for you by the build command.

---

### Things to be aware

- There is a [patch](client/patches/@vaadin+router+1.7.2.patch) that modifies the `@vaadin/router`'s scroll standard behavior to have a more consistent scroll; now when you perform a `click` event, the scroll will be reset to the top position.

  Related issue: [vaadin/router#43: Restore scroll position on navigation](https://github.com/vaadin/vaadin-router/issues/43)
