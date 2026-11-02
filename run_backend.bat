@echo off
echo Starting Citizen Benefit Intelligence Backend on port 8001...
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
pause
