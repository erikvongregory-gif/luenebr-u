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
    image: '/hanseat.svg',
    imageClass: 'product-bottle--hanseat',
    imageAlt: 'Lüne Bräu Hanseat Helles Flasche',
    bitterness: '18 IBU',
    alcohol: '5,6% vol.',
    color: 'EBC 7',
  },
  {
    name: 'Luna Barrels',
    subtitle: 'Holzfassgereift mit Tiefe',
    image: '/luna-barrels.svg',
    imageClass: 'product-bottle--luna',
    imageAlt: 'Lüne Bräu Luna Barrels Flasche',
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
              alt="Braukessel und Handwerk bei Lüne Bräu"
              loading="lazy"
              decoding="async"
            />
            <figure className="story-founder-card">
              <img
                src="/ausschank.png"
                alt="Gründer von Lüne Bräu beim Zapfen"
                className="story-founder-image"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
          <Reveal className="story-card" delay={80}>
            <span className="section-label">02 Handwerk & Herkunft</span>
            <h2 className="section-title">Regional. Präzise. Mit Haltung gebraut.</h2>
            <p>
              Lüne Bräu steht für saubere Rezepturen, ehrliche Rohstoffe und einen Geschmack, der in Lüneburg verwurzelt ist.
              Jede Charge verbindet traditionelles Brauhandwerk mit dem Anspruch moderner Craft-Kultur.
            </p>
            <p>
              Vom ersten Sud bis zur finalen Abfüllung bleibt alles in einer Hand: bewusst klein, kompromisslos in der Qualität
              und gemacht für Menschen, die Charakter im Glas suchen.
            </p>
          </Reveal>
        </div>
      </Reveal>

      <Reveal as="section" id="fassbier" className="section section--gastro" soft>
        <div className="container">
          <span className="section-label">03 Gastronomie</span>
          <h2 className="section-title">Lüneburg erleben. Ausschank mit Atmosphäre.</h2>
          <div className="bento-grid">
            <Reveal className="bento-card bento-card--large" delay={30}>
              <img src="/zapfen.svg" alt="Inhaber von Lüne Bräu beim Zapfen am Durchlaufkühler" loading="lazy" decoding="async" />
              <div className="bento-caption">Ausschankkultur mit Charakter</div>
            </Reveal>
            <Reveal className="bento-card" delay={90}>
              <img src="/hanseat-seitlich.svg" alt="Bier und Food Pairing" loading="lazy" decoding="async" />
              <div className="bento-caption">Geselligkeit und Food Pairing</div>
            </Reveal>
            <Reveal className="bento-card" delay={130}>
              <img src="/hanseat.svg" alt="Ambiente in Lüneburg" loading="lazy" decoding="async" />
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
            <span className="section-label">04 Regionalität</span>
            <h2 className="section-title">Verwurzelt in der Stadt, präsent in der Region.</h2>
          </div>
          <ul className="regional-list">
            <li>Small-Batch-Braukultur aus Lüneburg</li>
            <li>Partnerschaften mit Handel und Gastronomie vor Ort</li>
            <li>Kurze Wege, frische Ware, persönlicher Kontakt</li>
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
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="sweetie" className="section section--sweetie" soft>
        <div className="container">
          <span className="section-label">06 Partnerschaft</span>
          <h2 className="section-title">Sweetie & Helen - Powered by Lüne Bräu</h2>
          <div className="sweetie-feature">
            <img
              src="/sweetie-helen.png"
              alt="Dressurreiterin Helen Kretzschmar mit ihrer Stute Sweet Caramel H"
              className="sweetie-photo"
              loading="lazy"
              decoding="async"
            />
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
              <a
                key={image.src}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`instagram-preview-card ${index === 0 ? 'instagram-preview-card--wide' : ''}`}
                role="listitem"
                aria-label="Instagram Vorschau öffnen"
              >
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </a>
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
          <div className="footer-copy">© {new Date().getFullYear()} Lüne Bräu · Lüneburg</div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
