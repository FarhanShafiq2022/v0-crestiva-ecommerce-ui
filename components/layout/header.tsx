'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/store'
import { useWishlist } from '@/lib/store'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [shopDropdown, setShopDropdown] = useState(false)
  const { itemCount } = useCart()
  const { ids: wishlistIds } = useWishlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Top bar */}
          <div className="hidden lg:flex items-center justify-center border-b border-border/30 py-2">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Complimentary shipping on orders over $500
            </p>
          </div>

          {/* Main nav */}
          <div className="flex items-center justify-between py-4 lg:py-5">
            {/* Left - Menu button (mobile) + nav (desktop) */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-foreground"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <nav className="hidden lg:flex items-center gap-8">
                <Link
                  href="/"
                  className="text-xs tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <div
                  className="relative"
                  onMouseEnter={() => setShopDropdown(true)}
                  onMouseLeave={() => setShopDropdown(false)}
                >
                  <Link
                    href="/shop"
                    className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Shop <ChevronDown size={12} />
                  </Link>
                  {/* Mega menu */}
                  <div
                    className={cn(
                      'absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-card border border-border rounded-sm shadow-xl p-8 transition-all duration-300',
                      shopDropdown
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    )}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/shop?category=${cat.slug}`}
                          className="group"
                        >
                          <div className="aspect-square rounded-sm overflow-hidden mb-3">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <p className="text-sm font-medium text-foreground">{cat.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {cat.productCount} pieces
                          </p>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-border">
                      <Link
                        href="/shop"
                        className="text-xs tracking-[0.15em] uppercase text-gold hover:underline"
                      >
                        View All Collections
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="text-xs tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="text-xs tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground transition-colors"
                >
                  Journal
                </Link>
                <Link
                  href="/contact"
                  className="text-xs tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Center - Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="font-serif text-2xl lg:text-3xl tracking-[0.1em] text-foreground">
                CRESTIVA
              </h1>
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <Link
                href="/wishlist"
                className="relative text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-accent-foreground text-[10px] font-medium flex items-center justify-center rounded-full">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                className="hidden lg:block text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Account"
              >
                <User size={18} />
              </Link>
              <Link
                href="/cart"
                className="relative text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-accent-foreground text-[10px] font-medium flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm">
          <div className="flex items-start justify-center pt-32">
            <div className="w-full max-w-2xl mx-4 bg-card rounded-sm shadow-2xl p-8 animate-fade-in">
              <div className="flex items-center gap-4 border-b border-border pb-4">
                <Search size={20} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for showpieces, vases, sculptures..."
                  className="flex-1 bg-transparent text-lg font-serif placeholder:text-muted-foreground focus:outline-none text-foreground"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mt-6">
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Sculptures', 'Gold Decor', 'Ceramic Vases', 'Limited Edition'].map(
                    (term) => (
                      <Link
                        key={term}
                        href={`/shop?search=${term.toLowerCase()}`}
                        onClick={() => setSearchOpen(false)}
                        className="px-4 py-2 bg-secondary text-secondary-foreground text-sm rounded-sm hover:bg-muted transition-colors"
                      >
                        {term}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-[55] bg-background transition-transform duration-500 lg:hidden',
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="pt-20 px-6">
          <nav className="flex flex-col gap-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/shop', label: 'Shop' },
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Journal' },
              { href: '/contact', label: 'Contact' },
              { href: '/account', label: 'Account' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 border-b border-border text-lg font-serif tracking-wide text-foreground hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Categories
            </p>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-gold transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
