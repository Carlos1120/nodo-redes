import React, { useEffect, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

const chapters = [
  ['journey-evolution', 'Evolución'],
  ['journey-osi', 'OSI'],
  ['journey-topologies', 'Topologías'],
  ['journey-labs', 'Packet Tracer'],
]

export default function ScrollNarrative() {
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    let frame
    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const readingLine = window.innerHeight * .38
        const current = chapters.reduce((selected, [id], index) => {
          const element = document.getElementById(id)
          return element && element.getBoundingClientRect().top <= readingLine ? index : selected
        }, 0)
        setActive(current)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  const goToChapter = (id, index) => {
    const target = document.getElementById(id)
    if (!target) return
    setActive(index)
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  }
  return (
    <nav className="scroll-narrative" aria-label="Recorrido de la página">
      <span className="scroll-route" aria-hidden="true"><i style={{ height: `${(active / (chapters.length - 1)) * 100}%` }} /></span>
      {chapters.map(([id,label], index) => <button type="button" key={id} onClick={() => goToChapter(id, index)} className={index === active ? 'active' : index < active ? 'visited' : ''} aria-current={index === active ? 'step' : undefined} aria-label={`Ir a ${label}`}><b>{String(index + 1).padStart(2,'0')}</b><i aria-hidden="true" /><span>{label}</span></button>)}
    </nav>
  )
}
