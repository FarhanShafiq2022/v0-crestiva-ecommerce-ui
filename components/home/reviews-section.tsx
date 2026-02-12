'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { reviews } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ReviewsSection() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((c) => (c + 1) % reviews.length)
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length)

  return (
    <section className="py-20 lg:py-28 bg-secondary/50">
      <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Testimonials
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-16">
          What Our Clients Say
        </h2>

        <div className="relative">
          <Quote size={40} className="mx-auto text-gold/30 mb-8" />

          <div className="min-h-[180px] flex items-center justify-center">
            <div key={current} className="animate-fade-in">
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={cn(
                      i < reviews[current].rating
                        ? 'fill-gold text-gold'
                        : 'text-border'
                    )}
                  />
                ))}
              </div>
              <p className="font-serif text-lg lg:text-xl text-foreground leading-relaxed max-w-2xl mx-auto mb-8 italic">
                {`"${reviews[current].comment}"`}
              </p>
              <p className="text-sm font-medium text-foreground">
                {reviews[current].name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Verified Customer
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-2 border border-border rounded-full hover:border-foreground transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    i === current ? 'bg-gold w-6' : 'bg-border'
                  )}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 border border-border rounded-full hover:border-foreground transition-colors"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
