import React, { useEffect, useMemo, useRef, useState } from 'react'
import PacketAnimation from './topologies/PacketAnimation'
import TopologyControls from './topologies/TopologyControls'
import TopologyExplanation from './topologies/TopologyExplanation'
import { getAnimationPlan, modeDescriptions, topologies } from './topologies/topologyData'
import useReducedMotion from '../hooks/useReducedMotion'

const MOVE_DURATION = 900
const NODE_PAUSE = 300

export default function Topologies() {
  const [active, setActive] = useState('Estrella')
  const [mode, setMode] = useState('unicast')
  const [origin, setOrigin] = useState(topologies.Estrella.defaults[0])
  const [destination, setDestination] = useState(topologies.Estrella.defaults[1])
  const [selectionRole, setSelectionRole] = useState('origin')
  const [status, setStatus] = useState('idle')
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [routeVariant, setRouteVariant] = useState(0)
  const [notice, setNotice] = useState('Selecciona un origen o inicia la ruta sugerida.')
  const elapsedRef = useRef(0)
  const reducedMotion = useReducedMotion()
  const topology = topologies[active]
  const plan = useMemo(() => getAnimationPlan(topology, origin, destination, mode, routeVariant), [topology, origin, destination, mode, routeVariant])

  const resetAnimation = (message = 'La simulación está lista para comenzar.') => {
    elapsedRef.current = 0
    setStatus('idle')
    setStepIndex(0)
    setProgress(0)
    setNotice(message)
  }

  useEffect(() => {
    if (status !== 'running' || reducedMotion) return undefined
    let frame
    let lastTime
    const tick = (time) => {
      if (lastTime === undefined) lastTime = time
      elapsedRef.current += time - lastTime
      lastTime = time
      setProgress(Math.min(elapsedRef.current / MOVE_DURATION, 1))
      if (elapsedRef.current >= MOVE_DURATION + NODE_PAUSE) {
        elapsedRef.current = 0
        if (stepIndex >= plan.stages.length - 1) {
          setProgress(1)
          setStatus('completed')
          setNotice(mode === 'broadcast' ? 'Todos los dispositivos alcanzables recibieron el mensaje.' : `El paquete llegó a ${topology.nodes[destination].label}.`)
          return
        }
        setStepIndex((current) => current + 1)
        setProgress(0)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [status, stepIndex, plan.stages.length, reducedMotion, mode, destination, topology.nodes])

  const start = () => {
    if (reducedMotion) {
      setStepIndex(Math.max(plan.stages.length - 1, 0))
      setProgress(1)
      setStatus('completed')
      setNotice('Movimiento reducido activo: se muestra la ruta completa resaltada.')
      return
    }
    if (status === 'completed') {
      if (active === 'Malla' && mode === 'unicast') setRouteVariant((value) => value + 1)
      elapsedRef.current = 0
      setStepIndex(0)
      setProgress(0)
    }
    setStatus('running')
    setNotice('El paquete está recorriendo la red.')
  }

  const pause = () => {
    setStatus('paused')
    setNotice('Simulación pausada en el punto actual.')
  }

  const changeTopology = (name) => {
    const next = topologies[name]
    setActive(name)
    setOrigin(next.defaults[0])
    setDestination(next.defaults[1])
    setSelectionRole('origin')
    setRouteVariant(0)
    resetAnimation(`Ruta sugerida cargada para la topología ${name.toLowerCase()}.`)
  }

  const changeMode = (nextMode) => {
    setMode(nextMode)
    resetAnimation(nextMode === 'broadcast' ? 'Broadcast listo: el mensaje se propagará por la red local.' : 'Envío normal listo: se usará solo el camino necesario.')
  }

  const selectNode = (nodeId) => {
    if (selectionRole === 'origin') {
      if (nodeId === destination) {
        setNotice('El origen y el destino deben ser dispositivos diferentes.')
        return
      }
      setOrigin(nodeId)
      setSelectionRole('destination')
      resetAnimation(`Origen actualizado a ${topology.nodes[nodeId].label}. Ahora elige el destino.`)
      return
    }
    if (nodeId === origin) {
      setNotice('El destino no puede ser el mismo dispositivo de origen.')
      return
    }
    setDestination(nodeId)
    setSelectionRole('origin')
    resetAnimation(`Destino actualizado a ${topology.nodes[nodeId].label}. La ruta está lista.`)
  }

  const completedEdges = status === 'completed' ? plan.routeEdges : plan.stages.slice(0, stepIndex).flatMap((stage) => stage.segments.map((segment) => segment.edgeId))
  const currentStage = plan.stages[stepIndex] || plan.stages[0]
  const activeEdges = ['running', 'paused'].includes(status) ? currentStage?.segments.map((segment) => segment.edgeId) || [] : []

  return (
    <div className="topology-shell">
      <div className="topology-tabs" role="tablist" aria-label="Seleccionar topología">
        {Object.keys(topologies).map((name) => (
          <button key={name} type="button" role="tab" aria-selected={active === name} onClick={() => changeTopology(name)} className={active === name ? 'active' : ''}>{name}</button>
        ))}
      </div>
      <div className="topology-stage">
        <div className="topology-visualizer">
          <PacketAnimation topology={topology} stage={currentStage} progress={progress} status={status} activeEdges={activeEdges} completedEdges={completedEdges} origin={origin} destination={destination} onSelectNode={selectNode} />
          <div className="node-selection" aria-label="Selección de dispositivos">
            <button type="button" className={selectionRole === 'origin' ? 'active origin' : 'origin'} onClick={() => setSelectionRole('origin')}><span>Origen</span>{topology.nodes[origin].label}</button>
            <span aria-hidden="true">→</span>
            <button type="button" className={selectionRole === 'destination' ? 'active destination' : 'destination'} onClick={() => setSelectionRole('destination')}><span>Destino</span>{topology.nodes[destination].label}</button>
          </div>
          <TopologyControls status={status} onStart={start} onPause={pause} onReset={() => resetAnimation()} />
        </div>
        <div className="topology-copy">
          <span className="eyebrow">TOPOLOGÍA ACTIVA</span>
          <h3>{active}</h3>
          <p>{topology.text}</p>
          <div className="traffic-modes" aria-label="Modo de envío">
            {Object.entries(modeDescriptions).map(([key, item]) => (
              <button key={key} type="button" className={mode === key ? 'active' : ''} aria-pressed={mode === key} onClick={() => changeMode(key)}><strong>{item.label}</strong><span>{item.description}</span></button>
            ))}
          </div>
          <TopologyExplanation topology={topology} stage={currentStage} stepIndex={stepIndex} totalSteps={plan.stages.length} status={status} mode={mode} destination={destination} />
          {active === 'Malla' && <p className="topology-note">La malla ofrece varios caminos posibles entre dispositivos. Cada nueva simulación puede elegir una ruta válida distinta.</p>}
          <span className="topology-status" role="status" aria-live="polite">{notice}</span>
        </div>
      </div>
    </div>
  )
}
