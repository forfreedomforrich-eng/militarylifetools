const { chromium } = require('playwright');
(async () => {
  const profile = 'C:\\\\Users\\\\kusan\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data';
  console.log('Launching with real profile...');
  const ctx = await chromium.launchPersistentContext(profile, {
    headless: true,
    channel: 'chrome',
    timeout: 25000,
  });
  console.log('[OK] Launched! Pages:', ctx.pages().length);
  const page = await ctx.newPage();
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log('Blogger URL:', page.url());
  console.log('Blogger title:', await page.title());
  const text = await page.evaluate(() => document.body.innerText.substring(0, 300));
  console.log('Body:', text);
  await ctx.close();
  console.log('[Done]');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
