> ### 🛠 Status: Experimental
>
> `pwa-lit-template` is currently in development.

# pwa-lit-template

This template helps you to build Progressive Web Applications following the modern web standards, best practices and providing you tools for that purpose. Part of these tools that will be with you while you develop are:

- [LitElement](https://lit-element.polymer-project.org/) and [lit-html](https://lit-html.polymer-project.org/) provide rich features to create your own Web Components.
- [Vaadin Router](https://vaadin.com/router): small and powerful client-side router for Web Components. Framework-agnostic.
- [@open-wc](https://open-wc.org/) setup to build your application following the best practices and with a good amount of options to configure it.
- [Workbox](https://developers.google.com/web/tools/workbox) is de facto library to create and manage service workers for your application.
- [TypeScript](https://www.typescriptlang.org/) without being indispensable we really trust that using it will improve your developer experience meanwhile you code.

Furthermore, another part where `pwa-lit-template` focuses is in SEO. Reaching easily to a 100 in [Lighthouse](https://web.dev/measure/) and providing you with a built-in tool to improve it and reach to higher positions in Google.

## Prerequisites

You will need the next things installed on your computer:

- [node.js](https://nodejs.org)

## Install the dependencies

The rest of the dependencies are defined in the `package.json` and you can install them simply typing:

    npm install

## Start the development server

This command serves the app at `http://localhost:8080`:

    npm start

## Build for production

This command use [Rollup](https://github.com/rollup/rollup) to build an optimized version of the application for production.

    npm run build

It has two outputs: in addition to outputting a regular build, it outputs a legacy build which is compatible with older browsers down to IE11.

At runtime it is determined which version should be loaded, so that legacy browsers don't force to ship more and slower code to most users on modern browsers.

And this command serves the production ready app:

    npm run serve:production

## Supported browsers

Due to the build process the number of the browsers that `pwa-lit-template` can support is quite width in a performant way:

- Chrome
- Edge
- Firefox
- Internet Explorer
- Safari

## Development process setup

One of the things where we wanted to focus it was in the development process to improve the feeling that you have meanwhile you code. You can use whatever editor that you want to build your application but we recommend you [Visual Studio Code](https://code.visualstudio.com/). `pwa-lit-template` provides you the `.vscode` folder with a set of plugins that we recommend you for this editor. We selected them for you because they are plugins that we use daily in our development process and we trust that can improve your developer experience using this template:

- `Prettier` extension to apply an opinionated format to the code.
- `lit-plugin` offers really cool features like syntax highlighting, type checking and code completion for your Web Components.
- `eslint` and `stylelint` helps you checking your code and your CSS.

## Template structure

```
pwa-starter
│   rollup.config.js (OpenWC bundler configuration)
|   tsconfig.json (TypeScript configuration)
│
└───.vscode (VSCode recommended plugins and configuration)
│
└───client (main folder where you are going to code mostly)
│   │
│   └───images
│   │
│   └───patches (folder with the changes to apply to the different packages)
│   │
│   └───src
│   │   │
│   │   └───components (folder where you store the components that you create)
│   │   │   │   app-index.ts (your root component)
│   │   │
│   │   └───config (folder for your environment configurations)
│   │   │
│   │   └───helpers (folder with different utilities)
│   │   │   │   page-element.ts (component that extends to build your pages)
│   │   │   │
│   │   │   └───html-meta-manager (utility that helps you to improve the SEO in your application)
│   │   │
│   │   └───pages (folder where you store the pages for your application)
│   │   │
│   │   └───router (@vaadin/router configuration)
│   │   index.html
│   │   manifest.webmanifest (https://developer.mozilla.org/en-US/docs/Web/Manifest)
│   │   robots.txt (https://developer.mozilla.org/en-US/docs/Glossary/Robots.txt)
│
└───server (folder where you place your dist and serve it with prpl-server)
│   │   prpl.config.json (prpl-server configuration)
```

---

### Things to be aware

- There is [a patch](client/patches/@vaadin+router+1.7.2.patch) that modifies the `@vaadin/router`'s scroll standar behavior to have a more consistent scroll; now when you perform a `click` event, the scroll will be reset to the top position.

  Related issue: [vaadin/router#43: Restore scroll position on navigation](https://github.com/vaadin/vaadin-router/issues/43)
