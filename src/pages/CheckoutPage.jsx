import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FORMSPREE_FORM_ID } from '../config'

const MIN_ORDER = 25

function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    plz: '',
    city: '',
    notes: ''
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
      anzahl: totalItems
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
      <div className="checkout">
        <div className="checkout-empty">
          <h1>Dein Warenkorb ist leer</h1>
          <p>Füge zuerst Produkte im Shop hinzu.</p>
          <Link to="/shop" className="btn-primary">Zum Shop</Link>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="checkout">
        <div className="checkout-success">
          <h1>Vielen Dank!</h1>
          <p>Deine Bestellung wurde übermittelt. Wir melden uns in Kürze per E-Mail.</p>
          <Link to="/shop" className="btn-primary">Weiter einkaufen</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <div className="checkout-inner">
        <h1 className="checkout-title">Kasse</h1>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-section">
            <h2>Kontaktdaten</h2>
            <label>
              <span>Name *</span>
              <input type="text" name="name" required value={form.name} onChange={handleChange} />
            </label>
            <label>
              <span>E-Mail *</span>
              <input type="email" name="email" required value={form.email} onChange={handleChange} />
            </label>
            <label>
              <span>Telefon</span>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
            </label>
          </section>

          <section className="checkout-section">
            <h2>Lieferadresse</h2>
            <label>
              <span>Straße & Hausnummer *</span>
              <input type="text" name="street" required value={form.street} onChange={handleChange} />
            </label>
            <div className="checkout-row">
              <label>
                <span>PLZ *</span>
                <input type="text" name="plz" required value={form.plz} onChange={handleChange} />
              </label>
              <label>
                <span>Stadt *</span>
                <input type="text" name="city" required value={form.city} onChange={handleChange} />
              </label>
            </div>
            <label>
              <span>Anmerkungen</span>
              <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} placeholder="z.B. Klingel kaputt, Abstellplatz …" />
            </label>
          </section>

          {totalPrice < MIN_ORDER && (
            <p className="checkout-min">Mindestbestellwert {MIN_ORDER} €. Aktuell: {totalPrice.toFixed(2).replace('.', ',')} €</p>
          )}

          {status === 'error' && (
            <p className="checkout-error">Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere uns direkt.</p>
          )}

          <button type="submit" className="btn-primary checkout-submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Wird gesendet …' : 'Bestellung abschließen'}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Deine Bestellung</h2>
          <ul className="checkout-items">
            {items.map((p) => (
              <li key={p.id}>
                <span>{p.name} × {p.quantity}</span>
                <span>{(p.price * p.quantity).toFixed(2).replace('.', ',')} €</span>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Gesamt</span>
            <span>{totalPrice.toFixed(2).replace('.', ',')} €</span>
          </div>
          <p className="checkout-info">Zahlung per Überweisung nach Bestellbestätigung. Versandkosten werden dir mitgeteilt.</p>
        </aside>
      </div>
    </div>
  )
}

export default CheckoutPage
