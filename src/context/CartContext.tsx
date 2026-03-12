import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/product";
import { CartContext, type CartContextValue, type CartItem } from "./cart-context";

const CART_STORAGE_KEY = "product-catalog-cart";

const isCartItem = (value: unknown): value is CartItem => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<CartItem>;

  return typeof candidate.productId === "string" && typeof candidate.selectedVolumeId === "string";
};

const getInitialCartState = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .map((value) => {
        if (typeof value === "string") {
          return {
            productId: value,
            selectedVolumeId: "",
          };
        }

        return value;
      })
      .filter(isCartItem);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCartState);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const value = useMemo<CartContextValue>(() => {
    const isInCart = (productId: string, selectedVolumeId = "") =>
      cartItems.some((item) => item.productId === productId && item.selectedVolumeId === selectedVolumeId);

    return {
      cartItems,
      cartCount: cartItems.length,
      toggleCart: (product: Product, selectedVolumeId = product.selectedVolumeId) => {
        setCartItems((prev) =>
          prev.some((item) => item.productId === product.id && item.selectedVolumeId === selectedVolumeId)
            ? prev.filter((item) => !(item.productId === product.id && item.selectedVolumeId === selectedVolumeId))
            : [...prev, { productId: product.id, selectedVolumeId }],
        );
      },
      isInCart,
    };
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
