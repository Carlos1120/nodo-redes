import React, { useEffect, useState } from 'react'
import { encapsulationStages } from '../lib/network'
export default function EncapsulationDemo() {
  const [step, setStep] = useState(0), [running, setRunning] = useState(false), [receiving, setReceiving] = useState(false), [protocol, setProtocol] = useState('TCP')
  const stages = encapsulationStages(protocol, receiving), current = stages[step]
  useEffect(() => {
    if (!running) return
    if (step === 4) { setRunning(false); return }
    const timer = setTimeout(() => setStep(n => n + 1), 1400)
    return () => clearTimeout(timer)
  }, [step, running])
  function reset() { setRunning(false); setStep(0) }
  return <div className="sim-panel pdu-simulator"><div className="sim-heading"><div><span className="eyebrow">PC0 → ROUTER0 → SERVER0</span><h3>{receiving ? 'Servidor receptor: desencapsulamiento' : 'Equipo emisor: encapsulamiento'}</h3></div></div>
    <div className="sim-controls"><label>Transporte<select value={protocol} onChange={e => { setProtocol(e.target.value); reset() }}><option>TCP</option><option>UDP</option></select></label><button aria-pressed={receiving} onClick={() => { setReceiving(!receiving); reset() }}>Cambiar a {receiving ? 'encapsulamiento' : 'desencapsulamiento'}</button></div>
    <ol className="pdu-track">{stages.map((s, i) => <li key={s.layer} className={i === step ? 'current' : i < step ? 'done' : ''}><span>0{i + 1}</span><strong>{s.layer}</strong><code>{s.pdu}</code></li>)}</ol>
    <div className="pdu-packet" aria-live="polite"><span className="eyebrow">PASO {step + 1} / 5 · {current.pdu}</span><h4>{current.header}</h4><p>{current.copy}</p><div className="pdu-headers">{(receiving ? stages.slice(step) : stages.slice(0, step + 1).reverse()).map(s => <span key={s.layer}>{s.pdu}</span>)}</div></div>
    <div className="sim-controls"><button onClick={() => { if (step === 4) setStep(0); setRunning(true) }} disabled={running}>Iniciar</button><button onClick={() => setRunning(false)} disabled={!running}>Pausar</button><button onClick={() => { setRunning(false); setStep(n => n - 1) }} disabled={step === 0}>Paso anterior</button><button onClick={() => { setRunning(false); setStep(n => n + 1) }} disabled={step === 4}>Siguiente paso</button><button onClick={reset}>Reiniciar PDU</button></div><p className="small-copy">Sin NAT: IP de origen y destino estables, MAC distintas en cada LAN. SMTP usa TCP/25 y DNS puede usar UDP/53 en este modelo. Se omiten handshake, TLS, fragmentación y respuestas para concentrarse en las PDU.</p></div>
}
