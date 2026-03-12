import { createContext } from "react";
import type { Product } from "../types/product";

export interface CartItem {
  productId: string;
  selectedVolumeId: string;
}

export interface CartContextValue {
  cartItems: CartItem[];
  cartCount: number;
  toggleCart: (product: Product, selectedVolumeId?: string) => void;
  isInCart: (productId: string, selectedVolumeId?: string) => boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);
