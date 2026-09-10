import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Order, OrderItem } from "../models/order";
import type { Payment } from "../models/payment";
import type { Product } from "../models/product";
import { orderService } from "../services/orderService";
import { paymentService } from "../services/paymentService";
import { productService } from "../services/productService";
import { StatusBadge } from "../components/StatusBadge";

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (!id) return;
      setLoading(true);
      try {
        const orderId = Number(id);
        const [orderData, paymentData, allProducts] = await Promise.all([
          orderService.getOrderById(orderId),
          paymentService.getPaymentByOrderId(orderId),
          productService.getProducts(),
        ]);

        if (orderData) {
          setOrder(orderData.order);
          setItems(orderData.items);
        }
        setPayment(paymentData || null);
        setProducts(allProducts);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container page-container" style={{ textAlign: "center", padding: "48px 0" }}>
        Loading order #{id}...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container page-container">
        <div className="card" style={{ textAlign: "center", padding: "48px 0" }}>
          <h2>Order Not Found</h2>
          <p style={{ color: "var(--text-muted)", margin: "12px 0 20px" }}>
            The order you requested does not exist.
          </p>
          <Link to="/orders" className="btn btn-primary">
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="breadcrumb">
        <Link to="/orders">My Orders</Link>
        <span>/</span>
        <span style={{ color: "var(--text-main)" }}>Order #{order.id}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>Order #{order.id}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Placed on{" "}
            {new Date(order.orderDate).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>Order Status:</span>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Grid of Items and Payment Details */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "flex-start" }}>
        {/* Items Table */}
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Ordered Items</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th style={{ textAlign: "right" }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <tr key={item.id}>
                      <td>
                        <Link to={`/products/${item.productId}`} style={{ fontWeight: "600" }}>
                          {product?.name || `Product #${item.productId}`}
                        </Link>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                          SKU: {product?.sku || "N/A"}
                        </div>
                      </td>
                      <td>₹{item.unitPrice.toLocaleString()}</td>
                      <td>{item.quantity}</td>
                      <td style={{ textAlign: "right", fontWeight: "600" }}>
                        ₹{(item.unitPrice * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
            <div style={{ width: "240px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                <span style={{ color: "var(--text-muted)" }}>Subtotal:</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                <span style={{ color: "var(--text-muted)" }}>Shipping:</span>
                <span style={{ color: "var(--success)" }}>FREE</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "700", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
                <span>Grand Total:</span>
                <span style={{ color: "var(--primary)" }}>₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Delivery Summary */}
        <div>
          <div className="card" style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Payment Details</h2>
            {payment ? (
              <div style={{ fontSize: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Payment ID:</span>
                  <span>#{payment.id}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Payment Method:</span>
                  <StatusBadge method={payment.method} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Payment Status:</span>
                  <StatusBadge status={payment.status} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Amount:</span>
                  <span style={{ fontWeight: "600" }}>₹{payment.amount.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Processed On:</span>
                  <span style={{ fontSize: "13px" }}>
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                No payment record found for this order.
              </p>
            )}
          </div>

          <div className="card">
            <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>Need Assistance?</h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>
              Have questions regarding delivery, replacement, or cancellations?
            </p>
            <Link to="/" className="btn btn-secondary btn-sm" style={{ width: "100%" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
