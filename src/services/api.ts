import { CONFIG } from '../config'

export type TicketStatus = 'available' | 'reserved' | 'sold'

export interface TicketState {
  numero: string
  status: TicketStatus
}

export interface ReservaPayload {
  nombre: string
  cedula: string
  telefono: string
  numeros: string[]       // internamente strings ("03"), se convierten a int antes de enviar
  total: number
  comprobante: string     // base64 con prefijo data:image/...
  nombreArchivo: string   // {cedula}.ext
}

// ─── GET: estado actual de todos los boletos ─────────────────────────────────
// n8n devuelve un array: [{ numero: "00", status: "available" }, ...]
// Si la hoja aún no tiene datos devuelve array vacío → usamos fallback de available
export async function fetchTickets(): Promise<TicketState[]> {
  const res = await fetch(`${CONFIG.N8N_BASE_URL}/tickets`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Error ${res.status} al cargar boletos`)
  }

  const data = await res.json()

  // n8n puede devolver el array directo o envuelto en un objeto
  const rows: unknown[] = Array.isArray(data) ? data : (data?.data ?? data?.rows ?? [])

  return rows
    .filter((r): r is Record<string, unknown> => typeof r === 'object' && r !== null)
    .map((r) => ({
      // numero puede venir como número entero (3) o string ("03") desde Sheets
      numero: String(r.numero ?? '').padStart(2, '0'),
      status: isValidStatus(r.status) ? r.status : 'available',
    }))
}

// ─── POST: enviar reserva con comprobante ────────────────────────────────────
// El endpoint espera numeros como enteros: [3, 4] — no strings
export async function crearReserva(payload: ReservaPayload): Promise<{ ok: boolean }> {
  const body = {
    nombre:        payload.nombre,
    cedula:        payload.cedula,
    telefono:      payload.telefono,
    numeros:       payload.numeros.map((n) => parseInt(n, 10)),  // "03" → 3
    total:         payload.total,
    comprobante:   payload.comprobante,
    nombreArchivo: payload.nombreArchivo,
  }

  const res = await fetch(`${CONFIG.N8N_BASE_URL}/reservar`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })

  if (!res.ok) {
    // n8n puede devolver un mensaje de error en el body
    let msg = `Error ${res.status} al enviar la reserva`
    try {
      const err = await res.json()
      if (err?.message) msg = err.message
    } catch { /* ignore */ }
    throw new Error(msg)
  }

  const result = await res.json()
  // n8n puede devolver { ok: true } o simplemente {}
  return { ok: result?.ok !== false }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Nombre final del archivo: {cedula}.{ext}
export function buildFileName(cedula: string, file: File): string {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  return `${cedula.trim()}.${ext}`
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style:                 'currency',
    currency:              'COP',
    minimumFractionDigits: 0,
  }).format(amount)
}

// ─── Guard ────────────────────────────────────────────────────────────────────
function isValidStatus(v: unknown): v is TicketStatus {
  return v === 'available' || v === 'reserved' || v === 'sold'
}
