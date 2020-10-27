describe('About test', () => {
  it('should have the right title', async () => {
    await page.goto('http://localhost:8000/about');
    const title = await page.title();
    await expect(title).toEqual('About | MyApplication');
  });
});
