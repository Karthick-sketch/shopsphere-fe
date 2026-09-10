import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const CartPage: React.FC = () => {
  const { items, totalAmount, updateQuantity, removeFromCart, clearCart, loading } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="container page-container" style={{ textAlign: "center", padding: "48px 0" }}>
        Loading cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container page-container">
        <div className="card" style={{ textAlign: "center", padding: "48px 24px", maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>Your Cart is Empty</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            You haven't added any products to your shopping cart yet.
          </p>
          <Link to="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>Shopping Cart</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Review items in your cart before checking out.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "flex-start" }}>
        {/* Items Table Card */}
        <div className="card">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const unitPrice = item.product?.price || 0;
                  const itemTotal = unitPrice * item.quantity;
                  return (
                    <tr key={item.id}>
                      <td>
                        <Link to={`/products/${item.productId}`} style={{ fontWeight: "600", color: "var(--text-main)" }}>
                          {item.product?.name || `Product #${item.productId}`}
                        </Link>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                          SKU: {item.product?.sku || "N/A"}
                        </div>
                      </td>
                      <td>₹{unitPrice.toLocaleString()}</td>
                      <td>
                        <div className="qty-control">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <div className="qty-value">{item.quantity}</div>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontWeight: "600" }}>₹{itemTotal.toLocaleString()}</td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={clearCart}>
              Clear Entire Cart
            </button>
            <Link to="/" className="btn btn-secondary btn-sm">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="card">
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Order Summary</h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
            <span style={{ color: "var(--text-muted)" }}>Items Subtotal:</span>
            <span style={{ fontWeight: "600" }}>₹{totalAmount.toLocaleString()}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
            <span style={{ color: "var(--text-muted)" }}>Delivery Fee:</span>
            <span style={{ color: "var(--success)", fontWeight: "500" }}>FREE</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "12px",
              marginTop: "12px",
              borderTop: "1px solid var(--border)",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            <span>Total Payable:</span>
            <span style={{ color: "var(--primary)" }}>₹{totalAmount.toLocaleString()}</span>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
