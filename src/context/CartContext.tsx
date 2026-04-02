import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { CONFIG } from '../config'

interface CartContextValue {
  selected: string[]          // números en el carrito, ej: ["07", "33"]
  toggle: (num: string) => void
  clear: () => void
  isMaxReached: boolean
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = useCallback((num: string) => {
    setSelected((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num)
      }
      if (prev.length >= CONFIG.MAX_TICKETS_PER_ORDER) return prev
      return [...prev, num]
    })
  }, [])

  const clear = useCallback(() => setSelected([]), [])

  return (
    <CartContext.Provider
      value={{
        selected,
        toggle,
        clear,
        isMaxReached: selected.length >= CONFIG.MAX_TICKETS_PER_ORDER,
        total: selected.length * CONFIG.TICKET_PRICE,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
