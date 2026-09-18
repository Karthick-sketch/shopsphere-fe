import type { ProductSummary } from "./product";
import type { OrderStatusType } from "../enums/order-status";

interface OrderItem {
  id?: number;
  orderId?: number;
  quantity: number;
  price: number;
  productSummary: ProductSummary;
}

interface Order {
  id?: number;
  status: OrderStatusType;
  placedAt: string;
  subtotal: number;
  shipping: number;
  total: number;
  shippingName: string;
  shippingAddress: string;
  cardLast4: string;
  items: OrderItem[];
  userId?: number;
}

interface OrderItemRequest {
  quantity: number;
  price: number;
  productId: number;
}

interface OrderRequest {
  status: OrderStatusType;
  placedAt: string;
  subtotal: number;
  shipping: number;
  total: number;
  shippingName: string;
  shippingAddress: string;
  cardLast4: string;
  orderItems: OrderItemRequest[];
  userId?: number;
}

export type { Order, OrderItem, OrderItemRequest, OrderRequest };
