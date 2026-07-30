# Test Adsterra API - Final Test
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "y32a456bea60c581b1ada8a03ed3abcd2"
$baseUrl = "https://api3.adsterratools.com/publisher"

# Get system proxy settings
$proxy = [System.Net.WebRequest]::DefaultWebProxy
if ($proxy -and $proxy.Address) {
    Write-Host "Using proxy: $($proxy.Address)" -ForegroundColor Yellow
} else {
    Write-Host "No proxy detected" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Adsterra API Final Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test with system proxy (default)
Write-Host "Test: GET $baseUrl/domains.json" -ForegroundColor Yellow
try {
    $request = [System.Net.HttpWebRequest]::Create("$baseUrl/domains.json")
    $request.Method = "GET"
    $request.Headers.Add("X-API-Key", $apiKey)
    # Use default proxy settings
    
    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    Write-Host "SUCCESS! Response:" -ForegroundColor Green
    Write-Host $content
    $response.Close()
} catch {
    Write-Host "Error: $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor Red
    if ($_.Exception.Response -ne $null) {
        $readStream = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorContent = $readStream.ReadToEnd()
        $readStream.Close()
        Write-Host "Response: $errorContent" -ForegroundColor Red
    }
    $statusCode = $_.Exception.Response.StatusCode
    Write-Host "Status Code: $statusCode" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan