import React from 'react'
import PageShell from '../components/PageShell'
import { evolution, scopes } from '../data/content'
import PracticeLink from '../components/PracticeLink'

export default function Fundamentos(){
  return <PageShell eyebrow="FUNDAMENTOS" title="Antes de configurar una red, hay que entender qué la hace red." intro="Dispositivos, medios y reglas de comunicación. Desde ahí podemos explicar el crecimiento de Internet, IPv4, IPv6 y los distintos alcances geográficos.">
    <section className="container content-stack">
      <div className="three-pillars">
        <article><span>01</span><h3>Equipos</h3><p>Son los dispositivos que participan: computadores, celulares, servidores, switches, routers, impresoras y más.</p></article>
        <article><span>02</span><h3>Medio</h3><p>Es el camino por donde viaja la información: cable Ethernet, fibra óptica, Wi‑Fi, radio o redes móviles.</p></article>
        <article><span>03</span><h3>Protocolos</h3><p>Son las reglas que permiten que los equipos se entiendan. Ejemplos: IP, TCP, HTTP, DNS y DHCP.</p><PracticeLink target="network-terminal">Probar un ping simulado</PracticeLink></article>
      </div>

      <div className="concept-band"><div><span className="eyebrow">DEFINICIÓN CENTRAL</span><h2>Red = dispositivos + medio + reglas</h2></div><p>Una red de computadores es la interconexión de dos o más dispositivos que pueden comunicarse, intercambiar información y compartir recursos.</p></div>

      <div className="section-heading"><span className="eyebrow">EVOLUCIÓN</span><h2>Una red que nunca dejó de crecer.</h2></div>
      <div className="evolution-lane">{evolution.map(e=><div key={e.title}><b>{e.year}</b><strong>{e.title}</strong><p>{e.text}</p></div>)}</div>

      <div className="ipv6-block">
        <div><span className="eyebrow">ESCALABILIDAD</span><h2>IPv4 se quedó pequeño. IPv6 amplió el mapa.</h2><p>IPv4 utiliza 32 bits y permite aproximadamente 4.300 millones de direcciones. El crecimiento de Internet hizo necesario aprovechar mejor las direcciones mediante NAT y avanzar hacia IPv6.</p></div>
        <div className="address-compare"><div><span>IPv4</span><strong>32 bits</strong><code>192.168.1.10</code><i>≈ 4,3 mil millones</i></div><div><span>IPv6</span><strong>128 bits</strong><code>2001:db8::1</code><i>≈ 3,4 × 10³⁸</i></div></div>
      </div>

      <div className="section-heading"><span className="eyebrow">ALCANCE GEOGRÁFICO</span><h2>De tu bolsillo al planeta.</h2></div>
      <div className="scope-track">{scopes.map((s,i)=><article key={s[0]} style={{'--size':`${72+i*28}px`}}><div className="scope-ring"></div><strong>{s[0]}</strong><span>{s[1]}</span><p>{s[2]}</p></article>)}</div>
    </section>
  </PageShell>
}
