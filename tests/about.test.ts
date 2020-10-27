describe('About test', () => {
  it('should have About | MyApplication as title', async () => {
    await page.goto('http://localhost:8000/about');
    const title = await page.title();
    await expect(title).toEqual('About | MyApplication');
  });
});
