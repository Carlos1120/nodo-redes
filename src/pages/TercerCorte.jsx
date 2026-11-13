import React from 'react'
import PageShell from '../components/PageShell'
import ThirdTermDemos from '../components/ThirdTermDemos'
import '../second-term.css'

const base = '/materiales/tercer-corte/'
const topics = [
  {id:'capa-red', n:'01', tag:'CAPA DE RED', title:'El paquete encuentra su destino.', text:'La capa 3 del modelo OSI añade al segmento las direcciones IP de origen y destino. El host encapsula, los routers leen el destino y reenvían, y el receptor desencapsula. IP envía paquetes de forma independiente y con máximo esfuerzo: no promete entrega ni orden. Puede viajar por cobre, fibra o Wi‑Fi.', chips:['Paquete IP','Router','Mejor esfuerzo']},
  {id:'ipv4', n:'02', tag:'ESTRUCTURA IPV4', title:'32 bits, dos partes.', text:'Una dirección IPv4 tiene cuatro octetos de 8 bits. La máscara indica qué bits identifican la red y cuáles al host. El prefijo CIDR expresa cuántos bits son de red: /26 deja 6 para hosts. Las direcciones privadas 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16 se usan dentro de redes locales.', chips:['4 octetos','Prefijo CIDR','Red + host']},
  {id:'subredes', n:'03', tag:'SUBREDES', title:'Calcular antes de configurar.', text:'Con h = 32 − prefijo hay 2^h direcciones por bloque; en una subred convencional se reservan red y broadcast, por eso quedan 2^h − 2 hosts. La red resulta de aplicar AND entre IP y máscara. La wildcard invierte la máscara; broadcast = red + wildcard. El primer host es red + 1 y el último, broadcast − 1.', chips:['Netmask','Wildcard','HostMin / HostMax']},
  {id:'ejemplo', n:'04', tag:'EJEMPLO /26', title:'De 192.168.10.75 a su bloque.', text:'Para 192.168.10.75/26, la máscara es 255.255.255.192 y el salto es 256 − 192 = 64. El 75 cae en el bloque .64–.127: red 192.168.10.64, wildcard 0.0.0.63, broadcast .127, hosts .65–.126 y 62 direcciones utilizables.', chips:['192.168.10.64/26','62 hosts','Gateway: .65']},
  {id:'ipv6', n:'05', tag:'IPV6', title:'Más espacio y otra notación.', text:'IPv6 usa 128 bits escritos en ocho grupos hexadecimales; admite quitar ceros iniciales y comprimir una sola secuencia de grupos cero con ::. Una dirección global permite comunicación enrutada; FE80::/10 es local al enlace. SLAAC permite formar automáticamente una dirección a partir de anuncios del router. IPv6 no usa broadcast: emplea multicast.', chips:['128 bits','/64','SLAAC']},
  {id:'routing', n:'06', tag:'ROUTING', title:'Cada salto consulta su tabla.', text:'Si el destino está en otra red, el host envía al gateway. El router elige la ruta coincidente más específica y reenvía con un nuevo encabezado de enlace; las MAC cambian en cada salto, las IP de extremo permanecen y el TTL disminuye. Las rutas C son conectadas, L locales, S estáticas y O aprendidas por OSPF. La ruta 0.0.0.0/0 cubre destinos sin otra coincidencia.', chips:['Gateway','Tabla de rutas','TTL']},
]
const resources = [
  ['Presentación · Direccionamiento IPv4','Direccionamiento y Estructura IPv4(1).pptx','Máscara, wildcard, rangos y ejemplo /26.'],
  ['Taller · Cálculo IPv4','Taller_IPv4.pdf','Ejercicios personalizados y práctica con tres PC.'],
  ['Taller 2 · Packet Tracer IPv4','Taller2_PacketTracer_IPv4(2).pdf','Ocho actividades: subredes, gateway, DHCP y simulación.'],
  ['Presentación · Capa de red y routing','Capa de Red y Routing con Packet Tracer 9.0(1).pptx','IPv4, IPv6, rutas y verificación en Packet Tracer 9.0.'],
  ['Taller · Capa de red y routing','Taller Packet Tracer 9.0 Capa de Red, IPv4, IPv6 y Routing (1).pdf','Dos LAN, dos routers, doble pila y rutas de ida y regreso.'],
  ['Quiz · Tercer corte','Quiz_Redes_TercerCorte.html','Cuestionario interactivo incluido en los materiales de clase.'],
]

export default function TercerCorte({ route = 'tercer-corte', go }){
  const id = route.split('/')[1]
  const selected = topics.find(topic => topic.id === id)
  return <PageShell eyebrow="3ER CORTE · CAPA DE RED" title={selected?.title || 'Direccionar, enrutar y comprobar.'} intro={selected?.text || 'Del cálculo de subredes al recorrido de un paquete entre dos LAN. Una guía de estudio basada en las presentaciones, talleres y materiales del tercer corte.'}>
    <section className="container content-stack third-cut">
      <nav className="module-nav" aria-label="Módulos del tercer corte"><a href="#/tercer-corte" aria-current={!id ? 'page' : undefined}>Vista general</a>{topics.map(t => <a key={t.id} href={`#/tercer-corte/${t.id}`} aria-current={id === t.id ? 'page' : undefined}>{t.n} · {t.tag}</a>)}</nav>
      {selected ? <div className="third-module"><p className="learning-goal"><span>OBJETIVO</span> Experimenta con {selected.tag.toLowerCase()} y explica el resultado.</p><ThirdTermDemos key={id} id={id}/><div className="module-pagination"><button onClick={() => go(`tercer-corte/${topics[(topics.indexOf(selected)+topics.length-1)%topics.length].id}`)}>← Módulo anterior</button><button onClick={() => go(`tercer-corte/${topics[(topics.indexOf(selected)+1)%topics.length].id}`)}>Siguiente módulo →</button></div></div> : <>
      {id && <p role="status">Este módulo no existe. Elige uno del recorrido.</p>}
      <div className="three-pillars">
        <article><span>01</span><h3>Calcula</h3><p>Convierte IP y prefijo en máscara, red, broadcast y rango de hosts antes de asignar direcciones.</p></article>
        <article><span>02</span><h3>Configura</h3><p>Asigna IPv4 e IPv6 a PCs y routers, activa interfaces y crea rutas hacia redes remotas.</p></article>
        <article><span>03</span><h3>Comprueba</h3><p>Usa ping, tracert, comandos show y Simulation para explicar cada resultado.</p></article>
      </div>

      <div className="section-heading"><span className="eyebrow">RUTA DE APRENDIZAJE</span><h2>Del bit al siguiente salto.</h2><p>Seis ideas conectadas, con un ejemplo que puedes repetir en Packet Tracer.</p></div>
      <div className="third-grid">{topics.map(t=><a className="third-card" key={t.n} href={`#/tercer-corte/${t.id}`}><span className="eyebrow">{t.n} · {t.tag}</span><h3>{t.title}</h3><p>{t.text}</p><div className="fact-chips">{t.chips.map(c=><code key={c}>{c}</code>)}</div><span className="module-enter">Explorar ejemplo ↗</span></a>)}</div>

      <div className="concept-band"><div><span className="eyebrow">DECISIÓN DEL HOST</span><h2>¿Destino local o remoto?</h2></div><p>El host compara la red del destino con la suya. Si coincide, busca al vecino en la LAN. Si no, entrega al gateway. Para llegar a otra LAN también debe existir una ruta de regreso: el ping necesita ida y vuelta.</p></div>

      <div className="section-heading"><span className="eyebrow">PACKET TRACER 9.0</span><h2>Practica con dos LAN y dos routers.</h2><p>La guía de clase propone PC0 → SW0 → R1 → R2 → SW1 → PC1, con enlace 10.0.0.0/30 entre routers.</p></div>
      <div className="third-grid">
        <article className="third-card"><span className="eyebrow">DIRECCIONAMIENTO</span><h3>Prepara cada extremo.</h3><p>LAN1: 192.168.10.0/24 y 2001:DB8:ACAD:10::/64. LAN2: 192.168.20.0/24 y 2001:DB8:ACAD:20::/64. Configura las interfaces del router como gateway y ejecuta <code>no shutdown</code>.</p></article>
        <article className="third-card"><span className="eyebrow">RUTAS</span><h3>Abre el camino de ida y vuelta.</h3><p>R1 debe conocer 192.168.20.0/24 a través de 10.0.0.2; R2 debe conocer 192.168.10.0/24 vía 10.0.0.1. En IPv6, activa <code>ipv6 unicast-routing</code> y agrega las rutas equivalentes hacia los prefijos remotos.</p></article>
        <article className="third-card"><span className="eyebrow">VERIFICACIÓN</span><h3>Explica el resultado.</h3><p>Revisa <code>show ip interface brief</code>, <code>show ip route</code> y <code>show ipv6 route</code>. Haz <code>ping</code> y <code>tracert</code>; en Simulation observa ARP, ICMP, TTL y el cambio de MAC entre saltos.</p></article>
      </div>

      <div className="section-heading"><span className="eyebrow">MATERIALES Y PRÁCTICAS</span><h2>Continúa con los archivos originales.</h2><p>Las presentaciones explican el método; los talleres plantean las actividades y la entrega en Packet Tracer.</p></div>
      <div className="third-resources">{resources.map(([title,file,description])=><a key={file} href={base+encodeURIComponent(file)} target="_blank" rel="noopener noreferrer" className="third-resource"><span className="eyebrow">MATERIAL DE CLASE</span><strong>{title}</strong><p>{description}</p><span className="text-link">Abrir archivo ↗</span></a>)}</div>

      <div className="section-heading"><span className="eyebrow">EVIDENCIA EXISTENTE</span><h2>Un taller resuelto, con resultados documentados.</h2><p>El archivo AVILAORTIZ incluye dos proyectos de Packet Tracer y un PDF con cálculos, capturas de configuración y pruebas de conectividad para 192.168.10.0/26. Las capturas pertenecen a ese documento; no representan los otros talleres.</p></div>
      <div className="third-resources"><a className="third-resource" href={base+'Taller_IPv4_Ortiz_Avila.pdf'} target="_blank" rel="noopener noreferrer"><span className="eyebrow">PDF · EVIDENCIA</span><strong>Ver taller resuelto y capturas</strong><p>IPs .36 y .9, gateway .1, HostMax .62 y pruebas de ping.</p><span className="text-link">Abrir evidencia ↗</span></a><a className="third-resource" href={base+'AVILAORTIZ.zip'} download><span className="eyebrow">ZIP · ARCHIVOS ORIGINALES</span><strong>Descargar AVILAORTIZ</strong><p>Incluye el PDF y dos archivos .pkz de Packet Tracer.</p><span className="text-link">Descargar ZIP ↓</span></a></div>
      </>}
    </section>
  </PageShell>
}
