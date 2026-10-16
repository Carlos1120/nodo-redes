import { useEffect } from 'react'

export default function useSectionReveal(route) {
  useEffect(() => {
    const elements = [...document.querySelectorAll('main section, .content-stack > *')]
    elements.forEach((element) => element.classList.add('network-reveal'))
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('network-reveal-visible')
        observer.unobserve(entry.target)
      }
    }), { rootMargin: '0px 0px -8%', threshold: .08 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [route])
}
