# submit-indexnow.ps1
# Submit all militarylifetools.com URLs to Bing/Yandex via IndexNow
$payload = Get-Content "$PSScriptRoot\..\..\indexnow-payload.json" -Encoding UTF8 -Raw | ForEach-Object { $_.TrimStart([char]0xFEFF) } | ConvertFrom-Json

Write-Host "Submitting $($payload.urlList.Count) URLs to IndexNow..." -ForegroundColor Cyan
try {
    $resp = Invoke-RestMethod -Uri "https://api.indexnow.org/indexnow" -Method Post -ContentType "application/json" -Body ($payload | ConvertTo-Json -Depth 3) -ErrorAction Stop
    Write-Host "SUCCESS: All URLs submitted." -ForegroundColor Green
    $resp | ConvertTo-Json
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}
