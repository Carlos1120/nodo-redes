# Validación y traspaso — segundo corte

Fecha: 16 de octubre de 2026 (America/Bogota). **Comprobación ejecutada mediante herramientas automatizadas; validación humana pendiente**. No se atribuyen estas comprobaciones a los estudiantes ni se consideran evidencia académica de Packet Tracer.

## Estado de la entrega

- Repositorio: https://github.com/Carlos1120/nodo-redes, privado, cuenta autenticada Carlos1120.
- `main`: primer corte publicado en `e11c3db`, sin integrar el segundo corte.
- `develop`: base para integración.
- `feat/segundo-corte`: implementación completa de los siete módulos; revisión e integración pendientes mediante PR borrador hacia `develop`.
- Copia compilada `dist/` actualizada y conservada. La versión se identifica por el SHA del PR y los nombres hash de assets en `dist/index.html`.
- Originales en `public/evidence/` preservados; no se añadieron resultados académicos ficticios.

## Entorno y comandos

Windows, PowerShell, Node v24.19.0 y npm 11.17.0 para la comprobación local. CI usa Node 22. Dependencias resueltas: React/React DOM 19.2.8, Vite 7.3.6, Tailwind 3.4.19, plugin React 4.7.0, PostCSS 8.5.27 y Autoprefixer 10.5.4.

| Comprobación | Resultado |
| --- | --- |
| `npm ci` inicial | Aprobada; 130 paquetes |
| `npm run build` inicial | Aprobada; base del ZIP compilable |
| `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort` | Vite arrancó; navegador recorrió la base |
| `npm ci` final | Aprobada tras cerrar Vite; primer intento encontró esbuild bloqueado (EPERM) |
| `npm run build` final | Aprobada; 67 módulos, JS aproximado 310 kB sin comprimir |
| `npm test` | 13 pruebas aprobadas; cero fallos |
| `npm audit --omit=dev` | Cero vulnerabilidades reportadas |
| `git diff --check` | Sin errores de whitespace |
| Búsqueda de formatos de tokens, claves privadas y rutas absolutas de usuario | Sin coincidencias en los archivos que se publican |
| Iniciador de distribución | `powershell.exe -NoProfile -ExecutionPolicy Bypass -File tools/serve-dist.ps1 -NoOpen`, servidor operativo en 127.0.0.1:4173 |

Se detuvo el servidor Vite propio al reinstalar. La previsualización compilada se dejó disponible para la entrega; si ya no está en ejecución, usar `1-ABRIR-SITIO-WINDOWS.cmd`. Detener su ventana con Ctrl+C.

## Cobertura de lógica

Las pruebas `node:test` verifican aprendizaje exclusivo de MAC origen; flooding sin puerto de entrada; reenvío conocido; broadcast aun con tabla conocida; filtrado en el mismo puerto; cambio de Fa0/3 a Fa0/10; aislamiento VLAN; multicast sin snooping; normalización/conversión de MAC y EUI-64; tamaños mínimo/máximo/padding Ethernet II y SNAP; entradas inválidas; orden de PDU en ambos sentidos y TCP/UDP; comandos válidos/erróneos; ARP local y gateway remoto; trazas de destino desconocido; asociación Wi-Fi y discrepancias; puntuación con respuestas completas, parciales y vacías; estructura de veinte preguntas y cuatro laboratorios sin evidencia falsa.

El framework elegido es el incluido en Node: no se añadió dependencia de pruebas ni se migró la arquitectura del proyecto.

## Comprobación visible de la web

Se usó el navegador integrado con la aplicación de desarrollo y después con la copia compilada servida por el script Windows. Tras reconstruir se recargó el documento y se verificó el asset de producción; cambiar solo el hash no carga un bundle nuevo. Los avisos HMR producidos durante la sustitución de componentes no se reproducen en la copia compilada: no se observaron errores ni advertencias en su consola durante el recorrido final.

| Flujo | Resultado observado |
| --- | --- |
| Switch, tabla inicialmente vacía | PC0→PC1 aprende PC0 y difunde por Fa0/2, Fa0/3, Fa0/4 |
| Destino conocido | PC1→PC0 aprende PC1 y sale solo por Fa0/1 |
| Broadcast | Sale por los otros tres puertos, sin convertir broadcast en una entrada de origen |
| Cambio de puerto y reset | PC2 aprende Fa0/10 al transmitir; reiniciar vacía tabla y devuelve posiciones |
| Constructor | 28 B: 18 B padding en II, 10 en SNAP; 1492 B SNAP produce trama de 1518 B; 1493 genera error |
| FCS | Campo informa que no se calcula un CRC en la demostración |
| PDU | Pasos TCP/UDP, cambio a recepción, inicio, pausa y reinicio operativos |
| Wi-Fi | Clave vacía rechazada; AP/cliente coincidentes asociados en el modelo |
| Terminal | Ping remoto con respuestas simuladas; `arp -a` muestra gateway local, sin MAC del servidor remoto |
| Quiz | Confirmar deshabilitado sin selección; solución oculta antes de contestar; recorrido completo 20/20 y 100%; reset borra respuestas |
| Primer corte | Navegación, selección de capa OSI, simulación/pausa en topología Malla y galería de evidencias operativas |
| Enlaces de práctica | Acceso a `labs/lab-02` y resaltado de evidencia de LAB02 desde la misma página |
| Teclado | Menú móvil abierto, activación con Enter y cierre al navegar; galería enfoca cerrar, mantiene Tab/Shift+Tab dentro, cierra con Escape y devuelve foco a la captura incluso tras cambiar de imagen |

## Responsive y evidencia visual

Se recorrieron 14 rutas en **360, 768 y 1440 px**: 42 combinaciones sin desbordamiento horizontal de documento ni imágenes rotas detectadas. Registro: [qa/responsive.json](qa/responsive.json). Las tablas anchas tienen desplazamiento interno deliberado.

La inspección visual incluyó portada móvil y escritorio, simulador MAC móvil/escritorio y constructor de tramas en tablet. Se corrigieron desbordamientos del diagrama router/broadcast y de los nombres largos de documentos de laboratorio. Se añadieron etiquetas legibles de las cuatro MAC en móvil.

Capturas de UI, separadas de evidencia académica:

- [Portada 360 px](qa/portada-360.jpg).
- [Portada 1440 px](qa/portada-1440.jpg).
- [Switch 1440 px](qa/mac-1440.jpg).
- [Trama 768 px](qa/trama-768.jpg).

Los estilos desactivan animaciones CSS con movimiento reducido y ocultan el paquete SMIL del hero original; los nuevos diagramas consultan la preferencia para mostrar posiciones estáticas. No se forzó la preferencia del sistema del usuario. Pendiente revisión humana del movimiento reducido, lector de pantalla y contraste completo; no se declara certificación WCAG ni cobertura de todos los navegadores.

## Dependencias y seguridad pendiente

La auditoría inicial reportó ocho alertas. `npm audit fix` actualizó `source-map-js` de forma compatible y redujo el total a siete (cinco altas, dos moderadas), todas en herramientas de desarrollo relacionadas con Tailwind 3. No se aplicó `--force`, que proponía Tailwind 4 y una migración fuera del alcance.

- [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): braces y dependientes, agotamiento de pila con patrones anidados; no se encontró versión 3.0.4 publicada al comprobar el registro.
- [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf): complejidad en análisis de selectores PostCSS y dependientes.

Usar entradas confiables en las herramientas de compilación y mantener el servidor local en loopback. Evaluar migración compatible o actualización de Tailwind en un cambio separado, con regresión visual. Cero alertas en producción no certifica ausencia de vulnerabilidades.

Se ajustó el límite de ruta de `serve-dist.ps1` para exigir el separador después de `dist`, evitando confundir un directorio hermano con su contenido. No se publicaron `.env`, `node_modules`, `.cache`, credenciales ni documentos originales de Descargas. Los archivos de distribución e imágenes repetidas de `dist/` se conservaron por su función explícita.

## Pendientes y siguiente acción

1. Revisión humana del PR y de los siete módulos con los integrantes; no hubo aprobación de otro revisor.
2. Ejecutar las cuatro guías en Packet Tracer y aportar sus `.pkt`, capturas, registros IP/MAC/CLI y análisis propios. El taller PDU admite captura opcional según disponibilidad.
3. Validar módulos/puertos y WPA3 en la versión de Packet Tracer utilizada; aportar la rúbrica independiente del taller PDU si se quiere aplicar.
4. Resolver las alertas de desarrollo en un cambio de dependencias específico.
5. Integrar en `develop` tras la revisión; conservar `main` estable y solicitar autorización antes de publicar allí el segundo corte.
6. Para el tercer corte, acordar material y objetivos con el docente; reutilizar módulos y el registro de evidencias. No se inventaron requisitos del siguiente periodo.
