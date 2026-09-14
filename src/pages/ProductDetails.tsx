import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../api/products";
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
    fetchProduct(id)
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

  const outOfStock = product.stock === 0;

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
              <img src={product.image} alt={product.name} />
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

              <p className="product-details__stock">
                {outOfStock ? "Out of stock" : `${product.stock} in stock`}
              </p>

              <div className="product-details__actions">
                <div className="quantity-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={outOfStock}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    disabled={outOfStock}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-primary product-details__add"
                  onClick={handleAdd}
                  disabled={outOfStock}
                >
                  {outOfStock ? "Out of stock" : "Add to cart"}
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
