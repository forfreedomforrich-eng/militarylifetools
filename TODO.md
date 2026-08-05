# Military Life Tools - 待优化清单

更新时间：2026-08-05

## P0 - 立即做（流量入口）

- [x] IndexNow 提交（让 Bing/Yandex 即时收录新博客）  ← 2026-07-30 已提交 30 个 URL
- [x] sitemap.xml 整理（一处缺换行，XML 合法但建议美化）  ← 2026-08-05 检查：sitemap.xml 格式正常，28 个 URL 已包含全部博客
- [x] Adsterra 广告嵌入  ← 2026-07-30：4 段广告码 + 11 工具页 +首页全部署（**广告变现的唯一渠道**，不要问其他联盟）
- [x] **【P0-3】启用 Cloudflare Pages Web Analytics**  ← 2026-08-05 用户手动启用 ✅，仪表盘可见数据：24h 13 visits / 14 pageviews / Page load 926ms / LCP 43% Poor。⚠️ 性能告警：926ms + 43% LCP Poor，建议后续优化图片/Adsterra 脚本加载
- [ ] **【P0-4】补发博客软文**  ← 2026-08-05：内容包已生成 → `promo-content/outreach-2026-08-05/`，含 README + 3 篇 × 4 平台版本 + published-urls 追踪表 + submit-indexnow.ps1 脚本。**用户决定手动发布**（Google 验证因代理 IP 触发严格模式，过不去；自动发布探索到 Playwright CDP 连接成功但停在 1/4 平台登录）

- [ ] **【P0-8】清理自动发布探索脚本**  ← 2026-08-05：Playwright 探索过程留下的 `test-launch.js`、`test-cdp.js`、`test-browser-login.js`、`node_modules/`、`package.json`、`package-lock.json` 需要清理或保留为工具脚本
- [x] **【P0-5】写 BAH 2026 by ZIP code 博客**  ← 已完成（2026-07-30 commit `3eb9b8d`）：`blog/bah-2026-by-zip-code/index.html`，1156 行含 30+ 基地 ZIP 表
- [x] **【P0-6】写 DD-214 申请流程博客**  ← 已完成：`blog/dd-214-explained/index.html`，含字段解释 + Amazon 联盟卡片
- [ ] **【P0-7】Core Web Vitals 优化**  ← 2026-08-05 Web Analytics 显示：Page load 926ms（↑559%）、LCP 43% Poor。受影响页面 Top 4：`va-loan`、`retirement-calculator`、`uniform-size`、`leave-calculator`。可能原因：Adsterra 脚本未 async、未启用 Cloudflare Polish/Mirage。优先级：高（影响 SEO 排名因子）

## P1 - 视觉与转化（针对美军受众）

### Amazon 联盟卡片改造

- [ ] **加军人专属钩子文案**（合规边界内）
  - 例：''Display your medals & ribbons · $24.99+''
  - 例：''GI Bill-approved hobby gear''
- [ ] **配色战术化** - 黑/OD 绿/海军蓝为主，少用亮橙色 CTA
- [ ] **真实场景图替代抽象图标** - 迷彩背包、OCP 靴子、DD-214 比文档图标点击率高 30%+
- [ ] **加 ''Verified for service members'' 小标签** 增加信任

### 通用视觉规范

- [ ] 无衬线粗体字 + 大按钮（移动端 44px+）
- [ ] OD 绿/海军蓝/卡其 配色主导
- [ ] 避免卡通/卖萌素材，偏好实拍军品图
- [ ] 信息密度高，文字直接，不绕弯子

## P2 - 内容与 SEO

- [ ] 博客内链优化（BAH 2026 文章 → BAH 计算器 CTA）
- [ ] Reddit/Facebook 军事社区软推（白帽，不刷）
- [ ] 设置自动 sitemap 更新脚本（每次 push 自动重生成）
- [ ] 死链检查 + 旧 URL 重定向补全
- [ ] Image Sitemap（图片搜索流量）
- [ ] FAQ 结构化数据扩展（已在 BAH/VA Disability 页有，继续加到所有计算器）
- [ ] HARO 注册（媒体提及 = 强外链）

## P3 - 数据与变现

- [ ] GA4 + GSC + Bing 数据周报
- [ ] Amazon Associates 数据周报
- [ ] Ezoic 接入后 CPM 监控
- [ ] U盘里带回来的推广建议（家里台式机 codex 聊的）明天取回后并入

## 已完成

- [x] 汉堡菜单、移动端响应式
- [x] GA4（G-5JYW9XD3MZ）— 凭据待配
- [x] Bing Webmaster + Google Search Console sitemap 提交
- [x] Amazon Associates ID：militarylife2-20（A 级）
- [x] 派安盈收款通道
- [x] 9 个工具页 + 8 篇博客上线
- [x] 移动端截图验证（iPhone 13 视口）

## 📊 推广节奏表（参考 PROMOTION-EXECUTION.md）

| 频率 | 内容 | 产出 |
|------|------|------|
| 每 2 天 | 1 篇博客软文（围绕 1 个计算器） | 月 15 篇原创 |
| 每篇 | 发到 3-4 个平台（Blogger 必、Medium 次、WP.com、Tumblr） | 月 45-60 个新外链 |
| 每 7 天 | 1 篇 Facebook Group 软推（按现有 21 个 group 列表） | 月 12 个社群曝光 |
| 每 30 天 | 综合检查 + 报告更新 | 收录/排名监测 |

**见效周期**：3-6 个月持续发，核心词进前 10 的概率显著提升
