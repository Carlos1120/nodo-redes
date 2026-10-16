import React from 'react'

function stepMessage(topology, stage, mode, destination) {
  if (!stage) return 'La ruta está lista para comenzar.'
  const arrivals = stage.arrivals.map((id) => topology.nodes[id]).filter(Boolean)
  const devices = arrivals.filter((item) => item.kind === 'device')
  const infrastructure = arrivals.find((item) => !['device', 'junction'].includes(item.kind))
  if (mode === 'broadcast' && stage.segments.length > 1) {
    if (topology.id === 'Bus') return 'La señal se propaga en ambas direcciones por el cable compartido.'
    return `El mensaje se replica hacia ${arrivals.map((item) => item.label).filter(Boolean).join(', ')}.`
  }
  if (infrastructure?.kind === 'root') return 'El paquete alcanza el nodo principal y cruza al otro ramal.'
  if (infrastructure?.kind === 'switch') return `${infrastructure.label} recibe el paquete y determina el siguiente enlace.`
  if (topology.id === 'Bus' && arrivals.some((item) => item.kind === 'junction')) return 'La señal avanza por el cable principal compartido.'
  if (devices.some((item) => item.id === destination) && mode === 'unicast') return `El paquete llega a ${topology.nodes[destination].label}.`
  if (topology.id === 'Anillo' && devices.length) return `El paquete pasa por ${devices[0].label} y continúa por el anillo.`
  if (devices.length) return `${devices.map((item) => item.label).join(', ')} ${devices.length > 1 ? 'reciben' : 'recibe'} el mensaje.`
  return 'El paquete continúa por la conexión seleccionada.'
}

export default function TopologyExplanation({ topology, stage, stepIndex, totalSteps, status, mode, destination }) {
  const message = status === 'idle' ? (mode === 'broadcast' ? 'El origen enviará una copia a todos los dispositivos alcanzables.' : `La ruta conecta el origen únicamente con ${topology.nodes[destination].label}.`) : status === 'completed' ? (mode === 'broadcast' ? 'Broadcast completado: la red local recibió el mensaje.' : `Entrega completada en ${topology.nodes[destination].label}.`) : stepMessage(topology, stage, mode, destination)
  return <div className="topology-explanation"><span>{status === 'completed' ? 'RECORRIDO COMPLETO' : `PASO ${Math.min(stepIndex + 1, totalSteps)} DE ${totalSteps}`}</span><p>{message}</p></div>
}
