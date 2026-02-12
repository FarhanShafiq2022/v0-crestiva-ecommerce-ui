export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  category: string
  rating: number
  reviewCount: number
  description: string
  shortDescription: string
  material: string
  color: string
  dimensions: string
  weight: string
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  isTrending?: boolean
  isLimitedEdition?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
  productCount: number
}

export interface Review {
  id: string
  name: string
  rating: number
  date: string
  comment: string
  avatar?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Sculptures',
    slug: 'sculptures',
    image: '/images/categories/sculptures.jpg',
    description:
      'Timeless sculptural pieces that transform any space into an art gallery.',
    productCount: 24,
  },
  {
    id: '2',
    name: 'Vases',
    slug: 'vases',
    image: '/images/categories/vases.jpg',
    description:
      'Elegant ceramic and glass vases crafted for modern interiors.',
    productCount: 18,
  },
  {
    id: '3',
    name: 'Lighting',
    slug: 'lighting',
    image: '/images/categories/lighting.jpg',
    description:
      'Ambient lighting accessories that set the mood for luxury living.',
    productCount: 15,
  },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Aurelia Gold Geometric Sculpture',
    slug: 'aurelia-gold-geometric-sculpture',
    price: 249,
    originalPrice: 299,
    image: '/images/products/product-1.jpg',
    hoverImage: '/images/products/product-2.jpg',
    category: 'sculptures',
    rating: 4.8,
    reviewCount: 42,
    description:
      'The Aurelia is a stunning geometric sculpture crafted from premium brass with a polished gold finish. Each angle catches light differently, creating an ever-changing display of reflections. Hand-finished by our master artisans in Italy, this piece represents the pinnacle of modern sculptural design.',
    shortDescription: 'Hand-crafted brass sculpture with polished gold finish',
    material: 'Brass with Gold Finish',
    color: 'Gold',
    dimensions: '12" x 8" x 6"',
    weight: '2.4 kg',
    inStock: true,
    isBestSeller: true,
    isTrending: true,
  },
  {
    id: '2',
    name: 'Luna Matte White Ceramic Vase',
    slug: 'luna-matte-white-ceramic-vase',
    price: 129,
    image: '/images/products/product-2.jpg',
    hoverImage: '/images/products/product-1.jpg',
    category: 'vases',
    rating: 4.9,
    reviewCount: 56,
    description:
      'The Luna vase is a celebration of organic forms and minimalist design. Made from fine porcelain with a smooth matte finish, its flowing curves are inspired by the gentle undulations of sand dunes. Each piece is uniquely shaped by hand, making it a one-of-a-kind addition to your collection.',
    shortDescription: 'Organic curves in fine matte porcelain',
    material: 'Fine Porcelain',
    color: 'Matte White',
    dimensions: '14" x 7" diameter',
    weight: '1.8 kg',
    inStock: true,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Ethos Bronze Abstract Form',
    slug: 'ethos-bronze-abstract-form',
    price: 389,
    originalPrice: 450,
    image: '/images/products/product-3.jpg',
    hoverImage: '/images/products/product-4.jpg',
    category: 'sculptures',
    rating: 4.7,
    reviewCount: 28,
    description:
      'The Ethos is an abstract interpretation of the human form, cast in solid bronze with a warm patina finish. This museum-quality piece brings artistic gravitas to any room. Designed by renowned sculptor Marco Venturi, it is a statement of sophisticated taste.',
    shortDescription: 'Abstract bronze sculpture with warm patina',
    material: 'Solid Bronze',
    color: 'Bronze Patina',
    dimensions: '18" x 6" x 5"',
    weight: '4.2 kg',
    inStock: true,
    isTrending: true,
  },
  {
    id: '4',
    name: 'Palazzo Marble Bookends',
    slug: 'palazzo-marble-bookends',
    price: 179,
    image: '/images/products/product-4.jpg',
    hoverImage: '/images/products/product-3.jpg',
    category: 'sculptures',
    rating: 4.6,
    reviewCount: 35,
    description:
      'The Palazzo bookends are carved from Carrara marble and accented with genuine gold leaf detailing. These functional art pieces bring Italian elegance to your bookshelf or desk, combining timeless craftsmanship with modern design sensibility.',
    shortDescription: 'Carrara marble bookends with gold leaf accents',
    material: 'Carrara Marble',
    color: 'White Marble with Gold',
    dimensions: '6" x 4" x 8" (each)',
    weight: '3.6 kg (pair)',
    inStock: true,
    isNew: true,
  },
  {
    id: '5',
    name: 'Prisma Crystal Candle Holder',
    slug: 'prisma-crystal-candle-holder',
    price: 99,
    originalPrice: 129,
    image: '/images/products/product-5.jpg',
    hoverImage: '/images/products/product-6.jpg',
    category: 'lighting',
    rating: 4.8,
    reviewCount: 67,
    description:
      'The Prisma candle holder features precision-cut crystal facets that scatter light into mesmerizing rainbow patterns. Designed to hold standard taper candles, it transforms any dinner setting into an enchanting experience.',
    shortDescription: 'Precision-cut crystal with geometric facets',
    material: 'Premium Crystal',
    color: 'Clear Crystal',
    dimensions: '5" x 5" x 8"',
    weight: '1.1 kg',
    inStock: true,
    isBestSeller: true,
    isTrending: true,
  },
  {
    id: '6',
    name: 'Eden Glass Terrarium',
    slug: 'eden-glass-terrarium',
    price: 159,
    image: '/images/products/product-6.jpg',
    hoverImage: '/images/products/product-5.jpg',
    category: 'vases',
    rating: 4.5,
    reviewCount: 22,
    description:
      'The Eden terrarium is a golden-rimmed glass enclosure for air plants and small succulents. Its geometric design adds a touch of botanical luxury to any surface, while the brass framework provides a warm metallic contrast.',
    shortDescription: 'Gold-rimmed glass terrarium for air plants',
    material: 'Glass & Brass',
    color: 'Clear with Gold Frame',
    dimensions: '10" x 10" x 12"',
    weight: '1.5 kg',
    inStock: true,
    isNew: true,
  },
  {
    id: '7',
    name: 'Nero Artisan Bowl',
    slug: 'nero-artisan-bowl',
    price: 189,
    image: '/images/products/product-7.jpg',
    hoverImage: '/images/products/product-8.jpg',
    category: 'vases',
    rating: 4.9,
    reviewCount: 41,
    description:
      'The Nero is a hand-thrown ceramic bowl featuring a dramatic contrast of charcoal black exterior and lustrous gold interior. Each piece is fired at extreme temperatures, resulting in a unique glaze pattern that makes every bowl truly one-of-a-kind.',
    shortDescription: 'Hand-thrown ceramic with gold interior',
    material: 'Artisan Ceramic',
    color: 'Charcoal Black / Gold',
    dimensions: '12" diameter x 4" deep',
    weight: '1.3 kg',
    inStock: true,
    isTrending: true,
    isLimitedEdition: true,
  },
  {
    id: '8',
    name: 'Tempus Brass Table Clock',
    slug: 'tempus-brass-table-clock',
    price: 219,
    originalPrice: 259,
    image: '/images/products/product-8.jpg',
    hoverImage: '/images/products/product-7.jpg',
    category: 'lighting',
    rating: 4.7,
    reviewCount: 33,
    description:
      'The Tempus clock combines mid-century modern design with luxury materials. Its solid brass case houses a Swiss-made quartz movement, while the minimalist face features gold-tipped hands against a warm ivory dial.',
    shortDescription: 'Minimalist brass clock with Swiss movement',
    material: 'Solid Brass',
    color: 'Brushed Brass',
    dimensions: '6" x 3" x 7"',
    weight: '0.9 kg',
    inStock: true,
    isBestSeller: true,
    isLimitedEdition: true,
  },
]

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Alexandra M.',
    rating: 5,
    date: '2025-12-15',
    comment:
      'Absolutely stunning craftsmanship. The Aurelia sculpture is even more beautiful in person. It has become the focal point of our living room.',
  },
  {
    id: '2',
    name: 'James R.',
    rating: 5,
    date: '2025-11-28',
    comment:
      'Exceptional quality and packaging. The Luna vase arrived in perfect condition and looks incredible on our console table.',
  },
  {
    id: '3',
    name: 'Sofia L.',
    rating: 4,
    date: '2025-11-10',
    comment:
      'Crestiva never disappoints. Every piece I have purchased has been of the highest quality. The attention to detail is remarkable.',
  },
  {
    id: '4',
    name: 'Michael K.',
    rating: 5,
    date: '2025-10-22',
    comment:
      'The Prisma candle holder creates the most magical light patterns at dinner. Our guests always ask where we got it.',
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Home Styling',
    slug: 'art-of-minimalist-home-styling',
    excerpt:
      'Discover how to create a luxurious atmosphere with carefully curated statement pieces and intentional negative space.',
    image: '/images/products/product-1.jpg',
    author: 'Isabella Chen',
    date: '2026-01-15',
    category: 'Interior Design',
  },
  {
    id: '2',
    title: 'Sculpting Light: How Decor Shapes Ambiance',
    slug: 'sculpting-light-decor-shapes-ambiance',
    excerpt:
      'Learn how the interplay of light and sculptural forms can transform the mood of any room in your home.',
    image: '/images/products/product-5.jpg',
    author: 'Marcus Duval',
    date: '2026-01-08',
    category: 'Design Tips',
  },
  {
    id: '3',
    title: 'Material Matters: Choosing Premium Finishes',
    slug: 'material-matters-choosing-premium-finishes',
    excerpt:
      'From Carrara marble to hand-blown glass, understanding how materials define the character of luxury showpieces.',
    image: '/images/products/product-4.jpg',
    author: 'Isabella Chen',
    date: '2025-12-20',
    category: 'Materials',
  },
]
