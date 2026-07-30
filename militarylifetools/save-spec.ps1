# Save OpenAPI spec to file
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

$url = "https://docs.adsterratools.com/docs/public/v3/publishers-api.yml"
$outFile = "c:\Users\kusan\Desktop\工具站项目\militarylifetools\adsterra-spec.yml"

try {
    $request = [System.Net.HttpWebRequest]::Create($url)
    $request.Method = "GET"
    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    $content | Out-File -FilePath $outFile -Encoding utf8
    Write-Host "Saved to: $outFile ($($content.Length) bytes)" -ForegroundColor Green
    $response.Close()
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}
