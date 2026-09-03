@echo off
setlocal

set "ROOT=%~dp0"

echo Starting backend and frontend...
echo.

start "ELI5 Backend" cmd /k "cd /d ""%ROOT%backend"" && npm run dev"
start "ELI5 Frontend" cmd /k "cd /d ""%ROOT%frontend"" && npm run dev"

echo Opening app in browser: http://localhost:5173
start "" "http://localhost:5173"

echo.
echo Done. Keep both terminal windows open while using the app.
endlocal
