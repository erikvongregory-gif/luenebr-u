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
    name: 'Hanseat',
    subtitle: 'Mild. Klar. Norddeutsch.',
    image: '/hanseat-photo.png',
    imageClass: 'product-bottle--hanseat',
    imageAlt: 'Lüne Bräu Hanseat Flasche',
    bitterness: '18 IBU',
    alcohol: '5,6% vol.',
    color: 'EBC 7',
    price: '2,48 €',
    priceUnit: '/ 0,33 l Flasche',
    badge: 'Sold Out',
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
    price: '4,50 €',
    priceUnit: '/ 0,33 l Flasche',
    badge: 'Special Edition',
    soldOut: false,
  },
]

const ICONS = {
  bitterness: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <ellipse cx="8" cy="9" rx="3" ry="4.5" />
      <path d="M8 4.5C8 3 9 2 10 1.5M8 4.5C8 3 7 2 6 1.5" />
    </svg>
  ),
  alcohol: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 2 C8 2 4 7 4 10 a4 4 0 0 0 8 0 C12 7 8 2 8 2z" />
    </svg>
  ),
  color: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 4v4l2.5 2" />
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
                    <button type="button" className="btn-primary product-card-cta" disabled aria-disabled="true">
                      Sold Out
                    </button>
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
                <span className="story-stat-label">Regional</span>
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
        <div className="container regional-grid">
          <Reveal delay={30}>
            <span className="section-label">04 Regionalität</span>
            <h2 className="section-title">Verwurzelt in der Stadt, präsent in der Region.</h2>
          </Reveal>
          <ul className="regional-list">
            <Reveal as="li" delay={60}>Small-Batch-Braukultur aus Lüneburg</Reveal>
            <Reveal as="li" delay={100}>Partnerschaften mit Handel und Gastronomie vor Ort</Reveal>
            <Reveal as="li" delay={140}>Kurze Wege, frische Ware, persönlicher Kontakt</Reveal>
          </ul>
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
          <span className="section-label">06 Partnerschaft</span>
          <h2 className="section-title">Sweetie & Helen - Powered by Lüne Bräu</h2>
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
              <p className="sweetie-intro">Unsere Unterstützung für Dressurreiterin Helen Kretzschmar</p>
              <p>
                Bei Lüne Bräu sind wir stolz darauf, nicht nur gutes Bier zu brauen, sondern auch Menschen aus unserer Region
                zu unterstützen, die mit Leidenschaft und Können ihren Weg gehen. Eine davon ist Helen Kretzschmar - eine
                talentierte Dressurreiterin, die mit Herzblut und Präzision im Sattel sitzt.
              </p>
              <p>
                An ihrer Seite: die elegante Stute Sweet Caramel H, liebevoll "Sweetie" genannt. Gemeinsam beeindrucken die
                beiden nicht nur durch sportliche Leistung, sondern auch durch Harmonie und Ausstrahlung im Viereck.
              </p>
              <p>
                Seit dieser Saison sind wir offizieller Partner von Helen und "Sweetie". Wir statten die beiden mit
                hochwertigem Equipment aus, das unser Lüne Bräu Logo trägt. So repräsentieren sie unsere Brauerei und unsere
                Heimatstadt Lüneburg auf Turnieren und Veranstaltungen in der Region - und hoffentlich bald auch darüber hinaus.
              </p>
              <p>
                Wir freuen uns, Helen und Sweetie auf ihrem sportlichen Weg zu begleiten und sind gespannt auf viele erfolgreiche
                Runden im Dressurviereck.
              </p>
              <p className="sweetie-tagline">Für uns ist klar: Leidenschaft, Präzision und Regionalität - das verbindet uns.</p>
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
        <div className="container footer-grid">
          <div className="footer-contact">
            <h4>Kontakt</h4>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div className="footer-business">
            <h4>Business</h4>
            <p>Du willst Lüne Bräu ausschenken oder vertreiben? Wir erstellen dir ein passendes Gastronomie- oder Handelskonzept.</p>
          </div>
          <div className="footer-links">
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} Lüne Bräu · Lüneburg</div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
