import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const SHIPPING_FLAT_RATE = 6.5;
const FREE_SHIPPING_THRESHOLD = 75;

export function CartPage() {
  const { items, setQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.productInfo.price * item.quantity,
    0,
  );
  const shipping =
    items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="page cart-empty">
        <h1>Your cart is empty</h1>
        <p>Add a brewer, some beans, or both — they tend to go together.</p>
        <Link to="/" className="btn btn-primary">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h1 className="cart-page__title">Your cart</h1>

      <div className="cart-page__layout">
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.productInfo.id} className="cart-line">
              <Link
                to={`/products/${item.productInfo.id}`}
                className="cart-line__thumb-link"
              >
                <img
                  src={item.productInfo.image}
                  alt=""
                  className="cart-line__thumb"
                />
              </Link>

              <div className="cart-line__info">
                <Link
                  to={`/products/${item.productInfo.id}`}
                  className="cart-line__name"
                >
                  {item.productInfo.name}
                </Link>
                <p className="cart-line__price">
                  ${item.productInfo.price.toFixed(2)} each
                </p>
              </div>

              <div className="quantity-stepper cart-line__stepper">
                <button
                  type="button"
                  onClick={() => setQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      item.id,
                      Math.min(item.productInfo.stock, item.quantity + 1),
                    )
                  }
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <p className="cart-line__total">
                ${(item.productInfo.price * item.quantity).toFixed(2)}
              </p>

              <button
                type="button"
                className="cart-line__remove"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h2 className="cart-summary__title">Order Info</h2>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary__row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p className="cart-summary__hint">
              Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for
              free shipping.
            </p>
          )}
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary cart-summary__checkout"
            onClick={() => navigate("/payment")}
          >
            Place order
          </button>
          <Link to="/" className="cart-summary__continue">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
