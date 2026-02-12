import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/data'

export default function BlogPage() {
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <div className="pt-32 lg:pt-36 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Journal</span>
        </nav>

        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
            The Crestiva Journal
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">
            Stories & Inspiration
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Explore design insights, styling tips, and the stories behind our
            curated collections.
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-16"
          >
            <div className="aspect-[4/3] rounded-sm overflow-hidden bg-muted">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] tracking-[0.15em] uppercase text-gold font-medium">
                  {featured.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {featured.date}
                </span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-4 group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/70 group-hover:text-gold transition-colors">
                Read Article
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        )}

        {/* Other posts */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <div className="aspect-[4/3] rounded-sm overflow-hidden bg-muted mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-gold font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
