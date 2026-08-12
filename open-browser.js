const { chromium } = require('playwright');
(async () => {
  console.log('Launching visible browser...');
  const ctx = await chromium.launchPersistentContext('C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\.chrome-auto-profile-v2', {
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'],
    timeout: 30000,
  });
  console.log('[OK] Browser opened!');
  
  const page = await ctx.newPage();
  const platforms = [
    { name: 'Blogger', url: 'https://www.blogger.com/', outSigns: ['accounts.google.com', '/signin'] },
    { name: 'Medium', url: 'https://medium.com/me', outSigns: ['/login', '/m/signin'] },
    { name: 'WordPress', url: 'https://wordpress.com/home', outSigns: ['/log-in', 'login.wordpress.com'] },
    { name: 'Tumblr', url: 'https://www.tumblr.com/dashboard', outSigns: ['/login', '/register'] },
  ];
  
  for (const p of platforms) {
    try {
      await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise(r => setTimeout(r, 3000));
      const url = page.url();
      const isOut = p.outSigns.some(s => url.includes(s));
      console.log(`${p.name}: ${url.substring(0,70)} | ${isOut?'❌ NOT LOGGED IN':'✅ LOGGED IN'}`);
    } catch(e) {
      console.log(`${p.name}: ERROR - ${e.message.substring(0,100)}`);
    }
  }
  
  console.log('\\nBrowser is open. If any platform shows ❌, please log in manually in the browser window.');
  console.log('After logging in, tell me "done" and I will start publishing.');
  console.log('Or close the browser to cancel.');
  
  // Keep browser open waiting for user
  await page.waitForSelector('body', { timeout: 600000 });
  
  await ctx.close();
  console.log('[Done]');
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
