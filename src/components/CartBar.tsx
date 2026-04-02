import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCOP } from '../services/api'

export default function CartBar() {
  const { selected, total } = useCart()
  const navigate = useNavigate()

  if (selected.length === 0) return null

  const sorted = [...selected].sort()

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-6 py-3"
      style={{
        background: 'linear-gradient(180deg, rgba(13,10,8,0.0) 0%, rgba(13,10,8,0.98) 18%)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,215,0,0.15)',
      }}
    >
      {/* Móvil: total + botón en fila, pills arriba */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

        {/* Fila de números — scroll horizontal en móvil para no romper layout */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0 min-w-0" style={{ scrollbarWidth: 'none' }}>
          <span className="text-oswald text-xs tracking-widest uppercase shrink-0" style={{ color: 'rgba(255,240,212,0.45)' }}>
            Puestos:
          </span>
          {sorted.map((num) => (
            <span
              key={num}
              className="text-bebas text-sm px-2 py-0.5 rounded shrink-0"
              style={{ background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.35)', color: '#FFD700' }}
            >
              {num}
            </span>
          ))}
        </div>

        {/* Total + botón — siempre visibles */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <div>
            <p className="text-oswald text-xs tracking-widest uppercase leading-none mb-0.5" style={{ color: 'rgba(255,240,212,0.45)' }}>
              Total
            </p>
            <p className="text-bebas text-lg leading-none" style={{ color: '#FFD700', textShadow: '0 0 16px rgba(255,215,0,0.5)' }}>
              {formatCOP(total)}
            </p>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn-gold whitespace-nowrap"
            style={{ fontSize: 'clamp(0.8rem, 3.5vw, 1rem)', padding: '0.6rem 1.25rem' }}
          >
            Reservar ({selected.length}) →
          </button>
        </div>
      </div>
    </div>
  )
}
