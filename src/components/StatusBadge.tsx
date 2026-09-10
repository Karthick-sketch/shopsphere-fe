import React from "react";
import type { OrderStatusType } from "../types/order-status";
import type { PaymentStatusType } from "../types/payment-status";
import type { PaymentMethodType } from "../types/payment-method";

interface StatusBadgeProps {
  status?: OrderStatusType | PaymentStatusType | string;
  method?: PaymentMethodType | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, method }) => {
  if (method) {
    return <span className="badge badge-gray">{method}</span>;
  }

  if (!status) return null;

  switch (status) {
    case "DELIVERED":
    case "PAID":
      return <span className="badge badge-delivered">{status}</span>;
    case "SHIPPED":
      return <span className="badge badge-shipped">{status}</span>;
    case "PENDING":
      return <span className="badge badge-pending">{status}</span>;
    case "CANCELLED":
    case "FAILED":
      return <span className="badge badge-cancelled">{status}</span>;
    default:
      return <span className="badge badge-gray">{status}</span>;
  }
};
