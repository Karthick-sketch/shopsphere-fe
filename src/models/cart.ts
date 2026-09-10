interface Cart {
  id: number;
  userId: number;
}

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export type { Cart, CartItem };
