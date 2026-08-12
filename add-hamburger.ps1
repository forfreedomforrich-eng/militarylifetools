$baseDir = 'C:\Users\kusan\Desktop\工具站项目\militarylifetools'
$insertion = @(
    '        <input type="checkbox" id="nav-toggle" class="nav-toggle-checkbox" aria-label="Toggle navigation menu">',
    '        <label for="nav-toggle" class="nav-toggle-icon" aria-hidden="true">☰</label>'
)
$insertBlock = $insertion -join "`n"

$count = 0
$skipped = 0
Get-ChildItem $baseDir -Recurse -File -Filter '*.html' | ForEach-Object {
    $p = $_.FullName
    $c = Get-Content $p -Raw -Encoding UTF8
    if ($c -match 'nav-toggle-checkbox') {
        $skipped++
        Write-Output ('ALREADY: {0}' -f $p.Substring($baseDir.Length))
        return
    }
    $pattern = "(?s)(<header[^>]*>\s*<nav[^>]*>\s*<a[^>]*class=""logo""[^>]*>[^<]*</a>\s*)"
    $m = [regex]::Match($c, $pattern)
    if ($m.Success) {
        $new = $m.Groups[1].Value + "`n            <input type=""checkbox"" id=""nav-toggle"" class=""nav-toggle-checkbox"" aria-label=""Toggle navigation menu"">`n            <label for=""nav-toggle"" class=""nav-toggle-icon"" aria-hidden=""true"">&#9776;</label>`n"
        $c2 = $c.Substring(0, $m.Index) + $new + $c.Substring($m.Index + $m.Length)
        Set-Content -Path $p -Value $c2 -Encoding UTF8 -NoNewline
        $count++
        Write-Output ('PATCHED: {0}' -f $p.Substring($baseDir.Length))
    } else {
        $skipped++
        Write-Output ('NO-MATCH: {0}' -f $p.Substring($baseDir.Length))
    }
}
Write-Output ('')
Write-Output ('Patched={0} Skipped={1}' -f $count, $skipped)
