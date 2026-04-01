import { Link } from 'react-router-dom'

function ImprintPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <nav className="store-breadcrumb" aria-label="Brotkrumen">
          <Link to="/">Startseite</Link>
          <span aria-hidden>/</span>
          <span className="store-breadcrumb__current">Impressum</span>
        </nav>

        <h1 className="legal-title">Impressum</h1>

        <section className="legal-section">
          <h2>Angaben gemaess § 5 TMG</h2>
          <p>
            Finn Janik Schneider
            <br />
            Luene Braeu (Einzelunternehmer)
            <br />
            Am Dorfplatz 55
            <br />
            21335 Lueneburg
          </p>
        </section>

        <section className="legal-section">
          <h2>Kontakt</h2>
          <p>
            Telefon: 017625686466
            <br />
            E-Mail: info@luenebraeu.de
          </p>
        </section>

        <section className="legal-section">
          <h2>Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemaess § 27 a Umsatzsteuergesetz: DE340125289</p>
        </section>

        <section className="legal-section">
          <h2>Redaktionell verantwortlich</h2>
          <p>
            Finn Janik Schneider
            <br />
            Am Dorfplatz 55
            <br />
            21335 Lueneburg
          </p>
        </section>

        <section className="legal-section">
          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            {' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
            .
            <br />
            Unsere E-Mail-Adresse findest du oben im Impressum.
          </p>
        </section>

        <section className="legal-section">
          <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>
      </div>
    </main>
  )
}

export default ImprintPage
