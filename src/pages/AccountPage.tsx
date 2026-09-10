import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { productService } from "../services/productService";
import { inventoryService } from "../services/inventoryService";
import type { Inventory } from "../models/inventory";

export const AccountPage: React.FC = () => {
  const { currentUser, switchUserRole, allUsers, setCurrentUser } = useAuth();

  // Admin form state
  const [newProdName, setNewProdName] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdPrice, setNewProdPrice] = useState<number>(999);
  const [newProdSku, setNewProdSku] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Electronics");
  const [newProdQty, setNewProdQty] = useState<number>(20);
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  // Inventories check
  const [inventories, setInventories] = useState<Inventory[]>([]);

  useEffect(() => {
    if (currentUser?.role === "ADMIN") {
      inventoryService.getInventories().then(setInventories);
    }
  }, [currentUser]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const created = await productService.createProduct({
        name: newProdName,
        description: newProdDesc,
        price: Number(newProdPrice),
        sku: newProdSku || `SKU-${Date.now().toString().slice(-4)}`,
        category: newProdCategory,
        userId: currentUser.id,
      });

      // Also set initial inventory
      await inventoryService.updateQuantity(created.id, newProdQty);

      setAdminNotice(`Successfully added "${created.name}" to the store!`);
      setNewProdName("");
      setNewProdDesc("");
      setNewProdPrice(999);
      setNewProdSku("");

      const updatedInv = await inventoryService.getInventories();
      setInventories(updatedInv);

      setTimeout(() => setAdminNotice(null), 4000);
    } catch {
      setAdminNotice("Error creating product via API.");
    }
  };

  return (
    <div className="container page-container">
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>User Account</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Manage your profile, view role permissions, or switch test users.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "flex-start" }}>
        {/* Profile Card */}
        <div className="card">
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Profile Information</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-muted)" }}>User ID:</span>
              <span style={{ fontWeight: "600" }}>#{currentUser?.id}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-muted)" }}>Name:</span>
              <span style={{ fontWeight: "600" }}>{currentUser?.name}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-muted)" }}>Email:</span>
              <span>{currentUser?.email}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-muted)" }}>Current Role:</span>
              <span className={`badge ${currentUser?.role === "ADMIN" ? "badge-pending" : "badge-shipped"}`}>
                {currentUser?.role}
              </span>
            </div>
          </div>

          <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "10px" }}>Switch User Persona:</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              {allUsers.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  className={`btn btn-sm ${currentUser?.id === u.id ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setCurrentUser(u)}
                >
                  {u.name} ({u.role})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Role Privileges & Info */}
        <div className="card">
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Role Access & Settings</h2>

          <div style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-muted)" }}>
            <p style={{ marginBottom: "12px" }}>
              <strong>USER role:</strong> Can browse products catalog, view item availability, add items to cart,
              place orders with payment methods (`COD`, `UPI`, `CARD`), and inspect order history.
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong>ADMIN role:</strong> In addition to shopper permissions, can publish new products to the catalog
              and manage stock levels in the inventory service.
            </p>

            <div style={{ padding: "12px", background: "var(--bg)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
              <div style={{ fontWeight: "600", color: "var(--text-main)", marginBottom: "4px" }}>Quick Switch:</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  className={`btn btn-sm ${currentUser?.role === "USER" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => switchUserRole("USER")}
                >
                  Set as USER
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${currentUser?.role === "ADMIN" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => switchUserRole("ADMIN")}
                >
                  Set as ADMIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel: Add Product & Inventory Management (only visible if ADMIN) */}
      {currentUser?.role === "ADMIN" && (
        <div className="card" style={{ marginTop: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
            Admin Management: Add New Product
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
            As an Administrator, you can add products directly to the product service.
          </p>

          {adminNotice && (
            <div style={{ marginBottom: "16px", padding: "10px 14px", background: "var(--success-bg)", color: "var(--success)", borderRadius: "var(--radius)", fontSize: "14px" }}>
              {adminNotice}
            </div>
          )}

          <form onSubmit={handleCreateProduct}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Wireless Mouse"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Books">Books</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  required
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial Stock Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  required
                  value={newProdQty}
                  onChange={(e) => setNewProdQty(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                required
                placeholder="Product details, specs, etc."
                value={newProdDesc}
                onChange={(e) => setNewProdDesc(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save & Publish Product
            </button>
          </form>

          <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "10px" }}>
              Live Inventory Records ({inventories.length} items)
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {inventories.map((inv) => (
                <span key={inv.id} className="badge badge-gray" style={{ fontSize: "12px" }}>
                  Prod #{inv.productId}: <strong>{inv.quantity} in stock</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
