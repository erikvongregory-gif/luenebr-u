function IconApple() {
  return (
    <svg
      className="store-express__icon store-express__icon--apple"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M11.182 0c.097.709-.17 1.457-.544 1.952-.404.527-1.046.936-1.688.879-.085-.675.214-1.406.586-1.866.41-.5 1.115-.885 1.646-.965zM13.707 11.596c-.267.58-.395.84-.738 1.353-.477.715-1.15 1.607-1.985 1.614-.742.007-.933-.48-1.94-.475-1.007.005-1.213.483-1.956.476-.835-.007-1.471-.815-1.948-1.53C3.805 10.954 2.777 7.172 4.286 4.72c.751-1.219 2.09-1.934 3.347-1.934.934 0 1.813.52 2.433.52.6 0 1.729-.644 2.915-.55.498.021 1.9.2 2.8 1.532-.072.045-1.67.977-1.654 2.917.018 2.31 1.957 3.083 1.98 3.092z" />
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
