const { chromium } = require('playwright');
(async () => {
  console.log('Launching playwright chromium...');
  const ctx = await chromium.launchPersistentContext('C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\.chrome-auto-profile-v2', {
    headless: false,
    args: ['--disable-blink-features=AutomationControlled', '--start-maximized'],
    timeout: 120000,
  });
  console.log('[OK] Browser launched!');
  const page = await ctx.newPage();
  console.log('Navigating to Blogger...');
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  const text = await page.evaluate(() => document.body.innerText.substring(0, 300));
  console.log('Content:', text);
  console.log('\\nBrowser is open. Log in if needed, then tell me "done".');
  await new Promise(r => setTimeout(r, 600000));
  await ctx.close();
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
