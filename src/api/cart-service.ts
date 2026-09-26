import { apiClient } from "./client";
import type { Cart, CartRequest } from "../models/cart";

const serviceRoute = "/shopsphere-cart-service/api/cart";

export class CartService {
  async fetchCart(userId: number): Promise<Cart[]> {
    const res = await apiClient.get<Cart[]>(`${serviceRoute}/user/${userId}`);
    return res.data;
  }

  async addItem(cart: CartRequest): Promise<Cart> {
    const res = await apiClient.post<Cart>(serviceRoute, cart);
    return res.data;
  }

  async updateItem(cart: Cart): Promise<Cart> {
    const res = await apiClient.put<Cart>(`${serviceRoute}/${cart.id}`, cart);
    return res.data;
  }

  async removeItem(cartId: number): Promise<void> {
    await apiClient.delete(`${serviceRoute}/${cartId}`);
  }

  async clearCart(userId: number): Promise<void> {
    await apiClient.delete(`${serviceRoute}/user/${userId}`);
  }
}
