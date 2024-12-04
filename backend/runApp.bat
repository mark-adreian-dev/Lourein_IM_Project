@echo off

::installing dependencies
::start /B "" cmd /C "cd /d %cd% && npm install"

::Waiting for the server to connect to the database
timeout /t 1

:: Starting express server
start /B "" cmd /C "cd /d %cd% && npm run dev"


::Waiting for the server to connect to the database
timeout /t 1

::Launch webpage
start http://localhost:3000/

