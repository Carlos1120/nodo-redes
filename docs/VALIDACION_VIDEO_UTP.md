# Validación del video del taller UTP

Validación automatizada del 16 de octubre de 2026, sobre los medios del commit
`2a38fd2` reubicados en `public/videos/`. No constituye una revisión humana ni
acredita la ejecución académica de los laboratorios.

- `npm ci`: instalación desde el archivo de bloqueo, sin modificarlo.
- `npm test`: 13 pruebas aprobadas; 0 fallidas y 0 omitidas.
- `npm run build`: compilación de 68 módulos completada; `dist/` actualizado.
- `sha256sum -c SHA256SUMS.txt`: ambos medios coinciden con los hashes recibidos.
- `ffprobe`: MP4 H.264 y AAC, 1024 × 576, 30 fps, 142,198333 segundos.
- `ffmpeg -v error -i public/videos/ponchado-utp-rj45.mp4 -f null -`:
  decodificación completa de audio y video sin errores.
- La caja `moov` precede a `mdat`, conservando el inicio progresivo (faststart).
- Vite en desarrollo y vista previa de producción: MP4 y JPG devuelven HTTP 200,
  con sus tipos correctos y los mismos hashes. Las solicitudes parciales del MP4
  devuelven HTTP 206. `public/videos/` y `dist/videos/` contienen medios idénticos.

## Navegación y reproducción

Chromium 154, controlado con Playwright, sobre la compilación de producción:

- Escritorio: 1440 × 900.
- Móvil emulado con entrada táctil: 390 × 844; no es una prueba en teléfono físico
  ni en Safari/iOS.
- En ambos casos, el enlace de la portada del segundo corte y el de Medios llegan
  a `#/segundo-corte/laboratorios`, cargan el video y la miniatura correctamente.
- Reproducción desde el inicio hasta el evento `ended` a velocidad 1×, llegando
  a los 142,198333 segundos en ambos tamaños; sin errores del reproductor,
  excepciones JavaScript ni respuestas HTTP fallidas.
- Reproductor dentro del ancho disponible, sin desbordamiento horizontal,
  con controles nativos y `playsInline` activos.
- Cuatro guías presentes. `src/data/laboratories.js`, las pruebas existentes y
  las evidencias del primer corte no presentan diferencias frente a `develop`.

Las dos reproducciones completas simultáneas en modo headless registraron 1406 y
1468 fotogramas descartados de 4265 totales. Se repitió una muestra de 12 segundos
con una única reproducción por contexto, secuencialmente: escritorio 5/364 y móvil
0/363 descartados, sin errores. Esto limita cualquier conclusión sobre fluidez en
dispositivos reales; los medios se conservaron sin recodificación.

Resultados y capturas en `docs/qa/utp-video-*`. El estado del CI remoto y la
integración del PR deben comprobarse en GitHub por separado; estas comprobaciones
locales no los acreditan.
