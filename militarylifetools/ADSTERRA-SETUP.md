# Adsterra 广告联盟设置指南

## 项目信息
- **网站名称**: Military Life Tools
- **网站 URL**: https://militarylifetools.com
- **平台**: Adsterra Publishers
- **用户名**: freedom_military

---

## Adsterra API 信息

### API 端点
- **Base URL**: `https://api3.adsterratools.com/publisher`
- **API 文档**: https://docs.adsterratools.com/public/v3/publishers-api
- **速率限制**: 1200 次/分钟

### 认证方式
- **认证类型**: X-API-Key (Header)
- **Header 名称**: `X-API-Key`
- **Token 状态**: Active
- **Token 过期**: 2027/07/23

### 可用 API 端点

| 端点 | 方法 | 描述 |
|------|------|------|
| `/domains.json` | GET | 获取已注册的网站列表 |
| `/domain/{id}/placements.json` | GET | 获取指定网站的广告位 |
| `/placements.json` | GET | 获取所有广告位 |
| `/smart-links.json` | GET | 获取 SmartLinks |
| `/statistics.json` | GET | 获取统计数据 |

### 广告格式选项
- JSON: `/resource.json`
- XML: `/resource.xml`
- CSV: `/resource.csv`

---

## API Token 问题

### 当前状态
- Token 在 Adsterra 后台显示为 **Active**
- 但 API 调用返回 **403 Forbidden (Invalid token)**
- 可能的原因：
  1. Token 可能需要重新生成
  2. Token 可能与特定 IP 绑定
  3. Token 权限未正确配置

### 解决方案

#### 方案 1: 在 Adsterra 后台手动操作（推荐）
1. 登录 https://adsterra.com
2. 点击 **ADD WEBSITE** 按钮
3. 输入网站 URL: `https://militarylifetools.com`
4. 选择网站类别
5. 创建 Ad Unit（广告单元）
6. 复制广告代码并嵌入网站 HTML

#### 方案 2: 重新生成 API Token
1. 进入 Adsterra 后台 > API > API Tokens
2. 删除现有 Token
3. 创建新的 API Token
4. 确保勾选所有必要权限
5. 使用新 Token 重新测试

#### 方案 3: 联系 Adsterra 支持
- 邮箱: support@adsterra.com
- 询问 API Token 认证问题

---

## 手动添加网站步骤

### 第 1 步: Add Website
1. 登录 Adsterra Publisher 面板
2. 导航到 Websites 页面
3. 点击 **ADD WEBSITE** 按钮
4. 输入以下信息：
   - **Website URL**: `https://militarylifetools.com`
   - **Category**: 选择最合适的类别（如 Finance/Military）

### 第 2 步: Create Ad Unit
1. 在已添加的网站下，点击 **AD UNIT**
2. 选择广告格式：
   - **Social Bar** - 社交栏广告
   - **Popunder** - 弹出窗口广告
   - **Native Banner** - 原生横幅广告
   - **Mobile Push** - 推送通知广告
   - **Javascript Banner** - JS 横幅广告
   - **Interstitial** - 插页式广告
   - **Video** - 视频广告

### 第 3 步: Copy and Embed Code
1. 点击 **GET CODE** 按钮
2. 复制生成的 JavaScript 代码
3. 将代码嵌入网站 `<head>` 或 `<body>` 标签内

---

## 推荐的广告格式

对于军事/退伍军人主题网站，推荐：

1. **JavaScript Banner** - 适合在网站内容中嵌入横幅
2. **Popunder** - 高收益，不影响用户体验
3. **Social Bar** - 低侵入性，适合内容网站

---

## 网站嵌入示例

将广告代码添加到网站的 HTML 文件中：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 其他 meta 标签 -->
    <title>Military Life Tools</title>

    <!-- Adsterra Ad Code -->
    <script type="text/javascript">
        // Adsterra 广告代码将在这里
    </script>
</head>
<body>
    <!-- 网站内容 -->
</body>
</html>
```

或者通过 PowerShell 脚本批量添加：

```powershell
# 读取 HTML 文件
$html = Get-Content "index.html" -Raw

# 添加广告代码
$adCode = '<script type="text/javascript" src="//example.com/ad.js"></script>'
$html = $html -replace '</head>', "$adCode</head>"

# 保存文件
$html | Set-Content "index.html"
```

---

## 下一步行动

1. [ ] 在 Adsterra 后台添加网站 `https://militarylifetools.com`
2. [ ] 创建广告单元（推荐 Popunder + JavaScript Banner）
3. [ ] 获取广告代码
4. [ ] 将广告代码嵌入网站页面
5. [ ] 验证广告是否正常显示
6. [ ] 监控收益和统计数据

---

## 参考资料

- Adsterra 文档: https://docs.adsterratools.com
- 支持邮箱: support@adsterra.com
- API 文档: https://docs.adsterratools.com/public/v3/publishers-api