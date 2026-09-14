import type { Product } from "./product";
import type { OrderStatusType } from "../enums/order-status";

interface OrderItem {
  id?: number;
  orderId?: number;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id?: number;
  userId?: number;
  status: OrderStatusType;
  placedAt: string;
  subtotal: number;
  shipping: number;
  total: number;
  shippingName: string;
  shippingAddress: string;
  cardLast4: string;
  items: OrderItem[];
}

export type { Order, OrderItem };
