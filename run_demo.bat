@echo off
title SIH 2026 - Multi-Agent Citizen Benefits Platform Launcher
color 0A

echo ======================================================================
echo    SIH 2026: MULTI-AGENT INTELLIGENCE FOR CITIZEN BENEFITS
echo ======================================================================
echo  [1/4] Checking environment...
cd /d "%~dp0"

echo  [2/4] Initializing Database & Seed Knowledge Base...
python backend\seed.py

echo  [3/4] Launching FastAPI Multi-Agent Engine (Port 8001)...
start "SIH 2026 - FastAPI Backend (Port 8001)" cmd /k "cd backend && python -m uvicorn app.main:app --host 127.0.0.1 --port 8001"

echo  [4/4] Launching React Vite Frontend...
start "SIH 2026 - Vite Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Waiting 4 seconds for servers to initialize...
timeout /t 4 /nobreak >nul

echo Opening browser to http://localhost:5174/ ...
start http://localhost:5174/

echo ======================================================================
echo  System is LIVE!
echo  Frontend: http://localhost:5174/
echo  Backend:  http://127.0.0.1:8001/api/health
echo  Docs:     http://127.0.0.1:8001/api/docs
echo ======================================================================
echo Press any key to close this launcher window (servers stay running)...
pause >nul
