import { apiClient, setBackendStatus } from "./apiClient";
import type { Cart, CartItem } from "../models/cart";
import { initialCarts, initialCartItems } from "./mockData";

const localCarts: Cart[] = [...initialCarts];
let localCartItems: CartItem[] = [...initialCartItems];

export const cartService = {
  async getCart(userId: number): Promise<{ cart: Cart; items: CartItem[] }> {
    try {
      const response = await apiClient.get<{ cart: Cart; items: CartItem[] }>(`/cart/user/${userId}`);
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.get<{ cart: Cart; items: CartItem[] }>(`/carts/user/${userId}`);
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        let userCart = localCarts.find((c) => c.userId === userId);
        if (!userCart) {
          userCart = {
            id: localCarts.length > 0 ? Math.max(...localCarts.map((c) => c.id)) + 1 : 1,
            userId,
          };
          localCarts.push(userCart);
        }
        const items = localCartItems.filter((i) => i.cartId === userCart.id);
        return { cart: userCart, items: [...items] };
      }
    }
  },

  async addItem(cartId: number, productId: number, quantity: number): Promise<CartItem> {
    try {
      const response = await apiClient.post<CartItem>("/cart/items", {
        cartId,
        productId,
        quantity,
      });
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.post<CartItem>("/carts/items", {
          cartId,
          productId,
          quantity,
        });
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        const existing = localCartItems.find(
          (i) => i.cartId === cartId && i.productId === productId
        );
        if (existing) {
          existing.quantity += quantity;
          return { ...existing };
        } else {
          const newItem: CartItem = {
            id: localCartItems.length > 0 ? Math.max(...localCartItems.map((i) => i.id)) + 1 : 1,
            cartId,
            productId,
            quantity,
          };
          localCartItems.push(newItem);
          return newItem;
        }
      }
    }
  },

  async updateItemQuantity(itemId: number, quantity: number): Promise<CartItem | undefined> {
    try {
      const response = await apiClient.put<CartItem>(`/cart/items/${itemId}`, { quantity });
      setBackendStatus(true);
      return response.data;
    } catch {
      try {
        const response = await apiClient.put<CartItem>(`/carts/items/${itemId}`, { quantity });
        setBackendStatus(true);
        return response.data;
      } catch {
        setBackendStatus(false);
        const item = localCartItems.find((i) => i.id === itemId);
        if (item) {
          item.quantity = quantity;
          return { ...item };
        }
        return undefined;
      }
    }
  },

  async removeItem(itemId: number): Promise<void> {
    try {
      await apiClient.delete(`/cart/items/${itemId}`);
      setBackendStatus(true);
    } catch {
      try {
        await apiClient.delete(`/carts/items/${itemId}`);
        setBackendStatus(true);
      } catch {
        setBackendStatus(false);
        localCartItems = localCartItems.filter((i) => i.id !== itemId);
      }
    }
  },

  async clearCart(cartId: number): Promise<void> {
    try {
      await apiClient.delete(`/cart/${cartId}/clear`);
      setBackendStatus(true);
    } catch {
      try {
        await apiClient.delete(`/carts/${cartId}/clear`);
        setBackendStatus(true);
      } catch {
        setBackendStatus(false);
        localCartItems = localCartItems.filter((i) => i.cartId !== cartId);
      }
    }
  },
};
