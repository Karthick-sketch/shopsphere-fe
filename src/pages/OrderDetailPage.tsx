import { useParams, Link } from "react-router-dom";
import Badge from "../components/Badge";
import SkeletonRow from "../components/SkeletonRow";
import type { Order, OrderItem } from "../models/order";
import type { Payment } from "../models/payment";
import type { OrderStatusType } from "../types/order-status";
import type { PaymentStatusType } from "../types/payment-status";
import type { PaymentMethodType } from "../types/payment-method";

const MOCK_ORDER: Order = {
  id: 1001,
  userId: 3,
  totalAmount: 4299,
  status: "SHIPPED",
  orderDate: "2026-09-09",
};

const MOCK_ITEMS: OrderItem[] = [
  { id: 1, orderId: 1001, productId: 1, quantity: 1, unitPrice: 4999 },
  { id: 2, orderId: 1001, productId: 2, quantity: 2, unitPrice: 799  },
  { id: 3, orderId: 1001, productId: 5, quantity: 1, unitPrice: 699  },
];

const MOCK_PAYMENT: Payment = {
  id: 201,
  orderId: 1001,
  amount: 4299,
  status: "PAID",
  method: "UPI",
  paymentDate: "2026-09-09",
};

const PRODUCT_NAMES: Record<number, string> = {
  1: "Noise-Cancelling Headphones",
  2: "Slim-Fit Cotton Shirt",
  5: "Vitamin C Serum",
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      {/* Back link */}
      <div style={{ marginBottom: 16 }}>
        <Link
          to="/orders"
          style={{ color: "var(--text-secondary)", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          ← Back to Orders
        </Link>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">Order #{id}</h1>
          <p className="page-subtitle">Placed on {MOCK_ORDER.orderDate} · User #{MOCK_ORDER.userId}</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Badge variant={MOCK_ORDER.status as OrderStatusType} />
          <button className="btn btn-secondary">Update Status</button>
          <button className="btn btn-primary">Print Invoice</button>
        </div>
      </div>

      {/* Info grid + Payment card */}
      <div className="two-col-grid" style={{ marginBottom: 24 }}>
        {/* Order Info */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Order Details</div>
          </div>
          <div className="info-grid">
            <div>
              <p className="info-item-label">Order ID</p>
              <p className="info-item-value" style={{ fontFamily: "monospace" }}>#{MOCK_ORDER.id}</p>
            </div>
            <div>
              <p className="info-item-label">User ID</p>
              <p className="info-item-value">#{MOCK_ORDER.userId}</p>
            </div>
            <div>
              <p className="info-item-label">Order Date</p>
              <p className="info-item-value">{MOCK_ORDER.orderDate}</p>
            </div>
            <div>
              <p className="info-item-label">Total Amount</p>
              <p className="info-item-value" style={{ fontWeight: 700, fontSize: 16 }}>
                ₹{MOCK_ORDER.totalAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="info-item-label">Status</p>
              <Badge variant={MOCK_ORDER.status as OrderStatusType} />
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Payment</div>
            <Link to="/payments" style={{ fontSize: 12, color: "var(--accent-light)" }}>
              View All →
            </Link>
          </div>
          <div className="info-grid">
            <div>
              <p className="info-item-label">Payment ID</p>
              <p className="info-item-value" style={{ fontFamily: "monospace" }}>#{MOCK_PAYMENT.id}</p>
            </div>
            <div>
              <p className="info-item-label">Amount</p>
              <p className="info-item-value" style={{ fontWeight: 700 }}>
                ₹{MOCK_PAYMENT.amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="info-item-label">Method</p>
              <Badge variant={MOCK_PAYMENT.method as PaymentMethodType} />
            </div>
            <div>
              <p className="info-item-label">Status</p>
              <Badge variant={MOCK_PAYMENT.status as PaymentStatusType} />
            </div>
            <div>
              <p className="info-item-label">Payment Date</p>
              <p className="info-item-value">{MOCK_PAYMENT.paymentDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="table-container section">
        <div className="table-toolbar">
          <div className="table-toolbar-title">Order Items</div>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {MOCK_ITEMS.length} items
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ITEMS.map((item) => (
              <tr key={item.id}>
                <td style={{ fontFamily: "monospace", color: "var(--text-muted)" }}>#{item.id}</td>
                <td style={{ fontWeight: 500 }}>{PRODUCT_NAMES[item.productId] ?? `Product #${item.productId}`}</td>
                <td style={{ color: "var(--text-secondary)" }}>₹{item.unitPrice.toLocaleString()}</td>
                <td>× {item.quantity}</td>
                <td style={{ fontWeight: 700 }}>
                  ₹{(item.unitPrice * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
            <SkeletonRow cols={5} rows={1} />
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 300, marginLeft: "auto" }}>
            <div className="order-summary-row">
              <span className="order-summary-label">Subtotal</span>
              <span>₹{MOCK_ITEMS.reduce((s, i) => s + i.unitPrice * i.quantity, 0).toLocaleString()}</span>
            </div>
            <div className="order-summary-row">
              <span className="order-summary-label">Shipping</span>
              <span style={{ color: "var(--success)" }}>Free</span>
            </div>
            <div className="order-summary-row total">
              <span>Total</span>
              <span>₹{MOCK_ORDER.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
