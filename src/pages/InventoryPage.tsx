import Badge from "../components/Badge";
import SkeletonRow from "../components/SkeletonRow";
import type { Inventory } from "../models/inventory";

const MOCK_INVENTORY: Inventory[] = [
  { id: 1, productId: 1, quantity: 42 },
  { id: 2, productId: 2, quantity: 8  },
  { id: 3, productId: 3, quantity: 0  },
  { id: 4, productId: 4, quantity: 25 },
  { id: 5, productId: 5, quantity: 3  },
  { id: 6, productId: 6, quantity: 15 },
];

const PRODUCT_NAMES: Record<number, string> = {
  1: "Noise-Cancelling Headphones",
  2: "Slim-Fit Cotton Shirt",
  3: "Clean Code (Book)",
  4: "Minimalist Desk Lamp",
  5: "Vitamin C Serum",
  6: "Yoga Mat Pro",
};

function stockBadge(qty: number) {
  if (qty === 0) return "NO_STOCK" as const;
  if (qty <= 5) return "LOW_STOCK" as const;
  return "IN_STOCK" as const;
}

function QuantityBar({ qty }: { qty: number }) {
  const max = 50;
  const pct = Math.min((qty / max) * 100, 100);
  const color =
    qty === 0 ? "var(--text-muted)" : qty <= 5 ? "var(--danger)" : "var(--success)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          background: "var(--bg-elevated)",
          borderRadius: 3,
          overflow: "hidden",
          maxWidth: 100,
        }}
      >
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontWeight: 600, minWidth: 28, color }}>{qty}</span>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Inventory</h1>
          <p className="page-subtitle">Track stock levels across all products.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary">Export CSV</button>
          <button className="btn btn-primary">＋ Restock</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {(
          [
            { label: "In Stock",     count: 3, color: "var(--success)", bg: "var(--success-bg)" },
            { label: "Low Stock",    count: 2, color: "var(--warning)", bg: "var(--warning-bg)" },
            { label: "Out of Stock", count: 1, color: "var(--danger)",  bg: "var(--danger-bg)" },
          ] as const
        ).map((s) => (
          <div
            key={s.label}
            className="card"
            style={{ flex: "1 1 150px", padding: 16, display: "flex", gap: 12, alignItems: "center" }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: s.color,
                fontWeight: 800,
              }}
            >
              {s.count}
            </div>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-toolbar-title">Inventory Records</div>
          <div className="search-input-wrap">
            <span className="search-input-icon">🔍</span>
            <input
              id="inventory-search"
              type="text"
              className="search-input"
              placeholder="Search products…"
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVENTORY.map((inv) => (
              <tr key={inv.id}>
                <td style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>#{inv.id}</td>
                <td style={{ color: "var(--accent-light)", fontFamily: "monospace" }}>
                  P-{inv.productId}
                </td>
                <td style={{ fontWeight: 500 }}>{PRODUCT_NAMES[inv.productId] ?? "—"}</td>
                <td>
                  <QuantityBar qty={inv.quantity} />
                </td>
                <td>
                  <Badge variant={stockBadge(inv.quantity)} />
                </td>
                <td>
                  <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 12 }}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
            <SkeletonRow cols={6} rows={2} />
          </tbody>
        </table>
        <div className="table-footer">
          Showing {MOCK_INVENTORY.length} inventory records
        </div>
      </div>
    </>
  );
}
