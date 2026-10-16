import React from 'react'
import PageShell from '../components/PageShell'
import SwitchLearning from '../components/SwitchLearning'
import DeviceExplorer from '../components/DeviceExplorer'
import PracticeLink from '../components/PracticeLink'
import { devices } from '../data/content'

export default function Infraestructura(){
  return <PageShell eyebrow="INFRAESTRUCTURA" title="Quién origina los datos, quién los mueve y quién presta servicios." intro="Hosts, servidores, switches, routers y Access Points vistos como piezas de una misma conversación.">
    <section className="container content-stack">
      <DeviceExplorer devices={devices} />

      <div className="host-config">
        <div><span className="eyebrow">CONFIGURACIÓN BÁSICA DE UN HOST</span><h2>Cuatro datos para ubicarse en la red.</h2><p>Un host es cualquier dispositivo final conectado a la red. Para comunicarse correctamente suele necesitar una dirección IP, una máscara, una puerta de salida y DNS.</p><PracticeLink target="lab-02">Ver configuración del LAB 02</PracticeLink></div>
        <div className="config-terminal"><div><span>IP Address</span><code>192.168.1.10</code><small>Quién soy</small></div><div><span>Subnet Mask</span><code>255.255.255.0</code><small>Cuál es mi red</small></div><div><span>Default Gateway</span><code>192.168.1.1</code><small>Por dónde salgo</small></div><div><span>DNS</span><code>8.8.8.8</code><small>Cómo encuentro nombres</small></div></div>
      </div>

      <SwitchLearning />

      <div className="router-broadcast">
        <article><span className="eyebrow">ROUTER</span><h2>Entre una red y otra.</h2><div className="route-diagram"><b>192.168.1.x</b><i>→</i><strong>ROUTER</strong><i>→</i><b>192.168.2.x</b></div><p>El router mira la IP de destino y decide por dónde enviar la información. Su lista de caminos conocidos se llama tabla de enrutamiento.</p></article>
        <article><span className="eyebrow">BROADCAST</span><h2>Un mensaje para todos… pero con frontera.</h2><p>Broadcast significa enviar un mensaje a todos los equipos de una red local. El switch lo distribuye dentro de la LAN; el router normalmente evita que cruce hacia otra red.</p><div className="broadcast-viz"><em>PC</em><i>→</i><strong>SW</strong><i>⇢</i><em>PC</em><em>PC</em><span className="wall">ROUTER</span></div></article>
      </div>

      <div className="wireless-block"><div><span className="eyebrow">802.11 / WI‑FI</span><h2>El Access Point abre una puerta inalámbrica a la LAN.</h2><p><strong>802.11</strong> es la familia de estándares usada para Wi‑Fi. Un Access Point conecta equipos inalámbricos a una red existente. Un router hogareño, en cambio, normalmente reúne router + switch + Access Point + DHCP + firewall básico en una sola caja.</p><PracticeLink target="lab-03">Ver laboratorio Wi‑Fi</PracticeLink></div><div className="wifi-scene"><span className="wave w1"></span><span className="wave w2"></span><span className="wave w3"></span><strong>AP</strong><em className="phone">▯</em><em className="laptop">▱</em></div></div>
    </section>
  </PageShell>
}
