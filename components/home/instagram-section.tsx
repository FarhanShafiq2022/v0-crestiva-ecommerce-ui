import { products } from '@/lib/data'

export function InstagramSection() {
  const images = products.slice(0, 6)

  return (
    <section className="py-20 lg:py-28">
      <div className="text-center mb-14 px-4">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Follow Us
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-3">
          @crestiva
        </h2>
        <p className="text-sm text-muted-foreground">
          Share your styled spaces with #CrestivaHome
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {images.map((product, i) => (
          <a
            key={i}
            href="#"
            className="group relative aspect-square overflow-hidden"
          >
            <img
              src={product.image}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
          </a>
        ))}
      </div>
    </section>
  )
}
