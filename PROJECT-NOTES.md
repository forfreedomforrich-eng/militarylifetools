# Military Life Tools - 项目文档

## 基本信息
- **网站地址**: https://militarylifetools.com
- **项目路径**: C:\Users\kusan\Desktop\工具站项目\militarylifetools
- **GitHub仓库**: https://github.com/forfreedomforrich-eng/militarylifetools
- **GitHub用户名**: forfreedomforrich-eng
- **创建日期**: 2026-06-23

---

## 账号信息

### Cloudflare
- **账号邮箱**: Forfreedomforrich@gmail.com
- **详细密钥见**: 项目外的 API-KEYS.md 文件
- **Pages Project**: militarylifetools

### 域名
- **域名**: militarylifetools.com
- **购买价格**: $10.46/年 (Cloudflare Registrar)
- **支付方式**: Mastercard (银联)
- **SSL状态**: Active
- **Pages子域名**: militarylifetools.pages.dev

### Google Search Console
- **验证方式**: HTML Meta Tag
- **验证代码**: iepHyaZDEGkCra5Kge0jFWM0VhxzXDWzgHQkIWG-FA8
- **站点地图**: sitemap.xml (已提交)

### Bing Webmaster Tools
- **导入方式**: 从Google Search Console导入
- **状态**: 数据处理中 (最多48小时)

---

## 部署方式

### 日常部署流程
1. 修改代码后提交到GitHub:
   ```
   cd "C:\Users\kusan\Desktop\工具站项目\militarylifetools"
   git add .
   git commit -m "提交信息"
   git push
   ```

2. **重要**: GitHub不会自动触发Cloudflare Pages重新部署! 必须用wrangler手动部署:
   ```
   $env:CLOUDFLARE_API_TOKEN = "你的API密钥见API-KEYS.md"
   wrangler pages deploy . --project-name=militarylifetools --branch=main
   ```

3. 安装wrangler (如未安装):
   ```
   npm install -g wrangler
   ```

### 代理设置 (如需)
```
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

---

## 网站结构

### 工具页面 (5个)
| 页面 | 路径 | 描述 |
|------|------|------|
| ETS Countdown | / | 倒计时+里程碑 |
| Time Converter | /time-converter | 军事时间↔标准时间 |
| Uniform Size | /uniform-size | 军装尺码 (5军种) |
| BAH Calculator | /bah-calculator | 住房津贴 (13个基地) |
| Pay Calculator | /pay-calculator | 总薪资计算 |

### 必需页面 (2个)
| 页面 | 路径 | 描述 |
|------|------|------|
| Privacy Policy | /privacy-policy | 隐私政策 |
| Contact Us | /contact | 联系方式 |

### 静态文件
- `/css/v2.css` - 主样式文件 (注意不是style.css)
- `/robots.txt` - 爬虫规则
- `/sitemap.xml` - 站点地图 (7个URL)

---

## 技术要点

### CSS注意事项
- CSS文件名是 `v2.css` (不是style.css)
- 所有子页面链接必须用绝对路径 (`/time-converter` 不是 `time-converter/`)
- 移动端响应式已修复 (select竖排布局)
- 广告占位符已添加 (.ad-slot .ad-top)

### Cloudflare Pages
- 不会自动从GitHub重新部署
- 必须用 `wrangler pages deploy` 手动部署
- 部署后Cloudflare会缓存HTML，需要等几分钟或用URL参数绕过缓存

---

## 待办事项

### 近期 (1-2周)
- [ ] 等待Google/Bing收录
- [ ] 检查Google Search Console数据
- [ ] 检查Bing Webmaster Tools数据

### 收录后
- [ ] 申请Ezoic广告联盟 (Access Now, 0门槛)
- [ ] 考虑申请Media.net (备选)
- [ ] 创建Google AdSense备用账号

### 内容优化 (Gemini建议)
- [ ] Uniform Size页面加Amazon affiliate链接
- [ ] Pay Calculator预留金融广告位
- [ ] BAH Calculator补FAQ
- [ ] ETS Countdown加幽默里程碑
- [ ] Time Converter加工具推荐卡片

### 其他
- [ ] 考虑购买MilLifeHacks.com做301跳转
- [ ] 寻找军人VA Loan联盟营销
- [ ] 等Ezoic收入稳定后投资美股

---

## 收入预估
- **广告类型**: Ezoic (Header Bidding)
- **军人金融类RPM**: $20-40/千次展示
- **目标流量**: 1万月访问
- **预估月收入**: $200-400

---

## SerpAPI
- 已完成关键词研究
- 用于验证军事相关关键词竞争度
