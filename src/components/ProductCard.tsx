import { Link } from "react-router-dom";

export interface ProductCardData {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  emoji: string;
  badge?: string;
  discount?: number;
}

function StarRating({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="stars">
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(empty)}
    </span>
  );
}

interface ProductCardProps {
  product: ProductCardData;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      {product.badge && (
        <div className="product-card-badge">
          <span className="deal-badge">🏷️ {product.badge}</span>
        </div>
      )}
      <button className="product-card-wishlist" aria-label="Add to wishlist">♡</button>

      <Link to={`/products/${product.id}`} className="product-card-img">
        {product.emoji}
      </Link>

      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <Link to={`/products/${product.id}`} className="product-card-name">
          {product.name}
        </Link>
        <div className="product-card-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="product-card-price-row">
          <span className="product-card-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="product-card-original">₹{product.originalPrice.toLocaleString()}</span>
          )}
          {product.discount && (
            <span className="product-card-discount">{product.discount}% off</span>
          )}
        </div>
        <p style={{ fontSize: 12, color: "var(--success)", fontWeight: 500 }}>
          ✓ Free delivery
        </p>
      </div>

      <div className="product-card-footer">
        <button
          className="btn btn-primary btn-full btn-sm"
          style={{ borderRadius: "var(--radius-md)" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
