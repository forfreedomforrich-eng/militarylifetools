const { chromium } = require('playwright');
const fs = require('fs');
const log = (msg) => { fs.appendFileSync('C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\publish.log', msg + '\\n'); };

(async () => {
  log('[1] Launching real Chrome...');
  const ctx = await chromium.launchPersistentContext('C:\\\\Users\\\\kusan\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data', {
    channel: 'chrome',
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'],
    timeout: 60000,
  });
  log('[OK] Chrome launched');
  
  const page = await ctx.newPage();
  log('[2] Opening Blogger...');
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 3000));
  log('Blogger URL: ' + page.url());
  log('Blogger Title: ' + await page.title());
  
  const isLoggedIn = !page.url().includes('signin') && !page.url().includes('accounts.google.com');
  log('Logged in: ' + isLoggedIn);
  
  if (!isLoggedIn) {
    log('⚠️  Not logged in - please log in manually');
    // Wait for manual login
    await new Promise(r => setTimeout(r, 300000));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 3000));
    const recheck = !page.url().includes('signin') && !page.url().includes('accounts.google.com');
    log('After waiting: ' + recheck);
    if (!recheck) { log('❌ Timeout - aborting'); await ctx.close(); process.exit(1); }
  }
  
  log('✅ Blogger logged in! Now navigating to post editor...');
  await page.goto('https://www.blogger.com/blog/posts', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 3000));
  log('Posts URL: ' + page.url());
  log('Posts Title: ' + await page.title());
  
  // Screenshot
  await page.screenshot({ path: 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\shots\\\\blogger-logged-in.png', fullPage: true });
  log('Screenshot saved');
  
  // Try to click new post
  const newPost = page.locator('text=新建文章, button:has-text("新建"), [data-testid="new-post"], .new-post-btn').first();
  if (await newPost.count() > 0) {
    await newPost.click();
    await new Promise(r => setTimeout(r, 3000));
    log('New post clicked');
    await page.screenshot({ path: 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\shots\\\\blogger-newpost.png', fullPage: true });
  } else {
    log('Could not find new post button, trying direct URL...');
    await page.goto('https://www.blogger.com/blog/posts/create', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 3000));
    log('Create URL: ' + page.url());
    await page.screenshot({ path: 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\shots\\\\blogger-create.png', fullPage: true });
  }
  
  log('\\n=== Browser is open with Blogger ready! ===');
  log('Please complete any remaining login steps, then tell me to proceed.');
  
  // Keep open for manual interaction
  await new Promise(r => setTimeout(r, 600000));
  await ctx.close();
  log('[Done]');
})().catch(e => { log('ERR: ' + e.message); process.exit(1); });
