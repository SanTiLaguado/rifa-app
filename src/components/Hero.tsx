export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/banner.jpg)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(13,10,8,0.8) 0%, rgba(13,10,8,0.7) 30%, rgba(13,10,8,0.9) 70%, rgba(13,10,8,1) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 15%, rgba(13,10,8,0.85) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(204,68,0,0.12) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-24 md:pt-32 pb-12 w-full max-w-4xl mx-auto">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 md:px-4 py-1 md:py-1.5 rounded-full"
          style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.4)', backdropFilter: 'blur(8px)' }}
        >
          <span style={{ fontSize: '0.9rem' }}>⚡</span>
          <span className="text-oswald font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs md:text-sm" style={{ color: '#FF6B1A' }}>
            Gran Rifa Sendé World Tour
          </span>
          <span style={{ fontSize: '0.9rem' }}>⚡</span>
        </div>

        {/* Título principal */}
        <h1
          className="text-bebas uppercase leading-none mb-3 md:mb-4"
          style={{
            fontSize: 'clamp(3rem, 13vw, 8rem)',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFE966 18%, #FFD700 40%, #FF6B1A 72%, #CC2200 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.95)) drop-shadow(0px 0px 28px rgba(0,0,0,0.85))',
            lineHeight: '0.92',
          }}
        >
          El Perreo
          <br />
          No Se Negocia
        </h1>

        {/* Info del evento — compacta en móvil */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3 gap-y-0.5 mt-2 mb-5 md:mb-8 px-2">
          {['Ryan Castro', '·', 'Medellín', '·', '25 de Abril', '·', 'Atanasio Girardot', '·', 'Oriental Baja'].map((item, i) => (
            <span
              key={i}
              className="text-oswald font-medium tracking-wider md:tracking-widest uppercase"
              style={{
                fontSize: 'clamp(0.6rem, 2.8vw, 0.875rem)',
                color: item === '·' ? '#FF6B1A' : '#FFF0D4',
                opacity: item === '·' ? 0.4 : 0.9,
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Precio */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-7 md:mb-10 px-3 md:px-6 py-2.5 md:py-3 rounded-lg"
          style={{ background: 'rgba(13,10,8,0.7)', border: '1px solid rgba(255,215,0,0.3)', backdropFilter: 'blur(8px)' }}
        >
          <span className="text-oswald text-xs md:text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.7)' }}>
            Tu puesto por solo
          </span>
          <span className="text-bebas text-2xl md:text-3xl" style={{ color: '#FFD700', textShadow: '0 0 20px rgba(255,215,0,0.6)' }}>
            $10.000
          </span>
          <span className="text-oswald text-xs md:text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.7)' }}>
            · 100 cupos
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center w-full sm:w-auto">
          <a
            href="#boletas"
            className="btn-gold w-full sm:w-auto text-center"
            style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.25rem)', padding: 'clamp(0.65rem, 2vw, 1rem) clamp(1.5rem, 5vw, 2.5rem)' }}
          >
            Ver boletas disponibles
          </a>
          <a
            href="#premios"
            className="btn-outline-gold w-full sm:w-auto text-center"
            style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.25rem)', padding: 'clamp(0.65rem, 2vw, 1rem) clamp(1.5rem, 5vw, 2.5rem)' }}
          >
            Ver premios
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-10 md:mt-16 flex flex-col items-center gap-2 opacity-50">
          <span className="text-oswald text-xs tracking-widest uppercase" style={{ color: '#FFF0D4' }}>Desliza para ver más</span>
          <div className="w-0.5 h-6 md:h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #FFD700, transparent)' }} />
        </div>
      </div>
    </section>
  )
}
