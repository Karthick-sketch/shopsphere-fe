type BadgeVariant =
  // Order status
  | "PENDING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  // Payment status
  | "PAID"
  | "FAILED"
  // Payment method
  | "COD"
  | "UPI"
  | "CARD"
  // User role
  | "ADMIN"
  | "USER"
  // Stock
  | "IN_STOCK"
  | "LOW_STOCK"
  | "NO_STOCK";

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  PENDING:   "badge-pending",
  SHIPPED:   "badge-shipped",
  DELIVERED: "badge-delivered",
  CANCELLED: "badge-cancelled",
  PAID:      "badge-paid",
  FAILED:    "badge-failed",
  COD:       "badge-cod",
  UPI:       "badge-upi",
  CARD:      "badge-card",
  ADMIN:     "badge-admin",
  USER:      "badge-user",
  IN_STOCK:  "badge-in-stock",
  LOW_STOCK: "badge-low-stock",
  NO_STOCK:  "badge-no-stock",
};

const VARIANT_LABEL: Record<BadgeVariant, string> = {
  PENDING:   "Pending",
  SHIPPED:   "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  PAID:      "Paid",
  FAILED:    "Failed",
  COD:       "COD",
  UPI:       "UPI",
  CARD:      "Card",
  ADMIN:     "Admin",
  USER:      "User",
  IN_STOCK:  "In Stock",
  LOW_STOCK: "Low Stock",
  NO_STOCK:  "Out of Stock",
};

interface BadgeProps {
  variant: BadgeVariant;
}

export default function Badge({ variant }: BadgeProps) {
  return (
    <span className={`badge ${VARIANT_CLASS[variant]}`}>
      <span className="badge-dot" style={{ background: "currentColor" }} />
      {VARIANT_LABEL[variant]}
    </span>
  );
}
