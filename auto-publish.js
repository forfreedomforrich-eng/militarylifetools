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

async function ensureLoggedIn(page, url, signs, name) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  const u = page.url();
  const logged = !signs.some(s => u.includes(s));
  console.log(`${name}: ${logged ? '✅ LOGGED IN' : '❌ NOT LOGGED IN'}`);
  if (!logged) throw new Error(`${name} not logged in`);
  return logged;
}

async function publishBlogger(ctx, bah) {
  console.log('[Blogger] Opening editor...');
  const page = await ctx.newPage();
  await page.goto('https://www.blogger.com/blog/posts', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(3000);
  console.log('URL:', page.url());
  
  // Screenshot
  await page.screenshot({ path: path.join(SHOTS, 'blogger-editor.png'), fullPage: true });
  
  // Fill title
  const titleInput = page.locator('input[placeholder*="Title"], input[placeholder*="title"], [data-title-placeholder]').first();
  if (await titleInput.count() > 0) {
    await titleInput.fill(bah.title);
    console.log('[OK] Title set');
  } else {
    const ces = page.locator('[contenteditable="true"]').all();
    if (ces.length > 0) {
      await ces[0].click(); await sleep(500);
      await page.keyboard.press('Control+a');
      await page.keyboard.type(bah.title);
      console.log('[OK] Title via contenteditable');
    }
  }
  
  // HTML toggle
  const htmlBtn = page.locator('text=HTML').first();
  if (await htmlBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await htmlBtn.click(); await sleep(1000);
  }
  
  // Paste body into editor
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
  
  await page.screenshot({ path: path.join(SHOTS, 'blogger-filled.png'), fullPage: true });
  console.log('[OK] Blogger post ready! Click Publish manually.');
  return page;
}

async function publishMedium(ctx, bahMed) {
  console.log('[Medium] Opening editor...');
  const page = await ctx.newPage();
  await page.goto('https://medium.com/new-story', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  console.log('URL:', page.url());
  
  // Parse subtitle
  const lines = bahMed.body.split('\\n');
  const subtitleMatch = lines.find(l => l.startsWith('SUBTITLE:'));
  const subtitle = subtitleMatch ? subtitleMatch.replace('SUBTITLE:', '').trim() : null;
  const bodyNoSubtitle = lines.filter(l => !l.startsWith('SUBTITLE:')).join('\\n').trim();
  
  // Fill title
  const titleEl = page.locator('[placeholder="Title"], h1[contenteditable], [class*="title"]').first();
  if (await titleEl.count() > 0) {
    await titleEl.click(); await sleep(500);
    await page.keyboard.insertText(bahMed.title);
    console.log('[OK] Title set');
  }
  
  // Fill subtitle
  if (subtitle) {
    const subEl = page.locator('[placeholder="Subtitle"], [class*="subtitle"]').first();
    if (await subEl.count() > 0) {
      await subEl.click(); await sleep(500);
      await page.keyboard.insertText(subtitle);
      console.log('[OK] Subtitle set');
    }
  }
  
  // Fill body
  const bodyEl = page.locator('[placeholder="Tell your story"], [class*="story"]').first();
  if (await bodyEl.count() > 0) {
    await bodyEl.click(); await sleep(500);
    await page.keyboard.insertText(bodyNoSubtitle);
    console.log('[OK] Body pasted');
  }
  
  // Tags
  const tagBtn = page.locator('text=Tags, button:has-text("Tags"), [aria-label*="tag"]').first();
  if (await tagBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await tagBtn.click(); await sleep(1000);
    for (const tag of ['BAH 2026', 'Military Housing', 'Military Pay', 'Veterans']) {
      await page.keyboard.type(tag);
      await page.keyboard.press('Enter');
      await sleep(500);
    }
    console.log('[OK] Tags set');
  }
  
  await page.screenshot({ path: path.join(SHOTS, 'medium-filled.png'), fullPage: true });
  console.log('[OK] Medium post ready! Click Publish manually.');
  return page;
}

(async () => {
  console.log('[1] Launching browser...');
  const browser = await chromium.launch({ headless: false, args: ['--disable-blink-features=AutomationControlled'] });
  const ctx = await browser.newContext();
  
  // Check Blogger
  let bloggerPage = null;
  try {
    const bp = await ctx.newPage();
    await ensureLoggedIn(bp, 'https://www.blogger.com/', ['accounts.google.com', '/signin'], 'Blogger');
    await bp.close();
    
    const bah = parseFile(path.join(PASTE_DIR, 'bah-blogger-paste-ready.txt'));
    bloggerPage = await publishBlogger(ctx, bah);
  } catch (e) {
    console.log('[Blogger] Skipping:', e.message);
  }
  
  // Check Medium
  let mediumPage = null;
  try {
    const mp = await ctx.newPage();
    await ensureLoggedIn(mp, 'https://medium.com/me', ['/login', '/m/signin'], 'Medium');
    await mp.close();
    
    const bahMed = parseFile(path.join(PASTE_DIR, 'bah-medium-paste-ready.txt'));
    mediumPage = await publishMedium(ctx, bahMed);
  } catch (e) {
    console.log('[Medium] Skipping:', e.message);
  }
  
  console.log('\\n=== Posts prepared! ===');
  console.log('Browser is open. Please click Publish on each tab.');
  console.log('When done, close all browser windows and tell me the results.');
  console.log('Or press Ctrl+C here to close the browser.');
  
  // Keep browser open
  await sleep(600000);
  await browser.close();
  console.log('[Browser closed]');
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
