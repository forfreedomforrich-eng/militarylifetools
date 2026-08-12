const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目';
const PASTE_DIR = path.join(PROJECT_ROOT, 'promo-content', 'outreach-round-2', 'paste-ready');
const SHOTS = path.join(PROJECT_ROOT, 'shots');
const LOG_FILE = path.join(PROJECT_ROOT, 'publish.log');

function log(msg) {
  console.log(msg);
  fs.appendFileSync(LOG_FILE, msg + '\\n');
}

function parseFile(fp) {
  const content = fs.readFileSync(fp, 'utf-8');
  const lines = content.split('\\n');
  return { title: lines[0].replace('TITLE:', '').trim(), body: lines.slice(2).join('\\n').trim() };
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  log('[1] Connecting to Chrome via CDP (port 9229)...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9229');
  log('[OK] Connected! Browser: ' + browser.version());
  
  // List existing pages
  for (const ctx of browser.contexts()) {
    log(`Context: ${ctx.pages().length} tabs`);
    for (const p of ctx.pages()) {
      log(`  Tab: ${p.url().substring(0,70)}`);
    }
  }
  
  // Check all platforms
  const checks = [
    { name: 'Blogger', url: 'https://www.blogger.com/', signs: ['accounts.google.com', '/signin'] },
    { name: 'Medium', url: 'https://medium.com/me', signs: ['/login', '/m/signin'] },
    { name: 'WordPress', url: 'https://wordpress.com/home', signs: ['/log-in', 'login.wordpress.com'] },
    { name: 'Tumblr', url: 'https://www.tumblr.com/dashboard', signs: ['/login', '/register'] },
  ];
  
  const results = {};
  for (const c of checks) {
    try {
      let page = null;
      // Try to find existing page for this URL
      for (const ctx of browser.contexts()) {
        for (const p of ctx.pages()) {
          if (p.url().includes(c.url.split('/')[2])) {
            page = p;
            break;
          }
        }
        if (page) break;
      }
      
      if (!page) {
        const ctx = browser.contexts()[0];
        page = await ctx.newPage();
      }
      
      await page.goto(c.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await sleep(2000);
      const u = page.url();
      const logged = !c.signs.some(s => u.includes(s));
      results[c.name] = logged;
      log(`${c.name}: ${logged ? '✅ LOGGED IN' : '❌ NOT LOGGED IN'} (${u.substring(0,60)})`);
      if (!logged) await page.close();
    } catch (e) {
      results[c.name] = false;
      log(`${c.name}: ⚠️ ERR ${e.message.substring(0,60)}`);
    }
  }
  
  const loggedIn = Object.values(results).filter(x => x).length;
  log(`\\n=== ${loggedIn}/4 logged in ===`);
  
  // Publish to Blogger if logged in
  if (results.Blogger) {
    log('\\n[=== Publishing BAH to Blogger ===]');
    const page = browser.contexts()[0].pages().find(p => p.url().includes('blogger.com'));
    if (!page) {
      const ctx = browser.contexts()[0];
      page = await ctx.newPage();
      await page.goto('https://www.blogger.com/blog/posts', { waitUntil: 'domcontentloaded', timeout: 15000 });
    }
    
    await sleep(2000);
    await page.screenshot({ path: path.join(SHOTS, 'blogger-check.png'), fullPage: true });
    
    // Navigate to new post
    await page.goto('https://www.blogger.com/blog/posts', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await sleep(3000);
    await page.screenshot({ path: path.join(SHOTS, 'blogger-posts.png'), fullPage: true });
    
    // Click new post
    const newPostBtn = page.locator('button:has-text("新建"), text=新建文章, [data-testid="new-post"], .new-post-btn').first();
    if (await newPostBtn.count() > 0) {
      await newPostBtn.click();
      await sleep(3000);
    } else {
      // Try direct URL
      await page.goto('https://www.blogger.com/blog/posts/create', { waitUntil: 'domcontentloaded', timeout: 15000 });
      await sleep(3000);
    }
    
    await page.screenshot({ path: path.join(SHOTS, 'blogger-editor.png'), fullPage: true });
    
    const bah = parseFile(path.join(PASTE_DIR, 'bah-blogger-paste-ready.txt'));
    
    // Fill title
    const titleInput = page.locator('input[placeholder*="Title"], input[placeholder*="标题"]').first();
    if (await titleInput.count() > 0) {
      await titleInput.fill(bah.title);
      log('[OK] Title filled');
    }
    
    // HTML toggle
    const htmlBtn = page.locator('text=HTML').first();
    if (await htmlBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await htmlBtn.click();
      await sleep(1000);
    }
    
    // Paste body
    const editors = page.locator('[contenteditable="true"]').all();
    if (editors.length > 0) {
      await editors[0].click();
      await sleep(500);
      await page.keyboard.press('Control+a');
      await sleep(300);
      await page.keyboard.insertText(bah.body);
      log('[OK] Body pasted');
    }
    
    // Labels
    const labelInput = page.locator('input[placeholder*="label"], input[placeholder*="标签"]').first();
    if (await labelInput.count() > 0) {
      await labelInput.fill('BAH Calculator, Military Housing, BAH 2026, Military Pay, Veterans');
      log('[OK] Labels set');
    }
    
    await page.screenshot({ path: path.join(SHOTS, 'blogger-filled.png'), fullPage: true });
    log('\\n[OK] Blogger post is ready! Please click "Publish" manually.');
  }
  
  // Publish to Medium if logged in
  if (results.Medium) {
    log('\\n[=== Publishing BAH to Medium ===]');
    const page = browser.contexts()[0].pages().find(p => p.url().includes('medium.com'));
    if (!page) {
      const ctx = browser.contexts()[0];
      page = await ctx.newPage();
      await page.goto('https://medium.com/new-story', { waitUntil: 'domcontentloaded', timeout: 15000 });
    }
    await sleep(2000);
    
    const bahMed = parseFile(path.join(PASTE_DIR, 'bah-medium-paste-ready.txt'));
    
    // Title
    const titleEl = page.locator('[placeholder="Title"], h1[contenteditable]').first();
    if (await titleEl.count() > 0) {
      await titleEl.click();
      await sleep(500);
      await page.keyboard.insertText(bahMed.title);
      log('[OK] Title set');
    }
    
    // Body
    const bodyEl = page.locator('[placeholder="Tell your story"]').first();
    if (await bodyEl.count() > 0) {
      await bodyEl.click();
      await sleep(500);
      await page.keyboard.insertText(bahMed.body);
      log('[OK] Body pasted');
    }
    
    await page.screenshot({ path: path.join(SHOTS, 'medium-filled.png'), fullPage: true });
    log('[OK] Medium post is ready! Click Publish manually.');
  }
  
  if (!results.Blogger && !results.Medium) {
    log('\\n⚠️ No platforms logged in. Please log in to at least one platform manually.');
  }
  
  log('\\n=== Browser is open. Click Publish on each tab when ready. ===');
  log('Then tell me "done" and I will record the results.');
  
  // Keep browser open
  await sleep(600000);
  log('[Script ended]');
})().catch(e => { log('FATAL ERR: ' + e.message); process.exit(1); });
