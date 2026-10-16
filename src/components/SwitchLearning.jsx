import React, { useState } from 'react'
import { BROADCAST, hosts, receiveFrame } from '../lib/network'
import useReducedMotion from '../hooks/useReducedMotion'

export default function SwitchLearning() {
  const [table, setTable] = useState({}), [origin, setOrigin] = useState('PC0'), [destination, setDestination] = useState('PC1')
  const [moved, setMoved] = useState(false), [event, setEvent] = useState(null), [count, setCount] = useState(0)
  const reduced = useReducedMotion()
  const devices = hosts.map(h => h.id === 'PC2' && moved ? { ...h, port: 'Fa0/10' } : h)
  function send() {
    const source = devices.find(h => h.id === origin), target = devices.find(h => h.id === destination)
    const result = receiveFrame(table, { source: source.mac, destination: target?.mac || BROADCAST, ingress: source.port }, devices)
    setTable(result.table); setEvent(result); setCount(n => n + 1)
  }
  function reset() { setTable({}); setEvent(null); setCount(0); setMoved(false); setOrigin('PC0'); setDestination('PC1') }
  const points = [[100, 65], [500, 65], [100, 285], [500, 285]]
  return <div className="sim-panel mac-simulator">
    <div className="sim-heading"><div><span className="eyebrow">SWITCH 2960 · VLAN 1</span><h3>Aprender del origen. Decidir por el destino.</h3></div><span className="sim-badge">{count} tramas</span></div>
    <div className="sim-split"><div><svg className="network-svg" viewBox="0 0 600 350" role="img" aria-label="Cuatro computadores conectados a un switch central; los enlaces resaltados son las salidas de la última trama">
      {devices.map((h, i) => { const [x, y] = points[i], active = event?.egress.includes(h.port); return <g key={h.id}>
        <path d={`M${x} ${y} L300 175`} className={active ? 'wire active-wire' : 'wire'} />
        <rect x={x - 68} y={y - 28} width="136" height="62" rx="12" className={h.id === origin ? 'device-node selected' : 'device-node'}/>
        <text x={x} y={y - 6}>{h.id} · {h.port}</text><text x={x} y={y + 15} className="mac-label">{h.mac}</text>
        {event && event.ingress === h.port && <circle key={`in-${count}`} cx={reduced ? 300 : 0} cy={reduced ? 175 : 0} r="5" className="frame-dot">{!reduced && <animateMotion dur=".65s" fill="freeze" path={`M${x} ${y} L300 175`}/>}</circle>}
        {active && <circle key={`out-${count}`} cx={reduced ? x : 0} cy={reduced ? y : 0} r="5" className="frame-dot">{!reduced && <animateMotion dur=".75s" begin=".65s" fill="freeze" path={`M300 175 L${x} ${y}`}/>}</circle>}
      </g> })}
      <rect x="225" y="145" width="150" height="60" rx="12" className="device-node switch-node"/><text x="300" y="170">SWITCH S1</text><text x="300" y="190" className="mac-label">VLAN 1 · puertos de acceso</text>
    </svg><div className="device-legend">{devices.map(h => <div key={h.id}><strong>{h.id} · {h.port}</strong><code>{h.mac}</code><small>{h.ip}/24</small></div>)}</div><div className="sim-controls"><label>Origen<select value={origin} onChange={e => { setOrigin(e.target.value); setEvent(null) }}>{devices.map(h => <option key={h.id}>{h.id}</option>)}</select></label><label>Destino<select value={destination} onChange={e => { setDestination(e.target.value); setEvent(null) }}>{devices.map(h => <option key={h.id}>{h.id}</option>)}<option value="broadcast">Broadcast</option></select></label><button onClick={send}>Enviar trama</button><button onClick={reset}>Reiniciar switch</button></div>
    <label className="check-label"><input type="checkbox" checked={moved} onChange={e => { setMoved(e.target.checked); setEvent(null) }}/> Mover PC2 a Fa0/10 (aprende el cambio cuando PC2 envíe)</label><p className="small-copy">Tramas Ethernet explícitas, sin respuesta automática. Origen y destino iguales permiten observar filtrado por el puerto de entrada. Modelo sin envejecimiento automático, STP ni errores de enlace.</p></div>
    <div><h4>Tabla MAC dinámica</h4><div className="table-scroll"><table><thead><tr><th>VLAN</th><th>MAC</th><th>Puerto</th></tr></thead><tbody>{Object.values(table).map(row => <tr key={`${row.vlan}/${row.mac}`}><td>{row.vlan}</td><td><code>{row.mac}</code></td><td>{row.port}</td></tr>)}{!Object.keys(table).length && <tr><td colSpan="3">Tabla vacía: genera tráfico.</td></tr>}</tbody></table></div><div className="sim-event" role="status">{event ? <><strong>{event.action}</strong><p>Aprendió {event.source} en {event.ingress}.</p><p>Destino: {event.destination}. Salidas: {event.egress.join(', ') || 'ninguna'}.</p></> : <p>Aprende la MAC de origen de cada trama; no aprende un destino que permanece en silencio.</p>}</div></div></div>
  </div>
}
