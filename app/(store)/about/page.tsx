import Link from 'next/link'
import { ChevronRight, Award, Leaf, Heart, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="pt-32 lg:pt-36 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">About</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Our Story
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-6 text-balance">
              Curating Beauty for Modern Living
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2018, Crestiva was born from a passion for exceptional
              craftsmanship and the belief that every home deserves a touch of
              artistry. We partner with master artisans and independent studios
              around the world to bring you pieces that inspire.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each item in our collection is carefully selected for its
              exceptional design, quality of materials, and the story it tells.
              From hand-thrown ceramics to precision-cut crystal, every piece
              carries the mark of its maker.
            </p>
          </div>
          <div className="aspect-[4/5] rounded-sm overflow-hidden bg-muted">
            <img
              src="/images/about.jpg"
              alt="Crestiva showroom interior with premium decor pieces"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="py-20 border-t border-border">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
              What We Stand For
            </p>
            <h2 className="font-serif text-3xl text-foreground">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Craftsmanship',
                desc: 'Every piece is crafted with meticulous attention to detail by skilled artisans.',
              },
              {
                icon: Leaf,
                title: 'Sustainability',
                desc: 'We prioritize eco-conscious materials and support sustainable production methods.',
              },
              {
                icon: Heart,
                title: 'Curated Selection',
                desc: 'Each item is hand-selected to ensure it meets our standards of beauty and quality.',
              },
              {
                icon: Globe,
                title: 'Global Artisans',
                desc: 'We partner with talented makers from Italy, Japan, Scandinavia, and beyond.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="py-16 bg-primary text-primary-foreground rounded-sm -mx-4 px-4 lg:-mx-8 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Curated Pieces' },
              { value: '50+', label: 'Artisan Partners' },
              { value: '15K+', label: 'Happy Customers' },
              { value: '12', label: 'Countries' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-3xl lg:text-4xl text-gold mb-1">
                  {value}
                </p>
                <p className="text-xs tracking-[0.15em] uppercase text-primary-foreground/60">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-4">
            Discover Our Collection
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Explore our curated selection of premium showpieces and find the
            perfect piece for your space.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}
