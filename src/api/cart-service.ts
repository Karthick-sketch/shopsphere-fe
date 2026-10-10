import apiClient from "./interceptor/api-client";
import type { Cart, CartRequest, CartUpdateRequest } from "../models/cart";

const serviceRoute = "/shopsphere-cart-service/api/cart";

export default class CartService {
  static async fetchCart(userId: number): Promise<Cart[]> {
    const res = await apiClient.get<Cart[]>(`${serviceRoute}/user/${userId}`);
    return res.data;
  }

  static async addItem(cart: CartRequest): Promise<Cart> {
    const res = await apiClient.post<Cart>(serviceRoute, cart);
    return res.data;
  }

  static async updateItem(cart: CartUpdateRequest): Promise<Cart> {
    const res = await apiClient.put<Cart>(`${serviceRoute}/${cart.id}`, cart);
    return res.data;
  }

  static async removeItem(cartId: number): Promise<void> {
    await apiClient.delete(`${serviceRoute}/${cartId}`);
  }

  static async clearCart(userId: number): Promise<void> {
    await apiClient.delete(`${serviceRoute}/user/${userId}`);
  }
}
