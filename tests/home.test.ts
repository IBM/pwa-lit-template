/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: import type playwright page
declare const page: any;

import { expect } from '@esm-bundle/chai';

describe('Title test', function () {
  it('should have the right title', async function () {
    await page.goto('http://localhost:8000/');
    const title = await page.title();
    expect(title).to.equal('MyApplication');
  });
});
