import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../crartDrawer/CartContext'
import { useTheme } from '../context/ThemeContext'
import staticProducts from '../data/product'
import { productsAPI } from '../services/api'
import Reveal from '../utils/Reveal'

const SORT_OPTIONS = ['Recommended', 'Price: Low–High', 'Price: High–Low', 'Newest']
const ITEMS_PER_PAGE = 8

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [wished, setWished] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex flex-col group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-[#f2f0ed] flex items-center justify-center" style={{ aspectRatio: '3/4' }}>
        {product.badge && (
          <div
            className="absolute top-3 left-0 z-10 px-2.5 py-1"
            style={{ backgroundColor: product.badge === 'NEW ARRIVAL' ? '#1a1a1a' : '#8B7355' }}
          >
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>
              {product.badge}
            </span>
          </div>
        )}

        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center transition-colors duration-200 cursor-pointer"
          aria-label="Wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? '#1a1a1a' : 'none'} stroke="#1a1a1a" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <Link to={`/product/${product.productId || product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-in-out"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 py-3 text-center text-white transition-all duration-300 cursor-pointer md:opacity-0 md:translate-y-1.5 md:group-hover:opacity-100 md:group-hover:translate-y-0"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            backgroundColor: 'rgba(20,20,20,0.85)',
          }}
        >
          + ADD TO BAG
        </button>
      </div>

      <div className="mt-2.5">
        <Link to={`/product/${product.productId || product.id}`}>
          <h3
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.4 }}
            className="hover:underline text-[#1a1a1a] dark:text-gray-200"
          >
            {product.name}
          </h3>
        </Link>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 400, marginTop: '3px' }} className="text-gray-500 dark:text-gray-400">
          ${product.price.toLocaleString()}
        </p>

        {product.colors && (
          <div className="flex items-center gap-1 mt-2">
            {product.colors.map((color, i) => (
              <div
                key={i}
                className="rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                style={{ width: 12, height: 12, backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FilterGroup({ label, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }} className="text-[#1a1a1a] dark:text-gray-200">
          {label}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5"
          className="stroke-[#1a1a1a] dark:stroke-gray-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div className="mt-3 flex flex-col gap-2 pl-1">
          {children}
        </div>
      )}
    </div>
  )
}

function Collection() {
  const [sortBy, setSortBy] = useState('Recommended')
  const [sortOpen, setSortOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDark } = useTheme()

  // Fetch products from API, fallback to static data
  const [allProducts, setAllProducts] = useState(() => {
    const seen = new Set()
    return staticProducts.filter(p => {
      if (seen.has(p.name)) return false
      seen.add(p.name)
      return true
    })
  })

  useEffect(() => {
    productsAPI.getAll()
      .then(data => {
        if (data.products && data.products.length > 0) {
          const seen = new Set()
          const deduped = data.products.filter(p => {
            if (seen.has(p.name)) return false
            seen.add(p.name)
            return true
          })
          setAllProducts(deduped)
        }
      })
      .catch(() => { /* keep static fallback */ })
  }, [])

  const CATEGORY_OPTIONS = [...new Set(allProducts.map(p => p.category))].sort()

  const dm = isDark ? '#111111' : '#fff'
  const dmSurface = isDark ? '#1a1a1a' : '#f9f8f6'
  const dmBorder = isDark ? '#333' : '#e5e5e5'
  const dmText = isDark ? '#e5e5e5' : '#1a1a1a'
  const dmSubText = isDark ? '#999' : '#666'

  function toggleCategory(cat) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
    setCurrentPage(1)
  }

  const filtered = allProducts.filter(p =>
    selectedCategories.length === 0 || selectedCategories.includes(p.category)
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Price: Low–High') return a.price - b.price
    if (sortBy === 'Price: High–Low') return b.price - a.price
    return 0
  })

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))
  const paginated = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const activeTitle = selectedCategories.length === 0 ? 'All Products' : selectedCategories.join(' & ')

  const isActive = cat => selectedCategories.length === 1 && selectedCategories[0] === cat

  const navBtnStyle = active => ({
    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
    fontFamily: 'Montserrat, sans-serif', fontSize: '12px',
    fontWeight: active ? 700 : 400,
    color: active ? dmText : dmSubText,
    letterSpacing: '0.02em', padding: 0, transition: 'color 0.2s',
    textDecoration: active ? 'underline' : 'none',
    textUnderlineOffset: '3px',
  })

  const sidebarContent = (
    <>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: dmText, marginBottom: 4 }}>
        COLLECTIONS
      </p>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: dmSubText, marginBottom: 20, letterSpacing: '0.02em' }}>
        Refine your search
      </p>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        <button onClick={() => { setSelectedCategories([]); setCurrentPage(1) }} style={navBtnStyle(selectedCategories.length === 0)}>
          All Products
        </button>
        {CATEGORY_OPTIONS.map(cat => (
          <button key={cat} onClick={() => { setSelectedCategories([cat]); setCurrentPage(1) }} style={navBtnStyle(isActive(cat))}>
            {cat}
          </button>
        ))}
      </nav>

      <FilterGroup label="Category">
        {CATEGORY_OPTIONS.map(c => (
          <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(c)}
              onChange={() => toggleCategory(c)}
              style={{ accentColor: '#1a1a1a', width: 13, height: 13, cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#444', letterSpacing: '0.03em' }}>{c}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup label="Size">
        {['XS', 'S', 'M', 'L', 'XL'].map(s => (
          <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" style={{ accentColor: '#1a1a1a', width: 13, height: 13 }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#444' }}>{s}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup label="Color">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 2 }}>
          {['#1a1a1a', '#c8b89a', '#f5f5f0', '#8B7355', '#4a5568', '#d4af7a'].map((c, i) => (
            <div
              key={i}
              className="cursor-pointer hover:scale-110 transition-transform"
              style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: c, border: '1.5px solid #ddd' }}
            />
          ))}
        </div>
      </FilterGroup>
    </>
  )

  return (
    <div style={{ backgroundColor: dm, minHeight: '100vh', overflowX: 'hidden' }}>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 99 }}
        />
      )}

      <div className="flex" style={{ alignItems: 'flex-start', overflowX: 'hidden' }}>

        <aside
          className="hidden lg:block"
          style={{ width: 200, minWidth: 200, borderRight: `1px solid ${dmBorder}`, padding: '32px 20px 40px 24px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', backgroundColor: dm }}
        >
          {sidebarContent}
        </aside>

        <aside
          className="lg:hidden"
          style={{
            position: 'fixed', top: 0, left: 0, width: 280, height: '100vh',
            backgroundColor: dm, borderRight: `1px solid ${dmBorder}`,
            padding: '32px 20px 40px 24px', overflowY: 'auto', zIndex: 100,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: dmText }}>FILTERS</span>
            <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, lineHeight: 1, color: dmText }}>✕</button>
          </div>
          {sidebarContent}
        </aside>

        <main style={{ flex: 1, minWidth: 0 }} className="px-4 py-6 lg:px-7 lg:py-8">

          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px 6px', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  border: `1px solid ${dmBorder}`, background: dm,
                  padding: '7px 12px', cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
                  fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: dmText, whiteSpace: 'nowrap', flexShrink: 0,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={dmText} strokeWidth="1.8">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="16" y2="12" />
                  <line x1="4" y1="18" x2="12" y2="18" />
                </svg>
                FILTER
                {selectedCategories.length > 0 && (
                  <span style={{ background: '#1a1a1a', color: '#fff', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>
                    {selectedCategories.length}
                  </span>
                )}
              </button>
              <div>
                <h1
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: dmText, margin: 0 }}
                  className="text-base md:text-xl lg:text-2xl"
                >
                  {activeTitle}
                </h1>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: dmSubText, marginTop: 6, letterSpacing: '0.02em' }}>
                  Showing {sorted.length} of {allProducts.length} items
                </p>
              </div>
              </div>

              <div style={{ position: 'relative' }}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  border: `1px solid ${dmBorder}`, background: dm, cursor: 'pointer',
                  padding: '8px 12px', fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: dmText, whiteSpace: 'nowrap',
                }}
              >
                <span className="hidden sm:inline">SORT BY: {sortBy.toUpperCase()}</span>
                <span className="sm:hidden">SORT</span>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={dmText} strokeWidth="1.5"
                  style={{ transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>
              {sortOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, background: dm, border: `1px solid ${dmBorder}`, zIndex: 50, minWidth: 160, maxWidth: '90vw', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setSortOpen(false) }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '10px 16px', fontFamily: 'Montserrat, sans-serif',
                        fontSize: '11px', letterSpacing: '0.06em',
                        color: sortBy === opt ? dmText : dmSubText,
                        fontWeight: sortBy === opt ? 700 : 400,
                        background: sortBy === opt ? (isDark ? '#222' : '#f9f9f9') : dm,
                        border: 'none', cursor: 'pointer', textTransform: 'uppercase',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ gap: '24px 14px', marginTop: 24 }}>
              {paginated.length > 0 ? (
                paginated.map(product => (
                  <ProductCard key={product.productId || product.id} product={product} />
                ))
              ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: '#999', letterSpacing: '0.06em' }}>
                  No products found.
                </div>
              )}
            </div>
          </Reveal>

          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 48 }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{ width: 34, height: 34, border: '1px solid #d1d5db', background: '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#555', letterSpacing: '0.06em' }}>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{ width: 34, height: 34, border: '1px solid #d1d5db', background: '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          )}

          <Reveal delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 0, marginTop: 64, borderTop: '1px solid #e5e5e5' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: 280 }}>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop"
                alt="The Winter Edit"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.1) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.15, margin: 0, marginBottom: 6 }}>
                  The Winter Edit
                </h2>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 14 }}>
                  Outerwear and knits for the winter season.
                </p>
                <button
                  style={{ background: 'none', border: '1px solid rgba(255,255,255,0.85)', color: '#fff', padding: '8px 18px', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.25s, color 0.25s' }}
                  onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.color = '#1a1a1a' }}
                  onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = '#fff' }}
                >
                  VIEW CAMPAIGN
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px 24px', backgroundColor: dmSurface, textAlign: 'center', gap: 14 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={dmText} strokeWidth="1.2">
                <path d="M12 22c0 0-8-4-8-12A8 8 0 0 1 12 2a8 8 0 0 1 8 8c0 8-8 12-8 12z" />
                <line x1="12" y1="22" x2="12" y2="11" />
              </svg>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: dmText, margin: 0 }}>
                CONSCIOUS LUXURY
              </h3>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: dmSubText, lineHeight: 1.75, maxWidth: 260, margin: 0 }}>
                95% of the current collection uses recycled or sustainably sourced materials.
              </p>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'underline', textUnderlineOffset: '4px', padding: 0, marginTop: 4 }}>
                READ OUR STORY
              </button>
            </div>
          </div>
          </Reveal>

        </main>
      </div>
    </div>
  )
}

export default Collection