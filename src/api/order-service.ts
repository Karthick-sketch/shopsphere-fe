import { apiClient } from "./client";
import type { Order, OrderRequest } from "../models/order";

const serviceRoute = "/shopsphere-order-service/api/orders";
const userId = 6;

export async function fetchOrders(): Promise<Order[]> {
  const res = await apiClient.get<Order[]>(serviceRoute);
  return res.data;
}

export async function createOrder(order: OrderRequest): Promise<Order> {
  order.userId = userId;
  const res = await apiClient.post<Order>(serviceRoute, order);
  return res.data;
}
