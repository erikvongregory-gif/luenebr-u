# Luenebräu

Braukunst aus Lüneburg – eine moderne Webpräsenz.

## Entwicklung starten

```bash
npm install
npm run dev
```

Der Server läuft dann unter **http://localhost:5173**.

## Express-Zahlung einrichten (echter Checkout)

Die Buttons für **Apple Pay**, **Google Pay** und **PayPal** starten echte Bezahlvorgänge über API-Routen:

- `Apple Pay` + `Google Pay` -> Stripe Checkout Session
- `PayPal` -> PayPal Order API

Setup:

1. `.env.example` als `.env` kopieren
2. Folgende Werte setzen:
   - `STRIPE_SECRET_KEY`
   - `PAYPAL_MODE` (`sandbox` oder `live`)
   - `PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
   - optional `PUBLIC_BASE_URL`
3. Für lokale Entwicklung `npm run dev` starten

Deployment:
- Auf Vercel die gleichen Umgebungsvariablen im Projekt hinterlegen.
- `/api/*` wird als Serverless Functions ausgeführt.
- Stripe-Erfolg wird serverseitig über `session_id` verifiziert.

## Befehle

| Befehl       | Beschreibung           |
|-------------|------------------------|
| `npm run dev`    | Entwicklungsserver starten |
| `npm run build`  | Produktions-Build erstellen |
| `npm run preview`| Build lokal testen      |

## Tech Stack

- **React 18** – UI-Bibliothek
- **Vite 5** – Build-Tool mit schnellem HMR
- **CSS** – Eigenes Design-System (kein Framework)
