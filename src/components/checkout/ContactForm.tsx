import { useState } from 'react'
import { validateNombre, validateCedula, validatePhone } from '../../utils/security'

export interface ContactData {
  nombre: string
  cedula: string
  telefono: string
  honeypot: string   // campo trampa — invisible para humanos
}

interface Props {
  value: ContactData
  onChange: (data: ContactData) => void
}

export default function ContactForm({ value, onChange }: Props) {
  // Rastreamos qué campos han sido tocados para mostrar errores solo después del blur
  const [touched, setTouched] = useState({ nombre: false, cedula: false, telefono: false })

  function update(field: keyof ContactData, val: string) {
    onChange({ ...value, [field]: val })
  }

  function touch(field: 'nombre' | 'cedula' | 'telefono') {
    setTouched((t) => ({ ...t, [field]: true }))
  }

  const errors = {
    nombre:   validateNombre(value.nombre),
    cedula:   validateCedula(value.cedula),
    telefono: validatePhone(value.telefono),
  }

  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        background: 'linear-gradient(145deg, rgba(26,15,5,0.95), rgba(13,10,8,0.98))',
        border: '1px solid rgba(255,107,26,0.2)',
      }}
    >
      <h2 className="text-bebas mb-1" style={{ fontSize: '1.5rem', color: '#FFF0D4' }}>
        Tus datos
      </h2>
      <p className="text-oswald text-xs mb-5 tracking-wide" style={{ color: 'rgba(255,240,212,0.4)' }}>
        Los necesitamos para asignarte los puestos y contactarte si ganas
      </p>

      {/* ── Honeypot: invisible para humanos, bots lo llenan ─────────────── */}
      <div style={{ position: 'absolute', opacity: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value.honeypot}
          onChange={(e) => update('honeypot', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <Field
          label="Nombre completo"
          placeholder="Ej: Juan David Gómez"
          value={value.nombre}
          onChange={(v) => update('nombre', v)}
          onBlur={() => touch('nombre')}
          error={touched.nombre ? errors.nombre : null}
          hint="Nombre y apellido como aparece en tu cédula"
        />
        <Field
          label="Número de cédula"
          placeholder="Ej: 1000123456"
          value={value.cedula}
          onChange={(v) => update('cedula', v.replace(/\D/g, ''))}
          onBlur={() => touch('cedula')}
          error={touched.cedula ? errors.cedula : null}
          inputMode="numeric"
          hint="Con este número quedará registrado el comprobante"
          maxLength={10}
        />
        <Field
          label="WhatsApp"
          placeholder="Ej: 3001234567"
          value={value.telefono}
          onChange={(v) => update('telefono', v.replace(/\D/g, ''))}
          onBlur={() => touch('telefono')}
          error={touched.telefono ? errors.telefono : null}
          type="tel"
          inputMode="numeric"
          hint="10 dígitos, sin indicativo. Te contactaremos aquí."
          maxLength={10}
        />
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  onBlur: () => void
  error: string | null
  type?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  hint?: string
  maxLength?: number
}

function Field({ label, placeholder, value, onChange, onBlur, error, type = 'text', inputMode, hint, maxLength }: FieldProps) {
  const isValid  = error === null && value.trim().length > 0
  const hasError = error !== null

  return (
    <div>
      <label className="block text-oswald text-xs tracking-widest uppercase mb-1.5" style={{ color: 'rgba(255,107,26,0.8)' }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="w-full px-4 py-3 rounded-lg text-oswald text-sm outline-none transition-all duration-200"
          style={{
            background: 'rgba(13,10,8,0.8)',
            border: `1px solid ${hasError ? 'rgba(204,34,0,0.6)' : isValid ? 'rgba(34,197,94,0.4)' : 'rgba(255,107,26,0.2)'}`,
            color: '#FFF0D4',
            caretColor: '#FFD700',
            paddingRight: isValid || hasError ? '2.5rem' : undefined,
          }}
          onFocus={(e) => {
            if (!hasError) e.currentTarget.style.border = '1px solid rgba(255,215,0,0.5)'
          }}
          onBlurCapture={(e) => {
            if (!isValid && !hasError) e.currentTarget.style.border = '1px solid rgba(255,107,26,0.2)'
          }}
        />
        {/* Ícono de estado */}
        {isValid && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#4ade80' }}>✓</span>
        )}
        {hasError && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#f87171' }}>✗</span>
        )}
      </div>

      {/* Error o hint */}
      {hasError ? (
        <p className="text-oswald text-xs mt-1 flex items-center gap-1" style={{ color: '#f87171' }}>
          {error}
        </p>
      ) : hint ? (
        <p className="text-oswald text-xs mt-1" style={{ color: 'rgba(255,240,212,0.35)' }}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
