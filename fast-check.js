const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: false, timeout: 30000 });
  console.log('Browser started');
  const p = await b.newPage();
  await p.goto('https://www.blogger.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  console.log('Blogger URL:', p.url());
  const loggedIn = !p.url().includes('signin') && !p.url().includes('accounts.google.com');
  console.log('Logged in:', loggedIn ? 'YES' : 'NO');
  console.log('Browser will close in 3 seconds...');
  await new Promise(r => setTimeout(r, 3000));
  await b.close();
  console.log('Closed');
})().catch(e => console.error('ERR:', e.message));
