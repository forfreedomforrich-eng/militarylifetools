$queries = @("gi-bill-calculator", "military-pay-calculator-2026", "va-disability-calculator", "pcs-move-checklist-2026", "military-retirement-calculator", "va-loan-calculator", "military-time-converter")
$key = "ad314fadaf273ecd25484c5eadf640cce5271c153fe040cc9f1c754e03c456b2"
$results = @()
foreach ($q in $queries) {
  $url = "https://serpapi.com/search.json?engine=google&q=$q&api_key=$key&num=20"
  $resp = Invoke-RestMethod -Uri $url -TimeoutSec 30
  $mine = $resp.organic_results | Where-Object { $_.link -like '*militarylifetools.com*' }
  $results += [PSCustomObject]@{
    Query = $q
    MyPosition = ($mine | Select-Object -First 1).position
    MyTitle = ($mine | Select-Object -First 1).title
    TotalResults = $resp.search_information.total_results
  }
  Start-Sleep -Seconds 1
}
$results | Format-Table -AutoSize
