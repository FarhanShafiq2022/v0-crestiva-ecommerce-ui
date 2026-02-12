'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Heart, User, Grid3X3 } from 'lucide-react'
import { useCart } from '@/lib/store'
import { useWishlist } from '@/lib/store'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shop', label: 'Shop', icon: Grid3X3 },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/cart', label: 'Cart', icon: ShoppingBag },
  { href: '/account', label: 'Account', icon: User },
]

export function MobileNav() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { ids: wishlistIds } = useWishlist()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border lg:hidden">
      <div className="flex items-center justify-around py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {links.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon
          const badge =
            link.href === '/cart'
              ? itemCount
              : link.href === '/wishlist'
                ? wishlistIds.length
                : 0

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative flex flex-col items-center gap-0.5 px-3 py-1 transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px]">{link.label}</span>
              {badge > 0 && (
                <span className="absolute -top-0.5 right-1 w-4 h-4 bg-gold text-accent-foreground text-[9px] font-medium flex items-center justify-center rounded-full">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
