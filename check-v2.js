const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROFILE_DIR = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\.chrome-auto-profile-v2';
const PASTE_DIR = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\promo-content\\\\outreach-round-2\\\\paste-ready';

function parseFile(fp) {
  const content = fs.readFileSync(fp, 'utf-8');
  const lines = content.split('\\n');
  return { title: lines[0].replace('TITLE:', '').trim(), body: lines.slice(2).join('\\n').trim() };
}

// 检查登录状态
async function checkLogin(ctx, platform, testUrl, loggedOutSigns) {
  const page = await ctx.newPage();
  await page.goto(testUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  const url = page.url();
  const isLoggedOut = loggedOutSigns.some(s => url.includes(s));
  await page.close();
  return !isLoggedOut;
}

(async () => {
  console.log('Launching Chromium...');
  const ctx = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: true,
    timeout: 30000,
  });
  console.log('[OK] Launched!');
  
  const r1 = await checkLogin(ctx, 'Blogger', 'https://www.blogger.com/', ['accounts.google.com', '/signin']);
  const r2 = await checkLogin(ctx, 'Medium', 'https://medium.com/me', ['/login', '/m/signin']);
  const r3 = await checkLogin(ctx, 'WordPress', 'https://wordpress.com/home', ['/log-in', 'login.wordpress.com']);
  const r4 = await checkLogin(ctx, 'Tumblr', 'https://www.tumblr.com/dashboard', ['/login']);
  
  console.log(`Blogger: ${r1?'✅':'❌'}, Medium: ${r2?'✅':'❌'}, WordPress: ${r3?'✅':'❌'}, Tumblr: ${r4?'✅':'❌'}`);
  await ctx.close();
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
