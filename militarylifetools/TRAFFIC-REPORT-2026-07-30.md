# Military Life Tools - 流量与排名报告

**报告日期**: 2026-07-30
**数据来源**: SerpAPI (Google 全网) + Cloudflare API

---

## ⚠️ 重要：实际浏览量未知

**原因**:
- ❌ **Cloudflare Token 无 Zone Analytics 权限**（仅 Pages Deploy 权限）— GraphQL 根查询只有 `cost` 和 `viewer`
- ❌ **Cloudflare Pages 项目未启用 Web Analytics**（`web_analytics_tag: null`）
- ❌ **GA4 未集成**（无 service account 凭证）
- ❌ **GSC API 无 OAuth 凭证**

**结论**: 我无法直接获取真实 PV/UV 数据。

**如何快速启用**（30 秒搞定）:
1. 登录 https://dash.cloudflare.com → Pages → militarylifetools → **Settings → Web Analytics → Enable**
2. 启用后 CF 会注入 beacon 脚本，实时数据可在 dashboard 看到
3. 后续可让我用 `wrangler pages project list` + analytics API 拉数据

---

## 📊 可获取的间接数据

### 1. Google 索引量（site: 查询）

| 日期 | 索引页数 | 变化 |
|------|----------|------|
| 2026-07-23 | 37 | - |
| 2026-07-30 | **36** | -1 ⚠️ |

注：±1 属正常波动，不影响整体 SEO 健康度。

### 2. 核心关键词 Google 排名（前 20）

| 关键词 | 我的位置 | 月搜索量（估） | 状态 |
|--------|---------|----------------|------|
| gi-bill-calculator | >20 | ~14,000 | ❌ 无排名 |
| military-pay-calculator-2026 | >20 | ~5,000 | ❌ 无排名 |
| va-disability-calculator | >20 | ~30,000 | ❌ 无排名 |
| pcs-move-checklist-2026 | >20 | ~3,500 | ❌ 无排名 |
| military-retirement-calculator | >20 | ~3,000 | ❌ 无排名 |
| va-loan-calculator | >20 | ~8,000 | ❌ 无排名 |
| military-time-converter | >20 | ~600 | ❌ 无排名 |

### 3. 品牌词排名（"militarylifetools.com"）

| Position | 页面 |
|----------|------|
| 1 | /contact/ |
| 2 | /privacy-policy/ |
| 3 | / (首页) |
| 4 | /bah-calculator/ |
| 5 | /blog |
| 6 | /time-converter/ |
| 7 | /blog/retirement-planning-guide/ |
| 8 | 别人 (Facebook) |

**品牌搜索 = 0**（说明没人主动搜我们）

---

## 🎯 流量估算（基于行业 CTR 模型）

### 假设条件
- Google 排名 >20 的关键词：CTR ≈ 0
- 品牌搜索：~0/月
- 我们的 36 个索引页面：日均合计点击 < 5

### **预估日 PV: 0 ~ 5 次**
### **预估月 PV: 0 ~ 150 次**

**为什么这么少**:
- 核心高流量词排名都在 >20
- 没有 brand 搜索量
- Adsterra 嵌入完成但流量本身不够
- Ezoic 被拒 = 失去高 CPM 渠道

---

## 💡 当务之急（今日/本周可做）

### P0：让数据可观测
1. **启用 Cloudflare Pages Web Analytics**（30 秒）
2. **集成 GA4**（在 head 插入 gtag.js snippet）
3. **登录 GSC 提交 sitemap**（已提交，但需在 GSC 中确认）

### P1：自然流量爬坡
1. **Reddit 推广**（r/military, r/personalfinance）— 短期可带来 50-200 访问
2. **Facebook Groups**（按 FACEBOOK-GROUPS-GUIDE.md 列表）
3. **继续博客平台发文**（Blogger/Medium/WordPress）— 带来外链 + 间接流量

### P2：SEO 内容加固
1. **核心词排名调研**（用 SerpAPI 看现在前 10 都是谁）
2. **博客文章优化**：加入「2026」「calculator」「military」长尾词
3. **内链结构**：从首页/高分页导流到核心计算器

---

## 📈 收入影响

| 渠道 | 状态 | 当前预估月收入 |
|------|------|---------------|
| Ezoic | ❌ Rejected | $0 |
| Adsterra | ✅ 已嵌入 12 页面 | <$0.50 |
| Amazon Affiliate | ✅ 已加卡片 | <$1 |
| **合计** | | **<$1.50/月** |

要突破 $100/月门槛，需要：
- 月访问量 ≥ 5,000（当前 ~150）
- RPM ≥ $20
- 这要求核心词进前 10，**通常需要 3-6 个月**持续发外链 + 内容优化

---

## 🔧 我接下来可以做的事

1. **立即**：在 Cloudflare Pages 启用 Web Analytics（需要您去 dash 启用或给我一个有 analytics 权限的 token）
2. **立即**：写脚本每日爬 GSC（您配 OAuth 凭证后）
3. **本周**：Reddit 推广脚本 / 自动化发外链
4. **本周**：找 10 个长尾低竞争词，写 5 篇新博客

---

*报告生成于 2026-07-30 15:48*
