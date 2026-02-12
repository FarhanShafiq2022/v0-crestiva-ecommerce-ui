'use client'

import Link from 'next/link'
import { NewsletterForm } from './newsletter-form'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 lg:py-20">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-serif text-2xl lg:text-3xl tracking-wide mb-3">
              Stay Inspired
            </h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-8">
              Subscribe to receive exclusive previews of new collections, styling
              tips, and members-only offers.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <h4 className="font-serif text-xl tracking-[0.1em] mb-4">
              CRESTIVA
            </h4>
            <p className="text-sm text-primary-foreground/50 leading-relaxed">
              Curating timeless pieces for modern living. Each item in our
              collection is selected for its exceptional craftsmanship and
              artistic merit.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase mb-6 text-primary-foreground/70">
              Customer Service
            </h5>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/contact', label: 'Contact Us' },
                { href: '/shipping', label: 'Shipping & Returns' },
                { href: '/faq', label: 'FAQ' },
                { href: '/care', label: 'Care Guide' },
                { href: '/gift-cards', label: 'Gift Cards' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase mb-6 text-primary-foreground/70">
              Quick Links
            </h5>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/shop', label: 'Shop All' },
                { href: '/shop?filter=new', label: 'New Arrivals' },
                { href: '/shop?filter=bestseller', label: 'Best Sellers' },
                { href: '/about', label: 'Our Story' },
                { href: '/blog', label: 'Journal' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase mb-6 text-primary-foreground/70">
              Get in Touch
            </h5>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/50">
              <p>hello@crestiva.com</p>
              <p>+1 (555) 234-5678</p>
              <p>Mon - Fri, 9am - 6pm EST</p>
              <div className="flex gap-4 mt-2">
                {['Instagram', 'Pinterest', 'Facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-xs tracking-[0.1em] uppercase hover:text-primary-foreground transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            2026 Crestiva. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
