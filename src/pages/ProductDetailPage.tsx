import { Link, useParams } from "react-router-dom";
import type { Product } from "../models/product";

const PRODUCTS: (Product & { emoji: string; rating: number; reviewCount: number; originalPrice: number; discount: number })[] = [
  { id: 1, name: "Noise-Cancelling Wireless Headphones", description: "Experience sound like never before. These premium over-ear headphones feature active noise cancellation (ANC), 40-hour battery life, and hi-res audio certification. Perfect for commuters, remote workers, and audiophiles.", price: 4999, originalPrice: 7999, sku: "ELEC-001", category: "Electronics", userId: 4, emoji: "🎧", rating: 4.5, reviewCount: 12840, discount: 38 },
  { id: 2, name: "Slim-Fit Cotton Shirt", description: "Crafted from 100% premium combed cotton, this slim-fit shirt offers comfort and style for both casual and semi-formal occasions. Machine washable and wrinkle-resistant.", price: 799, originalPrice: 1299, sku: "CLTH-002", category: "Clothing", userId: 4, emoji: "👕", rating: 4.2, reviewCount: 3210, discount: 38 },
  { id: 3, name: "Clean Code — Robert C. Martin", description: "A must-read for every software developer. Clean Code teaches you how to write programs that are readable, maintainable, and efficient. Contains real-world examples and hands-on exercises.", price: 599, originalPrice: 899, sku: "BOOK-003", category: "Books", userId: 1, emoji: "📚", rating: 4.8, reviewCount: 45200, discount: 33 },
];

const REVIEWS = [
  { name: "Aisha P.", rating: 5, comment: "Absolutely love it! Great quality and fast delivery.", date: "Sep 5, 2026" },
  { name: "Rahul S.", rating: 4, comment: "Good product overall. Packaging could be better.", date: "Sep 3, 2026" },
  { name: "Priya N.", rating: 5, comment: "Exactly as described. Highly recommend to everyone!", date: "Aug 29, 2026" },
];

function Stars({ n }: { n: number }) {
  return <span style={{ color: "var(--star)" }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === Number(id)) ?? PRODUCTS[0];

  return (
    <div className="page-wrapper">
      <div className="page-header-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link to="/shop">Shop</Link>
            <span className="breadcrumb-sep">›</span>
            <span>{product.category}</span>
            <span className="breadcrumb-sep">›</span>
            <span style={{ color: "var(--text-primary)" }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ padding: "28px 20px" }}>
        <div className="product-detail-layout">
          {/* Gallery */}
          <div>
            <div className="product-detail-gallery">
              <div className="product-detail-main-img">{product.emoji}</div>
              <div className="product-detail-thumbs">
                {[product.emoji, product.emoji, product.emoji, product.emoji].map((e, i) => (
                  <div key={i} className={`product-detail-thumb ${i === 0 ? "active" : ""}`}>{e}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="product-detail-info">
            {/* Title block */}
            <div className="card">
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)", marginBottom: 6 }}>
                {product.category}
              </p>
              <h1 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.4, marginBottom: 10 }}>
                {product.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ color: "var(--star)", fontSize: 16 }}>
                  {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
                </span>
                <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>
                  {product.rating} ({product.reviewCount.toLocaleString()} ratings)
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span className="deal-badge" style={{ background: "var(--danger)", color: "white" }}>
                  {product.discount}% off
                </span>
                <span style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "line-through" }}>
                  M.R.P. ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="product-detail-price">₹{product.price.toLocaleString()}</div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                Inclusive of all taxes
              </p>
            </div>

            {/* Buy Box */}
            <div className="product-detail-buy-box">
              <div className="delivery-info" style={{ marginBottom: 16 }}>
                <div className="delivery-row">
                  <span className="delivery-row-icon">🚚</span>
                  <span><strong>Free delivery</strong> on orders above ₹499</span>
                </div>
                <div className="delivery-row">
                  <span className="delivery-row-icon">⚡</span>
                  <span><strong>Express delivery</strong> available — order within 3h</span>
                </div>
                <div className="delivery-row">
                  <span className="delivery-row-icon">↩️</span>
                  <span><strong>30-day</strong> hassle-free returns</span>
                </div>
                <div className="delivery-row">
                  <span className="delivery-row-icon">✅</span>
                  <span style={{ color: "var(--success)", fontWeight: 600 }}>In Stock</span>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--text-secondary)" }}>Quantity:</p>
                <div className="qty-selector">
                  <button className="qty-btn">−</button>
                  <span className="qty-value">1</span>
                  <button className="qty-btn">＋</button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button className="btn btn-primary btn-full btn-lg">
                  🛒 Add to Cart
                </button>
                <button className="btn btn-accent btn-full btn-lg">
                  ⚡ Buy Now
                </button>
                <button className="btn btn-ghost btn-full" style={{ border: "1px solid var(--border)" }}>
                  ♡ Add to Wishlist
                </button>
              </div>
            </div>

            {/* SKU */}
            <div className="card" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div><strong>SKU:</strong> {product.sku}</div>
                <div><strong>Sold by:</strong> ShopSphere</div>
                <div><strong>Category:</strong> {product.category}</div>
                <div><strong>Warranty:</strong> 1 Year</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="card" style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Product Description</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>{product.description}</p>
        </div>

        {/* Reviews */}
        <div className="card" style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Customer Reviews</h2>
            <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border)" }}>
              Write a Review
            </button>
          </div>

          <div style={{ display: "flex", gap: 32, marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1 }}>{product.rating}</div>
              <Stars n={Math.round(product.rating)} />
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                {product.reviewCount.toLocaleString()} ratings
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", width: 20 }}>{star}★</span>
                  <div style={{ flex: 1, height: 8, background: "var(--bg-muted)", borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${[62, 20, 10, 5, 3][5 - star]}%`,
                        height: "100%",
                        background: "var(--star)",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", width: 30 }}>
                    {[62, 20, 10, 5, 3][5 - star]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {REVIEWS.map((r) => (
              <div key={r.name} style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.date}</span>
                </div>
                <Stars n={r.rating} />
                <p style={{ marginTop: 6, fontSize: 13.5, color: "var(--text-secondary)" }}>{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
