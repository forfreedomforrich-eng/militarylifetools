# Get placements with direct URLs for our domain
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "951f0f4098d1a09fb7c584e2d605f621"
$domainId = 5931570
$url = "https://api3.adsterratools.com/publisher/domain/$domainId/placements.json"

$proxy = New-Object System.Net.WebProxy("http://127.0.0.1:7897")
$proxy.Credentials = $null

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Getting Direct URLs for Domain: $domainId" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    $request = [System.Net.HttpWebRequest]::Create($url)
    $request.Method = "GET"
    $request.Headers.Add("X-API-Key", $apiKey)
    $request.Proxy = $proxy
    $request.Proxy.Credentials = $null

    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    
    Write-Host "SUCCESS! Response:" -ForegroundColor Green
    $json = $content | ConvertFrom-Json
    Write-Host ""
    
    foreach ($item in $json.items) {
        Write-Host "Placement: $($item.title)" -ForegroundColor Yellow
        Write-Host "  ID: $($item.id)" -ForegroundColor Gray
        Write-Host "  Alias: $($item.alias)" -ForegroundColor Gray
        if ($item.direct_url) {
            Write-Host "  Direct URL: $($item.direct_url)" -ForegroundColor Green
        } else {
            Write-Host "  Direct URL: (not available)" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    $response.Close()
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host "========================================" -ForegroundColor Cyan