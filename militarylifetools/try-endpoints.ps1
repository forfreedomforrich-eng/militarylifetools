# Try different endpoints to find ad code
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "951f0f4098d1a09fb7c584e2d605f621"
$baseUrl = "https://api3.adsterratools.com/publisher"
$id = 30395673

$proxy = New-Object System.Net.WebProxy("http://127.0.0.1:7897")
$proxy.Credentials = $null

$endpoints = @(
    "$baseUrl/placements/$id.json"
    "$baseUrl/placements/$id"
    "$baseUrl/placements/$id/code.json"
    "$baseUrl/placements/$id/embed.json"
    "$baseUrl/placements/$id/adcode.json"
    "$baseUrl/placements/$id/script.json"
    "$baseUrl/placements/$id/details.json"
    "$baseUrl/code/$id.json"
    "$baseUrl/code/$id"
)

foreach ($url in $endpoints) {
    Write-Host "Try: $url" -ForegroundColor Yellow
    try {
        $request = [System.Net.HttpWebRequest]::Create($url)
        $request.Method = "GET"
        $request.Headers.Add("X-API-Key", $apiKey)
        $request.Proxy = $proxy
        $request.Proxy.Credentials = $null

        $response = $request.GetResponse()
        $stream = $response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $content = $reader.ReadToEnd()
        Write-Host "  OK! ($($response.StatusCode))" -ForegroundColor Green
        Write-Host "  Body: $content" -ForegroundColor White
        Write-Host ""
        $response.Close()
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        Write-Host "  $($code) - $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor DarkGray
    }
}
