# NODO — Redes en movimiento

Sitio académico interactivo sobre Fundamentos de Redes, Cisco CCNA 1 y Cisco Packet Tracer.

**Estudiantes**
- Carlos Mario Peña
- Santiago Ortiz Ochoa

## Stack
- React
- Vite
- Tailwind CSS
- CSS/SVG para visualizaciones y animaciones

## Ejecutar
```bash
npm install
npm run dev
```

## Estructura
- `src/pages/` páginas principales
- `src/components/` componentes visuales e interactivos
- `src/data/content.js` contenido académico y laboratorios
- `public/evidence/` capturas reales de Packet Tracer

La arquitectura está preparada para agregar nuevos laboratorios y unidades durante el semestre.


## Colaboración y próximos avances

- Rama `main`: versión estable, conserva el primer corte.
- Rama `develop`: integración de avances verificados.
- Ramas `feat/*`: cambios por módulo, por ejemplo `feat/segundo-corte-mac`.
- Revisar los cambios mediante pull requests antes de integrar en `main`.

```bash
npm ci
npm run dev
npm run build
```

El directorio `dist/` se conserva en este repositorio porque los iniciadores incluidos
permiten abrir una copia compilada sin instalar Node.js. Tras modificar el código,
actualiza la compilación con `npm run build` antes de distribuir esa copia.

Los recursos de `public/evidence/` son capturas del proyecto original y se preservan
sin alteración. Los nuevos laboratorios requerirán sus propias evidencias verificables.
