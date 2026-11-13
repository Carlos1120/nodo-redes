import React from 'react'
import PageShell from '../components/PageShell'
import { modules, technicalSources } from '../data/secondTerm'
import SecondTermModule from '../components/SecondTermModule'
import '../second-term.css'

export default function SegundoCorte({ route, go }) {
  const id = route.split('/')[1], module = modules.find(m => m.id === id)
  return <PageShell eyebrow="NODO / SEGUNDO CORTE" title={module?.title || 'La red aprende. Tú también.'} intro={module?.description || 'Del enlace físico a la seguridad: observa, experimenta y explica cómo se mueve una trama.'}>
    <div className="container second-term">
      <nav className="module-nav" aria-label="Módulos del segundo corte">
        <a href="#/segundo-corte" aria-current={!id ? 'page' : undefined}>Vista general</a>
        {modules.map((m, i) => <a key={m.id} href={`#/segundo-corte/${m.id}`} aria-current={id === m.id ? 'page' : undefined}>{String(i + 1).padStart(2, '0')} · {m.title}</a>)}
      </nav>
      {module ? <div key={id}><p className="learning-goal"><span>OBJETIVO</span> {module.objective}</p><SecondTermModule id={id}/><div className="module-pagination"><button onClick={() => go(`segundo-corte/${modules[(modules.indexOf(module) + 6) % 7].id}`)}>← Módulo anterior</button><button onClick={() => go(`segundo-corte/${modules[(modules.indexOf(module) + 1) % 7].id}`)}>Siguiente módulo →</button></div></div> : <>
        {id && <p role="status">Este módulo no existe. Elige uno del recorrido.</p>}
        <div className="term-intro"><div><span className="eyebrow">OBSERVAR → EXPERIMENTAR → EXPLICAR</span><h2>Siete estaciones para entender el enlace.</h2><p>Aprende a distinguir tráfico local y remoto, interpretar direcciones y tramas, seguir las PDU y diagnosticar con comandos. Termina aplicando seguridad y comprobando lo aprendido.</p></div><div className="term-signal" aria-hidden="true"><span>PC</span><i>→</i><strong>SW</strong><i>→</i><span>RTR</span><small>TRAMAS · PAQUETES · DECISIONES</small></div></div>
        <div className="module-grid">{modules.map((m, i) => <a className="module-card" key={m.id} href={`#/segundo-corte/${m.id}`}><span className="eyebrow">{String(i + 1).padStart(2, '0')} / {m.tag}</span><h2>{m.title}</h2><p>{m.description}</p><span className="module-enter">Explorar módulo ↗</span></a>)}</div>
        <aside className="academic-note"><strong>Simulación y evidencia son cosas distintas.</strong><p>Los resultados interactivos de esta web son didácticos. Las cuatro prácticas del segundo corte tienen guías disponibles; sus capturas y archivos .pkt siguen pendientes. Las evidencias del primer corte permanecen en su sección original.</p></aside>
        <details className="source-note"><summary>Material académico y fuentes técnicas</summary><p>Contenido adaptado de los ocho materiales entregados: Direcciones MAC; Trama Ethernet y LLC/MAC; Ethernet y Redes Locales; talleres de cableado, fibra/CLI/Wi-Fi y encapsulamiento/seguridad; presentación de PDU y laboratorio de tabla MAC.</p><ul>{technicalSources.map(([name, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{name}</a></li>)}</ul></details>
      </>}
    </div>
  </PageShell>
}
