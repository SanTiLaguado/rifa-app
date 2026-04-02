import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { fetchTickets, type TicketStatus } from '../services/api'
import { CONFIG } from '../config'

// Datos mock mientras n8n no está listo
const MOCK_RESERVED: Record<string, TicketStatus> = {
  '07': 'sold',
  '13': 'sold',
  '21': 'reserved',
  '33': 'sold',
  '42': 'reserved',
  '55': 'sold',
}

function buildInitialStatuses(): Record<string, TicketStatus> {
  const map: Record<string, TicketStatus> = {}
  for (let i = 0; i < CONFIG.TOTAL_TICKETS; i++) {
    const key = String(i).padStart(2, '0')
    map[key] = MOCK_RESERVED[key] ?? 'available'
  }
  return map
}

interface TicketCardProps {
  number: string
  status: TicketStatus
  isSelected: boolean
  isDisabled: boolean
  onClick: () => void
}

const TOOLTIP_LABELS: Record<string, { text: string; color: string }> = {
  selected:  { text: 'Seleccionado · Click para quitar',       color: '#FFD700' },
  available: { text: 'Disponible · Click para seleccionar',    color: '#FFD700' },
  disabled:  { text: 'Carrito lleno · Máx. 6 puestos',        color: 'rgba(255,240,212,0.45)' },
  reserved:  { text: 'Reservado · Pendiente de confirmación',  color: '#FF6B1A' },
  sold:      { text: 'Vendido',                                color: 'rgba(255,240,212,0.35)' },
}

function TicketCard({ number, status, isSelected, isDisabled, onClick }: TicketCardProps) {
  const isAvailable = status === 'available'
  const [hovered, setHovered] = useState(false)

  // Qué tooltip mostrar
  const tooltipKey = isSelected ? 'selected'
    : status === 'reserved' ? 'reserved'
    : status === 'sold'     ? 'sold'
    : isDisabled            ? 'disabled'
    : 'available'
  const tooltip = TOOLTIP_LABELS[tooltipKey]

  let bg = ''
  let border = ''
  let color = ''
  let cursor = 'cursor-not-allowed'
  let scale = ''

  if (isSelected) {
    bg = 'linear-gradient(145deg, rgba(255, 215, 0, 0.25), rgba(255, 107, 26, 0.15))'
    border = '2px solid #FFD700'
    color = '#FFD700'
    cursor = 'cursor-pointer'
    scale = 'scale-105'
  } else if (status === 'reserved') {
    bg = 'linear-gradient(145deg, rgba(255, 107, 26, 0.12), rgba(26, 15, 5, 0.95))'
    border = '1px solid rgba(255, 107, 26, 0.4)'
    color = '#FF6B1A'
  } else if (status === 'sold') {
    bg = 'linear-gradient(145deg, rgba(60, 15, 5, 0.5), rgba(13, 10, 8, 0.98))'
    border = '1px solid rgba(100, 30, 10, 0.2)'
    color = 'rgba(255, 240, 212, 0.18)'
  } else if (isDisabled) {
    // available pero carrito lleno
    bg = 'linear-gradient(145deg, rgba(255, 215, 0, 0.03), rgba(26, 15, 5, 0.95))'
    border = '1px solid rgba(255, 215, 0, 0.08)'
    color = 'rgba(255, 215, 0, 0.25)'
    cursor = 'cursor-not-allowed'
  } else {
    bg = 'linear-gradient(145deg, rgba(255, 215, 0, 0.06), rgba(26, 15, 5, 0.95))'
    border = '1px solid rgba(255, 215, 0, 0.2)'
    color = '#FFD700'
    cursor = 'cursor-pointer'
    scale = 'hover:scale-105'
  }

  return (
    <div
      className="relative"
      style={{ isolation: 'isolate' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={isAvailable && !isDisabled ? onClick : undefined}
        disabled={!isAvailable || isDisabled}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={`relative flex flex-col items-center justify-center rounded-lg transition-all duration-150 w-full ${scale} ${
          isSelected ? 'shadow-[0_0_16px_rgba(255,215,0,0.35)]' : ''
        }`}
        style={{
          background: bg,
          border,
          color,
          aspectRatio: '1',
          minHeight: '44px',
          outline: 'none',
        }}
      >
        <span
          className="text-bebas leading-none"
          style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.4rem)' }}
        >
          {number}
        </span>

        {/* Indicadores de estado */}
        {status === 'reserved' && (
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
        )}
        {status === 'sold' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute inset-0 rounded-lg"
              style={{ background: 'rgba(0,0,0,0.25)' }}
            />
            <span className="relative text-[0.55rem] text-oswald tracking-widest opacity-50 uppercase">Vendido</span>
          </div>
        )}
        {isSelected && (
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-400" />
        )}
      </button>

      {/* Tooltip — solo en dispositivos con hover real (no táctil) */}
      {hovered && (
        <div
          className="absolute z-50 pointer-events-none text-oswald text-xs font-semibold tracking-wide whitespace-nowrap px-2.5 py-1.5 rounded-lg hidden sm:block"
          style={{
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(13,10,8,0.97)',
            border: `1px solid ${tooltip.color === '#FFD700' ? 'rgba(255,215,0,0.3)' : tooltip.color === '#FF6B1A' ? 'rgba(255,107,26,0.35)' : 'rgba(255,240,212,0.1)'}`,
            color: tooltip.color,
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          }}
        >
          {tooltip.text}
          {/* Flecha */}
          <div
            className="absolute"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: `5px solid rgba(13,10,8,0.97)`,
            }}
          />
        </div>
      )}
    </div>
  )
}

function TicketsLoader() {
  return (
    <section
      id="boletas"
      className="relative py-24 px-4 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, rgba(13,10,8,1) 0%, rgba(18,8,0,1) 100%)',
        minHeight: '520px',
      }}
    >
      {/* Ícono animado */}
      <div
        className="text-6xl mb-6"
        style={{ animation: 'ticketFloat 1.4s ease-in-out infinite' }}
      >
        🎫
      </div>

      {/* Texto principal */}
      <p
        className="text-bebas mb-1"
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          background: 'linear-gradient(90deg, #FFE966, #FFD700, #FF6B1A, #FFD700, #FFE966)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmerText 2s linear infinite',
        }}
      >
        Ya casi...
      </p>
      <p
        className="text-oswald text-sm tracking-widest uppercase mb-10"
        style={{ color: 'rgba(255,240,212,0.4)' }}
      >
        Cargando los puestos disponibles
      </p>

      {/* Barra de progreso — track + slider */}
      <div
        className="rounded-full overflow-hidden"
        style={{ width: 'min(256px, 65vw)', background: 'rgba(255,215,0,0.12)', height: '6px' }}
      >
        {/* El slider tiene ancho fijo y se traslada de izquierda a derecha */}
        <div
          style={{
            width: '45%',
            height: '100%',
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, transparent, #FF6B1A, #FFD700, #FF6B1A, transparent)',
            animation: 'sliderBar 1.4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes ticketFloat {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50%       { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes shimmerText {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes sliderBar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(320%); }
        }
      `}</style>
    </section>
  )
}

export default function TicketGrid() {
  const { selected, toggle, isMaxReached } = useCart()
  const navigate = useNavigate()
  const [statuses, setStatuses] = useState<Record<string, TicketStatus>>(buildInitialStatuses)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const start = Date.now()
    const MIN_LOADER_MS = 1200   // siempre visible al menos 1.2s

    fetchTickets()
      .then((tickets) => {
        const map: Record<string, TicketStatus> = buildInitialStatuses()
        tickets.forEach(({ numero, status }) => { map[numero] = status })
        setStatuses(map)
      })
      .catch(() => { /* si n8n no responde usa los datos mock */ })
      .finally(() => {
        const elapsed = Date.now() - start
        const remaining = Math.max(0, MIN_LOADER_MS - elapsed)
        setTimeout(() => setLoading(false), remaining)
      })
  }, [])

  const available = Object.values(statuses).filter((s) => s === 'available').length
  const reserved  = Object.values(statuses).filter((s) => s === 'reserved').length
  const sold      = Object.values(statuses).filter((s) => s === 'sold').length

  if (loading) return <TicketsLoader />

  return (
    <section
      id="boletas"
      className="relative py-24 px-4"
      style={{ background: 'linear-gradient(180deg, rgba(13,10,8,1) 0%, rgba(18,8,0,1) 100%)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-oswald font-semibold tracking-[0.3em] uppercase text-sm mb-3" style={{ color: '#FF6B1A' }}>
            ⚡ Cupos limitados ⚡
          </p>
          <h2
            className="text-bebas leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: '#FFF0D4' }}
          >
            Elige tu número
          </h2>
          <p className="text-oswald text-sm mt-2 tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.5)' }}>
            Puestos del 00 al 99 · Máx. {CONFIG.MAX_TICKETS_PER_ORDER} por compra
          </p>
        </div>

        {/* Leyenda + contadores */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 px-2">
          <div className="flex items-center gap-5 flex-wrap">
            {[
              { color: '#FFD700',                       label: 'Disponible' },
              { color: '#FF6B1A',                       label: 'Reservado'  },
              { color: 'rgba(255,240,212,0.18)',         label: 'Vendido'    },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                <span className="text-oswald text-xs tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.5)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            <Pill color="rgba(255,215,0,0.1)"   border="rgba(255,215,0,0.2)"   text="#FFD700"  label={`${available} libres`}     />
            <Pill color="rgba(255,107,26,0.1)"  border="rgba(255,107,26,0.2)"  text="#FF6B1A" label={`${reserved} reservados`}  />
            <Pill color="rgba(255,240,212,0.04)" border="rgba(255,240,212,0.08)" text="rgba(255,240,212,0.35)" label={`${sold} vendidos`} />
          </div>
        </div>

        {/* Grid */}
        <div
          className="p-3 sm:p-4 md:p-6 rounded-2xl"
          style={{
            background: 'rgba(13,10,8,0.8)',
            border: '1px solid rgba(255,107,26,0.12)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* 5 cols en móvil (~68px/celda) → 10 cols en sm+ (~58px/celda) */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
            {Array.from({ length: CONFIG.TOTAL_TICKETS }, (_, i) => {
              const num = String(i).padStart(2, '0')
              const status = statuses[num]
              const isSelected = selected.includes(num)
              return (
                <TicketCard
                  key={num}
                  number={num}
                  status={status}
                  isSelected={isSelected}
                  isDisabled={!isSelected && isMaxReached && status === 'available'}
                  onClick={() => toggle(num)}
                />
              )
            })}
          </div>
        </div>

        {/* Mensaje límite */}
        {isMaxReached && (
          <p className="text-center text-oswald text-xs mt-4 tracking-widest uppercase" style={{ color: '#FF6B1A' }}>
            Máximo {CONFIG.MAX_TICKETS_PER_ORDER} puestos por compra
          </p>
        )}

        {/* CTA cuando no hay nada seleccionado */}
        {selected.length === 0 && (
          <p className="text-center text-oswald text-sm mt-8" style={{ color: 'rgba(255,240,212,0.4)' }}>
            Toca un número para agregarlo a tu compra
          </p>
        )}
      </div>

      <div className="section-divider mt-16" />
    </section>
  )
}

function Pill({ color, border, text, label }: { color: string; border: string; text: string; label: string }) {
  return (
    <span
      className="text-oswald text-xs font-semibold px-3 py-1 rounded-full"
      style={{ background: color, color: text, border: `1px solid ${border}` }}
    >
      {label}
    </span>
  )
}
