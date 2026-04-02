import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Prizes from '../components/Prizes'
import HowToParticipate from '../components/HowToParticipate'
import TicketGrid from '../components/TicketGrid'
import Footer from '../components/Footer'
import CartBar from '../components/CartBar'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    // Confirmacion.tsx navega con { state: { scrollTo: 'boletas' } }
    if (location.state?.scrollTo === 'boletas') {
      // Pequeño delay para que el DOM termine de renderizar
      setTimeout(() => {
        document.getElementById('boletas')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.state])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Prizes />
        <HowToParticipate />
        <TicketGrid />
        <Footer />
      </main>
      <CartBar />
    </>
  )
}
