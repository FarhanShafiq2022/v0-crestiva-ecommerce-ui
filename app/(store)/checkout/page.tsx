'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  Lock,
  CreditCard,
  Truck,
  ShoppingBag,
  ArrowRight,
  Check,
} from 'lucide-react'
import { useCart } from '@/lib/store'
import { cn } from '@/lib/utils'

type Step = 'shipping' | 'payment' | 'review'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState<Step>('shipping')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shipping = total >= 500 ? 0 : 25
  const tax = total * 0.08
  const grandTotal = total + shipping + tax

  const steps: { key: Step; label: string; icon: typeof Truck }[] = [
    { key: 'shipping', label: 'Shipping', icon: Truck },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'review', label: 'Review', icon: Check },
  ]

  const currentStepIndex = steps.findIndex((s) => s.key === step)

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-32 lg:pt-36 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl text-foreground mb-3">
              Nothing to Checkout
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Add items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors"
            >
              Shop Now
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="pt-32 lg:pt-36 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-lg mx-auto text-center py-20 animate-fade-in">
            <div className="w-20 h-20 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6">
              <Check size={32} className="text-gold" />
            </div>
            <h1 className="font-serif text-3xl text-foreground mb-3">
              Thank You for Your Order
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Your order has been confirmed. We{"'"}ll send you a confirmation email shortly with tracking details.
            </p>
            <p className="text-xs text-muted-foreground mb-8">
              Order #CRV-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors"
            >
              Continue Shopping
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
          <Link href="/cart" className="hover:text-foreground transition-colors">
            Cart
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Checkout</span>
        </nav>

        <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-10">
          Checkout
        </h1>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <button
                onClick={() => {
                  if (i <= currentStepIndex) setStep(s.key)
                }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors',
                  i <= currentStepIndex
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors',
                    i < currentStepIndex
                      ? 'bg-gold text-accent-foreground'
                      : i === currentStepIndex
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-muted-foreground'
                  )}
                >
                  {i < currentStepIndex ? <Check size={12} /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'w-12 lg:w-20 h-px',
                    i < currentStepIndex ? 'bg-gold' : 'bg-border'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <div className="animate-fade-in">
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="Alexandra"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="Smith"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="alexandra@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-muted-foreground mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="123 Park Avenue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="New York"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">
                        ZIP
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-muted-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="mt-8 flex items-center justify-center gap-2 w-full sm:w-auto px-12 py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors"
                >
                  Continue to Payment
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="animate-fade-in">
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
                  Payment Method
                </h2>
                <div className="border border-gold bg-gold/5 rounded-sm p-4 mb-6 flex items-center gap-3">
                  <CreditCard size={18} className="text-gold" />
                  <span className="text-sm text-foreground">Credit / Debit Card</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="Alexandra Smith"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep('shipping')}
                    className="px-8 py-4 border border-border text-xs tracking-[0.2em] uppercase text-foreground hover:border-foreground transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('review')}
                    className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-12 py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors"
                  >
                    Review Order
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="animate-fade-in">
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
                  Review Your Order
                </h2>

                <div className="divide-y divide-border border border-border rounded-sm overflow-hidden">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4">
                      <div className="w-16 h-20 rounded-sm overflow-hidden bg-muted shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep('payment')}
                    className="px-8 py-4 border border-border text-xs tracking-[0.2em] uppercase text-foreground hover:border-foreground transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      clearCart()
                      setOrderPlaced(true)
                    }}
                    className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-12 py-4 bg-gold text-accent-foreground text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold/90 transition-colors"
                  >
                    <Lock size={14} />
                    Place Order - ${grandTotal.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-sm p-6 lg:p-8 sticky top-32">
              <h3 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground truncate mr-3">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="text-foreground shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-t border-border">
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
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="font-serif text-xl text-foreground">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
                <Lock size={12} />
                Secure checkout powered by SSL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
