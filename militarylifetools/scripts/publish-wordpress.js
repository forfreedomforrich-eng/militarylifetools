const { chromium } = require('playwright');

async function publishWordpressPosts() {
  // 使用用户现有的Chrome浏览器
  const browser = await chromium.launchPersistentContext('C:\\Users\\kusan\\AppData\\Local\\Google\\Chrome\\User Agent WP', {
    channel: 'chrome',
    headless: false,
  });
  
  const page = browser.pages()[0];

  // 三篇文章的内容
  const posts = [
    {
      title: 'How Much House Can You Afford as a Service Member? Use Our Free VA Loan Calculator',
      content: 'As a service member, one of the best financial benefits you have access to is the VA loan program. Backed by the Department of Veterans Affairs, VA loans offer some of the most competitive mortgage terms available.\n\nWhat is a VA Loan?\nA VA loan is a mortgage program specifically for active duty service members, veterans, National Guard and Reserve members, and eligible surviving spouses. The best part: No down payment required.\n\nWhy Use a VA Loan Calculator?\nBefore you start viewing homes, you need to know your budget. Our calculator takes into account your monthly income, existing debt obligations, current VA loan interest rates, funding fees and taxes.\n\nTips for Military Homebuyers\n- Get your Certificate of Eligibility (COE) before you start shopping\n- Compare multiple lenders\n- Factor in relocation plans\n- Consider location and base proximity\n\nTry our free VA Loan Calculator now: https://militarylifetools.com/va-loan-calculator/',
      tags: 'military, VA loan, home buying, veterans'
    },
    {
      title: 'The Ultimate Military PCS Move Checklist for 2026',
      content: 'Moving when you\'re in the military is different. A Permanent Change of Station (PCS) move is one of the most stressful events a service member can experience.\n\nWhat is a PCS Move?\nA PCS move is when the military orders you to relocate to a new base. Unlike permanent transfers, these moves can be across the country or even overseas.\n\nKey Steps in the PCS Process\n1. Receive your PCS orders\n2. Create a detailed moving plan\n3. Schedule a professional moving company\n4. Pack your personal belongings\n5. Arrange pet or vehicle transport\n6. Complete your move before the orders expire\n\nWhy Use a PCS Move Checklist?\nOur free checklist helps you stay organized throughout the entire moving process.\n\nGet your free PCS Move Checklist: https://militarylifetools.com/pcs-move-checklist/',
      tags: 'military, PCS move, moving checklist, military life'
    },
    {
      title: 'Military Pay Calculator 2026: Know Your Worth',
      content: 'Understanding your military pay can be confusing. Between basic pay, allowances, and various special pays, it\'s hard to calculate your actual take-home pay.\n\nComponents of Military Pay\n- Basic Pay: Determined by rank and years of service\n- BAH (Basic Allowance for Housing): Based on duty location and dependency status\n- BAS (Basic Allowance for Subsistence): Current rate is $460.80/month\n- Incentive Pays: Aviation, reenlistment, hostile fire, etc.\n\n2026 Military Pay Rates\nFor 2026, the military pay raises have been adjusted. Our calculator uses the latest 2026 pay charts.\n\nHow to Use Our Calculator\n1. Select your rank\n2. Enter years of service\n3. Add dependency status\n4. Include any special pays\n5. Get your estimated annual and monthly pay\n\nTry our free Military Pay Calculator: https://militarylifetools.com/pay-calculator/',
      tags: 'military pay, army, navy, air force, marine corps'
    }
  ];

  try {
    console.log('步骤1: 访问WordPress新增文章页面...');
    await page.goto('https://militarylifetools.wordpress.com/wp-admin/post-new.php', { 
      waitUntil: 'domcontentloaded', 
      timeout: 30000 
    });
    await page.waitForTimeout(3000);
    
    const currentUrl = page.url();
    console.log('当前URL:', currentUrl);
    
    // 检查是否需要登录
    if (currentUrl.includes('log-in') || currentUrl.includes('login')) {
      console.log('需要登录WordPress！');
      console.log('请在浏览器窗口中输入账号密码登录...');
      
      // 等待用户手动登录
      for (let i = 0; i < 60; i++) {
        await page.waitForTimeout(1000);
        const url = page.url();
        if (!url.includes('log-in') && !url.includes('login') && url.includes('wordpress')) {
          console.log('检测到用户已登录！当前URL:', url);
          break;
        }
        if (i % 10 === 0) {
          console.log(`等待登录中... ${i + 10}秒`);
        }
      }
      
      const afterLoginUrl = page.url();
      if (afterLoginUrl.includes('log-in') || afterLoginUrl.includes('login')) {
        console.log('超时：未检测到登录');
        return;
      }
    }

    console.log('编辑器页面已加载');

    // 发布所有文章
    for (let i = 0; i < posts.length; i++) {
      console.log(`\n发布第 ${i + 1} 篇文章...`);
      
      // 填写标题
      console.log('填写标题...');
      await page.waitForTimeout(1000);
      
      // 尝试古腾堡编辑器标题
      const titleEditor = await page.$('.editor-post-title__input, textarea#title');
      if (titleEditor) {
        await titleEditor.click();
        await page.waitForTimeout(500);
        await page.keyboard.press('Control+A');
        await page.keyboard.type(posts[i].title);
        console.log('标题已填写');
      }

      // 填写内容
      console.log('填写内容...');
      await page.waitForTimeout(1000);
      
      // 尝试点击编辑器内容区域
      const contentArea = await page.$('.block-editor-default-block-appender, .editor-default-block-appender, #content');
      if (contentArea) {
        await contentArea.click();
        await page.waitForTimeout(500);
        await page.keyboard.type(posts[i].content);
        console.log('内容已填写');
      }

      // 填写标签
      console.log('填写标签...');
      const tagInput = await page.$('input[name="post_tag"], #tags-box input');
      if (tagInput) {
        await tagInput.click();
        await tagInput.fill(posts[i].tags);
        console.log('标签已填写');
      }

      // 点击发布按钮
      console.log('点击发布按钮...');
      await page.waitForTimeout(1000);
      
      const publishBtn = await page.$('#publish, .editor-publish-button, input[type="submit"]');
      if (publishBtn) {
        await publishBtn.click();
        console.log('发布按钮已点击');
      }

      await page.waitForTimeout(3000);
      console.log(`第 ${i + 1} 篇文章已发布！`);

      // 准备发布下一篇文章
      if (i < posts.length - 1) {
        console.log('准备发布下一篇文章...');
        await page.goto('https://militarylifetools.wordpress.com/wp-admin/post-new.php', {
          waitUntil: 'domcontentloaded'
        });
        await page.waitForTimeout(2000);
      }
    }

    console.log('\n所有文章发布完成！');

  } catch (error) {
    console.error('错误:', error.message);
  } finally {
    await browser.close();
  }
}

publishWordpressPosts();