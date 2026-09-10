import { apiClient, setBackendStatus } from "./apiClient";
import type { Inventory } from "../models/inventory";
import { initialInventories } from "./mockData";

const localInventories: Inventory[] = [...initialInventories];

export const inventoryService = {
  async getInventories(): Promise<Inventory[]> {
    try {
      const response = await apiClient.get<Inventory[]>("/inventory");
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.get<Inventory[]>("/inventories");
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        return [...localInventories];
      }
    }
  },

  async getInventoryByProductId(productId: number): Promise<Inventory | undefined> {
    try {
      const response = await apiClient.get<Inventory>(`/inventory/product/${productId}`);
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.get<Inventory>(`/inventories/product/${productId}`);
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        return localInventories.find((inv) => inv.productId === productId);
      }
    }
  },

  async updateQuantity(productId: number, delta: number): Promise<Inventory | undefined> {
    try {
      const response = await apiClient.patch<Inventory>(`/inventory/product/${productId}`, {
        delta,
      });
      setBackendStatus(true);
      return response.data;
    } catch {
      setBackendStatus(false);
      const inv = localInventories.find((i) => i.productId === productId);
      if (inv) {
        inv.quantity = Math.max(0, inv.quantity + delta);
        return { ...inv };
      }
      return undefined;
    }
  },
};
