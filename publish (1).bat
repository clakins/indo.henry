@echo off
cd /d "%~dp0"
echo Scanning for new media files...
powershell -NoProfile -ExecutionPolicy Bypass -File generate-media.ps1
echo.
echo Publishing site changes...
git add .
git commit -m "Site update %date% %time%"
git push
echo.
echo Done. Press any key to close.
pause >nul
