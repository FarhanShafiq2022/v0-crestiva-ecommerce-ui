'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

export function NewArrivalsSection() {
  const newArrivals = products.filter((p) => p.isNew)

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Just Arrived
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?filter=new"
            className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-gold transition-colors"
          >
            View All
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
