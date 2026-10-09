import apiClient from "./interceptor/api-client";
import type { Order, OrderRequest, OrderStatusResponse } from "../models/order";
import { OrderStatus, type OrderStatusType } from "../enums/order-status";

const serviceRoute = "/shopsphere-order-service/api/orders";

export default class OrderService {
  static async fetchOrders(): Promise<Order[]> {
    const res = await apiClient.get<Order[]>(serviceRoute);
    return res.data;
  }

  static async checkout(order: OrderRequest): Promise<Order> {
    const res = await apiClient.post<Order>(serviceRoute, order);
    return res.data;
  }

  // poll until order is not PENDING
  static async checkStatus(orderId: number): Promise<OrderStatusType> {
    let status: OrderStatusType;
    while (true) {
      const res = await apiClient.get<OrderStatusResponse>(
        `${serviceRoute}/${orderId}/status`,
      );
      status = res.data.status;
      if (status !== OrderStatus.PAYMENT_PENDING) {
        return status;
      }
    }
  }
}
