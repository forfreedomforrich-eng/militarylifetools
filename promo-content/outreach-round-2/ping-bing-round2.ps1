# ping-bing-round2.ps1
# Round 2 Tumblr URLs - 等发布后填入，运行此脚本打印出 Pingomatic 所需 URL
# 发布完 Round 2 8 篇 Tumblr 后填入下面的 URL，然后跑这个脚本

$urls = @(
    # BAH Calculator - 等 Tumblr 发布后填入
    # "https://www.tumblr.com/militarylifeguide/XXXXXXXX/bah-calculator-2026-find-your-exact",

    # Leave Calculator - 等 Tumblr 发布后填入
    # "https://www.tumblr.com/militarylifeguide/XXXXXXXX/military-leave-calculator-how-to",

    # Pay Calculator - 等 Tumblr 发布后填入
    # "https://www.tumblr.com/militarylifeguide/XXXXXXXX/military-pay-calculator-2026-how-to",

    # PCS Move Checklist - 等 Tumblr 发布后填入
    # "https://www.tumblr.com/militarylifeguide/XXXXXXXX/military-pcs-move-checklist-2026-how-to",

    # Time Converter - 等 Tumblr 发布后填入
    # "https://www.tumblr.com/militarylifeguide/XXXXXXXX/military-time-converter-how-to-read-24",

    # TSP Withdrawal Calculator - 等 Tumblr 发布后填入
    # "https://www.tumblr.com/militarylifeguide/XXXXXXXX/tsp-withdrawal-calculator-2026-how-to",

    # Uniform Size - 等 Tumblr 发布后填入
    # "https://www.tumblr.com/militarylifeguide/XXXXXXXX/military-uniform-size-converter-how-to-find-your-fit",

    # VA Loan Calculator - 等 Tumblr 发布后填入
    # "https://www.tumblr.com/militarylifeguide/XXXXXXXX/va-loan-calculator-2026-how-to-estimate"
)

if ($urls.Count -eq 0 -or $urls[0] -match "^#") {
    Write-Host "Round 2 Tumblr URLs not filled yet." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pending 8 calculators:" -ForegroundColor Cyan
    Write-Host "  1. BAH Calculator"
    Write-Host "  2. Leave Calculator"
    Write-Host "  3. Pay Calculator"
    Write-Host "  4. PCS Move Checklist"
    Write-Host "  5. Time Converter"
    Write-Host "  6. TSP Withdrawal Calculator"
    Write-Host "  7. Uniform Size"
    Write-Host "  8. VA Loan Calculator"
    exit 0
}

Write-Host "Copy URLs below to https://pingomatic.com/" -ForegroundColor Cyan
Write-Host ""
$i = 1
foreach ($url in $urls) {
    Write-Host "  [$i] $url" -ForegroundColor Green
    $i++
}
Write-Host ""
Write-Host "Total: $($urls.Count) Tumblr URLs to paste into Pingomatic" -ForegroundColor White
