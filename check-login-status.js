const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目';
const PASTE_DIR = path.join(PROJECT_ROOT, 'promo-content', 'outreach-round-2', 'paste-ready');

const PLATFORMS = [
  { name: 'Blogger',    testUrl: 'https://www.blogger.com/',          loggedOutSigns: ['accounts.google.com', '/signin', '/ServiceLogin'] },
  { name: 'Medium',     testUrl: 'https://medium.com/me',             loggedOutSigns: ['/login', '/m/signin'] },
  { name: 'WordPress',  testUrl: 'https://wordpress.com/home',        loggedOutSigns: ['/log-in', 'login.wordpress.com'] },
  { name: 'Tumblr',     testUrl: 'https://www.tumblr.com/dashboard',  loggedOutSigns: ['/login', '/register'] },
];

(async () => {
  const profileDir = path.join(PROJECT_ROOT, '.chrome-auto-profile');
  if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

  console.log('[1] Launching Chromium with auto-profile...');
  const ctx = await chromium.launchPersistentContext(profileDir, {
    headless: false,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled'],
    timeout: 30000,
  });
  console.log('[OK] Browser launched');

  const results = {};
  const page = await ctx.newPage();

  for (const platform of PLATFORMS) {
    try {
      console.log(`\\n[2] Checking ${platform.name}...`);
      await page.goto(platform.testUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(4000);
      const currentUrl = page.url();
      const isLoggedOut = platform.loggedOutSigns.some(sign => currentUrl.includes(sign));
      results[platform.name] = { url: currentUrl, loggedIn: !isLoggedOut };
      console.log(`  URL: ${currentUrl}`);
      console.log(`  ${!isLoggedOut ? '✅ 已登录' : '❌ 未登录 - 需要手动登录'}`);
    } catch (e) {
      results[platform.name] = { error: e.message };
      console.log(`  Error: ${e.message}`);
    }
  }

  const loggedInCount = Object.values(results).filter(r => r.loggedIn).length;
  console.log(`\\n=== Summary: ${loggedInCount}/4 platforms logged in ===`);
  console.log(JSON.stringify(results, null, 2));

  // 提示用户如果需要登录就手动操作
  if (loggedInCount < 4) {
    console.log('\\n⚠️ 请在打开的浏览器中手动登录未登录的平台');
    console.log('   登录完成后告诉我，我会继续自动发布');
    console.log('   或者按 Ctrl+C 停止，等会儿再运行');
    console.log('\\n💡 如果要登录，请在浏览器窗口中操作，然后按回车继续...');
    // 等待用户提示
    await page.waitForTimeout(999999999);
  } else {
    console.log('\\n✅ All 4 platforms logged in! Ready to auto-publish.');
    await page.waitForTimeout(5000);
  }

  await ctx.close();
  console.log('[Done]');
})().catch(e => { console.error(e); process.exit(1); });
