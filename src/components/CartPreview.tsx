import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPreview.css";

export function CartPreview() {
  const { lines, totalCount } = useCart();

  const subtotal = lines.reduce(
    (sum, l) => sum + l.product.price * l.quantity,
    0,
  );

  return (
    <aside className="cart-preview">
      <div className="cart-preview__head">
        <h2 className="cart-preview__title">Your cart</h2>
        <span className="cart-preview__count">{totalCount}</span>
      </div>

      {lines.length === 0 ? (
        <p className="cart-preview__empty">
          Nothing added yet. Items you add will show up here.
        </p>
      ) : (
        <>
          <ul className="cart-preview__list">
            {lines.map((line) => (
              <li key={line.product.id} className="cart-preview__line">
                <img
                  src={line.product.image}
                  alt=""
                  className="cart-preview__thumb"
                />
                <div className="cart-preview__line-info">
                  <p className="cart-preview__line-name">{line.product.name}</p>
                  <p className="cart-preview__line-meta">
                    {line.quantity} × ${line.product.price.toFixed(2)}
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
