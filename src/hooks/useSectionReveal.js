import { useEffect } from 'react'

export default function useSectionReveal(route) {
  useEffect(() => {
    // Observar bloques pequeños: un contenedor muy alto puede no llegar nunca
    // al umbral y dejar invisible todo su contenido.
    const elements = [...document.querySelectorAll('main > section:not(.content-stack), .content-stack > *')]
    elements.forEach((element) => element.classList.add('network-reveal'))
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('network-reveal-visible')
        observer.unobserve(entry.target)
      }
    }), { rootMargin: '0px 0px -8%', threshold: 0 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [route])
}
