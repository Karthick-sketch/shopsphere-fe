import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Cart, CartRequest, CartUpdateRequest } from "../models/cart";
import type { Product } from "../models/product";
import CartService from "../api/cart-service";
import { useAuth } from "../auth/AuthContext";
import { useToast } from "./ToastContext";

interface CartContextValue {
  items: Cart[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (cartId: number) => void;
  setQuantity: (cartId: number, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Cart[]>([]);

  const navigate = useNavigate();

  const { showToast } = useToast();

  const { authUser } = useAuth();

  // Hydrate cart from the backend on mount
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    CartService.fetchCart(authUser.id).then(setItems).catch(console.error);
  }, [authUser]);

  async function addItem(product: Product, quantity = 1) {
    const existing = items.find((i) => i.productInfo.id === product.id);

    if (existing) {
      const updated: CartUpdateRequest = {
        id: existing.id,
        userId: existing.userId,
        productId: existing.productInfo.id,
        quantity: existing.quantity + quantity,
      };
      try {
        const saved = await CartService.updateItem(updated);
        setItems((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 409) {
          showToast("Out of Stock. Please try again later");
        }
        console.error(err);
      }
    } else {
      const newItem: CartRequest = {
        userId: authUser.id,
        quantity: quantity,
        productId: product.id,
      };
      try {
        const saved = await CartService.addItem(newItem);
        setItems((prev) => [...prev, saved]);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 409) {
          showToast("Out of Stock. Please try again later");
        }
        console.error(err);
      }
    }
  }

  async function removeItem(cartId: number) {
    try {
      await CartService.removeItem(cartId);
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
    const updated: CartUpdateRequest = {
      id: item.id,
      userId: item.userId,
      productId: item.productInfo.id,
      quantity,
    };
    try {
      const saved = await CartService.updateItem(updated);
      setItems((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        showToast("Out of Stock. Please try again later");
      }
      console.error(err);
    }
  }

  async function clearCart() {
    try {
      await CartService.clearCart(authUser.id);
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
