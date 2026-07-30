# Get placement details with direct URLs
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "951f0f4098d1a09fb7c584e2d605f621"
$baseUrl = "https://api3.adsterratools.com/publisher"

$proxy = New-Object System.Net.WebProxy("http://127.0.0.1:7897")
$proxy.Credentials = $null

$placementIds = @(30395673, 30395674, 30395675, 30395676)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Getting Placement Details" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($id in $placementIds) {
    Write-Host "Fetching placement ID: $id" -ForegroundColor Yellow
    try {
        $request = [System.Net.HttpWebRequest]::Create("$baseUrl/placements/$id.json")
        $request.Method = "GET"
        $request.Headers.Add("X-API-Key", $apiKey)
        $request.Proxy = $proxy
        $request.Proxy.Credentials = $null

        $response = $request.GetResponse()
        $stream = $response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $content = $reader.ReadToEnd()
        Write-Host "SUCCESS!" -ForegroundColor Green
        Write-Host $content
        Write-Host ""
        $response.Close()
    } catch {
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

Write-Host "========================================" -ForegroundColor Cyan