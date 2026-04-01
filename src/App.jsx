import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import logoSrc from './assets/logo.png'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CheckoutPage from './pages/CheckoutPage'
import CartDrawer from './components/CartDrawer'
import { CartProvider, useCart } from './context/CartContext'

const PHONE = '+49 176 25686466'

const HOME_SECTION_IDS = ['hero', 'ueber-mich', 'biere', 'fassbier', 'haendler', 'gallery']

function Nav({ scrolled, mobileNavOpen, setMobileNavOpen, cartOpen, setCartOpen, activeHomeSection }) {
  const { totalItems } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const shopRouteActive = location.pathname === '/shop' || location.pathname === '/checkout'

  const scrollTo = (id) => {
    setMobileNavOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  const sectionClass = (id) => (isHome && activeHomeSection === id ? 'nav-link--active' : undefined)

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <Link to="/" className="nav-logo" onClick={() => setMobileNavOpen(false)}>
        <img src={logoSrc} alt="Lüne Bräu" />
      </Link>
      <button className="nav-burger" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Menü">
        <span /><span /><span />
      </button>
      <div className={`nav-links ${mobileNavOpen ? 'nav-links--open' : ''}`}>
        <a
          href={isHome ? '#hero' : '/'}
          className={sectionClass('hero')}
          aria-current={isHome && activeHomeSection === 'hero' ? 'true' : undefined}
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
        >
          Start
        </a>
        <a
          href={isHome ? '#ueber-mich' : '/'}
          className={sectionClass('ueber-mich')}
          aria-current={isHome && activeHomeSection === 'ueber-mich' ? 'true' : undefined}
          onClick={(e) => { e.preventDefault(); scrollTo('ueber-mich'); }}
        >
          Story
        </a>
        <a
          href={isHome ? '#biere' : '/'}
          className={sectionClass('biere')}
          aria-current={isHome && activeHomeSection === 'biere' ? 'true' : undefined}
          onClick={(e) => { e.preventDefault(); scrollTo('biere'); }}
        >
          Biere
        </a>
        <a
          href={isHome ? '#fassbier' : '/'}
          className={sectionClass('fassbier')}
          aria-current={isHome && activeHomeSection === 'fassbier' ? 'true' : undefined}
          onClick={(e) => { e.preventDefault(); scrollTo('fassbier'); }}
        >
          Ausschank
        </a>
        <a
          href={isHome ? '#haendler' : '/'}
          className={sectionClass('haendler')}
          aria-current={isHome && activeHomeSection === 'haendler' ? 'true' : undefined}
          onClick={(e) => { e.preventDefault(); scrollTo('haendler'); }}
        >
          Regional
        </a>
        <a
          href={isHome ? '#gallery' : '/'}
          className={sectionClass('gallery')}
          aria-current={isHome && activeHomeSection === 'gallery' ? 'true' : undefined}
          onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}
        >
          Community
        </a>
        <Link
          to="/shop"
          className={shopRouteActive ? 'nav-link--active' : undefined}
          aria-current={shopRouteActive ? 'page' : undefined}
          onClick={() => setMobileNavOpen(false)}
        >
          Shop
        </Link>
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
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [loaderExiting, setLoaderExiting] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHomeSection, setActiveHomeSection] = useState('hero')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [ageVerified, setAgeVerified] = useState(() => 
    typeof window !== 'undefined' && localStorage.getItem('luenebraeu-age') === 'verified-16'
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
    const updateNavBackground = () => {
      if (location.pathname !== '/') {
        setScrolled(true)
        return
      }
      const hero = document.getElementById('hero')
      if (!hero) {
        setScrolled(window.scrollY > 40)
        return
      }
      const { bottom } = hero.getBoundingClientRect()
      setScrolled(bottom <= 1)
    }

    window.addEventListener('scroll', updateNavBackground, { passive: true })
    window.addEventListener('resize', updateNavBackground)
    updateNavBackground()
    return () => {
      window.removeEventListener('scroll', updateNavBackground)
      window.removeEventListener('resize', updateNavBackground)
    }
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const updateActiveSection = () => {
      const navEl = document.querySelector('.nav')
      const navH = navEl?.offsetHeight ?? 72
      const line = window.scrollY + navH + window.innerHeight * 0.28
      let active = HOME_SECTION_IDS[0]
      for (const id of HOME_SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= line) active = id
      }
      setActiveHomeSection((prev) => (prev === active ? prev : active))
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [location.pathname])

  const verifyAge = () => {
    localStorage.setItem('luenebraeu-age', 'verified-16')
    setAgeVerified(true)
  }

  const rejectAge = () => {
    window.location.href = 'https://www.google.com'
  }

  if (loading) {
    return (
      <div className={`loader ${loaderExiting ? 'loader--exit' : ''}`}>
        <div className="loader-inner">
          <img src={logoSrc} alt="Lüne Bräu" className="loader-logo" />
          <div className="loader-progress" aria-hidden="true">
            <span className="loader-progress-bar" />
          </div>
        </div>
      </div>
    )
  }

  if (!ageVerified) {
    return (
      <div className="age-gate">
        <div className="age-gate-content">
          <img src={logoSrc} alt="Lüne Bräu" className="age-gate-logo" />
          <h2>Altersprüfung</h2>
          <p className="age-gate-lead">Der Verkauf von Bier erfolgt nur an Personen ab 16 Jahren.</p>
          <p className="age-gate-note">
            Mit dem Betreten bestätigst du, dass du mindestens 16 Jahre alt bist.
          </p>
          <div className="age-gate-actions">
            <button className="btn-primary" onClick={verifyAge}>Ich bin mindestens 16</button>
            <button className="btn-outline age-gate-decline" onClick={rejectAge}>Ich bin unter 16</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <CartProvider>
      <div className="app">
        <Nav
          scrolled={scrolled}
          mobileNavOpen={mobileNavOpen}
          setMobileNavOpen={setMobileNavOpen}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          activeHomeSection={activeHomeSection}
        />
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
