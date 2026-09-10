import { apiClient, setBackendStatus } from "./apiClient";
import type { Order, OrderItem } from "../models/order";
import type { OrderStatusType } from "../types/order-status";
import { initialOrders, initialOrderItems } from "./mockData";

const localOrders: Order[] = [...initialOrders];
const localOrderItems: OrderItem[] = [...initialOrderItems];

export interface CreateOrderPayload {
  userId: number;
  totalAmount: number;
  items: Array<{
    productId: number;
    quantity: number;
    unitPrice: number;
  }>;
}

export const orderService = {
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    try {
      const response = await apiClient.get<Order[]>(`/order/user/${userId}`);
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.get<Order[]>(`/orders/user/${userId}`);
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        return localOrders
          .filter((o) => o.userId === userId)
          .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      }
    }
  },

  async getOrderById(orderId: number): Promise<{ order: Order; items: OrderItem[] } | undefined> {
    try {
      const response = await apiClient.get<{ order: Order; items: OrderItem[] }>(`/order/${orderId}`);
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.get<{ order: Order; items: OrderItem[] }>(`/orders/${orderId}`);
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        const order = localOrders.find((o) => o.id === orderId);
        if (!order) return undefined;
        const items = localOrderItems.filter((item) => item.orderId === orderId);
        return { order, items };
      }
    }
  },

  async createOrder(payload: CreateOrderPayload): Promise<{ order: Order; items: OrderItem[] }> {
    try {
      const response = await apiClient.post<{ order: Order; items: OrderItem[] }>("/order", payload);
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.post<{ order: Order; items: OrderItem[] }>("/orders", payload);
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        const newOrderId = localOrders.length > 0 ? Math.max(...localOrders.map((o) => o.id)) + 1 : 1001;
        const newOrder: Order = {
          id: newOrderId,
          userId: payload.userId,
          totalAmount: payload.totalAmount,
          status: "PENDING",
          orderDate: new Date().toISOString(),
        };
        localOrders.unshift(newOrder);

        const createdItems: OrderItem[] = payload.items.map((item, idx) => ({
          id: (localOrderItems.length > 0 ? Math.max(...localOrderItems.map((i) => i.id)) : 0) + idx + 1,
          orderId: newOrderId,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }));
        localOrderItems.push(...createdItems);

        return { order: newOrder, items: createdItems };
      }
    }
  },

  async updateOrderStatus(orderId: number, status: OrderStatusType): Promise<Order | undefined> {
    try {
      const response = await apiClient.patch<Order>(`/order/${orderId}/status`, { status });
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.patch<Order>(`/orders/${orderId}/status`, { status });
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        const order = localOrders.find((o) => o.id === orderId);
        if (order) {
          order.status = status;
          return { ...order };
        }
        return undefined;
      }
    }
  },
};
