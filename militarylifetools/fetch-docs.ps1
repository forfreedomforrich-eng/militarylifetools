# Fetch Adsterra API Documentation
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$url = "https://docs.adsterratools.com/public/v3/publishers-api"

Write-Host "Fetching Adsterra API Documentation..." -ForegroundColor Cyan

try {
    $request = [System.Net.HttpWebRequest]::Create($url)
    $request.Method = "GET"
    $request.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()

    Write-Host "Content length: $($content.Length)" -ForegroundColor Green

    # Save to file for analysis
    $content | Out-File -FilePath "militarylifetools\adsterra-docs.html" -Encoding UTF8
    Write-Host "Saved to militarylifetools\adsterra-docs.html" -ForegroundColor Green

    $response.Close()
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}