const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SHOTS = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\shots';
const LOG_FILE = 'C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\publish.log';
function log(m) { console.log(m); fs.appendFileSync(LOG_FILE, m + '\\n'); }

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9229');
  log('Connected!');
  
  // Find blogger page
  let page = null;
  for (const ctx of browser.contexts()) {
    for (const p of ctx.pages()) {
      if (p.url().includes('blogger.com')) { page = p; break; }
    }
    if (page) break;
  }
  
  if (!page) {
    const ctx = browser.contexts()[0];
    page = await ctx.newPage();
  }
  
  log('Blogger URL: ' + page.url());
  log('Blogger Title: ' + await page.title());
  
  // Check what's on the page
  const text = await page.evaluate(() => document.body.innerText.substring(0, 500));
  log('Page content: ' + text);
  
  // Try to find the blog list
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.href + ' | ' + a.textContent.trim()).slice(0, 20);
  });
  log('Links: ' + JSON.stringify(links, null, 2));
  
  // Try navigating to blog home
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 3000));
  log('Home URL: ' + page.url());
  log('Home title: ' + await page.title());
  await page.screenshot({ path: path.join(SHOTS, 'blogger-home.png'), fullPage: true });
  
  // Check for blog selector dropdown
  const blogSelect = page.locator('select, [role="combobox"], .blog-selector').first();
  if (await blogSelect.count() > 0) {
    log('Found blog selector!');
    await blogSelect.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SHOTS, 'blogger-select.png'), fullPage: true });
  }
  
  // Look for any publish/create buttons
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a[role="button"]'))
      .map(b => b.textContent.trim().substring(0, 30))
      .filter(t => t && t.length > 0);
  });
  log('Buttons: ' + JSON.stringify(buttons.slice(0, 15)));
  
  await browser.close();
  log('[Done]');
})().catch(e => log('ERR: ' + e.message));
