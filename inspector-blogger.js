const { chromium } = require('playwright');
(async () => {
  const ctx = await chromium.launchPersistentContext('C:\\\\Users\\\\kusan\\\\Desktop\\\\工具站项目\\\\.chrome-auto-profile', {
    headless: true, channel: 'chrome', timeout: 20000
  });
  const page = await ctx.newPage();
  await page.goto('https://www.blogger.com/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(3000);
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  // 找所有可交互元素
  const elements = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('button, a, input, [role="button"], [contenteditable]'));
    return els.slice(0, 30).map(e => ({ tag: e.tagName, text: (e.textContent||'').substring(0,50), class: e.className?.substring(0,60), id: e.id, role: e.getAttribute('role') }));
  });
  console.log(JSON.stringify(elements, null, 2));
  await ctx.close();
})().catch(e => { console.error(e.message); process.exit(1); });
