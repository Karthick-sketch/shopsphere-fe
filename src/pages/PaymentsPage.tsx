import Badge from "../components/Badge";
import SkeletonRow from "../components/SkeletonRow";
import type { Payment } from "../models/payment";
import type { PaymentStatusType } from "../types/payment-status";
import type { PaymentMethodType } from "../types/payment-method";

const MOCK_PAYMENTS: Payment[] = [
  { id: 201, orderId: 1001, amount: 4299,  status: "PAID",    method: "UPI",  paymentDate: "2026-09-09" },
  { id: 202, orderId: 1002, amount: 1599,  status: "PENDING", method: "COD",  paymentDate: "2026-09-08" },
  { id: 203, orderId: 1003, amount: 8750,  status: "PAID",    method: "CARD", paymentDate: "2026-09-07" },
  { id: 204, orderId: 1004, amount: 3200,  status: "FAILED",  method: "UPI",  paymentDate: "2026-09-06" },
  { id: 205, orderId: 1005, amount: 5450,  status: "PAID",    method: "CARD", paymentDate: "2026-09-05" },
  { id: 206, orderId: 1006, amount: 2100,  status: "PENDING", method: "COD",  paymentDate: "2026-09-04" },
];

export default function PaymentsPage() {
  const total    = MOCK_PAYMENTS.reduce((s, p) => s + p.amount, 0);
  const paid     = MOCK_PAYMENTS.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0);
  const pending  = MOCK_PAYMENTS.filter((p) => p.status === "PENDING").reduce((s, p) => s + p.amount, 0);
  const failed   = MOCK_PAYMENTS.filter((p) => p.status === "FAILED").reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">Monitor payment transactions and statuses.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary">Export Report</button>
        </div>
      </div>

      {/* Summary strip */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Total Collected",  value: `₹${total.toLocaleString()}`,   color: "var(--accent-light)",  bg: "var(--accent-glow)" },
          { label: "Paid",             value: `₹${paid.toLocaleString()}`,    color: "var(--success)",       bg: "var(--success-bg)" },
          { label: "Pending",          value: `₹${pending.toLocaleString()}`, color: "var(--warning)",       bg: "var(--warning-bg)" },
          { label: "Failed",           value: `₹${failed.toLocaleString()}`,  color: "var(--danger)",        bg: "var(--danger-bg)" },
        ].map((s) => (
          <div
            key={s.label}
            className="card"
            style={{ flex: "1 1 160px", padding: "16px 20px" }}
          >
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 8 }}>
              {s.label}
            </p>
            <p style={{ fontSize: 22, fontWeight: 800, color: s.color }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-toolbar-title">All Transactions</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="search-input-wrap">
              <span className="search-input-icon">🔍</span>
              <input
                id="payments-search"
                type="text"
                className="search-input"
                placeholder="Search payments…"
              />
            </div>
            <button className="btn btn-secondary">Filter ▾</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYMENTS.map((payment) => (
              <tr key={payment.id}>
                <td style={{ fontFamily: "monospace", color: "var(--text-muted)" }}>
                  #{payment.id}
                </td>
                <td>
                  <span style={{ color: "var(--accent-light)", fontFamily: "monospace", fontWeight: 600 }}>
                    #{payment.orderId}
                  </span>
                </td>
                <td style={{ fontWeight: 700 }}>₹{payment.amount.toLocaleString()}</td>
                <td>
                  <Badge variant={payment.method as PaymentMethodType} />
                </td>
                <td>
                  <Badge variant={payment.status as PaymentStatusType} />
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{payment.paymentDate}</td>
              </tr>
            ))}
            <SkeletonRow cols={6} rows={3} />
          </tbody>
        </table>

        <div className="table-footer">
          Showing {MOCK_PAYMENTS.length} of 3,712 transactions
        </div>
      </div>
    </>
  );
}
