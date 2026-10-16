import React, { useState } from 'react'
import PracticeLink from './PracticeLink'

export default function DeviceExplorer({ devices }) {
  const [active, setActive] = useState(2)
  const selected = devices[active]
  return <div className="device-explorer">
    <div className="device-river" role="tablist" aria-label="Dispositivos de red">
      {devices.map((device,index) => <button type="button" role="tab" aria-selected={active===index} key={device.name} className={active===index?'active':''} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>0{index+1}</span><i aria-hidden="true" /><strong>{device.name}</strong></button>)}
    </div>
    <div className="device-detail" role="tabpanel"><div><span className="eyebrow">DISPOSITIVO ACTIVO</span><h3>{selected.name}</h3><p>{selected.detail}</p></div><div className="device-tags">{selected.tags.map((tag) => <code key={tag}>{tag}</code>)}</div>{selected.practice && <PracticeLink target={selected.practice}>{selected.practiceLabel}</PracticeLink>}</div>
  </div>
}
