import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/data'

export function CategoriesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Collections
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground text-balance">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative overflow-hidden rounded-sm aspect-[3/4]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p className="text-xs tracking-[0.15em] uppercase text-background/60 mb-1">
                  {category.productCount} Pieces
                </p>
                <h3 className="font-serif text-2xl text-background mb-3">
                  {category.name}
                </h3>
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-background/80 group-hover:text-gold transition-colors">
                  Explore
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
