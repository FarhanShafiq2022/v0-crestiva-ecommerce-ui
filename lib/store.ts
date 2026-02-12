import { useSyncExternalStore, useCallback } from 'react'
import type { Product } from './data'

// ---- Cart ----
export interface CartItem {
  product: Product
  quantity: number
}

let cartItems: CartItem[] = []
let cartListeners: Array<() => void> = []

function emitCartChange() {
  cartListeners.forEach((l) => l())
}

function getCartSnapshot() {
  return cartItems
}

function subscribeCart(listener: () => void) {
  cartListeners.push(listener)
  return () => {
    cartListeners = cartListeners.filter((l) => l !== listener)
  }
}

export function useCart() {
  const items = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartSnapshot)

  const addToCart = useCallback((product: Product, quantity = 1) => {
    const existing = cartItems.find((i) => i.product.id === product.id)
    if (existing) {
      cartItems = cartItems.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
      )
    } else {
      cartItems = [...cartItems, { product, quantity }]
    }
    emitCartChange()
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    cartItems = cartItems.filter((i) => i.product.id !== productId)
    emitCartChange()
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      cartItems = cartItems.filter((i) => i.product.id !== productId)
    } else {
      cartItems = cartItems.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    }
    emitCartChange()
  }, [])

  const clearCart = useCallback(() => {
    cartItems = []
    emitCartChange()
  }, [])

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return { items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }
}

// ---- Wishlist ----
let wishlistIds: string[] = []
let wishlistListeners: Array<() => void> = []

function emitWishlistChange() {
  wishlistListeners.forEach((l) => l())
}

function getWishlistSnapshot() {
  return wishlistIds
}

function subscribeWishlist(listener: () => void) {
  wishlistListeners.push(listener)
  return () => {
    wishlistListeners = wishlistListeners.filter((l) => l !== listener)
  }
}

export function useWishlist() {
  const ids = useSyncExternalStore(subscribeWishlist, getWishlistSnapshot, getWishlistSnapshot)

  const toggleWishlist = useCallback((productId: string) => {
    if (wishlistIds.includes(productId)) {
      wishlistIds = wishlistIds.filter((id) => id !== productId)
    } else {
      wishlistIds = [...wishlistIds, productId]
    }
    emitWishlistChange()
  }, [])

  const isInWishlist = useCallback(
    (productId: string) => ids.includes(productId),
    [ids]
  )

  return { ids, toggleWishlist, isInWishlist }
}
