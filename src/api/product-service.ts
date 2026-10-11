import apiClient from "./interceptor/api-client";
import type { Product, ProductResponse } from "../models/product";

const serviceRoute = "/shopsphere-product-service/api/products";

export default class ProductService {
  static async fetchProducts(): Promise<ProductResponse[]> {
    const res = await apiClient.get<ProductResponse[]>(serviceRoute);
    return res.data;
  }

  static async fetchProduct(id: string): Promise<Product> {
    const res = await apiClient.get<Product>(`${serviceRoute}/${id}`);
    return res.data;
  }
}
