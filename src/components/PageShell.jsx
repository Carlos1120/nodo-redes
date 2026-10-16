import React from 'react'

export default function PageShell({ eyebrow, title, intro, children }){
  return <main className="page-shell">
    <header className="page-hero container">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{intro}</p>
    </header>
    {children}
  </main>
}
