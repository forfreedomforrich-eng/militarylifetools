const { chromium } = require('playwright');
(async () => {
  const profile = 'C:\\\\Users\\\\kusan\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data';
  console.log('Launching with real profile, headless=false...');
  const ctx = await chromium.launchPersistentContext(profile, {
    headless: false,
    channel: 'chrome',
    no_viewport: true,
    args: ['--disable-blink-features=AutomationControlled', '--start-maximized'],
    timeout: 30000,
  });
  console.log('[OK] Browser launched with real profile!');
  console.log('Pages:', ctx.pages().length);
  // Wait a bit then close
  await ctx.waitForTimeout(3000);
  await ctx.close();
  console.log('[Done]');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
