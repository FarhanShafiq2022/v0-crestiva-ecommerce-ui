import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileNav } from '@/components/layout/mobile-nav'
import { StoreProvider } from '@/lib/store'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <Header />
      <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
      <Footer />
      <MobileNav />
    </StoreProvider>
  )
}
