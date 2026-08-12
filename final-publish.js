const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目';
const PASTE_DIR = path.join(PROJECT_ROOT, 'promo-content', 'outreach-round-2', 'paste-ready');
const SHOTS = path.join(PROJECT_ROOT, 'shots');

function parseFile(fp) {
  const content = fs.readFileSync(fp, 'utf-8');
  const lines = content.split('\\n');
  return { title: lines[0].replace('TITLE:', '').trim(), body: lines.slice(2).join('\\n').trim() };
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  console.log('=== Round 2 Auto-Publish Tool ===\\n');
  
  const browser = await chromium.launch({ 
    headless: false, 
    args: ['--disable-blink-features=AutomationControlled', '--start-maximized'] 
  });
  const ctx = await browser.newContext();
  
  // Step 1: Open Blogger for manual login
  console.log('[Step 1] Opening Blogger...');
  const bp = await ctx.newPage();
  await bp.goto('https://www.blogger.com/home', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await sleep(3000);
  await bp.screenshot({ path: path.join(SHOTS, 'blogger-login.png'), fullPage: true });
  
  // Check if logged in
  const bloggerLoggedIn = !bp.url().includes('signin') && !bp.url().includes('accounts.google.com');
  if (!bloggerLoggedIn) {
    console.log('⚠️  Blogger 未登录，请在浏览器中登录，然后告诉我"继续"');
    console.log('浏览器会保持打开 120 秒让你登录');
    await sleep(120000);
    
    // Re-check after waiting
    await bp.reload({ waitUntil: 'domcontentloaded' });
    await sleep(3000);
    if (bp.url().includes('signin')) {
      console.log('❌ 登录超时，请手动登录后重新运行脚本');
      await browser.close();
      process.exit(1);
    }
    console.log('✅ Blogger 已登录');
  } else {
    console.log('✅ Blogger 已登录');
  }
  
  // Step 2: Navigate to new post
  console.log('\\n[Step 2] Opening BAH post editor...');
  await bp.goto('https://www.blogger.com/blog/posts', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  await bp.screenshot({ path: path.join(SHOTS, 'blogger-posts.png'), fullPage: true });
  
  // Click "New Post"
  const newPostBtn = bp.locator('text=新建文章, button:has-text("新建"), [role="button"]:has-text("新建")').first();
  if (await newPostBtn.count() > 0) {
    await newPostBtn.click();
    await sleep(2000);
    console.log('[OK] New post clicked');
  }
  
  await bp.screenshot({ path: path.join(SHOTS, 'blogger-editor.png'), fullPage: true });
  
  // Fill in the post
  const bah = parseFile(path.join(PASTE_DIR, 'bah-blogger-paste-ready.txt'));
  
  // Title
  const titleInput = bp.locator('input[placeholder*="Title"], input[placeholder*="标题"]').first();
  if (await titleInput.count() > 0) {
    await titleInput.fill(bah.title);
    console.log('[OK] Title filled');
  }
  
  // HTML mode
  const htmlBtn = bp.locator('text=HTML').first();
  if (await htmlBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await htmlBtn.click();
    await sleep(1000);
  }
  
  // Body
  const editors = bp.locator('[contenteditable="true"]').all();
  if (editors.length > 0) {
    await editors[0].click();
    await sleep(500);
    await bp.keyboard.press('Control+a');
    await sleep(300);
    await bp.keyboard.insertText(bah.body);
    console.log('[OK] Body pasted');
  }
  
  // Labels
  const labelInput = bp.locator('input[placeholder*="label"], input[placeholder*="标签"]').first();
  if (await labelInput.count() > 0) {
    await labelInput.fill('BAH Calculator, Military Housing, BAH 2026, Military Pay, Veterans');
    console.log('[OK] Labels set');
  }
  
  await bp.screenshot({ path: path.join(SHOTS, 'blogger-filled.png'), fullPage: true });
  console.log('\\n✅ Blogger BAH post is ready! Please click "Publish" manually.');
  
  // Step 3: Check Medium (known to be blocked by Cloudflare)
  console.log('\\n[Step 3] Checking Medium...');
  const mp = await ctx.newPage();
  try {
    await mp.goto('https://medium.com/me', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await sleep(2000);
    const medUrl = mp.url();
    if (medUrl.includes('/login') || medUrl.includes('blocked')) {
      console.log('❌ Medium blocked by Cloudflare or not logged in');
    } else {
      console.log('✅ Medium logged in - post manually');
    }
  } catch (e) {
    console.log('⚠️ Medium timeout:', e.message.substring(0, 50));
  }
  await mp.close();
  
  // Step 4: WordPress
  console.log('\\n[Step 4] Checking WordPress...');
  const wp = await ctx.newPage();
  try {
    await wp.goto('https://wordpress.com/home', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await sleep(2000);
    const wpUrl = wp.url();
    const wpLogged = !wpUrl.includes('log-in') && !wpUrl.includes('login.wordpress.com');
    console.log(wpLogged ? '✅ WordPress logged in' : '❌ WordPress not logged in');
  } catch (e) {
    console.log('⚠️ WordPress error');
  }
  await wp.close();
  
  // Step 5: Tumblr
  console.log('\\n[Step 5] Checking Tumblr...');
  const tp = await ctx.newPage();
  try {
    await tp.goto('https://www.tumblr.com/dashboard', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await sleep(2000);
    const tbUrl = tp.url();
    const tbLogged = !tbUrl.includes('/login') && !tbUrl.includes('/register');
    console.log(tbLogged ? '✅ Tumblr logged in' : '❌ Tumblr not logged in');
  } catch (e) {
    console.log('⚠️ Tumblr error');
  }
  await tp.close();
  
  console.log('\\n=== Browser will stay open for manual publishing ===');
  console.log('Please click Publish on the Blogger tab when ready.');
  console.log('Then close the browser and tell me the results.');
  
  // Keep browser open
  await sleep(600000);
  await browser.close();
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
