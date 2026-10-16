#!/bin/sh
cd "$(dirname "$0")" || exit 1

echo ""
echo "=============================================="
echo "  NODO - REDES EN MOVIMIENTO"
echo "=============================================="
echo ""

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "Node.js no esta instalado. Instala la version LTS gratuita desde:"
  echo "https://nodejs.org/"
  echo ""
  exit 1
fi

if [ ! -f "node_modules/.package-lock.json" ]; then
  echo "Preparando el proyecto por primera vez..."
  npm ci || exit 1
fi

echo "Iniciando el sitio. Mantén esta ventana abierta."
npm run dev -- --open
