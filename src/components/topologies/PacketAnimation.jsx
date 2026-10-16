import React, { useRef } from 'react'

function edgePath(topology, item) {
  if (item.path) return item.path
  const start = topology.nodes[item.a]
  const end = topology.nodes[item.b]
  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`
}

export default function PacketAnimation({ topology, stage, progress, status, activeEdges, completedEdges, origin, destination, onSelectNode }) {
  const pathRefs = useRef({})
  const activeSet = new Set(activeEdges)
  const completedSet = new Set(completedEdges)
  const arrivalSet = new Set(progress >= 1 ? stage?.arrivals || [] : [])
  const packetPosition = (segment) => {
    const path = pathRefs.current[segment.edgeId]
    const item = topology.edges.find((candidate) => candidate.id === segment.edgeId)
    const fallback = topology.nodes[segment.from]
    if (!path || !item) return fallback
    const length = path.getTotalLength()
    const forward = segment.from === item.a
    return path.getPointAtLength(length * (forward ? progress : 1 - progress))
  }

  return (
    <svg viewBox="0 0 100 100" className="topology-svg" role="img" aria-label={`Topología ${topology.id}. Selecciona los dispositivos para cambiar origen y destino.`}>
      <defs><filter id={`packet-glow-${topology.id}`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
      <g className="topology-connections">
        {topology.edges.map((item) => (
          <g key={item.id}>
            <path ref={(element) => { pathRefs.current[item.id] = element }} d={edgePath(topology, item)} className="topo-line" />
            {(activeSet.has(item.id) || completedSet.has(item.id)) && <path d={edgePath(topology, item)} className={`topo-line-highlight ${activeSet.has(item.id) ? 'active' : 'complete'}`} />}
          </g>
        ))}
      </g>
      {Object.values(topology.nodes).map((item) => {
        if (item.kind === 'junction') return <circle key={item.id} cx={item.x} cy={item.y} r="1.15" className="topo-junction" />
        const classes = ['topology-node', item.kind, item.id === origin ? 'origin' : '', item.id === destination ? 'destination' : '', arrivalSet.has(item.id) ? 'receiving' : ''].filter(Boolean).join(' ')
        return (
          <g key={item.id} className={classes} transform={`translate(${item.x} ${item.y})`} role={item.selectable ? 'button' : undefined} tabIndex={item.selectable ? 0 : undefined} aria-label={item.selectable ? `${item.label}. Seleccionar dispositivo.` : item.label} onClick={item.selectable ? () => onSelectNode(item.id) : undefined} onKeyDown={item.selectable ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelectNode(item.id) } } : undefined}>
            <circle r={item.kind === 'device' ? 5.5 : 7} className="topo-node-shape" />
            <circle r="1.45" className="topo-node-core" />
            <text y={item.kind === 'device' ? 10 : 11.5} className="topo-node-label">{item.label}</text>
          </g>
        )
      })}
      {['running', 'paused'].includes(status) && stage?.segments.map((segment, index) => {
        const point = packetPosition(segment)
        return (
          <g key={`${segment.edgeId}-${index}`} transform={`translate(${point.x} ${point.y})`} className={status === 'paused' ? 'data-packet paused' : 'data-packet'}>
            <circle r="4.4" className="packet-halo" /><circle r="2.35" className="packet-body" filter={`url(#packet-glow-${topology.id})`} /><path d="M -1.1 -.55 L 0 -.05 L 1.1 -.55 M -1.1 .55 L 0 .05 L 1.1 .55" className="packet-mark" />
          </g>
        )
      })}
    </svg>
  )
}
