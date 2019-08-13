> ### 🛠 Status: Experimental
>
> `app-template` is currently in development.

# app-template

A template for building web applications using [LitElement](https://github.com/Polymer/lit-element) and [Vaadin Router](https://github.com/vaadin/vaadin-router).

## Prerequisites

- [node.js](https://nodejs.org)

## Install the dependencies

    npm install

## Start the development server

This command serves the app at `http://localhost:8080`:

    npm start

## Build for production

This command use [Rollup](https://github.com/rollup/rollup) to build an optimized version of the application for production.

    npm run build

It has two outputs: In addition to outputting a regular build, it outputs a legacy build which is compatible with older browsers down to IE11.

At runtime it is determined which version of your the should be loaded, so that legacy browsers don't force to ship more and slower code to most users on modern browsers.

And this command serves the production ready app:

    npm run serve:production

---

### Things to be aware

- There is [a patch](patches/@vaadin+router+1.2.1.patch) that modifies the `@vaadin/router`'s scroll standar behavior to have a more consistent scroll; now when you perform a `click` event, the scroll will be reset to the top position.

  Related issue: [vaadin/router#43: Restore scroll position on navigation](https://github.com/vaadin/vaadin-router/issues/43)
