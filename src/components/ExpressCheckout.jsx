function IconApple() {
  return (
    <svg
      className="store-express__icon store-express__icon--apple"
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.1 14.5 75.8c14.5 30.2 35 56.3 58.9 75.8a203.2 203.2 0 0 0 130.5 46.2c16.7 0 50.4-19.5 76.6-19.5 33.8 0 64.9 13.1 91.5 29.5 12.1 7.2 14.5 23.4 5.7 34.9-52.6 60.4-142.8 56.2-183.6 31.6-11.6-6.9-22.1-16.4-31.3-27.5-57.4-69.6-96.3-165.5-96.3-265.7 0-78.5 52.3-130.8 102.8-130.8 38.4 0 71.1 25.6 94.5 25.6 23.5 0 62.8-27.2 111.7-27.2 19.5 0 67.2 3.5 102.1 29.5 8.2 6.2 16.4 17.9 19.3 34.6-68.6 30.7-87.4 94.4-87.4 161.1zm-10.2-201.3c11.1 13.5 18.3 32.4 16.3 51.4-15.5-1.2-34.4-10.5-45.6-24-10.9-13.2-20.4-32.6-17.7-51.7 18.2.6 36.8 10.5 47 24.3z" />
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
export default function ExpressCheckout({ className = '', showDivider = true, onSelect, selected = null }) {
  const wrap = (provider) => () => onSelect?.(provider)
  const selectedIs = (provider) => selected === provider

  return (
    <div className={`store-express ${className}`.trim()}>
      <p className="store-express__eyebrow">Express-Kasse</p>
      <div className="store-express__buttons" role="group" aria-label="Schnellkasse">
        <button
          type="button"
          className={`store-express__btn store-express__btn--apple ${selectedIs('apple') ? 'store-express__btn--selected' : ''}`.trim()}
          onClick={wrap('apple')}
          aria-label="Apple Pay"
          aria-pressed={selectedIs('apple')}
        >
          <IconApple />
          <span className="store-express__apple-pay">Pay</span>
        </button>
        <button
          type="button"
          className={`store-express__btn store-express__btn--google ${selectedIs('google') ? 'store-express__btn--selected' : ''}`.trim()}
          onClick={wrap('google')}
          aria-label="Google Pay"
          aria-pressed={selectedIs('google')}
        >
          <IconGoogleG />
          <span>Pay</span>
        </button>
        <button
          type="button"
          className={`store-express__btn store-express__btn--paypal ${selectedIs('paypal') ? 'store-express__btn--selected' : ''}`.trim()}
          onClick={wrap('paypal')}
          aria-label="PayPal"
          aria-pressed={selectedIs('paypal')}
        >
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
