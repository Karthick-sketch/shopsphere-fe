export const OrderStatus = {
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  PAYMENT_PENDING: "PAYMENT_PENDING",
  PAYMENT_FAILED: "PAYMENT_FAILED",
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];
