@echo off
setlocal
cd /d "%~dp0"
title NODO - Vista del proyecto

if not exist "dist\index.html" (
  echo.
  echo  No se encontro la version lista para visualizar.
  echo  Usa 2-INICIAR-DESARROLLO-WINDOWS.cmd para reconstruirla.
  echo.
  pause
  exit /b 1
)

echo.
echo  ==============================================
echo    NODO - REDES EN MOVIMIENTO
echo  ==============================================
echo.
echo  Abriendo el proyecto en tu navegador...
echo  No cierres esta ventana mientras lo visualizas.
echo  Para terminar, vuelve aqui y presiona Ctrl+C.
echo.

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\serve-dist.ps1"

if errorlevel 1 (
  echo.
  echo  No fue posible abrir el sitio automaticamente.
  echo  Consulta LEEME_PRIMERO.txt para ver otras opciones.
  echo.
  pause
)
