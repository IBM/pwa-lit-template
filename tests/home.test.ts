describe('Home test', () => {
  it('should have MyApplication as title', async () => {
    await page.goto('http://localhost:8000');
    const title = await page.title();
    await expect(title).toEqual('MyApplication');
  });
});
