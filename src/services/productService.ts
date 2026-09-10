import { apiClient, setBackendStatus } from "./apiClient";
import type { Product } from "../models/product";
import { initialProducts } from "./mockData";

// Local in-memory state fallback when backend server is offline
const localProducts: Product[] = [...initialProducts];

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>("/product");
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        // Retry with plural endpoint if /product 404s or service is /products
        const response = await apiClient.get<Product[]>("/products");
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        return [...localProducts];
      }
    }
  },

  async getProductById(id: number): Promise<Product | undefined> {
    try {
      const response = await apiClient.get<Product>(`/product/${id}`);
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.get<Product>(`/products/${id}`);
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        return localProducts.find((p) => p.id === id);
      }
    }
  },

  async createProduct(product: Omit<Product, "id">): Promise<Product> {
    try {
      const response = await apiClient.post<Product>("/product", product);
      setBackendStatus(true);
      return response.data;
    } catch {
      setBackendStatus(false);
      const newProduct: Product = {
        ...product,
        id: localProducts.length > 0 ? Math.max(...localProducts.map((p) => p.id)) + 1 : 1,
      };
      localProducts.push(newProduct);
      return newProduct;
    }
  },
};
