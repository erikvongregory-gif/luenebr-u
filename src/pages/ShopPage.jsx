import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import { StorePaymentBadges } from '../components/ExpressCheckout'

function ShopPage() {
  const { addItem } = useCart()
  const [addedProductId, setAddedProductId] = useState(null)

  const handleAddToCart = (product) => {
    if (product.soldOut) return
    addItem(product)
    setAddedProductId(product.id)
    window.setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current))
    }, 1400)
  }

  return (
    <div className="shop shop--storefront">
      <div className="shop-store-top">
        <nav className="store-breadcrumb store-breadcrumb--shop" aria-label="Brotkrumen">
          <Link to="/">Startseite</Link>
          <span aria-hidden>/</span>
          <span className="store-breadcrumb__current">Shop</span>
        </nav>
        <div className="shop-announcement">
          Kostenloser Versand ab 60 € · Sichere Zahlung mit Apple Pay, Google Pay & PayPal
        </div>
      </div>

      <div className="shop-header">
        <span className="section-label">Shop</span>
        <h1 className="shop-title">Alle Produkte</h1>
        <p className="shop-intro">Handwerklich gebrautes Bier – direkt von Lüne Bräu zu dir nach Hause.</p>
        <div className="shop-trust">
          <span>In Lüneburg gebraut</span>
          <span>Frisch verpackt</span>
          <span>Sichere Kasse</span>
        </div>
        <StorePaymentBadges className="shop-pay-badges" />
      </div>

      <div className="shop-products shop-products--grid">
        {products.map((product) => (
          <article key={product.id} id={product.id} className="shop-card shop-card--store">
            <a href={`#${product.id}`} className="shop-card-image">
              <img src={product.image} alt={product.imageAlt} loading="lazy" />
            </a>
            <div className="shop-card-content">
              <span className="shop-card-label">{product.subtitle}</span>
              <h2 className="shop-card-title">
                <a href={`#${product.id}`}>{product.name}</a>
              </h2>
              <p className="shop-card-desc">{product.description}</p>
              <div className="shop-card-specs">{product.specs}</div>
              <div className="shop-card-price">
                {product.price.toFixed(2).replace('.', ',')} € <span className="shop-card-unit">/ {product.unit}</span>
              </div>
              <p className="shop-card-note">Lieferung in Deutschland · inkl. MwSt.</p>
              <button
                type="button"
                className={`btn-primary shop-card-btn ${addedProductId === product.id ? 'shop-card-btn--added' : ''}`}
                onClick={() => handleAddToCart(product)}
                disabled={product.soldOut}
                aria-disabled={product.soldOut ? 'true' : undefined}
              >
                {product.soldOut ? 'Sold Out' : addedProductId === product.id ? 'Hinzugefuegt' : 'In den Warenkorb'}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="shop-footer shop-footer--store">
        <StorePaymentBadges />
        <p>Mindestbestellwert 25 € · Versand in ganz Deutschland</p>
        <Link to="/" className="shop-back">← Zurück zur Startseite</Link>
      </div>
    </div>
  )
}

export default ShopPage
