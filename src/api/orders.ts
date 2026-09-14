import { apiClient } from "./client";
import type { Order } from "../models/order";

const serviceRoute = "/shopsphere-order-services/api/orders";

export async function fetchOrders(): Promise<Order[]> {
  // const res = await apiClient.get<Order[]>("/orders?_sort=placedAt&_order=desc");
  const res = await apiClient.get<Order[]>(serviceRoute);
  return res.data;
}

export async function createOrder(order: Order): Promise<Order> {
  const res = await apiClient.post<Order>(serviceRoute, order);
  return res.data;
}
