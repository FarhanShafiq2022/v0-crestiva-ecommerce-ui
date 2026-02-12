import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from 'sonner'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Crestiva - Premium Home Decor & Showpieces',
  description:
    'Discover luxury showpieces, elegant home decor, and premium interior accessories. Curated collections for the modern aesthete.',
}

export const viewport: Viewport = {
  themeColor: '#f5f0e8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(40, 33%, 98%)',
              border: '1px solid hsl(35, 15%, 88%)',
              color: 'hsl(0, 0%, 15%)',
            },
          }}
        />
      </body>
    </html>
  )
}
