export const evolution = [
  { year: '1969', title: 'ARPANET', text: 'Una de las primeras redes de gran escala. Introdujo la idea de conectar computadores distantes y trabajar con información dividida en paquetes.' },
  { year: '1983', title: 'TCP/IP', text: 'Se consolida el conjunto de reglas que permite que redes diferentes se comuniquen entre sí. IP indica hacia dónde va la información y TCP ayuda a que llegue correctamente.' },
  { year: '1980s', title: 'Ethernet', text: 'Se vuelve fundamental para conectar equipos dentro de redes locales mediante cableado y direcciones MAC.' },
  { year: '1989–91', title: 'World Wide Web', text: 'La Web hace que Internet sea mucho más accesible mediante páginas, enlaces, direcciones web y HTTP.' },
  { year: 'Hoy', title: '5G · IoT · Nube', text: 'Más velocidad, millones de dispositivos conectados y servicios ejecutándose en centros de datos accesibles desde cualquier lugar.' },
]

export const scopes = [
  ['PAN', 'Personal', 'Alrededor de una persona: celular + reloj + audífonos.'],
  ['LAN', 'Local', 'Casa, laboratorio, oficina o edificio.'],
  ['WLAN', 'Local inalámbrica', 'Una LAN que utiliza Wi‑Fi.'],
  ['MAN', 'Metropolitana', 'Puede conectar varias sedes dentro de una ciudad.'],
  ['WAN', 'Extensa', 'Conecta redes a grandes distancias. Internet es el ejemplo más grande.'],
]

export const devices = [
  { name: 'Host', detail: 'Es el origen o destino de la información: PC, laptop, teléfono, impresora o dispositivo IoT.', tags: ['Origen / destino','IP','Aplicaciones'], practice: 'lab-02', practiceLabel: 'Ver configuración estática' },
  { name: 'Servidor', detail: 'Presta servicios a otros equipos y responde solicitudes dentro o fuera de la red local.', tags: ['DNS','DHCP','Web','Archivos'], practice: 'lab-03', practiceLabel: 'Ver DHCP en práctica' },
  { name: 'Switch', detail: 'Conecta dispositivos dentro de una LAN y aprende en qué puerto se encuentra cada dirección MAC.', tags: ['Capa 2','MAC','LAN'], practice: 'lab-01', practiceLabel: 'Verlo en LAB 01' },
  { name: 'Router', detail: 'Conecta redes diferentes, examina direcciones IP y selecciona el siguiente camino.', tags: ['Capa 3','IP','Conecta redes'], practice: 'lab-03', practiceLabel: 'Ver router en práctica' },
  { name: 'Access Point', detail: 'Permite que dispositivos inalámbricos entren a la LAN mediante ondas de radio.', tags: ['Wi-Fi','802.11','WLAN'], practice: 'lab-03', practiceLabel: 'Ver laboratorio Wi-Fi' },
  { name: 'Nube', detail: 'Representa redes y servicios externos cuya infraestructura no necesitamos detallar en el diagrama.', tags: ['Internet','Servicios','WAN'] },
]

export const labs = [
  {
    id: 'LAB 01',
    title: 'Primera LAN — 2 PCs + Switch',
    kicker: 'Del concepto al primer ping',
    image: '/evidence/lab01-topologia.png',
    facts: ['PC0: 192.168.1.10/24', 'PC1: 192.168.1.20/24', 'Switch Cisco 2960', 'Copper Straight‑Through', 'Ping exitoso'],
    story: 'Construimos una red local sencilla, asignamos IPv4 estáticas y verificamos conectividad con ping. Después observamos el movimiento del paquete en Simulation Mode.'
  },
  {
    id: 'LAB 02',
    title: 'LAN en estrella — 5 equipos',
    kicker: 'Direccionamiento y pruebas cruzadas',
    image: '/evidence/lab02-topologia-5pcs.jpeg',
    facts: ['192.168.10.10 → .50', 'Máscara 255.255.255.0', 'Fa0/1 → Fa0/5', '0% pérdida', 'Topología estrella'],
    story: 'Implementamos cinco estaciones conectadas a un único switch. Cada host recibió una IP única y se comprobó comunicación cruzada entre todos.'
  },
  {
    id: 'LAB 03',
    title: 'Cable + Wi‑Fi + DHCP',
    kicker: 'Troubleshooting de una IP 0.0.0.0',
    image: '/evidence/lab03-wifi-topologia.png',
    facts: ['Router hogareño', '802.11 / Wi‑Fi', 'FastEthernet0', 'DHCP', 'Diagnóstico de 0.0.0.0'],
    story: 'Combinamos conexión cableada e inalámbrica. Un portátil no obtenía IPv4; revisar interfaz, puerto y DHCP permitió entender dónde estaba el problema.'
  },
]

export const evidence = [
  { labId:'lab01', lab:'LAB 01', src:'/evidence/lab01-ping.png', label:'LAB 01 · Ping exitoso', title:'Primera prueba de conectividad', concept:'Conectividad básica', equipment:'2 PCs + Switch Cisco 2960', result:'0% pérdida', detail:'Esta evidencia muestra la prueba de conectividad entre PC0 y PC1 utilizando ping.', related:['ICMP','IPv4','LAN'] },
  { labId:'lab01', lab:'LAB 01', src:'/evidence/lab01-simulation.png', label:'LAB 01 · Simulation Mode', title:'Recorrido del mensaje', concept:'Flujo de paquetes', equipment:'2 PCs + Switch Cisco 2960', result:'Entrega comprobada', detail:'Simulation Mode permitió observar paso a paso cómo el mensaje cruza el switch hasta el host destino.', related:['Trama','Switch','ICMP'] },
  { labId:'lab02', lab:'LAB 02', src:'/evidence/lab02-config-ip-pc1.jpeg', label:'LAB 02 · IPv4 estática', title:'Configuración IPv4 estática', concept:'Direccionamiento', equipment:'PC1 + LAN de 5 equipos', result:'192.168.10.10 /24', detail:'La captura documenta la asignación manual de una dirección única y su máscara de red.', related:['IPv4','Máscara','Host'] },
  { labId:'lab02', lab:'LAB 02', src:'/evidence/lab02-ping-pc2.jpeg', label:'LAB 02 · Pings cruzados', title:'Pruebas entre cinco hosts', concept:'Verificación cruzada', equipment:'5 PCs + Switch', result:'0% pérdida', detail:'Los pings cruzados comprobaron que el direccionamiento y el cableado permitían comunicación entre todos los hosts.', related:['Ping','ICMP','Estrella'] },
  { labId:'lab03', lab:'LAB 03', src:'/evidence/lab03-ip-0000.png', label:'LAB 03 · Diagnóstico', title:'La pista 0.0.0.0', concept:'Troubleshooting', equipment:'Laptop + Router inalámbrico', result:'Problema identificado', detail:'La dirección 0.0.0.0 indicó que el portátil todavía no había recibido una configuración IPv4 válida.', related:['DHCP','IPv4','Diagnóstico'] },
  { labId:'lab03', lab:'LAB 03', src:'/evidence/lab03-config-laptop.png', label:'LAB 03 · Interfaz y DHCP', title:'Recuperación de conectividad', concept:'Configuración automática', equipment:'Laptop + Access Point / Router', result:'DHCP restaurado', detail:'Revisar la interfaz y la asignación DHCP permitió recuperar una configuración válida para el portátil.', related:['DHCP','Wi-Fi','802.11'] },
]
