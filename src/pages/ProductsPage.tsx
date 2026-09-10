import type { Product } from "../models/product";

const CATEGORY_EMOJI: Record<string, string> = {
  Electronics: "⚡",
  Clothing:    "👕",
  Books:       "📚",
  Home:        "🏠",
  Beauty:      "💄",
  Sports:      "⚽",
};

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Noise-Cancelling Headphones", description: "Premium over-ear wireless headphones.", price: 4999, sku: "ELEC-001", category: "Electronics", userId: 4 },
  { id: 2, name: "Slim-Fit Cotton Shirt",        description: "Comfortable everyday slim-fit shirt.",   price: 799,  sku: "CLTH-002", category: "Clothing",    userId: 4 },
  { id: 3, name: "Clean Code (Book)",             description: "A handbook of agile software craftsmanship.", price: 599, sku: "BOOK-003", category: "Books",  userId: 1 },
  { id: 4, name: "Minimalist Desk Lamp",          description: "USB-C powered LED desk lamp.",           price: 1299, sku: "HOME-004", category: "Home",        userId: 4 },
  { id: 5, name: "Vitamin C Serum",               description: "Brightening face serum 30ml.",           price: 699,  sku: "BEAU-005", category: "Beauty",     userId: 1 },
  { id: 6, name: "Yoga Mat Pro",                  description: "Non-slip 6mm professional yoga mat.",    price: 1599, sku: "SPRT-006", category: "Sports",     userId: 4 },
];

export default function ProductsPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Browse and manage the product catalogue.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary">⊞ Grid</button>
          <button className="btn btn-primary">＋ Add Product</button>
        </div>
      </div>

      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 24,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div className="search-input-wrap">
          <span className="search-input-icon">🔍</span>
          <input
            id="products-search"
            type="text"
            className="search-input"
            placeholder="Search by name or SKU…"
            style={{ width: 260 }}
          />
        </div>
        {["All", ...Object.keys(CATEGORY_EMOJI)].map((cat) => (
          <button
            key={cat}
            className="btn btn-secondary"
            style={{
              padding: "7px 14px",
              fontSize: 12,
              ...(cat === "All"
                ? { background: "var(--accent-glow)", color: "var(--accent-light)", borderColor: "var(--border-active)" }
                : {}),
            }}
          >
            {cat !== "All" && CATEGORY_EMOJI[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="product-grid">
        {MOCK_PRODUCTS.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-card-img">
              {CATEGORY_EMOJI[p.category] ?? "📦"}
            </div>
            <div className="product-card-body">
              <p className="product-card-category">{p.category}</p>
              <p className="product-card-name">{p.name}</p>
              <p className="product-card-sku">SKU: {p.sku}</p>
              <div className="product-card-footer">
                <span className="product-card-price">₹{p.price.toLocaleString()}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 12 }}>
                    Edit
                  </button>
                  <button className="btn btn-primary" style={{ padding: "5px 12px", fontSize: 12 }}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Skeleton product cards */}
        {[1, 2].map((i) => (
          <div key={`sk-${i}`} className="product-card">
            <div className="product-card-img skeleton" style={{ height: 160 }} />
            <div className="product-card-body">
              <span className="skeleton skeleton-text" style={{ width: "40%", marginBottom: 8 }} />
              <span className="skeleton skeleton-text" style={{ width: "75%", marginBottom: 6 }} />
              <span className="skeleton skeleton-text" style={{ width: "55%", marginBottom: 14 }} />
              <div className="product-card-footer">
                <span className="skeleton skeleton-text" style={{ width: 60 }} />
                <span className="skeleton skeleton-text" style={{ width: 80 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
