# Fetch JS file content
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

$request = [System.Net.HttpWebRequest]::Create("https://docs.adsterratools.com/static/js/main.9866d188.chunk.js")
$request.Method = "GET"

$response = $request.GetResponse()
$stream = $response.GetResponseStream()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()

Write-Host "Content length: $($content.Length)"
Write-Host "Content:"
Write-Host $content

$response.Close()