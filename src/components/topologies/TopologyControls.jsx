import React from 'react'

export default function TopologyControls({ status, onStart, onPause, onReset }) {
  return (
    <div className="topology-controls" aria-label="Controles de simulación">
      <button type="button" className="simulate" onClick={onStart} disabled={status === 'running'}><span aria-hidden="true">▶</span>{status === 'paused' ? 'Continuar' : status === 'completed' ? 'Simular de nuevo' : 'Simular paquete'}</button>
      <button type="button" onClick={onPause} disabled={status !== 'running'}><span aria-hidden="true">⏸</span>Pausar</button>
      <button type="button" onClick={onReset} disabled={status === 'idle'}><span aria-hidden="true">↻</span>Reiniciar</button>
    </div>
  )
}
