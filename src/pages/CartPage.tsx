import type { Cart, CartItem } from "../models/cart";

const MOCK_CART: Cart = { id: 1, userId: 3 };

const MOCK_ITEMS: (CartItem & { name: string; unitPrice: number; emoji: string })[] = [
  { id: 1, cartId: 1, productId: 1, quantity: 1, name: "Noise-Cancelling Headphones", unitPrice: 4999, emoji: "⚡" },
  { id: 2, cartId: 1, productId: 2, quantity: 2, name: "Slim-Fit Cotton Shirt",        unitPrice: 799,  emoji: "👕" },
  { id: 3, cartId: 1, productId: 5, quantity: 1, name: "Vitamin C Serum",              unitPrice: 699,  emoji: "💄" },
];

export default function CartPage() {
  const subtotal  = MOCK_ITEMS.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const shipping  = 0;
  const tax       = Math.round(subtotal * 0.18);
  const total     = subtotal + shipping + tax;

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-subtitle">Cart #{MOCK_CART.id} · User #{MOCK_CART.userId}</p>
        </div>
        <button className="btn btn-danger">🗑 Clear Cart</button>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="card" style={{ padding: "8px 24px" }}>
          <div
            style={{
              padding: "12px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid var(--border)",
              marginBottom: 4,
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 15 }}>
              Cart Items ({MOCK_ITEMS.length})
            </span>
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>
              Continue Shopping →
            </button>
          </div>

          {MOCK_ITEMS.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div className="cart-item-thumb">{item.emoji}</div>
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-sub">
                  Product #{item.productId} · ₹{item.unitPrice.toLocaleString()} each
                </p>
              </div>
              <div className="cart-item-qty">
                <span className="cart-item-qty-btn">−</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{item.quantity}</span>
                <span className="cart-item-qty-btn">＋</span>
              </div>
              <div className="cart-item-price">
                ₹{(item.unitPrice * item.quantity).toLocaleString()}
              </div>
              <button
                className="btn btn-ghost"
                style={{ padding: "6px 8px", fontSize: 16, color: "var(--danger)" }}
              >
                ×
              </button>
            </div>
          ))}

          {/* Skeleton item */}
          <div className="cart-item-row" style={{ opacity: 0.5 }}>
            <div className="cart-item-thumb skeleton" style={{ width: 56, height: 56 }} />
            <div className="cart-item-info">
              <span className="skeleton skeleton-text" style={{ width: "60%", marginBottom: 8 }} />
              <span className="skeleton skeleton-text" style={{ width: "40%" }} />
            </div>
            <span className="skeleton skeleton-text" style={{ width: 80, height: 32 }} />
            <span className="skeleton skeleton-text" style={{ width: 70 }} />
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>Order Summary</div>
            <div className="order-summary-row">
              <span className="order-summary-label">Subtotal ({MOCK_ITEMS.length} items)</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="order-summary-row">
              <span className="order-summary-label">Shipping</span>
              <span style={{ color: "var(--success)" }}>Free</span>
            </div>
            <div className="order-summary-row">
              <span className="order-summary-label">GST (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="order-summary-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 16, padding: "12px" }}
            >
              Proceed to Checkout →
            </button>
          </div>

          {/* Promo code */}
          <div className="card">
            <p className="card-title" style={{ marginBottom: 12 }}>Promo Code</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                id="cart-promo"
                type="text"
                className="search-input"
                placeholder="Enter promo code"
                style={{ flex: 1, width: "auto" }}
              />
              <button className="btn btn-secondary">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
