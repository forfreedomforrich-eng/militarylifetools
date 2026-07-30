const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function checkAllPlatforms() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const report = {
    timestamp: new Date().toISOString(),
    platforms: {}
  };

  try {
    // ========== 1. Blogger ==========
    console.log('=== 检查Blogger ===');
    report.platforms.blogger = {
      url: 'https://militarylifetool.blogspot.com',
      articles: []
    };
    
    await page.goto('https://militarylifetool.blogspot.com', { waitUntil: 'domcontentloaded', timeout: 15000 });
    const bloggerContent = await page.content();
    
    // 检查文章标题
    const bloggerTitles = [
      'How Much House Can You Afford as a Service Member?',
      'The Ultimate Military PCS Move Checklist for 2026',
      'Military Pay Calculator 2026: Know Your Worth'
    ];
    
    for (const title of bloggerTitles) {
      if (bloggerContent.includes(title)) {
        report.platforms.blogger.articles.push({ title, status: 'published' });
        console.log(`✅ ${title}`);
      } else {
        report.platforms.blogger.articles.push({ title, status: 'not found' });
        console.log(`❌ ${title}`);
      }
    }

    // ========== 2. Medium ==========
    console.log('\n=== 检查Medium ===');
    report.platforms.medium = {
      url: 'https://medium.com/@forfreedomforrich',
      articles: []
    };
    
    await page.goto('https://medium.com/@forfreedomforrich', { waitUntil: 'domcontentloaded', timeout: 15000 });
    const mediumContent = await page.content();
    
    const mediumTitles = [
      'How Much House Can You Afford as a Service Member? Use Our Free VA Loan Calculator',
      'The Ultimate Military PCS Move Checklist for 2026',
      'Military Pay Calculator 2026: Know Your Worth'
    ];
    
    for (const title of mediumTitles) {
      if (mediumContent.includes(title)) {
        report.platforms.medium.articles.push({ title: title.substring(0, 50) + '...', status: 'published' });
        console.log(`✅ ${title.substring(0, 50)}...`);
      } else {
        report.platforms.medium.articles.push({ title: title.substring(0, 50) + '...', status: 'not found' });
        console.log(`❌ ${title.substring(0, 50)}...`);
      }
    }

    // ========== 3. WordPress.com ==========
    console.log('\n=== 检查WordPress.com ===');
    report.platforms.wordpress = {
      url: 'https://militarylifetools.wordpress.com',
      articles: []
    };
    
    await page.goto('https://militarylifetools.wordpress.com', { waitUntil: 'domcontentloaded', timeout: 15000 });
    const wpContent = await page.content();
    
    const wpTitles = [
      'How Much House Can You Afford as a Service Member? Use Our Free VA Loan Calculator',
      'The Ultimate Military PCS Move Checklist for 2026',
      'Military Pay Calculator 2026: Know Your Worth'
    ];
    
    for (const title of wpTitles) {
      if (wpContent.includes(title)) {
        report.platforms.wordpress.articles.push({ title: title.substring(0, 50) + '...', status: 'published' });
        console.log(`✅ ${title.substring(0, 50)}...`);
      } else {
        report.platforms.wordpress.articles.push({ title: title.substring(0, 50) + '...', status: 'not found' });
        console.log(`❌ ${title.substring(0, 50)}...`);
      }
    }

    // ========== 4. Tumblr ==========
    console.log('\n=== 检查Tumblr ===');
    report.platforms.tumblr = {
      url: 'https://militarylifeguide.tumblr.com',
      articles: []
    };
    
    try {
      await page.goto('https://militarylifeguide.tumblr.com', { waitUntil: 'domcontentloaded', timeout: 15000 });
      const tumblrContent = await page.content();
      
      const tumblrTitles = [
        'How Much House Can You Afford as a Service Member?',
        'The Ultimate Military PCS Move Checklist for 2026',
        'Military Pay Calculator 2026: Know Your Worth'
      ];
      
      for (const title of tumblrTitles) {
        if (tumblrContent.includes(title)) {
          report.platforms.tumblr.articles.push({ title: title.substring(0, 50) + '...', status: 'published' });
          console.log(`✅ ${title.substring(0, 50)}...`);
        } else {
          report.platforms.tumblr.articles.push({ title: title.substring(0, 50) + '...', status: 'not found' });
          console.log(`❌ ${title.substring(0, 50)}...`);
        }
      }
    } catch (e) {
      report.platforms.tumblr.error = 'Page load failed (possibly Cloudflare protection)';
      console.log('⚠️ Tumblr页面加载失败（可能是Cloudflare保护）');
    }

  } catch (error) {
    console.error('检查过程中出错:', error.message);
  } finally {
    await browser.close();
  }

  // 保存报告
  const reportPath = path.join(__dirname, 'comprehensive-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n完整报告已保存到: ${reportPath}`);
  
  return report;
}

checkAllPlatforms();