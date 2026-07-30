# Adsterra API - Get Placements and Create Ad Unit
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "951f0f4098d1a09fb7c584e2d605f621"
$baseUrl = "https://api3.adsterratools.com/publisher"
$domainId = 5931570

# Set proxy
$proxy = New-Object System.Net.WebProxy("http://127.0.0.1:7897")
$proxy.Credentials = $null

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Adsterra - Get Placements & Create Ad" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Get existing placements for the domain
Write-Host "Step 1: Getting existing placements for domain ID: $domainId" -ForegroundColor Yellow
try {
    $request = [System.Net.HttpWebRequest]::Create("$baseUrl/domain/$domainId/placements.json")
    $request.Method = "GET"
    $request.Headers.Add("X-API-Key", $apiKey)
    $request.Proxy = $proxy
    $request.Proxy.Credentials = $null

    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    Write-Host "SUCCESS! Existing placements:" -ForegroundColor Green
    Write-Host $content
    $response.Close()
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan