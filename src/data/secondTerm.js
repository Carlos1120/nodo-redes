export const modules = [
  { id: 'ethernet', title: 'Ethernet y LAN', tag: 'CONECTAR', description: 'Sigue el tráfico local y el recorrido hacia otra red.', objective: 'Distinguir conmutación de enrutamiento.' },
  { id: 'mac', title: 'Direcciones MAC', tag: 'APRENDER', description: 'Genera tramas y observa cómo aprende un switch.', objective: 'Explicar aprendizaje, flooding y ARP.' },
  { id: 'trama', title: 'Trama Ethernet y LLC/MAC', tag: 'CONSTRUIR', description: 'Explora campos, tamaños y formatos de una trama.', objective: 'Interpretar Ethernet II y LLC/SNAP.' },
  { id: 'pdu', title: 'Encapsulamiento y PDU', tag: 'SEGUIR', description: 'Agrega y retira encabezados entre dos equipos.', objective: 'Relacionar capas, PDU y direcciones.' },
  { id: 'medios', title: 'Fibra óptica, Wi-Fi y CLI', tag: 'DIAGNOSTICAR', description: 'Compara medios, configura un AP y prueba comandos.', objective: 'Elegir medios y diagnosticar una red.' },
  { id: 'laboratorios', title: 'Laboratorios Packet Tracer', tag: 'PRACTICAR', description: 'Cuatro guías con pasos, comandos y evidencias pendientes.', objective: 'Construir y documentar prácticas propias.' },
  { id: 'seguridad', title: 'Seguridad y evaluación', tag: 'COMPROBAR', description: 'Aplica controles y resuelve veinte preguntas razonadas.', objective: 'Justificar medidas de seguridad y evaluar comprensión.' },
]

export const ethernetFacts = [
  ['LAN y Ethernet', 'Una LAN conecta equipos en un área local bajo una administración. Ethernet es la familia IEEE 802.3 de tecnologías de enlace y física para LAN cableadas; una LAN también puede incluir Wi-Fi (802.11).'],
  ['NIC, switch y router', 'La NIC conecta al host con el medio. El switch aprende MAC y conmuta tramas en una VLAN. El router consulta IP y conecta subredes. Un servidor presta servicios; no decide por sí solo el camino de la red.'],
  ['De medio compartido a conmutado', 'El bus coaxial y los hubs comparten el medio y el dominio de colisión. La estrella con switch utiliza enlaces punto a punto; las VLAN delimitan dominios de broadcast. Un hub repite señales, no consulta una tabla MAC.'],
  ['Duplex y CSMA/CD', 'Half-duplex alterna transmisión y recepción. Ethernet compartida utiliza detección de colisiones y espera aleatoria (CSMA/CD). Full-duplex transmite y recibe simultáneamente y no utiliza CSMA/CD; un enlace full-duplex correcto no tiene colisiones.'],
]
export const ethernetHistory = [['1973', 'Ethernet experimental en Xerox PARC'], ['1983', 'IEEE 802.3: Ethernet de 10 Mb/s'], ['1990', '10BASE-T: par trenzado y estrella'], ['1995 / 1999', '100BASE-TX / 1000BASE-T'], ['2006 en adelante', '10GBASE-T en cobre; otras variantes ópticas para mayores velocidades']]

export const frameFields = [
  ['Preámbulo', '7 B', 'Sincroniza la recepción antes de la trama MAC.', 'Patrón alterno; octeto 0x55 en notación habitual.'],
  ['SFD', '1 B', 'Marca el inicio de la trama tras la sincronización.', '0xD5; bits transmitidos LSB primero: 10101011.'],
  ['MAC destino', '6 B', 'Selecciona receptor, grupo o todos en la VLAN.', '02:00:00:00:00:02; se usa para reenviar.'],
  ['MAC origen', '6 B', 'Identifica al emisor del salto local y permite aprender su puerto.', '02:00:00:00:00:01; debe ser individual.'],
  ['Tipo/Longitud', '2 B', 'Ethernet II identifica protocolo; 802.3 indica longitud.', '0x0800 IPv4, 0x0806 ARP; ≤1500 longitud, ≥1536 EtherType.'],
  ['Datos', '46–1500 B con relleno', 'Transporta el paquete superior; incluye LLC/SNAP si se selecciona ese formato.', 'Paquete IPv4, encabezados LLC/SNAP y padding cuando hace falta.'],
  ['FCS', '4 B', 'CRC-32 detecta alteraciones accidentales desde MAC destino hasta datos y padding.', 'Reservado en el constructor: no se calcula un CRC ficticio. No es cifrado ni autenticación.'],
]

export const media = [
  { name: 'UTP', type: 'Cobre · señal eléctrica', reach: '100 m de canal en 1000BASE-T con Cat 5e/6 adecuado.', use: 'Acceso a puestos; económico y compatible con PoE.', detail: 'Conector 8P8C, llamado RJ-45; sensible a EMI según entorno y blindaje.' },
  { name: 'Multimodo', type: 'Fibra · varios modos de luz', reach: 'Ejemplo 1000BASE-SX: 220–550 m según fibra y ancho de banda modal.', use: 'Backbone dentro de edificios o distancias moderadas.', detail: 'Láser VCSEL en muchos enlaces modernos; conectores LC o SC según equipo.' },
  { name: 'Monomodo', type: 'Fibra · un modo de propagación', reach: 'Ejemplo Cisco 1000BASE-LX/LH: hasta 10 km en fibra compatible.', use: 'Enlaces entre edificios y largas distancias.', detail: 'Láser; SFP compatible en ambos extremos. La distancia depende de óptica, fibra y presupuesto de pérdidas.' },
]
export const securityFacts = [
  ['Seguridad física', 'Cerradura, registro de acceso, racks cerrados, orden del cableado, UPS y control de temperatura protegen equipos y disponibilidad.'],
  ['Acceso y contraseñas', 'Cuentas individuales, mínimo privilegio, MFA donde esté disponible y frases largas únicas. Sustituye credenciales de ejemplo antes de usar equipos reales.'],
  ['VLAN, ACL y firewall', 'Las VLAN separan dominios de broadcast, pero no cifran. ACL y firewall aplican políticas entre redes; denegar invitados hacia administración debe probarse expresamente.'],
  ['Wi-Fi y comunicaciones', 'WEP está obsoleto. Emplea WPA2 con AES o WPA3 según compatibilidad, y HTTPS/VPN para datos en tránsito. Ocultar SSID o filtrar MAC no reemplaza autenticación.'],
  ['Respaldo y mantenimiento', 'Guarda configuraciones con acceso restringido, prueba su restauración y aplica firmware soportado. Monitorea eventos y prepara respuesta a incidentes.'],
  ['Riesgos y defensa', 'Phishing, malware, suplantación MAC/IP, MITM y DoS requieren controles complementarios. Una MAC no demuestra identidad ni una VLAN garantiza seguridad por sí sola.'],
]

export const technicalSources = [
  ['Cisco · conmutación LAN', 'https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/12006-chapter22.html'],
  ['Cisco · formato Ethernet', 'https://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1904.html'],
  ['RFC 826 · ARP', 'https://www.rfc-editor.org/info/rfc826/'],
  ['RFC 4291 · EUI-64 modificado', 'https://www.rfc-editor.org/info/rfc4291/'],
  ['Cisco · distancias de módulos SFP', 'https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/gigabit-ethernet-gbic-sfp-modules/datasheet-c78-366584.html'],
]
