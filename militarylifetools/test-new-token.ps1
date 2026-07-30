# Test Adsterra API with new Token
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "951f0f4098d1a09fb7c584e2d605f621"
$baseUrl = "https://api3.adsterratools.com/publisher"

$headers = @{
    "X-API-Key" = $apiKey
    "Accept" = "application/json"
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing NEW API Token" -ForegroundColor Cyan
Write-Host "Token: $($apiKey.Substring(0,8))..." -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Get domains
Write-Host "Test 1: GET /domains.json" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/domains.json" -Headers $headers -Method Get -ContentType "application/json"
    Write-Host "SUCCESS!" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    if ($_.Exception.ErrorDetails) {
        Write-Host "Details: $($_.Exception.ErrorDetails.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Test 2: Get placements
Write-Host "Test 2: GET /placements.json" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/placements.json" -Headers $headers -Method Get -ContentType "application/json"
    Write-Host "SUCCESS!" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    if ($_.Exception.ErrorDetails) {
        Write-Host "Details: $($_.Exception.ErrorDetails.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan