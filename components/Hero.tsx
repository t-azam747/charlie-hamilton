'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const borderRef  = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)

  const [videoReady, setVideoReady] = useState(false)
  const [mounted, setMounted]       = useState(false)

  useEffect(() => { setMounted(true) }, [])

  /* ── SCROLL HANDLER ─────────────────────────────────────
     Drives the core Connaught effect:
     progress 0 → 1 over first 60vh of scroll

     1. Border inset shrinks from ~2vw → 0 (disappears)
     2. Border opacity fades to 0
     3. Video translates down (parallax) + scales up
     4. Hero text fades out + slides up
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y        = window.scrollY
      const vh       = window.innerHeight
      const progress = Math.min(y / (vh * 0.6), 1)

      // 1. Border frame
      if (borderRef.current) {
        const maxPad = Math.min(window.innerWidth * 0.025, 28)
        const pad    = (1 - progress) * maxPad
        borderRef.current.style.inset   = `${pad}px`
        borderRef.current.style.opacity = `${(1 - progress).toFixed(3)}`
      }

      // 2. Video parallax + subtle scale-up
      if (videoRef.current) {
        const translateY = y * 0.32
        const scale      = 1.06 + progress * 0.04
        videoRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`
      }

      // 3. Hero text fade + slide up
      if (contentRef.current) {
        const op    = Math.max(1 - progress * 2.5, 0)
        const ty    = -(progress * 50)
        contentRef.current.style.opacity   = `${op}`
        contentRef.current.style.transform = `translateY(${ty}px)`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── ENTRANCE ANIMATION ─────────────────────────────────
     Sequence:
       100ms  → border fades in
       300ms  → heading words stagger up
       950ms  → subheading appears
       1150ms → CTA buttons appear
       1500ms → scroll indicator appears
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const heading = headingRef.current
    const sub     = subRef.current
    const cta     = ctaRef.current
    const scroll  = scrollRef.current
    const border  = borderRef.current
    if (!heading || !sub || !cta || !scroll || !border) return

    // Split heading into animated word spans
    const words = heading.innerText.trim().split(' ')
    heading.innerHTML = words
      .map(w =>
        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.28em;">
          <span class="wi" style="display:inline-block;transform:translateY(110%);opacity:0;">${w}</span>
        </span>`
      ).join('')

    const inners = heading.querySelectorAll<HTMLElement>('.wi')

    // Border draws in
    setTimeout(() => {
      border.style.transition = 'opacity 0.9s ease'
      border.style.opacity    = '1'
    }, 100)

    // Words stagger up
    inners.forEach((w, i) => {
      setTimeout(() => {
        w.style.transition = 'transform 1s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease'
        w.style.transform  = 'translateY(0)'
        w.style.opacity    = '1'
      }, 320 + i * 90)
    })

    // Subheading
    setTimeout(() => {
      sub.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)'
      sub.style.opacity    = '1'
      sub.style.transform  = 'translateY(0)'
    }, 950)

    // CTAs
    setTimeout(() => {
      cta.style.transition = 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)'
      cta.style.opacity    = '1'
      cta.style.transform  = 'translateY(0)'
    }, 1150)

    // Scroll indicator
    setTimeout(() => {
      scroll.style.transition = 'opacity 0.8s ease'
      scroll.style.opacity    = '1'
    }, 1500)
  }, [])

  /* Initial border size (before scroll listener fires) */
  const initPad = mounted ? Math.min(window.innerWidth * 0.025, 28) : 24

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position:  'relative',
        width:     '100%',
        height:    '100dvh',
        minHeight: '600px',
        overflow:  'hidden',
        background:'#0d0d0d',
      }}
      aria-label="Hero"
    >

      {/* ── VIDEO ───────────────────────────────────────── */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-fallback.jpg"
        onCanPlayThrough={() => {
          if (!videoReady && videoRef.current) {
            videoRef.current.play()
            setVideoReady(true)
          }
        }}
        style={{
          position:  'absolute',
          inset:     0,
          width:     '100%',
          height:    '100%',
          objectFit: 'cover',
          transform: 'scale(1.08)',
          opacity:   videoReady ? 1 : 0,
          transition:'opacity 1.2s ease',
          willChange:'transform',
        }}
        aria-hidden="true"
      >
        <source src="https://res.cloudinary.com/dohe1tk9v/video/upload/f_auto,q_auto/v1778850699/main_lvs8t7.mp4"  type="video/mp4" />
        <source src="/videos/main.webm" type="video/webm" />
      </video>

      {/* Fallback bg — shown while video loads */}
      <div
        style={{
          position:  'absolute',
          inset:     0,
          background:'url(/images/main-fallback.jpg) center/cover no-repeat',
          zIndex:    0,
          opacity:   videoReady ? 0 : 1,
          transition:'opacity 1.2s ease',
        }}
        aria-hidden="true"
      />

      {/* ── GRADIENT OVERLAY ────────────────────────────── */}
      <div
        style={{
          position:  'absolute',
          inset:     0,
          zIndex:    1,
          background:`
            linear-gradient(to bottom,
              rgba(0,0,0,0.45) 0%,
              rgba(0,0,0,0.65) 75%,
              rgba(0,0,0,0.70) 100%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* ── THE BORDER FRAME ────────────────────────────────
          Core Connaught effect.
          A thin white inset rectangle that shrinks to nothing
          as the user scrolls — revealing full-bleed video.
          Controlled entirely by the scroll handler above.
      ───────────────────────────────────────────────────── */}
      <div
        ref={borderRef}
        style={{
          position:      'absolute',
          inset:         `${initPad}px`,
          border:        'none',
          zIndex:        3,
          pointerEvents: 'none',
          opacity:       0,        // entrance animation fades it in
          willChange:    'inset, opacity',
          transition:    'none',   // scroll handler sets transitions directly
        }}
        aria-hidden="true"
      />

      {/* ── HERO CONTENT ────────────────────────────────── */}
      <div
        ref={contentRef}
        style={{
          position:       'absolute',
          inset:          0,
          zIndex:         4,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          textAlign:      'center',
          padding:        '0 clamp(2rem, 6vw, 5rem)',
          paddingTop:     'var(--nav-height, 88px)',
          willChange:     'opacity, transform',
        }}
      >
        {/* Eyebrow label */}
        <span
          style={{
            fontFamily:    'var(--font-sans, Montserrat)',
            fontSize:      '0.95rem',
            fontWeight:    1000,
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color:         'rgba(255, 255, 255, 1)',
            marginBottom:  '1.5rem',
            display:       'block',
          }}
        >
          Coquitlam, BC
        </span>

        {/* Main heading */}
        <h1
          ref={headingRef}
          style={{
            fontFamily:    'var(--font-serif, Cormorant Garamond)',
            fontSize:      'clamp(4rem, 8vw, 7rem)',
            fontWeight:    300,
            color:         '#ffffff',
            textShadow:    '0 2px 12px rgba(0,0,0,0.6)',
            lineHeight:    1.0,
            letterSpacing: '0.04em',
            marginBottom:  '1.5rem',
            maxWidth:      '1300px',
          }}
        >
          Charlie Hamiltons Pub
        </h1>

        {/* Italic sub */}
        <p
          ref={subRef}
          style={{
            fontFamily:    'var(--font-serif, Cormorant Garamond)',
            fontSize:      '25px',
            fontWeight:    500,
            fontStyle:     'italic',
            color:         'rgba(255, 255, 255, 1)',
            letterSpacing: '0.04em',
            maxWidth:      '600px',
            lineHeight:    1.7,
            marginBottom:  '2.5rem',
            opacity:       0,
            transform:     'translateY(18px)',
          }}
        >
          A neighborhood-style pub and sports bar where craft, conversation, and sports come together.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          style={{
            display:        'flex',
            gap:            '1rem',
            flexWrap:       'wrap',
            justifyContent: 'center',
            opacity:        0,
            transform:      'translateY(16px)',
            }}
        >
          <HeroBtn  href="#reservations" variant="gold">Reserve a Table</HeroBtn>
          <HeroBtn href="#menu"         variant="ghost">Explore Menu</HeroBtn>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ────────────────────────────── */}
      <div
        ref={scrollRef}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        style={{
          position:       'absolute',
          bottom:         'clamp(2rem, 4vw, 3rem)',
          left:           '50%',
          transform:      'translateX(-50%)',
          zIndex:         5,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '0.5rem',
          opacity:        0,
          cursor:         'pointer',
        }}
        role="button"
        tabIndex={0}
        aria-label="Scroll down"
      >
        <span
          style={{
            fontFamily:    'var(--font-sans, Montserrat)',
            fontSize:      '0.5rem',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.38)',
          }}
        >
          Scroll
        </span>
        {/* Animated line that runs downward */}
        <div style={{ width: '1px', height: '52px', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position:   'absolute',
              top:        0,
              left:       0,
              width:      '100%',
              height:     '100%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
              animation:  'scrollLine 1.9s cubic-bezier(0.4,0,0.2,1) infinite',
            }}
          />
        </div>
      </div>

      {/* ── BOTTOM INFO CHIPS ───────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom:   'clamp(3rem, 4vw, 3rem)',
          left:     'clamp(3.5rem, 10vw, 13.5rem)',
          zIndex:   4,
        }}
      >
        <InfoChip label="Location" value="1163 Pinetree Way, Coquitlam" />
      </div>
      <div
        style={{
          position:  'absolute',
          bottom:    'clamp(2rem, 4vw, 3rem)',
          right:     'clamp(1.5rem, 4vw, 3.5rem)',
          zIndex:    4,
          textAlign: 'right',
        }}
      >
        <InfoChip label="Hours" value="11 AM – 1 AM Sun-Thu" />
      </div>

      {/* ── KEYFRAMES ───────────────────────────────────── */}
      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(200%);  opacity: 0; }
        }
      `}</style>

    </section>
  )
}

/* ── HERO BUTTON ────────────────────────────────────────── */
function HeroBtn({
  href,
  variant,
  children,
}: {
  href:     string
  variant:  'gold' | 'ghost'
  children: React.ReactNode
}) {
  const isGold = variant === 'gold'
  return (
    <Link
      href={href}
      style={{
        fontFamily:     'var(--font-sans, Montserrat)',
        fontSize:       '0.6rem',
        fontWeight:     900,
        letterSpacing:  '0.22em',
        textTransform:  'uppercase',
        color:          isGold ? '#0d0d0d' : '#ffffff',
        background:     isGold ? 'var(--color-gold, #c9a96e)' : 'rgba(255,255,255,0.12)',
        border:         isGold
                          ? '1px solid var(--color-gold, #c9a96e)'
                          : '1.5px solid rgba(255,255,255,0.7)',
        padding:        '0.85rem 2.25rem',
        transition:     'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        whiteSpace:     'nowrap',
        textDecoration: 'none',
        display:        'inline-block',
        borderRadius:   '55px',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        if (isGold) {
          el.style.background = 'var(--color-gold-light, #dfc08a)'
        } else {
          el.style.background  = 'rgba(255,255,255,0.1)'
          el.style.borderColor = 'rgba(255,255,255,0.65)'
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background  = isGold ? 'var(--color-gold, #c9a96e)' : 'rgba(255,255,255,0.12)'
        el.style.borderColor = isGold ? 'var(--color-gold, #c9a96e)' : 'rgba(255,255,255,0.7)'
        el.style.color       = isGold ? '#0d0d0d' : '#ffffff'
      }}
    >
      {children}
    </Link>
  )
}

/* ── INFO CHIP ──────────────────────────────────────────── */
function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{
        fontFamily:    'var(--font-sans, Montserrat)',
        fontSize:      '0.5rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color:         'var(--color-gold, #c9a96e)',
        marginBottom:  '0.2rem',
        fontWeight:    900,
      }}>
        {label}
      </p>
      <p style={{
        fontFamily:    'var(--font-serif, Cormorant Garamond)',
        fontSize:      '0.9rem',
        fontWeight:    1200,
        color:         'rgba(255, 255, 255, 1)',
        letterSpacing: '0.04em',
      }}>
        {value}
      </p>
    </div>
  )
}