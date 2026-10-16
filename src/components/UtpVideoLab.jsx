import React, { useState } from 'react'

/**
 * Registro audiovisual del taller de ponchado UTP.
 * No implica que las prácticas en Packet Tracer estén acreditadas.
 * Los medios estáticos se distribuyen desde public/videos/.
 */
export default function UtpVideoLab() {
  const [unavailable, setUnavailable] = useState(false)
  const video = `${import.meta.env.BASE_URL}videos/ponchado-utp-rj45.mp4`
  const poster = `${import.meta.env.BASE_URL}videos/ponchado-utp-rj45-poster.jpg`

  return <section className="sim-panel utp-video-lab" aria-labelledby="utp-video-title">
    <div className="sim-heading">
      <div>
        <span className="eyebrow">TALLER AUDIOVISUAL · CABLEADO ESTRUCTURADO</span>
        <h3 id="utp-video-title">Ponchado de cable UTP con conector RJ45</h3>
        <p>Observa cómo se prepara un cable de par trenzado, se ordenan sus conductores, se instala el conector y se comprueba la continuidad con un probador.</p>
      </div>
      <span className="sim-badge">02:22 · MP4</span>
    </div>
    <div className="utp-video-grid">
      <div>
        {!unavailable
          ? <video className="utp-video-player" controls playsInline preload="metadata" poster={poster} onError={() => setUnavailable(true)} aria-label="Video del proceso de ponchado de un cable UTP">
              <source src={video} type="video/mp4" />
              Tu navegador no admite la reproducción de este video MP4.
            </video>
          : <div className="utp-video-missing" role="status"><strong>Video pendiente de publicar</strong><p>El reproductor ya está preparado. Falta añadir el MP4 a <code>public/videos/</code> en esta rama.</p></div>}
        <p className="small-copy">Video educativo compartido para acompañar el taller. La grabación no sustituye las evidencias de una práctica realizada por el grupo ni certifica el resultado del cable.</p>
      </div>
      <div className="utp-video-guide">
        <h4>¿Qué observar durante la demostración?</h4>
        <ol>
          <li><strong>Preparar:</strong> medir y retirar cuidadosamente una parte de la cubierta exterior sin cortar los conductores.</li>
          <li><strong>Ordenar:</strong> disponer los ocho hilos según T568A o T568B. Para un cable directo se utiliza el mismo esquema en ambos extremos.</li>
          <li><strong>Terminar:</strong> alinear, recortar, introducir hasta el fondo del conector 8P8C (habitualmente llamado RJ45) y crimpar con la herramienta apropiada.</li>
          <li><strong>Verificar:</strong> usar un probador para comprobar el orden de pares y detectar posibles fallas, sin confundir continuidad con certificación de categoría.</li>
        </ol>
      </div>
    </div>
    <details className="utp-standards">
      <summary>T568A y T568B: orden de los ocho conductores</summary>
      <p><strong>T568A:</strong> blanco/verde, verde, blanco/naranja, azul, blanco/azul, naranja, blanco/marrón, marrón.</p>
      <p><strong>T568B:</strong> blanco/naranja, naranja, blanco/verde, azul, blanco/azul, verde, blanco/marrón, marrón.</p>
      <p>En ambos casos observa el conector desde la misma orientación al comparar los pines 1 a 8. La elección del estándar debe verificarse en los dos extremos.</p>
    </details>
  </section>
}
