# Test Adsterra API with correct authentication
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "y32a456bea60c581b1ada8a03ed3abcd2"
$baseUrl = "https://api3.adsterratools.com/publisher"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Adsterra API Test - Correct Auth Method" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Get domains (websites)
Write-Host "Test 1: GET /domains.json" -ForegroundColor Yellow
try {
    $request = [System.Net.HttpWebRequest]::Create("$baseUrl/domains.json")
    $request.Method = "GET"
    $request.Headers.Add("X-API-Key", $apiKey)

    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host $content
    $response.Close()
} catch {
    Write-Host "Error: $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor Red
    if ($_.Exception.Response -ne $null) {
        $statusCode = $_.Exception.Response.StatusCode
        Write-Host "Status Code: $statusCode" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# Test 2: Get placements
Write-Host "Test 2: GET /placements.json" -ForegroundColor Yellow
try {
    $request = [System.Net.HttpWebRequest]::Create("$baseUrl/placements.json")
    $request.Method = "GET"
    $request.Headers.Add("X-API-Key", $apiKey)

    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host $content
    $response.Close()
} catch {
    Write-Host "Error: $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor Red
    if ($_.Exception.Response -ne $null) {
        $statusCode = $_.Exception.Response.StatusCode
        Write-Host "Status Code: $statusCode" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# Test 3: Get SmartLinks
Write-Host "Test 3: GET /smart-links.json" -ForegroundColor Yellow
try {
    $request = [System.Net.HttpWebRequest]::Create("$baseUrl/smart-links.json")
    $request.Method = "GET"
    $request.Headers.Add("X-API-Key", $apiKey)

    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host $content
    $response.Close()
} catch {
    Write-Host "Error: $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor Red
    if ($_.Exception.Response -ne $null) {
        $statusCode = $_.Exception.Response.StatusCode
        Write-Host "Status Code: $statusCode" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Done." -ForegroundColor Cyan