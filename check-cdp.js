const { chromium } = require('playwright');
(async () => {
  console.log('Connecting via CDP...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9229');
  console.log('Connected! Contexts:', browser.contexts().length);
  const page = browser.contexts()[0]?.pages()[0];
  if (page) {
    console.log('Current page:', page.url());
    console.log('Title:', await page.title());
  }
  await browser.close();
  console.log('Done');
})().catch(e => { console.error(e.message); process.exit(1); });
