# Try different API endpoints for placement details
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "951f0f4098d1a09fb7c584e2d605f621"
$proxy = New-Object System.Net.WebProxy("http://127.0.0.1:7897")
$proxy.Credentials = $null

Write-Host "Trying different API endpoints..." -ForegroundColor Cyan
Write-Host ""

# Try: GET /placements/30395674/direct_url.json
$id = 30395674
$url = "https://api3.adsterratools.com/publisher/placements/$id/direct_url.json"
Write-Host "Trying: $url" -ForegroundColor Yellow
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
    Write-Host "Response: $content" -ForegroundColor Green
    $response.Close()
} catch {
    Write-Host "Error: $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor Red
}

Write-Host ""

# Try: GET /domains/5931570/placements/30395674.json
$id = 30395674
$url = "https://api3.adsterratools.com/publisher/domains/5931570/placements/$id.json"
Write-Host "Trying: $url" -ForegroundColor Yellow
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
    Write-Host "Response: $content" -ForegroundColor Green
    $response.Close()
} catch {
    Write-Host "Error: $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor Red
}

Write-Host ""
Write-Host "Done." -ForegroundColor Cyan