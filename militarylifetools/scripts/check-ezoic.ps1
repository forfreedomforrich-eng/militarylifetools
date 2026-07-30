# Test Ezoic Website Accessibility
Write-Host "Testing Ezoic website accessibility..." -ForegroundColor Cyan

$urls = @(
    "https://ezoic.com",
    "https://app.ezoic.com",
    "https://ezoicanalytics.com"
)

foreach ($url in $urls) {
    try {
        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add("User-Agent", "Mozilla/5.0")
        $data = $wc.DownloadData($url)
        Write-Host ("[OK] " + $url + " - Accessible") -ForegroundColor Green
    } catch {
        Write-Host ("[FAIL] " + $url + " - " + $_.Exception.Response.StatusDescription) -ForegroundColor Red
    }
}

Write-Host "`nNote: If you are in China, Ezoic may be blocked by GFW." -ForegroundColor Yellow
Write-Host "Consider using a VPN or proxy to access Ezoic." -ForegroundColor Yellow