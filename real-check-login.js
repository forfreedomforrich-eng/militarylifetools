const { chromium } = require('playwright');
(async () => {
  const ctx = await chromium.launchPersistentContext('C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\.chrome-auto-profile', {
    headless: true, channel: 'chrome', timeout: 20000
  });
  const page = await ctx.newPage();
  
  // Blogger - 检查是否显示登录按钮
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const bloggerText = await page.evaluate(() => document.body.innerText);
  const bloggerHasLogin = bloggerText.includes('登录') || bloggerText.includes('Sign in') || bloggerText.includes('Sign in');
  console.log('Blogger:', page.url(), '| Has login prompt:', bloggerHasLogin);
  
  // Medium
  await page.goto('https://medium.com/me', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const medText = await page.evaluate(() => document.body.innerText);
  const medHasLogin = medText.includes('log in') || medText.includes('Log in') || medText.includes('/login');
  console.log('Medium:', page.url(), '| Has login prompt:', medHasLogin);
  console.log('Medium title sample:', medText.substring(0, 200));
  
  // WordPress
  await page.goto('https://wordpress.com/home', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  console.log('WordPress:', page.url());
  
  // Tumblr
  await page.goto('https://www.tumblr.com/dashboard', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  console.log('Tumblr:', page.url());
  
  await ctx.close();
})().catch(e => { console.error(e.message); process.exit(1); });
