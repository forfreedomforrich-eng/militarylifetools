$baseDir = 'C:\Users\kusan\Desktop\工具站项目\militarylifetools'

function Build-Nav($activeKey) {
    $items = @(
        @{href='/';                       label='ETS';       key='ets'},
        @{href='/time-converter/';        label='Time';      key='time'},
        @{href='/uniform-size/';          label='Uniform';   key='uniform'},
        @{href='/bah-calculator/';        label='BAH';       key='bah'},
        @{href='/pay-calculator/';        label='Pay';       key='pay'},
        @{href='/va-disability-calculator/'; label='VA';     key='va'},
        @{href='/retirement-calculator/'; label='Retire';     key='retire'},
        @{href='/gi-bill-calculator/';    label='GI Bill';    key='gi'},
        @{href='/tsp-withdrawal-calculator/'; label='TSP';   key='tsp'},
        @{href='/blog';                   label='Blog';       key='blog'}
    )
    $lis = ''
    foreach ($it in $items) {
        $cls = ''
        if ($it.key -eq $activeKey) { $cls = ' class="active"' }
        $lis += '                <li><a href="' + $it.href + '"' + $cls + '>' + $it.label + '</a>' + [Environment]::NewLine
    }
    return $lis.TrimEnd([Environment]::NewLine)
}

function Get-ActiveKey($relPath) {
    switch -Wildcard ($relPath) {
        '\index.html'           { return 'ets' }
        '\bah-calculator\*'     { return 'bah' }
        '\pay-calculator\*'     { return 'pay' }
        '\time-converter\*'     { return 'time' }
        '\uniform-size\*'       { return 'uniform' }
        '\va-disability-calculator\*' { return 'va' }
        '\retirement-calculator\*' { return 'retire' }
        '\gi-bill-calculator\*' { return 'gi' }
        '\tsp-withdrawal-calculator\*' { return 'tsp' }
        '\blog\*'               { return 'blog' }
        '\contact\*'            { return 'blog' }
        '\privacy-policy\*'     { return 'blog' }
        '\404.html'             { return '' }
        default                 { return 'blog' }
    }
}

$count = 0
Get-ChildItem $baseDir -Recurse -File -Filter '*.html' | Where-Object { $_.FullName -notlike '*.git*' } | ForEach-Object {
    $fullPath = $_.FullName
    $relPath = $fullPath.Substring($baseDir.Length)
    $activeKey = Get-ActiveKey $relPath
    $content = Get-Content $fullPath -Raw -Encoding UTF8

    $pattern = '<header[^>]*>[\s\S]*?</header>'
    $headerMatch = [regex]::Match($content, $pattern)
    if ($headerMatch.Success) {
        $header = $headerMatch.Value
        $newNavLis = Build-Nav $activeKey
        $newUlBlock = '            <ul class="nav-links">' + [Environment]::NewLine + $newNavLis + [Environment]::NewLine + '            </ul>'
        $ulPattern = '<ul[^>]*>[\s\S]*?</ul>'
        $newHeader = [regex]::Replace($header, $ulPattern, $newUlBlock)
        $newContent = $content.Replace($header, $newHeader)
        Set-Content $fullPath -Value $newContent -Encoding UTF8 -NoNewline
        $count++
        Write-Output ('FIXED: {0}' -f $relPath)
    } else {
        Write-Output ('SKIP:  {0}' -f $relPath)
    }
}
Write-Output ('')
Write-Output ('Total: {0} files fixed' -f $count)
