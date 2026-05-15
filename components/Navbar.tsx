'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── TYPES ──────────────────────────────────────────────── */
interface NavLinkItem {
  label: string
  href: string
}

/* ── NAV LINKS ──────────────────────────────────────────── */
const NAV_LINKS: NavLinkItem[] = [
  { label: 'About',        href: '#about' },
  { label: 'Menu',         href: '#menu' },
  { label: 'Drinks',       href: '#dining' },
  { label: 'Visit',      href: '#contact' },
]

/* ── HEIGHTS ────────────────────────────────────────────── */
const TOP_BAR_HEIGHT   = 82
const NAV_BAR_HEIGHT   = 56

/* ── COMPONENT ──────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [topBarHidden, setTopBarHidden] = useState(false)
  const lastScrollY                 = useRef(0)

  /* Scroll listener:
     - scrolled: solid bg after 80px
     - topBarHidden: hide top bar when scrolling down, show when scrolling up
     - Nav bar always stays visible */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)

      if (y > lastScrollY.current + 6 && y > 120) {
        setTopBarHidden(true)   // scrolling down → slide top bar off
      } else if (y < lastScrollY.current - 4) {
        setTopBarHidden(false)  // scrolling up → bring top bar back
      }

      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const bgActive  = scrolled || menuOpen
  const bgColor   = bgActive ? 'rgba(13, 13, 13, 0.97)' : 'transparent'
  const blur      = bgActive ? 'blur(12px)' : 'none'

  /* When topBarHidden, shift entire header up by TOP_BAR_HEIGHT
     so the top bar exits viewport but nav bar stays at top:0 */
  const headerTranslateY = topBarHidden ? `-${TOP_BAR_HEIGHT}px` : '0'

  return (
    <>
      <header
        style={{
          position:             'fixed',
          top:                  0,
          left:                 0,
          right:                0,
          zIndex:               100,
          backgroundColor:      bgColor,
          backdropFilter:       blur,
          WebkitBackdropFilter: blur,
          transform:            `translateY(${headerTranslateY})`,
          transition:           'background-color 0.6s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 0.6s ease',
          willChange:           'transform',
        }}
      >

        {/* ═══════ TOP BAR — Logo centred, utility links on sides ═══════ */}
        <div
          style={{
            height:           `${TOP_BAR_HEIGHT}px`,
            display:          'flex',
            alignItems:       'center',
            justifyContent:   'space-between',
            padding:          '1.5rem clamp(1.5rem, 7vw, 3.5rem)',
            borderBottom:     scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
            boxSizing:        'border-box',
          }}
        >
          {/* Left — branding tag */}
          <span
            style={{
              fontFamily:    'var(--font-sans, Montserrat)',
              fontSize:      '0.8rem',
              fontWeight:    1000,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color:         '#ffffffff',
              textShadow:    '0 2px 4px rgba(0,0,0,0.6)',
              opacity:       0.8,
              padding:       '1.1rem 2.5rem',
              paddingBottom: '5px',
              marginBottom: '5px',
            }}
            className="topbar-side"
          >
            Est. 1897
          </span>

          {/* Centre — Logo */}
          <Link
            href="/"
            style={{ textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            aria-label="Charlie Hamiltons Pub — Home"
          >
            <span
              style={{
                fontFamily:    'var(--font-serif, Cormorant Garamond)',
                fontSize:      '1.9rem',
                fontWeight:    800,
                letterSpacing: '0.14em',
                color:         'var(--color-white, #fff)',
                textShadow:    '0 2px 8px rgba(0,0,0,0.6)',
                lineHeight:    1.3,
                whiteSpace:    'nowrap',
                display:       'inline-block',
                padding:       '1.1rem 2.5rem',
                paddingBottom: '15px',
              }}
            >
             Charlie&nbsp;
              <span style={{ color: 'var(--color-gold, #c9a96e)' }}>Hamilton</span>
            </span>
          </Link>

          {/* Right — contact link */}
          <Link
            href="#contact"
            style={{
              fontFamily:    'var(--font-sans, Montserrat)',
              fontSize:      '1rem',
              fontWeight:    800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(255, 255, 255, 1)',
              textShadow:    '0 2px 6px rgba(0,0,0,0.5)',
              transition:    'color 0.3s ease',
              padding:       '1.1rem 2.5rem',
              paddingBottom: '5px',
            }}
            className="topbar-side"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
          >
            Contact Us
          </Link>
        </div>

        {/* ═══════ BOTTOM BAR — Nav links + Reserve CTA ═══════ */}
        <nav
          style={{
            height:           `${NAV_BAR_HEIGHT}px`,
            display:          'flex',
            alignItems:       'center',
            justifyContent:   'space-between',
            padding:          '0.25rem clamp(1.5rem, 4vw, 3.5rem)',
            borderBottom:     scrolled ? '1px solid rgba(201,169,110,0.12)' : 'none',
            boxSizing:        'border-box',
            position:         'relative',
          }}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo — slides in from left when top bar is hidden */}
          <Link
            href="/"
            aria-label="Charlie Hamilton — Home"
            className="nav-inline-logo"
            style={{
              position:       'absolute',
              left:           'clamp(1.5rem, 4vw, 3.5rem)',
              textDecoration: 'none',
              opacity:        topBarHidden ? 1 : 0,
              transform:      topBarHidden ? 'translateX(0)' : 'translateX(-12px)',
              transition:     'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              pointerEvents:  topBarHidden ? 'auto' : 'none',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--font-serif, Cormorant Garamond)',
                fontSize:      '1.25rem',
                fontWeight:    700,
                letterSpacing: '0.1em',
                color:         '#ffffff',
                textShadow:    '0 2px 6px rgba(0,0,0,0.5)',
                lineHeight:    1,
                whiteSpace:    'nowrap',
              }}
            >
              Charlie&nbsp;
              <span style={{ color: 'var(--color-gold, #c9a96e)' }}>Hamilton</span>
            </span>
          </Link>

          {/* Desktop Nav Links — centered */}
          <ul
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        'clamp(1.5rem, 2.5vw, 2.5rem)',
              listStyle:  'none',
              margin:     '0 auto',
            }}
            className="nav-links-desktop"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLinkEl href={link.href} label={link.label} />
              </li>
            ))}
          </ul>

          {/* Reserve CTA — far right */}
          <Link
            href="#reservations"
            style={{
              position:       'absolute',
              right:          'clamp(1.5rem, 4vw, 3.5rem)',
              fontFamily:     'var(--font-sans, Montserrat)',
              fontSize:       '0.575rem',
              fontWeight:     900,
              letterSpacing:  '0.22em',
              textTransform:  'uppercase',
              color:          '#0d0d0d',
              background:     'var(--color-gold, #c9a96e)',
              border:         '1px solid var(--color-gold, #c9a96e)',
              padding:        '0.5rem 1.3rem',
              transition:     'background 0.3s ease, color 0.3s ease',
              whiteSpace:     'nowrap',
              borderRadius: '50px',
            }}
            className="nav-reserve-btn"
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.color      = 'var(--color-gold, #c9a96e)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--color-gold, #c9a96e)'
              el.style.color      = '#0d0d0d'
            }}
          >
            Book
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="hamburger"
            style={{
              position:       'absolute',
              right:          'clamp(1.5rem, 4vw, 3.5rem)',
              display:        'none',
              flexDirection:  'column',
              gap:            '5px',
              padding:        '4px',
              background:     'none',
              border:         'none',
              cursor:         'pointer',
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </nav>
      </header>

      {/* ── MOBILE FULLSCREEN MENU ───────────────────────── */}
      <MobileMenu
        links={NAV_LINKS}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* ── RESPONSIVE STYLES ───────────────────────────── */}
      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .hamburger         { display: flex !important; }
          .nav-reserve-btn   { display: none !important; }
          .topbar-side       { display: none !important; }
          .nav-inline-logo   { display: none !important; }
        }
      `}</style>
    </>
  )
}

/* ── SUB-COMPONENTS ─────────────────────────────────────── */

/* Individual nav link with animated underline */
function NavLinkEl({ href, label }: NavLinkItem) {
  return (
    <Link
      href={href}
      style={{
        fontFamily:    'var(--font-sans, Montserrat)',
        fontSize:      '0.7rem',
        fontWeight:    600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color:         'rgba(255,255,255,0.9)',
        textShadow:    '0 2px 6px rgba(0,0,0,0.5)',
        position:      'relative',
        paddingBottom: '3px',
        transition:    'color 0.3s ease',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.color = '#fff'
        const line = e.currentTarget.querySelector('.nav-line') as HTMLElement
        if (line) { line.style.transform = 'scaleX(1)'; line.style.opacity = '1' }
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'
        const line = e.currentTarget.querySelector('.nav-line') as HTMLElement
        if (line) { line.style.transform = 'scaleX(0)'; line.style.opacity = '0' }
      }}
    >
      {label}
      <span
        className="nav-line"
        style={{
          position:        'absolute',
          bottom:          0,
          left:            0,
          right:           0,
          height:          '1px',
          background:      'var(--color-gold, #c9a96e)',
          transform:       'scaleX(0)',
          transformOrigin: 'left center',
          opacity:         0,
          transition:      'transform 0.3s ease, opacity 0.3s ease',
        }}
      />
    </Link>
  )
}

/* Three-line hamburger that morphs to X */
function HamburgerIcon({ open }: { open: boolean }) {
  const lineStyle = (rotate: string, translateY: string, opacity: number) => ({
    display:         'block',
    width:           '22px',
    height:          '1px',
    background:      'var(--color-white, #fff)',
    transform:       open ? `translateY(${translateY}) rotate(${rotate})` : 'none',
    opacity:         open ? opacity : 1,
    transition:      'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease',
    transformOrigin: 'center',
  })

  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <span style={lineStyle('45deg', '6px', 1)} />
      <span style={lineStyle('0deg', '0px', 0)} />
      <span style={lineStyle('-45deg', '-6px', 1)} />
    </span>
  )
}

/* Full-screen mobile overlay menu */
function MobileMenu({
  links,
  open,
  onClose,
}: {
  links: NavLinkItem[]
  open: boolean
  onClose: () => void
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          99,
        background:      'var(--color-black, #0d0d0d)',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             '2rem',
        opacity:         open ? 1 : 0,
        pointerEvents:   open ? 'all' : 'none',
        transition:      'opacity 0.4s ease',
      }}
    >
      {links.map((link, i) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onClose}
          style={{
            fontFamily:    'var(--font-serif, Cormorant Garamond)',
            fontSize:      'clamp(2rem, 6vw, 3.5rem)',
            fontWeight:    300,
            letterSpacing: '0.08em',
            color:         'var(--color-white, #fff)',
            opacity:       open ? 1 : 0,
            transform:     open ? 'translateY(0)' : 'translateY(20px)',
            transition:    `opacity 0.5s ease ${i * 60 + 100}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 60 + 100}ms, color 0.2s ease`,
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.color = 'var(--color-gold, #c9a96e)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.color = 'var(--color-white, #fff)'
          }}
        >
          {link.label}
        </Link>
      ))}

      {/* Reserve button in mobile menu */}
      <Link
        href="#reservations"
        onClick={onClose}
        style={{
          marginTop:     '1rem',
          fontFamily:    'var(--font-sans, Montserrat)',
          fontSize:      '0.625rem',
          fontWeight:    500,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color:         'var(--color-gold, #c9a96e)',
          border:        '1px solid rgba(201, 169, 110, 0.5)',
          padding:       '0.85rem 2.5rem',
          opacity:       open ? 1 : 0,
          transform:     open ? 'translateY(0)' : 'translateY(20px)',
          transition:    `opacity 0.5s ease 400ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) 400ms`,
        }}
      >
        Reserve a Table
      </Link>
    </div>
  )
}
