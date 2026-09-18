import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/product-service";
import type { Product } from "../models/product";
import { ProductCard } from "../components/ProductCard";
import { CartPreview } from "../components/CartPreview";
import "./ProductsGrid.css";

const ALL = "All";

export function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading",
  );
  const [activeCategory, setActiveCategory] = useState(ALL);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetchProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return [ALL, ...Array.from(set)];
  }, [products]);

  const visible = useMemo(
    () =>
      activeCategory === ALL
        ? products
        : products.filter((p) => p.category === activeCategory),
    [products, activeCategory],
  );

  return (
    <div>
      <section className="page products-section">
        <div className="products-layout">
          <div className="products-main">
            <div className="products-toolbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`products-filter ${activeCategory === cat ? "is-active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {status === "loading" && (
              <p className="products-state">Loading the shelf…</p>
            )}

            {status === "error" && (
              <p className="products-state products-state--error">
                Couldn't reach the catalog. Make sure the mock backend is
                running on port 4000, then refresh.
              </p>
            )}

            {status === "ready" && visible.length === 0 && (
              <p className="products-state">Nothing in this category yet.</p>
            )}

            {status === "ready" && visible.length > 0 && (
              <div className="products-grid">
                {visible.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          <CartPreview />
        </div>
      </section>
    </div>
  );
}
