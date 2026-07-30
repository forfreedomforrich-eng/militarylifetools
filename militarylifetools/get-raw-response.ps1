# Get raw response to check all fields
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "951f0f4098d1a09fb7c584e2d605f621"
$domainId = 5931570
$url = "https://api3.adsterratools.com/publisher/domain/$domainId/placements.json"

$proxy = New-Object System.Net.WebProxy("http://127.0.0.1:7897")
$proxy.Credentials = $null

Write-Host "Getting raw response..." -ForegroundColor Cyan

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
    
    Write-Host ""
    Write-Host "=== RAW JSON RESPONSE ===" -ForegroundColor Yellow
    Write-Host $content
    Write-Host ""
    Write-Host "=== END RAW RESPONSE ===" -ForegroundColor Yellow
    
    # Also try pretty print
    Write-Host ""
    Write-Host "=== PRETTY PRINTED ===" -ForegroundColor Yellow
    $content | ConvertFrom-Json | ConvertTo-Json -Depth 5
    Write-Host ""
    Write-Host "=== END PRETTY PRINTED ===" -ForegroundColor Yellow
    
    $response.Close()
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}