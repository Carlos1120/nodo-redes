@echo off
setlocal
cd /d "%~dp0"
title NODO - Entorno de desarrollo

echo.
echo  ==============================================
echo    NODO - ENTORNO DE DESARROLLO
echo  ==============================================
echo.

where node.exe >nul 2>nul
if errorlevel 1 goto :missing_node

where npm.cmd >nul 2>nul
if errorlevel 1 goto :missing_node

for /f "delims=" %%v in ('node --version') do echo  Node.js detectado: %%v
for /f "delims=" %%v in ('npm.cmd --version') do echo  npm detectado: %%v
echo.

if not exist "node_modules\.package-lock.json" (
  echo  Preparando el proyecto por primera vez...
  echo  Esto puede tardar unos minutos.
  call npm.cmd ci
  if errorlevel 1 goto :install_error
) else (
  echo  Las dependencias ya estan preparadas.
)

echo.
echo  Iniciando el sitio y abriendo el navegador...
echo  No cierres esta ventana mientras trabajas.
echo.
call npm.cmd run dev -- --open
exit /b %errorlevel%

:missing_node
echo  Node.js no esta instalado o no aparece en el PATH.
echo.
echo  Instala la version LTS gratuita desde:
echo  https://nodejs.org/
echo.
echo  Despues de instalarla, cierra esta ventana y vuelve
echo  a abrir 2-INICIAR-DESARROLLO-WINDOWS.cmd.
echo.
start "" "https://nodejs.org/"
pause
exit /b 1

:install_error
echo.
echo  No se pudieron instalar las dependencias.
echo  Comprueba tu conexion a Internet e intentalo de nuevo.
echo.
pause
exit /b 1
