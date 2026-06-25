import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { FlowButton } from '../components/FlowButton'
import logoSrc from '../assets/logo.png'

const PHONE = '+49 176 25686466'
const EMAIL = 'info@luenebraeu.de'
const WHATSAPP = 'https://wa.me/4917625686466'
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
    name: 'Luna Barrels',
    subtitle: 'Holzfassgereift mit Tiefe',
    image: '/luna-barrels.png',
    imageAlt: 'Lüne Bräu Luna Barrels Flasche',
    specs: ['7,1% vol.', '20 IBU', 'EBC 55'],
    price: '5,50 €',
    priceUnit: '/ 0,33 l',
    tag: 'Special Edition',
    soldOut: true,
  },
  {
    name: 'Hanseat Helles',
    subtitle: 'Mild. Klar. Norddeutsch.',
    image: '/hanseat-photo.png',
    imageAlt: 'Lüne Bräu Hanseat Helles Flasche',
    specs: ['5,6% vol.', '18 IBU', 'EBC 7'],
    price: '4,50 €',
    priceUnit: '/ 0,33 l',
    tag: null,
    soldOut: true,
  },
  {
    name: 'Stint Schorle',
    subtitle: 'Radler mit Zitrone',
    image: '/stint-schorle.webp?v=20260402',
    imageAlt: 'Lüne Bräu Stint Schorle Flasche',
    specs: ['3,9% vol.', '10 IBU', 'EBC 6'],
    price: '3,50 €',
    priceUnit: '/ 0,33 l',
    tag: null,
    soldOut: true,
  },
]

const GASTRO = [
  { src: '/ausschankkultur-charakter.png', alt: 'Inhaber von Lüne Bräu beim Zapfen am Durchlaufkühler', cap: 'Ausschankkultur mit Charakter' },
  { src: '/geselligkeit-food-pairing.png', alt: 'Bier und Food Pairing', cap: 'Geselligkeit & Food Pairing' },
  { src: '/altstadtflair-craft-vibe.png', alt: 'Ambiente in Lüneburg', cap: 'Altstadtflair trifft Craft' },
  { src: '/gemeinsam-anstossen-neu.png', alt: 'Menschen stoßen mit Lüne Bräu an', cap: 'Gemeinsam anstoßen' },
]

const REGIONAL = [
  { label: 'Gastronomie', text: 'Restaurants & Bars in Lüneburg' },
  { label: 'Einzelhandel', text: 'Lokale Läden & Feinkost' },
  { label: 'Events', text: 'Märkte & Stadtfeste' },
  { label: 'Ausschank', text: 'Fassbier auf Anfrage' },
]

const MARQUEE = ['Handwerklich gebraut', 'Lüneburg', 'Seit 2017', 'Kompromisslos regional', 'Kleine Chargen']

function ProductBody({ beer, featured }) {
  return (
    <div className="rx-prod__body">
      {beer.tag && <span className="rx-prod__tag">{beer.tag}</span>}
      <p className="rx-prod__subtitle">{beer.subtitle}</p>
      <h3 className="rx-prod__name">{beer.name}</h3>
      <div className="rx-prod__specs">
        {beer.specs.map((s) => (
          <span className="rx-prod__spec" key={s}>{s}</span>
        ))}
      </div>
      <p className="rx-prod__price">
        {beer.price} <span>{beer.priceUnit}</span>
      </p>
      {beer.soldOut ? (
        <span className="rx-prod__soldout">Aktuell ausverkauft</span>
      ) : (
        <FlowButton as={Link} to="/shop" className={featured ? 'btn-primary' : 'btn-primary btn--small'}>
          In den Warenkorb
        </FlowButton>
      )}
    </div>
  )
}

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const feature = BEERS.find((b) => !b.soldOut) ?? BEERS[0]
  const rest = BEERS.filter((b) => b !== feature)

  return (
    <div className="rx">
      {/* HERO */}
      <header id="hero" className="rx-hero">
        <span className="rx-hero__word" aria-hidden>LÜNEBURG</span>
        <div className="rx-hero__inner">
          <div className="rx-hero__copy">
            <div className="rx-hero__lockup">
              <span className="rx-hero__lockup-dot" aria-hidden />
              <span className="rx-hero__lockup-text">Handgebraut · Lüneburg · seit 2017</span>
            </div>
            <h1 className="rx-hero__title">Bier mit <em>Haltung</em>.</h1>
            <p className="rx-hero__sub">
              Handwerklich gebraut in Lüneburg. Kleine Chargen, ehrliche Rohstoffe, ein Geschmack, der hierher gehört.
            </p>
            <div className="rx-hero__cta">
              <FlowButton
                className="btn-primary"
                onClick={() => document.getElementById('biere')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Unsere Biere
              </FlowButton>
              <FlowButton as="a" href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Kontakt aufnehmen
              </FlowButton>
            </div>
          </div>
          <div className="rx-hero__visual">
            <span className="rx-hero__visual-glow" aria-hidden />
            <figure className="rx-hero__frame">
              <img
                src="/ausschank.webp"
                alt="Frisch gezapftes Lüne Bräu beim Ausschank"
                className="rx-hero__frame-img"
                fetchpriority="high"
              />
            </figure>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="rx-marquee" aria-hidden>
        <div className="rx-marquee__track">
          {[0, 1].map((dup) =>
            MARQUEE.map((word, i) => (
              <span className="rx-marquee__group" key={`${dup}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '2.6rem' }}>
                <span className={`rx-marquee__item ${i % 2 === 1 ? 'rx-marquee__item--ghost' : ''}`}>{word}</span>
                <span className="rx-marquee__dot" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* PRODUCTS */}
      <section id="biere" className="rx-section rx-products">
        <div className="rx-wrap">
          <Reveal className="rx-products__head" soft>
            <div>
              <span className="rx-eyebrow">Produktwelt</span>
              <h2 className="rx-section-title">Drei Sorten,<br />ein <em>Charakter</em>.</h2>
            </div>
            <p className="rx-lead">
              Von der limitierten Fassreifung bis zum modern interpretierten Hellen. Jede Flasche trägt dieselbe Handschrift.
            </p>
          </Reveal>

          <Reveal className="rx-prod-feature" variant="scale" delay={60}>
            <div className="rx-prod-feature__media">
              <img src={feature.image} alt={feature.imageAlt} loading="lazy" decoding="async" />
            </div>
            <ProductBody beer={feature} featured />
          </Reveal>

          <div className="rx-prod-grid">
            {rest.map((beer, i) => (
              <Reveal as="article" className="rx-prod-card" key={beer.name} delay={80 + i * 80}>
                <div className="rx-prod-card__media">
                  <img src={beer.image} alt={beer.imageAlt} loading="lazy" decoding="async" />
                </div>
                <ProductBody beer={beer} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="ueber-mich" className="rx-section rx-story">
        <div className="rx-wrap">
          <div className="rx-story__grid">
            <Reveal className="rx-story__media" variant="left" delay={40}>
              <img src="/finn-traum.png" alt="Braukessel und Handwerk bei Lüne Bräu" className="rx-parallax" loading="lazy" decoding="async" />
            </Reveal>
            <Reveal variant="right" delay={80}>
              <span className="rx-eyebrow">Handwerk & Herkunft</span>
              <h2 className="rx-section-title">Gebraut für <em>Lüneburg</em>.</h2>
              <blockquote className="rx-story__quote">
                "Wir brauen kein Bier für den Massenmarkt. Wir brauen für die Menschen, die wissen, was Qualität bedeutet."
              </blockquote>
              <p>
                Saubere Rezepturen, ehrliche Rohstoffe und ein Geschmack, der in der Region verwurzelt ist. Jede Charge verbindet traditionelles Brauhandwerk mit moderner Craft-Kultur.
              </p>
              <p>
                Vom ersten Sud bis zur Abfüllung bleibt alles in einer Hand: bewusst klein, kompromisslos in der Qualität.
              </p>
              <div className="rx-stats">
                <div className="rx-stat">
                  <span className="rx-stat__num">2017</span>
                  <span className="rx-stat__label">Gegründet</span>
                </div>
                <div className="rx-stat">
                  <span className="rx-stat__num">3</span>
                  <span className="rx-stat__label">Sorten</span>
                </div>
                <div className="rx-stat">
                  <span className="rx-stat__num">100%</span>
                  <span className="rx-stat__label">Original</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GASTRO */}
      <section id="fassbier" className="rx-section rx-gastro">
        <div className="rx-wrap">
          <Reveal soft>
            <span className="rx-eyebrow">Gastronomie</span>
            <h2 className="rx-section-title">Ausschank mit <em>Atmosphäre</em>.</h2>
          </Reveal>
          <div className="rx-bento">
            {GASTRO.map((item, i) => (
              <Reveal as="div" className="rx-bento__cell" key={item.cap} delay={i * 70}>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <span className="rx-bento__cap">{item.cap}</span>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: '2.4rem' }}>
            <FlowButton as="a" href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Fassbier anfragen
            </FlowButton>
          </div>
        </div>
      </section>

      {/* REGIONAL */}
      <section id="haendler" className="rx-section rx-regional">
        <div className="rx-wrap">
          <div className="rx-regional__grid">
            <Reveal variant="left">
              <span className="rx-eyebrow">Regionalität</span>
              <h2 className="rx-section-title">Verwurzelt in der <em>Region</em>.</h2>
              <p className="rx-lead" style={{ margin: '1.4rem 0 2rem' }}>
                Du willst Lüne Bräu ausschenken oder vertreiben? Wir finden gemeinsam das richtige Konzept.
              </p>
              <FlowButton as="a" href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Händler werden
              </FlowButton>
            </Reveal>
            <div className="rx-tiles">
              {REGIONAL.map((item, i) => (
                <Reveal as="div" className="rx-tile" key={item.label} delay={i * 70}>
                  <span className="rx-tile__label">{item.label}</span>
                  <span className="rx-tile__text">{item.text}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CREW */}
      <section id="crew" className="rx-section rx-crew">
        <div className="rx-wrap">
          <Reveal soft>
            <span className="rx-eyebrow">Crew</span>
            <h2 className="rx-section-title">Die Menschen <em>dahinter</em>.</h2>
          </Reveal>
          <div className="rx-crew__grid">
            <Reveal as="article" className="rx-crew__card" delay={40}>
              <img src="/crew-barchefin.png" alt="Bierzapferin, Kalligraphie-Expertin und Biermodel im Team von Lüne Bräu" className="rx-crew__photo" loading="lazy" decoding="async" />
              <div className="rx-crew__body">
                <p className="rx-crew__role">Bierzapferin, Kalligraphie-Expertin & Biermodel</p>
                <p className="rx-crew__meta">Seit 2023 im Team</p>
              </div>
            </Reveal>
            <Reveal as="article" className="rx-crew__card" delay={90}>
              <img src="/crew-barchefin-bike.png" alt="Barchefin und Biermodel mit Lüne Bräu Lastenrad" className="rx-crew__photo" loading="lazy" decoding="async" />
              <div className="rx-crew__body">
                <p className="rx-crew__role">Barchefin & Biermodel</p>
                <p className="rx-crew__meta">Seit 2022 im Team</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section id="sweetie" className="rx-section rx-partner">
        <div className="rx-wrap">
          <div className="rx-partner__grid">
            <Reveal className="rx-partner__media" variant="left" delay={40}>
              <img src="/sweetie-helen.png" alt="Dressurreiterin Helen Kretzschmar mit ihrer Stute Sweet Caramel H" className="rx-parallax" loading="lazy" decoding="async" />
            </Reveal>
            <Reveal variant="right" delay={80}>
              <span className="rx-eyebrow">Partnerschaft</span>
              <h2 className="rx-section-title">Sweetie & Helen.</h2>
              <p>
                Lüne Bräu unterstützt Dressurreiterin Helen Kretzschmar und ihre Stute Sweet Caramel H, liebevoll "Sweetie" genannt.
              </p>
              <p>
                Als offizieller Partner statten wir die beiden mit Equipment aus, das unser Logo auf Turnieren und Veranstaltungen in der Region trägt.
              </p>
              <p style={{ color: 'var(--rx-paper)', fontWeight: 500 }}>
                Leidenschaft, Präzision und Regionalität. Das verbindet uns.
              </p>
              <div style={{ marginTop: '1.6rem' }}>
                <FlowButton as="a" href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Partnerschaft anfragen
                </FlowButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="rx-section rx-gallery">
        <div className="rx-wrap">
          <Reveal className="rx-gallery__head" soft>
            <div>
              <span className="rx-eyebrow">Community</span>
              <h2 className="rx-section-title">Aus der <em>Lüne Bräu</em> Welt.</h2>
            </div>
            <FlowButton as="a" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
              @luene_braeu folgen
            </FlowButton>
          </Reveal>
          <div className="rx-gallery__grid">
            {INSTAGRAM_PREVIEWS.map((image, i) => (
              <Reveal
                as="a"
                key={image.src}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rx-gallery__cell"
                aria-label="Instagram Vorschau öffnen"
                delay={i * 60}
              >
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontakt" className="rx-footer">
        <div className="rx-wrap">
          <div className="rx-footer__top">
            <div>
              <img src={logoSrc} alt="Lüne Bräu" className="rx-footer__logo" />
              <p className="rx-footer__claim">Handwerklich gebraut mit Hingabe für die Region.</p>
              <FlowButton as={Link} to="/shop" className="btn-primary">Jetzt bestellen</FlowButton>
            </div>
            <div>
              <h4>Navigation</h4>
              <a href="#biere">Biere</a>
              <a href="#ueber-mich">Story</a>
              <a href="#fassbier">Ausschank</a>
              <a href="#haendler">Regional</a>
              <a href="#gallery">Community</a>
              <Link to="/shop">Shop</Link>
            </div>
            <div>
              <h4>Kontakt</h4>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@luene_braeu</a>
            </div>
            <div>
              <h4>Business</h4>
              <p className="rx-footer__claim" style={{ marginBottom: '1rem' }}>
                Du willst Lüne Bräu ausschenken oder vertreiben? Wir erstellen dir ein passendes Konzept.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rx-accent2)' }}>
                Händler werden →
              </a>
            </div>
          </div>
          <div className="rx-footer__bottom">
            <span>© {new Date().getFullYear()} Lüne Bräu · Lüneburg</span>
            <div className="rx-footer__legal">
              <Link to="/impressum">Impressum</Link>
              <Link to="/datenschutz">Datenschutz</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
