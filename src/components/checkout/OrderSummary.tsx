import { useCart } from '../../context/CartContext'
import { formatCOP } from '../../services/api'
import { CONFIG } from '../../config'

export default function OrderSummary() {
  const { selected, total } = useCart()
  const sorted = [...selected].sort()

  return (
    <div
      className="p-4 sm:p-6 rounded-2xl"
      style={{
        background: 'linear-gradient(145deg, rgba(26,15,5,0.95), rgba(13,10,8,0.98))',
        border: '1px solid rgba(255,215,0,0.2)',
      }}
    >
      <h2
        className="text-bebas mb-5"
        style={{ fontSize: '1.5rem', color: '#FFF0D4' }}
      >
        Resumen de compra
      </h2>

      {/* Números */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sorted.map((num) => (
          <div
            key={num}
            className="flex flex-col items-center px-4 py-2 rounded-lg"
            style={{
              background: 'rgba(255,215,0,0.08)',
              border: '1px solid rgba(255,215,0,0.25)',
            }}
          >
            <span className="text-bebas text-2xl leading-none" style={{ color: '#FFD700' }}>{num}</span>
            <span className="text-oswald text-xs mt-0.5" style={{ color: 'rgba(255,240,212,0.4)' }}>puesto</span>
          </div>
        ))}
      </div>

      {/* Desglose */}
      <div className="space-y-2 border-t pt-4" style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
        <div className="flex justify-between items-center">
          <span className="text-oswald text-sm" style={{ color: 'rgba(255,240,212,0.55)' }}>
            {selected.length} puesto{selected.length > 1 ? 's' : ''} × {formatCOP(CONFIG.TICKET_PRICE)}
          </span>
          <span className="text-oswald font-semibold" style={{ color: '#FFF0D4' }}>
            {formatCOP(total)}
          </span>
        </div>

        <div
          className="flex justify-between items-center pt-3 border-t"
          style={{ borderColor: 'rgba(255,215,0,0.15)' }}
        >
          <span className="text-bebas text-lg" style={{ color: '#FFF0D4' }}>Total a pagar</span>
          <span
            className="text-bebas text-2xl"
            style={{ color: '#FFD700', textShadow: '0 0 16px rgba(255,215,0,0.4)' }}
          >
            {formatCOP(total)}
          </span>
        </div>
      </div>

      {/* Info evento */}
      <div
        className="mt-4 pt-4 border-t flex flex-wrap gap-x-4 gap-y-1"
        style={{ borderColor: 'rgba(255,107,26,0.12)' }}
      >
        {[
          { label: 'Evento', value: 'Ryan Castro · Sendé World Tour' },
          { label: 'Fecha', value: CONFIG.EVENT_DATE },
          { label: 'Lugar', value: CONFIG.EVENT_VENUE },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col">
            <span className="text-oswald text-xs tracking-widest uppercase" style={{ color: 'rgba(255,107,26,0.6)' }}>{label}</span>
            <span className="text-oswald text-xs font-semibold" style={{ color: 'rgba(255,240,212,0.7)' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
