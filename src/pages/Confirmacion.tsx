import { useNavigate } from 'react-router-dom'

export default function Confirmacion() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'linear-gradient(180deg, #0D0A08 0%, #120800 100%)' }}
    >
      {/* Ícono */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6"
        style={{
          background: 'rgba(255,215,0,0.08)',
          border: '2px solid rgba(255,215,0,0.3)',
          boxShadow: '0 0 50px rgba(255,215,0,0.15)',
        }}
      >
        🎫
      </div>

      {/* Etiqueta */}
      <p
        className="text-oswald font-semibold tracking-[0.3em] uppercase text-sm mb-3"
        style={{ color: '#FF6B1A' }}
      >
        ⚡ Reserva recibida ⚡
      </p>

      {/* Título */}
      <h1
        className="text-bebas leading-tight mb-5"
        style={{
          fontSize: 'clamp(2rem, 7vw, 4rem)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFE966 20%, #FFD700 50%, #FF6B1A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.9))',
        }}
      >
        ¡Ya casi es tuyo!
      </h1>

      {/* Caja de confirmación de tiempo */}
      <div
        className="max-w-md w-full mb-8 p-5 rounded-2xl text-left space-y-4"
        style={{
          background: 'rgba(255,215,0,0.05)',
          border: '1px solid rgba(255,215,0,0.18)',
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">⏱️</span>
          <div>
            <p className="text-oswald font-semibold text-sm mb-0.5" style={{ color: '#FFD700' }}>
              Confirmación en los próximos minutos
            </p>
            <p className="text-oswald text-sm leading-relaxed" style={{ color: 'rgba(255,240,212,0.65)' }}>
              Estamos verificando tu pago. En cuanto lo confirmemos te avisamos por WhatsApp y tu puesto aparecerá como <span style={{ color: '#FF6B1A' }}>vendido</span> en el grid.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">👁️</span>
          <div>
            <p className="text-oswald font-semibold text-sm mb-0.5" style={{ color: '#FFD700' }}>
              Sigue el estado de tu puesto
            </p>
            <p className="text-oswald text-sm leading-relaxed" style={{ color: 'rgba(255,240,212,0.65)' }}>
              Vuelve al inicio y busca tu número en el grid. Mientras verificamos aparece en <span style={{ color: '#FF6B1A' }}>naranja</span> (reservado). Al confirmar cambia a <span style={{ color: 'rgba(255,240,212,0.4)' }}>gris</span> (vendido).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">📱</span>
          <div>
            <p className="text-oswald font-semibold text-sm mb-0.5" style={{ color: '#FFD700' }}>
              Pendiente al WhatsApp
            </p>
            <p className="text-oswald text-sm leading-relaxed" style={{ color: 'rgba(255,240,212,0.65)' }}>
              Te contactaremos al número que registraste para confirmarte oficialmente tu participación.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/', { replace: true, state: { scrollTo: 'boletas' } })}
        className="btn-outline-gold text-base px-8 py-3"
      >
        Ver estado de los puestos
      </button>
    </div>
  )
}
