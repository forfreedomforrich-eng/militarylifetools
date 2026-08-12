const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目';
const PROFILE_DIR = path.join(PROJECT_ROOT, '.chrome-auto-profile');
const PASTE_DIR = path.join(PROJECT_ROOT, 'promo-content', 'outreach-round-2', 'paste-ready');

async function parseFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.split('\\n');
  const title = lines[0].replace('TITLE:', '').trim();
  const bodyLines = lines.slice(2); // skip TITLE and empty line
  return { title, body: bodyLines.join('\\n').trim() };
}

async function publishBlogger(title, body, labels) {
  console.log('[Blogger] Opening Blogger...');
  const page = await browser.newPage();
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);

  // Click "New Post"
  const newPostBtn = page.locator('text=New Post').first();
  if (await newPostBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await newPostBtn.click();
    await page.waitForTimeout(2000);
  }

  // Enter title
  const titleInput = page.locator('[placeholder="Title"], input[aria-label*="title"], .post-title-input, [data-title-placeholder]').first();
  if (titleInput && await titleInput.count() > 0) {
    await titleInput.fill(title);
    console.log('[Blogger] Title set');
  } else {
    // Try finding title field differently
    const inputs = await page.locator('input[type="text"], input[placeholder*="title"], input[placeholder*="Title"]').all();
    if (inputs.length > 0) {
      await inputs[0].fill(title);
      console.log('[Blogger] Title set via input fallback');
    } else {
      console.log('[Blogger] ⚠️ Could not find title input, trying contenteditable...');
      const ce = page.locator('[contenteditable="true"]').first();
      if (await ce.count() > 0) {
        await ce.click();
        await page.keyboard.press('Control+a');
        await page.keyboard.type(title);
      }
    }
  }

  // Switch to HTML view and paste body
  const htmlBtn = page.locator('text=HTML, [aria-label="HTML"], .toggle-html, button:has-text("HTML")').first();
  if (await htmlBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await htmlBtn.click();
    await page.waitForTimeout(1000);
  }

  const editor = page.locator('.entry-content, [class*="entry-content"], [class*="editor"], [contenteditable="true"]').first();
  if (await editor.count() > 0) {
    await editor.click();
    await page.keyboard.press('Control+a');
    await page.waitForTimeout(500);
    await page.keyboard.insertText(body);
    console.log('[Blogger] Body pasted');
  }

  // Set labels
  const labelsInput = page.locator('input[placeholder*="label"], input[placeholder*="Label"], [aria-label*="label"]').first();
  if (await labelsInput.count() > 0) {
    await labelsInput.fill(labels.join(', '));
    console.log('[Blogger] Labels set:', labels.join(', '));
  }

  // Publish
  await page.waitForTimeout(1000);
  const publishBtn = page.locator('text=Publish, button:has-text("Publish"), [aria-label*="publish"]').first();
  if (await publishBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await publishBtn.click();
    console.log('[Blogger] Publish clicked');
    await page.waitForTimeout(5000);
    const currentUrl = page.url();
    console.log('[Blogger] Posted! URL:', currentUrl);
    return currentUrl;
  }

  // Screenshot for debugging
  await page.screenshot({ path: path.join(PROJECT_ROOT, 'shots', 'blogger-post.png') });
  console.log('[Blogger] Screenshot saved to shots/blogger-post.png');
  return null;
}

async function publishMedium(title, subtitle, body, tags) {
  console.log('[Medium] Opening Medium...');
  const page = await browser.newPage();
  await page.goto('https://medium.com/new-story', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);

  // Enter title
  const titleEl = page.locator('[placeholder="Title"], h1[contenteditable], [class*="title"]').first();
  if (await titleEl.count() > 0) {
    await titleEl.click();
    await page.waitForTimeout(500);
    await page.keyboard.insertText(title);
    console.log('[Medium] Title set');
  }

  // Enter subtitle
  if (subtitle) {
    const subEl = page.locator('[placeholder="Subtitle"], [class*="subtitle"]').first();
    if (await subEl.count() > 0) {
      await subEl.click();
      await page.waitForTimeout(500);
      await page.keyboard.insertText(subtitle);
      console.log('[Medium] Subtitle set');
    }
  }

  // Click in body area and paste
  const bodyEl = page.locator('[placeholder="Tell your story"], [class*="story"], [contenteditable="true"]').nth(1);
  if (await bodyEl.count() > 0) {
    await bodyEl.click();
    await page.waitForTimeout(500);
    await page.keyboard.insertText(body);
    console.log('[Medium] Body pasted');
  }

  // Set tags
  const tagBtn = page.locator('text=Tags, button:has-text("Tags"), [aria-label*="tag"]').first();
  if (await tagBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await tagBtn.click();
    await page.waitForTimeout(1000);
    for (const tag of tags) {
      await page.keyboard.type(tag);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }
    console.log('[Medium] Tags set');
  }

  // Publish
  await page.waitForTimeout(2000);
  const publishBtn = page.locator('text=Publish, button:has-text("Publish"), [aria-label*="publish"]').first();
  if (await publishBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await publishBtn.click();
    console.log('[Medium] Publish clicked');
    await page.waitForTimeout(5000);
    const currentUrl = page.url();
    console.log('[Medium] Published! URL:', currentUrl);
    return currentUrl;
  }

  await page.screenshot({ path: path.join(PROJECT_ROOT, 'shots', 'medium-post.png') });
  console.log('[Medium] Screenshot saved to shots/medium-post.png');
  return null;
}

(async () => {
  console.log('Launching browser...');
  browser = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: true,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled'],
    timeout: 30000,
  });
  console.log('[OK] Browser ready');

  const results = {};

  // --- BAH Blogger ---
  try {
    const bahBlog = await parseFile(path.join(PASTE_DIR, 'bah-blogger-paste-ready.txt'));
    const bloggerUrl = await publishBlogger(bahBlog.title, bahBlog.body, ['BAH Calculator', 'Military Housing', 'BAH 2026', 'Military Pay', 'Veterans']);
    results.bah_blogger = { title: bahBlog.title, url: bloggerUrl };
  } catch (e) {
    results.bah_blogger = { error: e.message };
    console.error('[Blogger error]', e.message);
  }

  // --- BAH Medium ---
  try {
    const bahMed = await parseFile(path.join(PASTE_DIR, 'bah-medium-paste-ready.txt'));
    const lines = bahMed.body.split('\\n');
    const subtitleMatch = lines.find(l => l.startsWith('SUBTITLE:'));
    const subtitle = subtitleMatch ? subtitleMatch.replace('SUBTITLE:', '').trim() : null;
    const bodyWithoutSubtitle = lines.filter(l => !l.startsWith('SUBTITLE:')).join('\\n').trim();
    const mediumUrl = await publishMedium(bahMed.title, subtitle, bodyWithoutSubtitle, ['BAH 2026', 'Military Housing', 'Military Pay', 'Veterans']);
    results.bah_medium = { title: bahMed.title, url: mediumUrl };
  } catch (e) {
    results.bah_medium = { error: e.message };
    console.error('[Medium error]', e.message);
  }

  console.log('\\n=== Results ===');
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
