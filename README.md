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
