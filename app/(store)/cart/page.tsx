'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Minus,
  Plus,
  X,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Truck,
  RotateCcw,
  Shield,
} from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const shipping = total >= 500 ? 0 : 25
  const grandTotal = total + shipping

  if (items.length === 0) {
    return (
      <div className="pt-32 lg:pt-36 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl text-foreground mb-3">
              Your Cart is Empty
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Discover our curated collection of premium showpieces and find something that speaks to you.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors"
            >
              Explore Collection
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 lg:pt-36 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Shopping Cart</span>
        </nav>

        <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-10">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Cart items */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 pb-4 border-b border-border">
              <p className="col-span-6 text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Product
              </p>
              <p className="col-span-2 text-xs tracking-[0.15em] uppercase text-muted-foreground text-center">
                Quantity
              </p>
              <p className="col-span-2 text-xs tracking-[0.15em] uppercase text-muted-foreground text-right">
                Price
              </p>
              <p className="col-span-2 text-xs tracking-[0.15em] uppercase text-muted-foreground text-right">
                Total
              </p>
            </div>

            {/* Items */}
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="grid grid-cols-12 gap-4 py-6 items-center"
                >
                  {/* Product info */}
                  <div className="col-span-12 lg:col-span-6 flex gap-4">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="w-20 h-24 lg:w-24 lg:h-28 rounded-sm overflow-hidden bg-muted shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-sm font-medium text-foreground hover:text-gold transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.product.material}
                      </p>
                      <button
                        onClick={() => {
                          removeFromCart(item.product.id)
                          toast.success('Item removed from cart')
                        }}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors mt-2 self-start"
                      >
                        <X size={12} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-4 lg:col-span-2 flex items-center justify-center">
                    <div className="inline-flex items-center border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-4 lg:col-span-2 text-right">
                    <p className="text-sm text-foreground">${item.product.price}</p>
                    {item.product.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">
                        ${item.product.originalPrice}
                      </p>
                    )}
                  </div>

                  {/* Line total */}
                  <div className="col-span-4 lg:col-span-2 text-right">
                    <p className="text-sm font-medium text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <Link
                href="/shop"
                className="text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-gold transition-colors"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  clearCart()
                  toast.success('Cart cleared')
                }}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-sm p-6 lg:p-8 sticky top-32">
              <h3 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-gold">
                    Add ${(500 - total).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              {/* Promo code */}
              <div className="mb-6">
                <div className="flex gap-0">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2.5 bg-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold text-foreground"
                  />
                  <button className="px-4 py-2.5 bg-muted text-xs tracking-[0.1em] uppercase text-foreground hover:bg-border transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-border mb-6">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="font-serif text-xl text-foreground">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors"
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </Link>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
                {[
                  { icon: Truck, label: 'Free Ship' },
                  { icon: RotateCcw, label: '30 Days' },
                  { icon: Shield, label: 'Secure' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <Icon size={14} className="mx-auto text-gold mb-1" />
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
