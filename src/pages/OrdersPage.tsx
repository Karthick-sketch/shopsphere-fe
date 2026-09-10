import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import type { Order } from "../models/order";
import type { OrderStatusType } from "../types/order-status";

type OrderFull = Order & {
  items: { emoji: string; name: string; qty: number }[];
};

const MOCK_ORDERS: OrderFull[] = [
  {
    id: 1003,
    userId: 3,
    totalAmount: 8750,
    status: "DELIVERED",
    orderDate: "2026-09-07",
    items: [
      { emoji: "📺", name: "4K Smart TV 43-inch", qty: 1 },
      { emoji: "🎧", name: "Noise-Cancelling Headphones", qty: 1 },
    ],
  },
  {
    id: 1002,
    userId: 3,
    totalAmount: 1599,
    status: "SHIPPED",
    orderDate: "2026-09-08",
    items: [{ emoji: "🧘", name: "Yoga Mat Pro — Non-Slip 6mm", qty: 1 }],
  },
  {
    id: 1001,
    userId: 3,
    totalAmount: 4299,
    status: "PENDING",
    orderDate: "2026-09-09",
    items: [
      { emoji: "👕", name: "Slim-Fit Cotton Shirt", qty: 2 },
      { emoji: "🧴", name: "Vitamin C Brightening Serum", qty: 1 },
    ],
  },
  {
    id: 1000,
    userId: 3,
    totalAmount: 3200,
    status: "CANCELLED",
    orderDate: "2026-08-25",
    items: [{ emoji: "📚", name: "Clean Code — Robert C. Martin", qty: 2 }],
  },
];

export default function OrdersPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link to="/account">Account</Link>
            <span className="breadcrumb-sep">›</span>
            <span>My Orders</span>
          </nav>
          <h1 className="page-title">My Orders</h1>
        </div>
      </div>

      <div className="container" style={{ padding: "28px 20px" }}>
        {/* Filter bar */}
        <div
          style={{
            background: "var(--bg-white)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            flexWrap: "wrap",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <div className="search-box" style={{ flex: 1, minWidth: 220 }}>
            <span className="search-box-icon">🔍</span>
            <input
              id="orders-search"
              className="search-box-input"
              type="text"
              placeholder="Search by order ID or product name…"
            />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((s, i) => (
              <button
                key={s}
                className="btn btn-ghost btn-sm"
                style={{
                  border: "1px solid var(--border)",
                  ...(i === 0 ? { background: "var(--accent)", color: "white", borderColor: "var(--accent)" } : {}),
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="orders-list">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="order-card">
              {/* Header */}
              <div className="order-card-header">
                <div className="order-card-header-item">
                  <span className="order-card-header-label">Order Placed</span>
                  <span className="order-card-header-value">{order.orderDate}</span>
                </div>
                <div className="order-card-header-item">
                  <span className="order-card-header-label">Total</span>
                  <span className="order-card-header-value">₹{order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="order-card-header-item">
                  <span className="order-card-header-label">Status</span>
                  <Badge variant={order.status as OrderStatusType} />
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <span className="order-card-header-label">Order # {order.id}</span>
                </div>
              </div>

              {/* Body */}
              <div className="order-card-body">
                <div className="order-card-items">
                  {order.items.map((item) => (
                    <div key={item.name} className="order-card-item">
                      <div className="order-card-item-img">{item.emoji}</div>
                      <div>
                        <p className="order-card-item-name">{item.name}</p>
                        <p className="order-card-item-qty">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-card-actions">
                  <Link
                    to={`/orders/${order.id}`}
                    className="btn btn-accent btn-sm"
                    style={{ textAlign: "center" }}
                  >
                    {order.status === "SHIPPED" ? "Track Package" : "View Details"}
                  </Link>
                  {order.status === "DELIVERED" && (
                    <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)" }}>
                      Buy Again
                    </button>
                  )}
                  {order.status === "PENDING" && (
                    <button className="btn btn-danger btn-sm">
                      Cancel Order
                    </button>
                  )}
                  {order.status === "DELIVERED" && (
                    <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)", fontSize: 12 }}>
                      Write a Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
