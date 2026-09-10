import { Link } from "react-router-dom";
import type { User } from "../models/user";
import type { UserRoleType } from "../types/user-role";

const ME: User = { id: 3, name: "Aisha Patel", email: "aisha@example.com", password: "***", role: "USER" };

const ROLE_LABEL: Record<UserRoleType, string> = { ADMIN: "Admin", USER: "Member" };

const SAVED_ADDRESSES = [
  { id: 1, tag: "Home", name: "Aisha Patel", line: "301, Sunrise Apartments, Andheri West", city: "Mumbai", pin: "400053", phone: "+91 98765 43210" },
  { id: 2, tag: "Work", name: "Aisha Patel", line: "TechPark, 5th Floor, Powai", city: "Mumbai", pin: "400076", phone: "+91 98765 43210" },
];

const SAVED_CARDS = [
  { id: 1, type: "💳", last4: "4242", network: "Visa", expiry: "09/28" },
  { id: 2, type: "💳", last4: "8888", network: "Mastercard", expiry: "12/27" },
];

const NAV_ITEMS = [
  { icon: "📦", label: "My Orders", to: "/orders" },
  { icon: "📍", label: "Manage Addresses", to: "#" },
  { icon: "💳", label: "Saved Cards & UPI", to: "#" },
  { icon: "🔔", label: "Notifications", to: "#" },
  { icon: "🎁", label: "Coupons & Offers", to: "#" },
  { icon: "⭐", label: "Wishlist", to: "#" },
  { icon: "🔒", label: "Privacy Settings", to: "#" },
  { icon: "🔑", label: "Change Password", to: "#" },
  { icon: "🚪", label: "Log Out", to: "#" },
];

export default function AccountPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>My Account</span>
          </nav>
          <h1 className="page-title">My Account</h1>
        </div>
      </div>

      <div className="container" style={{ padding: "28px 20px" }}>
        <div className="account-layout">
          {/* Sidebar */}
          <aside className="account-sidebar">
            <div className="account-sidebar-profile">
              <div className="account-avatar">{ME.name.charAt(0)}</div>
              <p className="account-name">{ME.name}</p>
              <p className="account-email">{ME.email}</p>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                  padding: "2px 10px",
                  borderRadius: "var(--radius-full)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {ROLE_LABEL[ME.role as UserRoleType]}
              </span>
            </div>
            <nav className="account-nav">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`account-nav-link ${item.to === "#" ? "" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div>
            {/* Profile Info */}
            <div className="account-section">
              <div className="account-section-header">
                <p className="account-section-title">👤 Personal Information</p>
                <button className="btn btn-ghost btn-sm" style={{ color: "var(--accent)" }}>Edit</button>
              </div>
              <div className="account-section-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 4 }}>Full Name</p>
                    <p style={{ fontSize: 15, fontWeight: 600 }}>{ME.name}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 4 }}>Email Address</p>
                    <p style={{ fontSize: 15 }}>{ME.email}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 4 }}>Phone Number</p>
                    <p style={{ fontSize: 15 }}>+91 98765 43210</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 4 }}>Date of Birth</p>
                    <p style={{ fontSize: 15 }}>April 15, 1997</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Addresses */}
            <div className="account-section">
              <div className="account-section-header">
                <p className="account-section-title">📍 Saved Addresses</p>
                <button className="btn btn-accent btn-sm">＋ Add Address</button>
              </div>
              <div className="account-section-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {SAVED_ADDRESSES.map((addr) => (
                    <div
                      key={addr.id}
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        padding: 16,
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          fontSize: 11,
                          fontWeight: 700,
                          background: "var(--accent-light)",
                          color: "var(--accent)",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-full)",
                        }}
                      >
                        {addr.tag}
                      </span>
                      <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{addr.name}</p>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        {addr.line}<br />
                        {addr.city} — {addr.pin}<br />
                        {addr.phone}
                      </p>
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)", fontSize: 12 }}>Edit</button>
                        <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)", fontSize: 12, color: "var(--danger)" }}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Saved Payment Methods */}
            <div className="account-section">
              <div className="account-section-header">
                <p className="account-section-title">💳 Saved Payment Methods</p>
                <button className="btn btn-accent btn-sm">＋ Add Card</button>
              </div>
              <div className="account-section-body">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {SAVED_CARDS.map((card) => (
                    <div
                      key={card.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        padding: "12px 16px",
                      }}
                    >
                      <span style={{ fontSize: 24 }}>{card.type}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, fontSize: 14 }}>
                          {card.network} ending in {card.last4}
                        </p>
                        <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                          Expires {card.expiry}
                        </p>
                      </div>
                      <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)", color: "var(--danger)", fontSize: 12 }}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders quick view */}
            <div className="account-section">
              <div className="account-section-header">
                <p className="account-section-title">📦 Recent Orders</p>
                <Link to="/orders" style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>
                  View All →
                </Link>
              </div>
              <div className="account-section-body">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { id: 1003, name: "4K Smart TV + Headphones",   status: "Delivered", date: "Sep 7", amount: 8750 },
                    { id: 1002, name: "Yoga Mat Pro",                status: "Shipped",   date: "Sep 8", amount: 1599 },
                    { id: 1001, name: "Cotton Shirt × 2 + Serum",   status: "Pending",   date: "Sep 9", amount: 4299 },
                  ].map((o) => (
                    <div
                      key={o.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--border)",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 14 }}>{o.name}</p>
                        <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
                          #{o.id} · {o.date}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontWeight: 700 }}>₹{o.amount.toLocaleString()}</span>
                        <Link to={`/orders/${o.id}`} className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)", fontSize: 12 }}>
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
