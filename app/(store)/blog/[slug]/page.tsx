import Link from 'next/link'
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/data'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const currentIndex = blogPosts.findIndex((p) => p.id === post.id)
  const nextPost = blogPosts[currentIndex + 1]
  const prevPost = blogPosts[currentIndex - 1]

  return (
    <div className="pt-32 lg:pt-36 pb-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Journal
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground line-clamp-1">{post.title}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.15em] uppercase text-gold font-medium">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4 text-balance">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground">By {post.author}</p>
        </div>

        {/* Featured image */}
        <div className="aspect-[16/9] rounded-sm overflow-hidden bg-muted mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none mb-16">
          <p className="text-muted-foreground leading-relaxed text-base">
            {post.excerpt}
          </p>
          <p className="text-muted-foreground leading-relaxed text-base mt-4">
            The world of luxury home decor is one where form meets function,
            where every piece tells a story. At Crestiva, we believe that the
            objects you surround yourself with should elevate your daily
            experience and reflect your personal aesthetic sensibility.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base mt-4">
            When selecting pieces for your space, consider the interplay
            between textures, scale, and negative space. A single statement
            sculpture can define an entire room, while a carefully arranged
            collection of smaller objects creates a narrative that draws the
            eye and sparks conversation.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base mt-4">
            The key is intentionality. Each piece should earn its place,
            contributing to the overall harmony of the space rather than
            competing for attention. This philosophy of mindful curation is at
            the heart of everything we do at Crestiva.
          </p>
        </article>

        {/* Navigation */}
        <div className="flex items-center justify-between py-8 border-t border-border">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-gold transition-colors"
            >
              <ArrowLeft size={14} />
              Previous Article
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-gold transition-colors"
            >
              Next Article
              <ArrowRight size={14} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
