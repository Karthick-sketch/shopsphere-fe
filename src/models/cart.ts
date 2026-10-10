import type { ProductInfo } from "./product";

interface Cart {
  id: number;
  userId: number;
  quantity: number;
  productInfo: ProductInfo;
}

interface CartRequest {
  userId: number;
  productId: number;
  quantity: number;
}

interface CartUpdateRequest {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

export type { Cart, CartRequest, CartUpdateRequest };
