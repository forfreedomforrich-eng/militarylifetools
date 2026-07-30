# Add async attribute to highperformanceformat ad scripts
# Step 1 of speed optimization

Set-Location $PSScriptRoot

$files = @(
    'index.html',
    'bah-calculator\index.html',
    'gi-bill-calculator\index.html',
    'leave-calculator\index.html',
    'pay-calculator\index.html',
    'pcs-move-checklist\index.html',
    'retirement-calculator\index.html',
    'time-converter\index.html',
    'tsp-withdrawal-calculator\index.html',
    'uniform-size\index.html',
    'va-disability-calculator\index.html',
    'va-loan-calculator\index.html'
)

$totalFixed = 0
$pattern = '<script src="(https://www\.highperformanceformat\.com/[^"]+invoke\.js)"></script>'
$replacement = '<script async src="$1"></script>'

foreach ($f in $files) {
    if (!(Test-Path $f)) {
        Write-Host "$f : NOT FOUND"
        continue
    }
    $content = Get-Content $f -Raw
    $matches_count = ([regex]::Matches($content, $pattern)).Count
    if ($matches_count -eq 0) {
        Write-Host "$f : no change"
        continue
    }
    $new = $content -replace $pattern, $replacement
    Set-Content -Path $f -Value $new -NoNewline
    $totalFixed += $matches_count
    Write-Host "$f : fixed $matches_count"
}

Write-Host ""
Write-Host "========================================"
Write-Host "TOTAL: $totalFixed scripts fixed"
Write-Host "========================================"
