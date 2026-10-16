import React from 'react'
import PageShell from '../components/PageShell'
import EvidenceGallery from '../components/EvidenceGallery'
import { evidence } from '../data/content'

export default function Evidencias(){
  return <PageShell eyebrow="BITÁCORA" title="Evidencias del proceso, no capturas decorativas." intro="Cada imagen documenta una decisión: una topología, una configuración, una prueba o un problema que tuvimos que entender.">
    <section className="container content-stack"><EvidenceGallery items={evidence}/><div className="future-node"><span>+</span><div><strong>La bitácora seguirá creciendo.</strong><p>La estructura está preparada para próximos talleres, quices, parciales, prácticas y unidades de CCNA.</p></div></div></section>
  </PageShell>
}
