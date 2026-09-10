import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import SkeletonRow from "../components/SkeletonRow";
import type { Order } from "../models/order";
import type { OrderStatusType } from "../types/order-status";

const MOCK_ORDERS: Order[] = [
  { id: 1001, userId: 3, totalAmount: 4299,  status: "PENDING",   orderDate: "2026-09-09" },
  { id: 1002, userId: 7, totalAmount: 1599,  status: "SHIPPED",   orderDate: "2026-09-08" },
  { id: 1003, userId: 2, totalAmount: 8750,  status: "DELIVERED", orderDate: "2026-09-07" },
  { id: 1004, userId: 5, totalAmount: 3200,  status: "CANCELLED", orderDate: "2026-09-06" },
  { id: 1005, userId: 1, totalAmount: 5450,  status: "DELIVERED", orderDate: "2026-09-05" },
  { id: 1006, userId: 9, totalAmount: 2100,  status: "PENDING",   orderDate: "2026-09-04" },
];

export default function OrdersPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Orders</h1>
          <p className="page-subtitle">Track and manage customer orders.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary">Export</button>
          <button className="btn btn-primary">＋ New Order</button>
        </div>
      </div>

      {/* Status filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["All", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
          <button
            key={s}
            className="btn btn-secondary"
            style={{
              padding: "6px 14px",
              fontSize: 12,
              ...(s === "All"
                ? { background: "var(--accent-glow)", color: "var(--accent-light)", borderColor: "var(--border-active)" }
                : {}),
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-toolbar-title">All Orders</div>
          <div className="search-input-wrap">
            <span className="search-input-icon">🔍</span>
            <input
              id="orders-search"
              type="text"
              className="search-input"
              placeholder="Search order ID or user…"
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id}>
                <td>
                  <span style={{ fontFamily: "monospace", color: "var(--accent-light)", fontWeight: 600 }}>
                    #{order.id}
                  </span>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>User #{order.userId}</td>
                <td style={{ fontWeight: 700 }}>₹{order.totalAmount.toLocaleString()}</td>
                <td>
                  <Badge variant={order.status as OrderStatusType} />
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{order.orderDate}</td>
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link
                      to={`/orders/${order.id}`}
                      className="btn btn-ghost"
                      style={{ padding: "5px 10px", fontSize: 12 }}
                    >
                      View
                    </Link>
                    <button className="btn btn-secondary" style={{ padding: "5px 10px", fontSize: 12 }}>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <SkeletonRow cols={6} rows={3} />
          </tbody>
        </table>

        <div className="table-footer">
          Showing {MOCK_ORDERS.length} of 1,048 orders
        </div>
      </div>
    </>
  );
}
