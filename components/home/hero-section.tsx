import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Luxury home decor showpieces"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-background/70 mb-6 animate-fade-in stagger-1">
          Premium Home Decor
        </p>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-background leading-[1.1] mb-6 animate-fade-in stagger-2 text-balance">
          Where Art Meets Living
        </h2>
        <p className="text-background/80 text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10 animate-fade-in stagger-3">
          Discover curated collections of exquisite showpieces, each crafted to
          transform your space into a gallery of modern luxury.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-4">
          <Link
            href="/shop"
            className="group flex items-center gap-3 px-10 py-4 bg-background text-foreground text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold hover:text-accent-foreground transition-all duration-300"
          >
            Shop Now
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-3 px-10 py-4 border border-background/40 text-background text-xs tracking-[0.2em] uppercase hover:bg-background/10 transition-all duration-300"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in stagger-5">
        <span className="text-[10px] tracking-[0.2em] uppercase text-background/50">
          Scroll
        </span>
        <div className="w-px h-8 bg-background/30" />
      </div>
    </section>
  )
}
