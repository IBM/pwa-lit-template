describe('Home test', () => {
  it('should have the right title', async () => {
    await page.goto('http://localhost:8000');
    const title = await page.title();
    await expect(title).toEqual('MyApplication');
  });
});
