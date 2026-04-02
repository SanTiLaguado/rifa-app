export default function Footer() {
  return (
    <footer
      id="contacto"
      className="relative pt-20 pb-10 px-4"
      style={{
        background: 'linear-gradient(180deg, rgba(18,8,0,1) 0%, rgba(5,2,0,1) 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* CTA strip */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-8 rounded-2xl mb-10 sm:mb-16"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 26, 0.12) 0%, rgba(204, 34, 0, 0.08) 100%)',
            border: '1px solid rgba(255, 107, 26, 0.25)',
            boxShadow: '0 0 50px rgba(255, 107, 26, 0.08)',
          }}
        >
          <div>
            <p
              className="text-oswald font-semibold tracking-[0.25em] uppercase text-xs mb-1"
              style={{ color: '#FF6B1A' }}
            >
              ⚡ Cupos limitados
            </p>
            <h3
              className="text-bebas"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#FFF0D4' }}
            >
              ¿Listo para participar?
            </h3>
          </div>
          <a href="#boletas" className="btn-gold text-lg px-8 py-3 whitespace-nowrap">
            Comprar mi puesto
          </a>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div>
            <p
              className="text-oswald font-semibold tracking-[0.2em] uppercase text-xs mb-3"
              style={{ color: '#FF6B1A' }}
            >
              Consiente contacto
            </p>
            <p
              className="text-bebas"
              style={{ fontSize: '1.5rem', color: '#FFD700' }}
            >
              Escríbenos por WhatsApp
            </p>
            <p
              className="text-oswald text-sm mt-1"
              style={{ color: 'rgba(255, 240, 212, 0.55)' }}
            >
              Respondemos a la brevedad para confirmar tu puesto y coordinar el pago.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Redes */}
            {[
              { icon: '📱', label: 'WhatsApp', value: '+57 315 764 5002' },
              { icon: '📸', label: 'Instagram', value: '@santilaguado' },
              { icon: '📸', label: 'Instagram', value: '@manuelite5436' },
            ].map(({ icon, label, value }) => (
              <div
                key={value}
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{
                  background: 'rgba(26, 15, 5, 0.8)',
                  border: '1px solid rgba(255, 107, 26, 0.15)',
                }}
              >
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="text-oswald text-xs tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.4)' }}>{label}</p>
                  <p className="text-oswald font-semibold text-sm" style={{ color: '#FFF0D4' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Disclaimer legal */}
        <div
          className="text-center mb-8 px-4 py-4 rounded-lg"
          style={{
            background: 'rgba(255, 240, 212, 0.03)',
            border: '1px solid rgba(255, 240, 212, 0.06)',
          }}
        >
          <p
            className="text-oswald leading-relaxed"
            style={{ fontSize: '0.72rem', color: 'rgba(255, 240, 212, 0.3)', maxWidth: '600px', margin: '0 auto' }}
          >
            Esta rifa es una iniciativa independiente organizada por una persona natural, una dinamica para su circulo de conocidos y amigos. No tiene ninguna vinculación, respaldo ni relación con Ryan Castro, su equipo artístico, su agencia, ni con los organizadores o productores del concierto Sendé World Tour. Los premios son adquiridos de forma independiente. Las imágenes, flyers y material visual utilizados en esta página son propiedad de Ryan Castro y sus respectivos titulares; su uso es meramente referencial e informativo.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span
              className="text-gothic font-black tracking-widest uppercase"
              style={{
                fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #FFE966, #FFD700, #FF6B1A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Gran Rifa Sendé
            </span>
            <p className="text-oswald text-xs mt-1" style={{ color: 'rgba(255,240,212,0.3)' }}>
              El Perreo No Se Negocia
            </p>
          </div>

          <div className="text-center">
            <p
              className="text-oswald text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255, 240, 212, 0.25)' }}
            >
              Ryan Castro · Medellín · 25 Abril 2026 · Atanasio Girardot
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
