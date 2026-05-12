import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import IntroSection from '@/components/IntroSection'
import MenuHighlights from '@/components/MenuHighlights'
import RestaurantsBar from '@/components/RestaurantsBar'
import Footer from '@/components/Footer'
import Visit from '@/components/Visit'

/*
  ── PAGE.TSX ────────────────────────────────────────────────
  Root page — assembles all section components in order.
  No 'use client' here — this is a server component.
  Each child component handles its own 'use client' directive.

  TO ADD NEW SECTIONS: import the component and drop it below.
  ─────────────────────────────────────────────────────────── 
*/
export default function Page() {
  return (
    <main>
      {/* Fixed navbar — sits above everything */}
      <Navbar />

      {/* 1. Hero — full screen video */}
      <Hero />

      {/* 2. Intro — our story, stacked images, stats */}
      <IntroSection />

      {/* 3. Menu Highlights — dark section, dish cards */}
      <MenuHighlights />

      {/* 4. Restaurants & Bars — horizontal scroll cards */}
      <RestaurantsBar />

      {/* 5. Visit Us — map & directions */}
      <Visit />

      {/* 6. Footer — newsletter, nav, contact, socials */}
      <Footer />

      {/*
        ── COMING NEXT ───────────────────────────────────────
        <GallerySection />    ← image masonry grid
        <ReservationCTA />    ← full-width reservation strip
      */}
    </main>
  )
}