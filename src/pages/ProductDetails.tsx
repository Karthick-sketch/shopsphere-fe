import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductService from "../api/product-service";
import type { Product } from "../models/product";
import { CartPreview } from "../components/CartPreview";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading",
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setStatus("loading");
    setJustAdded(false);
    setQuantity(1);
    ProductService.fetchProduct(id)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="page product-details-state">
        <p>Loading product…</p>
      </div>
    );
  }

  if (status === "error" || !product) {
    return (
      <div className="page product-details-state">
        <p>Couldn't find that product.</p>
        <Link to="/" className="btn btn-ghost">
          Back to shop
        </Link>
      </div>
    );
  }

  function handleAdd() {
    if (!product) return;
    addItem(product, quantity);
    setJustAdded(true);
  }

  return (
    <div className="page product-details">
      <Link to="/" className="product-details__back">
        ← Back to shop
      </Link>

      <div className="product-details__layout">
        <div className="product-details__main">
          <div className="product-details__grid">
            <div className="product-details__image-wrap">
              <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className="product-details__info">
              <p className="product-details__category">{product.category}</p>
              <h1 className="product-details__name">{product.name}</h1>
              <p className="product-details__price">
                ${product.price.toFixed(2)}
              </p>
              <p className="product-details__description">
                {product.description}
              </p>

              <div className="product-details__actions">
                {product.isAvailable && (
                  <div className="quantity-stepper">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  className="btn btn-primary product-details__add"
                  onClick={handleAdd}
                  disabled={!product.isAvailable}
                >
                  {product.isAvailable ? "Add to cart" : "Out of stock"}
                </button>
              </div>

              {justAdded && (
                <p className="product-details__confirm">
                  Added to cart. <Link to="/cart">View cart →</Link>
                </p>
              )}
            </div>
          </div>
        </div>

        <CartPreview />
      </div>
    </div>
  );
}
