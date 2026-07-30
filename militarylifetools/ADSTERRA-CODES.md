# Adsterra 广告代码收集

**收集日期**: 2026-07-30
**来源**: Adsterra Dashboard → militarylifetools.com → Ad Units
**状态**: 4/4 ✅ 全部收集完成

---

## ✅ 1/4 — NativeBanner_1 (ID: 30395673)

```html
<script async="async" data-cfasync="false" src="https://pl30496172.effectivecpmnetwork.com/1018c00d12d7fdaebaa6406ac52b9076/invoke.js"></script>
<div id="container-1018c00d12d7fdaebaa6406ac52b9076"></div>
```

**类型**: Native Banner（自适应）
**用途**: 跨设备通用，可放在首页和工具页中部

---

## ✅ 2/4 — 728x90_1 (ID: 30395674)

```html
<script>
  atOptions = {
    'key' : 'c3ef0b1ac369a64de45caacc1d54dcfd',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/c3ef0b1ac369a64de45caacc1d54dcfd/invoke.js"></script>
```

**类型**: Banner 728x90（桌面端 leaderboard，iframe 格式）
**用途**: 首页 hero 下方（仅桌面显示）
**Key**: c3ef0b1ac369a64de45caacc1d54dcfd

---

## ✅ 3/4 — 300x250_1 (ID: 30395675)

```html
<script>
  atOptions = {
    'key' : '9b1ab111ca339e5bc6f3c12770fbe14a',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/9b1ab111ca339e5bc6f3c12770fbe14a/invoke.js"></script>
```

**类型**: Banner 300x250（桌面端 medium rectangle，iframe 格式）
**用途**: 工具页侧边栏或内容中（仅桌面/平板）
**Key**: 9b1ab111ca339e5bc6f3c12770fbe14a

---

## ✅ 4/4 — 320x50_1 (ID: 30395676)

```html
<script>
  atOptions = {
    'key' : '4b6b2036ef121b027d8128b759fbc71b',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/4b6b2036ef121b027d8128b759fbc71b/invoke.js"></script>
```

**类型**: Banner 320x50（移动端横幅，iframe 格式）
**用途**: 工具页底部（移动端）
**Key**: 4b6b2036ef121b027d8128b759fbc71b

---

## 📊 收集进度

```
NativeBanner_1  ████████████████████ 100%
728x90_1        ████████████████████ 100%
300x250_1       ████████████████████ 100%
320x50_1        ████████████████████ 100%
```

**总进度: 4/4 (100%)** 🎉

---

## 🚀 嵌入计划

| 广告位 | 嵌入位置 | 显示设备 |
|--------|----------|----------|
| NativeBanner_1 | 首页 + 5 个高流量工具页（calculator 下方） | 全部 |
| 728x90_1 | 首页 hero 下方 | 仅桌面 (≥1024px) |
| 300x250_1 | 工具页内容中部 | 桌面/平板 (≥768px) |
| 320x50_1 | 工具页 footer 上方 | 仅手机 (<768px) |

## 📐 实施步骤

1. 创建 `ads/adsterra.css`（响应式 + Sponsored 标签样式）
2. 创建 `ads/adsterra-loader.js`（按需加载，避免重复）
3. 在 `index.html` 嵌入 728x90 + NativeBanner
4. 在 5 个工具页嵌入 NativeBanner + 300x250（桌面） / 320x50（移动）
5. 部署到 Cloudflare Pages
6. 重新提交 sitemap

---

*最后更新: 2026-07-30*
