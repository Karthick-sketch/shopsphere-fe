import type { ProductSummary } from "./product";
import type { OrderStatusType } from "../enums/order-status";
import type { PaymentMethodType } from "../enums/payment-method";

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
  authUserId?: number;
}

interface OrderItemRequest {
  quantity: number;
  price: number;
  productId: number;
}

interface OrderRequest {
  subtotal: number;
  shipping: number;
  total: number;
  shippingName: string;
  shippingAddress: string;
  cardLast4: string;
  orderItems: OrderItemRequest[];
  paymentMethod: PaymentMethodType;
  paymentToken: string;
}

interface OrderStatusResponse {
  id: number;
  status: OrderStatusType;
}

export type {
  Order,
  OrderItem,
  OrderItemRequest,
  OrderRequest,
  OrderStatusResponse,
};
