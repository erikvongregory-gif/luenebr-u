import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoSrc from '../assets/logo.png'
const INSTAGRAM_URL = 'https://www.instagram.com/luene_braeu/'

const HANSEAT_SLIDES = [
  { src: '/hanseat-seitlich.svg', alt: 'Das Hanseat – Seitenansicht' },
  { src: '/hanseat.svg', alt: 'Das Hanseat' },
]
const PHONE = '+49 176 25686466'
const EMAIL = 'info@luenebraeu.de'

const HERO_FRAME_COUNT = 91

function HomePage({ scrollTo, scrolled, mobileNavOpen, setMobileNavOpen }) {
  const [hanseatSlide, setHanseatSlide] = useState(0)
  const [heroFrame, setHeroFrame] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    for (let i = 1; i <= HERO_FRAME_COUNT; i++) {
      const img = new Image()
      img.src = `/hero-frames/frame-${String(i).padStart(4, '0')}.jpg`
    }
  }, [])

  const heroFrameRef = useRef(0)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    if (isMobile) {
      const duration = 6000
      const interval = duration / HERO_FRAME_COUNT
      const id = setInterval(() => {
        setHeroFrame((f) => (f + 1) % HERO_FRAME_COUNT)
      }, interval)
      return () => clearInterval(id)
    }

    const hero = heroRef.current
    if (!hero) return

    let rafId = null

    const updateFrame = () => {
      const rect = hero.getBoundingClientRect()
      const scrollRange = hero.offsetHeight - window.innerHeight
      if (scrollRange <= 0) {
        rafId = null
        return
      }
      const scrolledPast = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolledPast / scrollRange)
      const frame = Math.min(
        HERO_FRAME_COUNT - 1,
        Math.floor(progress * HERO_FRAME_COUNT)
      )
      if (frame !== heroFrameRef.current) {
        heroFrameRef.current = frame
        setHeroFrame(frame)
      }
      rafId = null
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(updateFrame)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateFrame()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const nextSlide = () => setHanseatSlide((i) => (i + 1) % HANSEAT_SLIDES.length)
  const prevSlide = () => setHanseatSlide((i) => (i - 1 + HANSEAT_SLIDES.length) % HANSEAT_SLIDES.length)

  return (
    <>
      <header id="hero" ref={heroRef} className="hero hero--video">
        <div className="hero-video-wrap">
          <img
            className="hero-video hero-video--frames"
            src={`/hero-frames/frame-${String(heroFrame + 1).padStart(4, '0')}.jpg`}
            alt=""
            aria-hidden
          />
          <div className="hero-video-overlay" aria-hidden />
          <div className="hero-content">
            <img src={logoSrc} alt="Lüne Bräu" className="hero-logo" />
            <p className="tagline">Handwerklich gebraut mit Hingabe für die Region</p>
            <p className="hero-subline">Handcrafted since 2017</p>
            <div className="divider" />
            <Link to="/shop" className="btn-primary">
              Jetzt bestellen
            </Link>
          </div>
          <button
            type="button"
            className="hero-scroll"
            onClick={() => document.getElementById('biere')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Weiter scrollen"
          >
            <span className="hero-scroll-text">Scroll</span>
            <span className="hero-scroll-line" />
          </button>
        </div>
      </header>

      <section id="biere" className="section section--biere">
        <div className="container">
          <span className="section-label">01</span>
          <h2 className="section-title">Unsere Biere</h2>
          
          <article className="beer-card beer-card--hanseat">
            <div className="beer-card-image-wrap beer-card-slideshow">
              <button type="button" className="slideshow-btn slideshow-btn--prev" onClick={prevSlide} aria-label="Vorheriges Bild" />
              <div className="slideshow-inner">
                {HANSEAT_SLIDES.map((slide, i) => (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className={`beer-card-image ${i === hanseatSlide ? 'is-active' : ''}`}
                  />
                ))}
              </div>
              <button type="button" className="slideshow-btn slideshow-btn--next" onClick={nextSlide} aria-label="Nächstes Bild" />
              <div className="slideshow-dots">
                {HANSEAT_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`slideshow-dot ${i === hanseatSlide ? 'is-active' : ''}`}
                    onClick={() => setHanseatSlide(i)}
                    aria-label={`Bild ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="beer-card-content">
              <span className="beer-label">Unser erstes Bier</span>
              <h3 className="beer-title">Das Hanseat</h3>
              <p className="beer-lead">
                Ein Kreativbier auf Basis eines Handelsbieres des 16. Jahrhunderts – damals durch die Hanse weltweit verschifft.
              </p>
              <p className="beer-desc">
                Süffig, leicht und zart gebittert – mit neuem Schliff – zieht diese moderne Version heute wieder in die Hansestadt ein.
              </p>
              <div className="beer-specs">
                <span>EBC 7</span>
                <span>IBU 18</span>
                <span>5,6% vol.</span>
              </div>
              <p className="beer-availability">
                Erhältlich in vielen Lüneburger Läden und ausgewählten Restaurants vom Fass.
              </p>
              <Link to="/shop" className="btn-primary">
                Jetzt bestellen
              </Link>
            </div>
          </article>

          <article className="beer-card beer-card--luna">
            <div className="beer-card-content">
              <span className="beer-label">Die limitierten Schätze aus dem Holzfass</span>
              <h3 className="beer-title">Luna Barrels</h3>
              <p>
                Lassen Sie sich von unserem <strong>Luna Barrels Calvados Cask</strong> in eine einzigartige Welt holzfassgereifter Biere entführen. Tief bernsteinfarben vereinen sich feine Noten von Karamell und frischem Schwarzbrot mit Anklängen von Apfelblüte und gelbem Apfel.
              </p>
              <p>
                Am Gaumen: cremig, buttrige Texturen, malzige Tiefe, Bitterschokolade und eine elegante, fruchtige Säure – mit feinen Bittertönen im Abgang.
              </p>
              <p className="beer-limit">Jedes Jahr aus einem anderen Holzfass · <strong>Auf 550 Flaschen limitiert!</strong></p>
              <div className="beer-specs">
                <span>EBC 55</span>
                <span>IBU 20</span>
                <span>7,1% vol.</span>
              </div>
              <Link to="/shop" className="btn-primary">
                Jetzt bestellen
              </Link>
            </div>
            <div className="beer-card-image-wrap">
              <img src="/luna-barrels.svg" alt="Luna Barrels" className="beer-card-image" />
            </div>
          </article>
        </div>
      </section>

      <section id="fassbier" className="section section--tap">
        <div className="container">
          <span className="section-label">02</span>
          <h2 className="section-title">Schankanlage mieten</h2>
          <div className="tap-card">
            <div className="tap-image">
              <img src="/zapfen.svg" alt="" aria-hidden="true" />
            </div>
            <div className="tap-content">
              <h3>Schankanlage für Fassbier mieten?</h3>
              <p>
                Du möchtest Lüne Bräu Fassbier auf deiner nächsten Party ausschenken? Wir vermieten dir gerne eine Zapfanlage zum Bier dazu. Kontaktiere uns per WhatsApp, Mail oder telefonisch.
              </p>
              <a href={`https://wa.me/4917625686466`} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="haendler" className="section section--haendler">
        <div className="container">
          <span className="section-label">03</span>
          <h2 className="section-title">Unsere Händler</h2>
          <div className="haendler-grid">
            <div className="haendler-group">
              <h4>EDEKA, REWE & Co.</h4>
              <ul>
                {['Edeka Bergmann Adendorf', 'Edeka Bergmann Saline', 'Edeka Bergmann Löwecenter', 'Sandpassage Tschorn', 'Tschorn Bockelsberg', 'Rewe Krause Hanseviertel', 'Edeka Düver Salzhausen', 'Rewe Ferdis Markt Bleckede', 'FAMILA Lüneburg', 'FAMILA Winsen', 'Edeka Kröger Stelle (Ashausen)', 'EDEKA Altenburg Dannenberg', 'Edeka Klein Thorner Straße'].map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="haendler-group">
              <h4>Einzelhandel</h4>
              <ul>
                {['Wabnitz Weinhandlung', 'Weynstock Wein und Spirits Hamburg', 'Erich Rothe GmbH'].map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="haendler-group">
              <h4>Gastronomie</h4>
              <ul>
                {['VISCVLE', 'Calluna Eis', 'ZweiLieben', 'STIMBEKHOF Oberhaverbeck', 'STRANDGUT Stover Strand'].map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="ueber-mich" className="section section--traum">
        <div className="container">
          <span className="section-label">04</span>
          <h2 className="section-title">Der Traum</h2>
          <div className="traum-content">
            <p>
              Als ich 2017 mit dem Hobbybrauen angefangen habe, hätte ich mir nie erträumt, dass mein eigenes Bier eines Tages zu kaufen sein wird. Damals braute ich mein erstes Bier Zuhause mit dem 20l Einkocher meiner Oma – heute braue ich mein Bier in 2000l Chargen als Gipsy Brauer bei Wildwuchs Brauwerk.
            </p>
            <p>
              Alle Bierkreationen entspringen meiner Hobbybrauerküche und sind mit viel Leidenschaft und Liebe fürs Detail kreiert. Probiere gerne selbst und lass dich von meiner Leidenschaft anstecken!
            </p>
            <p className="traum-sign">Dein Finn</p>
          </div>
        </div>
      </section>

      <section className="section section--crew">
        <div className="container">
          <span className="section-label">05</span>
          <h2 className="section-title">#CREW</h2>
          <div className="crew-grid">
            <div className="crew-card">
              <div className="crew-avatar">M</div>
              <h4>Marlena</h4>
              <p>Barchefin & Biermodel · Seit 2022 im Team</p>
            </div>
            <div className="crew-card">
              <div className="crew-avatar">D</div>
              <h4>Doro</h4>
              <p>Bierzapferin, Kalligraphie-Expertin & Biermodel · Seit 2023 im Team</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sweetie">
        <div className="container">
          <span className="section-label">06</span>
          <h2 className="section-title">Sweetie & Helen</h2>
          <p className="section-subtitle">Powered by Lüne Bräu – Unsere Unterstützung für Dressurreiterin Helen Kretzschmar</p>
          <div className="sweetie-content">
            <p>
              Bei Lüne Bräu unterstützen wir Menschen aus unserer Region, die mit Leidenschaft und Können ihren Weg gehen. Eine davon ist <strong>Helen Kretzschmar</strong> – eine talentierte Dressurreiterin mit Herzblut und Präzision im Sattel.
            </p>
            <p>
              An ihrer Seite: die elegante Stute <strong>Sweet Caramel H</strong>, liebevoll „Sweetie“ genannt. Seit dieser Saison sind wir offizieller Partner und statten die beiden mit Equipment aus, das unser Lüne Bräu Logo trägt.
            </p>
            <p className="sweetie-tagline"><strong>Leidenschaft, Präzision und Regionalität – das verbindet uns.</strong></p>
          </div>
        </div>
      </section>

      <section className="section section--stats">
        <div className="container">
          <span className="section-label section-label--light">07</span>
          <blockquote className="stats-quote">„Handwerklich gebraut mit Hingabe für die Region"</blockquote>
          <div className="stats-grid">
            <div className="stat"><span className="stat-value">27.711</span><span className="stat-label">Liter gebraut</span></div>
            <div className="stat"><span className="stat-value">3.391</span><span className="stat-label">Kisten gepackt</span></div>
            <div className="stat"><span className="stat-value">79.959</span><span className="stat-label">0,33l Flaschen</span></div>
            <div className="stat"><span className="stat-value">4.485</span><span className="stat-label">Liter Fassbier</span></div>
          </div>
        </div>
      </section>

      <section id="gallery" className="section section--gallery">
        <div className="container">
          <span className="section-label">08</span>
          <h2 className="section-title">Gallery</h2>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="instagram-cta">
            Hier geht's zu Instagram →
          </a>
          <div className="gallery-placeholder">
            <p>Folge uns auf Instagram für aktuelle Bilder und Stories</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">@luene_braeu</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-contact">
            <h4>Kontakt</h4>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div className="footer-business">
            <h4>Geschäftskunde?</h4>
            <p>Du möchtest unsere Produkte in deinem Geschäft führen? Kontaktiere uns für eine individuelle Lösung.</p>
          </div>
          <div className="footer-links">
            <a href="#">Impressum</a>
            <a href="#">Datenschutzerklärung</a>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Lüne Bräu · Lüneburg
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
