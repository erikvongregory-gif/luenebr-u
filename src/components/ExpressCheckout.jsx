function IconApple() {
  return (
    <svg className="store-express__icon" viewBox="0 0 16 20" fill="currentColor" aria-hidden>
      <path d="M12.64 10.2c.02 2.17 1.88 2.9 1.9 2.9-.02.06-.3 1.03-.98 2.04-.59.87-1.2 1.74-2.17 1.76-.95.02-1.25-.56-2.34-.56-1.08 0-1.42.54-2.32.58-.93.04-1.64-1.04-2.24-1.9C2.62 13.52 1 11.3 1 9.2 1 7.18 2.29 5.75 4.01 5.73c.96-.02 1.86.64 2.44.64.58 0 1.67-.79 2.81-.67.48.02 1.84.2 2.71 1.58-2.3 1.38-1.95 4.95.67 5.92zM10.25 3.5c.52.63 1.38 1.05 2.2.99.1-.93-.27-1.84-.78-2.5-.54-.7-1.48-1.24-2.26-1.28-.12 1 .32 1.99.84 2.79z" />
    </svg>
  )
}

function IconGoogleG() {
  return (
    <svg className="store-express__icon store-express__icon--google" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function PayPalWordmark() {
  return (
    <span className="store-express__paypal-word" aria-hidden>
      <span className="store-express__paypal-w1">Pay</span>
      <span className="store-express__paypal-w2">Pal</span>
    </span>
  )
}

/**
 * Express-Zahlungsbuttons im Stil gängiger Shop-Systeme.
 * Hinweis: Es erfolgt keine echte Wallet-Zahlung – nach Bestellung folgt der Link per E-Mail.
 */
export default function ExpressCheckout({ className = '', showDivider = true, onSelect }) {
  const wrap = (provider) => () => onSelect?.(provider)

  return (
    <div className={`store-express ${className}`.trim()}>
      <p className="store-express__eyebrow">Express-Kasse</p>
      <div className="store-express__buttons" role="group" aria-label="Schnellkasse">
        <button type="button" className="store-express__btn store-express__btn--apple" onClick={wrap('apple')} aria-label="Apple Pay">
          <IconApple />
          <span className="store-express__apple-pay">Pay</span>
        </button>
        <button type="button" className="store-express__btn store-express__btn--google" onClick={wrap('google')} aria-label="Google Pay">
          <IconGoogleG />
          <span>Pay</span>
        </button>
        <button type="button" className="store-express__btn store-express__btn--paypal" onClick={wrap('paypal')} aria-label="PayPal">
          <PayPalWordmark />
        </button>
      </div>
      {showDivider && (
        <div className="store-express__divider" role="separator">
          <span>oder</span>
        </div>
      )}
    </div>
  )
}

export function StorePaymentBadges({ className = '' }) {
  return (
    <div className={`store-pay-badges ${className}`.trim()} aria-hidden>
      <span className="store-pay-badges__label">Sichere Zahlung</span>
      <div className="store-pay-badges__row">
        <span className="store-pay-badge store-pay-badge--visa">VISA</span>
        <span className="store-pay-badge store-pay-badge--mc">Mastercard</span>
        <span className="store-pay-badge store-pay-badge--amex">AMEX</span>
        <span className="store-pay-badge store-pay-badge--paypal">PayPal</span>
      </div>
    </div>
  )
}
