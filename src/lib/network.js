// Modelos didácticos deterministas. No ejecutan comandos ni generan tráfico real.
export const BROADCAST = 'FF:FF:FF:FF:FF:FF'
export const hosts = Array.from({ length: 4 }, (_, i) => ({
  id: `PC${i}`, mac: `02:00:00:00:00:0${i + 1}`, ip: `192.168.10.${i + 1}`, port: `Fa0/${i + 1}`, vlan: 1,
}))

export function normalizeMac(value) {
  const raw = value.trim()
  if (!/^([\da-f]{12}|([\da-f]{2}:){5}[\da-f]{2}|([\da-f]{2}-){5}[\da-f]{2}|([\da-f]{4}\.){2}[\da-f]{4})$/i.test(raw)) throw new Error('Usa 12 dígitos hexadecimales: 3C:D9:2B:7A:10:F4 o formato Cisco.')
  return raw.replace(/[:.\-]/g, '').toUpperCase().match(/../g).join(':')
}
export function inspectMac(value) {
  const mac = normalizeMac(value), octets = mac.split(':').map(x => parseInt(x, 16))
  const type = mac === BROADCAST ? 'Broadcast' : octets[0] & 1 ? 'Multicast' : 'Unicast'
  const local = Boolean(octets[0] & 2)
  const modified = [...octets.slice(0, 3), 255, 254, ...octets.slice(3)]
  modified[0] ^= 2
  const hex = modified.map(x => x.toString(16).padStart(2, '0')).join('')
  return { mac, type, local, octets, binary: octets.map(x => x.toString(2).padStart(8, '0')), eui64: type === 'Unicast' ? `fe80::${hex.match(/.{4}/g).join(':')}` : null }
}

// La clave incluye VLAN: una misma MAC puede aparecer en dominios distintos.
export function receiveFrame(table, { source, destination, ingress, vlan = 1 }, ports) {
  source = normalizeMac(source); destination = normalizeMac(destination)
  if (inspectMac(source).type !== 'Unicast' || source === '00:00:00:00:00:00') throw new Error('El origen debe ser una MAC unicast válida.')
  if (!ports.some(p => p.port === ingress && p.vlan === vlan)) throw new Error('Puerto de entrada fuera de la VLAN.')
  const next = { ...table, [`${vlan}/${source}`]: { mac: source, port: ingress, vlan } }
  const known = next[`${vlan}/${destination}`]
  const eligible = ports.filter(p => p.vlan === vlan && p.port !== ingress).map(p => p.port)
  const type = inspectMac(destination).type
  let action, egress
  if (type === 'Broadcast' || type === 'Multicast') { action = type === 'Broadcast' ? 'Broadcast' : 'Multicast sin snooping'; egress = eligible }
  else if (!known) { action = 'Unicast desconocido · flooding'; egress = eligible }
  else if (known.port === ingress) { action = 'Filtrado · mismo puerto'; egress = [] }
  else { egress = eligible.includes(known.port) ? [known.port] : []; action = egress.length ? 'Unicast conocido' : 'Destino no disponible' }
  return { table: next, source, destination, ingress, vlan, action, egress }
}

export function frameSize(payloadBytes, format = 'ii') {
  if (!['ii', 'snap'].includes(format)) throw new Error('Formato no admitido.')
  const llc = format === 'snap' ? 8 : 0
  if (!Number.isInteger(payloadBytes) || payloadBytes < 0 || payloadBytes + llc > 1500) throw new Error(`Carga útil: entero entre 0 y ${1500 - llc} bytes.`)
  const data = payloadBytes + llc, padding = Math.max(0, 46 - data)
  return { llc, data, padding, total: 18 + data + padding, physical: 26 + data + padding }
}

export function encapsulationStages(protocol = 'TCP', receiving = false) {
  const udp = protocol === 'UDP'
  const stages = [
    { layer: 'Aplicación', pdu: 'Datos', header: udp ? 'DNS: consulta nodo.test' : 'SMTP: correo de ejemplo', copy: 'La aplicación prepara un mensaje; los protocolos de aplicación también tienen su propio formato.' },
    { layer: 'Transporte', pdu: udp ? 'Datagrama' : 'Segmento', header: udp ? 'UDP 53000 → 53 · 8 B' : 'TCP 51422 → 25 · secuencia y ACK', copy: udp ? 'UDP añade puertos, longitud y checksum. No garantiza entrega, orden ni retransmisiones.' : 'TCP añade puertos y control de secuencia. Ofrece entrega ordenada, confirmaciones y retransmisiones.' },
    { layer: 'Red', pdu: 'Paquete', header: 'IPv4 192.168.10.10 → 192.168.30.10', copy: 'IP identifica los extremos. Router0 conecta ambas subredes y reduce el TTL; sin NAT las IP de origen y destino se conservan.' },
    { layer: 'Enlace', pdu: 'Trama', header: receiving ? 'MAC Router0 (LAN30) → Server0 · FCS' : 'MAC PC0 → Router0 (LAN10) · FCS', copy: 'Ethernet añade direcciones del salto local y un tráiler FCS. El router retira la trama entrante y crea otra para el siguiente enlace.' },
    { layer: 'Física', pdu: 'Bits', header: 'Señales eléctricas / luz / radio', copy: 'El medio transporta señales que representan bits. Física no añade ni retira un encabezado de red.' },
  ]
  return receiving ? stages.reverse().map(s => ({ ...s, copy: s.layer === 'Física' ? 'El receptor interpreta señales y reconstruye bits para recuperar la trama.' : s.layer === 'Aplicación' ? 'El servidor entrega el mensaje al servicio de aplicación correspondiente.' : `El receptor interpreta ${s.layer === 'Enlace' ? 'MAC y FCS; valida la trama y retira su encabezado y tráiler' : s.layer === 'Red' ? 'el encabezado IP y entrega su carga a transporte' : 'los puertos y entrega los datos a la aplicación'}.` })) : stages
}

export const cliNetwork = {
  ip: '192.168.10.10', mask: '255.255.255.0', gateway: '192.168.10.1', mac: '02:00:00:00:10:10',
  peers: { '192.168.10.1': '02:00:00:00:10:01', '192.168.10.11': '02:00:00:00:10:11', '192.168.10.12': '02:00:00:00:10:12', '192.168.30.10': '02:00:00:00:30:10' },
}
export function runCommand(input, cache = {}) {
  const command = input.trim().toLowerCase().replace(/\s+/g, ' '), next = { ...cache }, n = cliNetwork
  let lines, explanation
  if (command === 'ipconfig' || command === 'ipconfig /all') {
    lines = [`IPv4: ${n.ip}`, `Máscara: ${n.mask}`, `Gateway: ${n.gateway}`]
    if (command.endsWith('/all')) lines.push(`MAC: ${n.mac}`, 'DHCP: desactivado (IP estática)', 'DNS: no configurado en este escenario')
    explanation = 'Comprueba dirección, máscara y gateway antes de buscar fallas de enrutamiento.'
  } else if (command === 'arp -a') {
    lines = Object.entries(next).map(([ip, mac]) => `${ip}    ${mac}    dynamic`)
    if (!lines.length) lines = ['Caché ARP vacía. Genera primero un ping.']
    explanation = 'ARP relaciona IP y MAC del enlace local. Para un servidor remoto se resuelve la MAC del gateway, no la del servidor.'
  } else if (/^(ping|tracert) /.test(command)) {
    const [verb, ip, extra] = command.split(' ')
    if (extra || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip) || ip.split('.').some(x => +x > 255)) return { cache: next, lines: ['Sintaxis: ping <IPv4> o tracert <IPv4>'], explanation: 'Solo se admiten direcciones IPv4 del escenario; no se consulta DNS.' }
    const reachable = ip === n.ip || Object.hasOwn(n.peers, ip)
    if (reachable && ip !== n.ip) { const arpIp = ip.startsWith('192.168.10.') ? ip : n.gateway; next[arpIp] = n.peers[arpIp] }
    if (!reachable) { lines = ['Destino sin respuesta en este modelo.', 'Enviados = 4, recibidos = 0 (100% pérdida simulada)']; explanation = 'La IP no está en la topología simulada; esto no mide conectividad real.' }
    else if (verb === 'ping') { lines = Array.from({ length: 4 }, () => `Respuesta de ${ip}: bytes=32 tiempo<1ms TTL=${ip.startsWith('192.168.30.') ? 127 : 128}`); lines.push('Enviados = 4, recibidos = 4 (0% pérdida simulada)'); explanation = 'ICMP confirma una respuesta en el modelo. No comprueba que HTTP o correo estén disponibles.' }
    else { lines = ip.startsWith('192.168.30.') ? [`1  <1 ms  ${n.gateway} (Router0)`, `2  <1 ms  ${ip} (Server0)`] : [`1  <1 ms  ${ip}`]; explanation = 'tracert muestra saltos IP. Los switches de capa 2 no aparecen; la última línea es el destino.' }
  } else { lines = ['Comando no reconocido. Usa ipconfig, ipconfig /all, ping <IPv4>, tracert <IPv4> o arp -a.']; explanation = 'Terminal educativa: no ejecuta procesos del sistema.' }
  return { cache: next, lines, explanation }
}

export function checkWifi(ap, client) {
  if (!ap.ssid.trim() || new TextEncoder().encode(ap.ssid).length > 32) return { ok: false, text: 'SSID requerido: máximo 32 bytes.' }
  if (!['WPA2', 'WPA3'].includes(ap.security)) return { ok: false, text: 'WEP y redes abiertas son inseguros. Selecciona WPA2-AES o WPA3.' }
  if (ap.password.length < 8 || ap.password.length > 63) return { ok: false, text: 'Usa una frase de 8 a 63 caracteres en este ejercicio.' }
  if (client.ssid !== ap.ssid || client.password !== ap.password || client.band !== ap.band || client.security !== ap.security) return { ok: false, text: 'Sin asociación: revisa SSID, banda, seguridad y clave del cliente.' }
  return { ok: true, text: `Asociación simulada correcta · ${ap.band} GHz · ${ap.security}. IP estática propuesta: 192.168.10.14/24, gateway 192.168.10.1.` }
}

export function scoreQuiz(questions, answers) {
  const correct = questions.reduce((sum, q, i) => sum + Number(answers[i] === q.answer), 0)
  return { correct, total: questions.length, percent: questions.length ? Math.round(correct / questions.length * 100) : 0 }
}
