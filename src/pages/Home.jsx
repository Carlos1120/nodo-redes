import React from 'react'
import OSIStack from '../components/OSIStack'
import Topologies from '../components/Topologies'
import ScrollNarrative from '../components/ScrollNarrative'
import { evolution, labs } from '../data/content'
import { goToPractice } from '../components/PracticeLink'

export default function Home({ go }){
  return <main>
    <ScrollNarrative />
    <section className="hero">
      <div className="hero-orbit orb-a"></div><div className="hero-orbit orb-b"></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">REDES · CISCO CCNA 1 · PACKET TRACER</span>
          <h1><span>NODO</span><br/>Redes en movimiento.</h1>
          <p>De ARPANET a Cisco Packet Tracer: una experiencia interactiva para entender cómo se conecta el mundo, cómo viajan los datos y qué ocurre detrás de cada <code>ping</code>.</p>
          <div className="hero-actions"><button onClick={()=>go('fundamentos')} className="primary-btn">Explorar la red <span>↗</span></button><button onClick={()=>go('labs')} className="ghost-btn">Entrar al laboratorio</button></div>
          <div className="authors"><span>Construido por</span><strong>Carlos Mario Peña</strong><i>×</i><strong>Santiago Ortiz Ochoa</strong></div>
        </div>
        <div className="hero-diagram" aria-label="Diagrama decorativo de una red">
          <svg viewBox="0 0 560 500">
            <path d="M74 250 C170 112 225 115 290 205 S410 338 486 230" className="hero-link"/>
            <path d="M120 382 C180 300 254 284 290 205 M290 205 C345 102 420 93 485 130" className="hero-link dim"/>
            <g className="hero-node n1"><circle cx="74" cy="250" r="32"/><text x="74" y="255">PC</text></g>
            <g className="hero-node n2"><circle cx="290" cy="205" r="46"/><text x="290" y="200">SW</text><text x="290" y="220" className="tiny">2960</text></g>
            <g className="hero-node n3"><circle cx="486" cy="230" r="34"/><text x="486" y="235">RTR</text></g>
            <g className="hero-node n4"><circle cx="120" cy="382" r="28"/><text x="120" y="387">AP</text></g>
            <g className="hero-node n5"><circle cx="485" cy="130" r="28"/><text x="485" y="135">☁</text></g>
            <circle className="hero-packet" r="7"><animateMotion dur="4s" repeatCount="indefinite" path="M74 250 C170 112 225 115 290 205 S410 338 486 230"/></circle>
          </svg>
          <div className="signal-chip c1"><span></span> MAC aprendida</div>
          <div className="signal-chip c2"><span></span> ICMP · 0% loss</div>
        </div>
      </div>
      <div className="scroll-hint">SCROLL <span></span></div>
    </section>

    <section id="journey-evolution" className="journey container section-space">
      <div className="section-heading"><span className="eyebrow">01 · EVOLUCIÓN</span><h2>De cuatro nodos a un planeta conectado.</h2><p>La historia de las redes se entiende mejor como una cadena de decisiones que hicieron posible conectar cada vez más equipos.</p></div>
      <div className="timeline">
        {evolution.map((item,i)=><article key={item.title} className="timeline-item"><span>{item.year}</span><div className="timeline-dot"></div><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </div>
    </section>

    <section id="journey-osi" className="split-feature section-space">
      <div className="container split-grid">
        <div className="section-heading"><span className="eyebrow">02 · MODELOS</span><h2>Siete capas. Una sola conversación.</h2><p>El modelo OSI divide la comunicación para poder entenderla por partes. Pasa el cursor por cada capa.</p><button className="text-link" onClick={()=>go('arquitectura')}>Ver OSI + TCP/IP completo →</button></div>
        <OSIStack />
      </div>
    </section>

    <section id="journey-topologies" className="container section-space">
      <div className="section-heading wide"><span className="eyebrow">03 · TOPOLOGÍAS</span><h2>La forma de una red también cuenta una historia.</h2><p>Estrella, bus, anillo, malla y árbol. Cambia de topología para ver cómo se organiza físicamente la conexión.</p></div>
      <Topologies />
    </section>

    <section id="journey-labs" className="lab-preview section-space">
      <div className="container">
        <div className="section-heading"><span className="eyebrow">04 · PACKET TRACER</span><h2>Aprender redes tocando la red.</h2><p>La teoría se convierte en evidencia: cablear, configurar, probar, equivocarse y volver a comprobar.</p></div>
        <div className="lab-ribbon">
          {labs.map((lab)=><button key={lab.id} onClick={()=>goToPractice(lab.id.toLowerCase().replace(' ','-'))} className="lab-slice"><img src={lab.image} alt=""/><div><span>{lab.id}</span><strong>{lab.title}</strong><small>{lab.kicker}</small></div><b>↗</b></button>)}
        </div>
      </div>
    </section>
  </main>
}
