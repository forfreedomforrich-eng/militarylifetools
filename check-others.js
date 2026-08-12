const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: false });
  const p = await b.newPage();
  
  // Medium
  await p.goto('https://medium.com/me', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 3000));
  const medLogged = !p.url().includes('/login') && !p.url().includes('/m/signin');
  console.log('Medium:', medLogged ? '✅ LOGGED IN' : '❌ NOT LOGGED IN (' + p.url().substring(0,60) + ')');
  
  // WordPress
  await p.goto('https://wordpress.com/home', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 3000));
  const wpLogged = !p.url().includes('/log-in') && !p.url().includes('login.wordpress.com');
  console.log('WordPress:', wpLogged ? '✅ LOGGED IN' : '❌ NOT LOGGED IN (' + p.url().substring(0,60) + ')');
  
  // Tumblr
  await p.goto('https://www.tumblr.com/dashboard', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 3000));
  const tbLogged = !p.url().includes('/login') && !p.url().includes('/register');
  console.log('Tumblr:', tbLogged ? '✅ LOGGED IN' : '❌ NOT LOGGED IN (' + p.url().substring(0,60) + ')');
  
  await b.close();
  console.log('[Done]');
})().catch(e => console.error('ERR:', e.message));
