import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import { paymentService } from "../services/paymentService";
import { inventoryService } from "../services/inventoryService";
import type { PaymentMethodType } from "../types/payment-method";

export const CheckoutPage: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: currentUser?.name || "Alex Johnson",
    addressLine: "123 Market Street, Apt 4B",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560001",
    phone: "+91 9876543210",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("UPI");
  const [upiId, setUpiId] = useState("user@okaxis");
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="container page-container">
        <div className="card" style={{ textAlign: "center", padding: "48px 24px", maxWidth: "500px", margin: "0 auto" }}>
          <h2>No Items to Checkout</h2>
          <p style={{ color: "var(--text-muted)", margin: "12px 0 20px" }}>
            Your cart is currently empty.
          </p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setErrorMsg("Please select an active user session.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      // 1. Create Order
      const orderPayload = {
        userId: currentUser.id,
        totalAmount,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product?.price || 0,
        })),
      };

      const { order } = await orderService.createOrder(orderPayload);

      // 2. Process Payment
      await paymentService.processPayment({
        orderId: order.id,
        amount: totalAmount,
        method: paymentMethod,
      });

      // 3. Deduct Inventory Quantities
      for (const item of items) {
        await inventoryService.updateQuantity(item.productId, -item.quantity);
      }

      // 4. Clear Cart
      await clearCart();

      // 5. Navigate to order confirmation
      navigate(`/orders/${order.id}`);
    } catch {
      setErrorMsg("Failed to place order. Please verify API connectivity and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container page-container">
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>Checkout</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Confirm your delivery details and choose a payment method.
        </p>
      </div>

      {errorMsg && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", background: "var(--danger-bg)", color: "var(--danger)", borderRadius: "var(--radius)", fontSize: "14px" }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", alignItems: "flex-start" }}>
          <div>
            {/* Delivery Address Card */}
            <div className="card" style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>1. Shipping Address</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Address Line</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={shippingAddress.addressLine}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="card">
              <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>2. Payment Method</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={() => setPaymentMethod("UPI")}
                  />
                  <div>
                    <strong>UPI (Google Pay, PhonePe, Paytm)</strong>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Instant digital payment</div>
                  </div>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="CARD"
                    checked={paymentMethod === "CARD"}
                    onChange={() => setPaymentMethod("CARD")}
                  />
                  <div>
                    <strong>Credit / Debit Card</strong>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Visa, Mastercard, RuPay</div>
                  </div>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                  <div>
                    <strong>Cash on Delivery (COD)</strong>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Pay with cash or card upon delivery</div>
                  </div>
                </label>
              </div>

              {/* Contextual Payment Fields */}
              {paymentMethod === "UPI" && (
                <div className="form-group" style={{ background: "var(--bg)", padding: "12px", borderRadius: "var(--radius)" }}>
                  <label className="form-label">UPI ID / VPA</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username@bank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              {paymentMethod === "CARD" && (
                <div style={{ background: "var(--bg)", padding: "12px", borderRadius: "var(--radius)" }}>
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        className="form-control"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="card">
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Order Review</h2>

            <div style={{ maxHeight: "220px", overflowY: "auto", marginBottom: "16px", paddingRight: "4px" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px" }}>
                  <div>
                    <div>{item.product?.name || `Product #${item.productId}`}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: "600" }}>
                    ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px", marginBottom: "8px", display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
              <span style={{ color: "var(--text-muted)" }}>Shipping</span>
              <span style={{ color: "var(--success)" }}>FREE</span>
            </div>

            <div style={{ borderTop: "2px solid var(--border)", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "700" }}>
              <span>Total</span>
              <span style={{ color: "var(--primary)" }}>₹{totalAmount.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "20px" }}
              disabled={submitting}
            >
              {submitting ? "Placing Order..." : `Place Order (₹${totalAmount.toLocaleString()})`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
