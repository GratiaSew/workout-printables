# Double-click won't work well — run in PowerShell:
#   cd $HOME\workout-printables
#   .\PUSH-NOW.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/GratiaSew/workout-printables.git"

Set-Location $PSScriptRoot

Write-Host "== Step 1: stage all files ==" -ForegroundColor Cyan
git add -A

Write-Host "== Step 2: create a commit (ignored if 'nothing to commit') ==" -ForegroundColor Cyan
$ErrorActionPreference = "SilentlyContinue"
git commit -m "Initial commit: workout printable HTML trackers" 2>$null
$ErrorActionPreference = "Stop"

Write-Host "== Step 3: branch main ==" -ForegroundColor Cyan
git branch -M main

Write-Host "== Step 4: set remote origin ==" -ForegroundColor Cyan
$ErrorActionPreference = "SilentlyContinue"
git remote remove origin 2>$null
$ErrorActionPreference = "Stop"
git remote add origin $RepoUrl

Write-Host "== Step 5: push to GitHub (browser login may appear) ==" -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host "Done. If push failed, read the red error text and tell Cursor what it says." -ForegroundColor Green
