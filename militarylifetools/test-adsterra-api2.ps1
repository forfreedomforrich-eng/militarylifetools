# Adsterra API Test Script v2
# Ignore SSL certificate validation
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
# Use TLS 1.2
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "y32a456bea60c581b1ada8a03ed3abcd2"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Adsterra API Testing v2" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Try different API base URLs
$baseUrls = @(
    "https://api.adsterra.com",
    "https://api.adsterratools.com",
    "https://adsterratools.com/api",
    "https://docs.adsterratools.com/api"
)

$paths = @(
    "/v3/publishers/me",
    "/api/v3/publishers/me",
    "/publishers/me",
    "/api/publishers/me"
)

foreach ($baseUrl in $baseUrls) {
    foreach ($path in $paths) {
        $url = $baseUrl + $path
        Write-Host "Testing: $url" -ForegroundColor Yellow

        try {
            $request = [System.Net.HttpWebRequest]::Create($url)
            $request.Method = "GET"
            $request.Headers.Add("Authorization", "Bearer " + $apiKey)

            $response = $request.GetResponse()
            $stream = $response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $content = $reader.ReadToEnd()
            Write-Host "SUCCESS! Response: $($content.Substring(0, [Math]::Min(200, $content.Length)))" -ForegroundColor Green
            Write-Host ""
            $response.Close()
            # If we found a working URL, stop testing
            break
        } catch {
            $statusCode = "N/A"
            if ($_.Exception.Response -ne $null) {
                $statusCode = $_.Exception.Response.StatusCode
            }
            Write-Host "Failed: $statusCode - $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor DarkGray
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing POST methods..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Try POST with JSON body
$postUrls = @(
    "https://api.adsterratools.com/api/v3/publishers/me",
    "https://api.adsterra.com/api/v3/publishers/me"
)

foreach ($url in $postUrls) {
    Write-Host "POST Testing: $url" -ForegroundColor Yellow

    try {
        $request = [System.Net.HttpWebRequest]::Create($url)
        $request.Method = "POST"
        $request.Headers.Add("Authorization", "Bearer " + $apiKey)
        $request.ContentType = "application/json"

        $response = $request.GetResponse()
        $stream = $response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $content = $reader.ReadToEnd()
        Write-Host "SUCCESS! Response: $($content.Substring(0, [Math]::Min(200, $content.Length)))" -ForegroundColor Green
        $response.Close()
    } catch {
        $statusCode = "N/A"
        if ($_.Exception.Response -ne $null) {
            $statusCode = $_.Exception.Response.StatusCode
        }
        Write-Host "POST Failed: $statusCode" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "Done." -ForegroundColor Cyan