# Integración final del video UTP en NODO

El código de la interfaz **YA ESTÁ** en GitHub en la rama `feat/video-ponchado-utp` del repositorio privado `Carlos1120/nodo-redes`. El Pull Request correspondiente apunta a `develop` y debe permanecer en borrador hasta agregar los dos archivos multimedia.

## Instrucción para Codex

Trabaja sobre `Carlos1120/nodo-redes`, rama `feat/video-ponchado-utp`, que ya contiene `UtpVideoLab.jsx`, cambios de navegación y estilos. **No recrees el sitio ni sobrescribas `develop` o `main`.**

1. Verifica `git status` y sincroniza la rama remota. Si hay cambios locales, consérvalos o consulta antes de sobrescribirlos.
2. De este ZIP copia **solo** `public/videos/ponchado-utp-rj45.mp4` y `public/videos/ponchado-utp-rj45-poster.jpg` a esas rutas idénticas dentro del proyecto.
3. Verifica que `src/components/UtpVideoLab.jsx` apunte a los mismos nombres con `import.meta.env.BASE_URL`. Mantén la distinción «material audiovisual del taller» de «evidencia académica ejecutada».
4. Ejecuta `npm ci`, `npm test` y `npm run build` con resultados comprobados. Como el proyecto conserva `dist/` para el iniciador de Windows, verifica que `dist/videos/` contiene ambos recursos y agrega los assets de compilación actualizados que correspondan. No agregues `node_modules`.
5. Si hay navegador, abre `#/segundo-corte/laboratorios` y reproduce el video hasta el final; comprueba también el enlace desde la portada del segundo corte y `#/segundo-corte/medios`, en escritorio y móvil. Comprueba que los cuatro laboratorios originales siguen intactos.
6. Verifica que el video MP4 sea accesible desde `public/videos/` en desarrollo y desde `dist/videos/` en producción. No publiques enlaces 404.
7. Haz **un solo commit** con los dos recursos, el `dist/` generado y cualquier corrección necesaria. Mensaje sugerido: `feat: incorporar video y miniatura del taller UTP`. Push solamente a `feat/video-ponchado-utp`.
8. Comprueba el CI del PR; si pasa y la reproducción fue verificada, deja el PR listo para revisión o intégralo en `develop` conforme a la autorización vigente del usuario. **No cambies `main`**. No inventes una revisión humana.
9. Reporta URL del PR, rama/commit, estado del CI, reproducción y cualquier limitación pendiente.

## Datos comprobados del archivo

- Nombre: `ponchado-utp-rj45.mp4`
- Duración: ~2 minutos y 22 segundos (142,20 s)
- Formato: MP4, H.264 + AAC, 1024 x 576, 30 fps
- Peso: ~14 MB
- Video original preservado en contenido, remultiplexado a MP4 con `faststart` para iniciar la reproducción web antes de descargarlo completo.
- Miniatura: `ponchado-utp-rj45-poster.jpg`, fotograma del video durante la demostración con probador de cables.

No incluyas el ZIP como archivo del repositorio; incorpora sus dos medios en `public/videos/`.

Antes de hacer público el sitio web o distribuir el video más allá del ámbito académico, confirma que cuentan con autorización para difundir la grabación y las imágenes de las personas que aparecen.
