const { chromium } = require('playwright');
(async () => {
  // Find the playwright chromium process and connect
  // Playwright chromium doesn't expose CDP by default
  // Let'\''s just check if the browser is responsive
  console.log('Script still running...');
  // Try launching and connecting
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.goto('https://medium.com/me', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  console.log('Medium URL:', p.url());
  console.log('Medium title:', await p.title());
  const text = await p.evaluate(() => document.body.innerText.substring(0, 200));
  console.log('Content:', text);
  await b.close();
})().catch(e => console.error('ERR:', e.message));
