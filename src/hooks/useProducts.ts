import { useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";
import type { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProducts();
        setProducts(data);
      } catch (loadError) {
        console.error(loadError);
        setError("Не удалось загрузить товары. Попробуйте позже.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
  };
};
