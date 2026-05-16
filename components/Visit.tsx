'use client'

import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────
   VisitSection.tsx
   Drop this directly into page.tsx just above <Footer />.
   Contains: InfoGrid → MapSection → ContactStrip
───────────────────────────────────────────────────────── */
export default function VisitSection() {
  return (
    <div id="contact">
      <InfoGrid />
      <MapSection />
      <ContactStrip />
    </div>
  )
}

/* ── INFO GRID ──────────────────────────────────────────── */
function InfoGrid() {
  return (
    <section
      style={{
        background: 'var(--color-charcoal, #1a1916)',
        padding:    'clamp(5rem, 10vw, 8rem) 0',
      }}
      aria-label="Visit information"
    >
      <div style={containerStyle}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <Reveal>
            <span style={eyebrowStyle}>Come Find Us</span>
            <h2 style={{
              fontFamily:    'var(--font-serif, Cormorant Garamond)',
              fontSize:      'clamp(2.5rem, 5vw, 4rem)',
              fontWeight:    300,
              color:         '#ffffff',
              lineHeight:    1.1,
              letterSpacing: '0.01em',
            }}>
              Visit <em>Charlie&apos;s</em>
            </h2>
          </Reveal>
        </div>

        {/* 3 cards */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          border:              '1px solid rgba(255,255,255,0.07)',
        }}>
          <InfoCard delay={0}   icon={<ClockIcon />} title="Opening Hours">
            <HoursTable />
          </InfoCard>
          <InfoCard delay={150} icon={<PinIcon />}   title="Getting Here">
            <AddressBlock />
          </InfoCard>
          <InfoCard delay={300} icon={<PhoneIcon />} title="Reservations">
            <ContactBlock />
          </InfoCard>
        </div>

        {/* Gold divider */}
        <Reveal delay={400}>
          <div style={{
            height:     '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)',
            margin:     'clamp(4rem, 8vw, 6rem) 0',
          }} />
        </Reveal>

        {/* Extra info row */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap:                 'clamp(2rem, 5vw, 4rem)',
        }}>
          <Reveal delay={0}>
            <ExtraInfoBlock
              icon={<ShirtIcon />}
              title="Dress Code"
              body="Casual and comfortable. We welcome everyone in our friendly neighborhood atmosphere — come as you are to enjoy the game."
            />
          </Reveal>
          <Reveal delay={150}>
            <ExtraInfoBlock
              icon={<CarIcon />}
              title="Parking"
              body="Ample parking is available right at Henderson Place Mall. Easy access and convenience for all our guests."
            />
          </Reveal>
          <Reveal delay={300}>
            <ExtraInfoBlock
              icon={<MetroIcon />}
              title="Transit"
              body="Located near Lincoln Station on the SkyTrain line, making it incredibly accessible via public transit from anywhere in Coquitlam."
            />
          </Reveal>
        </div>

      </div>
    </section>
  )
}

/* ── MAP SECTION ────────────────────────────────────────── */
function MapSection() {
  return (
    <section
      style={{
        background: 'var(--color-ivory, #f8f4ee)',
        padding:    'clamp(5rem, 10vw, 8rem) 0',
        overflow:   'hidden',
      }}
      aria-label="Location map"
    >
      <div style={containerStyle}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap:                 'clamp(3rem, 6vw, 6rem)',
          alignItems:          'center',
        }}>

          {/* Map embed */}
          <Reveal direction="left">
            <div style={{
              position:    'relative',
              width:       '100%',
              aspectRatio: '4/3',
              overflow:    'hidden',
              border:      '1px solid var(--color-border, #d8d2c8)',
            }}>
              {/*
                Replace this src with your client's actual Google Maps embed URL.
                Go to maps.google.com → search address → Share → Embed a map → copy the src
              */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.83615438885!2d-122.79532588431326!3d49.27949357933108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54867f2bc2922ef1%3A0xe54e63f538e146aa!2sCharlie%20Hamiltons%20Pub!5e0!3m2!1sen!2sca!4v1650000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{
                  position: 'absolute',
                  inset:    0,
                  border:   0,
                  filter:   'grayscale(15%) contrast(1.05)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Charlie Hamiltons Pub location"
              />
              {/* Gold corner accents */}
              {(['topLeft','topRight','bottomLeft','bottomRight'] as const).map(pos => (
                <CornerAccent key={pos} position={pos} />
              ))}
            </div>
          </Reveal>

          {/* Address + CTA */}
          <Reveal direction="right">
            <div>
              <span style={eyebrowStyle}>Our Address</span>
              <h2 style={{
                fontFamily:    'var(--font-serif, Cormorant Garamond)',
                fontSize:      'clamp(2rem, 4vw, 3rem)',
                fontWeight:    300,
                color:         'var(--color-charcoal, #1a1916)',
                lineHeight:    1.15,
                letterSpacing: '0.01em',
                marginBottom:  '1.5rem',
              }}>
                Find Us in <em>Henderson Place Mall</em>
              </h2>

              <span style={{
                display:    'block',
                width:      '40px',
                height:     '1px',
                background: 'var(--color-gold, #c9a96e)',
                margin:     '0 0 1.75rem',
              }} />

              <address style={{ fontStyle: 'normal', marginBottom: '1.75rem' }}>
                {['Charlie Hamiltons', '1163 Pinetree Way #1031', 'Coquitlam, BC', 'V3B 8A9'].map((line, i) => (
                  <p key={i} style={{
                    fontFamily:    i === 0 ? 'var(--font-serif, Cormorant Garamond)' : 'var(--font-sans, Montserrat)',
                    fontSize:      i === 0 ? '1.1rem' : '0.8rem',
                    fontWeight:    i === 0 ? 400 : 300,
                    color:         i === 0 ? 'var(--color-charcoal, #1a1916)' : 'var(--color-mid, #5a5550)',
                    letterSpacing: '0.04em',
                    lineHeight:    1.9,
                  }}>
                    {line}
                  </p>
                ))}
              </address>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                {[
                  { icon: '🚇', label: 'Near Lincoln Station (SkyTrain)' },
                  { icon: '📍', label: 'Inside Henderson Place Mall' },
                  { icon: '🅿️', label: 'Mall parking available' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
                    <p style={{
                      fontFamily:    'var(--font-sans, Montserrat)',
                      fontSize:      '0.75rem',
                      fontWeight:    300,
                      color:         'var(--color-mid, #5a5550)',
                      letterSpacing: '0.03em',
                    }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=1163+Pinetree+Way+Coquitlam+BC+V3B+8A9"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '0.75rem',
                  fontFamily:     'var(--font-sans, Montserrat)',
                  fontSize:       '0.625rem',
                  fontWeight:     500,
                  letterSpacing:  '0.22em',
                  textTransform:  'uppercase',
                  color:          'var(--color-charcoal, #1a1916)',
                  borderBottom:   '1px solid var(--color-gold, #c9a96e)',
                  paddingBottom:  '0.35rem',
                  textDecoration: 'none',
                  transition:     'color 0.3s ease, gap 0.3s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'var(--color-gold, #c9a96e)'
                  el.style.gap   = '1.25rem'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'var(--color-charcoal, #1a1916)'
                  el.style.gap   = '0.75rem'
                }}
              >
                Open in Google Maps
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                  <path d="M0 4H18M15 1L18.5 4L15 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT STRIP ──────────────────────────────────────── */
function ContactStrip() {
  return (
    <section
      style={{
        background: 'var(--color-charcoal, #1a1916)',
        borderTop:  '1px solid rgba(255,255,255,0.07)',
        padding:    'clamp(4rem, 8vw, 6rem) 0',
        position:   'relative',
        overflow:   'hidden',
      }}
      aria-label="Contact"
    >
      {/* Ghost text watermark */}
      <span aria-hidden="true" style={{
        position:         'absolute',
        top:              '50%',
        left:             '50%',
        transform:        'translate(-50%,-50%)',
        fontFamily:       'var(--font-serif, Cormorant Garamond)',
        fontSize:         'clamp(6rem, 14vw, 14rem)',
        fontWeight:       300,
        color:            'transparent',
        WebkitTextStroke: '1px rgba(201,169,110,0.05)',
        whiteSpace:       'nowrap',
        pointerEvents:    'none',
        userSelect:       'none',
        letterSpacing:    '0.1em',
      }}>
        HELLO
      </span>

      <div style={{ ...containerStyle, position: 'relative', zIndex: 1 }}>

        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <Reveal>
            <span style={eyebrowStyle}>Get in Touch</span>
            <h2 style={{
              fontFamily:    'var(--font-serif, Cormorant Garamond)',
              fontSize:      'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight:    300,
              color:         '#ffffff',
              lineHeight:    1.1,
              letterSpacing: '0.01em',
            }}>
              We'd Love to <em>Hear From You</em>
            </h2>
          </Reveal>
        </div>

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap:                 '1px',
          background:          'rgba(255,255,255,0.06)',
          border:              '1px solid rgba(255,255,255,0.06)',
        }}>
          {CONTACT_ITEMS.map((item, i) => (
            <ContactCard key={item.label} item={item} delay={i * 120} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ── DATA ───────────────────────────────────────────────── */
const HOURS = [
  { day: 'Sunday – Thursday', time: '11 AM – 1 AM'  },
  { day: 'Friday – Saturday', time: '11 AM – 2 AM'  },
]

const CONTACT_ITEMS = [
  {
    icon:   <PhoneIcon color="#c9a96e" size={28} />,
    label:  'Telephone',
    value:  '+1 604-941-2359',
    sub:    'Reservations welcome',
    href:   'tel:+16049412359',
    action: 'Call Now',
  },
  {
    icon:   <MailIcon color="#c9a96e" size={28} />,
    label:  'Email',
    value:  'hello@charliehamilton.pub',
    sub:    'We respond within 4 hours',
    href:   'mailto:charliehamiltonspub1@gmail.com',
    action: 'Send Email',
  },
  {
    icon:   <CalIcon color="#c9a96e" size={28} />,
    label:  'Reservations',
    value:  'Book a Table',
    sub:    'Walk-ins also welcome',
    href:   '#reservations',
    action: 'Reserve Now',
  },
  {
    icon:   <InstagramIcon color="#c9a96e" size={28} />,
    label:  'Instagram',
    value:  '@charliehamilton',
    sub:    'For updates & inspiration',
    href:   'https://instagram.com',
    action: 'Follow Us',
  },
]

/* ── SUB-COMPONENTS ─────────────────────────────────────── */

function HoursTable() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {HOURS.map((h, i) => (
        <div key={h.day} style={{
          paddingBottom: i < HOURS.length - 1 ? '0.85rem' : 0,
          borderBottom:  i < HOURS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}>
          <p style={{
            fontFamily:    'var(--font-sans, Montserrat)',
            fontSize:      '0.62rem',
            fontWeight:    500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.5)',
            marginBottom:  '0.25rem',
          }}>
            {h.day}
          </p>
          <p style={{
            fontFamily:    'var(--font-serif, Cormorant Garamond)',
            fontSize:      '1.05rem',
            fontWeight:    400,
            color:         '#ffffff',
            letterSpacing: '0.02em',
          }}>
            {h.time}
          </p>
        </div>
      ))}
      <p style={{
        fontFamily:  'var(--font-sans, Montserrat)',
        fontSize:    '0.65rem',
        fontWeight:  300,
        color:       'var(--color-gold, #c9a96e)',
        marginTop:   '0.25rem',
        letterSpacing: '0.03em',
      }}>
        Reservations welcome · Walk-ins too
      </p>
    </div>
  )
}

function AddressBlock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <address style={{ fontStyle: 'normal' }}>
        {['1163 Pinetree Way #1031', 'Coquitlam, BC', 'V3B 8A9'].map(line => (
          <p key={line} style={{
            fontFamily:    'var(--font-serif, Cormorant Garamond)',
            fontSize:      '1.05rem',
            fontWeight:    300,
            color:         '#ffffff',
            letterSpacing: '0.02em',
            lineHeight:    1.7,
          }}>
            {line}
          </p>
        ))}
      </address>
      {[
        { icon: '🚇', text: 'Lincoln Station (SkyTrain) — nearby' },
        { icon: '📍', text: 'Henderson Place Mall'    },
        { icon: '🅿️', text: 'Mall Parking — available'   },
      ].map(item => (
        <div key={item.text} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem' }}>{item.icon}</span>
          <p style={{
            fontFamily:    'var(--font-sans, Montserrat)',
            fontSize:      '0.72rem',
            fontWeight:    300,
            color:         'rgba(255,255,255,0.45)',
            letterSpacing: '0.02em',
          }}>
            {item.text}
          </p>
        </div>
      ))}
      <a
        href="https://maps.google.com/?q=1163+Pinetree+Way+Coquitlam+BC+V3B+8A9"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '0.5rem',
          fontFamily:     'var(--font-sans, Montserrat)',
          fontSize:       '0.6rem',
          fontWeight:     500,
          letterSpacing:  '0.2em',
          textTransform:  'uppercase',
          color:          'var(--color-gold, #c9a96e)',
          textDecoration: 'none',
          marginTop:      '0.25rem',
        }}
      >
        Get Directions
        <svg width="14" height="6" viewBox="0 0 14 6" fill="none">
          <path d="M0 3H12M9 1L12 3L9 5" stroke="currentColor" strokeWidth="0.7" />
        </svg>
      </a>
    </div>
  )
}

function ContactBlock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      {[
        { label: 'Telephone',    value: '+1 604-941-2359',          href: 'tel:+16049412359' },
        { label: 'Email',        value: 'charliehamiltonspub1@gmail.com', href: 'mailto:charliehamiltonspub1@gmail.com' },
        { label: 'Reservations', value: 'Book a Table',              href: '#reservations' },
      ].map((item, i, arr) => (
        <div key={item.label} style={{
          paddingBottom: i < arr.length - 1 ? '1.1rem' : 0,
          borderBottom:  i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}>
          <p style={{
            fontFamily:    'var(--font-sans, Montserrat)',
            fontSize:      '0.58rem',
            fontWeight:    400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'var(--color-gold, #c9a96e)',
            marginBottom:  '0.25rem',
          }}>
            {item.label}
          </p>
          <a href={item.href} style={{
            fontFamily:     'var(--font-serif, Cormorant Garamond)',
            fontSize:       '1.1rem',
            fontWeight:     400,
            color:          '#ffffff',
            letterSpacing:  '0.02em',
            textDecoration: 'none',
            transition:     'color 0.25s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold, #c9a96e)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
          >
            {item.value}
          </a>
        </div>
      ))}
    </div>
  )
}

function InfoCard({
  title, icon, children, delay = 0,
}: {
  title: string; icon: React.ReactNode; children: React.ReactNode; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} style={{
      padding:    'clamp(2rem, 4vw, 3rem)',
      background: 'rgba(255,255,255,0.02)',
      opacity:    vis ? 1 : 0,
      transform:  vis ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{ marginBottom: '1.25rem', color: 'var(--color-gold, #c9a96e)' }}>{icon}</div>
      <h3 style={{
        fontFamily:    'var(--font-sans, Montserrat)',
        fontSize:      '0.62rem',
        fontWeight:    500,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color:         'rgba(255,255,255,0.38)',
        marginBottom:  '1.25rem',
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function ExtraInfoBlock({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
      <div style={{ color: 'var(--color-gold, #c9a96e)', flexShrink: 0, marginTop: '3px' }}>{icon}</div>
      <div>
        <h4 style={{
          fontFamily:    'var(--font-sans, Montserrat)',
          fontSize:      '0.65rem',
          fontWeight:    500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         '#ffffff',
          marginBottom:  '0.5rem',
        }}>
          {title}
        </h4>
        <p style={{
          fontFamily:  'var(--font-sans, Montserrat)',
          fontSize:    '0.75rem',
          fontWeight:  300,
          color:       'rgba(255,255,255,0.42)',
          lineHeight:  1.85,
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

function ContactCard({ item, delay }: { item: typeof CONTACT_ITEMS[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <a
      ref={ref as any}
      href={item.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        textAlign:      'center',
        padding:        'clamp(2rem, 4vw, 3rem) clamp(1rem, 2vw, 2rem)',
        background:     hov ? 'rgba(201,169,110,0.06)' : 'var(--color-charcoal, #1a1916)',
        textDecoration: 'none',
        opacity:        vis ? 1 : 0,
        transform:      vis ? 'translateY(0)' : 'translateY(24px)',
        transition:     'opacity 0.8s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
        cursor:         'pointer',
      }}
    >
      <div style={{
        marginBottom: '1rem',
        transform:    hov ? 'translateY(-4px)' : 'translateY(0)',
        transition:   'transform 0.3s ease',
      }}>
        {item.icon}
      </div>
      <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontSize: '0.55rem', fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: '0.45rem', display: 'block' }}>
        {item.label}
      </span>
      <span style={{ fontFamily: 'var(--font-serif, Cormorant Garamond)', fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', fontWeight: 400, color: '#ffffff', letterSpacing: '0.02em', marginBottom: '0.35rem', display: 'block' }}>
        {item.value}
      </span>
      <span style={{ fontFamily: 'var(--font-sans, Montserrat)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.03em', marginBottom: '1.25rem', display: 'block' }}>
        {item.sub}
      </span>
      <span style={{
        fontFamily:    'var(--font-sans, Montserrat)',
        fontSize:      '0.55rem',
        fontWeight:    500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color:         hov ? 'var(--color-gold, #c9a96e)' : 'rgba(255,255,255,0.28)',
        borderBottom:  `1px solid ${hov ? 'var(--color-gold, #c9a96e)' : 'rgba(255,255,255,0.12)'}`,
        paddingBottom: '0.25rem',
        transition:    'color 0.3s ease, border-color 0.3s ease',
      }}>
        {item.action}
      </span>
    </a>
  )
}

function CornerAccent({ position }: { position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' }) {
  const s: React.CSSProperties = {
    position: 'absolute', width: '1.5rem', height: '1.5rem', zIndex: 2,
    ...(position === 'topLeft'     && { top: '1rem',    left: '1rem',  borderTop:    '1px solid var(--color-gold)', borderLeft:   '1px solid var(--color-gold)' }),
    ...(position === 'topRight'    && { top: '1rem',    right: '1rem', borderTop:    '1px solid var(--color-gold)', borderRight:  '1px solid var(--color-gold)' }),
    ...(position === 'bottomLeft'  && { bottom: '1rem', left: '1rem',  borderBottom: '1px solid var(--color-gold)', borderLeft:   '1px solid var(--color-gold)' }),
    ...(position === 'bottomRight' && { bottom: '1rem', right: '1rem', borderBottom: '1px solid var(--color-gold)', borderRight:  '1px solid var(--color-gold)' }),
  }
  return <span style={s} aria-hidden="true" />
}

/* ── REVEAL WRAPPER ─────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up' }: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.unobserve(el) } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const fromX = direction === 'left' ? '-32px' : direction === 'right' ? '32px' : '0'
  const fromY = direction === 'up'   ? '28px'  : '0'

  return (
    <div ref={ref} style={{
      opacity:    vis ? 1 : 0,
      transform:  vis ? 'translate(0,0)' : `translate(${fromX},${fromY})`,
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ── ICONS ──────────────────────────────────────────────── */
function ClockIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function PinIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function PhoneIcon({ color = 'currentColor', size = 24 }: { color?: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
}
function MailIcon({ color = 'currentColor', size = 24 }: { color?: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
function CalIcon({ color = 'currentColor', size = 24 }: { color?: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function InstagramIcon({ color = 'currentColor', size = 24 }: { color?: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
}
function ShirtIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20.38 3.46L16 2l-4 4-4-4-4.38 1.46A2 2 0 0 0 2 5.35V8a1 1 0 0 0 1 1h1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9h1a1 1 0 0 0 1-1V5.35a2 2 0 0 0-1.62-1.89z"/></svg>
}
function CarIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
}
function MetroIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="6" x2="12" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14" strokeWidth="2"/><line x1="16" y1="14" x2="16.01" y2="14" strokeWidth="2"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
}

/* ── SHARED STYLES ──────────────────────────────────────── */
const eyebrowStyle: React.CSSProperties = {
  display:       'block',
  fontFamily:    'var(--font-sans, Montserrat)',
  fontSize:      '0.625rem',
  fontWeight:    400,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color:         'var(--color-gold, #c9a96e)',
  marginBottom:  '1rem',
}

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin:   '0 auto',
  padding:  '0 clamp(1.5rem, 5vw, 4rem)',
}