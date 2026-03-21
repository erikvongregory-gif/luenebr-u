import { useState, useEffect } from 'react'
import logoSrc from './assets/logo.png'

const ORDER_URL = 'https://holvi.com/shop/Luenebraeu/'
const INSTAGRAM_URL = 'https://www.instagram.com/luene_braeu/'
const PHONE = '+49 176 25686466'
const EMAIL = 'info@luenebraeu.de'

function App() {
  const [loading, setLoading] = useState(true)
  const [loaderExiting, setLoaderExiting] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
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
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const verifyAge = () => {
    localStorage.setItem('luenebraeu-age', 'verified')
    setAgeVerified(true)
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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
          <button className="btn-primary" onClick={verifyAge}>
            Bestätigen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); setMobileNavOpen(false) }}>
          <img src={logoSrc} alt="Lüne Bräu" />
        </a>
        <button className="nav-burger" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Menü">
          <span /><span /><span />
        </button>
        <div className={`nav-links ${mobileNavOpen ? 'nav-links--open' : ''}`}>
          <a href="#start" onClick={(e) => { e.preventDefault(); scrollTo('hero'); setMobileNavOpen(false) }}>Start</a>
          <a href="#biere" onClick={(e) => { e.preventDefault(); scrollTo('biere'); setMobileNavOpen(false) }}>Unsere Biere</a>
          <a href="#haendler" onClick={(e) => { e.preventDefault(); scrollTo('haendler'); setMobileNavOpen(false) }}>Die Händler</a>
          <a href="#ueber-mich" onClick={(e) => { e.preventDefault(); scrollTo('ueber-mich'); setMobileNavOpen(false) }}>Über mich</a>
          <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo('gallery'); setMobileNavOpen(false) }}>Gallery</a>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="nav-cta">Kontakt</a>
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary btn--small">
            Jetzt bestellen
          </a>
        </div>
      </nav>

      <header id="hero" className="hero">
        <div className="hero-content">
          <img src={logoSrc} alt="Lüne Bräu" className="hero-logo" />
          <p className="tagline">Handwerklich gebraut mit Hingabe für die Region</p>
          <div className="divider" />
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Jetzt bestellen
          </a>
        </div>
      </header>

      <section id="biere" className="section section--biere">
        <div className="container">
          <h2 className="section-title">Unsere Biere</h2>
          
          <article className="beer-card beer-card--hanseat">
            <div className="beer-card-content">
              <span className="beer-label">Unser erstes Bier</span>
              <h3>Das Hanseat</h3>
              <p>
                Ein Kreativbier auf Basis eines Handelsbieres des 16. Jahrhunderts. Schon damals wurde dieses Bier durch die Hanse weltweit verschifft und war eines der meistgetrunkenen Biere der Welt.
              </p>
              <p className="beer-desc">
                Süffig, leicht und zart gebittert – mit neuem Schliff – zieht diese moderne Version heute wieder in die Hansestadt ein.
              </p>
              <p className="beer-availability">
                In vielen Lüneburger Einkaufsläden und ausgewählten Restaurants vom Fass erhältlich.
              </p>
              <div className="beer-specs">EBC 7 · IBU 18 · ALK 5,6% vol.</div>
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Jetzt bestellen
              </a>
            </div>
          </article>

          <article className="beer-card beer-card--luna">
            <div className="beer-card-content">
              <span className="beer-label">Die limitierten Schätze aus dem Holzfass</span>
              <h3>Luna Barrels</h3>
              <p>
                Lassen Sie sich von unserem <strong>Luna Barrels Calvados Cask</strong> in eine einzigartige Welt holzfassgereifter Biere entführen. Tief bernsteinfarben vereinen sich feine Noten von Karamell und frischem Schwarzbrot mit Anklängen von Apfelblüte und gelbem Apfel.
              </p>
              <p>
                Am Gaumen: cremig, buttrige Texturen, malzige Tiefe, Bitterschokolade und eine elegante, fruchtige Säure – mit feinen Bittertönen im Abgang.
              </p>
              <p className="beer-limit">Jedes Jahr aus einem anderen Holzfass · <strong>Auf 550 Flaschen limitiert!</strong></p>
              <div className="beer-specs">EBC 55 · IBU 20 · ALK 7,1% vol.</div>
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Jetzt bestellen
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section section--tap">
        <div className="container">
          <div className="tap-card">
            <div className="tap-icon">🍺</div>
            <h3>Schankanlage für Fassbier mieten?</h3>
            <p>
              Du möchtest Lüne Bräu Fassbier auf deiner nächsten Party ausschenken? Wir vermieten dir gerne eine Zapfanlage zum Bier dazu. Kontaktiere uns per WhatsApp, Mail oder telefonisch.
            </p>
            <a href={`https://wa.me/4917625686466`} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </section>

      <section id="haendler" className="section section--haendler">
        <div className="container">
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
          <blockquote className="stats-quote">„Handwerklich gebraut mit Hingabe für die Region“</blockquote>
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
    </div>
  )
}

export default App
