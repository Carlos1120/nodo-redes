import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Fundamentos from './pages/Fundamentos'
import Arquitectura from './pages/Arquitectura'
import Infraestructura from './pages/Infraestructura'
import Labs from './pages/Labs'
import Evidencias from './pages/Evidencias'
import NetworkBackdrop from './components/NetworkBackdrop'
import useSectionReveal from './hooks/useSectionReveal'
import SegundoCorte from './pages/SegundoCorte'

const routes = {
  inicio: Home,
  fundamentos: Fundamentos,
  arquitectura: Arquitectura,
  infraestructura: Infraestructura,
  labs: Labs,
  evidencias: Evidencias,
  'segundo-corte': SegundoCorte,
}

export default function App(){
  const currentHash=()=>window.location.hash.replace('#/','') || 'inicio'
  const [route,setRoute]=useState(currentHash())
  const [menu,setMenu]=useState(false)
  useEffect(()=>{const h=()=>{setRoute(currentHash()); setMenu(false); window.scrollTo({top:0,behavior:'smooth'})}; window.addEventListener('hashchange',h); return()=>window.removeEventListener('hashchange',h)},[])
  const go=(name)=>{window.location.hash=`/${name}`}
  const Page=routes[route.split('/')[0]] || Home
  useSectionReveal(route)
  const nav=[['inicio','Inicio'],['fundamentos','Fundamentos'],['arquitectura','Arquitectura'],['infraestructura','Infraestructura'],['labs','Packet Tracer'],['evidencias','Evidencias'],['segundo-corte','2.° corte']]
  return <div className="app-shell">
    <NetworkBackdrop global />
    <header className="site-nav"><button className="brand" onClick={()=>go('inicio')}><span>N</span><strong>NODO</strong><small>REDES EN MOVIMIENTO</small></button><nav className={menu?'open':''}>{nav.map(([r,l])=><button key={r} className={route===r?'active':''} onClick={()=>go(r)}>{l}</button>)}</nav><button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Abrir navegación">{menu?'×':'☰'}</button></header>
    <Page go={go} route={route}/>
    <footer className="site-footer"><div className="container"><div><strong>NODO</strong><span>Redes · Cisco CCNA 1 · Packet Tracer</span></div><div><span>Carlos Mario Peña</span><span>Santiago Ortiz Ochoa</span></div><small>Proyecto académico en crecimiento · 2026</small></div></footer>
  </div>
}
