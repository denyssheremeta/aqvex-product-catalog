import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/product";
import { useToast } from "../hooks/useToast";
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
  const { showToast } = useToast();

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
        const hasItem = cartItems.some(
          (item) => item.productId === product.id && item.selectedVolumeId === selectedVolumeId,
        );

        setCartItems((prev) =>
          hasItem
            ? prev.filter((item) => !(item.productId === product.id && item.selectedVolumeId === selectedVolumeId))
            : [...prev, { productId: product.id, selectedVolumeId }],
        );

        showToast(
          hasItem ? `Товар "${product.title}" удален из корзины` : `Товар "${product.title}" добавлен в корзину`,
        );
      },
      isInCart,
    };
  }, [cartItems, showToast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
