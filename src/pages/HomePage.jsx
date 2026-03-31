import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import logoSrc from '../assets/logo.png'

const PHONE = '+49 176 25686466'
const EMAIL = 'info@luenebraeu.de'
const INSTAGRAM_URL = 'https://www.instagram.com/luene_braeu/'

const BEERS = [
  {
    name: 'Hanseat Helles',
    subtitle: 'Mild. Klar. Norddeutsch.',
    image: '/hanseat.svg',
    imageAlt: 'Lùnebrùu Hanseat Helles Flasche',
    bitterness: '18 IBU',
    alcohol: '5,6% vol.',
    color: 'EBC 7',
  },
  {
    name: 'Luna Barrels',
    subtitle: 'Holzfassgereift mit Tiefe',
    image: '/luna-barrels.svg',
    imageAlt: 'Lùnebrùu Luna Barrels Flasche',
    bitterness: '20 IBU',
    alcohol: '7,1% vol.',
    color: 'EBC 55',
  },
]

function ProductMeta({ icon, label, value }) {
  return (
    <span className="product-meta-item" aria-label={`${label}: ${value}`}>
      <span className="product-meta-icon" aria-hidden>{icon}</span>
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
            <img src={logoSrc} alt="Lùnebrùu" className="hero-logo" />
            <p className="hero-kicker">Lueneburger Tradition trifft auf Modern Craft</p>
            <h1 className="hero-headline">Lueneburgs fluessiges Erbe. Frisch gebraut. Ehrlich genossen.</h1>
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
                <div className="product-bottle-wrap">
                  <img
                    src={beer.image}
                    alt={beer.imageAlt}
                    className="product-bottle"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="product-bottle-shine" aria-hidden />
                </div>
                <div className="product-card-content">
                  <p className="product-subtitle">{beer.subtitle}</p>
                  <h3 className="product-title">{beer.name}</h3>
                  <div className="product-meta-row">
                    <ProductMeta icon="I" label="Bitterkeit" value={beer.bitterness} />
                    <ProductMeta icon="A" label="Alkohol" value={beer.alcohol} />
                    <ProductMeta icon="F" label="Farbe" value={beer.color} />
                  </div>
                  <Link to="/shop" className="btn-primary">Jetzt entdecken</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="ueber-mich" className="section section--story" soft>
        <div className="container story-shell">
          <div className="story-media">
            <img
              src="/finn-traum.png"
              alt="Braukessel und Handwerk bei Lùnebrùu"
              loading="lazy"
              decoding="async"
            />
          </div>
          <Reveal className="story-card" delay={80}>
            <span className="section-label">02 Handwerk & Herkunft</span>
            <h2 className="section-title">Regional. Praezise. Mit Haltung gebraut.</h2>
            <p>
              Luenebraeu steht fuer saubere Rezepturen, ehrliche Rohstoffe und einen Geschmack, der in Lueneburg verwurzelt ist.
              Jede Charge verbindet traditionelles Brauhandwerk mit dem Anspruch moderner Craft-Kultur.
            </p>
            <p>
              Vom ersten Sud bis zur finalen Abfuellung bleibt alles in einer Hand: bewusst klein, kompromisslos in der Qualitaet
              und gemacht fuer Menschen, die Charakter im Glas suchen.
            </p>
          </Reveal>
        </div>
      </Reveal>

      <Reveal as="section" id="fassbier" className="section section--gastro" soft>
        <div className="container">
          <span className="section-label">03 Gastronomie</span>
          <h2 className="section-title">Lueneburg erleben. Ausschank mit Atmosphaere.</h2>
          <div className="bento-grid">
            <Reveal className="bento-card bento-card--large" delay={30}>
              <img src="/zapfen.svg" alt="Ausschank und gezapftes Bier" loading="lazy" decoding="async" />
              <div className="bento-caption">Ausschankkultur mit Charakter</div>
            </Reveal>
            <Reveal className="bento-card" delay={90}>
              <img src="/hanseat-seitlich.svg" alt="Bier und Food Pairing" loading="lazy" decoding="async" />
              <div className="bento-caption">Geselligkeit und Food Pairing</div>
            </Reveal>
            <Reveal className="bento-card" delay={130}>
              <img src="/hanseat.svg" alt="Ambiente in Lueneburg" loading="lazy" decoding="async" />
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
          <div>
            <span className="section-label">04 Regionalitaet</span>
            <h2 className="section-title">Verwurzelt in der Stadt, praesent in der Region.</h2>
          </div>
          <ul className="regional-list">
            <li>Small-Batch-Braukultur aus Lueneburg</li>
            <li>Partnerschaften mit Handel und Gastronomie vor Ort</li>
            <li>Kurze Wege, frische Ware, persoenlicher Kontakt</li>
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" id="gallery" className="section section--gallery section--dark" soft>
        <div className="container gallery-luxury">
          <span className="section-label section-label--light">05 Community</span>
          <h2 className="section-title">Mehr Impressionen aus der Luenebraeu Welt</h2>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
            @luene_braeu auf Instagram
          </a>
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
            <p>Du willst Luenebraeu ausschenken oder vertreiben? Wir erstellen dir ein passendes Gastronomie- oder Handelskonzept.</p>
          </div>
          <div className="footer-copy">ù {new Date().getFullYear()} Luenebraeu ù Lueneburg</div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
