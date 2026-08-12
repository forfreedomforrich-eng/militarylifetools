const { chromium } = require('playwright');
(async () => {
  console.log('Launching visible browser...');
  const ctx = await chromium.launchPersistentContext('C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\.chrome-auto-profile-v2', {
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'],
    timeout: 30000,
  });
  console.log('[OK] Browser opened! Please check the window.');
  await ctx.waitForTimeout(5000);
  
  // Check Blogger
  const page = await ctx.newPage();
  try {
    await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(3000);
    console.log('Blogger URL:', page.url());
    console.log('Blogger title:', await page.title());
    const text = await page.evaluate(() => document.body.innerText.substring(0, 200));
    console.log('Content:', text);
  } catch(e) { console.log('Blogger error:', e.message); }
  
  console.log('\\nBrowser will stay open for 30 seconds. Check if you see Blogger logged in or a login page.');
  await ctx.waitForTimeout(30000);
  await ctx.close();
  console.log('[Done]');
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
