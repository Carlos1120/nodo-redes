import React, { useState } from 'react'
import EncapsulationDemo from './EncapsulationDemo'
import PracticeLink from './PracticeLink'

const layers = [
  { number:'7', name:'Aplicación', simple:'Ofrece servicios de red directamente a las aplicaciones del usuario.', concepts:['HTTP','HTTPS','DNS'], device:'Hosts y servidores' },
  { number:'6', name:'Presentación', simple:'Prepara los datos: cambia su formato, los comprime o los cifra.', concepts:['Formato','Cifrado','Compresión'], device:'Software' },
  { number:'5', name:'Sesión', simple:'Abre, mantiene y termina la conversación entre aplicaciones.', concepts:['Sesiones','Control de diálogo'], device:'Hosts' },
  { number:'4', name:'Transporte', simple:'Entrega información entre aplicaciones utilizando puertos.', concepts:['TCP','UDP','Puertos'], device:'Hosts' },
  { number:'3', name:'Red', simple:'Permite que la información viaje entre redes diferentes.', concepts:['IP','Router','Paquete','Enrutamiento'], device:'Router', practice:'lab-02' },
  { number:'2', name:'Enlace de datos', simple:'Mueve información dentro de una red local utilizando direcciones MAC.', concepts:['MAC','Switch','Trama','Ethernet'], device:'Switch', practice:'lab-01' },
  { number:'1', name:'Física', simple:'Convierte los datos en bits y señales que recorren cable, fibra u ondas.', concepts:['Bits','Señal','Cable','Wi-Fi'], device:'Medios y puertos', practice:'lab-03' },
]

export default function OSIStack({ showEncapsulation = false }) {
  const [active,setActive]=useState(3)
  const layer=layers[active]
  return <div className={showEncapsulation ? 'osi-experience' : ''}>
    <div className="osi-wrap">
      <div className="osi-stack" role="tablist" aria-label="Capas del modelo OSI">
        {layers.map((item,index)=><button type="button" role="tab" aria-selected={active===index} key={item.number} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)} className={`osi-layer ${active===index?'active':'muted'} ${index<4?'host-layer':'infra-layer'}`}><span>{item.number}</span><strong>{item.name}</strong></button>)}
      </div>
      <div className="osi-detail" role="tabpanel">
        <span className="eyebrow">CAPA {layer.number}</span>
        <h3>{layer.name}</h3>
        <p>{layer.simple}</p>
        <div className="osi-concepts">{layer.concepts.map((concept)=><code key={concept}>{concept}</code>)}</div>
        <div className="osi-device"><span>Relacionado con</span><strong>{layer.device}</strong></div>
        {layer.practice && <PracticeLink target={layer.practice}>Verlo en una práctica</PracticeLink>}
        <div className="osi-group-note">{active < 4 ? 'Capas 4–7 · aplicaciones y hosts' : 'Capas 1–3 · infraestructura'}</div>
      </div>
    </div>
    {showEncapsulation && <EncapsulationDemo />}
  </div>
}
