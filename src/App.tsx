import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import Confirmacion from './pages/Confirmacion'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/checkout"     element={<Checkout />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
