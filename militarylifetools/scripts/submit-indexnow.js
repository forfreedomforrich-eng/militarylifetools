/**
 * IndexNow 提交脚本
 * 让 Bing/Yandex 即时收录新页面
 *
 * 使用方法:
 * node submit-indexnow.js
 *
 * IndexNow 密钥需要放在 .env 文件中（项目根目录或同目录）
 */

const fs = require('fs');
const path = require('path');

// IndexNow 网关地址
const INDEXNOW_HOSTS = [
  'https://api.indexnow.org/indexnow/',
  'https://www.bing.com/indexnow'
];

// 获取 sitemap 路径
const SITEMAP_PATH = path.join(__dirname, '..', 'sitemap.xml');

// 解析 sitemap.xml 中的 URL
function parseSitemapUrls(sitemapPath) {
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [];

  // 提取所有 <loc> 标签中的 URL
  const urlRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
  let match;

  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

// 查找 .env 文件：先查脚本同级目录，再向上两级到项目根目录
function findEnvFile() {
  const candidates = [
    path.join(__dirname, '.env'),                     // militarylifetools/scripts/.env
    path.join(__dirname, '..', '.env'),               // militarylifetools/.env
    path.join(__dirname, '..', '..', '.env')          // 项目根目录/.env
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// IndexNow 提交请求
async function submitToIndexNow(urls, apiKey) {
  const hostName = 'militarylifetools.com';

  // IndexNow 规范格式：POST 到 api.indexnow.org
  // 文档：https://www.indexnow.org/documentation
  const payload = {
    host: hostName,
    key: apiKey,
    keyLocation: `https://${hostName}/${apiKey}.txt`,
    urlList: urls
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 200) {
      console.log(`✅ IndexNow 提交成功! (200 OK)`);
      return true;
    } else if (response.status === 202) {
      console.log(`✅ IndexNow 已接受 URL 列表 (202 Accepted)`);
      return true;
    } else {
      const text = await response.text().catch(() => '');
      console.log(`⚠️ IndexNow 响应状态: ${response.status} ${text}`);
      return false;
    }
  } catch (error) {
    console.log(`⚠️ IndexNow API 调用失败: ${error.message}`);
    return false;
  }
}

// 主函数
async function main() {
  console.log('=== IndexNow 提交脚本 ===\n');

  // 读取 sitemap URLs
  let urls;
  try {
    urls = parseSitemapUrls(SITEMAP_PATH);
    console.log(`📄 从 sitemap.xml 找到 ${urls.length} 个 URL\n`);
  } catch (error) {
    console.error('❌ 无法读取 sitemap.xml:', error.message);
    process.exit(1);
  }

  // 查找 .env
  const envPath = findEnvFile();
  let apiKey = '';

  if (envPath) {
    console.log(`🔑 读取 .env: ${envPath}`);
    const envContent = fs.readFileSync(envPath, 'utf-8');
    // 兼容 INDEXNOW_KEY 和 INDEXNOW_API_KEY 两种命名
    let match = envContent.match(/INDEXNOW_KEY=([^\n]+)/);
    if (!match) {
      match = envContent.match(/INDEXNOW_API_KEY=([^\n]+)/);
    }
    if (match) {
      apiKey = match[1].trim();
    }
  } else {
    console.log('⚠️ 未找到 .env 文件（已搜索 scripts/、militarylifetools/、项目根）');
  }

  if (!apiKey) {
    console.log('\n⚠️ 未找到 IndexNow API 密钥');
    console.log('请在 .env 中设置 INDEXNOW_KEY=your_key');
    console.log('\n--- URL 列表（可手动提交到 Bing Webmaster） ---');
    urls.forEach((url, i) => {
      console.log(`   ${i + 1}. ${url}`);
    });
    return;
  }

  console.log(`🔑 API Key: ${apiKey.substring(0, 8)}...`);

  // 显示待提交 URL
  console.log('\n待提交的 URL:');
  urls.slice(0, 5).forEach((url, i) => {
    console.log(`   ${i + 1}. ${url}`);
  });
  if (urls.length > 5) {
    console.log(`   ... 共 ${urls.length} 个 URL`);
  }

  // 提交 URL
  console.log('\n正在提交到 IndexNow...');
  const ok = await submitToIndexNow(urls, apiKey);
  if (ok) {
    console.log(`\n🎉 完成！已通知 Bing/Yandex 收录 ${urls.length} 个 URL`);
  }
}

main().catch(console.error);
