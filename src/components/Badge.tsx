import type { OrderStatusType } from "../types/order-status";

export default function Badge({ variant }: { variant: OrderStatusType }) {
  const MAP: Record<OrderStatusType, string> = {
    PENDING:   "badge-pending",
    SHIPPED:   "badge-shipped",
    DELIVERED: "badge-delivered",
    CANCELLED: "badge-cancelled",
  };
  const LABEL: Record<OrderStatusType, string> = {
    PENDING:   "Pending",
    SHIPPED:   "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };
  return (
    <span className={`badge ${MAP[variant]}`}>
      <span className="badge-dot" />
      {LABEL[variant]}
    </span>
  );
}
