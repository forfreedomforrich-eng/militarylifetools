const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目';
const PROFILE = 'C:\\\\Users\\\\kusan\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data';
const PASTE_DIR = path.join(PROJECT_ROOT, 'promo-content', 'outreach-round-2', 'paste-ready');

function parseFile(fp) {
  const content = fs.readFileSync(fp, 'utf-8');
  const lines = content.split('\\n');
  return { title: lines[0].replace('TITLE:', '').trim(), body: lines.slice(2).join('\\n').trim() };
}

async function checkLogin(page, platform, testUrl, loggedOutSigns) {
  await page.goto(testUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  const url = page.url();
  const isLoggedOut = loggedOutSigns.some(s => url.includes(s));
  console.log(`${platform}: ${url.substring(0, 60)} | ${isLoggedOut ? '❌ NOT LOGGED IN' : '✅ LOGGED IN'}`);
  return !isLoggedOut;
}

(async () => {
  console.log('[1] Launching Chrome with real profile...');
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: true,
    channel: 'chrome',
    timeout: 30000,
  });
  console.log('[OK] Browser launched');

  const page = await ctx.newPage();

  // Check all 4 platforms
  const p1 = await checkLogin(page, 'Blogger', 'https://www.blogger.com/', ['accounts.google.com', '/signin', '/ServiceLogin']);
  const p2 = await checkLogin(page, 'Medium', 'https://medium.com/me', ['/login', '/m/signin']);
  const p3 = await checkLogin(page, 'WordPress', 'https://wordpress.com/home', ['/log-in', 'login.wordpress.com']);
  const p4 = await checkLogin(page, 'Tumblr', 'https://www.tumblr.com/dashboard', ['/login', '/register']);

  console.log(`\\n=== ${[p1,p2,p3,p4].filter(x=>x).length}/4 logged in ===`);
  await ctx.close();
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
