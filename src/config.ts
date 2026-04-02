// ─── Variables del negocio ────────────────────────────────────────────────────
// Cambia estos valores sin tocar nada más en la app.

export const CONFIG = {
  // Número Nequi al que se hace el pago
  NEQUI_NUMBER: '3157645002',

  // Precio por puesto en pesos colombianos
  TICKET_PRICE: 10_000,

  // Máximo de puestos por compra
  MAX_TICKETS_PER_ORDER: 6,

  // Total de puestos disponibles (00 al 99)
  TOTAL_TICKETS: 100,

  // Fecha del sorteo de la rifa (Lotería de Santander)
  DRAW_DATE: '17 de Abril, 2026',
  DRAW_LOTTERY: 'Lotería de Santander',
  DRAW_TIME: '11:00 PM',

  // Fecha del evento
  EVENT_DATE: '25 de Abril, 2026',

  // Lugar
  EVENT_VENUE: 'Estadio Atanasio Girardot · Oriental Baja',

  // Base URL del n8n self-hosted (sin slash al final)
  N8N_BASE_URL: 'https://n8n.ia-academy.com.co/webhook',
} as const
