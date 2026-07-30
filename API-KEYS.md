# Military Life Tools - API 密钥和账号

## 警告
**真实密钥已迁移到 `.env` 文件**（不在 git 里）。本文件只保留结构说明。

## Cloudflare
- 邮箱: <见 .env 中 CLOUDFLARE_ACCOUNT 邮箱>
- Account ID: <见 .env: CLOUDFLARE_ACCOUNT_ID>
- API Token: <见 .env: CLOUDFLARE_API_TOKEN>
- Domain Zone ID: <见 .env: CLOUDFLARE_ZONE_ID>

## Google Search Console
- 验证代码: <见 .env: GOOGLE_SITE_VERIFICATION>

## GitHub
- 用户名: forfreedomforrich-eng
- 仓库: militarylifetools
- 代理: http://127.0.0.1:7897 (在 .env: GIT_PROXY)

## SerpAPI
- API Key: <见 .env: SERPAPI_KEY>

## 部署命令（从 .env 读取）
```bash
# Linux/Mac
export $(cat .env | xargs)
wrangler pages deploy . --project-name=militarylifetools --branch=main

# Windows PowerShell
Get-Content .env | ForEach-Object { if ($_ -match "^(.*?)=(.*)$") { [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process") } }
wrangler pages deploy . --project-name=militarylifetools --branch=main
```

## 重要：密钥轮换
建议每 90 天轮换一次（去 Cloudflare Dashboard → My Profile → API Tokens → Roll）。
