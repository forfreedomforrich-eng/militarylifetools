// 测试 playwright chromium + 新目录
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('[T0] starting');
  const freshDir = 'C:\\Users\\kusan\\AppData\\Local\\Temp\\PWTestProfile';
  if (fs.existsSync(freshDir)) {
    fs.rmSync(freshDir, { recursive: true, force: true });
  }
  console.log('[T1] using fresh dir:', freshDir);

  try {
    console.log('[T2] launching playwright chromium...');
    const ctx = await chromium.launchPersistentContext(freshDir, {
      headless: true,
      timeout: 30000,
    });
    console.log('[T3] launched');
    const p = await ctx.newPage();
    await p.goto('https://example.com', { timeout: 15000 });
    console.log('[T4] title:', await p.title());
    await ctx.close();
    console.log('[T5] closed');
  } catch (e) {
    console.log('[ERR]', e.message);
  }
  process.exit(0);
})();