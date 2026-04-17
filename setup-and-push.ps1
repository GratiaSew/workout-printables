<#!
  Run in PowerShell from this folder (workout-printables):

    cd path\to\workout-printables
    .\setup-and-push.ps1 -RepoUrl https://github.com/YOUR_USER/YOUR_NEW_REPO.git

  Prerequisites: Git installed, GitHub repo already created (empty is best),
  and credentials working (GitHub CLI `gh auth login`, HTTPS credential manager, or SSH).

  Create the empty repo first: GitHub → New repository → no README/license if you use this script as-is.
#>
param(
  [Parameter(Mandatory = $true)]
  [string]$RepoUrl
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git is not installed or not on PATH."
}

if (-not (Test-Path ".git")) {
  git init
  Write-Host "Initialized new git repository here: $PSScriptRoot"
}

git add -A

# Avoid `git rev-parse HEAD` here: on a brand-new repo Git writes to stderr and
# PowerShell treats that as a terminating error when $ErrorActionPreference is Stop.
$headsDir = Join-Path $PSScriptRoot ".git\refs\heads"
$hasCommit = (Test-Path $headsDir) -and ((Get-ChildItem -Path $headsDir -File -ErrorAction SilentlyContinue | Measure-Object).Count -gt 0)

$ErrorActionPreference = "SilentlyContinue"
git diff --cached --quiet 2>$null
$ErrorActionPreference = "Stop"
$nothingStaged = ($LASTEXITCODE -eq 0)

if (-not $hasCommit) {
  if ($nothingStaged) {
    Write-Error "Nothing to commit. Add your files to this folder and run again."
  }
  git commit -m "Initial commit: workout printable HTML trackers"
} else {
  if (-not $nothingStaged) {
    git commit -m "Update workout printables"
  } else {
    Write-Host "No new changes to commit."
  }
  git status -sb
}

git branch -M main

$ErrorActionPreference = "SilentlyContinue"
git remote remove origin 2>$null
$ErrorActionPreference = "Stop"
git remote add origin $RepoUrl

Write-Host ""
Write-Host "Remote 'origin' set to: $RepoUrl"
Write-Host "Pushing branch 'main'..."
git push -u origin main

Write-Host ""
Write-Host "Done. Refresh your GitHub repository page to confirm files."
