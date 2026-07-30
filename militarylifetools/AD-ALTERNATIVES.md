# 广告联盟部署指南

**更新日期**: 2026-07-23  
**状态**: Ezoic 未通过，PropellerAds/Adsterra 待部署

---

## 📊 当前 Amazon 联盟状态

### ✅ 已有 Amazon 卡片的页面 (6/10)
| 页面 | Amazon 卡片 | 品类 |
|------|------------|------|
| 首页 (ETS) | ✅ 已有 | Post-Military Essentials |
| Time Converter | ✅ 已有 | Watches & Timepieces |
| Uniform Size | ✅ 已有 | Military Uniforms |
| BAH Calculator | ✅ 已有 | PCS & Housing Gear |
| Pay Calculator | ✅ 已有 | Personal Finance Books |
| VA Loan Calculator | ✅ 已有 | Homebuying Products |

### ⏳ 需要添加 Amazon 卡片的页面 (4/10)
| 页面 | 推荐品类 | 优先级 |
|------|---------|--------|
| Leave Calculator | 旅行用品、行李袋 | 高 |
| PCS Move Checklist | 搬家箱、标签 | 高 |
| VA Disability | 退伍军人用品 | 中 |
| Retirement Calculator | 理财书籍、TSP相关 | 中 |
| TSP Withdrawal | 投资书籍、财务规划 | 低 |

---

## 🎯 第二优先: Adsterra / PropellerAds 部署

### 方案 A: Adsterra (推荐)

#### 优势
- ✅ 零流量要求
- ✅ 审核快 (通常 24 小时内)
- ✅ 支持中国 IP
- ✅ 多种广告格式
- ✅ 最低 $5 提现
- ✅ 支持 Payoneer / Crypto 收款

#### 广告格式
| 格式 | 尺寸 | RPM 预估 |
|------|------|---------|
| Smart Link | 自动 | $3-10 |
| Popunder | 弹窗 | $5-15 |
| 728x90 Banner | 顶部横幅 | $3-8 |
| 300x250 MREC | 侧边栏 | $3-10 |
| Social Bar | 社交按钮 | $2-6 |

#### 申请步骤
1. 访问: https://adsterra.com/
2. 点击 "Sign Up"
3. 填写:
   - Website: militarylifetools.com
   - Category: Finance / Education
   - Email: 您的邮箱
4. 选择收款方式: Payoneer 或 USDT
5. 等待审核

#### 代码集成
```html
<!-- 放在 </body> 之前 -->
<script async=true src="//plXXXXX.cpmrevenuegate.com/tag.js"></script>
```

---

### 方案 B: PropellerAds

#### 优势
- ✅ 几乎零门槛
- ✅ 中国 IP 可用
- ✅ 24 小时审核
- ✅ 支持加密货币支付

#### 申请步骤
1. 访问: https://www.propellerads.com/publishers/monetize-website
2. 点击 "Sign Up"
3. 填写网站信息
4. 放置追踪代码

---

## 📱 Facebook Groups 推广

详细指南请查看: `FACEBOOK-GROUPS-GUIDE.md`

### 快速开始
1. 搜索 "military family", "veterans", "active duty military" 等关键词
2. 加入 10-15 个军事相关群组
3. 先参与讨论，再分享工具
4. 重点推广 ETS Countdown 和 BAH Calculator

---

## 🚀 执行计划

### 第 1 步: 申请 Adsterra (今天)
1. 访问 https://adsterra.com/
2. 注册账号
3. 提交 militarylifetools.com
4. 选择 Payoneer 收款
5. 放置追踪代码

### 第 2 步: 为剩余页面添加 Amazon 卡片
按照现有模板为 Leave Calculator 和 PCS Move Checklist 添加卡片

### 第 3 步: 执行 Facebook Groups 推广
按指南逐步执行

---

*建议优先申请 Adsterra，同时开始 Facebook Groups 推广*