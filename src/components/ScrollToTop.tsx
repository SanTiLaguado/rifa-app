import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Sube al top en cada cambio de ruta
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
