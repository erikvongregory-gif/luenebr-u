import { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FORMSPREE_FORM_ID } from '../config'
import ExpressCheckout, { StorePaymentBadges } from '../components/ExpressCheckout'
import Reveal from '../components/Reveal'
import { startExpressCheckout } from '../lib/expressCheckout'

const MIN_ORDER = 25
const EXPRESS_LABELS = {
  apple: 'Apple Pay',
  google: 'Google Pay',
  paypal: 'PayPal'
}

function sanitizeProvider(value) {
  return Object.prototype.hasOwnProperty.call(EXPRESS_LABELS, value) ? value : null
}

function CheckoutPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const [status, setStatus] = useState('idle')
  const [expressHint, setExpressHint] = useState(false)
  const [expressError, setExpressError] = useState('')
  const [selectedExpress, setSelectedExpress] = useState(() => sanitizeProvider(searchParams.get('pay')))
  const formRef = useRef(null)
  const paymentHandledRef = useRef(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    plz: '',
    city: '',
    notes: ''
  })

  useEffect(() => {
    if (expressHint && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [expressHint])

  useEffect(() => {
    const providerFromQuery = sanitizeProvider(searchParams.get('pay'))
    if (!providerFromQuery) return
    setSelectedExpress(providerFromQuery)
    setExpressHint(true)
  }, [searchParams])

  useEffect(() => {
    if (paymentHandledRef.current) return

    const paidState = searchParams.get('paid')
    const provider = searchParams.get('provider')
    const paypalOrderId = searchParams.get('token')
    const stripeSessionId = searchParams.get('session_id')

    if (paidState === 'success' && provider === 'stripe' && stripeSessionId) {
      paymentHandledRef.current = true
      const verifyStripe = async () => {
        try {
          const res = await fetch(`/api/verify-stripe-session?session_id=${encodeURIComponent(stripeSessionId)}`)
          const data = await res.json()
          if (!res.ok || !data.paid) throw new Error('Stripe-Zahlung nicht bestätigt')
          clearCart()
          setStatus('success')
        } catch {
          setStatus('error')
          setExpressError('Stripe-Zahlung konnte nicht verifiziert werden. Bitte kontaktiere uns.')
        }
      }
      verifyStripe()
      return
    }

    if (paidState === 'success' && provider === 'paypal' && paypalOrderId) {
      paymentHandledRef.current = true
      const capture = async () => {
        try {
          const res = await fetch('/api/capture-paypal-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: paypalOrderId })
          })
          if (!res.ok) throw new Error('Capture fehlgeschlagen')
          clearCart()
          setStatus('success')
        } catch {
          setStatus('error')
        }
      }
      capture()
      return
    }

    if (paidState === 'cancelled') {
      paymentHandledRef.current = true
      setExpressHint(true)
      setExpressError('Zahlung wurde abgebrochen. Du kannst es erneut versuchen.')
    }
  }, [clearCart, searchParams])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleExpressSelect = async (provider) => {
    const nextProvider = sanitizeProvider(provider)
    if (!nextProvider) return

    setSelectedExpress(nextProvider)
    setSearchParams({ pay: nextProvider }, { replace: true })
    setExpressHint(true)
    setExpressError('')

    try {
      await startExpressCheckout(nextProvider, items)
    } catch (error) {
      setExpressError(error?.message || 'Zahlung konnte nicht gestartet werden.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (totalItems === 0) return
    if (totalPrice < MIN_ORDER) {
      setStatus('error')
      return
    }

    if (FORMSPREE_FORM_ID === 'YOUR_FORM_ID') {
      setStatus('error')
      return
    }

    setStatus('submitting')

    const orderText = items
      .map((p) => `${p.name} × ${p.quantity}: ${(p.price * p.quantity).toFixed(2)} €`)
      .join('\n')

    const body = {
      ...form,
      _subject: `Bestellung Lüne Bräu – ${form.name}`,
      order: orderText,
      gesamt: `${totalPrice.toFixed(2)} €`,
      anzahl: totalItems,
      zahlungsart: selectedExpress ? EXPRESS_LABELS[selectedExpress] : 'Noch nicht ausgewählt'
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        clearCart()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (totalItems === 0 && status !== 'success') {
    return (
      <div className="checkout checkout--store">
        <Reveal className="checkout-empty" soft>
          <h1>Dein Warenkorb ist leer</h1>
          <p>Füge zuerst Produkte im Shop hinzu.</p>
          <Link to="/shop" className="btn-primary">Zum Shop</Link>
        </Reveal>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="checkout checkout--store">
        <Reveal className="checkout-success" soft>
          <div className="checkout-success-icon" aria-hidden>✓</div>
          <h1>Vielen Dank für deine Bestellung</h1>
          <p>Wir haben deine Anfrage erhalten und melden uns in Kürze mit der Bestätigung und den Zahlungsdetails.</p>
          <StorePaymentBadges className="checkout-success-badges" />
          <Link to="/shop" className="btn-primary">Weiter einkaufen</Link>
        </Reveal>
      </div>
    )
  }

  return (
    <div className="checkout checkout--store">
      <div className="checkout-store-wrap">
        <Reveal as="nav" className="store-breadcrumb" aria-label="Brotkrumen" soft>
          <Link to="/">Startseite</Link>
          <span aria-hidden>/</span>
          <Link to="/shop">Shop</Link>
          <span aria-hidden>/</span>
          <span className="store-breadcrumb__current">Kasse</span>
        </Reveal>

        <div className="checkout-inner checkout-inner--store">
          <Reveal as="header" className="checkout-store-header" soft delay={35}>
            <h1 className="checkout-title">Kasse</h1>
            <p className="checkout-subtitle">Sichere Bestellung · Versand in Deutschland</p>
            <div className="checkout-trust">
              <span>Verschlüsselte Übertragung</span>
              <span>Persönliche Bestätigung</span>
              <span>Regionaler Versand</span>
            </div>
          </Reveal>

          <Reveal className="checkout-main" soft delay={70}>
            <ExpressCheckout showDivider onSelect={handleExpressSelect} selected={selectedExpress} />

            {expressHint && (
              <div className="checkout-express-hint" role="status">
                Gewählt: <strong>{selectedExpress ? EXPRESS_LABELS[selectedExpress] : 'Express-Zahlung'}</strong>.
                {expressError ? ` ${expressError}` : ' Du wirst zur sicheren Bezahlseite weitergeleitet.'}
              </div>
            )}

            <form ref={formRef} id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
              <Reveal as="section" className="checkout-section checkout-section--store" delay={0}>
                <h2>Kontakt</h2>
                <label>
                  <span>E-Mail *</span>
                  <input type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} placeholder="name@beispiel.de" />
                </label>
                <label>
                  <span>Vor- und Nachname *</span>
                  <input type="text" name="name" required autoComplete="name" value={form.name} onChange={handleChange} />
                </label>
                <label>
                  <span>Telefon</span>
                  <input type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="Optional" />
                </label>
              </Reveal>

              <Reveal as="section" className="checkout-section checkout-section--store" delay={55}>
                <h2>Lieferung</h2>
                <label>
                  <span>Straße & Hausnummer *</span>
                  <input type="text" name="street" required autoComplete="street-address" value={form.street} onChange={handleChange} />
                </label>
                <div className="checkout-row">
                  <label>
                    <span>PLZ *</span>
                    <input type="text" name="plz" required autoComplete="postal-code" value={form.plz} onChange={handleChange} />
                  </label>
                  <label>
                    <span>Stadt *</span>
                    <input type="text" name="city" required autoComplete="address-level2" value={form.city} onChange={handleChange} />
                  </label>
                </div>
                <label>
                  <span>Anmerkungen</span>
                  <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} placeholder="z. B. Klingel, Abstellort …" />
                </label>
              </Reveal>

              <Reveal as="section" className="checkout-section checkout-section--store checkout-section--payment" delay={110}>
                <h2>Zahlung</h2>
                <p className="checkout-payment-intro">
                  Express-Zahlung startet direkt per Weiterleitung: Apple Pay und Google Pay via Stripe, PayPal über den PayPal-Checkout.
                </p>
                <div className="checkout-payment-icons" aria-hidden>
                  <span className="checkout-pay-pill">Apple Pay</span>
                  <span className="checkout-pay-pill">Google Pay</span>
                  <span className="checkout-pay-pill">PayPal</span>
                  <span className="checkout-pay-pill">Karte</span>
                  <span className="checkout-pay-pill">Überweisung</span>
                </div>
              </Reveal>

              {totalPrice < MIN_ORDER && (
                <p className="checkout-min">Mindestbestellwert {MIN_ORDER} €. Aktuell: {totalPrice.toFixed(2).replace('.', ',')} €</p>
              )}

              {status === 'error' && (
                <p className="checkout-error">Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere uns direkt.</p>
              )}

              <button type="submit" className="btn-primary checkout-submit checkout-submit--store" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Wird gesendet …' : 'Bestellung abschicken'}
              </button>
              <p className="checkout-legal-hint">
                Mit dem Absenden stimmst du der Verarbeitung deiner Daten zur Abwicklung der Bestellung zu.
              </p>
            </form>
          </Reveal>

          <Reveal as="aside" className="checkout-summary checkout-summary--store" soft delay={50}>
            <div className="checkout-summary-card">
              <h2 className="checkout-summary-title">Bestellübersicht</h2>
              <ul className="checkout-items">
                {items.map((p) => (
                  <li key={p.id}>
                    <span className="checkout-item-name">
                      <span className="checkout-item-thumb-wrap">
                        <img src={p.image} alt="" className="checkout-item-thumb" />
                      </span>
                      <span>
                        {p.name}
                        <span className="checkout-item-qty"> × {p.quantity}</span>
                      </span>
                    </span>
                    <span>{(p.price * p.quantity).toFixed(2).replace('.', ',')} €</span>
                  </li>
                ))}
              </ul>
              <p className="checkout-shipping-note">Versandkosten werden in der Bestätigung ausgewiesen.</p>
              <div className="checkout-total checkout-total--grand">
                <span>Gesamt</span>
                <span>{totalPrice.toFixed(2).replace('.', ',')} €</span>
              </div>
              <div className="checkout-summary-meta">
                <span>{totalItems} Artikel</span>
                <span>Min. {MIN_ORDER.toFixed(2).replace('.', ',')} €</span>
              </div>
              <StorePaymentBadges className="checkout-summary-badges" />
              <p className="checkout-info">
                Du kannst mit <strong>PayPal</strong>, <strong>Apple Pay</strong>, <strong>Google Pay</strong>, Karte oder Überweisung bezahlen.
                Für Express-Zahlung wirst du direkt zur sicheren Bezahlseite weitergeleitet.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
