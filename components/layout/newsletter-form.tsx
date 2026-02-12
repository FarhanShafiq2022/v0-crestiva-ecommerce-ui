"use client"

export function NewsletterForm() {
  return (
    <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 px-5 py-3 bg-primary-foreground/5 border border-primary-foreground/20 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/40 text-primary-foreground"
      />
      <button
        type="submit"
        className="px-8 py-3 bg-gold text-accent-foreground text-xs tracking-[0.15em] uppercase font-medium hover:bg-gold/90 transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}
