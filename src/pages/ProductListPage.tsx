import React, { useState, useEffect } from "react";
import type { Product } from "../models/product";
import type { Inventory } from "../models/inventory";
import { productService } from "../services/productService";
import { inventoryService } from "../services/inventoryService";
import { ProductCard } from "../components/ProductCard";

export const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventories, setInventories] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [prods, invs] = await Promise.all([
          productService.getProducts(),
          inventoryService.getInventories(),
        ]);
        setProducts(prods);

        const stockMap: Record<number, number> = {};
        invs.forEach((inv: Inventory) => {
          stockMap[inv.productId] = inv.quantity;
        });
        setInventories(stockMap);
      } catch {
        // Handled in services
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container page-container">
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Products Catalog</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Browse available items from our store. Stock levels are updated live.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between" }}>
          {/* Category Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm ${selectedCategory === cat ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ minWidth: "260px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Product List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
          Loading products from API...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
          <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "12px" }}>
            No products found matching your criteria.
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              stock={inventories[product.id] ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};
