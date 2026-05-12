'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

/* ── CONSTANTS ──────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]

/* ── MENU DATA ───────────────────────────────────────────── */
const MENU_CATEGORIES = [
  {
    id: 'cocktails',
    label: 'Cocktails',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M8 22h8M12 11v11M3 3l9 8 9-8H3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      {
        id: '01', category: 'Signature', name: 'The Hamilton Old Fashioned',
        description: 'Buffalo Trace, Demerara, Angostura, Orange bitters',
        price: '$14', tag: "Bartender's Pick", image: '/images/cocktail-1.jpg',
      },
      {
        id: '02', category: 'Zero Proof', name: 'Smoke & Honey',
        description: 'Mezcal, honey syrup, lime, chipotle salt rim',
        price: '$13', tag: 'Seasonal', image: '/images/cocktail-2.jpg',
      },
      {
        id: '03', category: 'Classic Rework', name: 'Chelsea Garden',
        description: 'Hendrick\'s gin, cucumber, prosecco, elderflower tonic',
        price: '$15', tag: 'New', image: '/images/cocktail-3.jpg',
      },
      {
        id: '04', category: 'Tiki', name: 'Dark & Stormy Night',
        description: 'Gosling\'s run, house ginger beer, lime, bitters',
        price: '$12', tag: 'Popular', image: '/images/cocktail-4.jpg',
      },
      {
        id: '05', category: 'Aperitivo', name: 'The King\'s Espresso',
        description: 'Vodka, Mr Black, fresh espresso, vanilla',
        price: '$14', tag: 'Light', image: '/images/cocktail-5.jpg',
      },
      {
        id: '06', category: 'House Special', name: 'Bramble Royal',
        description: 'Gin, Crème de Mûre, lemon juice, Prosecco float',
        price: '$12', tag: "Bartender's Pick", image: '/images/cocktail-6.jpg',
      },
    ],
  },
  {
    id: 'beers',
    label: 'Beers & Ales',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M5 3h11l1 4H4L5 3z" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="7" width="13" height="14" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 10h2a2 2 0 0 1 0 4h-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      {
        id: '01', category: 'House Brew', name: "Charlie's Golden Ale",
        description: 'Our signature house pour — light citrus and caramel notes with a clean, malty finish. 4.8% ABV.',
        price: '₹580', tag: 'House Brew', image: '/images/beer-01.jpg',
      },
      {
        id: '02', category: 'Craft Import', name: 'Hamilton IPA',
        description: 'Hoppy and bold, bursting with tropical and pine notes. A favourite among hop-heads. 6.2% ABV.',
        price: '₹620', tag: "Chef's Choice", image: '/images/beer-02.jpg',
      },
      {
        id: '03', category: 'Seasonal Tap', name: 'Seasonal Wheat',
        description: 'Light, cloudy and unfiltered with delicate hints of coriander and orange peel. 4.4% ABV.',
        price: '₹540', tag: 'Seasonal', image: '/images/beer-03.jpg',
      },
      {
        id: '04', category: 'Stout', name: 'Midnight Porter',
        description: 'Rich, roasted and velvety — notes of dark chocolate, espresso and a hint of smoked treacle. 5.6% ABV.',
        price: '₹650', tag: 'Dark', image: '/images/beer-04.jpg',
      },
      {
        id: '05', category: 'Lager', name: 'Pilsner Royale',
        description: 'Crisp Bohemian-style pilsner with noble Saaz hops. Clean, dry and supremely sessionable. 4.2% ABV.',
        price: '₹480', tag: 'Refreshing', image: '/images/beer-05.jpg',
      },
      {
        id: '06', category: 'Belgian', name: 'Tripel Reserve',
        description: 'Strong, golden Belgian-style tripel with fruity esters, clove and banana. Deceptively smooth. 8.5% ABV.',
        price: '₹750', tag: 'Premium', image: '/images/beer-06.jpg',
      },
    ],
  },
  {
    id: 'spirits',
    label: 'Spirits',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M9 3h6l1 5H8L9 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8c0 8 8 8 8 0" strokeLinecap="round" />
        <path d="M10 21h4M12 16v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      {
        id: '01', category: 'Single Malt', name: 'Glenfiddich 18',
        description: 'Aged in American bourbon and Spanish Oloroso sherry casks. Dried fruit, oak spice and a long, warming finish.',
        price: '₹1,400', tag: 'Premium', image: '/images/spirit-01.jpg',
      },
      {
        id: '02', category: 'Indian Single Malt', name: 'Amrut Fusion',
        description: 'A marriage of Indian and Scottish peated barley. Honey, malt and a subtle peat smoke — an award-winning dram.',
        price: '₹1,200', tag: "Bartender's Pick", image: '/images/spirit-02.jpg',
      },
      {
        id: '03', category: 'Small Batch Rum', name: 'Plantation XO',
        description: 'Double-aged in Cognac casks. Rich notes of dried mango, vanilla and toasted coconut with a silky finish.',
        price: '₹980', tag: 'New', image: '/images/spirit-03.jpg',
      },
      {
        id: '04', category: 'Japanese Whisky', name: 'Hakushu 12',
        description: 'Light and herbaceous with notes of green apple, mint and gentle smoke from the Japanese Alps distillery.',
        price: '₹1,600', tag: 'Rare', image: '/images/spirit-04.jpg',
      },
      {
        id: '05', category: 'Mezcal', name: 'Del Maguey Vida',
        description: 'Artisanal single-village mezcal with earthy agave, citrus peel and a clean, smoky finish. Perfect for sipping.',
        price: '₹850', tag: 'Smoky', image: '/images/spirit-05.jpg',
      },
      {
        id: '06', category: 'Cognac', name: 'Rémy Martin VSOP',
        description: 'Smooth and well-rounded — ripe stone fruit, vanilla and a lingering spice with over four years of ageing.',
        price: '₹1,350', tag: 'Classic', image: '/images/spirit-06.jpg',
      },
    ],
  },
  {
    id: 'bites',
    label: 'Bar Bites',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      {
        id: '01', category: 'Signature', name: 'Raan-e-Aurelia',
        description: 'Slow-roasted lamb shank marinated for 48 hours in Kashmiri spices, served with saffron jus and charred seasonal greens.',
        price: '₹3,200', tag: "Chef's Choice", image: '/images/dish-01.jpg',
      },
      {
        id: '02', category: 'Starter', name: 'Scallop Chaat',
        description: 'Hand-dived scallops with tamarind glaze, crispy lotus root, pomegranate foam and micro herbs from our kitchen garden.',
        price: '₹1,800', tag: 'Seasonal', image: '/images/dish-02.jpg',
      },
      {
        id: '03', category: 'Dessert', name: 'Mango Verrine',
        description: 'Alphonso mango cremeux, cardamom sponge, rose petal gel and a scoop of hand-churned kulfi — a tribute to the Indian summer.',
        price: '₹950', tag: 'New', image: '/images/dish-03.jpg',
      },
      {
        id: '04', category: 'Sharing Board', name: 'The Hamilton Platter',
        description: 'Cured meats, artisan cheeses, cornichons, honeycomb, sourdough crisps and our house chutney — built for two.',
        price: '₹2,400', tag: 'For Two', image: '/images/dish-04.jpg',
      },
      {
        id: '05', category: 'Comfort', name: 'Truffle Mac & Cheese',
        description: 'Three-cheese béchamel with black truffle oil, panko crust and a shower of aged Parmesan. Indulgent and irresistible.',
        price: '₹1,100', tag: 'Popular', image: '/images/dish-05.jpg',
      },
      {
        id: '06', category: 'Seafood', name: 'Tempura Prawns',
        description: 'Tiger prawns in a light, crispy tempura batter with yuzu mayo, pickled ginger and a micro shiso salad.',
        price: '₹1,400', tag: 'Light', image: '/images/dish-06.jpg',
      },
    ],
  },
]

/* ── COMPONENT ──────────────────────────────────────────── */
export default function MenuHighlights() {
  const [activeTab, setActiveTab] = useState(0)
  const [menuPage, setMenuPage]   = useState(0)
  const activeCategory = MENU_CATEGORIES[activeTab]
  const ITEMS_PER_PAGE = 3
  const totalPages = Math.ceil(activeCategory.items.length / ITEMS_PER_PAGE)
  const pageItems = activeCategory.items.slice(
    menuPage * ITEMS_PER_PAGE,
    menuPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )

  /* Reset page when switching category tabs */
  const handleTabSwitch = (i: number) => {
    setActiveTab(i)
    setMenuPage(0)
  }

  return (
    <section
      id="menu"
      style={{
        background: 'var(--color-charcoal, #1a1916)',
        padding:    'clamp(5rem, 10vw, 9rem) 0',
        overflow:   'hidden',
        position:   'relative',
      }}
      aria-label="Menu Highlights"
    >
      {/* ── DECORATIVE BACKGROUND TEXT ───────────────────── */}
      <span
        aria-hidden="true"
        style={{
          position:         'absolute',
          top:              '50%',
          left:             '50%',
          transform:        'translate(-50%, -50%)',
          fontFamily:       'var(--font-serif, Cormorant Garamond)',
          fontSize:         'clamp(8rem, 18vw, 18rem)',
          fontWeight:       300,
          color:            'transparent',
          WebkitTextStroke: '1px rgba(201,169,110,0.07)',
          letterSpacing:    '0.1em',
          whiteSpace:       'nowrap',
          pointerEvents:    'none',
          userSelect:       'none',
          lineHeight:       1,
        }}
      >
        MENU
      </span>

      <div
        style={{
          maxWidth: '1200px',
          margin:   '0 auto',
          padding:  '0 clamp(1.5rem, 5vw, 4rem)',
          position: 'relative',
          zIndex:   1,
        }}
      >
        {/* ── SECTION HEADER ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-end',
            marginBottom:   'clamp(2rem, 4vw, 3.5rem)',
            flexWrap:       'wrap',
            gap:            '1.5rem',
          }}
        >
          <div>
            <span style={eyebrowStyle}>Our Offerings</span>
            <h2
              style={{
                fontFamily:    'var(--font-serif, Cormorant Garamond)',
                fontSize:      'clamp(2.5rem, 5vw, 4rem)',
                fontWeight:    300,
                color:         '#ffffff',
                lineHeight:    1.1,
                letterSpacing: '0.01em',
              }}
            >
              The <em>Menu</em>
            </h2>
          </div>

          <Link
            href="#full-menu"
            style={{
              fontFamily:     'var(--font-sans, Montserrat)',
              fontSize:       '0.625rem',
              fontWeight:     500,
              letterSpacing:  '0.22em',
              textTransform:  'uppercase',
              color:          'var(--color-gold, #c9a96e)',
              border:         '1px solid rgba(201,169,110,0.4)',
              padding:        '0.75rem 1.75rem',
              display:        'inline-block',
              transition:     'background 0.3s ease, border-color 0.3s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background  = 'rgba(201,169,110,0.1)'
              el.style.borderColor = 'var(--color-gold, #c9a96e)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background  = 'transparent'
              el.style.borderColor = 'rgba(201,169,110,0.4)'
            }}
          >
            View Full Menu
          </Link>
        </motion.div>

        {/* ── TAB BAR ──────────────────────────────────────── */}
        <div
          style={{
            display:      'flex',
            gap:          'clamp(0.4rem, 1.2vw, 0.875rem)',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            flexWrap:     'wrap',
          }}
        >
          {MENU_CATEGORIES.map((cat, i) => {
            const isActive = i === activeTab
            return (
              <button
                key={cat.id}
                onClick={() => handleTabSwitch(i)}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '0.45rem',
                  fontFamily:    'var(--font-sans, Montserrat)',
                  fontSize:      '0.575rem',
                  fontWeight:    500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor:        'pointer',
                  padding:       '0.65rem 1.35rem',
                  border:        isActive
                    ? '1px solid var(--color-gold, #c9a96e)'
                    : '1px solid rgba(255,255,255,0.14)',
                  background: isActive ? 'var(--color-gold, #c9a96e)' : 'transparent',
                  color:      isActive ? 'var(--color-charcoal, #1a1916)' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.25s ease',
                  lineHeight: 1,
                }}
                onMouseEnter={e => {
                  if (i === activeTab) return
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(201,169,110,0.55)'
                  el.style.color       = 'rgba(201,169,110,0.9)'
                }}
                onMouseLeave={e => {
                  if (i === activeTab) return
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.14)'
                  el.style.color       = 'rgba(255,255,255,0.5)'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', opacity: isActive ? 1 : 0.65 }}>
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* ── MENU CARDS GRID (paginated) ───────────────────── */}
        <div
          key={`${activeTab}-${menuPage}`}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap:                 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {pageItems.map((item, i) => (
            <MenuCard key={`${activeTab}-${menuPage}-${item.id}`} item={item} index={i} />
          ))}
        </div>

        {/* ── PAGE NAVIGATION ──────────────────────────────── */}
        {totalPages > 1 && (
          <div
            style={{
              display:        'flex',
              justifyContent: 'center',
              alignItems:     'center',
              gap:            '1.25rem',
              marginTop:      'clamp(2rem, 4vw, 3rem)',
            }}
          >
            <PageArrow
              dir="left"
              disabled={menuPage === 0}
              onClick={() => setMenuPage(p => Math.max(0, p - 1))}
            />
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMenuPage(i)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={menuPage === i ? 'page' : undefined}
                  style={{
                    width:        menuPage === i ? '2rem' : '0.45rem',
                    height:       '0.45rem',
                    borderRadius: '999px',
                    background:   menuPage === i ? 'var(--color-gold, #c9a96e)' : 'rgba(255,255,255,0.15)',
                    border:       'none',
                    padding:      0,
                    cursor:       'pointer',
                    transition:   'width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
                  }}
                />
              ))}
            </div>
            <span style={{
              fontFamily: 'var(--font-sans, Montserrat)', fontSize: '0.6rem',
              fontWeight: 400, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)',
            }}>
              {menuPage + 1} / {totalPages}
            </span>
            <PageArrow
              dir="right"
              disabled={menuPage === totalPages - 1}
              onClick={() => setMenuPage(p => Math.min(totalPages - 1, p + 1))}
            />
          </div>
        )}

      </div>
    </section>
  )
}

/* ── MENU CARD ──────────────────────────────────────────── */
type MenuItem = {
  id: string; category: string; name: string
  description: string; price: string; tag: string; image: string
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: index * 0.15, ease: EASE }}
      whileHover="hover"
      style={{
        display:       'flex',
        flexDirection: 'column',
        background:    'rgba(255,255,255,0.03)',
        border:        '1px solid rgba(255,255,255,0.06)',
        cursor:        'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
        <motion.div
          variants={{
            hover: { scale: 1.06, transition: { duration: 0.8, ease: EASE } }
          }}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        >
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        </motion.div>
        <span
          style={{
            position:      'absolute',
            top:           '1rem',
            left:          '1rem',
            fontFamily:    'var(--font-sans, Montserrat)',
            fontSize:      '0.5rem',
            fontWeight:    500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'var(--color-charcoal, #1a1916)',
            background:    'var(--color-gold, #c9a96e)',
            padding:       '0.3rem 0.75rem',
          }}
        >
          {item.tag}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          padding:       'clamp(1.25rem, 3vw, 1.75rem)',
          display:       'flex',
          flexDirection: 'column',
          flex:          1,
          gap:           '0.75rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={eyebrowStyle}>{item.category}</span>
          <span
            style={{
              fontFamily:    'var(--font-serif, Cormorant Garamond)',
              fontSize:      '1rem',
              fontWeight:    300,
              color:         'rgba(201,169,110,0.35)',
              letterSpacing: '0.05em',
            }}
          >
            {item.id}
          </span>
        </div>

        <h3
          style={{
            fontFamily:    'var(--font-serif, Cormorant Garamond)',
            fontSize:      'clamp(1.5rem, 2.5vw, 1.9rem)',
            fontWeight:    400,
            color:         '#ffffff',
            lineHeight:    1.15,
            letterSpacing: '0.02em',
          }}
        >
          {item.name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-sans, Montserrat)',
            fontSize:   '0.75rem',
            fontWeight: 300,
            color:      'rgba(255,255,255,0.45)',
            lineHeight: 1.85,
            flex:       1,
          }}
        >
          {item.description}
        </p>

        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            paddingTop:     '1rem',
            borderTop:      '1px solid rgba(255,255,255,0.08)',
            marginTop:      'auto',
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-serif, Cormorant Garamond)',
              fontSize:      '1.35rem',
              fontWeight:    400,
              color:         'var(--color-gold, #c9a96e)',
              letterSpacing: '0.02em',
            }}
          >
            {item.price}
          </span>
          <span
            style={{
              fontFamily:    'var(--font-sans, Montserrat)',
              fontSize:      '0.55rem',
              fontWeight:    400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.3)',
              display:       'flex',
              alignItems:    'center',
              gap:           '0.5rem',
            }}
          >
            Details
            <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
              <path d="M0 3H14M11 1L14 3L11 5" stroke="currentColor" strokeWidth="0.7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  )
}


/* ── PAGE ARROW ─────────────────────────────────────────── */
function PageArrow({ dir, disabled, onClick }: { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous page' : 'Next page'}
      style={{
        width:          '40px',
        height:         '40px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        border:         '1px solid',
        borderColor:    disabled ? 'rgba(255,255,255,0.08)' : 'rgba(201,169,110,0.4)',
        background:     'transparent',
        color:          disabled ? 'rgba(255,255,255,0.15)' : 'var(--color-gold, #c9a96e)',
        cursor:         disabled ? 'not-allowed' : 'pointer',
        transition:     'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        if (disabled) return
        const el = e.currentTarget
        el.style.background = 'var(--color-gold, #c9a96e)'
        el.style.color      = '#0d0d0d'
      }}
      onMouseLeave={e => {
        if (disabled) return
        const el = e.currentTarget
        el.style.background = 'transparent'
        el.style.color      = 'var(--color-gold, #c9a96e)'
      }}
    >
      <svg
        width="14" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"
        style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}
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
  fontSize:      '0.625rem',
  fontWeight:    400,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color:         'var(--color-gold, #c9a96e)',
  marginBottom:  '0.75rem',
}