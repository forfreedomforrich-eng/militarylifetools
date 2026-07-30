# Adsterra API Test Script
# Ignore SSL certificate validation
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
# Use TLS 1.2
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "y32a456bea60c581b1ada8a03ed3abcd2"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Adsterra API Testing Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test multiple API endpoints and auth methods
$endpoints = @(
    @{Name="Publishers Me (Bearer)"; Url="https://api.adsterratools.com/api/v3/publishers/me"; Header="Bearer $apiKey"},
    @{Name="Publishers Me (API Key param)"; Url="https://api.adsterratools.com/api/v3/publishers/me?api_key=$apiKey"; Header=""},
    @{Name="Publishers Me (X-API-Key header)"; Url="https://api.adsterratools.com/api/v3/publishers/me"; Header="X-API-Key: $apiKey"},
    @{Name="Websites List"; Url="https://api.adsterratools.com/api/v3/websites"; Header="Bearer $apiKey"},
    @{Name="Publishers Me (no Bearer)"; Url="https://api.adsterratools.com/v3/publishers/me"; Header="$apiKey"}
)

foreach ($ep in $endpoints) {
    Write-Host "Testing: $($ep.Name)" -ForegroundColor Yellow
    Write-Host "URL: $($ep.Url)" -ForegroundColor Gray
    Write-Host "Header: $($ep.Header)" -ForegroundColor Gray
    
    try {
        $request = [System.Net.HttpWebRequest]::Create($ep.Url)
        $request.Method = "GET"
        
        if ($ep.Header -ne "") {
            if ($ep.Header -like "X-API-Key:*") {
                $key = $ep.Header.Split(":")[1].Trim()
                $request.Headers.Add("X-API-Key", $key)
            } elseif ($ep.Header -like "Bearer*") {
                $request.Headers.Add("Authorization", $ep.Header)
            } else {
                $request.Headers.Add("X-Api-Key", $ep.Header)
            }
        }
        
        $response = $request.GetResponse()
        $stream = $response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $content = $reader.ReadToEnd()
        Write-Host "SUCCESS! Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "Response: $($content.Substring(0, [Math]::Min(300, $content.Length)))" -ForegroundColor White
        Write-Host ""
        $response.Close()
    } catch {
        Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response -ne $null) {
            $statusCode = $_.Exception.Response.StatusCode
            Write-Host "Status Code: $statusCode" -ForegroundColor Red
        }
        Write-Host ""
    }
}
