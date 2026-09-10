import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Cart, CartItem } from "../models/cart";
import { cartService } from "../services/cartService";
import { productService } from "../services/productService";
import type { Product } from "../models/product";
import { useAuth } from "./AuthContext";

export interface CartItemWithProduct extends CartItem {
  product?: Product;
}

interface CartContextType {
  cart: Cart | null;
  items: CartItemWithProduct[];
  itemCount: number;
  totalAmount: number;
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCartData = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const { cart: userCart, items: cartItems } = await cartService.getCart(currentUser.id);
      setCart(userCart);

      const products = await productService.getProducts();
      const enriched: CartItemWithProduct[] = cartItems.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
      setItems(enriched);
    } catch {
      // Graceful error handling
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    let ignore = false;
    async function init() {
      if (!currentUser) return;
      setLoading(true);
      try {
        const { cart: userCart, items: cartItems } = await cartService.getCart(currentUser.id);
        if (ignore) return;
        setCart(userCart);

        const products = await productService.getProducts();
        if (ignore) return;
        const enriched: CartItemWithProduct[] = cartItems.map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId),
        }));
        setItems(enriched);
      } catch {
        // Graceful error handling
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, [currentUser]);

  const addToCart = async (productId: number, quantity = 1) => {
    if (!cart && currentUser) {
      await loadCartData();
    }
    const targetCartId = cart?.id || 1;
    await cartService.addItem(targetCartId, productId, quantity);
    await loadCartData();
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
    } else {
      await cartService.updateItemQuantity(itemId, quantity);
      await loadCartData();
    }
  };

  const removeFromCart = async (itemId: number) => {
    await cartService.removeItem(itemId);
    await loadCartData();
  };

  const clearCart = async () => {
    if (cart) {
      await cartService.clearCart(cart.id);
    }
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        itemCount,
        totalAmount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart: loadCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
