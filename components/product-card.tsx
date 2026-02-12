'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/lib/data'
import { useCart } from '@/lib/store'
import { useWishlist } from '@/lib/store'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)
  const router = useRouter()

  const productHref = `/product/${product.slug}`

  return (
    <div
      className={cn('group relative', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area - use a div instead of Link to avoid nested <a> tags */}
      <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-muted cursor-pointer" onClick={() => router.push(productHref)}>
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            'w-full h-full object-cover transition-all duration-700',
            hovered && product.hoverImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          )}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={product.name}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700',
              hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            )}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-foreground text-background text-[10px] tracking-[0.15em] uppercase font-medium">
              New
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="px-2.5 py-1 bg-gold text-accent-foreground text-[10px] tracking-[0.15em] uppercase font-medium">
              Limited
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-1 bg-destructive text-destructive-foreground text-[10px] tracking-[0.15em] uppercase font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Quick actions overlay */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 p-3 flex items-center justify-center gap-2 transition-all duration-300',
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product)
              toast.success(`${product.name} added to cart`)
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-xs tracking-[0.1em] uppercase hover:bg-foreground/90 transition-colors"
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(productHref)
            }}
            className="p-2.5 bg-background/90 text-foreground hover:bg-background transition-colors"
            aria-label={`View ${product.name}`}
          >
            <Eye size={14} />
          </button>
        </div>
      </div>

      {/* Wishlist button */}
      <button
        onClick={() => {
          toggleWishlist(product.id)
          toast.success(
            wishlisted ? 'Removed from wishlist' : 'Added to wishlist'
          )
        }}
        className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          size={16}
          className={cn(
            'transition-colors',
            wishlisted ? 'fill-gold text-gold' : 'text-foreground'
          )}
        />
      </button>

      {/* Info */}
      <div className="mt-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-foreground leading-snug hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">{product.shortDescription}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={cn(
                  i < Math.floor(product.rating)
                    ? 'fill-gold text-gold'
                    : 'text-border'
                )}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-medium text-foreground">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
