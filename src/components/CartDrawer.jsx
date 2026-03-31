import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ExpressCheckout from './ExpressCheckout'

function CartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

  const goCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={onClose} aria-hidden="true" />
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`} role="dialog" aria-label="Warenkorb">
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Warenkorb {totalItems > 0 && `(${totalItems})`}</h2>
          <button type="button" className="cart-drawer-close" onClick={onClose} aria-label="Schließen">
            ×
          </button>
        </div>
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <p className="cart-empty">Dein Warenkorb ist leer.</p>
          ) : (
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.imageAlt} />
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-unit">{item.unit}</span>
                    <div className="cart-item-actions">
                      <div className="cart-item-qty">
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Menge verringern">−</button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Menge erhöhen">+</button>
                      </div>
                      <button type="button" className="cart-item-remove" onClick={() => removeItem(item.id)}>Entfernen</button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <ExpressCheckout
              className="store-express--compact"
              showDivider={false}
              onSelect={goCheckout}
            />
            <div className="cart-drawer-divider" role="presentation">
              <span>oder</span>
            </div>
            <div className="cart-total">
              <span>Zwischensumme</span>
              <span>{totalPrice.toFixed(2).replace('.', ',')} €</span>
            </div>
            <p className="cart-drawer-note">Mindestbestellwert 25 € · Steuern inkl.</p>
            <Link to="/checkout" className="btn-primary cart-checkout-btn" onClick={onClose}>
              Zur Kasse
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

export default CartDrawer
