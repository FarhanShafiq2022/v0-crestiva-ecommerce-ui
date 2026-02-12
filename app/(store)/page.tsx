import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { BestSellersSection } from '@/components/home/best-sellers-section'
import { NewArrivalsSection } from '@/components/home/new-arrivals-section'
import { LimitedEditionBanner } from '@/components/home/limited-edition-banner'
import { AboutSection } from '@/components/home/about-section'
import { ReviewsSection } from '@/components/home/reviews-section'
import { InstagramSection } from '@/components/home/instagram-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BestSellersSection />
      <NewArrivalsSection />
      <LimitedEditionBanner />
      <AboutSection />
      <ReviewsSection />
      <InstagramSection />
    </>
  )
}
