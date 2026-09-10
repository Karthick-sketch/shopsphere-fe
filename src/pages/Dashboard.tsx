import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import SkeletonRow from "../components/SkeletonRow";
import type { Order } from "../models/order";
import type { OrderStatusType } from "../types/order-status";

const MOCK_ORDERS: Order[] = [
  { id: 1001, userId: 3, totalAmount: 4299, status: "PENDING",   orderDate: "2026-09-09" },
  { id: 1002, userId: 7, totalAmount: 1599, status: "SHIPPED",   orderDate: "2026-09-08" },
  { id: 1003, userId: 2, totalAmount: 8750, status: "DELIVERED", orderDate: "2026-09-07" },
  { id: 1004, userId: 5, totalAmount: 3200, status: "CANCELLED", orderDate: "2026-09-06" },
  { id: 1005, userId: 1, totalAmount: 5450, status: "DELIVERED", orderDate: "2026-09-05" },
];

export default function Dashboard() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's what's happening with ShopSphere.</p>
        </div>
        <button className="btn btn-primary">
          ＋ New Order
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          label="Total Users"
          value="1,284"
          icon="👤"
          iconBg="rgba(99,102,241,0.15)"
          trend="12% this month"
        />
        <StatCard
          label="Total Products"
          value="348"
          icon="📦"
          iconBg="rgba(168,85,247,0.15)"
          trend="5 new today"
        />
        <StatCard
          label="Pending Orders"
          value="27"
          icon="🧾"
          iconBg="rgba(245,158,11,0.15)"
        />
        <StatCard
          label="Total Revenue"
          value="₹2.4L"
          icon="💰"
          iconBg="rgba(34,197,94,0.15)"
          trend="8.3% this week"
        />
        <StatCard
          label="Low Stock Items"
          value="13"
          icon="⚠️"
          iconBg="rgba(239,68,68,0.15)"
        />
        <StatCard
          label="Successful Payments"
          value="97.2%"
          icon="💳"
          iconBg="rgba(6,182,212,0.15)"
          trend="↑ vs last week"
        />
      </div>

      {/* Recent Orders */}
      <div className="table-container section">
        <div className="table-toolbar">
          <div>
            <div className="table-toolbar-title">Recent Orders</div>
          </div>
          <Link to="/orders" className="btn btn-secondary" style={{ fontSize: 13 }}>
            View All →
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link
                    to={`/orders/${order.id}`}
                    style={{ color: "var(--accent-light)", fontWeight: 600 }}
                  >
                    #{order.id}
                  </Link>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>User #{order.userId}</td>
                <td style={{ fontWeight: 600 }}>₹{order.totalAmount.toLocaleString()}</td>
                <td>
                  <Badge variant={order.status as OrderStatusType} />
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{order.orderDate}</td>
              </tr>
            ))}
            <SkeletonRow cols={5} rows={2} />
          </tbody>
        </table>
      </div>

      {/* Bottom two-col */}
      <div className="two-col-grid section">
        {/* Product summary skeleton */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Top Products</div>
              <div className="card-subtitle">By revenue this month</div>
            </div>
            <Link to="/products" className="btn btn-ghost" style={{ fontSize: 12 }}>View →</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <SkeletonRow cols={3} rows={4} />
            </tbody>
          </table>
        </div>

        {/* Inventory summary skeleton */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Inventory Alerts</div>
              <div className="card-subtitle">Items below threshold</div>
            </div>
            <Link to="/inventory" className="btn btn-ghost" style={{ fontSize: 12 }}>View →</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <SkeletonRow cols={3} rows={4} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
