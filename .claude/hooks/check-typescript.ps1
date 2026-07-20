$ErrorActionPreference = 'SilentlyContinue'

$output = & npx tsc --noEmit 2>&1 | Out-String
$exitCode = $LASTEXITCODE

if ($exitCode -eq 0) { exit 0 }

$trimmed = $output.Trim()
if ($trimmed.Length -gt 4000) {
    $trimmed = $trimmed.Substring(0, 4000) + "`n...(truncated)"
}

$reason = "npx tsc --noEmit is failing. Per CLAUDE.md, fix all type errors before declaring the task done:`n`n$trimmed"
$result = @{ decision = 'block'; reason = $reason } | ConvertTo-Json -Compress
Write-Output $result
exit 0
