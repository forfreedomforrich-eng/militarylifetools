const { chromium } = require('playwright');
(async () => {
  console.log('Launching...');
  const browser = await chromium.launch({ headless: false, timeout: 60000 });
  console.log('Browser launched!');
  const page = await browser.newPage();
  await page.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  await new Promise(r => setTimeout(r, 5000));
  await browser.close();
  console.log('Done');
})().catch(e => console.error('ERR:', e.message));
