'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

export function BestSellersSection() {
  const bestSellers = products.filter((p) => p.isBestSeller)

  return (
    <section className="py-20 lg:py-28 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Most Loved
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop?filter=bestseller"
            className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-gold transition-colors"
          >
            View All
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/shop?filter=bestseller"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-gold transition-colors"
          >
            View All Best Sellers
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  )
}
