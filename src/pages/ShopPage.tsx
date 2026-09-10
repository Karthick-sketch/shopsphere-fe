import { Link } from "react-router-dom";
import ProductCard, { type ProductCardData } from "../components/ProductCard";

const ALL_PRODUCTS: ProductCardData[] = [
  { id: 1, name: "Noise-Cancelling Wireless Headphones", category: "Electronics", price: 4999, originalPrice: 7999, rating: 4.5, reviewCount: 12840, emoji: "🎧", badge: "Best Seller", discount: 38 },
  { id: 2, name: "Slim-Fit Cotton Shirt",                 category: "Clothing",    price: 799,  originalPrice: 1299, rating: 4.2, reviewCount: 3210,  emoji: "👕", discount: 38 },
  { id: 3, name: "Clean Code — Robert C. Martin",         category: "Books",       price: 599,  originalPrice: 899,  rating: 4.8, reviewCount: 45200, emoji: "📚", badge: "Top Rated", discount: 33 },
  { id: 4, name: "Minimalist USB-C Desk Lamp",            category: "Home",        price: 1299, originalPrice: 1999, rating: 4.3, reviewCount: 2100,  emoji: "💡", discount: 35 },
  { id: 5, name: "Vitamin C Brightening Serum 30ml",      category: "Beauty",      price: 699,  originalPrice: 1099, rating: 4.6, reviewCount: 8740,  emoji: "🧴", badge: "New", discount: 36 },
  { id: 6, name: "Yoga Mat Pro — Non-Slip 6mm",           category: "Sports",      price: 1599, originalPrice: 2499, rating: 4.4, reviewCount: 5620,  emoji: "🧘", discount: 36 },
  { id: 7, name: "4K Smart TV 43-inch",                   category: "Electronics", price: 29999, originalPrice: 45000, rating: 4.3, reviewCount: 9800, emoji: "📺", badge: "Deal", discount: 33 },
  { id: 8, name: "Stainless Steel Water Bottle 1L",       category: "Sports",      price: 499,  originalPrice: 799,  rating: 4.7, reviewCount: 21300, emoji: "🥤", discount: 38 },
  { id: 9, name: "Wireless Mechanical Keyboard",          category: "Electronics", price: 3499, originalPrice: 4999, rating: 4.4, reviewCount: 6120,  emoji: "⌨️", discount: 30 },
  { id: 10, name: "Running Shoes Ultra Boost",            category: "Sports",      price: 2999, originalPrice: 4999, rating: 4.5, reviewCount: 18400, emoji: "👟", discount: 40 },
  { id: 11, name: "Coffee Maker 1.5L",                    category: "Home",        price: 2499, originalPrice: 3499, rating: 4.3, reviewCount: 4320,  emoji: "☕", discount: 29 },
  { id: 12, name: "The Atomic Habits Book",               category: "Books",       price: 399,  originalPrice: 599,  rating: 4.9, reviewCount: 89000, emoji: "📖", badge: "Bestseller", discount: 33 },
];

const CATEGORIES = ["All", "Electronics", "Clothing", "Books", "Home", "Beauty", "Sports"];
const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Avg. Customer Rating" },
  { value: "newest", label: "Newest Arrivals" },
];

export default function ShopPage() {
  return (
    <div className="page-wrapper">
      {/* Page header */}
      <div className="page-header-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Shop</span>
          </nav>
          <h1 className="page-title">All Products</h1>
        </div>
      </div>

      <div className="container" style={{ padding: "24px 20px" }}>
        <div className="shop-layout">
          {/* ── Filter Sidebar ── */}
          <aside className="filter-sidebar">
            <div className="filter-section">
              <p className="filter-section-title">Category</p>
              {CATEGORIES.map((cat) => (
                <label key={cat} className="filter-option">
                  <input type="radio" name="category" defaultChecked={cat === "All"} />
                  {cat}
                  <span className="filter-option-count">
                    {cat === "All" ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p => p.category === cat).length || ""}
                  </span>
                </label>
              ))}
            </div>

            <div className="filter-section">
              <p className="filter-section-title">Price Range</p>
              <div className="price-range">
                <input type="number" className="price-input" placeholder="Min" defaultValue={0} />
                <span style={{ color: "var(--text-muted)" }}>–</span>
                <input type="number" className="price-input" placeholder="Max" defaultValue={50000} />
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 10, width: "100%", background: "var(--bg-muted)" }}>
                Apply
              </button>
            </div>

            <div className="filter-section">
              <p className="filter-section-title">Customer Rating</p>
              {[4, 3, 2, 1].map((r) => (
                <label key={r} className="filter-option">
                  <input type="checkbox" />
                  <span style={{ color: "var(--star)" }}>{"★".repeat(r)}{"☆".repeat(4-r)}</span>
                  &amp; Up
                </label>
              ))}
            </div>

            <div className="filter-section">
              <p className="filter-section-title">Discount</p>
              {["10% & above", "25% & above", "35% & above", "50% & above"].map((d) => (
                <label key={d} className="filter-option">
                  <input type="checkbox" />
                  {d}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <p className="filter-section-title">Availability</p>
              <label className="filter-option">
                <input type="checkbox" defaultChecked />
                In Stock
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                Include Out of Stock
              </label>
            </div>
          </aside>

          {/* ── Products ── */}
          <div className="shop-main">
            <div className="shop-toolbar">
              <div className="shop-toolbar-left">
                Showing <strong>{ALL_PRODUCTS.length}</strong> results
              </div>
              <div className="shop-toolbar-right">
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Sort by:</span>
                <select className="sort-select" id="shop-sort">
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <div className="view-toggle">
                  <button className="view-toggle-btn active" title="Grid view">⊞</button>
                  <button className="view-toggle-btn" title="List view">☰</button>
                </div>
              </div>
            </div>

            <div className="product-grid">
              {ALL_PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 32,
                flexWrap: "wrap",
              }}
            >
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className="btn btn-ghost btn-sm"
                  style={{
                    minWidth: 36,
                    ...(page === 1 ? { background: "var(--accent)", color: "white" } : {}),
                  }}
                >
                  {page}
                </button>
              ))}
              <button className="btn btn-ghost btn-sm">Next →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
