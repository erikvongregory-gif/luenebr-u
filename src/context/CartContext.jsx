import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'luenebraeu-cart'

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeItem(id)
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    )
  }

  const totalItems = items.reduce((sum, p) => sum + p.quantity, 0)
  const totalPrice = items.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        totalPrice,
        clearCart: () => setItems([])
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
