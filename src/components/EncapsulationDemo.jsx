import React, { useEffect, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

const stages = [
  { layer: '7', name: 'Aplicación', tag: 'Datos', copy: 'La aplicación prepara el mensaje “Hola”.' },
  { layer: '4', name: 'Transporte', tag: 'TCP · puerto', copy: 'Transporte agrega puertos para identificar las aplicaciones.' },
  { layer: '3', name: 'Red', tag: 'IP', copy: 'Red agrega direcciones IP para llegar a otra red.' },
  { layer: '2', name: 'Enlace', tag: 'MAC', copy: 'Enlace agrega direcciones MAC para el siguiente salto local.' },
  { layer: '1', name: 'Física', tag: 'Bits', copy: 'Física convierte todo en señales y bits.' },
]

export default function EncapsulationDemo() {
  const [status, setStatus] = useState('idle')
  const [step, setStep] = useState(-1)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    if (status !== 'running') return undefined
    if (step >= stages.length - 1) {
      setStatus('complete')
      return undefined
    }
    const timer = window.setTimeout(() => setStep((value) => value + 1), 620)
    return () => window.clearTimeout(timer)
  }, [status, step])
  const run = () => {
    if (reducedMotion) { setStep(stages.length - 1); setStatus('complete'); return }
    setStep(0)
    setStatus('running')
  }
  const reset = () => { setStep(-1); setStatus('idle') }
  return (
    <div className="encapsulation-demo">
      <div className="encapsulation-heading"><div><span className="eyebrow">MINI DEMOSTRACIÓN</span><h3>Encapsulación</h3><p>Encapsular significa agregar información necesaria mientras los datos bajan por las capas.</p></div><div className="encapsulation-controls"><button type="button" onClick={run} disabled={status === 'running'}>▶ {status === 'complete' ? 'Ver de nuevo' : 'Ver encapsulación'}</button><button type="button" onClick={reset} disabled={status === 'idle'}>↻ Reiniciar</button></div></div>
      <div className="encapsulation-flow" aria-live="polite">
        {stages.map((item,index) => <div key={item.layer} className={index < step ? 'complete' : index === step ? 'active' : ''}><span>Capa {item.layer}</span><strong>{item.name}</strong><code>{item.tag}</code></div>)}
        <div className="encapsulation-packet" style={{ '--step': Math.max(step, 0) }}><span>Hola</span>{stages.slice(0, step + 1).map((item) => <i key={item.layer}>{item.tag}</i>)}</div>
      </div>
      <p className="encapsulation-copy">{step >= 0 ? stages[step].copy : 'La demostración comienza cuando tú lo decidas.'}</p>
    </div>
  )
}
