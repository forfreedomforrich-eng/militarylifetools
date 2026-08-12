const { chromium } = require('playwright');
(async () => {
  console.log('Launching...');
  const ctx = await chromium.launchPersistentContext('C:\\\\Users\\\\kusan\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data', {
    headless: true,
    channel: 'chrome',
    args: ['--no-sandbox'],
    timeout: 60000,
  });
  console.log('[OK] Launched!');
  const page = await ctx.newPage();
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log('Blogger URL:', page.url());
  console.log('Blogger title:', await page.title());
  const text = await page.evaluate(() => document.body.innerText.substring(0, 100));
  console.log('Body:', text);
  await ctx.close();
  console.log('[Done]');
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
