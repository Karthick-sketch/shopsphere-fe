import { Link } from "react-router-dom";
import type { Product } from "../models/product";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export function ProductCard({ product }: { product: Product }) {
  const { items, addItem, setQuantity } = useCart();
  const cartLine = items.find((i) => i.productInfo.id === product.id);
  const qty = cartLine?.quantity ?? 0;
  const outOfStock = product.stock === 0;

  return (
    <div className={`product-card cat-${product.category.toLowerCase()}`}>
      <Link
        to={`/products/${product.id}`}
        className="product-card__link"
        tabIndex={0}
      >
        <div className="product-card__image-wrap">
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
        <div className="product-card__body">
          <p className="product-card__category">{product.category}</p>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__price">${product.price.toFixed(2)}</p>
        </div>
      </Link>

      <div className="product-card__actions">
        {qty === 0 ? (
          <button
            className="product-card__atc"
            disabled={outOfStock}
            onClick={() => addItem(product)}
          >
            {outOfStock ? "Out of stock" : "Add to cart"}
          </button>
        ) : (
          <div className="product-card__qty">
            <button
              className="product-card__qty-btn"
              aria-label="Decrease quantity"
              onClick={() => setQuantity(cartLine.id, qty - 1)}
            >
              −
            </button>
            <span className="product-card__qty-count">{qty}</span>
            <button
              className="product-card__qty-btn"
              aria-label="Increase quantity"
              disabled={qty >= product.stock}
              onClick={() => setQuantity(cartLine.id, qty + 1)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
