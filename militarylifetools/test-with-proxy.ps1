# Test Adsterra API with proxy settings
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "y32a456bea60c581b1ada8a03ed3abcd2"
$baseUrl = "https://api3.adsterratools.com/publisher"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Adsterra API Test - With Proxy Settings" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Method 1: Using Invoke-RestMethod with proxy bypass
Write-Host "Method 1: Direct connection (no proxy)" -ForegroundColor Yellow
try {
    $webClient = New-Object System.Net.WebClient
    $webClient.Credentials = New-Object System.Net.NetworkCredential("", "")
    $webClient.Proxy = $null  # No proxy
    $webClient.Proxy.Credentials = $null
    $webClient.Headers.Add("X-API-Key", $apiKey)
    $webClient.Headers.Add("Content-Type", "application/json")
    $response = $webClient.DownloadString("$baseUrl/domains.json")
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host $response
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}

Write-Host ""

# Method 2: Using WebRequest with proxy bypass
Write-Host "Method 2: Using WebRequest" -ForegroundColor Yellow
try {
    $request = [System.Net.HttpWebRequest]::Create("$baseUrl/domains.json")
    $request.Method = "GET"
    $request.Proxy = $null  # Bypass proxy
    $request.Headers.Add("X-API-Key", $apiKey)

    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host $content
    $response.Close()
} catch {
    Write-Host "Failed: $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor Red
    if ($_.Exception.Response -ne $null) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Done." -ForegroundColor Cyan