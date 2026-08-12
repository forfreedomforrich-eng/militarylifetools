const { chromium } = require('playwright');
(async () => {
  const profile = 'C:\\\\Users\\\\kusan\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data';
  // 先等 profile 锁释放
  for (let i = 0; i < 10; i++) {
    try {
      require('fs').accessSync(profile + '\\\\Default\\\\Lock', require('fs').constants.W_OK);
      break;
    } catch {
      console.log('Profile locked, waiting...');
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  console.log('Launching headless...');
  const ctx = await chromium.launchPersistentContext(profile, {
    headless: true,
    channel: 'chrome',
    timeout: 20000,
  });
  console.log('[OK] Launched!');
  const page = await ctx.newPage();
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  await ctx.close();
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
