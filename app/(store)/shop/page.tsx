'use client'

import { useState, useMemo } from 'react'
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react'
import { products, categories } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular'

export default function ShopPage() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [gridCols, setGridCols] = useState<3 | 4>(4)

  const materials = useMemo(
    () => [...new Set(products.map((p) => p.material))],
    []
  )

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (selectedMaterial !== 'all') {
      result = result.filter((p) => p.material === selectedMaterial)
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        break
    }

    return result
  }, [selectedCategory, priceRange, selectedMaterial, sortBy])

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange([0, 500])
    setSelectedMaterial('all')
  }

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    priceRange[0] > 0 ||
    priceRange[1] < 500 ||
    selectedMaterial !== 'all'

  return (
    <div className="pt-32 lg:pt-36 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Collection
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">
            All Products
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Browse our complete collection of premium showpieces and home decor
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground hover:text-gold transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-gold text-accent-foreground text-[10px] flex items-center justify-center rounded-full">
                  !
                </span>
              )}
            </button>
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Grid toggle */}
            <div className="hidden lg:flex items-center gap-1 border border-border rounded-sm">
              <button
                onClick={() => setGridCols(3)}
                className={cn(
                  'p-1.5',
                  gridCols === 3
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Grid3X3 size={14} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={cn(
                  'p-1.5',
                  gridCols === 4
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <LayoutGrid size={14} />
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-transparent text-xs tracking-[0.1em] uppercase text-foreground pr-6 cursor-pointer focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown
                size={12}
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside
            className={cn(
              'lg:w-64 shrink-0 transition-all duration-300',
              filtersOpen
                ? 'fixed inset-0 z-50 bg-background p-6 pt-20 lg:relative lg:inset-auto lg:z-auto lg:p-0 lg:pt-0 block'
                : 'hidden lg:block'
            )}
          >
            {/* Mobile close */}
            <button
              onClick={() => setFiltersOpen(false)}
              className="absolute top-6 right-6 lg:hidden"
            >
              <X size={20} />
            </button>

            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium">
                Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-gold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category filter */}
            <div className="mb-8">
              <h4 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                Category
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    'text-left text-sm py-1.5 transition-colors',
                    selectedCategory === 'all'
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={cn(
                      'text-left text-sm py-1.5 transition-colors',
                      selectedCategory === cat.slug
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {cat.name}{' '}
                    <span className="text-xs text-muted-foreground">
                      ({cat.productCount})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-8">
              <h4 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                Price Range
              </h4>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([+e.target.value, priceRange[1]])
                  }
                  className="w-20 px-3 py-2 bg-secondary text-sm text-foreground border border-border focus:outline-none focus:border-gold"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], +e.target.value])
                  }
                  className="w-20 px-3 py-2 bg-secondary text-sm text-foreground border border-border focus:outline-none focus:border-gold"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Material filter */}
            <div className="mb-8">
              <h4 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                Material
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedMaterial('all')}
                  className={cn(
                    'text-left text-sm py-1.5 transition-colors',
                    selectedMaterial === 'all'
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  All Materials
                </button>
                {materials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={cn(
                      'text-left text-sm py-1.5 transition-colors',
                      selectedMaterial === mat
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply on mobile */}
            <button
              onClick={() => setFiltersOpen(false)}
              className="w-full py-3 bg-foreground text-background text-xs tracking-[0.15em] uppercase lg:hidden"
            >
              Apply Filters ({filteredProducts.length} results)
            </button>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-xl text-foreground mb-2">
                  No products found
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your filters to find what you{"'"}re looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-xs tracking-[0.15em] uppercase text-gold hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  'grid gap-4 lg:gap-6',
                  gridCols === 3
                    ? 'grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-2 lg:grid-cols-4'
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
