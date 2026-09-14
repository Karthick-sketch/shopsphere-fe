import { Link } from "react-router-dom";
import type { Product } from "../enums";
import { RoastBar } from "./RoastBar";
import "./ProductCard.css";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className={`product-card cat-${product.category.toLowerCase()}`}
    >
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">{product.name}</h3>
        {product.roast ? (
          <RoastBar roast={product.roast} />
        ) : (
          <p className="product-card__origin">{product.origin}</p>
        )}
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
