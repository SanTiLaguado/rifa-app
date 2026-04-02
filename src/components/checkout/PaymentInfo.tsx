import { useState } from 'react'
import { CONFIG } from '../../config'
import { formatCOP } from '../../services/api'
import { useCart } from '../../context/CartContext'

export default function PaymentInfo() {
  const [copied, setCopied] = useState(false)
  const { total } = useCart()

  function copyNequi() {
    navigator.clipboard.writeText(CONFIG.NEQUI_NUMBER).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div
      className="p-4 sm:p-6 rounded-2xl"
      style={{
        background: 'linear-gradient(145deg, rgba(204,34,0,0.08), rgba(13,10,8,0.98))',
        border: '1px solid rgba(255,107,26,0.25)',
      }}
    >
      <h2 className="text-bebas mb-1" style={{ fontSize: '1.5rem', color: '#FFF0D4' }}>
        Realiza el pago
      </h2>
      <p className="text-oswald text-xs mb-4 tracking-wide" style={{ color: 'rgba(255,240,212,0.45)' }}>
        Envía exactamente {formatCOP(total)} a este número por Nequi
      </p>

      {/* Card Nequi — apilado en móvil, fila en sm+ */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 rounded-xl mb-4"
        style={{ background: 'rgba(255,215,0,0.06)', border: '2px solid rgba(255,215,0,0.3)' }}
      >
        <div className="min-w-0">
          <p className="text-oswald text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(255,240,212,0.4)' }}>
            Número Nequi
          </p>
          {/* Número grande en desktop, más compacto en móvil */}
          <p
            className="text-bebas leading-none"
            style={{
              fontSize: 'clamp(1.6rem, 7vw, 2rem)',
              color: '#FFD700',
              textShadow: '0 0 16px rgba(255,215,0,0.4)',
              letterSpacing: '0.08em',
              wordBreak: 'break-all',
            }}
          >
            {CONFIG.NEQUI_NUMBER}
          </p>
        </div>

        <button
          onClick={copyNequi}
          className="flex items-center justify-center gap-2 sm:flex-col sm:gap-1 px-4 py-3 rounded-lg transition-all duration-200 shrink-0"
          style={{
            background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,215,0,0.1)',
            border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : 'rgba(255,215,0,0.3)'}`,
            color: copied ? '#86efac' : '#FFD700',
            minWidth: '100px',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>{copied ? '✓' : '📋'}</span>
          <span className="text-oswald text-xs font-semibold tracking-wider">
            {copied ? 'Copiado' : 'Copiar número'}
          </span>
        </button>
      </div>

      {/* Instrucciones */}
      <div className="space-y-2">
        {[
          '1. Abre Nequi en tu celular',
          `2. Envía ${formatCOP(total)} al número de arriba`,
          '3. Toma el pantallazo del comprobante',
          '4. Súbelo en el campo de abajo y confirma tu reserva.',
        ].map((step) => (
          <p key={step} className="text-oswald text-s leading-snug" style={{ color: 'rgba(255,240,212,0.6)' }}>
            {step}
          </p>
        ))}
      </div>
    </div>
  )
}
