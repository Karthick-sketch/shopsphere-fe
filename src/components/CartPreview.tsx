import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPreview.css";

export function CartPreview() {
  const { items, totalCount } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.productInfo.price * item.quantity,
    0,
  );

  return (
    <aside className="cart-preview">
      <div className="cart-preview__head">
        <h2 className="cart-preview__title">Your cart</h2>
        <span className="cart-preview__count">{totalCount}</span>
      </div>

      {items.length === 0 ? (
        <p className="cart-preview__empty">
          Nothing added yet. Items you add will show up here.
        </p>
      ) : (
        <>
          <ul className="cart-preview__list">
            {items.map((item) => (
              <li key={item.productInfo.id} className="cart-preview__line">
                <img
                  src={item.productInfo.image}
                  alt=""
                  className="cart-preview__thumb"
                />
                <div className="cart-preview__line-info">
                  <p className="cart-preview__line-name">
                    {item.productInfo.name}
                  </p>
                  <p className="cart-preview__line-meta">
                    {item.quantity} × ${item.productInfo.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-preview__subtotal">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Link to="/cart" className="btn btn-dark cart-preview__cta">
            Go to cart
          </Link>
        </>
      )}
    </aside>
  );
}
