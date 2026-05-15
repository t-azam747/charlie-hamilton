'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

/* ── CONSTANTS ──────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]

/* ── DATA — customise for your client ───────────────────── */
const SPACES = [
  {
    id:          '01',
    category:    'Signature',
    name:        'The Hamilton Old Fashioned',
    description: 'Our signature twist on the timeless classic. Buffalo Trace bourbon, house-made demerara syrup, Angostura & orange bitters.',
    capacity:    '',
    hours:       '$14',
    image:       '/images/cocktail-1.jpg',
    cta:         'View Cocktail Menu',
    href:        '#menu',
    featured:    true,
  },
  {
    id:          '02',
    category:    'House Brew',
    name:        'Charlie\'s Craft Ale',
    description: 'Brewed exclusively for us by a local BC brewery. A golden, full-bodied ale with notes of citrus and caramel.',
    capacity:    '',
    hours:       '$7',
    image:       '/images/cocktail-2.jpg',
    cta:         'View Beer Menu',
    href:        '#menu',
    featured:    false,
  },
  {
    id:          '03',
    category:    'Premium',
    name:        'Single Malt Selection',
    description: 'A curated flight of three premium Highland single malts. Served neat with a single ice sphere.',
    capacity:    '',
    hours:       '$22',
    image:       '/images/cocktail-3.jpg',
    cta:         'View Menu',
    href:        '#menu',
    featured:    false,
  },
]

/* ── COMPONENT ──────────────────────────────────────────── */
export default function RestaurantsBar() {
  const trackRef        = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex]   = useState(0)
  const [canScrollLeft, setCanScrollLeft]   = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  /* Track scroll state for arrows + dots */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

      // Update active dot based on scroll position
      const cardWidth = track.scrollWidth / SPACES.length
      setActiveIndex(Math.round(scrollLeft / cardWidth))
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  /* Arrow scroll handlers */
  const scrollBy = (dir: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const cardW = track.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 400
    track.scrollBy({ left: dir === 'right' ? cardW + 24 : -(cardW + 24), behavior: 'smooth' })
  }

  /* Dot click → scroll to card */
  const scrollToIndex = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll<HTMLElement>('[data-card]')
    cards[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <section
      id="dining"
      style={{
        background: 'var(--color-cream, #f0ebe0)',
        padding:    'clamp(5rem, 10vw, 9rem) 0',
        overflow:   'hidden',
      }}
      aria-label="Drinks served"
    >

      {/* ── SECTION HEADER ───────────────────────────── */}
      <div
        style={{
          maxWidth:     '1200px',
          margin:       '0 auto',
          padding:      '0 clamp(1.5rem, 5vw, 4rem)',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-end',
            flexWrap:       'wrap',
            gap:            '1.5rem',
          }}
        >
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span style={eyebrowStyle}>What we pour</span>
            <h2
              style={{
                fontFamily:    'var(--font-serif, Cormorant Garamond)',
                fontSize:      'clamp(2.5rem, 5vw, 4rem)',
                fontWeight:    300,
                color:         'var(--color-charcoal, #1a1916)',
                lineHeight:    1.1,
                letterSpacing: '0.01em',
              }}
            >
              Featured <em>Drinks</em>
            </h2>
          </motion.div>

          {/* Right — arrows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            style={{
              display:    'flex',
              gap:        '0.75rem',
            }}
          >
            <ArrowButton
              dir="left"
              disabled={!canScrollLeft}
              onClick={() => scrollBy('left')}
            />
            <ArrowButton
              dir="right"
              disabled={!canScrollRight}
              onClick={() => scrollBy('right')}
            />
          </motion.div>
        </div>
      </div>

      {/* ── HORIZONTAL SCROLL TRACK ──────────────────── */}
      <div
        ref={trackRef}
        style={{
          display:                  'flex',
          gap:                      'clamp(1rem, 2vw, 1.5rem)',
          overflowX:                'auto',
          overflowY:                'hidden',
          scrollSnapType:           'x mandatory',
          WebkitOverflowScrolling:  'touch',
          scrollbarWidth:           'none',
          msOverflowStyle:          'none',
          paddingLeft:              'clamp(1.5rem, calc((100vw - 1200px) / 2 + 4rem), calc((100vw - 1200px) / 2 + 4rem))',
          paddingRight:             'clamp(1.5rem, 5vw, 4rem)',
          paddingBottom:            '1rem',
          cursor:                   'grab',
        }}
        // Drag-to-scroll
        onMouseDown={e => {
          const track = trackRef.current
          if (!track) return
          track.style.cursor = 'grabbing'
          const startX    = e.pageX - track.offsetLeft
          const scrollLeft = track.scrollLeft

          const onMove = (ev: MouseEvent) => {
            const x = ev.pageX - track.offsetLeft
            track.scrollLeft = scrollLeft - (x - startX)
          }
          const onUp = () => {
            track.style.cursor = 'grab'
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
          }
          window.addEventListener('mousemove', onMove)
          window.addEventListener('mouseup', onUp)
        }}
      >
        <style>{`.scroll-track::-webkit-scrollbar { display: none; }`}</style>

        {SPACES.map((space, i) => (
          <SpaceCard key={space.id} space={space} index={i} />
        ))}
      </div>

      {/* ── DOTS ─────────────────────────────────────── */}
      <div
        style={{
          display:        'flex',
          justifyContent: 'center',
          gap:            '0.5rem',
          marginTop:      '2rem',
        }}
        role="tablist"
        aria-label="Dining spaces navigation"
      >
        {SPACES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`Go to ${SPACES[i].name}`}
            onClick={() => scrollToIndex(i)}
            style={{
              width:      activeIndex === i ? '2rem' : '0.4rem',
              height:     '0.4rem',
              borderRadius: '999px',
              background: activeIndex === i
                ? 'var(--color-gold, #c9a96e)'
                : 'var(--color-border, #d8d2c8)',
              border:     'none',
              padding:    0,
              cursor:     'pointer',
              transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
            }}
          />
        ))}
      </div>

    </section>
  )
}

/* ── SPACE CARD ─────────────────────────────────────────── */
function SpaceCard({
  space,
  index,
}: {
  space: typeof SPACES[number]
  index: number
}) {
  return (
    <motion.div
      data-card
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: index * 0.15, ease: EASE }}
      whileHover="hover"
      style={{
        flex:          '0 0 clamp(280px, 38vw, 460px)',
        scrollSnapAlign: 'start',
        display:       'flex',
        flexDirection: 'column',
        cursor:        'pointer',
      }}
    >
      {/* Image */}
      <div
        style={{
          position:    'relative',
          width:       '100%',
          aspectRatio: '2/3',
          overflow:    'hidden',
        }}
      >
        <motion.div
          variants={{
            hover: { scale: 1.06, transition: { duration: 0.8, ease: EASE } }
          }}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        >
          <Image
            src={space.image}
            alt={space.name}
            fill
            style={{
              objectFit:  'cover',
            }}
            sizes="(max-width: 768px) 85vw, 38vw"
          />
        </motion.div>

        {/* Gradient overlay */}
        <motion.div
          variants={{
            hover: { opacity: 1, transition: { duration: 0.4, ease: EASE } }
          }}
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to top, rgba(246, 241, 241, 0.7) 0%, transparent 50%)',
            opacity:    0.6,
          }}
        />

        {/* Featured badge */}
        {space.featured && (
          <span
            style={{
              position:      'absolute',
              top:           '1rem',
              right:         '1rem',
              fontFamily:    'var(--font-sans, Montserrat)',
              fontSize:      '0.5rem',
              fontWeight:    800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#0d0d0d',
              background:    'var(--color-gold, #c9a96e)',
              padding:       '0.3rem 0.75rem',
            }}
          >
            Signature
          </span>
        )}

        {/* Bottom overlay content — visible on hover */}
        <motion.div
          variants={{
            hover: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } }
          }}
          initial={{ y: 15, opacity: 0 }}
          style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            padding:    '1.5rem',
          }}
        >
          <Link
            href={space.href}
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '0.6rem',
              fontFamily:    'var(--font-sans, Montserrat)',
              fontSize:      '0.55rem',
              fontWeight:    500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         '#ffffff',
              border:        '1px solid rgba(255,255,255,0.5)',
              padding:       '0.6rem 1.25rem',
              textDecoration: 'none',
              background:    'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(4px)',
              transition:    'background-color 0.3s ease',
            }}
            onClick={e => e.stopPropagation()}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.2)'
            }}
          >
            {space.cta}
            <svg width="14" height="6" viewBox="0 0 14 6" fill="none" aria-hidden="true">
              <path d="M0 3H12M9 1L12 3L9 5" stroke="currentColor" strokeWidth="0.7" />
            </svg>
          </Link>
        </motion.div>
      </div>
      {/* Text content below image */}
      <div
        style={{
          padding:    '1.25rem 0',
          display:    'flex',
          flexDirection: 'column',
          gap:        '0.5rem',
        }}
      >
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
          }}
        >
          <span style={eyebrowStyle}>{space.category}</span>
          <span
            style={{
              fontFamily:    'var(--font-sans, Montserrat)',
              fontSize:      '0.55rem',
              fontWeight:    300,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         'var(--color-muted, #9a948c)',
            }}
          >
            {space.capacity}
          </span>
        </div>

        <h3
          style={{
            fontFamily:    'var(--font-serif, Cormorant Garamond)',
            fontSize:      'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight:    400,
            color:         'var(--color-charcoal, #1a1916)',
            lineHeight:    1.15,
            letterSpacing: '0.01em',
          }}
        >
          {space.name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-sans, Montserrat)',
            fontSize:   '0.75rem',
            fontWeight: 300,
            color:      'var(--color-mid, #5a5550)',
            lineHeight: 1.8,
          }}
        >
          {space.description}
        </p>

        {/* Hours */}
        <div
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '0.5rem',
            marginTop:  '0.25rem',
          }}
        >
          <span
            style={{
              width:      '20px',
              height:     '1px',
              background: 'var(--color-gold, #c9a96e)',
              display:    'inline-block',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily:    'var(--font-sans, Montserrat)',
              fontSize:      '0.6rem',
              fontWeight:    300,
              letterSpacing: '0.15em',
              color:         'var(--color-muted, #9a948c)',
            }}
          >
            {space.hours}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── ARROW BUTTON ───────────────────────────────────────── */
function ArrowButton({
  dir,
  disabled,
  onClick,
}: {
  dir: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Scroll left' : 'Scroll right'}
      style={{
        width:      '44px',
        height:     '44px',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border:     '1px solid',
        borderColor: disabled
          ? 'var(--color-border, #d8d2c8)'
          : 'var(--color-charcoal, #1a1916)',
        background:  'transparent',
        color:       disabled
          ? 'var(--color-border, #d8d2c8)'
          : 'var(--color-charcoal, #1a1916)',
        cursor:      disabled ? 'not-allowed' : 'pointer',
        transition:  'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        if (disabled) return
        const el = e.currentTarget as HTMLElement
        el.style.background = 'var(--color-charcoal, #1a1916)'
        el.style.color      = '#ffffff'
      }}
      onMouseLeave={e => {
        if (disabled) return
        const el = e.currentTarget as HTMLElement
        el.style.background  = 'transparent'
        el.style.color       = 'var(--color-charcoal, #1a1916)'
      }}
    >
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}
        aria-hidden="true"
      >
        <path d="M0 5H14M10 1L14.5 5L10 9" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    </button>
  )
}

/* ── SHARED STYLES ──────────────────────────────────────── */
const eyebrowStyle: React.CSSProperties = {
  display:       'block',
  fontFamily:    'var(--font-sans, Montserrat)',
  fontSize:      '0.6rem',
  fontWeight:    400,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color:         'var(--color-gold, #c9a96e)',
  marginBottom:  '0.25rem',
}
