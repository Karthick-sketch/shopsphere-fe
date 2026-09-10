import type { OrderStatusType } from "../types/order-status";

interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: OrderStatusType;
  orderDate: string;
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

export type { Order, OrderItem };
