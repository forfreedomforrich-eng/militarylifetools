const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: false, args: ['--disable-blink-features=AutomationControlled'] });
  const ctx = await browser.newContext();
  const checks = [
    { name: 'Blogger', url: 'https://www.blogger.com/', signs: ['accounts.google.com', '/signin'] },
    { name: 'Medium', url: 'https://medium.com/me', signs: ['/login', '/m/signin'] },
    { name: 'WordPress', url: 'https://wordpress.com/home', signs: ['/log-in', 'login.wordpress.com'] },
    { name: 'Tumblr', url: 'https://www.tumblr.com/dashboard', signs: ['/login', '/register'] },
  ];
  for (const c of checks) {
    try {
      const page = await ctx.newPage();
      await page.goto(c.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise(r => setTimeout(r, 2000));
      const logged = !c.signs.some(s => page.url().includes(s));
      console.log(`${c.name}: ${logged ? '✅ LOGGED IN' : '❌ NOT LOGGED IN'}`);
      await page.close();
    } catch (e) {
      console.log(`${c.name}: ⚠️ ERR ${e.message.substring(0,60)}`);
    }
  }
  await new Promise(r => setTimeout(r, 8000));
  await browser.close();
  console.log('[Done]');
})().catch(e => console.error('ERR:', e.message));
