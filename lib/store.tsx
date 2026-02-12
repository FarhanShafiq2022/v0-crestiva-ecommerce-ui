'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react'
import type { Product } from './data'

// ---- Cart types ----
export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        }
      }
      return {
        items: [...state.items, { product: action.product, quantity: action.quantity }],
      }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) }
    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) }
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

// ---- Wishlist types ----
interface WishlistState {
  ids: string[]
}

type WishlistAction = { type: 'TOGGLE'; productId: string }

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'TOGGLE': {
      if (state.ids.includes(action.productId)) {
        return { ids: state.ids.filter((id) => id !== action.productId) }
      }
      return { ids: [...state.ids, action.productId] }
    }
    default:
      return state
  }
}

// ---- Contexts ----
interface CartContextValue {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

interface WishlistContextValue {
  ids: string[]
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

const CartContext = createContext<CartContextValue | null>(null)
const WishlistContext = createContext<WishlistContextValue | null>(null)

// ---- Provider ----
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] })
  const [wishlistState, wishlistDispatch] = useReducer(wishlistReducer, {
    ids: [],
  })

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      cartDispatch({ type: 'ADD', product, quantity })
    },
    []
  )

  const removeFromCart = useCallback((productId: string) => {
    cartDispatch({ type: 'REMOVE', productId })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    cartDispatch({ type: 'UPDATE_QTY', productId, quantity })
  }, [])

  const clearCart = useCallback(() => {
    cartDispatch({ type: 'CLEAR' })
  }, [])

  const total = cartState.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  )
  const itemCount = cartState.items.reduce((sum, i) => sum + i.quantity, 0)

  const toggleWishlist = useCallback((productId: string) => {
    wishlistDispatch({ type: 'TOGGLE', productId })
  }, [])

  const isInWishlist = useCallback(
    (productId: string) => wishlistState.ids.includes(productId),
    [wishlistState.ids]
  )

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      <WishlistContext.Provider
        value={{
          ids: wishlistState.ids,
          toggleWishlist,
          isInWishlist,
        }}
      >
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  )
}

// ---- Hooks ----
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within StoreProvider')
  return ctx
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within StoreProvider')
  return ctx
}
