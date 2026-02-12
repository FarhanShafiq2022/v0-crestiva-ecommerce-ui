'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      toast.success('Message sent successfully! We will get back to you soon.')
    }, 1500)
  }

  return (
    <div className="pt-32 lg:pt-36 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Contact</span>
        </nav>

        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Have a question about our products or need styling advice? We{"'"}d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  detail: 'hello@crestiva.com',
                  sub: 'We reply within 24 hours',
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  detail: '+1 (555) 234-5678',
                  sub: 'Mon - Fri, 9am - 6pm EST',
                },
                {
                  icon: MapPin,
                  title: 'Showroom',
                  detail: '245 Fifth Avenue',
                  sub: 'New York, NY 10016',
                },
                {
                  icon: Clock,
                  title: 'Hours',
                  detail: 'Mon - Sat: 10am - 7pm',
                  sub: 'Sun: 12pm - 5pm',
                },
              ].map(({ icon: Icon, title, detail, sub }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      {title}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {detail}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors text-foreground">
                  <option>General Inquiry</option>
                  <option>Product Question</option>
                  <option>Order Support</option>
                  <option>Styling Advice</option>
                  <option>Wholesale Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-gold transition-colors resize-none text-foreground"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 px-10 py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition-colors disabled:opacity-70"
              >
                <Send size={14} />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
