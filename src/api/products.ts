import { apiClient } from "./client";
import type { Product } from "../models/product";

const serviceRoute = "/shopsphere-product-service/api/products";

export async function fetchProducts(): Promise<Product[]> {
  const res = await apiClient.get<Product[]>(serviceRoute);
  return res.data;
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await apiClient.get<Product>(`${serviceRoute}/${id}`);
  return res.data;
}
