const { chromium } = require('playwright');
(async () => {
  console.log('Connecting to CDP port 9229...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9229');
  console.log('Connected! Contexts:', browser.contexts().length);
  const ctx = browser.contexts()[0];
  console.log('Pages:', ctx.pages().length);
  for (const p of ctx.pages()) {
    console.log('  Page:', p.url(), '|', await p.title());
  }
  // 尝试打开 Blogger
  const page = await ctx.newPage();
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  console.log('Blogger URL:', page.url());
  console.log('Blogger title:', await page.title());
  const body = await page.evaluate(() => document.body.innerText.substring(0, 200));
  console.log('Body:', body);
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
