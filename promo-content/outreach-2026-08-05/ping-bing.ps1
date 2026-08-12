# ping-bing.ps1
# ⚠️ DEPRECATED — Bing's /ping?sitemap endpoint returns 410 Gone (as of 2026-08-05)
# and accepts nothing. All other free auto-ping endpoints have the same constraint:
# they only accept URLs on YOUR verified host, not third-party backlink pages.
#
# Working alternative for backlink indexing:
#   → Manual: https://pingomatic.com/  (paste each URL, click Send Pings, ~5 min)
#   → Or just wait — Medium/WordPress.com/Tumblr/Blogger are high-DA, crawled in hours
#
# This script prints Round 1 URLs for manual submission at Pingomatic.
# Round 2 Tumblr URLs are managed by ping-bing-round2.ps1 in outreach-round-2/.

$urls = @(
    # Round 1 — VA Disability (all 4 platforms, updated 2026-08-12)
    "https://militarylifetools.blogspot.com/2026/08/va-disability-compensation-explained_01512287756.html",
    "https://medium.com/@forfreedomforrich/va-disability-compensation-in-2026-how-to-estimate-your-benefits-before-you-file-2fe064e8eb3d",
    "https://militarylifetools.wordpress.com/2026/08/05/va-disability-compensation-explained-what-veterans-should-know-in-2026/",
    "https://www.tumblr.com/militarylifeguide/824734239175131136/va-disability-compensation-explained-what?source=share",

    # Round 1 — GI Bill (all 4 platforms, updated 2026-08-12)
    "https://militarylifetools.blogspot.com/2026/08/gi-bill-calculator-how-to-estimate.html",
    "https://medium.com/@forfreedomforrich/the-gi-bill-calculator-every-service-member-should-use-before-picking-a-school-6e1141a34945",
    "https://militarylifetools.wordpress.com/2026/08/05/gi-bill-calculator-how-to-estimate-education-benefits-before-you-choose-a-school/",
    "https://www.tumblr.com/militarylifeguide/824734312305917952/gi-bill-calculator-how-to-estimate-education?source=share",

    # Round 1 — Retirement (Blogger + WordPress + Tumblr; Medium pending schedule)
    "https://militarylifetools.blogspot.com/2026/08/military-retirement-planning-in-2026.html",
    "https://militarylifetools.wordpress.com/2026/08/05/military-retirement-planning-in-2026-legacy-vs-brs-tsp-and-what-to-know-before-you-leave/",
    "https://www.tumblr.com/militarylifeguide/824734408534900736/military-retirement-planning-in-2026-legacy-vs?source=share"
)

Write-Host "ℹ️  This script is DEPRECATED — Bing /ping endpoint returns 410 Gone." -ForegroundColor Yellow
Write-Host "   Printing URLs for manual submission at https://pingomatic.com/" -ForegroundColor Cyan
Write-Host ""
Write-Host "─────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "Copy each URL below into Pingomatic's 'Blog homepage URL' field:" -ForegroundColor White
Write-Host "─────────────────────────────────────────────────────────────" -ForegroundColor DarkGray

$i = 1
foreach ($url in $urls) {
    Write-Host ""
    Write-Host "  [$i] $url" -ForegroundColor Green
    $i++
}

Write-Host ""
Write-Host "─────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "Total: $($urls.Count) URLs to paste into Pingomatic" -ForegroundColor White