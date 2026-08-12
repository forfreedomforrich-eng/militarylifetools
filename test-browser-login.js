// 测试脚本：检查是否已登录到 4 个平台（用 Chrome，因为用户的 Google 账号在 Chrome）
const { chromium } = require('playwright');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CHROME_USER_DATA = 'C:\\Users\\kusan\\AppData\\Local\\Google\\Chrome\\User Data';

const PLATFORMS = [
  { name: 'Blogger',    testUrl: 'https://www.blogger.com/',           loggedOutSigns: ['accounts.google.com', '/signin'] },
  { name: 'Medium',     testUrl: 'https://medium.com/me',              loggedOutSigns: ['/login', '/m/signin'] },
  { name: 'WordPress',  testUrl: 'https://wordpress.com/home',         loggedOutSigns: ['/log-in', 'login.wordpress.com'] },
  { name: 'Tumblr',     testUrl: 'https://www.tumblr.com/dashboard',   loggedOutSigns: ['/login', '/register'] },
];

(async () => {
  let browser;
  try {
    console.log('[1] 启动 Chrome（使用你的用户配置）...');
    browser = await chromium.launchPersistentContext(CHROME_USER_DATA, {
      executablePath: CHROME_PATH,
      headless: false,
      channel: 'chrome',
      no_viewport: true,
      args: ['--disable-blink-features=AutomationControlled'],
    });
    console.log('[OK] Chrome 启动成功');
  } catch (e) {
    console.log('[FAIL] 启动失败（可能 Chrome 还在运行？）:');
    console.log(e.message);
    process.exit(1);
  }

  const results = {};
  const page = await browser.newPage();

  for (const platform of PLATFORMS) {
    try {
      console.log(`\n[2] 检查 ${platform.name}...`);
      await page.goto(platform.testUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(4000);

      const currentUrl = page.url();
      const isLoggedOut = platform.loggedOutSigns.some(sign => currentUrl.includes(sign));
      const isLoggedIn = !isLoggedOut;

      results[platform.name] = { url: currentUrl, loggedIn: isLoggedIn };
      console.log(`  当前 URL: ${currentUrl}`);
      console.log(`  登录状态: ${isLoggedIn ? '✅ 已登录' : '❌ 未登录'}`);
    } catch (e) {
      results[platform.name] = { error: e.message };
      console.log(`  错误: ${e.message}`);
    }
  }

  console.log('\n=== 汇总 ===');
  console.log(JSON.stringify(results, null, 2));

  // 计算已登录数
  const loggedInCount = Object.values(results).filter(r => r.loggedIn).length;
  console.log(`\n结果: ${loggedInCount}/4 平台已登录`);

  if (loggedInCount < 4) {
    console.log('\n⚠️ 部分平台未登录，我会在自动化过程中提示你登录');
    console.log('   请保持浏览器窗口打开，登录完告诉我"已登录"');
  } else {
    console.log('\n✅ 4 个平台全部已登录！准备开始自动发布');
  }

  await page.waitForTimeout(2000);
  // 不关浏览器，让用户看到结果
})();