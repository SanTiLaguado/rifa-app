interface StepProps {
  number: string
  emoji: string
  title: string
  description: string
}

function Arrow() {
  return (
    <div className="hidden md:flex items-center justify-center flex-shrink-0 mx-2" style={{ width: '48px', paddingTop: '52px' }}>
      <div className="relative w-full" style={{ height: '2px', background: 'linear-gradient(90deg, rgba(255,107,26,0.4), rgba(255,215,0,0.5))' }}>
        <div style={{
          position: 'absolute', right: '-1px', top: '-4px',
          width: 0, height: 0,
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: '7px solid rgba(255,215,0,0.6)',
        }} />
      </div>
    </div>
  )
}

function Step({ number, emoji, title, description }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Step number */}
      <div
        className="text-bebas text-xs tracking-widest mb-3"
        style={{ color: 'rgba(255, 107, 26, 0.6)' }}
      >
        PASO {number}
      </div>

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4"
        style={{
          background: 'linear-gradient(145deg, rgba(255, 107, 26, 0.15), rgba(13, 10, 8, 0.9))',
          border: '2px solid rgba(255, 107, 26, 0.3)',
          boxShadow: '0 0 30px rgba(255, 107, 26, 0.15)',
        }}
      >
        {emoji}
      </div>

      {/* Title */}
      <h3
        className="text-bebas tracking-wide mb-2"
        style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: '#FFD700',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-oswald text-sm leading-relaxed"
        style={{ color: 'rgba(255, 240, 212, 0.65)', maxWidth: '220px' }}
      >
        {description}
      </p>
    </div>
  )
}

export default function HowToParticipate() {
  return (
    <section
      id="como-participar"
      className="relative py-24 px-4"
      style={{
        background: 'linear-gradient(180deg, rgba(18,8,0,1) 0%, rgba(13,10,8,1) 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-oswald font-semibold tracking-[0.3em] uppercase text-sm mb-3"
            style={{ color: '#FF6B1A' }}
          >
            🔥 Así de fácil 🔥
          </p>
          <h2
            className="text-bebas leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              color: '#FFF0D4',
            }}
          >
            ¿Cómo participar?
          </h2>
        </div>

        {/* Steps — flex en desktop para que los 3 queden en la misma fila */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-0">

          <Step
            number="01"
            emoji="📱"
            title="Elige tu puesto"
            description="Selecciona un número del 00 al 99. Cada número es tu puesto en la rifa."
          />

          {/* Conector → */}
          <Arrow />

          <Step
            number="02"
            emoji="💳"
            title="Paga $10.000"
            description="Realiza el pago por el método que te indiquemos. Solo $10.000 por puesto."
          />

          {/* Conector → */}
          <Arrow />

          <Step
            number="03"
            emoji="🏆"
            title="Espera el sorteo"
            description="El sorteo juega el 17 de abril con la Lotería de Santander (11pm), con los dos últimos números. El ganador recibe su premio de inmediato."
          />
        </div>

        {/* Highlight box */}
        <div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 26, 0.08) 0%, rgba(255, 215, 0, 0.05) 100%)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
          }}
        >
          <div className="text-center">
            <div className="text-bebas text-4xl" style={{ color: '#FFD700' }}>100</div>
            <div className="text-oswald text-xs tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.6)' }}>Puestos disponibles</div>
          </div>
          <div className="w-px h-12 hidden sm:block" style={{ background: 'rgba(255,107,26,0.3)' }} />
          <div className="text-center">
            <div className="text-bebas text-4xl" style={{ color: '#FFD700' }}>$10.000</div>
            <div className="text-oswald text-xs tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.6)' }}>Precio por puesto</div>
          </div>
          <div className="w-px h-12 hidden sm:block" style={{ background: 'rgba(255,107,26,0.3)' }} />
          <div className="text-center">
            <div className="text-bebas text-4xl" style={{ color: '#FF6B1A' }}>1</div>
            <div className="text-oswald text-xs tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.6)' }}>Ganador</div>
          </div>
          <div className="w-px h-12 hidden sm:block" style={{ background: 'rgba(255,107,26,0.3)' }} />
          <div className="text-center">
            <div className="text-bebas text-4xl" style={{ color: '#FFD700' }}>Abr 17</div>
            <div className="text-oswald text-xs tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.6)' }}>Sorteo · Lot. Santander</div>
          </div>
        </div>
      </div>

      <div className="section-divider mt-16" />
    </section>
  )
}
