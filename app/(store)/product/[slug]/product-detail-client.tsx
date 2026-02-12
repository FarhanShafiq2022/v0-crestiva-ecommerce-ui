'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Star,
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  Share2,
  ChevronRight,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/lib/data'
import { reviews } from '@/lib/data'
import { useCart } from '@/lib/store'
import { useWishlist } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

interface Props {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'shipping'>('description')

  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)

  const images = [product.image, product.hoverImage].filter(Boolean) as string[]

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${product.name} added to cart`, {
      description: `Quantity: ${quantity}`,
    })
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
          <Link href="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'w-16 h-20 lg:w-20 lg:h-24 rounded-sm overflow-hidden border-2 transition-colors',
                    selectedImage === i
                      ? 'border-gold'
                      : 'border-transparent hover:border-border'
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 aspect-[3/4] rounded-sm overflow-hidden bg-muted">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="lg:py-4">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {product.isNew && (
                <span className="px-2.5 py-1 bg-foreground text-background text-[10px] tracking-[0.15em] uppercase font-medium">
                  New
                </span>
              )}
              {product.isLimitedEdition && (
                <span className="px-2.5 py-1 bg-gold text-accent-foreground text-[10px] tracking-[0.15em] uppercase font-medium">
                  Limited Edition
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={cn(
                      i < Math.floor(product.rating)
                        ? 'fill-gold text-gold'
                        : 'text-border'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif text-2xl text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs font-medium rounded-sm">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            {/* Variants */}
            <div className="mb-6">
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Material
              </p>
              <div className="inline-flex px-4 py-2 border border-gold bg-gold/5 text-sm text-foreground rounded-sm">
                {product.material}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Color
              </p>
              <div className="inline-flex px-4 py-2 border border-border text-sm text-foreground rounded-sm">
                {product.color}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-medium text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-gold text-accent-foreground text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold/90 transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={() => {
                  toggleWishlist(product.id)
                  toast.success(
                    wishlisted ? 'Removed from wishlist' : 'Added to wishlist'
                  )
                }}
                className={cn(
                  'p-4 border border-border hover:border-gold transition-colors',
                  wishlisted && 'border-gold bg-gold/5'
                )}
                aria-label="Toggle wishlist"
              >
                <Heart
                  size={18}
                  className={cn(wishlisted ? 'fill-gold text-gold' : 'text-foreground')}
                />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border mb-6">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'On orders $500+' },
                { icon: RotateCcw, label: '30-Day Returns', sub: 'Easy returns' },
                { icon: Shield, label: 'Authenticity', sub: 'Guaranteed' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon size={18} className="mx-auto text-gold mb-2" />
                  <p className="text-xs font-medium text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Share2 size={14} />
              Share this product
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20">
          <div className="flex items-center gap-8 border-b border-border">
            {(
              [
                { key: 'description', label: 'Description' },
                { key: 'specs', label: 'Specifications' },
                { key: 'reviews', label: `Reviews (${product.reviewCount})` },
                { key: 'shipping', label: 'Shipping & Returns' },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  'pb-4 text-sm transition-colors border-b-2',
                  activeTab === key
                    ? 'border-gold text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="py-10">
            {activeTab === 'description' && (
              <div className="max-w-2xl">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-lg">
                <dl className="divide-y divide-border">
                  {[
                    ['Material', product.material],
                    ['Color', product.color],
                    ['Dimensions', product.dimensions],
                    ['Weight', product.weight],
                    ['Availability', product.inStock ? 'In Stock' : 'Out of Stock'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between py-4">
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="text-sm font-medium text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-2xl space-y-8">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-8 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm font-medium text-foreground">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={10}
                                className={cn(
                                  i < review.rating
                                    ? 'fill-gold text-gold'
                                    : 'text-border'
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Shipping</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Complimentary shipping on all orders over $500. Standard delivery takes
                    5-7 business days. Express delivery (2-3 business days) is available for
                    an additional $25. All items are carefully wrapped in premium packaging.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Returns</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We offer a 30-day return policy on all items in their original condition
                    and packaging. Return shipping is free for defective items. For all other
                    returns, a flat $15 return shipping fee applies.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-border">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
                  You May Also Like
                </p>
                <h3 className="font-serif text-2xl text-foreground">
                  Related Products
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-gold transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
