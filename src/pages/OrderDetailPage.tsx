import { Link, useParams } from "react-router-dom";
import Badge from "../components/Badge";
import type { Order, OrderItem } from "../models/order";
import type { Payment } from "../models/payment";
import type { OrderStatusType } from "../types/order-status";
import type { PaymentStatusType } from "../types/payment-status";
import type { PaymentMethodType } from "../types/payment-method";

const MOCK_ORDER: Order = { id: 1002, userId: 3, totalAmount: 1599, status: "SHIPPED", orderDate: "2026-09-08" };

const MOCK_ITEMS: (OrderItem & { name: string; emoji: string })[] = [
  { id: 1, orderId: 1002, productId: 6, quantity: 1, unitPrice: 1599, name: "Yoga Mat Pro — Non-Slip 6mm", emoji: "🧘" },
];

const MOCK_PAYMENT: Payment = { id: 202, orderId: 1002, amount: 1599, status: "PAID", method: "UPI", paymentDate: "2026-09-08" };

const METHOD_LABEL: Record<PaymentMethodType, string> = { COD: "Cash on Delivery", UPI: "UPI", CARD: "Credit / Debit Card" };
const METHOD_ICON:  Record<PaymentMethodType, string> = { COD: "💵", UPI: "📲", CARD: "💳" };

const STATUS_LABEL: Record<PaymentStatusType, string> = { PENDING: "Pending", PAID: "Paid", FAILED: "Failed" };

const TRACKING_STEPS = [
  { label: "Order Placed",     date: "Sep 8, 2026, 10:31 AM",    done: true,  active: false },
  { label: "Payment Received", date: "Sep 8, 2026, 10:32 AM",    done: true,  active: false },
  { label: "Packed",           date: "Sep 8, 2026, 4:00 PM",     done: true,  active: false },
  { label: "Shipped",          date: "Sep 9, 2026, 7:15 AM",     done: false, active: true  },
  { label: "Out for Delivery", date: "Expected Sep 11, 2026",     done: false, active: false },
  { label: "Delivered",        date: "Expected Sep 11, 2026",     done: false, active: false },
];

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page-wrapper">
      <div className="page-header-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link to="/orders">My Orders</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Order #{id}</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6, flexWrap: "wrap" }}>
            <h1 className="page-title">Order #{id}</h1>
            <Badge variant={MOCK_ORDER.status as OrderStatusType} />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "28px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
          <div>
            {/* Tracking */}
            <div className="card" style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>📦 Package Tracking</h2>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
                Estimated delivery: <strong>September 11, 2026</strong>
              </p>

              <div className="tracking-timeline">
                {TRACKING_STEPS.map((step, i) => (
                  <div key={step.label} className="tracking-step">
                    <div className="tracking-step-left">
                      <div
                        className={`tracking-step-dot ${step.done ? "done" : step.active ? "active" : ""}`}
                      >
                        {step.done ? "✓" : step.active ? "→" : "○"}
                      </div>
                      {i < TRACKING_STEPS.length - 1 && (
                        <div className={`tracking-step-line ${step.done ? "done" : ""}`} />
                      )}
                    </div>
                    <div className="tracking-step-content">
                      <p className={`tracking-step-title ${!step.done && !step.active ? "muted" : ""}`}>
                        {step.label}
                      </p>
                      <p className="tracking-step-date">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="card">
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order Items</h2>
              {MOCK_ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid var(--border)" }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Link to={`/products/${item.productId}`} style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
                      {item.name}
                    </Link>
                    <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "4px 0" }}>
                      Qty: {item.quantity}  ·  Unit Price: ₹{item.unitPrice.toLocaleString()}
                    </p>
                    <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                      <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)" }}>
                        Buy Again
                      </button>
                      <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)" }}>
                        Write a Review
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                    ₹{(item.unitPrice * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}

              {/* Totals */}
              <div style={{ maxWidth: 280, marginLeft: "auto", marginTop: 16 }}>
                <div className="summary-row"><span>Item Subtotal</span><span>₹{MOCK_ORDER.totalAmount.toLocaleString()}</span></div>
                <div className="summary-row"><span>Shipping</span><span style={{ color: "var(--success)" }}>FREE</span></div>
                <div className="summary-row total"><span>Order Total</span><span>₹{MOCK_ORDER.totalAmount.toLocaleString()}</span></div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Payment info */}
            <div className="card">
              <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Payment Information</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)" }}>Method</span>
                  <span style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                    {METHOD_ICON[MOCK_PAYMENT.method as PaymentMethodType]} {METHOD_LABEL[MOCK_PAYMENT.method as PaymentMethodType]}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)" }}>Amount Paid</span>
                  <span style={{ fontWeight: 700 }}>₹{MOCK_PAYMENT.amount.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)" }}>Status</span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: MOCK_PAYMENT.status === "PAID" ? "var(--success)" : "var(--danger)",
                    }}
                  >
                    {STATUS_LABEL[MOCK_PAYMENT.status as PaymentStatusType]}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-secondary)" }}>Date</span>
                  <span>{MOCK_PAYMENT.paymentDate}</span>
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div className="card">
              <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>Delivery Address</h3>
              <p style={{ fontSize: 14, fontWeight: 600 }}>Aisha Patel</p>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                301, Sunrise Apartments<br />
                Andheri West, Mumbai — 400053<br />
                Maharashtra<br />
                📞 +91 98765 43210
              </p>
            </div>

            {/* Actions */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)" }}>
                🖨️ Print Invoice
              </button>
              {MOCK_ORDER.status === "PENDING" && (
                <button className="btn btn-danger btn-sm">Cancel Order</button>
              )}
              {MOCK_ORDER.status === "DELIVERED" && (
                <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)" }}>
                  ↩️ Return / Exchange
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
