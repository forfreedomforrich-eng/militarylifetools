const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目';
const PASTE_DIR = path.join(PROJECT_ROOT, 'promo-content', 'outreach-round-2', 'paste-ready');
const SHOTS = path.join(PROJECT_ROOT, 'shots');
const USER_PROFILE = 'C:\\\\Users\\\\kusan\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data';

function parseFile(fp) {
  const content = fs.readFileSync(fp, 'utf-8');
  const lines = content.split('\\n');
  return { title: lines[0].replace('TITLE:', '').trim(), body: lines.slice(2).join('\\n').trim() };
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  console.log('[Step 1] Launching real Chrome with your profile...');
  
  // Use persistent context with user Chrome profile (visible mode)
  const ctx = await chromium.launchPersistentContext(USER_PROFILE, {
    channel: 'chrome',  // Use installed Chrome, not Playwright's Chromium
    headless: false,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-features=IsolateOrigins,site-per-process'
    ],
    timeout: 60000,
  });
  
  console.log('[OK] Chrome opened with your profile!');
  console.log('Please log in to all 4 platforms:');
  console.log('  1. Blogger  - click "登录" in top right');
  console.log('  2. Medium   - go to medium.com/me');
  console.log('  3. WordPress - go to wordpress.com/home');
  console.log('  4. Tumblr   - go to tumblr.com/dashboard');
  console.log('\\nAfter logging in, tell me "done" and I will start publishing.');
  
  // Wait for user to log in
  await sleep(300000); // 5 minutes max
  
  // Check all platforms
  console.log('\\n[Checking login status...]');
  const results = {};
  
  for (const { name, url, signs } of [
    { name: 'Blogger', url: 'https://www.blogger.com/', signs: ['accounts.google.com', '/signin'] },
    { name: 'Medium', url: 'https://medium.com/me', signs: ['/login', '/m/signin'] },
    { name: 'WordPress', url: 'https://wordpress.com/home', signs: ['/log-in', 'login.wordpress.com'] },
    { name: 'Tumblr', url: 'https://www.tumblr.com/dashboard', signs: ['/login', '/register'] },
  ]) {
    try {
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await sleep(2000);
      const u = page.url();
      const logged = !signs.some(s => u.includes(s));
      results[name] = logged;
      console.log(`${name}: ${logged ? '✅ LOGGED IN' : '❌ NOT LOGGED IN'}`);
      await page.close();
    } catch(e) {
      results[name] = false;
      console.log(`${name}: ❌ ERROR (${e.message.substring(0,60)})`);
    }
  }
  
  const loggedInCount = Object.values(results).filter(x => x).length;
  console.log(`\\n=== ${loggedInCount}/4 logged in ===`);
  
  if (loggedInCount === 0) {
    console.log('No platforms logged in. Please log in manually then tell me "done".');
    await sleep(300000);
    await ctx.close();
    return;
  }
  
  // Now publish
  await publishPosts(ctx);
  await ctx.close();
  console.log('[Done]');
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });

async function publishPosts(ctx) {
  const results = {};
  
  // === BLOGGER ===
  if (true) {
    console.log('\\n[=== Blogger ===]');
    try {
      const page = await ctx.newPage();
      await page.goto('https://www.blogger.com/blog/posts', { waitUntil: 'domcontentloaded', timeout: 15000 });
      await sleep(3000);
      
      // Check if we need to create a blog first
      if (page.url().includes('blog/posts') || page.url().includes('new')) {
        // Try to create new post
        const newPostBtn = page.locator('text=新建文章, button:has-text("新建"), .new-post-btn, [data-testid="new-post"]').first();
        if (await newPostBtn.count() > 0) {
          await newPostBtn.click();
          await sleep(2000);
        }
        
        // If still on wrong page, try direct post URL
        if (page.url().includes('blog/posts')) {
          await page.goto('https://www.blogger.com/blog/posts/create', { waitUntil: 'domcontentloaded', timeout: 15000 });
          await sleep(3000);
        }
      }
      
      await page.screenshot({ path: path.join(SHOTS, 'blogger-step1.png'), fullPage: true });
      
      const bah = parseFile(path.join(PASTE_DIR, 'bah-blogger-paste-ready.txt'));
      
      // Fill title
      const titleInput = page.locator('input[placeholder*="Title"], input[placeholder*="标题"]').first();
      if (await titleInput.count() > 0) {
        await titleInput.fill(bah.title);
        console.log('[OK] Title filled');
      }
      
      // Toggle HTML
      const htmlBtn = page.locator('text=HTML').first();
      if (await htmlBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await htmlBtn.click(); await sleep(1000);
      }
      
      // Paste body
      const editors = page.locator('[contenteditable="true"]').all();
      if (editors.length > 0) {
        await editors[0].click(); await sleep(500);
        await page.keyboard.press('Control+a'); await sleep(300);
        await page.keyboard.insertText(bah.body);
        console.log('[OK] Body pasted');
      }
      
      // Labels
      const labelInput = page.locator('input[placeholder*="label"], input[placeholder*="标签"]').first();
      if (await labelInput.count() > 0) {
        await labelInput.fill('BAH Calculator, Military Housing, BAH 2026');
        console.log('[OK] Labels set');
      }
      
      await page.screenshot({ path: path.join(SHOTS, 'blogger-final.png'), fullPage: true });
      console.log('[OK] Blogger post ready! Click Publish.');
      results.Blogger = 'READY';
    } catch(e) {
      console.log('[Blogger] Error:', e.message);
      results.Blogger = 'ERROR';
    }
  }
  
  // === MEDIUM ===
  console.log('\\n[=== Medium ===]');
  try {
    const page = await ctx.newPage();
    await page.goto('https://medium.com/new-story', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await sleep(2000);
    console.log('Medium URL:', page.url());
    
    const bahMed = parseFile(path.join(PASTE_DIR, 'bah-medium-paste-ready.txt'));
    
    // Fill title
    const titleEl = page.locator('[placeholder="Title"], h1[contenteditable]').first();
    if (await titleEl.count() > 0) {
      await titleEl.click(); await sleep(500);
      await page.keyboard.insertText(bahMed.title);
      console.log('[OK] Title set');
    }
    
    // Fill body
    const bodyEl = page.locator('[placeholder="Tell your story"], [class*="story"]').first();
    if (await bodyEl.count() > 0) {
      await bodyEl.click(); await sleep(500);
      await page.keyboard.insertText(bahMed.body);
      console.log('[OK] Body pasted');
    }
    
    await page.screenshot({ path: path.join(SHOTS, 'medium-ready.png'), fullPage: true });
    console.log('[OK] Medium post ready! Click Publish.');
    results.Medium = 'READY';
  } catch(e) {
    console.log('[Medium] Error:', e.message);
    results.Medium = 'ERROR';
  }
  
  console.log('\\n=== All posts prepared! Click Publish on each tab. ===');
}
