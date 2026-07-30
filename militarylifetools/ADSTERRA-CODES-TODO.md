# Adsterra JS 广告代码获取 - 用户待办

**创建日期**: 2026-07-30

---

## ✅ 已完成

- [x] 创建 4 个广告位（API 成功）：
  - `NativeBanner_1` (id: 10486698)
  - `728x90_1` (id: 10486711)
  - `300x250_1` (id: 10486717)
  - `320x50_1` (id: 10486723)
- [x] API 已确认工作（4 个 placement 全部创建成功）

---

## ⚠️ 为什么需要手动操作

**Adsterra API 限制**：根据官方 OpenAPI spec（v3），API 只支持以下端点：
- `GET /domains.{format}` - 域名列表
- `GET /domain/{id}/placements.{format}` - 域名下的广告位
- `GET /placements.{format}` - 全部广告位
- `GET /stats.{format}` - 统计数据
- `GET /smart-links.{format}` - SmartLinks

**关键问题**：
1. ❌ 没有"获取广告代码"端点
2. ❌ JS Banner 类型广告位（NativeBanner/728x90/300x250/320x50）API 不返回 `direct_url`
3. ✅ **必须** 登录 Adsterra Dashboard 手动复制 JS 代码

---

## 📋 用户操作步骤

### 步骤 1: 登录 Adsterra
- 访问：https://www.adsterra.com
- 用户名：kusan@xxx (你注册的邮箱)
- 密码：xxx (你设置的)

### 步骤 2: 进入 Ad Units 页面
- 菜单：Websites → militarylifetools.com → Ad Units
- 或：Publishers → Ad Units / Placements

### 步骤 3: 复制每个广告位的代码
对每个 placement（4 个），点 `Get Code` 按钮，会弹出类似这样的 JS 代码：

```html
<script type="text/javascript">
    atOptions = {
        'key' : 'xxxxxxxxxxxxxxxxx',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
    };
    document.write('<scr' + 'ipt type="text/javascript" src="http://www.profitabledisplaynetwork.com/xxx/invoke.js"></scr' + 'ipt>');
</script>
```

或
```html
<script async="async" data-cfasync="false" src="//pl12345678.profitabledisplaynetwork.com/abc123/invoke.js"></script>
<div id="container-abc123"></div>
```

### 步骤 4: 把代码发给我
格式建议：
```
=== NativeBanner_1 (10486698) ===
[粘贴代码]

=== 728x90_1 (10486711) ===
[粘贴代码]

=== 300x250_1 (10486717) ===
[粘贴代码]

=== 320x50_1 (10486723) ===
[粘贴代码]
```

我会帮你：
1. 嵌入到首页和工具页的合适位置
2. 设置响应式（移动端自动切换 320x50）
3. 部署到 Cloudflare Pages
4. 重新提交 sitemap 通知 Google

---

## 🎯 推荐嵌入位置

| 广告位 | 嵌入位置 | 说明 |
|--------|----------|------|
| `NativeBanner_1` | 首页 + 5 个高流量工具页顶部 | 跨设备通用 |
| `728x90_1` | 首页 hero 下方（桌面） | 桌面端 leaderboard |
| `300x250_1` | 工具页侧边栏 / 内容中部 | 桌面端 medium rectangle |
| `320x50_1` | 工具页底部（移动端） | 移动端横幅 |

---

## ⏰ 预计时间
- 你复制代码：5 分钟
- 我嵌入并部署：15 分钟
- 重新提交 sitemap：1 分钟

**总计：20 分钟后网站就有 Adsterra 广告收入了** 💰

---

## 🆘 如果无法登录 Adsterra

备选方案：
1. 重置密码：https://www.adsterra.com/password/reset
2. 联系 Adsterra 支持：support@adsterra.com
3. 提供申请 ID 或注册邮箱，让他们重发访问链接

---

*创建人: Cline*
*最后更新: 2026-07-30*
