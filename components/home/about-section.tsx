import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function AboutSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative rounded-sm overflow-hidden aspect-[4/5]">
            <img
              src="/images/about.jpg"
              alt="Crestiva showroom"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground leading-snug mb-6 text-balance">
              Crafting Timeless Elegance Since 2018
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Crestiva was born from a passion for exceptional craftsmanship and
              a belief that every home deserves pieces that inspire. We
              collaborate with master artisans from around the world to bring you
              collections that blur the line between functional decor and fine
              art.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Each piece in our collection is carefully selected for its quality,
              artistry, and the story it tells. From hand-thrown ceramics to
              precision-cast bronzes, our showpieces are designed to become
              cherished heirlooms.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { value: '500+', label: 'Curated Pieces' },
                { value: '40+', label: 'Master Artisans' },
                { value: '12K', label: 'Happy Homes' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl lg:text-3xl text-gold mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-foreground hover:text-gold transition-colors"
            >
              Learn More About Us
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
