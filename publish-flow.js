const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目';
const PASTE_DIR = path.join(PROJECT_ROOT, 'promo-content', 'outreach-round-2', 'paste-ready');

function parseFile(fp) {
  const content = fs.readFileSync(fp, 'utf-8');
  const lines = content.split('\\n');
  return { title: lines[0].replace('TITLE:', '').trim(), body: lines.slice(2).join('\\n').trim() };
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  console.log('[1] Launching browser...');
  const browser = await chromium.launch({ headless: false, args: ['--disable-blink-features=AutomationControlled'] });
  const ctx = await browser.newContext();
  console.log('[OK] Browser ready\\n');

  // Check each platform with longer timeout
  const checks = [
    { name: 'Blogger', url: 'https://www.blogger.com/', signs: ['accounts.google.com', '/signin'] },
    { name: 'Medium', url: 'https://medium.com/me', signs: ['/login', '/m/signin'] },
    { name: 'WordPress', url: 'https://wordpress.com/home', signs: ['/log-in', 'login.wordpress.com'] },
    { name: 'Tumblr', url: 'https://www.tumblr.com/dashboard', signs: ['/login', '/register'] },
  ];

  const results = {};
  for (const c of checks) {
    try {
      const page = await ctx.newPage();
      await page.goto(c.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await sleep(3000);
      const u = page.url();
      const loggedIn = !c.signs.some(s => u.includes(s));
      results[c.name] = { loggedIn, url: u.substring(0, 70) };
      console.log(`${c.name}: ${loggedIn ? '✅ LOGGED IN' : '❌ NOT LOGGED IN'} (${u.substring(0,60)})`);
      await page.close();
    } catch (e) {
      results[c.name] = { loggedIn: false, error: e.message.substring(0, 80) };
      console.log(`${c.name}: ⚠️ TIMEOUT - ${e.message.substring(0, 80)}`);
    }
  }

  console.log(`\\n=== ${Object.values(results).filter(r=>r.loggedIn).length}/4 logged in ===`);

  // Publish BAH to Blogger if logged in
  if (results.Blogger?.loggedIn) {
    console.log('\\n[Blogger] Starting BAH post...');
    const bah = parseFile(path.join(PASTE_DIR, 'bah-blogger-paste-ready.txt'));
    const page = await ctx.newPage();
    await page.goto('https://www.blogger.com/blog/posts', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await sleep(3000);
    console.log('URL:', page.url());
    await page.screenshot({ path: path.join(PROJECT_ROOT, 'shots', 'blogger-editor.png'), fullPage: true });

    // Fill title
    const titleInput = page.locator('input[placeholder*="Title"], input[placeholder*="title"], [data-title-placeholder]').first();
    if (await titleInput.count() > 0) {
      await titleInput.fill(bah.title);
      console.log('[OK] Title set');
    } else {
      const ces = page.locator('[contenteditable="true"]').all();
      if (ces.length > 0) { await ces[0].click(); await sleep(500); await page.keyboard.press('Control+a'); await page.keyboard.type(bah.title); console.log('[OK] Title via CE'); }
    }

    // HTML toggle
    const htmlBtn = page.locator('text=HTML').first();
    if (await htmlBtn.isVisible({ timeout: 5000 }).catch(() => false)) { await htmlBtn.click(); await sleep(1000); }

    // Paste body
    const editors = page.locator('[contenteditable="true"]').all();
    if (editors.length > 0) {
      await editors[0].click(); await sleep(500);
      await page.keyboard.press('Control+a'); await sleep(500);
      await page.keyboard.insertText(bah.body);
      console.log('[OK] Body pasted');
    }

    // Labels
    const labelInput = page.locator('input[placeholder*="label"], input[placeholder*="Label"]').first();
    if (await labelInput.count() > 0) {
      await labelInput.fill('BAH Calculator, Military Housing, BAH 2026, Military Pay, Veterans');
      console.log('[OK] Labels set');
    }

    await page.screenshot({ path: path.join(PROJECT_ROOT, 'shots', 'blogger-filled.png'), fullPage: true });
    console.log('[OK] Blogger BAH post is ready! Click Publish manually.');
  }

  // Try Medium
  if (results.Medium?.loggedIn) {
    console.log('\\n[Medium] Opening editor...');
    const page = await ctx.newPage();
    await page.goto('https://medium.com/new-story', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await sleep(2000);
    console.log('URL:', page.url());
    await page.screenshot({ path: path.join(PROJECT_ROOT, 'shots', 'medium-editor.png'), fullPage: true });
    console.log('[OK] Medium editor opened!');
  }

  console.log('\\nBrowser is open. You can manually complete publishing.');
  console.log('When finished, close all browser windows and tell me the results.');
  await sleep(600000);
  await browser.close();
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
