import { NavLink, useLocation } from "react-router-dom";

interface NavItem {
  to: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: "/", icon: "▦", label: "Dashboard" },
  { to: "/users", icon: "👤", label: "Users" },
  { to: "/products", icon: "📦", label: "Products" },
  { to: "/inventory", icon: "🗃️", label: "Inventory" },
  { to: "/orders", icon: "🧾", label: "Orders" },
  { to: "/cart", icon: "🛒", label: "Cart" },
  { to: "/payments", icon: "💳", label: "Payments" },
];

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/users": "Users",
  "/products": "Products",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/cart": "Cart",
  "/payments": "Payments",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Match order detail sub-routes
  const pageTitle =
    PAGE_TITLES[location.pathname] ??
    (location.pathname.startsWith("/orders/") ? "Order Detail" : "ShopSphere");

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🛍️</div>
          <span className="sidebar-logo-text">ShopSphere</span>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-section-label">Main Menu</p>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `sidebar-link${isActive ? " active" : ""}`
                }
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main-content">
        <header className="top-header">
          <div className="header-breadcrumb">
            <span>ShopSphere</span>
            <span style={{ color: "var(--text-muted)" }}>›</span>
            <span className="header-breadcrumb-current">{pageTitle}</span>
          </div>
          <div className="header-actions">
            <div className="header-avatar">A</div>
          </div>
        </header>

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
