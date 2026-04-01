import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import logoSrc from '../assets/logo.png'

const PHONE = '+49 176 25686466'
const EMAIL = 'info@luenebraeu.de'
const INSTAGRAM_URL = 'https://www.instagram.com/luene_braeu/'
const INSTAGRAM_PREVIEWS = [
  { src: '/insta-preview-1.png', alt: 'Lüne Bräu Teamjacke mit Logo' },
  { src: '/insta-preview-2.png', alt: 'Lüne Bräu Flaschen im Eiskübel' },
  { src: '/insta-preview-3.png', alt: 'Gerstenähren als Rohstoff für das Bier' },
  { src: '/insta-preview-4.png', alt: 'Lüne Bräu Genussmoment im Glas' },
  { src: '/insta-preview-5.png', alt: 'Anstoßen mit Lüne Bräu Flaschen' },
]

const BEERS = [
  {
    name: 'Hanseat Helles',
    subtitle: 'Mild. Klar. Norddeutsch.',
    image: '/hanseat-photo.png',
    imageClass: 'product-bottle--hanseat',
    imageAlt: 'Lüne Bräu Hanseat Helles Flasche',
    bitterness: '18 IBU',
    alcohol: '5,6% vol.',
    color: 'EBC 7',
    price: '4,50 €',
    priceUnit: '/ 0,33 l Flasche',
    badge: null,
    soldOut: true,
  },
  {
    name: 'Luna Barrels',
    subtitle: 'Holzfassgereift mit Tiefe',
    image: '/luna-barrels.png',
    imageClass: 'product-bottle--luna',
    imageAlt: 'Lüne Bräu Luna Barrels Flasche',
    bitterness: '20 IBU',
    alcohol: '7,1% vol.',
    color: 'EBC 55',
    price: '5,50 €',
    priceUnit: '/ 0,33 l Flasche',
    badge: 'Special Edition',
    soldOut: false,
  },
]

const ICONS = {
  bitterness: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 2.2c2.8 1.6 4.3 4 4.3 6.4 0 2.9-1.9 5.2-4.3 5.2S3.7 11.5 3.7 8.6c0-2.4 1.5-4.8 4.3-6.4z" />
      <path d="M6 6.1h4M5.6 8.2h4.8M6 10.3h4" />
    </svg>
  ),
  alcohol: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 2 C8 2 4 7 4 10 a4 4 0 0 0 8 0 C12 7 8 2 8 2z" />
    </svg>
  ),
  color: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.4" y="3" width="11.2" height="10" rx="1.7" />
      <rect x="4.1" y="4.8" width="2.1" height="6.4" fill="currentColor" fillOpacity="0.2" stroke="none" />
      <rect x="6.95" y="4.8" width="2.1" height="6.4" fill="currentColor" fillOpacity="0.45" stroke="none" />
      <rect x="9.8" y="4.8" width="2.1" height="6.4" fill="currentColor" fillOpacity="0.8" stroke="none" />
    </svg>
  ),
}

const CART_ICON = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 2h1.5L6 9h7l1.5-5H5.5M6 12.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0M11 12.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
  </svg>
)

function ProductMeta({ type, label, value }) {
  return (
    <span className="product-meta-item" aria-label={`${label}: ${value}`}>
      <span className="product-meta-icon" aria-hidden>{ICONS[type]}</span>
      <span className="product-meta-value">{value}</span>
    </span>
  )
}

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <header id="hero" className="hero hero--video hero--luxury">
        <div className="hero-video-wrap">
          <video className="hero-video" autoPlay loop muted playsInline preload="metadata" aria-hidden>
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay hero-video-overlay--luxury" aria-hidden />

          <div className="hero-content hero-content--luxury">
            <img src={logoSrc} alt="Lüne Bräu" className="hero-logo" />
            <div className="hero-cta-row">
              <button
                type="button"
                className="btn-primary btn-primary--gold"
                onClick={() => document.getElementById('biere')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Unsere Biere
              </button>
              <a href="#kontakt" className="btn-outline">Kontakt aufnehmen</a>
            </div>
          </div>
        </div>
      </header>

      <Reveal as="section" id="biere" className="section section--biere section--luxury" soft>
        <div className="container">
          <span className="section-label">01 Produktwelt</span>
          <h2 className="section-title">Unsere Biere als Signature Bottles</h2>
          <p className="section-lead section-lead--light">
            Charakterstarke Sorten mit klarer Handschrift - von modern interpretiertem Hellem bis zur limitierten Fassreifung.
          </p>

          <div className="product-showcase-grid" role="list">
            {BEERS.map((beer, index) => (
              <Reveal as="article" className="product-card" key={beer.name} delay={index * 90} role="listitem">
                {beer.badge && (
                  <span className="product-card-badge">{beer.badge}</span>
                )}
                <div className="product-bottle-wrap">
                  <img
                    src={beer.image}
                    alt={beer.imageAlt}
                    className={`product-bottle ${beer.imageClass ?? ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="product-bottle-shine" aria-hidden />
                </div>
                <div className="product-card-content">
                  <p className="product-subtitle">{beer.subtitle}</p>
                  <h3 className="product-title">{beer.name}</h3>
                  <div className="product-meta-row">
                    <ProductMeta type="bitterness" label="Bitterkeit" value={beer.bitterness} />
                    <ProductMeta type="alcohol" label="Alkohol" value={beer.alcohol} />
                    <ProductMeta type="color" label="Farbe" value={beer.color} />
                  </div>
                  {beer.price && (
                    <p className="product-price">
                      {beer.price} <span className="product-price-unit">{beer.priceUnit}</span>
                    </p>
                  )}
                  {beer.soldOut ? (
                    <div>
                      <span className="product-card-soldout">
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                          <circle cx="7" cy="7" r="5.5" />
                          <path d="M7 4v3.5M7 9.5v.5" />
                        </svg>
                        Aktuell ausverkauft
                      </span>
                      <span className="product-card-soldout-note">
                        Bald wieder verfügbar — meld dich gerne
                      </span>
                    </div>
                  ) : (
                    <Link to="/shop" className="btn-primary product-card-cta">
                      {CART_ICON} In den Warenkorb
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="ueber-mich" className="section section--story" soft>
        <div className="container story-shell">
          <div className="story-media">
            <Reveal className="reveal-media" delay={40}>
              <img
                src="/finn-traum.png"
                alt="Braukessel und Handwerk bei Lüne Bräu"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          </div>

          <Reveal className="story-card" delay={80}>
            <span className="section-label">02 Handwerk & Herkunft</span>
            <span className="story-badge">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                <circle cx="6" cy="6" r="4.5" />
                <path d="M6 3.5v2.5l1.5 1" />
              </svg>
              Seit 2017
            </span>
            <h2 className="section-title">Regional. Präzise.<br />Mit Haltung gebraut.</h2>

            <blockquote className="story-quote">
              <p>
                Wir brauen kein Bier für den Massenmarkt. Wir brauen für die Menschen
                in Lüneburg - und für alle, die wissen, was Qualität bedeutet.
              </p>
              <cite>- Lüne Bräu Crew</cite>
            </blockquote>

            <p>
              Lüne Bräu steht für saubere Rezepturen, ehrliche Rohstoffe und einen
              Geschmack, der in Lüneburg verwurzelt ist. Jede Charge verbindet
              traditionelles Brauhandwerk mit dem Anspruch moderner Craft-Kultur.
            </p>
            <p>
              Vom ersten Sud bis zur finalen Abfüllung bleibt alles in einer Hand:
              bewusst klein, kompromisslos in der Qualität.
            </p>

            <div className="story-stats">
              <div className="story-stat">
                <span className="story-stat-value">2017</span>
                <span className="story-stat-label">Gegründet</span>
              </div>
              <div className="story-stat">
                <span className="story-stat-value">2</span>
                <span className="story-stat-label">Sorten</span>
              </div>
              <div className="story-stat">
                <span className="story-stat-value">100%</span>
                <span className="story-stat-label">Original</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary story-cta"
              onClick={() => document.getElementById('biere')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 7h10M7 2l5 5-5 5" />
              </svg>
              Unsere Biere entdecken
            </button>
          </Reveal>
        </div>
      </Reveal>

      <Reveal as="section" id="fassbier" className="section section--gastro" soft>
        <div className="container">
          <span className="section-label">03 Gastronomie</span>
          <h2 className="section-title">Lüneburg erleben. Ausschank mit Atmosphäre.</h2>
          <div className="bento-grid">
            <Reveal className="bento-card bento-card--large" delay={30}>
              <img src="/ausschankkultur-charakter.png" alt="Inhaber von Lüne Bräu beim Zapfen am Durchlaufkühler" loading="lazy" decoding="async" />
              <div className="bento-caption">Ausschankkultur mit Charakter</div>
            </Reveal>
            <Reveal className="bento-card" delay={90}>
              <img src="/geselligkeit-food-pairing.png" alt="Bier und Food Pairing" loading="lazy" decoding="async" />
              <div className="bento-caption">Geselligkeit und Food Pairing</div>
            </Reveal>
            <Reveal className="bento-card" delay={130}>
              <img src="/altstadtflair-craft-vibe.png" alt="Ambiente in Lüneburg" loading="lazy" decoding="async" />
              <div className="bento-caption">Altstadtflair trifft Craft-Vibe</div>
            </Reveal>
          </div>
          <a href={`https://wa.me/4917625686466`} target="_blank" rel="noopener noreferrer" className="btn-primary btn-gastro">
            Fassbier anfragen
          </a>
        </div>
      </Reveal>

      <Reveal as="section" id="haendler" className="section section--regional" soft>
        <div className="container">
          <div className="regional-grid">
            <Reveal className="regional-intro" delay={30}>
              <span className="section-label">04 Regionalität</span>
              <h2 className="section-title">Verwurzelt in der Stadt, präsent in der Region.</h2>
              <p className="regional-lead">
                Du willst Lüne Bräu ausschenken oder vertreiben? Wir finden gemeinsam das richtige Konzept.
              </p>
              <a
                href={`https://wa.me/4917625686466`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary regional-cta"
              >
                Händler werden
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 7h10M7 2l5 5-5 5" />
                </svg>
              </a>
            </Reveal>

            <div className="regional-network">
              {[
                { label: 'Gastronomie', text: 'Restaurants & Bars in Lüneburg' },
                { label: 'Einzelhandel', text: 'Lokale Läden & Feinkost' },
                { label: 'Events', text: 'Märkte & Stadtfeste' },
                { label: 'Ausschank', text: 'Fassbier auf Anfrage' },
              ].map((item, index) => (
                <Reveal as="div" className="regional-tile" key={item.label} delay={70 + index * 70}>
                  <span className="regional-tile-label">{item.label}</span>
                  <span className="regional-tile-text">{item.text}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="crew" className="section section--crew" soft>
        <div className="container">
          <span className="section-label">05 Crew</span>
          <h2 className="section-title">Die Menschen hinter Lüne Bräu</h2>
          <div className="crew-grid">
            <Reveal className="crew-card" delay={40}>
              <img
                src="/crew-barchefin.png"
                alt="Bierzapferin, Kalligraphie-Expertin und Biermodel im Team von Lüne Bräu"
                className="crew-photo"
                loading="lazy"
                decoding="async"
              />
              <h4>Bierzapferin, Kalligraphie-Expertin & Biermodel</h4>
              <p>Seit 2023 im Team</p>
            </Reveal>
            <Reveal className="crew-card" delay={90}>
              <img
                src="/crew-barchefin-bike.png"
                alt="Barchefin und Biermodel mit Lüne Bräu Lastenrad"
                className="crew-photo"
                loading="lazy"
                decoding="async"
              />
              <h4>Barchefin & Biermodel</h4>
              <p>Seit 2022 im Team</p>
            </Reveal>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="sweetie" className="section section--sweetie" soft>
        <div className="container">
          <div className="sweetie-feature">
            <Reveal className="reveal-media" delay={40}>
              <img
                src="/sweetie-helen.png"
                alt="Dressurreiterin Helen Kretzschmar mit ihrer Stute Sweet Caramel H"
                className="sweetie-photo"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
            <div className="sweetie-content">
              <span className="section-label">06 Partnerschaft</span>
              <h2 className="section-title">Sweetie & Helen —<br />Powered by Lüne Bräu</h2>
              <p className="sweetie-intro">
                Lüne Bräu unterstützt Dressurreiterin Helen Kretzschmar und ihre Stute
                Sweet Caramel H — liebevoll "Sweetie" genannt.
              </p>
              <p>
                Als offizieller Partner statten wir die beiden mit Equipment aus, das
                unser Logo auf Turnieren und Veranstaltungen in der Region trägt.
              </p>
              <p className="sweetie-tagline">Für uns ist klar: Leidenschaft, Präzision und Regionalität - das verbindet uns.</p>
              <a
                href={`https://wa.me/4917625686466`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline sweetie-cta"
              >
                Partnerschaft anfragen
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="gallery" className="section section--gallery section--dark" soft>
        <div className="container gallery-luxury">
          <span className="section-label section-label--light">07 Community</span>
          <h2 className="section-title">Mehr Impressionen aus der Lüne Bräu Welt</h2>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
            @luene_braeu auf Instagram
          </a>
          <div className="instagram-preview-grid" role="list">
            {INSTAGRAM_PREVIEWS.map((image, index) => (
              <Reveal
                as="a"
                key={image.src}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`instagram-preview-card ${index === 0 ? 'instagram-preview-card--wide' : ''}`}
                role="listitem"
                aria-label="Instagram Vorschau öffnen"
                delay={index * 70}
              >
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <footer id="kontakt" className="footer footer--luxury">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <img src={logoSrc} alt="Lüne Bräu" className="footer-logo" />
              <p className="footer-brand-claim">Handwerklich gebraut<br />mit Hingabe für die Region.</p>
              <a
                href={`https://wa.me/4917625686466`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary footer-cta"
              >
                Jetzt bestellen
              </a>
            </div>

            <div className="footer-nav">
              <h4>Navigation</h4>
              <a href="#biere">Unsere Biere</a>
              <a href="#ueber-mich">Story</a>
              <a href="#fassbier">Ausschank</a>
              <a href="#haendler">Regionalität</a>
              <a href="#gallery">Community</a>
              <Link to="/shop">Shop</Link>
            </div>

            <div className="footer-contact-col">
              <h4>Kontakt</h4>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a
                href="https://www.instagram.com/luene_braeu/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                @luene_braeu
              </a>
            </div>

            <div className="footer-business-col">
              <h4>Business</h4>
              <p>Du willst Lüne Bräu ausschenken oder vertreiben? Wir erstellen dir ein passendes Konzept.</p>
              <a
                href={`https://wa.me/4917625686466`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-business-link"
              >
                Händler werden →
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Lüne Bräu · Lüneburg</span>
            <div className="footer-legal">
              <Link to="/impressum">Impressum</Link>
              <Link to="/datenschutz">Datenschutz</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
