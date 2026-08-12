const { chromium } = require('playwright');
(async () => {
  const ctx = await chromium.launchPersistentContext('C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\.chrome-auto-profile-v2', {
    headless: false,
    timeout: 60000,
  });
  console.log('Browser launched!');
  const page = await ctx.newPage();
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 3000));
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  // Keep open
  console.log('Waiting for user... press Ctrl+C to close');
  await new Promise(r => setTimeout(r, 300000));
  await ctx.close();
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
