/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const { chromium } = require('playwright');
const { expect } = require('chai');
const { startDevServer } = require('@web/dev-server');

const port = 4444;
const baseUrl = `http://localhost:${port}`;
const createUrl = (path) => `${baseUrl}${path}`;

describe('routing tests', function () {
  let devServer, browser, page;

  before(async function () {
    devServer = await startDevServer({
      config: {
        port: port,
        rootDir: path.join(__dirname, '../../')
      }
    });

    browser = await chromium.launch();
  });

  after(async function () {
    await browser.close();

    devServer.stop();
  });

  beforeEach(async function () {
    page = await browser.newPage();
  });

  afterEach(async function () {
    await page.close();
  });

  it('home page should have the right title', async function () {
    await page.goto(createUrl('/'));
    const title = await page.title();
    expect(title).to.equal('MyApplication');
  });

  it('about page should have the right title', async function () {
    await page.goto(createUrl('/about'));
    const title = await page.title();
    expect(title).to.equal('About | MyApplication');
  });

  it('not found page should have the right title', async function () {
    await page.goto(createUrl('/not-found'));
    const title = await page.title();
    expect(title).to.equal('Error | MyApplication');
  });

  it('home page should have the right description', async function () {
    await page.goto(createUrl('/'));
    const description = await getDescription(page);
    expect(description).to.equal('MyApplication description');
  });

  it('about page should have the right description', async function () {
    await page.goto(createUrl('/about'));
    const description = await getDescription(page);
    expect(description).to.equal('About page description');
  });

  it('not found page should have the right description', async function () {
    await page.goto(createUrl('/not-found'));
    const description = await getDescription(page);
    expect(description).to.equal('');
  });
});

const getDescription = async (page) => {
  const description = await page.$eval(
    'meta[name="description"]',
    (element) => element.content
  );

  return description;
};
