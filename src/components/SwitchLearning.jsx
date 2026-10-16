import React, { useState } from 'react'

export default function SwitchLearning(){
  const [step,setStep]=useState(0)
  const steps=[
    ['01','Llega información','PC1 envía algo y el switch ve por qué puerto entró.'],
    ['02','Aprende la MAC','Guarda una relación sencilla: MAC de PC1 → Puerto 1.'],
    ['03','Busca el destino','Si ya conoce la MAC de destino, envía solamente por el puerto correcto.'],
    ['04','Si no sabe, pregunta','Si no conoce el destino, envía por varios puertos. A esto se le llama flooding.'],
  ]
  return <div className="switch-demo">
    <div className="switch-scene">
      <div className="mini-device d1">PC1<span>AA:01</span></div>
      <div className="mini-switch"><span>2960</span><i className={step>=0?'learned':''}></i><i className={step>=2?'learned':''}></i><i></i></div>
      <div className="mini-device d2">PC2<span>BB:02</span></div>
      <div className={`packet-mini p${step}`}>DATA</div>
    </div>
    <div className="switch-copy">
      <span className="eyebrow">APRENDIZAJE DEL SWITCH</span>
      <h3>{steps[step][0]} · {steps[step][1]}</h3>
      <p>{steps[step][2]}</p>
      <div className="step-dots">{steps.map((s,i)=><button key={i} onClick={()=>setStep(i)} className={i===step?'active':''} aria-label={`Paso ${i+1}`}></button>)}</div>
    </div>
  </div>
}
