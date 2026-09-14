import type { Product } from "./product";

interface Cart {
  id: number;
  userId: number;
  cartItems: CartItem[];
}

interface CartItem {
  id: number;
  cartId: number;
  quantity: number;
  product: Product;
}

export type { Cart, CartItem };
