import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import PageTransition from '@/components/PageTransition'

/* ── FONTS ─────────────────────────────────────────────────
   Using next/font for zero-layout-shift font loading.
   Cormorant Garamond → headings (serif, editorial)
   Montserrat         → body, nav, labels (clean sans)
───────────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

/* ── METADATA ───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Charlie Hamilton | Luxury Pub & Dining Experience',
  description:
    'An intimate fine dining experience in the heart of the city. Seasonal menus, award-winning cuisine, and impeccable hospitality.',
  keywords: [
    'fine dining',
    'restaurant',
    'luxury dining',
    'tasting menu',
    'private dining',
  ],
  openGraph: {
    title: 'Charlie Hamilton | Luxury Pub & Dining Experience',
    description:
      "Crafted cocktails, seasonal dining, candlelit interiors, and unforgettable evenings.",
    type: 'website',
    locale: 'en_IN',
    // Replace with your actual deployed domain
    url: 'https://theaurelia.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlie Hamilton',
    description:
      'A timeless public house where craft, conversation, and candlelight come together.',
  },
  // Favicons — place these in /public
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

/* ── ROOT LAYOUT ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      {/*
        suppressHydrationWarning on <html> is safe here —
        it only silences the class mismatch that next/font
        can sometimes cause on first hydration.
      */}
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
