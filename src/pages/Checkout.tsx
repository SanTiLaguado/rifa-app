import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { crearReserva, fileToBase64, buildFileName } from '../services/api'
import {
  getCooldownRemaining,
  setCooldown,
  formatCooldown,
  hasSubmittedThisSession,
  markSessionSubmitted,
  validateNombre,
  validateCedula,
  validatePhone,
  validateFile,
  MIN_FORM_TIME_MS,
} from '../utils/security'
import OrderSummary from '../components/checkout/OrderSummary'
import PaymentInfo from '../components/checkout/PaymentInfo'
import ContactForm, { type ContactData } from '../components/checkout/ContactForm'
import ReceiptUpload from '../components/checkout/ReceiptUpload'

export default function Checkout() {
  const { selected, total, clear } = useCart()
  const navigate = useNavigate()

  const mountTime = useRef(Date.now())  // para calcular tiempo en formulario

  const [contact, setContact] = useState<ContactData>({ nombre: '', cedula: '', telefono: '', honeypot: '' })
  const [file,    setFile]    = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  // Cooldown en tiempo real (actualiza cada segundo)
  const [cooldownMs, setCooldownMs] = useState(() => getCooldownRemaining())
  useEffect(() => {
    if (cooldownMs <= 0) return
    const id = setInterval(() => {
      const rem = getCooldownRemaining()
      setCooldownMs(rem)
      if (rem <= 0) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [cooldownMs])

  // ── Pantalla: carrito vacío ───────────────────────────────────────────────
  if (selected.length === 0) {
    return (
      <EmptyState onBack={() => navigate('/')} />
    )
  }

  // ── Pantalla: cooldown activo ─────────────────────────────────────────────
  if (cooldownMs > 0) {
    return (
      <BlockScreen
        emoji="⏳"
        title="Espera un momento"
        message={`Ya enviaste una reserva recientemente. Por seguridad debes esperar ${formatCooldown(cooldownMs)} antes de intentar de nuevo.`}
        note="Este límite evita reservas duplicadas y protege los puestos disponibles para todos."
        onBack={() => navigate('/')}
      />
    )
  }

  // ── Pantalla: ya envió en este tab ────────────────────────────────────────
  if (hasSubmittedThisSession()) {
    return (
      <BlockScreen
        emoji="✅"
        title="Ya tienes una reserva en proceso"
        message="Enviaste una reserva en esta sesión. Revisa tu WhatsApp para la confirmación."
        note="Si crees que hubo un error, contáctanos directamente."
        onBack={() => navigate('/', { state: { scrollTo: 'boletas' } })}
        backLabel="Ver estado de los puestos"
      />
    )
  }

  // ── Validaciones para habilitar el botón ──────────────────────────────────
  const fieldErrors = {
    nombre:   validateNombre(contact.nombre),
    cedula:   validateCedula(contact.cedula),
    telefono: validatePhone(contact.telefono),
    file:     file ? validateFile(file) : 'Sube el comprobante de pago',
  }
  const isValid = Object.values(fieldErrors).every((e) => e === null)

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || !file || loading) return

    // 1. Honeypot — bot detectado, simular éxito sin enviar nada
    if (contact.honeypot.trim().length > 0) {
      clear()
      navigate('/confirmacion', { replace: true })
      return
    }

    // 2. Tiempo mínimo en el formulario
    const timeOnForm = Date.now() - mountTime.current
    if (timeOnForm < MIN_FORM_TIME_MS) {
      setError('Completa el formulario con calma antes de enviar. 🙂')
      return
    }

    // 3. Re-validar archivo por si acaso
    const fileErr = validateFile(file)
    if (fileErr) { setError(fileErr); return }

    setLoading(true)
    setError(null)

    try {
      const comprobante    = await fileToBase64(file)
      const nombreArchivo  = buildFileName(contact.cedula, file)

      await crearReserva({
        nombre:   contact.nombre.trim(),
        cedula:   contact.cedula.trim(),
        telefono: contact.telefono.trim(),
        numeros:  [...selected].sort(),
        total,
        comprobante,
        nombreArchivo,
      })

      setCooldown()
      markSessionSubmitted()
      clear()
      navigate('/confirmacion', { replace: true })
    } catch {
      setError('Hubo un problema al enviar tu reserva. Intenta de nuevo o contáctanos por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen py-12 px-4 relative"
      style={{ background: 'linear-gradient(180deg, #0D0A08 0%, #120800 100%)' }}
    >
      {/* Overlay de carga */}
      {loading && <LoadingOverlay />}

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-oswald text-sm tracking-widest uppercase flex items-center gap-2 mb-6 transition-colors"
          style={{ color: 'rgba(255,240,212,0.45)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,240,212,0.45)')}
        >
          ← Volver
        </button>
        <p className="text-oswald font-semibold tracking-[0.25em] uppercase text-xs mb-1" style={{ color: '#FF6B1A' }}>
          Gran Rifa Sendé
        </p>
        <h1 className="text-bebas leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#FFF0D4' }}>
          Confirma tu reserva
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
        <OrderSummary />
        <PaymentInfo />
        <ContactForm value={contact} onChange={setContact} />
        <ReceiptUpload cedula={contact.cedula} file={file} onFile={setFile} />

        {error && (
          <div
            className="p-4 rounded-xl text-oswald text-sm"
            style={{ background: 'rgba(204,34,0,0.12)', border: '1px solid rgba(204,34,0,0.35)', color: '#FF6B1A' }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full py-5 rounded-xl text-bebas text-xl tracking-wider transition-all duration-200"
          style={{
            background: isValid && !loading
              ? 'linear-gradient(135deg, #FFE966 0%, #FFD700 50%, #C89B00 100%)'
              : 'rgba(255,215,0,0.15)',
            color:  isValid && !loading ? '#0D0A08' : 'rgba(255,215,0,0.3)',
            cursor: isValid && !loading ? 'pointer' : 'not-allowed',
            boxShadow: isValid && !loading ? '0 8px 30px rgba(255,215,0,0.3)' : 'none',
          }}
        >
          {loading ? 'Enviando reserva...' : 'Confirmar reserva →'}
        </button>

        <p className="text-center text-oswald text-xs pb-8" style={{ color: 'rgba(255,240,212,0.3)' }}>
          Tu reserva quedará pendiente hasta que verifiquemos el pago. Te avisaremos por WhatsApp.
        </p>
      </form>
    </div>
  )
}

// ─── Sub-componentes locales ──────────────────────────────────────────────────

function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center"
      style={{ background: 'linear-gradient(180deg, #0D0A08 0%, #120800 100%)' }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
        style={{ background: 'rgba(255,107,26,0.08)', border: '2px solid rgba(255,107,26,0.2)' }}>
        🎟️
      </div>
      <div>
        <h2 className="text-bebas mb-2" style={{ fontSize: '2rem', color: '#FFF0D4' }}>
          No tienes puestos seleccionados
        </h2>
        <p className="text-oswald text-sm" style={{ color: 'rgba(255,240,212,0.45)' }}>
          Vuelve al inicio y elige tus números en el grid
        </p>
      </div>
      <button onClick={onBack} className="btn-gold px-8 py-3 text-lg">← Volver al inicio</button>
    </div>
  )
}

function BlockScreen({ emoji, title, message, note, onBack, backLabel = '← Volver al inicio' }:
  { emoji: string; title: string; message: string; note: string; onBack: () => void; backLabel?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center max-w-md mx-auto"
      style={{ background: 'linear-gradient(180deg, #0D0A08 0%, #120800 100%)' }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
        style={{ background: 'rgba(255,107,26,0.08)', border: '2px solid rgba(255,107,26,0.2)' }}>
        {emoji}
      </div>
      <div>
        <h2 className="text-bebas mb-3" style={{ fontSize: '2rem', color: '#FFF0D4' }}>{title}</h2>
        <p className="text-oswald text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,240,212,0.65)' }}>{message}</p>
        <p className="text-oswald text-xs" style={{ color: 'rgba(255,240,212,0.3)' }}>{note}</p>
      </div>
      <button onClick={onBack} className="btn-outline-gold px-8 py-3">{backLabel}</button>
    </div>
  )
}

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
      style={{ background: 'rgba(13,10,8,0.96)', backdropFilter: 'blur(6px)' }}>
      <div className="text-6xl" style={{ animation: 'ticketFloat 1.4s ease-in-out infinite' }}>🎫</div>
      <div className="text-center">
        <p className="text-bebas mb-1"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            background: 'linear-gradient(90deg, #FFE966, #FFD700, #FF6B1A, #FFD700, #FFE966)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmerText 2s linear infinite',
          }}>
          Enviando tu reserva...
        </p>
        <p className="text-oswald text-sm tracking-widest uppercase" style={{ color: 'rgba(255,240,212,0.4)' }}>
          No cierres esta página
        </p>
      </div>
      <div className="rounded-full overflow-hidden" style={{ width: 'min(220px, 60vw)', height: '6px', background: 'rgba(255,215,0,0.12)' }}>
        <div style={{
          width: '45%', height: '100%', borderRadius: '9999px',
          background: 'linear-gradient(90deg, transparent, #FF6B1A, #FFD700, #FF6B1A, transparent)',
          animation: 'sliderBar 1.4s ease-in-out infinite',
        }} />
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
          100% { transform: translateX(390%); }
        }
      `}</style>
    </div>
  )
}
