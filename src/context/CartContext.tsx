import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Cart, CartRequest } from "../models/cart";
import type { Product } from "../models/product";
import { CartService } from "../api/cart-service";

interface CartContextValue {
  items: Cart[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (cartId: number) => void;
  setQuantity: (cartId: number, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const cartService = new CartService();

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Cart[]>([]);

  // Hydrate cart from the backend on mount
  useEffect(() => {
    cartService.fetchCart().then(setItems).catch(console.error);
  }, []);

  async function addItem(product: Product, quantity = 1) {
    const existing = items.find((i) => i.productInfo.id === product.id);

    if (existing) {
      const updated: Cart = {
        ...existing,
        quantity: Math.min(existing.quantity + quantity, product.stock),
      };
      try {
        const saved = await cartService.updateItem(updated);
        setItems((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
      } catch (err) {
        console.error(err);
      }
    } else {
      const newItem: CartRequest = {
        userId: 0,
        quantity: Math.min(quantity, product.stock),
        productId: product.id,
      };
      try {
        const saved = await cartService.addItem(newItem);
        setItems((prev) => [...prev, saved]);
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function removeItem(cartId: number) {
    try {
      await cartService.removeItem(cartId);
      setItems((prev) => prev.filter((i) => i.id !== cartId));
    } catch (err) {
      console.error(err);
    }
  }

  async function setQuantity(cartId: number, quantity: number) {
    if (quantity <= 0) {
      await removeItem(cartId);
      return;
    }
    const item = items.find((i) => i.id === cartId);
    if (!item) {
      console.error(`Cart item with id ${cartId} not found`);
      return;
    }
    const updated: Cart = { ...item, quantity };
    try {
      const saved = await cartService.updateItem(updated);
      setItems((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
    } catch (err) {
      console.error(err);
    }
  }

  async function clearCart() {
    try {
      await cartService.clearCart();
      setItems([]);
    } catch (err) {
      console.error(err);
    }
  }

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    totalCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
