import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchOrders } from "../api/order-service";
import type { Order } from "../models/order";
import "./OrdersPage.css";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function OrdersPage() {
  const location = useLocation();
  const justPlaced = Boolean(
    (location.state as { justPlaced?: boolean } | null)?.justPlaced,
  );

  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    fetchOrders()
      .then((data) => {
        if (!cancelled) {
          setOrders(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page orders-page">
      <h1 className="orders-page__title">Orders</h1>

      {justPlaced && (
        <div className="orders-banner">
          Order confirmed — thanks! A receipt would normally be emailed from
          here.
        </div>
      )}

      {status === "loading" && (
        <p className="orders-state">Loading order history…</p>
      )}

      {status === "error" && (
        <p className="orders-state orders-state--error">
          Couldn't reach the order history. Make sure the mock backend is
          running on port 4000.
        </p>
      )}

      {status === "ready" && orders.length === 0 && (
        <div className="orders-empty">
          <p>No orders yet.</p>
          <Link to="/" className="btn btn-primary">
            Start shopping
          </Link>
        </div>
      )}

      {status === "ready" && orders.length > 0 && (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-card">
              <div className="order-card__head">
                <div>
                  <p className="order-card__id">Order #{order.id}</p>
                  <p className="order-card__date">
                    {formatDate(order.placedAt)}
                  </p>
                </div>
                <span className="order-card__status">{order.status}</span>
              </div>

              <ul className="order-card__items">
                {order.items.map((item) => (
                  <li key={item.productSummary.id} className="order-card__item">
                    <img src={item.productSummary.image} alt="" />
                    <div>
                      <p className="order-card__item-name">
                        {item.productSummary.name}
                      </p>
                      <p className="order-card__item-meta">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="order-card__foot">
                <span>Shipped to {order.shippingName}</span>
                <span className="order-card__total">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
