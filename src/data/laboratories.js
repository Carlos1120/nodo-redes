export const tecnoAddresses = [
  ['PC0', '192.168.10.10', '255.255.255.0', '192.168.10.1'],
  ['PC1', '192.168.10.11', '255.255.255.0', '192.168.10.1'],
  ['Laptop0 (cableada)', '192.168.10.12', '255.255.255.0', '192.168.10.1'],
  ['Server0', '192.168.30.10', '255.255.255.0', '192.168.30.1'],
  ['Router0 G0/0', '192.168.10.1', '255.255.255.0', '—'],
  ['Router0 G0/1', '192.168.30.1', '255.255.255.0', '—'],
]
const routerConfig = `enable
configure terminal
hostname Router0
interface gigabitEthernet 0/0
ip address 192.168.10.1 255.255.255.0
no shutdown
exit
interface gigabitEthernet 0/1
ip address 192.168.30.1 255.255.255.0
no shutdown
end
show ip interface brief
copy running-config startup-config`
export const secondTermLabs = [
  {
    id: 'cableado', title: 'Cableado y configuración básica', source: 'Taller_Practico_PacketTracer_Cableado_Configuracion_Basica.pdf · pp. 1–7',
    context: 'TecnoAndina conecta usuarios con un servidor institucional en otra subred. Esta práctica prepara la base antes de analizar PDU o aplicar seguridad.',
    objective: 'Cablear, asignar IP y verificar comunicación local y entre redes.',
    equipment: ['1 router 2911 (o equivalente con interfaces identificadas)', '2 switches 2960', '2 PC-PT, 1 Laptop-PT y 1 Server-PT', 'Cobre directo para host–switch y switch–router; selección automática si el modelo lo requiere'],
    topology: 'PC0 / PC1 / Laptop0 → Switch1 → Router0 → Switch2 → Server0', addresses: tecnoAddresses,
    steps: [
      'Crear y guardar Apellido_Nombre_TallerPT.pkt. Colocar y nombrar todos los dispositivos.',
      'Conectar PC0 a Fa0/1, PC1 a Fa0/2 y Laptop0 a Fa0/3 de Switch1; Switch1 Gi0/1 a Router0 G0/0; Router0 G0/1 a Switch2 Gi0/1; Server0 a Fa0/1 de Switch2.',
      'Configurar IP, máscara y gateway en Desktop > IP Configuration de cada host según la tabla.',
      'En cada switch: enable, configure terminal, hostname Switch1 (o Switch2), end. En Router0 aplicar el bloque de comandos y verificar interfaces up/up. Los enlaces del router pueden permanecer rojos hasta ejecutar no shutdown.',
      'Activar HTTP y EMAIL en Server0 si el ejercicio lo solicita; usar dominio y cuenta ficticios. No se necesita una ruta estática entre estas redes directamente conectadas.',
      'Desde PC0, probar gateway, Laptop0 y servidor. Registrar resultados reales; ARP puede causar un primer timeout. Guardar configuraciones y archivo .pkt.',
    ],
    commands: [{ title: 'CLI de Router0 · nombres de interfaz según modelo', code: routerConfig }, { title: 'Command Prompt de PC0', code: 'ipconfig /all\nping 192.168.10.1\nping 192.168.10.12\nping 192.168.30.10' }],
    explanation: 'La máscara decide si PC0 resuelve la MAC del destinatario local o la del gateway. El router conoce ambas redes conectadas si sus interfaces están activas.',
    expected: ['Interfaces del router up/up y enlaces activos tras convergencia.', 'Direcciones únicas y gateways de la subred correcta.', 'Respuestas ICMP entre los equipos indicados; los servicios deben comprobarse por separado.'],
    pending: ['Archivo .pkt y documento diligenciado.', 'Topología completa con nombres, puertos y cableado.', 'show ip interface brief de Router0.', 'Configuración IP de al menos dos hosts.', 'Salidas reales de los tres ping y sus interpretaciones.'], evidence: [],
  },
  {
    id: 'tabla-mac', title: 'Tabla MAC: aprender, difundir y actualizar', source: 'Laboratorio la tabla MAC en Packet Tracer.pdf · pp. 1–7; Direcciones MAC.html · actividad y rúbrica',
    context: 'Práctica independiente: un switch y cuatro PCs en una LAN. Aquí 192.168.10.1 es PC0, no el gateway de TecnoAndina.', objective: 'Relacionar cada entrada dinámica con una trama de origen y demostrar el cambio de puerto.',
    equipment: ['1 switch 2960 S1', '4 PC-PT', '4 cables Copper Straight-Through'],
    topology: 'PC0 Fa0/1 · PC1 Fa0/2 · PC2 Fa0/3 · PC3 Fa0/4 ↔ S1 (VLAN 1)',
    addresses: Array.from({ length: 4 }, (_, i) => [`PC${i}`, `192.168.10.${i + 1}`, '255.255.255.0', 'No requerido']),
    steps: [
      'Crear apellido_nombre_tablamac.pkt; conectar cada PC al puerto indicado y habilitar etiquetas de puerto. Esperar enlaces verdes.',
      'Asignar .1 a .4 con máscara /24, sin gateway. Anotar MAC reales desde Config > FastEthernet0 o ipconfig /all. No copiar las MAC ilustrativas de esta web.',
      'En S1 entrar a modo privilegiado; mostrar tabla MAC. Si hay entradas dinámicas previas, limpiarlas. La limpieza no vacía las cachés ARP de los PCs.',
      'Desde PC0 hacer ping a .2; desde PC2 hacer ping a .4. Observar cuatro MAC aprendidas si ambos pares intercambian tráfico.',
      'En Simulation filtrar ARP e ICMP. Generar una comunicación entre hosts sin entrada ARP previa o vaciar su caché con el mecanismo disponible en la versión. Add Simple PDU y Capture / Forward. Inspeccionar DEST ADDR de la solicitud ARP.',
      'Explicar por qué ARP broadcast se difunde aunque la MAC del objetivo ya esté aprendida. El switch aprende por origen; no pregunta por IP.',
      'Mover PC2 de Fa0/3 a Fa0/10 y hacer ping a .1 desde PC2. Mostrar la entrada actualizada. Convertir la MAC de PC0 a binario y decimal y justificar I/G y U/L.',
      'Resolver las preguntas con capturas propias. Como extensión del HTML, calcular EUI-64 modificado de una MAC unicast y compararlo solo si el equipo usa ese método.',
    ],
    commands: [{ title: 'CLI de S1', code: 'enable\nshow mac address-table\nshow mac address-table dynamic\nclear mac address-table dynamic\nshow interfaces fa0/1' }, { title: 'Command Prompt · según equipo de cada paso', code: 'ipconfig /all\nping 192.168.10.2\narp -a' }],
    explanation: 'La tabla se llena por MAC de origen. Ver cuatro entradas después de dos ping completos incluye el tráfico de ida y de respuesta. El aging habitual de 300 s puede borrar entradas; depende del equipo/configuración.',
    expected: ['Tabla vacía antes del tráfico controlado; luego MAC asociadas a los puertos correctos.', 'Solicitud ARP con destino FFFF.FFFF.FFFF; respuesta generalmente unicast.', 'PC2 aprendido en Fa0/10 después de transmitir por ese puerto.'],
    pending: ['.pkt, tabla IP/MAC/puerto y cálculos de la MAC de PC0.', 'Captura 1: topología con puertos y enlaces.', 'Captura 2: tabla vacía.', 'Captura 3: tabla con cuatro filas.', 'Captura 4: solicitud ARP y destino broadcast.', 'Captura 5: PC2 en Fa0/10; respuestas razonadas a las tres preguntas.'], evidence: [],
  },
  {
    id: 'encapsulamiento', title: 'Encapsulamiento, PDU y seguridad', source: 'Taller_Teorico_Practico_Encapsulamiento_PDU_Seguridad.pdf · pp. 1–6; presentaciones de PDU y trama Ethernet',
    context: 'Se analiza un correo entre subredes y una captura didáctica de tráfico web. El taller teórico es obligatorio; la captura con herramienta es opcional según disponibilidad.', objective: 'Distinguir direcciones MAC, IP y puertos y explicar encapsulamiento y recepción.',
    equipment: ['Topología TecnoAndina de la práctica de cableado', 'Packet Tracer en modo Simulation; Wireshark es alternativa para tráfico autorizado'],
    topology: 'PC0 → Switch1 → Router0 → Switch2 → Server0; inspeccionar cada enlace', addresses: tecnoAddresses,
    steps: [
      'Resolver preguntas abiertas, verdadero/falso, relación capa–PDU y selección múltiple con palabras propias. OSI tiene siete capas; el recorrido didáctico agrupa cinco niveles.',
      'Completar la tabla del correo: aplicación/datos; transporte/segmento TCP y puertos; red/paquete e IP; enlace/trama y MAC/FCS; física/bits y señales.',
      'En una copia de TecnoAndina, verificar servicios. Generar una solicitud HTTP (puerto 80 en el servidor de práctica) o correo configurado. Un ping produce ICMP, no un segmento TCP.',
      'En Simulation, filtrar ARP y el tráfico de interés. Abrir PDU Information > OSI Model / Inbound y Outbound PDU Details y avanzar con Capture / Forward.',
      'Anotar MAC por enlace, IP de extremos y puertos de la comunicación. Antes y después de Router0 cambia la trama Ethernet. Física interpreta señales; no retira un encabezado IP.',
      'Para la captura simplificada del taller, asociar Ethernet a capa 2, IP a capa 3 y TCP a capa 4. TCP/443 sugiere HTTPS, pero el puerto solo no prueba el protocolo.',
      'Analizar al menos cuatro riesgos de TecnoAndina: cuarto abierto, credencial compartida, ausencia de segmentación, respaldos y actualizaciones. Proponer mitigaciones y justificar prioridad.',
    ],
    commands: [{ title: 'Comprobación previa en PC0', code: 'ipconfig /all\nping 192.168.30.10\narp -a' }, { title: 'Comprobación en Router0', code: 'show ip interface brief\nshow ip route' }],
    explanation: 'La captura del taller contiene una MAC destino ilustrativa FF:EE:DD:44:55:66 cuyo bit I/G es 1; no representa la MAC unicast de un gateway. Para el ejemplo web se emplean MAC locales unicast 02:… y direcciones privadas.',
    expected: ['Identificar PDU y direcciones por capa sin confundir conmutación con enrutamiento.', 'Explicar encabezado y tráiler de Ethernet y su renovación en el router.', 'Proponer seguridad física y lógica sin afirmar que ya fue configurada.'],
    pending: ['Taller diligenciado y análisis propio del caso de seguridad.', 'Si se realiza la práctica opcional: captura anotada de Ethernet, IP y TCP y dos o tres líneas explicativas.', 'Archivo .pkt propio si se usa Packet Tracer; la rúbrica anexa independiente no se ha recibido.'], evidence: [],
  },
  {
    id: 'fibra-wifi', title: 'Fibra óptica, diagnóstico CLI y Wi-Fi', source: 'Taller_Repaso_Fibra_CLI_WiFi.pdf · pp. 1–11',
    context: 'Se extiende TecnoAndina hacia el edificio B por fibra y se transforma Laptop0 en cliente inalámbrico.', objective: 'Elegir un enlace óptico compatible, configurar acceso seguro y diagnosticar hasta el servidor.',
    equipment: ['Topología TecnoAndina existente', 'Switch3 y enlace óptico con interfaces compatibles en ambos extremos', 'PC2, AP-PT-N y módulo inalámbrico compatible con Laptop0', 'La guía propone PT-SWITCH-NM-1FGE; verificar compatibilidad del modelo antes de insertarlo'],
    topology: 'Edificio A: Switch1 ↔ fibra ↔ Switch3 (edificio B) → PC2 + AP ⇢ Laptop0; Router0 mantiene salida hacia Server0',
    addresses: [...tecnoAddresses.filter(row => !row[0].startsWith('Laptop')), ['PC2', '192.168.10.13', '255.255.255.0', '192.168.10.1'], ['Laptop0 Wi-Fi', '192.168.10.14', '255.255.255.0', '192.168.10.1']],
    steps: [
      'Comprobar la base y guardar Apellido_Nombre_TallerRepaso2.pkt. Resolver tablas de fibra, comandos y conceptos de Wi-Fi (partes 1 a 3).',
      'Elegir switches con puertos o módulos ópticos compatibles. Un 2960 de puertos fijos puede no aceptar PT-SWITCH-NM-1FGE: usar un switch modular apropiado y registrar la sustitución, sin forzar un módulo incompatible.',
      'Si el simulador requiere apagar el dispositivo para cambiar módulos, apagar, insertar y encender. En hardware real, seguir el manual: algunos SFP admiten inserción en caliente. Conectar fibra y esperar estado activo.',
      'Asignar hostname Switch3. Conectar PC2 por cobre a Switch3 y configurar .10.13/24 con gateway .10.1.',
      'Conectar el AP a Switch3; SSID TecnoAndina-WiFi, WPA2-PSK/AES o equivalente soportado. Utilizar una clave exclusiva de práctica, no una credencial real. La clave pública del taller es un ejemplo, no una recomendación para producción.',
      'Apagar Laptop0 si hace falta para reemplazar la NIC por un módulo inalámbrico compatible. Encender y asociar SSID, autenticación y clave. Configurar .10.14/24, gateway .10.1.',
      'Desde PC2: ping al gateway y al servidor. Desde Laptop0: ipconfig /all y tracert al servidor. Registrar salida y análisis; el switch no cuenta como salto IP.',
      'Guardar .pkt, documento completo y capturas con pies explicativos. No marcar enlace operativo solo por existir un cable: comprobar puertos, IP y tráfico.',
    ],
    commands: [{ title: 'Switch3 · CLI', code: 'enable\nconfigure terminal\nhostname Switch3\nend\ncopy running-config startup-config' }, { title: 'PC2', code: 'ping 192.168.10.1\nping 192.168.30.10' }, { title: 'Laptop0', code: 'ipconfig /all\ntracert 192.168.30.10\narp -a' }],
    explanation: 'La extensión permanece en la red de usuarios. Se espera un router intermedio y luego el destino en tracert, si los dispositivos responden. La cantidad de switches o el medio óptico no agregan saltos IP.',
    expected: ['Backbone óptico activo, PC2 cableado y Laptop0 asociado al AP seguro.', 'IP .10.13 y .10.14 únicas; puerta de enlace .10.1.', 'Conectividad a red local y servidor remoto con interpretación de CLI.'],
    pending: ['.pkt, taller diligenciado y tabla CLI con resultados propios.', 'Inserción de módulos compatibles y enlace óptico activo.', 'Configuración SSID y WPA2 del AP, sin exponer claves reales.', 'Asociación de Laptop0 y configuración IP.', 'Salidas CLI desde PC2/Laptop0 y topología completa de ambos edificios.'], evidence: [],
  },
]
