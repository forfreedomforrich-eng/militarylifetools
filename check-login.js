const { chromium } = require('playwright');
(async () => {
  const profile = 'C:\\\\Users\\\\kusan\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data';
  console.log('Launching with profile:', profile);
  try {
    const ctx = await chromium.launchPersistentContext(profile, {
      headless: false,
      channel: 'chrome',
      args: ['--disable-blink-features=AutomationControlled'],
      timeout: 30000,
    });
    console.log('Context launched, pages:', ctx.pages().length);
    // 检查是否已有标签页
    for (const p of ctx.pages()) {
      console.log('Page:', p.url(), '|', await p.title());
    }
    // 打开第一个平台检查登录状态
    const page = await ctx.newPage();
    await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(3000);
    console.log('Blogger URL:', page.url());
    console.log('Blogger title:', await page.title());
    await ctx.close();
    console.log('Done');
  } catch (e) {
    console.error('Error:', e.message);
  }
})().catch(e => { console.error(e); process.exit(1); });
