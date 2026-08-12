# Outreach Round 2 — 8 剩余计算器全平台外链

**生成日期**：2026-08-05
**目标**：为 8 个剩余计算器各生成 4 平台 paste-ready 外链内容
**总数**：32 个文件（8 计算器 × 4 平台）

## 计算器清单

| # | 计算器 | URL |
|---|---|---|
| 1 | BAH Calculator | https://militarylifetools.com/bah-calculator/ |
| 2 | Leave Calculator | https://militarylifetools.com/leave-calculator/ |
| 3 | Pay Calculator | https://militarylifetools.com/pay-calculator/ |
| 4 | PCS Move Checklist | https://militarylifetools.com/pcs-move-checklist/ |
| 5 | Time Converter | https://militarylifetools.com/time-converter/ |
| 6 | TSP Withdrawal Calculator | https://militarylifetools.com/tsp-withdrawal-calculator/ |
| 7 | Uniform Size | https://militarylifetools.com/uniform-size/ |
| 8 | VA Loan Calculator | https://militarylifetools.com/va-loan-calculator/ |

## 文件命名规则

`{calculator}-{platform}-paste-ready.txt`

示例：
- `bah-blogger-paste-ready.txt`
- `pay-medium-paste-ready.txt`
- `va-loan-wordpress-paste-ready.txt`

## 平台格式差异

| 平台 | 风格 | 字数 | 标签 |
|---|---|---|---|
| **Blogger** | 教育性长文，章节式 | ~800-1000 字 | Labels 字段 |
| **Medium** | 随笔式长文，SUBTITLE | ~900-1100 字 | Tags 字段 |
| **WordPress** | 专业编辑式，CATEGORIES + TAGS | ~600-800 字 | Categories + Tags |
| **Tumblr** | 短小精悍，强 hook | ~400-500 字 | Tags 字段 |

## 发布计划（重要！）

### Medium 24h 限 2 篇硬限制 ⚠️

Round 1 已用：2026-08-05（VA Disability, GI Bill）+ 2026-08-06 20:00（Retirement）

**Round 2 Medium 排程**：

| 日期 | 第 1 篇 | 第 2 篇 |
|---|---|---|
| 2026-08-07（建议） | BAH | Leave |
| 2026-08-08 | Pay | PCS |
| 2026-08-09 | Time | TSP |
| 2026-08-10 | Uniform | VA Loan |

> Medium 用 "Schedule for later" 也算当日额度，所以每天 2 篇就封顶。

### Blogger / WordPress / Tumblr（无限制）

8 个计算器各 1 篇 = 24 篇，可以一口气全部发完。

## 发布操作步骤

### 1. Blogger
1. 登录 Blogger → 新建帖子
2. 复制 `xxx-blogger-paste-ready.txt` 内容
3. **第一行是 TITLE**：复制到标题栏
4. 正文从第二行开始全部粘贴
5. 发布时填写右侧 Labels
6. 发布

### 2. Medium
1. 登录 Medium → New Story
2. 标题 = `xxx-medium-paste-ready.txt` 的 TITLE
3. 副标题 = `SUBTITLE` 那行
4. 正文从 "For Medium's..." 那段开始粘贴
5. **关键**：使用 "Schedule for later" 排到下表指定日期
6. 发布 Tags 字段
7. ⚠️ 注意：未排程直接 Publish 会被算当日额度

### 3. WordPress
1. 登录 WordPress.com → New Post
2. 标题 = `xxx-wordpress-paste-ready.txt` 的 TITLE
3. 正文从 "Republished from..." 那段开始粘贴
4. 右侧填 Categories 和 Tags
5. Publish

### 4. Tumblr
1. 登录 Tumblr → New Post
2. 类型选 "Text"
3. 标题 = `xxx-tumblr-paste-ready.txt` 的 TITLE
4. 正文粘贴（可以保留所有段落结构）
5. 底部填 Tags
6. Post

## URL 追踪

发布完成后，把所有 32 个 URL 填到 `published-urls.md`，方便后续监控。

## 完成后

- ✅ 提交到 IndexNow：`https://www.bing.com/indexnow`
- ✅ 提交到 Google Search Console → URL Inspection
- ✅ 监控 7/14/30 天后的索引情况

## 文件清单

```
paste-ready/
├── bah-blogger-paste-ready.txt
├── bah-medium-paste-ready.txt
├── bah-wordpress-paste-ready.txt
├── bah-tumblr-paste-ready.txt
├── leave-blogger-paste-ready.txt
├── leave-medium-paste-ready.txt
├── leave-wordpress-paste-ready.txt
├── leave-tumblr-paste-ready.txt
├── pay-blogger-paste-ready.txt
├── pay-medium-paste-ready.txt
├── pay-wordpress-paste-ready.txt
├── pay-tumblr-paste-ready.txt
├── pcs-blogger-paste-ready.txt
├── pcs-medium-paste-ready.txt
├── pcs-wordpress-paste-ready.txt
├── pcs-tumblr-paste-ready.txt
├── time-blogger-paste-ready.txt
├── time-medium-paste-ready.txt
├── time-wordpress-paste-ready.txt
├── time-tumblr-paste-ready.txt
├── tsp-blogger-paste-ready.txt
├── tsp-medium-paste-ready.txt
├── tsp-wordpress-paste-ready.txt
├── tsp-tumblr-paste-ready.txt
├── uniform-blogger-paste-ready.txt
├── uniform-medium-paste-ready.txt
├── uniform-wordpress-paste-ready.txt
├── uniform-tumblr-paste-ready.txt
├── va-loan-blogger-paste-ready.txt
├── va-loan-medium-paste-ready.txt
├── va-loan-wordpress-paste-ready.txt
└── va-loan-tumblr-paste-ready.txt
```

**总计：32 个 paste-ready 文件 + 1 个 README + 1 个追踪文件**