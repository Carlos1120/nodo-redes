import React, { useState } from 'react'
import { calculateSubnet, shortenIpv6, selectRoute } from '../lib/thirdTerm'

const addresses = ['192.168.10.10', '192.168.20.10', '10.0.0.2', '8.8.8.8']
const routes = [
  { network: '192.168.10.0/24', via: 'G0/0', type: 'C · conectada' },
  { network: '10.0.0.0/30', via: 'G0/1', type: 'C · conectada' },
  { network: '192.168.20.0/24', via: '10.0.0.2', type: 'S · estática' },
  { network: '0.0.0.0/0', via: '10.0.0.2', type: 'S* · predeterminada' },
]
const stages = [
  ['Origen', 'El host añade IP de origen y destino al segmento: se forma el paquete.'],
  ['LAN', 'Para llegar al gateway, ARP descubre su MAC. La trama usa esa MAC como destino.'],
  ['Router', 'El router consulta la tabla, reduce el TTL y crea una trama nueva para el siguiente enlace.'],
  ['Destino', 'El host final retira el encabezado IP y entrega los datos a transporte.'],
]

function Panel({ label, title, children }) { return <div className="sim-panel third-sim"><span className="eyebrow">{label}</span><h2>{title}</h2>{children}</div> }
function Selector({ label, value, onChange, options }) { return <label>{label}<select value={value} onChange={e => onChange(e.target.value)}>{options.map(([v, name]) => <option key={v} value={v}>{name}</option>)}</select></label> }

export default function ThirdTermDemos({ id }) {
  const [stage, setStage] = useState(0)
  const [octet, setOctet] = useState(75)
  const [address, setAddress] = useState('192.168.10.75')
  const [prefix, setPrefix] = useState(26)
  const [ipv6, setIpv6] = useState('2001:0DB8:ACAD:0010:0000:0000:0000:0001')
  const [automatic, setAutomatic] = useState(false)
  const [destination, setDestination] = useState('192.168.20.10')
  const [returnRoute, setReturnRoute] = useState(false)
  const subnet = calculateSubnet(address, prefix)
  const route = selectRoute(destination, routes)
  const bits = Number(octet).toString(2).padStart(8, '0')
  return <div className="module-content">
    {id === 'capa-red' && <Panel label="VIAJE DEL PAQUETE" title="Sigue un paquete entre dos LAN."><p>Avanza por las cuatro etapas y observa qué hace la capa de red en cada una.</p><div className="third-stages">{stages.map(([name], i) => <button key={name} className={stage === i ? 'active' : ''} onClick={() => setStage(i)} aria-pressed={stage === i}>{name}</button>)}</div><div className="third-result"><strong>{stages[stage][0]}</strong><p>{stages[stage][1]}</p><code>PC0 → SW0 → R1 → R2 → SW1 → PC1</code></div><button className="action-btn" onClick={() => setStage((stage + 1) % stages.length)}>Siguiente etapa →</button></Panel>}

    {id === 'ipv4' && <Panel label="BITS Y OCTETOS" title="Descompón un octeto IPv4."><p>Cambia el último octeto de 192.168.10.75 y observa sus ocho bits y valores posicionales.</p><label>Último octeto <input type="number" min="0" max="255" value={octet} onChange={e => setOctet(Math.max(0, Math.min(255, Number(e.target.value) || 0)))}/></label><div className="third-bits">{bits.split('').map((bit, i) => <div key={i}><span>{128 >> i}</span><strong className={bit === '1' ? 'on' : ''}>{bit}</strong></div>)}</div><div className="third-result"><strong>192.168.10.{octet}</strong><p>En binario: 11000000.10101000.00001010.{bits}. Cada octeto tiene 8 bits; la dirección completa tiene 32.</p></div></Panel>}

    {(id === 'subredes' || id === 'ejemplo') && <Panel label={id === 'ejemplo' ? 'EJEMPLO /26' : 'CALCULADORA DE SUBREDES'} title="Cambia la IP y el prefijo; descubre el bloque."><p>El cálculo usa la operación AND entre IP y máscara. Prueba 192.168.10.75/26 y cambia a /27 para comparar.</p><div className="third-controls"><label>Dirección IPv4 <input value={address} onChange={e => setAddress(e.target.value)} inputMode="decimal"/></label><Selector label="Prefijo CIDR" value={prefix} onChange={v => setPrefix(Number(v))} options={Array.from({length:23}, (_,i) => [i+8, `/${i+8}`])}/></div>{subnet ? <><div className="third-metrics">{[['Máscara',subnet.mask],['Wildcard',subnet.wildcard],['Red',subnet.network],['Broadcast',subnet.broadcast],['HostMin',subnet.first],['HostMax',subnet.last],['Hosts útiles',subnet.hosts]].map(([name,value]) => <div key={name}><span>{name}</span><strong>{value}</strong></div>)}</div><div className="third-result"><p>Los últimos {32-prefix} bits pertenecen al host: 2^{32-prefix} = {subnet.block} direcciones. Se reservan red y broadcast; quedan {subnet.hosts} hosts utilizables.</p><code>{subnet.binary}</code></div></> : <p role="alert">Escribe una IPv4 válida con cuatro octetos entre 0 y 255.</p>}</Panel>}

    {id === 'ipv6' && <Panel label="DIRECCIÓN IPV6" title="Abrevia una dirección de 128 bits."><p>Los ceros iniciales de cada hexteto se omiten. Una secuencia continua de hextetos cero puede comprimirse una sola vez con ::.</p><label>Dirección completa <input value={ipv6} onChange={e => setIpv6(e.target.value)} spellCheck="false"/></label><div className="third-result"><span>Forma abreviada</span><strong>{shortenIpv6(ipv6) || 'Escribe ocho grupos hexadecimales completos.'}</strong></div><button className="action-btn" onClick={() => setAutomatic(!automatic)} aria-pressed={automatic}>{automatic ? 'Ver configuración manual' : 'Activar ejemplo de SLAAC'}</button><div className="third-result"><strong>{automatic ? 'SLAAC activo' : 'Configuración manual'}</strong><p>{automatic ? 'R1 anuncia 2001:DB8:ACAD:10::/64; el PC forma su identificador y usa FE80::1 como gateway. Requiere ipv6 unicast-routing en R1.' : 'El PC recibe una dirección /64 y un gateway IPv6 configurados por el estudiante.'}</p></div></Panel>}

    {id === 'routing' && <Panel label="TABLA DE ENRUTAMIENTO" title="Elige destino y observa la ruta."><p>R1 escoge la coincidencia más específica. Activa la ruta de regreso para completar el ping entre LAN.</p><Selector label="IP de destino desde PC0" value={destination} onChange={setDestination} options={addresses.map(a => [a,a])}/><div className="third-route-table">{routes.map(r => <div className={route === r ? 'selected' : ''} key={r.network}><span>{r.type}</span><code>{r.network}</code><strong>vía {r.via}</strong></div>)}</div><label className="third-checkbox"><input type="checkbox" checked={returnRoute} onChange={e => setReturnRoute(e.target.checked)}/> Ruta de regreso en R2 hacia 192.168.10.0/24</label><div className="third-result"><strong>{route?.network} → {route?.via}</strong><p>{destination === '192.168.20.10' ? (returnRoute ? 'R1 envía por 10.0.0.2 y R2 conoce el camino de regreso. El ping puede completarse.' : 'R1 conoce la ida, pero R2 aún no conoce la ruta de regreso. El ping falla.') : route?.type === 'C · conectada' ? 'El destino está en una red conectada directamente a R1.' : 'No hay una ruta más específica; se usa la ruta predeterminada.'}</p></div></Panel>}
  </div>
}
