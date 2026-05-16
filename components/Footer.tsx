'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* ── DATA ────────────────────────────────────────────────── */
const NAV_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Our Story',    href: '#about' },
      { label: 'Menu',         href: '#menu' },
      { label: 'Dining Spaces',href: '#dining' },
      { label: 'Gallery',      href: '#gallery' },
    ],
  },
  {
    heading: 'Reservations',
    links: [
      { label: 'Book a Table',     href: '#reservations' },
      { label: 'Private Dining',   href: '#enquire' },
      { label: 'Corporate Events', href: '#enquire' },
      { label: 'Gift Vouchers',    href: '#gift' },
    ],
  },
  {
    heading: 'Information',
    links: [
      { label: 'Careers',          href: '#careers' },
      { label: 'Press',            href: '#press' },
      { label: 'Accessibility',    href: '#accessibility' },
      { label: 'Privacy Policy',   href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
    ],
  },
]

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.3L9 4H4z" />
      </svg>
    ),
  },
  {
    label: 'TripAdvisor',
    href: 'https://tripadvisor.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <circle cx="6.5" cy="13.5" r="3" />
        <circle cx="17.5" cy="13.5" r="3" />
        <path d="M3 13.5A3.5 3.5 0 0 1 6.5 10m14 3.5A3.5 3.5 0 0 0 17.5 10M12 4l-5.5 6h11L12 4z" />
      </svg>
    ),
  },
]

const HOURS = [
  { day: 'Sunday – Thursday', time: '11 AM – 1 AM' },
  { day: 'Friday – Saturday', time: '11 AM – 2 AM' },
]

/* ── REVEAL HOOK ─────────────────────────────────────────── */
function useFooterReveal() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

/* ── COMPONENT ──────────────────────────────────────────── */
export default function Footer() {
  const { ref: footerRef, visible } = useFooterReveal()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer
      ref={footerRef}
      style={{
        background: 'var(--color-black, #0d0d0d)',
        color:      '#ffffff',
        overflow:   'hidden',
      }}
      role="contentinfo"
    >

      {/* ── NEWSLETTER STRIP ──────────────────────────────── */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding:      'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            maxWidth:       '1200px',
            margin:         '0 auto',
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            flexWrap:       'wrap',
            gap:            '2rem',
            opacity:        visible ? 1 : 0,
            transform:      visible ? 'translateY(0)' : 'translateY(24px)',
            transition:     'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Left — heading */}
          <div style={{ maxWidth: '480px' }}>
            <span style={eyebrowStyle}>Stay Connected</span>
            <h3
              style={{
                fontFamily:    'var(--font-serif, Cormorant Garamond)',
                fontSize:      'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight:    300,
                color:         '#ffffff',
                lineHeight:    1.2,
                letterSpacing: '0.01em',
              }}
            >
              Stories from <em>Charlie Hamilton</em>
            </h3>
            <p
              style={{
                fontFamily:  'var(--font-sans, Montserrat)',
                fontSize:    '0.75rem',
                fontWeight:  500,
                color:       'rgba(255, 255, 255, 1)',
                lineHeight:  1.8,
                marginTop:   '0.5rem',
              }}
            >
              Seasonal menus, exclusive events and behind-the-scenes moments — delivered to your&nbsp;inbox.
            </p>
          </div>

          {/* Right — email form */}
          <form
            onSubmit={handleSubscribe}
            style={{
              display:  'flex',
              gap:      '0.75rem',
              flexWrap: 'wrap',
              flex:     '1 1 320px',
              maxWidth: '480px',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              aria-label="Email address for newsletter"
              style={{
                flex:          '1 1 200px',
                fontFamily:    'var(--font-sans, Montserrat)',
                fontSize:      '0.75rem',
                fontWeight:    500,
                padding:       '0.85rem 1.25rem',
                background:    'rgba(255,255,255,0.05)',
                border:        '1px solid rgba(255,255,255,0.12)',
                color:         '#ffffff',
                outline:       'none',
                transition:    'border-color 0.3s ease',
                letterSpacing: '0.04em',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)' }}
              onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
            />
            <button
              type="submit"
              style={{
                fontFamily:    'var(--font-sans, Montserrat)',
                fontSize:      '0.6rem',
                fontWeight:    500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         '#0d0d0d',
                background:    subscribed ? 'rgba(120,180,120,0.9)' : 'var(--color-gold, #c9a96e)',
                border:        '1px solid',
                borderColor:   subscribed ? 'rgba(120,180,120,0.9)' : 'var(--color-gold, #c9a96e)',
                padding:       '0.85rem 1.75rem',
                cursor:        'pointer',
                transition:    'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                whiteSpace:    'nowrap',
              }}
              onMouseEnter={e => {
                if (subscribed) return
                const el = e.currentTarget
                el.style.background  = 'transparent'
                el.style.color       = 'var(--color-gold, #c9a96e)'
              }}
              onMouseLeave={e => {
                if (subscribed) return
                const el = e.currentTarget
                el.style.background = 'var(--color-gold, #c9a96e)'
                el.style.color      = '#0d0d0d'
              }}
            >
              {subscribed ? '✓ Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ──────────────────────────────── */}
      <div
        style={{
          maxWidth: '1200px',
          margin:   '0 auto',
          padding:  'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          display:  'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap:      'clamp(2.5rem, 5vw, 4rem)',
          opacity:        visible ? 1 : 0,
          transform:      visible ? 'translateY(0)' : 'translateY(24px)',
          transition:     'opacity 0.9s ease 200ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 200ms',
        }}
      >

        {/* Column 1 — Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Logo */}
          <Link href="/" aria-label="Charlie Hamiltons Pub — Home" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
              <Image 
                src="/images/logo-footer.png" 
                alt="Charlie Hamiltons Pub Logo" 
                fill 
                style={{ objectFit: 'contain' }}
              />
            </div>
            <span
              style={{
                fontFamily:    'var(--font-serif, Cormorant Garamond)',
                fontSize:      '1.6rem',
                fontWeight:    300,
                letterSpacing: '0.12em',
                color:         '#ffffff',
                lineHeight:    1,
              }}
            >
              Charlie&nbsp;
              <span style={{ color: 'var(--color-gold, #c9a96e)' }}>Hamiltons</span>
            </span>
          </Link>

          <p
            style={{
              fontFamily:  'var(--font-sans, Montserrat)',
              fontSize:    '0.7rem',
              fontWeight:  500,
              color:       'rgba(255,255,255,1)',
              lineHeight:  1.9,
              maxWidth:    '240px',
            }}
          >
A timeless public house where craft, conversation, and candlelight come together in the heart of the city.          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            {SOCIALS.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                  width:        '36px',
                  height:       '36px',
                  border:       '1px solid rgba(255,255,255,0.1)',
                  color:        'rgba(255,255,255,0.8)',
                  transition:   'color 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.color       = 'var(--color-gold, #c9a96e)'
                  el.style.borderColor = 'var(--color-gold, #c9a96e)'
                  el.style.background  = 'rgba(201,169,110,0.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.color       = 'rgba(255,255,255,0.8)'
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                  el.style.background  = 'transparent'
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation columns */}
        {NAV_COLUMNS.map(col => (
          <div key={col.heading}>
            <h4 style={columnHeadingStyle}>{col.heading}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {col.links.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily:    'var(--font-sans, Montserrat)',
                      fontSize:      '0.7rem',
                      fontWeight:    500,
                      color:         'rgba(255,255,255,0.9)',
                      transition:    'color 0.3s ease',
                      letterSpacing: '0.04em',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-gold, #c9a96e)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Column 5 — Contact & Hours */}
        <div>
          <h4 style={columnHeadingStyle}>Visit Us</h4>

          {/* Address */}
          <address
            style={{
              fontFamily:  'var(--font-sans, Montserrat)',
              fontSize:    '0.7rem',
              fontWeight:  500,
              color:       'rgba(255,255,255,0.9)',
              lineHeight:  1.9,
              fontStyle:   'normal',
              marginBottom: '1.25rem',
            }}
          >
            1163 Pinetree Way #1031<br />
            Coquitlam, BC<br />
            V3B 8A9, Canada
          </address>

          {/* Phone + Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
            <a
              href="tel:+16049412359"
              style={{
                fontFamily:    'var(--font-sans, Montserrat)',
                fontSize:      '0.7rem',
                fontWeight:    500,
                color:         'rgba(255,255,255,0.9)',
                transition:    'color 0.3s ease',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold, #c9a96e)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)' }}
            >
              +1 604-941-2359
            </a>
            <a
              href="mailto:charliehamiltonspub1@gmail.com"
              style={{
                fontFamily:    'var(--font-sans, Montserrat)',
                fontSize:      '0.7rem',
                fontWeight:    500,
                color:         'rgba(255,255,255,0.9)',
                transition:    'color 0.3s ease',
                letterSpacing: '0.04em',
                wordBreak:     'break-word',
                overflowWrap:  'anywhere',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold, #c9a96e)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)' }}
            >
              charliehamiltonspub1@gmail.com
            </a>
          </div>

          {/* Opening Hours */}
          <h4 style={{ ...columnHeadingStyle, marginTop: '0.5rem' }}>Hours</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {HOURS.map(h => (
              <div
                key={h.day}
                style={{
                  display:        'flex',
                  justifyContent: 'space-between',
                  gap:            '1rem',
                  fontFamily:     'var(--font-sans, Montserrat)',
                  fontSize:       '0.65rem',
                  fontWeight:     500,
                  color:          'rgba(255,255,255,0.9)',
                  letterSpacing:  '0.02em',
                }}
              >
                <span>{h.day}</span>
                <span style={{ color: '#ffffff', whiteSpace: 'nowrap' }}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ────────────────────────────────────── */}
      <div
        style={{
          borderTop:  '1px solid rgba(255,255,255,0.06)',
          padding:    'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 5vw, 4rem)',
          opacity:    visible ? 1 : 0,
          transition: 'opacity 0.9s ease 400ms',
        }}
      >
        <div
          style={{
            maxWidth:       '1200px',
            margin:         '0 auto',
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            flexWrap:       'wrap',
            gap:            '1rem',
          }}
        >
          <p
            style={{
              fontFamily:    'var(--font-sans, Montserrat)',
              fontSize:      '0.6rem',
              fontWeight:    500,
              color:         'rgba(255,255,255,0.6)',
              letterSpacing: '0.08em',
            }}
          >
            © {new Date().getFullYear()} Charlie Hamiltons Pub. All rights reserved.
          </p>

          <div
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '1.5rem',
            }}
          >
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontFamily:    'var(--font-sans, Montserrat)',
                  fontSize:      '0.55rem',
                  fontWeight:    400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         'rgba(255,255,255,0.6)',
                  transition:    'color 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '0.5rem',
              fontFamily:   'var(--font-sans, Montserrat)',
              fontSize:     '0.55rem',
              fontWeight:   400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:        'rgba(255,255,255,0.6)',
              background:   'none',
              border:       'none',
              cursor:       'pointer',
              transition:   'color 0.3s ease',
              padding:      0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold, #c9a96e)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
          >
            Back to top
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M5 11V1M1 5L5 1L9 5" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}

/* ── SHARED STYLES ──────────────────────────────────────── */
const eyebrowStyle: React.CSSProperties = {
  display:       'block',
  fontFamily:    'var(--font-sans, Montserrat)',
  fontSize:      '0.625rem',
  fontWeight:    600,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color:         'var(--color-gold, #c9a96e)',
  marginBottom:  '0.75rem',
}

const columnHeadingStyle: React.CSSProperties = {
  fontFamily:    'var(--font-sans, Montserrat)',
  fontSize:      '0.6rem',
  fontWeight:    800,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color:         '#ffffff',
  marginBottom:  '1.25rem',
}
