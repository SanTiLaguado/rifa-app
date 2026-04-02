interface PrizeCardProps {
  option: string
  title: string
  subtitle: string
  emoji: string
  description: string
  highlight?: boolean
}

function PrizeCard({ option, title, subtitle, emoji, description, highlight }: PrizeCardProps) {
  return (
    <div
      className="relative flex flex-col items-center text-center p-8 rounded-2xl transition-transform duration-300 hover:-translate-y-2"
      style={{
        background: highlight
          ? 'linear-gradient(145deg, rgba(204, 34, 0, 0.15) 0%, rgba(26, 15, 5, 0.98) 100%)'
          : 'linear-gradient(145deg, rgba(255, 107, 26, 0.1) 0%, rgba(26, 15, 5, 0.98) 100%)',
        border: highlight
          ? '2px solid rgba(204, 34, 0, 0.5)'
          : '2px solid rgba(255, 215, 0, 0.35)',
        boxShadow: highlight
          ? '0 0 40px rgba(204, 34, 0, 0.2), inset 0 1px 0 rgba(255, 107, 26, 0.1)'
          : '0 0 40px rgba(255, 215, 0, 0.12), inset 0 1px 0 rgba(255, 215, 0, 0.08)',
      }}
    >
      {/* Option badge */}
      <div
        className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full"
        style={{
          background: highlight ? 'rgba(204, 34, 0, 0.2)' : 'rgba(255, 215, 0, 0.12)',
          border: `1px solid ${highlight ? 'rgba(204, 34, 0, 0.5)' : 'rgba(255, 215, 0, 0.3)'}`,
        }}
      >
        <span
          className="text-oswald font-semibold tracking-[0.25em] uppercase text-xs"
          style={{ color: highlight ? '#FF6B1A' : '#FFD700' }}
        >
          {option}
        </span>
      </div>

      {/* Emoji / Icon */}
      <div
        className="text-7xl mb-4"
        style={{ filter: 'drop-shadow(0 0 20px rgba(255, 107, 26, 0.5))' }}
      >
        {emoji}
      </div>

      {/* Amount / Title */}
      <h3
        className="text-bebas mb-1 leading-none"
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          color: highlight ? '#FF6B1A' : '#FFD700',
          textShadow: highlight
            ? '0 0 20px rgba(255, 107, 26, 0.6)'
            : '0 0 20px rgba(255, 215, 0, 0.6)',
        }}
      >
        {title}
      </h3>

      {/* Subtitle */}
      <p
        className="text-oswald font-bold tracking-widest uppercase text-sm mb-4"
        style={{ color: '#FFF0D4', opacity: 0.9 }}
      >
        {subtitle}
      </p>

      {/* Description */}
      <p
        className="text-oswald text-sm leading-relaxed"
        style={{ color: 'rgba(255, 240, 212, 0.6)' }}
      >
        {description}
      </p>
    </div>
  )
}

export default function Prizes() {
  return (
    <section
      id="premios"
      className="relative py-24 px-4"
      style={{ background: 'linear-gradient(180deg, rgba(13,10,8,1) 0%, rgba(18,8,0,1) 100%)' }}
    >
      {/* Top divider */}
      <div className="section-divider mb-16" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-oswald font-semibold tracking-[0.3em] uppercase text-sm mb-3"
            style={{ color: '#FF6B1A' }}
          >
            ⚡ Tú eliges tu premio ⚡
          </p>
          <h2
            className="text-bebas leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              background: 'linear-gradient(135deg, #FFE966, #FFD700, #FF6B1A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Dos opciones.
            <br />
            Una decisión tuya.
          </h2>
          <p
            className="text-oswald mt-4 text-sm tracking-widest uppercase"
            style={{ color: 'rgba(255, 240, 212, 0.5)' }}
          >
            El ganador elige qué prefiere recibir
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <PrizeCard
            option="Opción 1"
            emoji="💰"
            title="$450.000"
            subtitle="En efectivo"
            description="Recibe el valor de la boleta en efectivo, directo en tus manos. Sin vueltas."
          />
          <PrizeCard
            option="Opción 2"
            emoji="🎫"
            title="Boleta VIP"
            subtitle="Oriental Baja · Atanasio Girardot"
            description="Vive el concierto de Ryan Castro en vivo. La boleta te la entregamos directamente."
            highlight
          />
        </div>

        {/* Bottom note */}
        <p
          className="text-center text-oswald text-xs tracking-widest uppercase mt-10"
          style={{ color: 'rgba(255, 240, 212, 0.35)' }}
        >
          * El ganador es contactado directamente para coordinar la entrega del premio elegido
        </p>
      </div>

      {/* Bottom divider */}
      <div className="section-divider mt-16" />
    </section>
  )
}
