$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $root
$pages = @("bah-calculator","pay-calculator","va-loan-calculator","va-disability-calculator","gi-bill-calculator","retirement-calculator","leave-calculator","pcs-move-checklist","time-converter","uniform-size","tsp-withdrawal-calculator")
$cssLine = '    <link rel="stylesheet" href="/ads/adsterra.css">'
$adBlock = "`r`n`r`n    <!-- Adsterra: 300x250 In-Content (Desktop/Tablet) -->`r`n    <div class=""adsterra-tablet-up"" style=""margin: 2rem auto; text-align: center;"">`r`n        <script>`r`n          atOptions = {`r`n            'key' : '9b1ab111ca339e5bc6f3c12770fbe14a',`r`n            'format' : 'iframe',`r`n            'height' : 250,`r`n            'width' : 300,`r`n            'params' : {}`r`n          };`r`n        </script>`r`n        <script src=""https://www.highperformanceformat.com/9b1ab111ca339e5bc6f3c12770fbe14a/invoke.js""></script>`r`n    </div>`r`n`r`n    <!-- Adsterra: Native Banner (All devices) -->`r`n    <div style=""margin: 2rem auto; text-align: center; max-width: 728px;"">`r`n        <script async=""async"" data-cfasync=""false"" src=""https://pl30496172.effectivecpmnetwork.com/1018c00d12d7fdaebaa6406ac52b9076/invoke.js""></script>`r`n        <div id=""container-1018c00d12d7fdaebaa6406ac52b9076""></div>`r`n    </div>`r`n`r`n    <!-- Adsterra: 320x50 Mobile Sticky (Mobile only) -->`r`n    <div style=""position: fixed; bottom: 0; left: 0; right: 0; z-index: 999; background: #fff; text-align: center; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); padding: 0.5rem 0;"" class=""adsterra-mobile-only"">`r`n        <script>`r`n          atOptions = {`r`n            'key' : '4b6b2036ef121b027d8128b759fbc71b',`r`n            'format' : 'iframe',`r`n            'height' : 50,`r`n            'width' : 320,`r`n            'params' : {}`r`n          };`r`n        </script>`r`n        <script src=""https://www.highperformanceformat.com/4b6b2036ef121b027d8128b759fbc71b/invoke.js""></script>`r`n    </div>`r`n    <div style=""height: 60px;""></div>`r`n"

$results = @()
foreach ($p in $pages) {
    $path = Join-Path $root "$p\index.html"
    if (-not (Test-Path $path)) { $results += "SKIP: $p"; continue }
    $content = Get-Content $path -Raw -Encoding UTF8
    $changed = $false
    if ($content -notmatch '/ads/adsterra\.css') {
        $content = $content -replace '(\s*<link rel="stylesheet" href="/css/v2\.css">)', "`$1`r`n$cssLine"
        $changed = $true
    }
    if ($content -notmatch 'adsterra-tablet-up') {
        $content = $content -replace '(\s*<footer[\s>])', "$adBlock`$1"
        $changed = $true
    }
    if ($changed) { $content | Out-File $path -Encoding UTF8 -NoNewline }
    $results += "$(if($changed){'UPDATED'}else{'OK already'}): $p"
}
$results | ForEach-Object { Write-Host $_ }
