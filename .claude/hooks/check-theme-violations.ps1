$ErrorActionPreference = 'SilentlyContinue'

$stdin = [Console]::In.ReadToEnd()
try { $payload = $stdin | ConvertFrom-Json } catch { exit 0 }

$filePath = $payload.tool_input.file_path
if (-not $filePath) { $filePath = $payload.tool_response.filePath }
if (-not $filePath) { exit 0 }
if ($filePath -notmatch '\.(ts|tsx)$') { exit 0 }
if ($filePath -match '[\\/]theme[\\/]') { exit 0 }
if (-not (Test-Path -LiteralPath $filePath)) { exit 0 }

$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
if (-not $content) { exit 0 }

$issues = @()

$hexMatches = [regex]::Matches($content, '#[0-9A-Fa-f]{3,8}\b')
if ($hexMatches.Count -gt 0) {
    $issues += "raw hex color literal (e.g. '$($hexMatches[0].Value)') - use a key from src/theme/colors.ts instead"
}

if ($content -match "['""](Fredoka|Nunito)[A-Za-z_0-9]*['""]") {
    $issues += "raw font-family string literal - use fontFamilies/typography from src/theme/typography.ts instead"
}

$miscSymbols = [char]0x2600 + '-' + [char]0x27BF
$miscSymbolsArrows = [char]0x2B00 + '-' + [char]0x2BFF
$arrows = [char]0x2190 + '-' + [char]0x21FF
$emojiPattern = New-Object System.Text.RegularExpressions.Regex(
    '[\uD800-\uDBFF][\uDC00-\uDFFF]|[' + $miscSymbols + $miscSymbolsArrows + $arrows + ']'
)
if ($emojiPattern.IsMatch($content)) {
    $issues += "emoji character - Park Pal never uses emojis; use an illustrated asset from src/assets/ or the svg-creator agent instead"
}

if ($issues.Count -eq 0) { exit 0 }

$reason = "Design-token violation(s) in ${filePath}: " + ($issues -join '; ') + ". Fix before finishing this task (see CLAUDE.md)."
$result = @{ decision = 'block'; reason = $reason } | ConvertTo-Json -Compress
Write-Output $result
exit 0
