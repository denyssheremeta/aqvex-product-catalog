import { createContext } from "react";
import type { Product } from "../types/product";

export interface CartContextValue {
  addedProductIds: string[];
  cartCount: number;
  toggleCart: (product: Product) => void;
  isInCart: (productId: string) => boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);
