import { Link } from "react-router-dom";
import type { CartItem } from "../models/cart";

type CartItemFull = CartItem & { name: string; unitPrice: number; originalPrice: number; emoji: string; category: string };

// Cart ID: 1, User ID: 3

const ITEMS: CartItemFull[] = [
  { id: 1, cartId: 1, productId: 1, quantity: 1, name: "Noise-Cancelling Wireless Headphones", unitPrice: 4999, originalPrice: 7999, emoji: "🎧", category: "Electronics" },
  { id: 2, cartId: 1, productId: 2, quantity: 2, name: "Slim-Fit Cotton Shirt",                 unitPrice: 799,  originalPrice: 1299, emoji: "👕", category: "Clothing" },
  { id: 3, cartId: 1, productId: 5, quantity: 1, name: "Vitamin C Brightening Serum 30ml",      unitPrice: 699,  originalPrice: 1099, emoji: "🧴", category: "Beauty" },
];

export default function CartPage() {
  const subtotal   = ITEMS.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const saved      = ITEMS.reduce((s, i) => s + (i.originalPrice - i.unitPrice) * i.quantity, 0);
  const shipping   = subtotal >= 499 ? 0 : 79;
  const tax        = Math.round(subtotal * 0.18);
  const total      = subtotal + shipping + tax;

  return (
    <div className="page-wrapper">
      <div className="page-header-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Shopping Cart</span>
          </nav>
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>

      <div className="container" style={{ padding: "28px 20px" }}>
        <div className="cart-layout">
          {/* Items */}
          <div>
            <div className="cart-items-container">
              <div className="cart-header">
                <h2 className="cart-title">Cart ({ITEMS.length} items)</h2>
                <span style={{ fontSize: 13, color: "var(--success)", fontWeight: 600 }}>
                  You're saving ₹{saved.toLocaleString()} on this order!
                </span>
              </div>

              {ITEMS.map((item) => (
                <div key={item.id} className="cart-item">
                  <Link to={`/products/${item.productId}`} className="cart-item-img">
                    {item.emoji}
                  </Link>

                  <div className="cart-item-body">
                    <Link to={`/products/${item.productId}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <p className="cart-item-meta">{item.category} · SKU #{item.productId}</p>
                    <p className="cart-item-availability">✓ In Stock</p>

                    <div className="cart-item-actions">
                      <div className="qty-selector" style={{ transform: "scale(0.92)", transformOrigin: "left" }}>
                        <button className="qty-btn">−</button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn">＋</button>
                      </div>
                      <span className="cart-item-remove">Delete</span>
                      <span className="cart-item-remove">Save for later</span>
                    </div>
                  </div>

                  <div className="cart-item-price">
                    <div>₹{(item.unitPrice * item.quantity).toLocaleString()}</div>
                    {item.originalPrice && (
                      <div style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "line-through", fontWeight: 400 }}>
                        ₹{(item.originalPrice * item.quantity).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Promo */}
            <div className="card" style={{ marginTop: 16 }}>
              <p style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>🏷️ Apply Coupon</p>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  id="cart-coupon"
                  type="text"
                  className="form-input"
                  placeholder="Enter coupon code"
                  style={{ flex: 1 }}
                />
                <button className="btn btn-accent btn-sm">Apply</button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="order-summary-box">
              <div className="order-summary-title">
                Order Summary
              </div>
              <div className="summary-row">
                <span>Price ({ITEMS.length} items)</span>
                <span>₹{ITEMS.reduce((s, i) => s + i.originalPrice * i.quantity, 0).toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span className="summary-row-discount">−₹{saved.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Charges</span>
                <span style={{ color: shipping === 0 ? "var(--success)" : undefined }}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="summary-row">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              {saved > 0 && (
                <div
                  style={{
                    background: "var(--success-bg)",
                    color: "var(--success)",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "10px 12px",
                    borderRadius: "var(--radius-md)",
                    marginTop: 12,
                    textAlign: "center",
                  }}
                >
                  🎉 You'll save ₹{saved.toLocaleString()} on this order!
                </div>
              )}
              <Link to="/checkout" className="btn btn-primary btn-full btn-lg" style={{ marginTop: 16, borderRadius: "var(--radius-md)" }}>
                Proceed to Checkout →
              </Link>
              <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 10 }}>
                🔒 Safe and Secure Payments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
