import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/product";
import { CartContext, type CartContextValue } from "./cart-context";

const CART_STORAGE_KEY = "product-catalog-cart";

const getInitialCartState = (): string[] => {
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

    return parsedValue.filter((value): value is string => typeof value === "string");
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [addedProductIds, setAddedProductIds] = useState<string[]>(getInitialCartState);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(addedProductIds));
  }, [addedProductIds]);

  const value = useMemo<CartContextValue>(() => {
    const isInCart = (productId: string) => addedProductIds.includes(productId);

    return {
      addedProductIds,
      cartCount: addedProductIds.length,
      toggleCart: (product: Product) => {
        setAddedProductIds((prev) =>
          prev.includes(product.id) ? prev.filter((productId) => productId !== product.id) : [...prev, product.id],
        );
      },
      isInCart,
    };
  }, [addedProductIds]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
