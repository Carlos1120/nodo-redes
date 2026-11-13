# NODO — Redes en movimiento

Plataforma educativa de Redes de Computadores, Cisco CCNA y Packet Tracer para el proyecto académico de la Universidad Santo Tomás. Integrantes: Carlos Mario Peña y Santiago Ortiz Ochoa.

Repositorio privado: [Carlos1120/nodo-redes](https://github.com/Carlos1120/nodo-redes).

## Instalación y ejecución

Recomendado: Node.js 22 LTS (22.12 o posterior), npm y Git. El lockfile fija las versiones instaladas. Se mantienen React 19, Vite 7 y Tailwind CSS 3; no se incorporó un framework adicional de interfaz.

```sh
git clone https://github.com/Carlos1120/nodo-redes.git
cd nodo-redes
git switch feat/segundo-corte
npm ci
npm run dev
```

Abrir la URL que indique Vite. En Windows, usar `npm.cmd` si PowerShell bloquea `npm.ps1`. Cerrar servidores propios antes de repetir `npm ci`: esbuild puede quedar bloqueado por un proceso en ejecución.

```sh
npm test
npm run build
npm run preview
```

Sin instalar Node.js en Windows, ejecutar `1-ABRIR-SITIO-WINDOWS.cmd`: sirve `dist/` en loopback, puerto 4173 o el siguiente libre hasta 4199. `2-INICIAR-DESARROLLO-WINDOWS.cmd` y `INICIAR-MAC-LINUX.sh` preparan y abren Vite. Detener con Ctrl+C. No abrir `dist/index.html` directamente con `file://`.

## Recorrido

Primer corte conservado: Inicio, Fundamentos, Arquitectura, Infraestructura, Packet Tracer y Evidencias. Los componentes compartidos de switch, encapsulamiento y terminal amplían sus capacidades también en estas páginas.

Entrada del segundo corte: `#/segundo-corte`. Los enlaces internos usan el mismo router hash y admiten recarga directa.

| Módulo | Ruta final | Interacción |
| --- | --- | --- |
| Ethernet y LAN | `/ethernet` | Dispositivos consultables, tráfico local y remoto animado |
| Direcciones MAC | `/mac` | Switch con cuatro PC, tabla dinámica, cambio de puerto, inspector hex/bin/decimal y ejemplo ARP |
| Trama y LLC/MAC | `/trama` | Selección de campos, destinos y formato; cálculo de tamaños/padding |
| Encapsulamiento y PDU | `/pdu` | TCP/UDP, envío/recepción, inicio, pausa, pasos y reinicio |
| Fibra, Wi-Fi y CLI | `/medios` | Comparación de medios, AP/cliente y terminal con caché ARP |
| Laboratorios | `/laboratorios` | Cuatro guías con topología, IP, pasos, comandos y pendientes |
| Seguridad y evaluación | `/seguridad` | Controles físicos/lógicos y quiz de veinte preguntas |

La columna ruta se agrega a `#/segundo-corte`. La navegación normal permanece; no hay modo de presentación independiente.

## Estructura y mantenimiento

| Ubicación | Función |
| --- | --- |
| `src/App.jsx` | Navegación hash principal y subrutas |
| `src/pages/SegundoCorte.jsx` | Portada, navegación de módulos y objetivo |
| `src/components/SecondTermModule.jsx` | Composición de cada módulo |
| `src/data/content.js` | Contenido original del primer corte |
| `src/data/secondTerm.js` | Currículo, campos Ethernet y fuentes |
| `src/data/laboratories.js` | Guías y listas de evidencias |
| `src/data/quiz.js` | Veinte preguntas, opciones, solución y explicación |
| `src/lib/network.js` | Modelos puros y deterministas de los simuladores |
| `src/styles.css`, `src/second-term.css` | Identidad original y extensión responsive |
| `tests/` | Pruebas de reglas, límites, contenido y puntuación |
| `public/evidence/` | Capturas académicas originales preservadas |
| `docs/qa/` | Capturas de comprobación de la web; no evidencias de Packet Tracer |
| `dist/` | Copia compilada para distribución y los iniciadores |

Para añadir cortes posteriores: definir datos y módulos, registrar una ruta en `App.jsx` y reutilizar PageShell/componentes. Evitar añadir otro sistema de navegación. Para añadir una pregunta, mantener cuatro opciones y verificar las pruebas de cobertura. Para añadir evidencia verificada, completar `evidence` del laboratorio con `kind: 'image'` y los metadatos de EvidenceGallery, o `kind: 'pkt'`, `src` y `title` para un archivo Packet Tracer. Añadir antes el archivo real a `public/evidence/` y comprobar su correspondencia; una guía por sí sola no acredita ejecución.

Actualizar `dist/` con `npm run build` al distribuir. Su duplicación de imágenes es deliberada. Los archivos `preview.*` originales se conservan como referencia; el punto de entrada recomendado es la aplicación compilada o Vite.

## Pruebas y límites

`npm test` usa `node:test`, incluido en Node, porque las reglas esenciales no necesitan DOM ni dependencias nuevas. CI ejecuta instalación reproducible, build y pruebas en Node 22. La revisión visible se documenta en [VALIDACION.md](docs/VALIDACION.md); no equivale a una auditoría completa de accesibilidad.

No se ejecutan comandos reales desde la terminal web ni se guardan claves Wi-Fi. El FCS se representa por su tamaño sin inventar un CRC. Los tiempos y respuestas son ilustrativos. El switch no simula envejecimiento automático ni STP. El quiz es autoevaluación y no una calificación oficial.

Auditoría de dependencias del 16 de octubre de 2026: cero vulnerabilidades reportadas en producción con `npm audit --omit=dev`. Permanecen siete alertas en herramientas de desarrollo (cinco altas y dos moderadas) por dependencias transitivas de Tailwind 3; resolverlas requiere evaluar una migración o un parche compatible. No se ejecutó `audit fix --force`. Consultar detalles y mitigación en [VALIDACION.md](docs/VALIDACION.md).

## Ramas y entrega

- `main`: base estable del primer corte (`e11c3db`).
- `develop`: destino de integración mediante PR.
- `feat/segundo-corte`: módulos, simuladores, guías, pruebas y documentación agrupados en commits funcionales.

Se eligió una rama funcional para mantener juntos los componentes compartidos y sus pruebas. El segundo corte queda en PR borrador mientras falte revisión humana y validación académica. No se publica en `main` sin autorización de integración.

## Documentación y siguiente acción

- [Arquitectura y explicación de simuladores](docs/ARQUITECTURA.md).
- [Análisis del material y correcciones técnicas](docs/MATERIAL_ACADEMICO.md).
- [Validación, pendientes y traspaso](docs/VALIDACION.md).

Las cuatro prácticas del segundo corte necesitan capturas y archivos `.pkt` propios. Para un tercer corte, acordar primero temas y criterios con el docente; después ampliar el registro de módulos y aportar evidencia académica real. No se han supuesto temas ni actividades del siguiente periodo.
