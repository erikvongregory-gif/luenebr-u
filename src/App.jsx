import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import logoSrc from './assets/logo.png'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CheckoutPage from './pages/CheckoutPage'
import CartDrawer from './components/CartDrawer'
import { CartProvider, useCart } from './context/CartContext'

const PHONE = '+49 176 25686466'

function Nav({ scrolled, mobileNavOpen, setMobileNavOpen, cartOpen, setCartOpen }) {
  const { totalItems } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const scrollTo = (id) => {
    setMobileNavOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <Link to="/" className="nav-logo" onClick={() => setMobileNavOpen(false)}>
        <img src={logoSrc} alt="Lüne Bräu" />
      </Link>
      <button className="nav-burger" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Menü">
        <span /><span /><span />
      </button>
      <div className={`nav-links ${mobileNavOpen ? 'nav-links--open' : ''}`}>
        <a href={isHome ? undefined : '/'} onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Start</a>
        <a href={isHome ? undefined : '/'} onClick={(e) => { e.preventDefault(); scrollTo('biere'); }}>Biere</a>
        <a href={isHome ? undefined : '/'} onClick={(e) => { e.preventDefault(); scrollTo('fassbier'); }}>Schankanlage</a>
        <a href={isHome ? undefined : '/'} onClick={(e) => { e.preventDefault(); scrollTo('haendler'); }}>Händler</a>
        <a href={isHome ? undefined : '/'} onClick={(e) => { e.preventDefault(); scrollTo('ueber-mich'); }}>Über uns</a>
        <a href={isHome ? undefined : '/'} onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}>Gallery</a>
        <Link to="/shop" onClick={() => setMobileNavOpen(false)}>Shop</Link>
        <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="nav-cta">Kontakt</a>
        <button type="button" className="nav-cart-btn" onClick={() => { setMobileNavOpen(false); setCartOpen(true); }} aria-label="Warenkorb">
          <svg className="nav-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          {totalItems > 0 && <span className="nav-cart-badge">{totalItems}</span>}
        </button>
        <Link to="/shop" className="btn-primary btn--small" onClick={() => setMobileNavOpen(false)}>
          Jetzt bestellen
        </Link>
      </div>
    </nav>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [loaderExiting, setLoaderExiting] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [ageVerified, setAgeVerified] = useState(() => 
    typeof window !== 'undefined' && localStorage.getItem('luenebraeu-age') === 'verified'
  )

  useEffect(() => {
    const minLoadTime = 2000
    const start = Date.now()
    const finish = () => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, minLoadTime - elapsed)
      setTimeout(() => {
        setLoaderExiting(true)
        setTimeout(() => setLoading(false), 500)
      }, remaining)
    }
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish)
    return () => window.removeEventListener('load', finish)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const isMobile = window.innerWidth <= 768
      const heroHeight = isMobile ? window.innerHeight : window.innerHeight * 2.2
      setScrolled(window.scrollY > heroHeight - 50)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const verifyAge = () => {
    localStorage.setItem('luenebraeu-age', 'verified')
    setAgeVerified(true)
  }

  if (loading) {
    return (
      <div className={`loader ${loaderExiting ? 'loader--exit' : ''}`}>
        <div className="loader-inner">
          <img src={logoSrc} alt="Lüne Bräu" className="loader-logo" />
        </div>
      </div>
    )
  }

  if (!ageVerified) {
    return (
      <div className="age-gate">
        <div className="age-gate-content">
          <img src={logoSrc} alt="Lüne Bräu" className="age-gate-logo" />
          <h2>Bitte bestätige dein Alter</h2>
          <p>Diese Seite ist nur für Personen ab 18 Jahren.</p>
          <button className="btn-primary" onClick={verifyAge}>Bestätigen</button>
        </div>
      </div>
    )
  }

  return (
    <CartProvider>
      <div className="app">
        <Nav scrolled={scrolled} mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  )
}

export default App
