import React, { useEffect } from 'react'
import PageShell from '../components/PageShell'
import EvidenceGallery from '../components/EvidenceGallery'
import { labs, evidence } from '../data/content'
import NetworkTerminal from '../components/NetworkTerminal'
import PracticeLink, { clearPracticeTarget, getPracticeTarget } from '../components/PracticeLink'

export default function Labs({ route }){
  useEffect(() => {
    const targetId = getPracticeTarget()
    if (!targetId) return
    const timer = window.setTimeout(() => {
      const target = document.getElementById(targetId)
      if (!target) return
      clearPracticeTarget()
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      target.classList.add('practice-highlight')
      window.setTimeout(() => target.classList.remove('practice-highlight'), 1800)
    }, 120)
    return () => window.clearTimeout(timer)
  }, [route])
  return <PageShell eyebrow="CISCO PACKET TRACER" title="Laboratorio de redes: configurar, probar y entender." intro="La parte práctica de CCNA 1 convierte conceptos en conexiones reales dentro del simulador. Cada laboratorio deja una evidencia y una lección.">
    <section className="container content-stack">
      <div className="lab-manifesto"><span>TEORÍA</span><i>+</i><span>PRÁCTICA</span><i>=</i><strong>COMPRENSIÓN</strong></div>
      <NetworkTerminal />
      <div className="labs-list">{labs.map((lab,i)=><article id={lab.id.toLowerCase().replace(' ','-')} key={lab.id} className="lab-detail"><div className="lab-image-wrap"><img src={lab.image} alt={`Evidencia ${lab.title}`} loading="lazy"/><span>{lab.id}</span></div><div><span className="eyebrow">{lab.kicker}</span><h2>{lab.title}</h2><p>{lab.story}</p><div className="fact-chips">{lab.facts.map(f=><code key={f}>{f}</code>)}</div><PracticeLink target={`evidence-lab0${i+1}`}>Ver evidencias reales</PracticeLink>{i===2 && <div className="trouble-note"><strong>Troubleshooting</strong><p>Es el proceso de encontrar y solucionar un problema de red. Aquí, ver <code>0.0.0.0</code> fue la pista de que el portátil todavía no tenía una IPv4 válida.</p></div>}</div></article>)}</div>
      <div className="section-heading"><span className="eyebrow">BITÁCORA DE EVIDENCIAS</span><h2>No solo decir que funcionó. Mostrarlo.</h2><p>Capturas reales de Packet Tracer utilizadas como evidencia del proceso de aprendizaje.</p></div>
      <EvidenceGallery items={evidence}/>
    </section>
  </PageShell>
}
