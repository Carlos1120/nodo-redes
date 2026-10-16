import React, { useEffect, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

const sessions = {
  ping: {
    label: 'PING', command: 'ping 192.168.10.20',
    output: ['Pinging 192.168.10.20 with 32 bytes of data:', '', 'Reply from 192.168.10.20: bytes=32 time<1ms TTL=128', 'Reply from 192.168.10.20: bytes=32 time<1ms TTL=128', 'Reply from 192.168.10.20: bytes=32 time<1ms TTL=128', 'Reply from 192.168.10.20: bytes=32 time<1ms TTL=128', '', 'Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)'],
  },
  ipconfig: {
    label: 'IPCONFIG', command: 'ipconfig',
    output: ['FastEthernet0 Connection:', '', 'IPv4 Address...........: 192.168.10.10', 'Subnet Mask............: 255.255.255.0', 'Default Gateway........: 192.168.10.1'],
  },
}

export default function NetworkTerminal() {
  const [session, setSession] = useState('ping')
  const [phase, setPhase] = useState('idle')
  const [typed, setTyped] = useState('')
  const [visibleLines, setVisibleLines] = useState(0)
  const reducedMotion = useReducedMotion()
  const current = sessions[session]

  useEffect(() => {
    if (phase === 'typing') {
      if (typed.length >= current.command.length) {
        const pause = window.setTimeout(() => setPhase('output'), 260)
        return () => window.clearTimeout(pause)
      }
      const timer = window.setTimeout(() => setTyped(current.command.slice(0, typed.length + 1)), 32)
      return () => window.clearTimeout(timer)
    }
    if (phase === 'output') {
      if (visibleLines >= current.output.length) { setPhase('complete'); return undefined }
      const timer = window.setTimeout(() => setVisibleLines((value) => value + 1), 210)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [phase, typed, visibleLines, current])

  const reset = (nextSession = session) => { setSession(nextSession); setPhase('idle'); setTyped(''); setVisibleLines(0) }
  const run = () => {
    if (reducedMotion) { setTyped(current.command); setVisibleLines(current.output.length); setPhase('complete'); return }
    setTyped(''); setVisibleLines(0); setPhase('typing')
  }

  return (
    <section id="network-terminal" className="network-terminal-section" aria-labelledby="terminal-title">
      <div className="terminal-intro"><span className="eyebrow">PRUEBA DE CONECTIVIDAD</span><h2 id="terminal-title">Los comandos también cuentan la historia.</h2><p>Ejecuta una prueba como en la consola de un PC dentro de Packet Tracer y observa qué confirma cada resultado.</p></div>
      <div className="network-terminal">
        <div className="terminal-bar"><span><i /> PC Command Prompt</span><div role="tablist" aria-label="Comando de red">{Object.entries(sessions).map(([key,item]) => <button type="button" role="tab" aria-selected={session===key} className={session===key?'active':''} key={key} onClick={() => reset(key)}>{item.label}</button>)}</div></div>
        <div className="terminal-screen" aria-live="polite"><p>Packet Tracer PC Command Line 1.0</p><p><b>C:\&gt;</b>{typed}<i className={phase === 'typing' ? 'terminal-cursor' : ''} /></p>{current.output.slice(0, visibleLines).map((line,index) => <p key={`${line}-${index}`} className={line.includes('0% loss') ? 'terminal-success' : ''}>{line || '\u00a0'}</p>)}</div>
        <div className="terminal-actions"><button type="button" className="terminal-run" onClick={run} disabled={['typing','output'].includes(phase)}>▶ {phase==='complete'?'Ejecutar de nuevo':`Ejecutar ${current.label.toLowerCase()}`}</button><button type="button" onClick={() => reset()} disabled={phase==='idle'}>↻ Reiniciar</button></div>
      </div>
    </section>
  )
}
