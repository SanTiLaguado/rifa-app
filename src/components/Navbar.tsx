function DisclaimerBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-3 py-1.5"
      style={{
        background: 'rgba(13, 10, 8, 0.92)',
        borderBottom: '1px solid rgba(255, 107, 26, 0.15)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Texto corto en móvil, completo en desktop */}
      <p
        className="text-oswald text-center leading-tight md:hidden"
        style={{ fontSize: '0.6rem', color: 'rgba(255, 240, 212, 0.4)' }}
      >
        Rifa independiente · Sin vinculación con Ryan Castro ni sus organizadores.
      </p>
      <p
        className="text-oswald text-center leading-tight hidden md:block"
        style={{ fontSize: '0.65rem', color: 'rgba(255, 240, 212, 0.4)', letterSpacing: '0.03em' }}
      >
        Rifa independiente organizada por un particular. No tiene vinculación con Ryan Castro, su equipo, ni con los organizadores del concierto. Imágenes y material gráfico © sus respectivos propietarios.
      </p>
    </div>
  )
}

export default function Navbar() {
  return (
    <>
      <DisclaimerBar />
      <nav
        className="fixed left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-3"
        style={{
          top: '26px',
          background: 'linear-gradient(180deg, rgba(13,10,8,0.95) 0%, transparent 100%)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <span
            className="text-gothic font-black tracking-wider uppercase"
            style={{
              fontSize: 'clamp(0.7rem, 3.5vw, 1rem)',
              background: 'linear-gradient(135deg, #FFE966, #FFD700, #FF6B1A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Gran Rifa Sendé
          </span>
        </div>

        {/* Nav links — solo desktop */}
        <div className="hidden md:flex items-center gap-8">
          {['Inicio', 'Premios', 'Boletas', 'Contacto'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-oswald font-medium tracking-widest uppercase text-sm transition-colors duration-200"
              style={{ color: 'rgba(255,240,212,0.75)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,240,212,0.75)')}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#boletas"
          className="btn-gold"
          style={{ fontSize: 'clamp(0.7rem, 3vw, 0.875rem)', padding: '0.4rem 0.85rem' }}
        >
          Comprar puesto
        </a>
      </nav>
    </>
  )
}
