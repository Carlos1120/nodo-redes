import React, { useState } from 'react'
const steps = [
  ['Sin caché', 'PC0 necesita la MAC de PC1 (192.168.10.2), en su misma subred. El switch no consulta ARP para aprender.'],
  ['Solicitud ARP · broadcast', 'PC0 pregunta «¿quién tiene 192.168.10.2?». Ethernet destino FF:FF:FF:FF:FF:FF. S1 aprende el origen PC0 y difunde por los otros tres puertos, aunque ya conociera la MAC de PC1.'],
  ['Respuesta ARP · unicast', 'Solo PC1 responde con su MAC 02:00:00:00:00:02. S1 aprende PC1 al recibir la respuesta y la entrega al puerto de PC0 ya conocido.'],
  ['Caché y comunicación', 'PC0 guarda 192.168.10.2 ↔ 02:00:00:00:00:02 y ya puede enviar la trama unicast. Caché ARP del host y tabla MAC del switch son tablas diferentes.'],
]
export default function ArpDemo() {
  const [step, setStep] = useState(0)
  return <div className="sim-panel"><span className="eyebrow">EJEMPLO INDEPENDIENTE · ARP PARA IPv4</span><h3>Preguntar por una IP en el enlace local.</h3><ol className="arp-track">{steps.map(([title], i) => <li key={title} className={step === i ? 'current' : ''}>{title}</li>)}</ol><div className="sim-event" role="status"><h4>{steps[step][0]}</h4><p>{steps[step][1]}</p>{step === 3 && <code>192.168.10.2 → 02:00:00:00:00:02</code>}</div><div className="sim-controls"><button disabled={!step} onClick={() => setStep(s => s - 1)}>Anterior ARP</button><button disabled={step === 3} onClick={() => setStep(s => s + 1)}>Siguiente ARP</button><button onClick={() => setStep(0)}>Reiniciar ARP</button></div><p className="small-copy">Hacia otra subred, PC0 busca la MAC del gateway. El broadcast ARP no atraviesa normalmente el router. Flooding de unicast desconocido y difusión de broadcast pueden usar las mismas salidas, pero tienen causas distintas.</p></div>
}
