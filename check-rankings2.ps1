$queries = @("gi-bill-calculator", "military-pay-calculator-2026", "va-disability-calculator", "pcs-move-checklist-2026", "military-retirement-calculator", "va-loan-calculator", "military-time-converter")
$key = "ad314fadaf273ecd25484c5eadf640cce5271c153fe040cc9f1c754e03c456b2"
$rows = @()
foreach ($q in $queries) {
  $url = "https://serpapi.com/search.json?engine=google&q=$q&api_key=$key&num=20"
  try {
    $resp = Invoke-RestMethod -Uri $url -TimeoutSec 30
    $mine = @($resp.organic_results | Where-Object { $_.link -like '*militarylifetools*' })
    $rows += [PSCustomObject]@{
      Q = $q
      MyPos = if ($mine.Count -gt 0) { $mine[0].position } else { "-" }
      Title = if ($mine.Count -gt 0) { $mine[0].title } else { "not in top 20" }
      TotalResults = $resp.search_information.total_results
    }
  } catch {
    $rows += [PSCustomObject]@{ Q=$q; MyPos="ERR"; Title=$_.Exception.Message; TotalResults="-" }
  }
  Start-Sleep -Seconds 1
}
$rows | Format-Table -Wrap
