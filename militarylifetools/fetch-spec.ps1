# Fetch API Specification Files
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$urls = @(
    "https://docs.adsterratools.com/static/js/main.9866d188.chunk.js",
    "https://docs.adsterratools.com/openapi.json",
    "https://docs.adsterratools.com/api-docs.json",
    "https://docs.adsterratools.com/spec.json"
)

foreach ($url in $urls) {
    Write-Host "Fetching: $url" -ForegroundColor Yellow
    try {
        $request = [System.Net.HttpWebRequest]::Create($url)
        $request.Method = "GET"
        $response = $request.GetResponse()
        $stream = $response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $content = $reader.ReadToEnd()
        Write-Host "Size: $($content.Length) bytes" -ForegroundColor Green
        # Look for API endpoint patterns
        $matches = [regex]::Matches($content, '"/?(api/v3/[a-z]+/[a-z]+)"')
        foreach ($m in $matches) {
            Write-Host "  Found: $($m.Value)" -ForegroundColor Cyan
        }
        $response.Close()
    } catch {
        Write-Host "Failed: $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor DarkGray
    }
}

Write-Host "Done." -ForegroundColor Cyan