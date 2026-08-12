const { chromium, devices } = await import("playwright");
const url = process.argv[2] || "https://militarylifetools.com/";
const out = process.argv[3] || "C:/Users/kusan/Desktop/工具站项目/shots/mobile-home.png";
const browser = await chromium.launch({ proxy: { server: "http://127.0.0.1:7897" } });
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
try {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
} catch (e) {
  console.log("goto warn:", e.message);
}
await page.waitForTimeout(4000);
await page.screenshot({ path: out, fullPage: true });
console.log("OK " + out);
await browser.close();
