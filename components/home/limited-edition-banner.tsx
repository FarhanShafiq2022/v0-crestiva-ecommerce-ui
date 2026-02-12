import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function LimitedEditionBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Image */}
        <div className="relative h-64 lg:h-auto">
          <img
            src="/images/limited-edition.jpg"
            alt="Limited edition collection"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex items-center bg-primary text-primary-foreground p-10 lg:p-20">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Exclusive Collection
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.15] mb-6 text-balance">
              Limited Edition Artisan Pieces
            </h2>
            <p className="text-primary-foreground/60 leading-relaxed mb-8 max-w-md">
              Discover our most exclusive creations. Each limited edition piece
              is numbered and accompanied by a certificate of authenticity,
              making it a true collector{"'"}s item.
            </p>
            <Link
              href="/shop?filter=limited"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-accent-foreground text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold/90 transition-colors"
            >
              Discover Collection
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
