import { Link } from "react-router-dom";

const CATEGORIES = [
  "Electronics", "Clothing", "Books", "Home", "Beauty", "Sports", "Toys", "Grocery",
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🛍️ Shop<span className="navbar-logo-sphere">Sphere</span>
        </Link>

        {/* Search */}
        <div className="navbar-search">
          <input
            id="navbar-search"
            type="text"
            className="navbar-search-input"
            placeholder="Search products, brands and more…"
            aria-label="Search products"
          />
          <button className="navbar-search-btn" aria-label="Search">🔍</button>
        </div>

        {/* Actions */}
        <nav className="navbar-actions">
          <Link to="/account" className="navbar-action">
            <span className="navbar-action-sub">Hello, Sign in</span>
            <span className="navbar-action-main">Account ▾</span>
          </Link>
          <Link to="/orders" className="navbar-action">
            <span className="navbar-action-sub">Returns &amp;</span>
            <span className="navbar-action-main">Orders</span>
          </Link>
          <Link to="/cart" className="navbar-cart">
            <span className="navbar-cart-icon">🛒</span>
            <span className="navbar-cart-count">3</span>
            <span>Cart</span>
          </Link>
        </nav>
      </div>

      {/* Category stripe */}
      <div className="navbar-categories">
        <div className="navbar-categories-inner">
          <span className="navbar-cat-link" style={{ fontWeight: 700 }}>☰ All</span>
          {CATEGORIES.map((c) => (
            <Link key={c} to={`/shop?category=${c}`} className="navbar-cat-link">
              {c}
            </Link>
          ))}
          <span className="navbar-cat-link" style={{ color: "#febd69" }}>🔥 Today's Deals</span>
        </div>
      </div>
    </header>
  );
}
