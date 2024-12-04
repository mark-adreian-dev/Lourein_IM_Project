@echo off


::Waiting for the server to connect to the database
timeout /t 1

:: Starting express server
start /B "" cmd /C "cd /d %cd%/backend && npm run dev"


::Waiting for the server to connect to the database
timeout /t 1

start /B "" cmd /C "cd /d %cd%/frontend && npm run dev"

::Launch webpage
start http://localhost:5173

