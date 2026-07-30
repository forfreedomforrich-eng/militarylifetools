# Test Adsterra API with system proxy
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13

$apiKey = "951f0f4098d1a09fb7c584e2d605f621"
$baseUrl = "https://api3.adsterratools.com/publisher"

# Get system proxy settings from Windows Registry
$proxySettings = Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings'
$proxyUrl = $proxySettings.ProxyServer
$proxyEnabled = $proxySettings.ProxyEnable

Write-Host "System Proxy: $proxyUrl" -ForegroundColor Yellow
Write-Host "Proxy Enabled: $proxyEnabled" -ForegroundColor Yellow
Write-Host ""

# Create web request with proxy
$proxy = New-Object System.Net.WebProxy("http://$proxyUrl")
$proxy.Credentials = New-Object Net.NetworkCredential("", "")

$request = [System.Net.HttpWebRequest]::Create("$baseUrl/domains.json")
$request.Method = "GET"
$request.Headers.Add("X-API-Key", $apiKey)
$request.Headers.Add("Accept", "application/json")
$request.Proxy = $proxy
$request.Proxy.Credentials = $null

try {
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
        $_.Exception.Response.Close()
    }
}

Write-Host ""
Write-Host "Done." -ForegroundColor Cyan