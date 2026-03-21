import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

function ShopPage() {
  const { addItem } = useCart()

  return (
    <div className="shop">
      <div className="shop-header">
        <span className="section-label">Shop</span>
        <h1 className="shop-title">Online bestellen</h1>
        <p className="shop-intro">Handwerklich gebrautes Bier direkt zu dir nach Hause.</p>
      </div>

      <div className="shop-products">
        {products.map((product) => (
          <article key={product.id} className="shop-card">
            <div className="shop-card-image">
              <img src={product.image} alt={product.imageAlt} />
            </div>
            <div className="shop-card-content">
              <span className="shop-card-label">{product.subtitle}</span>
              <h2 className="shop-card-title">{product.name}</h2>
              <p className="shop-card-desc">{product.description}</p>
              <div className="shop-card-specs">{product.specs}</div>
              <div className="shop-card-price">
                {product.price.toFixed(2).replace('.', ',')} € <span className="shop-card-unit">/ {product.unit}</span>
              </div>
              <button
                type="button"
                className="btn-primary shop-card-btn"
                onClick={() => addItem(product)}
              >
                In den Warenkorb
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="shop-footer">
        <p>Sichere Zahlung, Versand in ganz Deutschland. Mindestbestellwert 25 €.</p>
        <Link to="/" className="shop-back">← Zurück zur Startseite</Link>
      </div>
    </div>
  )
}

export default ShopPage
