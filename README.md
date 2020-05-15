> ### 🛠 Status: Experimental
>
> `pwa-lit-template` is currently in development.

# pwa-lit-template

##### [Getting started](#getting-started) | [Installation](#install-the-dependencies) | [Local development](#start-the-development-server) | [Guides](#guides)

This template helps you to build Progressive Web Applications following the modern web standards, best practices and providing you with tools for that purpose. Out of the box, this template provides you with the following features:

- Simple way to create Web Components with [LitElement](https://lit-element.polymer-project.org).
- Small and powerful client-side router for Web Components with [Vaadin Router](https://vaadin.com/router).
- All the benefits from a PWA (manifest, service worker, offline UI) thanks to [Workbox](https://developers.google.com/web/tools/workbox) and [pwa-helpers](https://github.com/thepassle/pwa-helpers).
- SEO friendly thanks to the `PageElement` custom element and the `html-meta-manager`.
- Easy deployment over to [prpl-server](https://github.com/Polymer/prpl-server) or any static hosting.
- Simple build flow thanks to [Rollup](https://rollupjs.org) and [`@open-wc/building-rollup`](https://open-wc.org/building/building-rollup.html) initial configuration.
- A development server with auto-reload to serve the application without wasting time bundling the code with [`es-dev-server`](https://open-wc.org/developing/es-dev-server.html).

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

### Template structure

```
pwa-lit-template
│
└───client/
│   │
│   └───images/
│   │
│   └───patches/
│   │
│   └───src/
│   │   │
│   │   └───components/
│   │   │   │   app-index.ts
│   │   │
│   │   └───config/
│   │   │
│   │   └───helpers/
│   │   │   │
│   │   │   └───html-meta-manager/
│   │   │   │
│   │   │   │   page-element.ts
│   │   │
│   │   └───pages/
│   │   │
│   │   └───router/
│   │
│   │   index.html
│   │   manifest.webmanifest
│   │   robots.txt
│
└───server/
```

- In the root you will see two main folders, `client` and `server`. The first one is where you are going to write most of the code of your application meanwhile, in the second one is where the output of your build will be stored to serve it.
- `images` folder is use to store the static resourced used by your application.
- `patches` folder that contains the patches to apply in the different packages as we mention [here](#things-to-be-aware).
- the `components` folder is very straight-forward, is the folder that contains your custom Web Components. Inside this folder you will find the `app-index.ts` file, main root of your application following the famous **PRPL patern**.
- `config` folder handles your environment variables depending of the selected build.
- the `helpers` folder contains two interesting features: `PageElement` and `html-meta-manager` we go more in-depth with them [here](#create-your-own-page).
- `pages` is the folder where you create your pages for your application.
- `routes` stores the main configuration for your application.
- the `server` folder is very simple, only contains the logic to serve the application using `prpl-server`. And is where you are going to create your `dist/` folder containing the bundle of your application.

### Supported browsers

Due to the build process the number of the browsers that `pwa-lit-template` can support is quite width in a performant way:

- Chrome
- Edge
- Firefox
- Internet Explorer
- Safari

## Guides

### Build and deploy for production

This command use [Rollup](https://github.com/rollup/rollup) to build an optimized version of the application for production:

    npm run build

It has two outputs: in addition to outputting a regular build, it outputs a legacy build which is compatible with older browsers down to IE11.

At runtime it is determined which version should be loaded, so that legacy browsers don't force to ship more and slower code to most users on modern browsers.

To serve your application is quite easy, you have two differente ways depending of your requirements:

1. Serve your application as a common static website.
2. Using `prpl-server` and `rendertron` to serve the application.

For the first point the flow is pretty standard. You just need to have a typical Web Server (NGINX, for example) to serve your static files that you built in `server/dist/`.

To go with the second option you need to enter in the `server` folder and run:

    npm start

This will start to serve your application using `prpl-server`. Some of the benefits of this option in conjunction with `rendertron` are:

- Differential serving: you will be able to serve different versions of your application to different browsers by detecting browser capabilities using the user-agent header.
- Rendering for bots: many bots don't execute JavaScript when processing your application. This can cause your application to not render correctly when crawled by some search engines, social networks, and link rendering bots. So `rendertron` helps you to deal with this.

If you are creating an internal application maybe you are not interested on the second option that's way we offer both point of views.

### Create your own page

Something where we wanted to put an eye meanwhile we were creating this template was the SEO. With this in mind `pwa-lit-template` offers you with two tools that will help you to deal with: `PageElement` and `html-tag-manager`.

When you create a new page in the template you are creating a simple Web Component, the difference between a Page and a typical Web Component in the template is what extends.

Web Component:

```typescript
@customElement('app-index')
export class AppIndex extends LitElement { ... }
```

Home Page:

```typescript
@customElement('page-home')
export class PageHome extends PageElement { ... }
```

As you can see, meanwhile the Web Component extends `LitElement` class, the Home Page is extending `PageElement` that is a custom class that you can find inside `client/helpers/` folder. The reason behind this decision is because `PageElement` is optimized for SEO to use inside itself the little library `html-tag-manager` that it will update the metadata of the specific page with the information that you specify in the router:

```typescript
{
  path: '/',
  name: 'home',
  component: 'page-home',
  metadata: {
    title: 'MyApplication',
    description: 'MyApplication description'
  },
  action: async () => {
    await import('../pages/page-home');
  }
},
```

This way your new page will be populated with the metadata provided by the router. Other use case is that if you don't have available in the router that information for the page `html-tag-manager` offers you some utilities like `setMetaTag` or `setLinkTag` to populate that information once time you have it.

---

### Things to be aware

- There is a [patch](client/patches/@vaadin+router+1.7.2.patch) that modifies the `@vaadin/router`'s scroll standard behavior to have a more consistent scroll; now when you perform a `click` event, the scroll will be reset to the top position.

  Related issue: [vaadin/router#43: Restore scroll position on navigation](https://github.com/vaadin/vaadin-router/issues/43)
