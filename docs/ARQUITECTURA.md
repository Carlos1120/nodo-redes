# Arquitectura y defensa de la implementación

## Flujo de la aplicación

`App.jsx` escucha `hashchange`, conserva las rutas del primer corte y delega `#/segundo-corte/<módulo>` a `SegundoCorte`. Los datos viven fuera de los componentes. `SecondTermModule` compone la interfaz con PageShell y los simuladores. React controla el estado; no hay backend, conexión con dispositivos reales ni persistencia de claves o respuestas.

La identidad original continúa: fondo oscuro, cian y verde, tipografía del sistema, SVG/CSS y componentes del primer corte. El estado se comunica también por texto, no solo color. Los controles son botones, selects y radios nativos. Las animaciones de paquetes respetan `prefers-reduced-motion`; las rutas siguen resaltadas cuando se desactiva el movimiento. El progreso automático de PDU cambia información, y puede pausarse o recorrerse manualmente.

## Aprendizaje del switch

`receiveFrame(table, frame, ports)` es una función pura de `src/lib/network.js`:

1. Valida origen unicast y pertenencia del puerto de entrada a la VLAN.
2. Copia la tabla y registra `(VLAN, MAC origen) → puerto de entrada`.
3. Consulta el destino en esa VLAN.
4. Para unicast conocido usa un puerto; si coincide con entrada, filtra. Para unicast desconocido difunde a los puertos elegibles de esa VLAN, excepto entrada. Broadcast siempre se difunde en ella.
5. Devuelve tabla, acción y puertos de salida. React representa exactamente ese resultado; no tiene una tabla visual preprogramada.

La clave con VLAN evita aprender ubicaciones de un dominio en otro. La interfaz usa una VLAN y cuatro PCs; las pruebas cubren también aislamiento entre dos VLAN. Multicast se modela sin IGMP snooping. No se modelan STP, caducidad automática ni pérdida de enlace. Al mover PC2 se actualiza la ubicación al recibir su siguiente trama; no por mover un icono.

Para exponer: enviar PC0→PC1 con tabla vacía aprende solo PC0 y produce flooding. Enviar PC1→PC0 aprende PC1 y usa una única salida. Repetir PC0→PC1 usa el puerto de PC1. Broadcast sigue saliendo por todos los otros puertos. Reiniciar vacía estado y devuelve conexiones iniciales.

`ArpDemo` es un ejemplo guiado independiente: solicitud broadcast, respuesta unicast y caché del host. ARP pregunta por IP; el switch conmuta usando MAC. No se hace pasar el ejemplo textual por una captura real.

## Constructor Ethernet

`frameSize(bytes, format)` separa la carga superior, LLC/SNAP y el relleno. Ethernet II tiene 14 bytes de encabezado y 4 de FCS. LLC/SNAP añade 8 bytes dentro de los datos; no fuera del MTU.

```text
datos = carga superior + (8 si LLC/SNAP, 0 si Ethernet II)
padding = máximo(0, 46 - datos)
trama MAC = 14 + datos + padding + 4
con preámbulo/SFD = trama MAC + 8
```

Con 28 bytes superiores: Ethernet II necesita 18 de relleno; LLC/SNAP necesita 10. Ambas tramas miden 64 bytes. El máximo superior es 1500 para Ethernet II y 1492 para este SNAP, produciendo 1518 bytes MAC. Se rechazan negativos, decimales, entradas vacías y excesos. El modelo es Ethernet sin etiqueta VLAN: no calcula jumbo ni 802.1Q. No se calcula CRC-32: el FCS figura como cuatro bytes reservados y su función se explica. Esta decisión evita mostrar una suma ficticia como CRC válido.

`MacInspector` normaliza formatos de 12 dígitos, separa seis octetos, convierte a binario/decimal e interpreta I/G y U/L. La extensión EUI-64 inserta FFFE e invierte U/L mediante XOR 0x02. No hace consultas de fabricantes ni asegura identidad permanente.

## Encapsulamiento

`encapsulationStages(protocol, receiving)` produce cinco niveles coherentes. En envío: datos → segmento TCP/datagrama UDP → paquete IP → trama Ethernet → bits. En recepción se recorre el orden inverso y cambia la explicación de cada operación. La trama del emisor se dirige al gateway; la del receptor viene de la interfaz del router en LAN30. Sin NAT, IP de extremos se conserva y TTL disminuye al enrutar.

El estado consiste en paso, ejecución automática, dirección del recorrido y protocolo. Un `useEffect` programa un paso y limpia el temporizador al pausar, cambiar de ejemplo o desmontar. Inicio reanuda, anterior/siguiente detienen el avance automático y reinicio vuelve al primer nivel. El ejemplo TCP es SMTP/25 y UDP es consulta DNS/53. Física interpreta señales: no retira un encabezado IP. No se representa handshake, cifrado o reensamblaje completo.

## Terminal y Wi-Fi

`runCommand` reconoce exclusivamente comandos previstos, sin shell, `eval`, procesos ni red. Devuelve salida, explicación y una copia de caché ARP. Las IP siguen TecnoAndina. Un destino local añade su propia MAC a la caché; uno remoto añade la del gateway. `tracert` al servidor muestra Router0 y el destino; el switch no cuenta como salto IP. IP desconocida produce un fallo explícitamente simulado. Reiniciar elimina historial y caché.

`checkWifi` compara AP y cliente: SSID, banda, seguridad y clave ficticia. Rechaza abierto/WEP, campos vacíos y desacuerdos. WPA2-Personal y WPA3-Personal se explican con sus diferencias (PSK/SAE). Es una comprobación educativa de asociación, no implementación criptográfica ni conexión real. La IP mostrada es una propuesta estática, no una concesión DHCP medida.

## Evaluación y laboratorios

`quizQuestions` contiene 7 preguntas conceptuales, 7 de aplicación y 6 de razonamiento; cada posición correcta aparece cinco veces. La UI mantiene selección provisional separada de respuestas confirmadas. Solo tras confirmar muestra solución y explicación, bloquea cambios y permite avanzar. `scoreQuiz` cuenta coincidencias y calcula porcentaje; se prueban 100%, 65%, 0% y respuestas pendientes. No hay doble puntuación por confirmar dos veces.

`secondTermLabs` almacena contexto, objetivo, equipos, topología, IP, pasos, comandos, interpretación, expectativas y pendientes. `LaboratoryGuide` presenta esos campos y admite imágenes verificadas o descargas `.pkt`. Los cuatro arrays de evidencia están vacíos de forma intencional. Se mantienen separadas las direcciones de la práctica MAC y TecnoAndina.

## Por qué esta solución

Se mantuvo el router hash y se ampliaron componentes existentes en vez de añadir otro framework. Las reglas puras permiten comprobar decisiones sin depender de animaciones o un navegador; `node:test` no añade dependencias. Las pruebas de UI comprueban que los controles conectan con esas reglas, y no sustituyen prácticas de Packet Tracer ni validación del docente.
