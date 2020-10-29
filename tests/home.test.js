const { chromium } = require('playwright');
const { expect } = require('chai');

let browser, page;

describe('Title test', function () {
  it('should have the right title', async function () {
    browser = await chromium.launch();
    page = await browser.newPage();

    await page.goto('http://localhost:8000/');
    const title = await page.title();
    expect(title).to.equal('MyApplication');

    await page.close();
    await browser.close();
  });
});
