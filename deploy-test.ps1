# Military Life Tools - 涓€閿儴缃茶剼鏈?# 鐢ㄦ硶锛氬湪椤圭洰鏍圭洰褰曡繍琛?powershell -ExecutionPolicy Bypass -File deploy.ps1

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$siteRoot = $projectRoot

# 1. 璇诲彇 .env
$envPath = Join-Path $projectRoot ".env"
if (-not (Test-Path $envPath)) {
    Write-Host "鉂?.env 鏂囦欢涓嶅瓨鍦細$envPath" -ForegroundColor Red
    exit 1
}

foreach($line in Get-Content $envPath) {
    if($line -match "^(.*?)=(.*)$" -and -not $line.StartsWith("#") -and $line.Trim().Length -gt 0){
        $key = $matches[1].Trim()
        $val = $matches[2].Trim()
        Set-Item -Path "Env:$key" -Value $val
    }
}

# 2. 楠岃瘉 Cloudflare 鍑嵁
if (-not $env:CLOUDFLARE_API_TOKEN) {
    Write-Host "鉂?CLOUDFLARE_API_TOKEN 鏈缃? -ForegroundColor Red
    exit 1
}

# 3. 閮ㄧ讲
Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] 鍒囧埌绔欑偣鐩綍锛?siteRoot" -ForegroundColor Cyan
Set-Location $siteRoot

Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] 寮€濮嬮儴缃?.." -ForegroundColor Cyan
wrangler pages deploy . --project-name=militarylifetools --branch=main

Write-Host ""
Write-Host "鉁?閮ㄧ讲瀹屾垚锛? -ForegroundColor Green
Write-Host "馃憠 璁块棶 https://militarylifetools.com/ 楠岃瘉" -ForegroundColor Green

