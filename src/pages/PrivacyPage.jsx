import { Link } from 'react-router-dom'

function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <nav className="store-breadcrumb" aria-label="Brotkrumen">
          <Link to="/">Startseite</Link>
          <span aria-hidden>/</span>
          <span className="store-breadcrumb__current">Datenschutz</span>
        </nav>

        <h1 className="legal-title">Datenschutzerklaerung</h1>

        <section className="legal-section">
          <h2>1. Datenschutz auf einen Blick</h2>
          <p>
            Die folgenden Hinweise geben einen Ueberblick darueber, was mit deinen personenbezogenen Daten passiert,
            wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persoenlich
            identifiziert werden kannst.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Verantwortliche Stelle</h2>
          <p>
            Luenebraeu
            <br />
            Finn Janik Schneider
            <br />
            Am Dorfplatz 55
            <br />
            21335 Lueneburg
            <br />
            Telefon: 017625686466
            <br />
            E-Mail: info@luenebraeu.de
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Hosting</h2>
          <p>
            Wir hosten diese Website bei IONOS SE, Elgendorfer Str. 57, 56410 Montabaur.
            Die Verwendung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an einer zuverlaessigen Darstellung der Website).
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Datenerfassung auf dieser Website</h2>
          <p>
            Beim Besuch der Website werden automatisch technische Daten erfasst (z. B. Browser, Betriebssystem,
            Uhrzeit des Seitenaufrufs, IP-Adresse in Logfiles). Wenn du uns kontaktierst, verarbeiten wir
            die von dir uebermittelten Daten zur Bearbeitung deiner Anfrage.
          </p>
          <p>
            Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Vorvertrag),
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) sowie ggf. Art. 6 Abs. 1 lit. a DSGVO
            (Einwilligung).
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Cookies und Analyse</h2>
          <p>
            Diese Website verwendet Cookies und Analysefunktionen (u. a. IONOS WebAnalytics).
            Die Verarbeitung erfolgt zur technisch fehlerfreien Bereitstellung und zur statistischen
            Auswertung der Nutzung.
          </p>
          <p>
            Weitere Informationen:
            {' '}
            <a href="https://www.ionos.de/terms-gtc/index.php?id=6" target="_blank" rel="noopener noreferrer">
              IONOS Datenschutz
            </a>
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Deine Rechte</h2>
          <p>
            Du hast jederzeit das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung,
            Datenuebertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen.
            Ausserdem steht dir ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehoerde zu.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Quelle der Rechtstexte</h2>
          <p>
            Die Inhalte orientieren sich an den auf der Originalseite hinterlegten Rechtstexten.
            Quelle:
            {' '}
            <a href="https://luenebraeu.de/datenschutz" target="_blank" rel="noopener noreferrer">
              https://luenebraeu.de/datenschutz
            </a>
            {' '}und{' '}
            <a href="https://www.e-recht24.de/" target="_blank" rel="noopener noreferrer">
              e-recht24.de
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}

export default PrivacyPage
