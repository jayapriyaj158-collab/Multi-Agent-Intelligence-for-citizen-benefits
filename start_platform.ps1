<#
.SYNOPSIS
  SIH 2026 Multi-Agent Citizen Benefits Platform PowerShell Launcher
#>
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "   SIH 2026: MULTI-AGENT INTELLIGENCE FOR CITIZEN BENEFITS" -ForegroundColor Yellow
Write-Host "======================================================================" -ForegroundColor Cyan

Set-Location -Path $PSScriptRoot

Write-Host "`n[1/4] Ensuring Database is Seeded..." -ForegroundColor Gray
python backend\seed.py

Write-Host "`n[2/4] Launching FastAPI Backend on Port 8001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python -m uvicorn app.main:app --host 127.0.0.1 --port 8001"

Write-Host "`n[3/4] Launching React Vite Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`n[4/4] Waiting 4 seconds for services to come online..." -ForegroundColor Gray
Start-Sleep -Seconds 4

Write-Host "`nLaunching web browser at http://localhost:5174/ ..." -ForegroundColor Cyan
Start-Process "http://localhost:5174/"

Write-Host "`n======================================================================" -ForegroundColor Cyan
Write-Host "  Platform is ONLINE!" -ForegroundColor Green
Write-Host "  - Frontend: http://localhost:5174/"
Write-Host "  - Backend:  http://127.0.0.1:8001/api/health"
Write-Host "  - API Docs: http://127.0.0.1:8001/api/docs"
Write-Host "======================================================================" -ForegroundColor Cyan
