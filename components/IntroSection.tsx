'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ── CONSTANTS ──────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]

/* ── COMPONENT ──────────────────────────────────────────── */
export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Subtle parallax for the main image
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section
      id="about"
      style={{
        background: 'var(--color-ivory, #f8f4ee)',
        padding:    'clamp(5rem, 10vw, 9rem) 0',
        overflow:   'hidden',
      }}
      aria-label="About The Aurelia"
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin:   '0 auto',
          padding:  '0 clamp(1.5rem, 5vw, 4rem)',
        }}
      >

        {/* ── TOP ROW: Eyebrow + pull quote ─────────────── */}
        <div
          style={{
            display:         'flex',
            justifyContent:  'space-between',
            alignItems:      'flex-start',
            gap:             '2rem',
            marginBottom:    'clamp(3rem, 6vw, 5rem)',
            flexWrap:        'wrap',
          }}
        >
          {/* Left — eyebrow + number */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span style={eyebrowStyle}>Our Philosophy</span>
            <p style={{
              fontFamily:    'var(--font-serif, Cormorant Garamond)',
              fontSize:      'clamp(4rem, 10vw, 7rem)',
              fontWeight:    300,
              color:         'var(--color-gold, #c9a96e)',
              lineHeight:    1,
              letterSpacing: '-0.02em',
            }}>
              01
            </p>
          </motion.div>

          {/* Right — pull quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            style={{
              maxWidth:  '480px',
            }}
          >
            <p style={{
              fontFamily:    'var(--font-serif, Cormorant Garamond)',
              fontSize:      'clamp(1.4rem, 2.5vw, 1.9rem)',
              fontWeight:    600,
              fontStyle:     'italic',
              color:         'var(--color-charcoal, #1a1916)',
              lineHeight:    1.5,
              letterSpacing: '0.01em',
            }}>
              &quot;We believe dining is not merely sustenance — it is the art of gathering,
              of slowing down, of being fully present at the table.&quot;
            </p>
            <span style={{
              display:       'block',
              marginTop:     '1.2rem',
              fontFamily:    'var(--font-sans, Montserrat)',
              fontSize:      '0.625rem',
              fontWeight:    800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'var(--color-muted, #9a948c)',
            }}>
              — Chef Arjun Mehta, Founder
            </span>
          </motion.div>
        </div>

        {/* ── DIVIDER LINE ──────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            transformOrigin: 'left',
            height:       '1px',
            background:   'linear-gradient(to right, var(--color-gold, #c9a96e), transparent)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        />

        {/* ── MAIN CONTENT: Image + Text ────────────────── */}
        <div
          style={{
            display:   'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap:       'clamp(2.5rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
        >
          {/* Left — stacked images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE }}
            style={{ position:  'relative' }}
          >
            <ImageStack imageY={imageY} />
          </motion.div>

          {/* Right — text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            <TextContent />
          </motion.div>
        </div>

        {/* ── BOTTOM STATS ROW ──────────────────────────── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap:                 '2rem',
            marginTop:           'clamp(4rem, 8vw, 7rem)',
            paddingTop:          'clamp(2.5rem, 5vw, 4rem)',
            borderTop:           '1px solid var(--color-border, #d8d2c8)',
          }}
        >
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              {...stat}
              delay={i * 120}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ── IMAGE STACK ────────────────────────────────────────── */
function ImageStack({ imageY }: { imageY: import('framer-motion').MotionValue<number> }) {
  return (
    <div style={{ position: 'relative', paddingBottom: '12%' }}>

      {/* Main large image */}
      <motion.div
        style={{
          position:     'relative',
          width:        '85%',
          aspectRatio:  '3/4',
          overflow:     'hidden',
          y:            imageY,
        }}
        className="img-zoom-wrap"
      >
        <Image
          src="/images/main.jpg"
          alt="The Aurelia dining room — warm candlelit atmosphere"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </motion.div>

      {/* Accent image — offset bottom right */}
      <div
        style={{
          position:    'absolute',
          bottom:      0,
          right:       0,
          width:       '50%',
          aspectRatio: '1/1',
          overflow:    'hidden',
          border:      '6px solid var(--color-ivory, #f8f4ee)',
        }}
        className="img-zoom-wrap"
      >
        <Image
          src="/images/detail.jpg"
          alt="Signature dish — exquisite plating at The Aurelia"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 50vw, 22vw"
        />
      </div>

      {/* Gold accent square — decorative */}
      <div
        style={{
          position:   'absolute',
          top:        '-1.5rem',
          left:       '-1.5rem',
          width:      '4rem',
          height:     '4rem',
          border:     '1px solid var(--color-gold, #c9a96e)',
          opacity:    0.35,
          zIndex:     -1,
        }}
        aria-hidden="true"
      />
    </div>
  )
}

/* ── TEXT CONTENT ───────────────────────────────────────── */
function TextContent() {
  return (
    <div>
      <span style={eyebrowStyle}>Our Story</span>

      <h2
        style={{
          fontFamily:    'var(--font-serif, Cormorant Garamond)',
          fontSize:      'clamp(2rem, 4vw, 3rem)',
          fontWeight:    300,
          color:         'var(--color-charcoal, #1a1916)',
          lineHeight:    1.15,
          letterSpacing: '0.01em',
          marginBottom:  '1.5rem',
        }}
      >
        A Legacy of <br />
        <em>Fine Spirits &amp; Warm Hospitality</em>
      </h2>

      {/* Gold divider line */}
      <span
        style={{
          display:      'block',
          width:        '40px',
          height:       '1px',
          background:   'var(--color-gold, #52452cff)',
          margin:       '1.5rem 0',
        }}
      />

      <p
        style={{
          fontFamily:   'var(--font-sans, Montserrat)',
          fontSize:     '0.8125rem',
          fontWeight:   600,
          color:        'var(--color-mid, #130b04ff)',
          lineHeight:   2,
          marginBottom: '1.25rem',
          maxWidth:     '480px',
        }}
      >
        Since 1897, Charlie Hamilton has been the heart of Chelsea&apos;s social scene. What began as a humble ale house on King&apos;s Road has evolved into one of London&apos;s most cherished pubs — a place where tradition meets craftsmanship, and every glass tells a story.
      </p>

      <p
        style={{
          fontFamily: 'var(--font-sans, Montserrat)',
          fontSize:   '0.8125rem',
          fontWeight: 600,
          color:      'var(--color-mid, #5a5550)',
          lineHeight: 2,
          maxWidth:   '480px',
        }}
      >
        Our bar showcases over 50 premium whiskeys from Scotland&apos;s finest distilleries, alongside 12 rotating craft beers brewed exclusively for us. Whether you&apos;re here for a quiet evening by the fire or a lively night with friends, Charlie Hamilton welcomes you home.
      </p>

      {/* CTA */}
      <a
        href="#menu"
        style={{
          display:       'inline-flex',
          alignItems:    'center',
          gap:           '0.75rem',
          marginTop:     '2.5rem',
          fontFamily:    'var(--font-sans, Montserrat)',
          fontSize:      '0.625rem',
          fontWeight:    500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         'var(--color-charcoal, #1a1916)',
          borderBottom:  '1px solid var(--color-gold, #c9a96e)',
          paddingBottom: '0.35rem',
          transition:    'color 0.3s ease, gap 0.3s ease',
          textDecoration: 'none',
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
        Discover Our Menu
        <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
          <path d="M0 4H18M15 1L18.5 4L15 7" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </a>
    </div>
  )
}

/* ── STAT ITEM ──────────────────────────────────────────── */
const STATS = [
  { number: '15+',  label: 'Years of Excellence' },
  { number: '3',    label: 'Awards This Year'    },
  { number: '800+', label: 'Wines in Cellar'     },
  { number: '12',   label: 'Seasonal Menus'      },
]

function StatItem({
  number,
  label,
  delay,
}: {
  number: string
  label: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: delay / 1000, ease: EASE }}
    >
      <p style={{
        fontFamily:    'var(--font-serif, Cormorant Garamond)',
        fontSize:      'clamp(2.5rem, 5vw, 3.5rem)',
        fontWeight:    300,
        color:         'var(--color-charcoal, #1a1916)',
        lineHeight:    1,
        letterSpacing: '-0.01em',
        marginBottom:  '0.4rem',
      }}>
        {number}
      </p>
      <p style={{
        fontFamily:    'var(--font-sans, Montserrat)',
        fontSize:      '0.625rem',
        fontWeight:    400,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color:         'var(--color-muted, #9a948c)',
      }}>
        {label}
      </p>
    </motion.div>
  )
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
