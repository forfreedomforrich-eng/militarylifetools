# Fetch API YAML spec
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

$urls = @(
    "https://docs.adsterratools.com/docs/public/v3/publishers-api.yml",
    "https://docs.adsterratools.com/public/v3/publishers-api.yml"
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
        Write-Host "Content:" -ForegroundColor Cyan
        Write-Host $content
        Write-Host "---" -ForegroundColor Gray
        $response.Close()
    } catch {
        Write-Host "Failed: $($_.Exception.Message.Split([Environment]::NewLine)[0])" -ForegroundColor DarkGray
    }
}