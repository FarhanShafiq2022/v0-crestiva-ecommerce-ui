'use client'

import Link from 'next/link'
import { Heart, ChevronRight, ArrowRight } from 'lucide-react'
import { useWishlist } from '@/lib/store'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

export default function WishlistPage() {
  const { ids } = useWishlist()
  const wishlistedProducts = products.filter((p) => ids.includes(p.id))

  if (wishlistedProducts.length === 0) {
    return (
      <div className="pt-32 lg:pt-36 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
              <Heart size={32} className="text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl text-foreground mb-3">
              Your Wishlist is Empty
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Save your favorite pieces to revisit later. Browse our collection to find items you love.
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
          <span className="text-foreground">Wishlist</span>
        </nav>

        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground">
              My Wishlist
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {wishlistedProducts.length} saved {wishlistedProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-gold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
