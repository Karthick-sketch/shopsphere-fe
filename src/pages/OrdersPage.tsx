import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Order } from "../models/order";
import { orderService } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { StatusBadge } from "../components/StatusBadge";

export const OrdersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = React.useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await orderService.getOrdersByUserId(currentUser.id);
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      if (!currentUser) return;
      setLoading(true);
      try {
        const data = await orderService.getOrdersByUserId(currentUser.id);
        if (!ignore) setOrders(data);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [currentUser]);

  const handleCancel = async (orderId: number) => {
    await orderService.updateOrderStatus(orderId, "CANCELLED");
    await fetchOrders();
  };

  return (
    <div className="container page-container">
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>My Orders</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          View and track orders placed under your account ({currentUser?.email}).
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>No Orders Placed Yet</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
            When you complete a checkout, your orders will be listed here.
          </p>
          <Link to="/" className="btn btn-primary">
            Browse Store
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link to={`/orders/${order.id}`} style={{ fontWeight: "600" }}>
                        #{order.id}
                      </Link>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>
                      {new Date(order.orderDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td style={{ fontWeight: "600" }}>₹{order.totalAmount.toLocaleString()}</td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Link to={`/orders/${order.id}`} className="btn btn-secondary btn-sm" style={{ marginRight: "8px" }}>
                        View Details
                      </Link>
                      {order.status === "PENDING" && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleCancel(order.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
