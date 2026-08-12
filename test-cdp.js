// 用 connectOverCDP 接管用户 Chrome，检查 4 平台登录状态
const { chromium } = require('playwright');

const PLATFORMS = [
  { name: 'Blogger',    testUrl: 'https://www.blogger.com/',           loggedOutSigns: ['accounts.google.com', '/signin', '/ServiceLogin'] },
  { name: 'Medium',     testUrl: 'https://medium.com/me',              loggedOutSigns: ['/login', '/m/signin'] },
  { name: 'WordPress',  testUrl: 'https://wordpress.com/home',         loggedOutSigns: ['/log-in', 'login.wordpress.com'] },
  { name: 'Tumblr',     testUrl: 'https://www.tumblr.com/dashboard',   loggedOutSigns: ['/login', '/register'] },
];

(async () => {
  console.log('[T0] connecting to user Chrome via DevTools...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  console.log('[T1] connected');

  const ctx = browser.contexts()[0];
  const page = ctx.pages()[0] || await ctx.newPage();
  console.log('[T2] using page');

  const results = {};
  for (const platform of PLATFORMS) {
    try {
      console.log(`\n[3] checking ${platform.name}...`);
      await page.goto(platform.testUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(4000);
      const url = page.url();
      const isLoggedOut = platform.loggedOutSigns.some(s => url.includes(s));
      const isLoggedIn = !isLoggedOut;
      results[platform.name] = { url, loggedIn: isLoggedIn };
      console.log(`  URL: ${url}`);
      console.log(`  ${isLoggedIn ? '✅ 已登录' : '❌ 未登录'}`);
    } catch (e) {
      results[platform.name] = { error: e.message };
      console.log(`  错误: ${e.message}`);
    }
  }

  console.log('\n=== 汇总 ===');
  console.log(JSON.stringify(results, null, 2));
  const count = Object.values(results).filter(r => r.loggedIn).length;
  console.log(`\n结果: ${count}/4 平台已登录`);

  await browser.close();
  process.exit(0);
})();