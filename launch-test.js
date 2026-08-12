const { chromium } = require('playwright');
(async () => {
  console.log('Launching...');
  const ctx = await chromium.launchPersistentContext('C:\\\\Users\\\\kusan\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data', {
    headless: true,
    channel: 'chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 45000,
  });
  console.log('[OK] Launched!');
  await ctx.close();
  console.log('[Done]');
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
