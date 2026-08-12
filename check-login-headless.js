const { chromium } = require('playwright');
const path = require('path');

const PROJECT_ROOT = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目';
const PLATFORMS = [
  { name: 'Blogger',    testUrl: 'https://www.blogger.com/',          loggedOutSigns: ['accounts.google.com', '/signin', '/ServiceLogin'] },
  { name: 'Medium',     testUrl: 'https://medium.com/me',             loggedOutSigns: ['/login', '/m/signin'] },
  { name: 'WordPress',  testUrl: 'https://wordpress.com/home',        loggedOutSigns: ['/log-in', 'login.wordpress.com'] },
  { name: 'Tumblr',     testUrl: 'https://www.tumblr.com/dashboard',  loggedOutSigns: ['/login', '/register'] },
];

(async () => {
  const profileDir = path.join(PROJECT_ROOT, '.chrome-auto-profile');
  const ctx = await chromium.launchPersistentContext(profileDir, {
    headless: true,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled'],
    timeout: 20000,
  });
  console.log('[OK] Browser launched (headless)');

  const results = {};
  const page = await ctx.newPage();

  for (const platform of PLATFORMS) {
    try {
      console.log(`\\n[2] Checking ${platform.name}...`);
      await page.goto(platform.testUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(3000);
      const currentUrl = page.url();
      const isLoggedOut = platform.loggedOutSigns.some(sign => currentUrl.includes(sign));
      results[platform.name] = { url: currentUrl, loggedIn: !isLoggedOut };
      console.log(`  URL: ${currentUrl.substring(0, 80)}`);
      console.log(`  ${!isLoggedOut ? '✅ LOGGED IN' : '❌ NOT LOGGED IN'}`);
    } catch (e) {
      results[platform.name] = { error: e.message.substring(0, 100) };
      console.log(`  Error: ${e.message.substring(0, 100)}`);
    }
  }

  const loggedInCount = Object.values(results).filter(r => r.loggedIn).length;
  console.log(`\\n=== Result: ${loggedInCount}/4 platforms logged in ===`);
  console.log(JSON.stringify(results, null, 2));
  await ctx.close();
})().catch(e => { console.error(e.message); process.exit(1); });
