import { Link } from "react-router-dom";
import ProductCard, { type ProductCardData } from "../components/ProductCard";

const CATEGORIES = [
  { icon: "⚡", label: "Electronics",  bg: "#eef2ff" },
  { icon: "👕", label: "Clothing",     bg: "#fdf4ff" },
  { icon: "📚", label: "Books",        bg: "#fff7ed" },
  { icon: "🏠", label: "Home",         bg: "#f0fdf4" },
  { icon: "💄", label: "Beauty",       bg: "#fdf2f8" },
  { icon: "⚽", label: "Sports",       bg: "#eff6ff" },
  { icon: "🧸", label: "Toys",         bg: "#fffbeb" },
  { icon: "🥦", label: "Grocery",      bg: "#f0fdf4" },
];

const FEATURED: ProductCardData[] = [
  { id: 1, name: "Noise-Cancelling Wireless Headphones",  category: "Electronics", price: 4999, originalPrice: 7999, rating: 4.5, reviewCount: 12840, emoji: "🎧", badge: "Best Seller", discount: 38 },
  { id: 2, name: "Slim-Fit Cotton Shirt",                  category: "Clothing",    price: 799,  originalPrice: 1299, rating: 4.2, reviewCount: 3210,  emoji: "👕", discount: 38 },
  { id: 3, name: "Clean Code — Robert C. Martin",          category: "Books",       price: 599,  originalPrice: 899,  rating: 4.8, reviewCount: 45200, emoji: "📚", badge: "Top Rated", discount: 33 },
  { id: 4, name: "Minimalist USB-C Desk Lamp",             category: "Home",        price: 1299, originalPrice: 1999, rating: 4.3, reviewCount: 2100,  emoji: "💡", discount: 35 },
  { id: 5, name: "Vitamin C Brightening Serum 30ml",       category: "Beauty",      price: 699,  originalPrice: 1099, rating: 4.6, reviewCount: 8740,  emoji: "🧴", badge: "New", discount: 36 },
  { id: 6, name: "Yoga Mat Pro — Non-Slip 6mm",            category: "Sports",      price: 1599, originalPrice: 2499, rating: 4.4, reviewCount: 5620,  emoji: "🧘", discount: 36 },
  { id: 7, name: "4K Smart TV 43-inch",                    category: "Electronics", price: 29999, originalPrice: 45000, rating: 4.3, reviewCount: 9800, emoji: "📺", badge: "Deal of the Day", discount: 33 },
  { id: 8, name: "Stainless Steel Water Bottle 1L",        category: "Sports",      price: 499,  originalPrice: 799,  rating: 4.7, reviewCount: 21300, emoji: "🥤", discount: 38 },
];

export default function HomePage() {
  return (
    <div className="page-wrapper">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🎉 Grand Sale — Up to 70% Off</div>
          <h1 className="hero-title">
            Everything You Need,<br />
            <span className="hero-title-accent">Delivered to Your Door</span>
          </h1>
          <p className="hero-subtitle">
            Millions of products across every category. Fast delivery, easy returns,
            and unbeatable prices — all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary btn-lg">
              Shop Now →
            </Link>
            <Link to="/shop?sale=true" className="btn btn-outline btn-lg">
              View Deals
            </Link>
          </div>

          <div className="hero-stats">
            {[
              { value: "10M+",  label: "Happy Customers" },
              { value: "500K+", label: "Products" },
              { value: "2-Day", label: "Fast Delivery" },
              { value: "24/7",  label: "Customer Support" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div className="hero-stat-value">{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        {/* ── Categories ── */}
        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Explore our wide range of product categories</p>
            </div>
            <Link to="/shop" className="section-link">View All →</Link>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} to={`/shop?category=${cat.label}`} className="category-card">
                <div className="category-card-icon" style={{ background: cat.bg }}>
                  {cat.icon}
                </div>
                <span className="category-card-label">{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Deals Banner ── */}
        <div className="deals-banner">
          <div className="deals-banner-text">
            <h2>🔥 Today's Deals</h2>
            <p>Up to 70% off on Electronics, Fashion, and more. Ends tonight at midnight!</p>
          </div>
          <Link to="/shop?sale=true" className="btn btn-white btn-lg">
            Grab Deals →
          </Link>
        </div>

        {/* ── Featured Products ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Hand-picked products just for you</p>
            </div>
            <Link to="/shop" className="section-link">See All Products →</Link>
          </div>
          <div className="product-grid">
            {FEATURED.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ── Trust badges ── */}
        <section style={{ padding: "40px 0 56px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {[
              { icon: "🚚", title: "Free Delivery",     desc: "On orders above ₹499" },
              { icon: "↩️", title: "Easy Returns",      desc: "30-day hassle-free returns" },
              { icon: "🔒", title: "Secure Payments",   desc: "100% protected transactions" },
              { icon: "🎯", title: "Best Prices",        desc: "Guaranteed lowest prices" },
              { icon: "📞", title: "24/7 Support",      desc: "Always here to help you" },
            ].map((t) => (
              <div
                key={t.title}
                className="card"
                style={{ textAlign: "center", padding: "24px 16px" }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>{t.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
