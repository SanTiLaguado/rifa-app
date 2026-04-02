// ─── Claves de almacenamiento ─────────────────────────────────────────────────
const COOLDOWN_KEY  = 'rifa_cooldown'    // localStorage: timestamp del último envío
const SESSION_KEY   = 'rifa_sent'        // sessionStorage: ya envió en este tab
const COOLDOWN_MS   = 30 * 60 * 1000    // 30 minutos

// ─── Cooldown por dispositivo ─────────────────────────────────────────────────
export function getCooldownRemaining(): number {
  try {
    const stored = localStorage.getItem(COOLDOWN_KEY)
    if (!stored) return 0
    const remaining = parseInt(stored) + COOLDOWN_MS - Date.now()
    return Math.max(0, remaining)
  } catch {
    return 0
  }
}

export function setCooldown(): void {
  try { localStorage.setItem(COOLDOWN_KEY, Date.now().toString()) } catch { /* */ }
}

export function formatCooldown(ms: number): string {
  const mins = Math.ceil(ms / 60_000)
  return `${mins} minuto${mins !== 1 ? 's' : ''}`
}

// ─── Flag de sesión (un solo envío por tab) ───────────────────────────────────
export function hasSubmittedThisSession(): boolean {
  try { return sessionStorage.getItem(SESSION_KEY) === '1' } catch { return false }
}

export function markSessionSubmitted(): void {
  try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* */ }
}

// ─── Validaciones de formato colombiano ──────────────────────────────────────
export function validatePhone(phone: string): string | null {
  const clean = phone.replace(/\s/g, '')
  if (clean.length === 0)  return 'Ingresa tu número de WhatsApp'
  if (!/^3/.test(clean))   return 'El número debe empezar por 3 (ej: 3001234567)'
  if (clean.length !== 10) return 'Debe tener exactamente 10 dígitos'
  return null
}

export function validateCedula(cedula: string): string | null {
  const clean = cedula.trim()
  if (clean.length === 0)        return 'Ingresa tu número de cédula'
  if (!/^\d+$/.test(clean))      return 'La cédula solo debe contener números'
  if (clean.length < 6)          return 'La cédula debe tener mínimo 6 dígitos'
  if (clean.length > 10)         return 'La cédula no puede tener más de 10 dígitos'
  return null
}

export function validateNombre(nombre: string): string | null {
  const clean = nombre.trim()
  if (clean.length === 0) return 'Ingresa tu nombre completo'
  if (clean.length < 3)   return 'El nombre es demasiado corto'
  if (!/\s/.test(clean))  return 'Ingresa nombre y apellido'
  return null
}

// ─── Validación de archivo ────────────────────────────────────────────────────
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
const MAX_FILE_SIZE = 5 * 1024 * 1024  // 5 MB

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type) && !file.type.startsWith('image/')) {
    return 'El archivo debe ser una imagen (JPG, PNG, WEBP)'
  }
  if (file.size > MAX_FILE_SIZE) {
    return `La imagen pesa ${(file.size / 1024 / 1024).toFixed(1)}MB. Máximo permitido: 5MB`
  }
  return null
}

// ─── Tiempo mínimo en el formulario ──────────────────────────────────────────
export const MIN_FORM_TIME_MS = 8_000  // 8 segundos
