# Military Life Tools - 一键部署脚本
# 用法：在项目根目录运行 powershell -ExecutionPolicy Bypass -File deploy.ps1

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$siteRoot = Join-Path $projectRoot "militarylifetools"

# 1. 读取 .env
$envPath = Join-Path $projectRoot ".env"
if (-not (Test-Path $envPath)) {
    Write-Host "❌ .env 文件不存在：$envPath" -ForegroundColor Red
    exit 1
}

foreach($line in Get-Content $envPath) {
    if($line -match "^(.*?)=(.*)$" -and -not $line.StartsWith("#") -and $line.Trim().Length -gt 0){
        $key = $matches[1].Trim()
        $val = $matches[2].Trim()
        Set-Item -Path "Env:$key" -Value $val
    }
}

# 2. 验证 Cloudflare 凭据
if (-not $env:CLOUDFLARE_API_TOKEN) {
    Write-Host "❌ CLOUDFLARE_API_TOKEN 未设置" -ForegroundColor Red
    exit 1
}

# 3. 部署
Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] 切到站点目录：$siteRoot" -ForegroundColor Cyan
Set-Location $siteRoot

Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] 开始部署..." -ForegroundColor Cyan
wrangler pages deploy . --project-name=militarylifetools --branch=main

Write-Host ""
Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "👉 访问 https://militarylifetools.com/ 验证" -ForegroundColor Green
