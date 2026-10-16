import React, { useEffect, useMemo, useState } from 'react'

export default function EvidenceGallery({ items }) {
  const [openIndex,setOpenIndex]=useState(null)
  const open = openIndex === null ? null : items[openIndex]
  const siblings = useMemo(() => open ? items.map((item,index) => ({ item,index })).filter(({item}) => item.labId === open.labId) : [], [items, open])
  const siblingPosition = siblings.findIndex(({index}) => index === openIndex)
  const move = (direction) => {
    if (siblings.length < 2) return
    const next = (siblingPosition + direction + siblings.length) % siblings.length
    setOpenIndex(siblings[next].index)
  }
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenIndex(null)
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })
  return <>
    <div className="evidence-grid">
      {items.map((item,index)=><button id={items.findIndex((candidate) => candidate.labId === item.labId) === index ? `evidence-${item.labId}` : undefined} type="button" className={`evidence-shot e${index%3}`} key={item.src} onClick={()=>setOpenIndex(index)}>
        <img src={item.src} alt={item.label} loading="lazy" />
        <span className="evidence-card-copy"><small>{item.lab}</small><strong>{item.title}</strong><em>{item.concept}</em><b>{item.result}</b></span>
      </button>)}
    </div>
    {open && <div className="lightbox evidence-lightbox" role="dialog" aria-modal="true" aria-label={`Evidencia ${open.title}`} onClick={()=>setOpenIndex(null)}>
      <button type="button" className="close-lightbox" aria-label="Cerrar evidencia" onClick={()=>setOpenIndex(null)}>×</button>
      <div className="lightbox-card evidence-modal" onClick={event=>event.stopPropagation()}>
        <div className="evidence-modal-image"><img src={open.src} alt={open.label}/><span>{open.lab}</span></div>
        <div className="evidence-modal-copy"><span className="eyebrow">BITÁCORA DE LABORATORIO</span><h2>{open.title}</h2><p>{open.detail}</p><dl><div><dt>Concepto</dt><dd>{open.concept}</dd></div><div><dt>Equipos</dt><dd>{open.equipment}</dd></div><div><dt>Resultado</dt><dd className="evidence-result">{open.result}</dd></div></dl><div className="evidence-concepts">{open.related.map((concept)=><code key={concept}>{concept}</code>)}</div>
          {siblings.length > 1 && <div className="evidence-navigation"><button type="button" onClick={()=>move(-1)}>← Anterior</button><span>{siblingPosition+1} / {siblings.length}</span><button type="button" onClick={()=>move(1)}>Siguiente →</button></div>}
        </div>
      </div>
    </div>}
  </>
}
