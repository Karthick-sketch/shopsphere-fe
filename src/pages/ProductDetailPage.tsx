import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../models/product";
import { productService } from "../services/productService";
import { inventoryService } from "../services/inventoryService";
import { useCart } from "../context/CartContext";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [stock, setStock] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      if (!id) return;
      setLoading(true);
      try {
        const prodId = Number(id);
        const prod = await productService.getProductById(prodId);
        if (prod) {
          setProduct(prod);
          const inv = await inventoryService.getInventoryByProductId(prodId);
          setStock(inv ? inv.quantity : 0);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || stock <= 0) return;
    await addToCart(product.id, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  if (loading) {
    return (
      <div className="container page-container" style={{ textAlign: "center", padding: "48px 0" }}>
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container page-container">
        <div className="card" style={{ textAlign: "center", padding: "48px 0" }}>
          <h2>Product Not Found</h2>
          <p style={{ color: "var(--text-muted)", margin: "12px 0 20px" }}>
            The requested product could not be loaded.
          </p>
          <Link to="/" className="btn btn-primary">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = stock <= 0;

  return (
    <div className="container page-container">
      <div className="breadcrumb">
        <Link to="/">Products</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span style={{ color: "var(--text-main)" }}>{product.name}</span>
      </div>

      <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <span className="product-category">{product.category}</span>
          <span className={`stock-tag ${isOutOfStock ? "stock-out" : stock < 10 ? "stock-low" : "stock-in"}`}>
            {isOutOfStock ? "Out of Stock" : `${stock} items available in stock`}
          </span>
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>
          {product.name}
        </h1>

        <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "20px" }}>
          SKU: <strong>{product.sku}</strong> | Product ID: <strong>#{product.id}</strong>
        </div>

        <div style={{ fontSize: "28px", fontWeight: "700", color: "var(--primary)", marginBottom: "24px" }}>
          ₹{product.price.toLocaleString()}
        </div>

        <div style={{ marginBottom: "24px", lineHeight: "1.7" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "6px" }}>Description</h3>
          <p style={{ color: "var(--text-muted)" }}>{product.description}</p>
        </div>

        {/* Action area */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          {!isOutOfStock && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>Quantity:</span>
              <div className="qty-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="qty-value">{quantity}</div>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                  disabled={quantity >= stock}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Currently Out of Stock" : "Add to Cart"}
          </button>

          <Link to="/" className="btn btn-secondary btn-lg">
            Back to Catalog
          </Link>
        </div>

        {addedNotice && (
          <div style={{ marginTop: "16px", padding: "10px 14px", background: "var(--success-bg)", color: "var(--success)", borderRadius: "var(--radius)", fontSize: "14px", fontWeight: "500" }}>
            ✓ Added {quantity} item(s) to your shopping cart!
          </div>
        )}
      </div>
    </div>
  );
};
