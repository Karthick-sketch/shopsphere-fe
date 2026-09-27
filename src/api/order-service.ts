import apiClient from "./interceptor/api-client";
import type { Order, OrderRequest } from "../models/order";

const serviceRoute = "/shopsphere-order-service/api/orders";

export default class OrderService {
  static async fetchOrders(): Promise<Order[]> {
    const res = await apiClient.get<Order[]>(serviceRoute);
    return res.data;
  }

  static async createOrder(order: OrderRequest): Promise<Order> {
    const res = await apiClient.post<Order>(serviceRoute, order);
    return res.data;
  }
}
