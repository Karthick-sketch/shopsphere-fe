import { Link } from "react-router-dom";
import type { PaymentMethodType } from "../types/payment-method";

const PAYMENT_METHODS: { value: PaymentMethodType; label: string; icon: string; desc: string }[] = [
  { value: "UPI",  label: "UPI",         icon: "📲", desc: "Pay via UPI apps" },
  { value: "CARD", label: "Credit/Debit", icon: "💳", desc: "Visa, Mastercard, Rupay" },
  { value: "COD",  label: "Cash on Delivery", icon: "💵", desc: "Pay when delivered" },
];

export default function CheckoutPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link to="/cart">Cart</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Checkout</span>
          </nav>
          <h1 className="page-title">Secure Checkout</h1>
        </div>
      </div>

      <div className="container" style={{ padding: "28px 20px" }}>
        <div className="checkout-layout">
          <div>
            {/* Step 1 — Login */}
            <div className="checkout-step">
              <div className="checkout-step-header">
                <div className="checkout-step-num completed">✓</div>
                <div>
                  <p className="checkout-step-title">Login / Account</p>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    Aisha Patel · aisha@example.com
                  </p>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto", color: "var(--accent)" }}>
                  Change
                </button>
              </div>
            </div>

            {/* Step 2 — Delivery Address */}
            <div className="checkout-step">
              <div className="checkout-step-header">
                <div className="checkout-step-num">2</div>
                <p className="checkout-step-title">Delivery Address</p>
              </div>
              <div className="checkout-step-body">
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label" htmlFor="first-name">First Name</label>
                    <input id="first-name" type="text" className="form-input" placeholder="Aisha" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="last-name">Last Name</label>
                    <input id="last-name" type="text" className="form-input" placeholder="Patel" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input id="phone" type="tel" className="form-input" placeholder="+91 98765 43210" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="pincode">PIN Code</label>
                    <input id="pincode" type="text" className="form-input" placeholder="400001" />
                  </div>
                  <div className="form-field full">
                    <label className="form-label" htmlFor="address">Address</label>
                    <input id="address" type="text" className="form-input" placeholder="House No, Street Name, Area" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="city">City / Town</label>
                    <input id="city" type="text" className="form-input" placeholder="Mumbai" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="state">State</label>
                    <select id="state" className="form-input sort-select">
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                      <option>Gujarat</option>
                    </select>
                  </div>
                  <div className="form-field full">
                    <label className="form-label" htmlFor="address-type">Address Type</label>
                    <div style={{ display: "flex", gap: 12 }}>
                      {["Home", "Work", "Other"].map((t) => (
                        <label key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                          <input type="radio" name="addr-type" defaultChecked={t === "Home"} />
                          {t}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="btn btn-accent btn-sm" style={{ marginTop: 16 }}>
                  Save and Deliver Here
                </button>
              </div>
            </div>

            {/* Step 3 — Payment */}
            <div className="checkout-step">
              <div className="checkout-step-header">
                <div className="checkout-step-num">3</div>
                <p className="checkout-step-title">Payment Method</p>
              </div>
              <div className="checkout-step-body">
                <div className="payment-method-grid">
                  {PAYMENT_METHODS.map((m, i) => (
                    <div key={m.value} className={`payment-method-option${i === 0 ? " selected" : ""}`}>
                      <div className="payment-method-icon">{m.icon}</div>
                      <div className="payment-method-label">{m.label}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.desc}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 20 }} className="info-strip">
                  <span>📲</span>
                  Enter your UPI ID below to pay securely
                </div>

                <div className="form-field" style={{ marginTop: 14 }}>
                  <label className="form-label" htmlFor="upi-id">UPI ID</label>
                  <input id="upi-id" type="text" className="form-input" placeholder="yourname@upi" />
                </div>

                <button className="btn btn-accent btn-lg" style={{ marginTop: 16 }}>
                  🔒 Pay ₹9,031 Securely
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="order-summary-box">
              <div className="order-summary-title">Price Details (3 items)</div>
              <div className="summary-row"><span>Total MRP</span><span>₹10,397</span></div>
              <div className="summary-row"><span>Discount</span><span className="summary-row-discount">−₹1,366</span></div>
              <div className="summary-row"><span>Delivery</span><span style={{ color: "var(--success)" }}>FREE</span></div>
              <div className="summary-row"><span>GST (18%)</span><span>₹1,620</span></div>
              <div className="summary-row total"><span>Total</span><span>₹9,031</span></div>
              <div style={{ background: "var(--success-bg)", color: "var(--success)", fontSize: 13, fontWeight: 600, padding: "10px 12px", borderRadius: "var(--radius-md)", marginTop: 12, textAlign: "center" }}>
                🎉 You'll save ₹1,366 on this order!
              </div>
            </div>

            <div className="card" style={{ marginTop: 12 }}>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
                🔒 Safe and Secure Payments. 100% Authentic Products. Easy Returns Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
