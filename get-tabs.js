const { chromium } = require('playwright');
(async () => {
  // Connect to existing browser via CDP
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9229');
  for (const ctx of browser.contexts()) {
    for (const page of ctx.pages()) {
      console.log(`${page.title()}: ${page.url()}`);
    }
  }
  await browser.close();
})().catch(e => console.error('CDP ERR:', e.message));
