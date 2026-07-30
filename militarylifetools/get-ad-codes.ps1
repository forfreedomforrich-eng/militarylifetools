# Get all placements with details
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "951f0f4098d1a09fb7c584e2d605f621"
$baseUrl = "https://api3.adsterratools.com/publisher"

$proxy = New-Object System.Net.WebProxy("http://127.0.0.1:7897")
$proxy.Credentials = $null

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Getting All Placements Details" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get all placements
Write-Host "Fetching: GET /placements.json" -ForegroundColor Yellow
try {
    $request = [System.Net.HttpWebRequest]::Create("$baseUrl/placements.json")
    $request.Method = "GET"
    $request.Headers.Add("X-API-Key", $apiKey)
    $request.Proxy = $proxy
    $request.Proxy.Credentials = $null

    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host $content | ConvertFrom-Json | ConvertTo-Json -Depth 5
    $response.Close()
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# Get SmartLinks
Write-Host "Fetching: GET /smart-links.json" -ForegroundColor Yellow
try {
    $request = [System.Net.HttpWebRequest]::Create("$baseUrl/smart-links.json")
    $request.Method = "GET"
    $request.Headers.Add("X-API-Key", $apiKey)
    $request.Proxy = $proxy
    $request.Proxy.Credentials = $null

    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host $content
    $response.Close()
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}