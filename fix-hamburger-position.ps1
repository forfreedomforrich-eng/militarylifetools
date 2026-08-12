$baseDir = 'C:\Users\kusan\Desktop\工具站项目\militarylifetools'
$count = 0
$insertion = [string]::Format("`n        <input type=`"checkbox`" id=`"nav-toggle`" class=`"nav-toggle-checkbox`" aria-label=`"Toggle navigation menu`">`n        <label for=`"nav-toggle`" class=`"nav-toggle-icon`" aria-hidden=`"true`">&#9776;</label>`n        ")
Get-ChildItem $baseDir -Recurse -File -Filter '*.html' | ForEach-Object {
    $p = $_.FullName
    $c = Get-Content $p -Raw -Encoding UTF8
    if ($c -notmatch 'nav-toggle-checkbox') { return }
    $innerPattern = '(?s)\s*<input type="checkbox" id="nav-toggle"[^>]*>\s*<label for="nav-toggle"[^>]*>[^<]*</label>'
    $c = [regex]::Replace($c, $innerPattern, '', 1)
    $navPattern = '(<header[^>]*>\s*)<nav'
    $c = [regex]::Replace($c, $navPattern, ('$1' + $insertion + '<nav'), 1)
    Set-Content -Path $p -Value $c -Encoding UTF8 -NoNewline
    $count++
    Write-Output ('FIXED: {0}' -f $p.Substring($baseDir.Length))
}
Write-Output ('Done: {0}' -f $count)
