import React, { useState } from 'react'
import { inspectMac } from '../lib/network'
export default function MacInspector() {
  const [input, setInput] = useState('3CD9.2B7A.10F4')
  let info, error
  try { info = inspectMac(input) } catch (e) { error = e.message }
  return <div className="sim-panel"><span className="eyebrow">48 BITS · 6 OCTETOS · 12 DÍGITOS HEX</span><h3>Lee una MAC por dentro.</h3><label className="input-label">Dirección MAC<input value={input} onChange={e => setInput(e.target.value)} spellCheck="false"/></label>{error ? <p role="status">{error}</p> : <><p><strong>{info.mac} · {info.type}</strong> · bit U/L: {info.local ? '1 (administración local)' : '0 (administración universal)'}. Bit I/G: {info.octets[0] & 1}.</p><div className="octets">{info.octets.map((n, i) => <div key={i}><strong>{info.mac.split(':')[i]}</strong><code>{info.binary[i]}</code><span>{n} decimal</span></div>)}</div><p>Ejemplo: 3C = 3 × 16 + 12 = 60 = 00111100. Cada dígito hexadecimal representa cuatro bits.</p>{info.eui64 && <p>EUI-64 modificado: <code>{info.eui64}</code>. Se inserta FFFE y se invierte el bit U/L (XOR 0x02). Es un método de construcción de identificadores IPv6, no el único ni necesariamente el usado por un equipo moderno.</p>}</>}<p className="small-copy">En una asignación universal clásica MA-L, los primeros 24 bits corresponden al OUI y los restantes identifican la interfaz. Existen otros tamaños de asignación IEEE. Una MAC local o aleatoria no identifica de forma fiable al fabricante; tampoco es una prueba de identidad inmutable.</p></div>
}
