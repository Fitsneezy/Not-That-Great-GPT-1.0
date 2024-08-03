@echo off
setlocal

REM Define variables
set "API_URL=http://localhost:3000/update-definition"
set "FILE_PATH=definitions.json"

REM Upload data
curl -X POST %API_URL% -H "Content-Type: application/json" --data-binary "@%FILE_PATH%"

REM Check the exit code of curl
if errorlevel 1 (
    echo Failed to upload data
) else (
    echo Data uploaded successfully
)

endlocal
