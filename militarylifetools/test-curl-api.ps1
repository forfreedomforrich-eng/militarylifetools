# Test Adsterra API using Invoke-RestMethod
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "y32a456bea60c581b1ada8a03ed3abcd2"
$baseUrl = "https://api3.adsterratools.com/publisher"

$headers = @{
    "X-API-Key" = $apiKey
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Adsterra API Test - Invoke-RestMethod" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test: Get domains
Write-Host "Testing: GET $baseUrl/domains.json" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/domains.json" -Headers $headers -Method Get
    $response | ConvertTo-Json -Depth 5
    Write-Host "SUCCESS!" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# Test: Get placements
Write-Host "Testing: GET $baseUrl/placements.json" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/placements.json" -Headers $headers -Method Get
    $response | ConvertTo-Json -Depth 5
    Write-Host "SUCCESS!" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}