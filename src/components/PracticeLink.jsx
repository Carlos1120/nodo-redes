import React from 'react'

let pendingPracticeTarget = null

export function getPracticeTarget() {
  return pendingPracticeTarget || window.location.hash.replace('#/','').split('/')[1] || sessionStorage.getItem('nodo-practice-target')
}

export function clearPracticeTarget() {
  pendingPracticeTarget = null
  sessionStorage.removeItem('nodo-practice-target')
}

export function goToPractice(targetId, route = 'labs') {
  const reveal = () => {
    const target = document.getElementById(targetId)
    if (!target) return false
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    target.classList.add('practice-highlight')
    window.setTimeout(() => target.classList.remove('practice-highlight'), 1800)
    return true
  }
  const currentRoute = window.location.hash.replace('#/','') || 'inicio'
  if (currentRoute === route && reveal()) return
  pendingPracticeTarget = targetId
  sessionStorage.setItem('nodo-practice-target', targetId)
  window.location.hash = `/${route}/${targetId}`
}

export default function PracticeLink({ target, route = 'labs', children }) {
  return <button type="button" className="practice-link" onClick={() => goToPractice(target, route)}>{children}<span aria-hidden="true">→</span></button>
}
