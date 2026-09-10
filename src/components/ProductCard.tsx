import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../models/product";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  stock?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, stock = 10 }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const isOutOfStock = stock <= 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    setAdding(true);
    await addToCart(product.id, 1);
    setTimeout(() => setAdding(false), 500);
  };

  return (
    <div className="product-card">
      <div className="product-card-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
          <span className="product-category">{product.category}</span>
          <span className={`stock-tag ${isOutOfStock ? "stock-out" : stock < 10 ? "stock-low" : "stock-in"}`}>
            {isOutOfStock ? "Out of Stock" : `${stock} in stock`}
          </span>
        </div>

        <Link to={`/products/${product.id}`} className="product-title">
          {product.name}
        </Link>

        <p className="product-description">{product.description}</p>

        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
          SKU: {product.sku}
        </div>

        <div className="product-footer">
          <div className="product-price">₹{product.price.toLocaleString()}</div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock || adding}
          >
            {adding ? "Added!" : isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
