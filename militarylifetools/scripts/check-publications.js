const { chromium } = require('playwright');

async function checkPublications() {
  const email = 'forfreedomforrich@gmail.com';
  const password = 'wyj20081022';
  
  const browser = await chromium.launch({ headless: false });
  
  // 检查Medium
  console.log('=== 检查Medium ===');
  try {
    const page1 = await browser.newPage();
    await page1.goto('https://medium.com/@forfreedomforrich', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page1.waitForTimeout(3000);
    const mediumUrl = page1.url();
    console.log('Medium URL:', mediumUrl);
    
    // 查找文章
    const articles = await page1.$$('a[href*="/p/"], article, [data-testid="card"]');
    console.log('找到的文章/卡片数量:', articles.length);
    
    // 截图
    await page1.screenshot({ path: 'militarylifetools/scripts/check-medium.png' });
    await page1.close();
  } catch (error) {
    console.log('Medium检查错误:', error.message);
  }
  
  // 检查Tumblr
  console.log('\n=== 检查Tumblr ===');
  try {
    const page2 = await browser.newPage();
    
    // 访问militarylifeguide博客
    await page2.goto('https://militarylifeguide.tumblr.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page2.waitForTimeout(3000);
    const tumblrUrl = page2.url();
    console.log('Tumblr URL:', tumblrUrl);
    
    // 查找文章
    const posts = await page2.$$('article, .Post, [data-id]');
    console.log('找到的帖子数量:', posts.length);
    
    // 获取页面文本
    const content = await page2.textContent('body').catch(() => '');
    console.log('页面内容预览:', content?.substring(0, 300));
    
    // 截图
    await page2.screenshot({ path: 'militarylifetools/scripts/check-tumblr.png' });
    await page2.close();
  } catch (error) {
    console.log('Tumblr检查错误:', error.message);
  }
  
  // 检查WordPress.com
  console.log('\n=== 检查WordPress.com ===');
  try {
    const page3 = await browser.newPage();
    
    // 访问militarylifetools.wordpress.com
    await page3.goto('https://militarylifetools.wordpress.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page3.waitForTimeout(3000);
    const wpUrl = page3.url();
    console.log('WordPress URL:', wpUrl);
    
    // 查找文章
    const articles = await page3.$$('article, .post, [class*="article"]');
    console.log('找到的文章数量:', articles.length);
    
    // 截图
    await page3.screenshot({ path: 'militarylifetools/scripts/check-wordpress.png' });
    await page3.close();
  } catch (error) {
    console.log('WordPress检查错误:', error.message);
  }
  
  await browser.close();
  console.log('\n检查完成！截图已保存到scripts目录');
}

checkPublications();