import React from 'react'
import PageShell from '../components/PageShell'
import OSIStack from '../components/OSIStack'
import Topologies from '../components/Topologies'

export default function Arquitectura(){
  return <PageShell eyebrow="ARQUITECTURAS Y MODELOS" title="Cómo está organizada una red y cómo explicamos lo que ocurre dentro de ella." intro="Topologías físicas y lógicas, modelo OSI y su relación con TCP/IP. Aquí la red deja de ser una caja negra.">
    <section className="container content-stack">
      <div className="section-heading"><span className="eyebrow">TOPOLOGÍAS FÍSICAS</span><h2>La forma en que conectamos los equipos.</h2><p>La topología física describe cómo están unidos realmente los dispositivos y cables. La topología lógica describe cómo circula la información.</p></div>
      <Topologies />
      <div className="physical-logical"><div><span>FÍSICA</span><h3>Cómo se ve la red.</h3><p>Cables, puertos, switches, routers y la forma real de las conexiones.</p></div><div className="vs">VS</div><div><span>LÓGICA</span><h3>Cómo se comporta.</h3><p>Describe el recorrido de los datos, aunque físicamente los equipos estén conectados de otra forma.</p></div></div>

      <div className="section-heading"><span className="eyebrow">MODELO OSI</span><h2>7 capas para seguir un dato de arriba a abajo.</h2></div>
      <OSIStack showEncapsulation />

      <div className="tcpip-map"><div><span className="eyebrow">OSI</span><div className="mini-layers"><i>7 Aplicación</i><i>6 Presentación</i><i>5 Sesión</i><i>4 Transporte</i><i>3 Red</i><i>2 Enlace</i><i>1 Física</i></div></div><div className="map-arrow">→</div><div><span className="eyebrow">TCP/IP</span><div className="mini-layers tcp"><i>Aplicación</i><i>Transporte</i><i>Internet</i><i>Acceso a red</i></div></div><p>TCP/IP agrupa funciones del modelo OSI en cuatro capas. Es el modelo asociado con la comunicación real utilizada en Internet.</p></div>
    </section>
  </PageShell>
}
