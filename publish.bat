@echo off
cd /d "%~dp0"
echo Publishing site changes...
git add .
git commit -m "Site update %date% %time%"
git push
echo.
echo Done. Press any key to close.
pause >nul
